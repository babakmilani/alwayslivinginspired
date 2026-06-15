/**
 * CJ Dropshipping → Cloudflare Worker proxy (Hono)
 * -----------------------------------------------------------------------------
 * CJ's API needs a secret token, isn't CORS-open, and is rate limited to
 * QPS = 1 (one call/second, token endpoint included). So the browser can't talk
 * to CJ directly, and we must NOT call CJ on every page load. This Worker:
 *   - holds the apiKey, exchanges it for an access token, caches that token in KV
 *   - caches the product list in KV (one CJ call per window, not per visitor)
 *   - exposes clean JSON in your storefront's shape
 *
 * Confirmed against CJ API v2 docs (June 2026):
 *   AUTH  POST /authentication/getAccessToken  body { apiKey }  -> data.accessToken
 *         token lives 15d; server-cached 24h; QPS 1
 *   LIST  GET  /product/list  -> data.list[] { pid, productNameEn, productSku,
 *                                              productImage, sellPrice, categoryName }
 *   STOCK GET  /product/stock/queryByVid?vid=  -> data[] { countryCode, areaEn,
 *                                                          storageNum }  (US = in US wh)
 *
 * Bindings (wrangler.toml):
 *   [[kv_namespaces]] binding = "CJ_KV"
 *   secret: wrangler secret put CJ_API_KEY     # format: CJUserNum@api@xxxxxxxx
 *   var (optional): ALLOWED_ORIGIN = "https://www.alwayslivinginspired.com"
 */
import { Hono } from "hono";
import { cors } from "hono/cors";

const CJ_BASE = "https://developers.cjdropshipping.com/api2.0/v1";
// product/list scopes by categoryId (the leaf name isn't the "Women's Clothing/" path).
const WOMENS_FIRST_ID = "2FE8A083-5E7B-4179-896D-561EA116F730"; // "Women's Clothing" parent
const FLAGSHIP_LEAF = "D2432903-0D4E-4787-886F-D3D9DA7890D9";   // "Lady Dresses" fallback
// Women's leaf categories to sync (reliable + varied; the parent category can return empty).
const WOMENS_CATS = [
    "D2432903-0D4E-4787-886F-D3D9DA7890D9", // Lady Dresses
    "5A3E7341-18B5-4C61-BFCD-8965B3479A9A", // Blouses & Shirts
    "DE9C662C-3F48-4855-87E7-E18733EFF6D2", // Sweaters
    "ECDBD4C4-7467-4831-9F55-740E3C7968BE", // Suits & Sets
    "63584B9B-5275-4268-8BEA-7D3C7A7BB925", // Woman Jeans
    "3B8946E7-B608-4DAB-B2F0-C425B7875035", // Skirts
    "9694B484-7EA0-4D71-993B-9CF02D24B271", // Pants & Capris
    "07398ADB-FC5E-4CC4-AD00-EB230E779E88", // Blazers
    "4CF7E664-A644-4B96-951B-B76FA973320A", // Basic Jacket
    "396E962A-5632-49C2-B9BF-9529DE3B9141", // Leggings
];
const LIST_TTL = 60 * 30;   // cache product list 30 min
const TOKEN_KEY = "cj_token";
const LIST_KEY = "cj_list_womens";

const app = new Hono();

app.use("*", (c, next) => {
    const allow = (
        c.env.ALLOWED_ORIGIN ||
        "https://alwayslivinginspired.com,https://www.alwayslivinginspired.com,https://alwayslivinginspired.pages.dev,http://localhost:5173"
    )
        .split(",")
        .map((s) => s.trim());
    return cors({
        origin: (o) => (allow.includes(o) ? o : ""),
        allowMethods: ["GET", "POST", "OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization"],
    })(c, next);
});

/* ---- AUTH: apiKey -> access token, cached in KV (token issuance is QPS-limited) ---- */
async function getToken(env) {
    const hit = await env.CJ_KV.get(TOKEN_KEY, "json");
    if (hit && hit.exp > Date.now() + 60_000) return hit.token;

    const res = await fetch(`${CJ_BASE}/authentication/getAccessToken`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: env.CJ_API_KEY }),
    });
    const data = await res.json();
    const token = data?.data?.accessToken;
    if (!token) throw new Error("CJ auth failed: " + JSON.stringify(data));

    // Token lives 15 days; refresh 1 day early. Honor server expiry if provided.
    const exp =
        Date.parse(data?.data?.accessTokenExpiryDate || "") ||
        Date.now() + 14 * 24 * 60 * 60 * 1000;
    await env.CJ_KV.put(TOKEN_KEY, JSON.stringify({ token, exp }), {
        expirationTtl: 14 * 24 * 60 * 60,
    });
    return token;
}

async function cj(env, path, params = {}) {
    const token = await getToken(env);
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`${CJ_BASE}${path}${qs ? "?" + qs : ""}`, {
        headers: { "CJ-Access-Token": token, "Content-Type": "application/json" },
    });
    return res.json();
}

// CJ sellPrice is your COST. Apply a markup for the retail price shown on-site.
// Set MARKUP in wrangler.toml (e.g. "2.5"); defaults to 2.5x. Charm-rounds to x.99.
function retail(cost, markup) {
    const v = Number(cost || 0) * markup;
    if (!v) return null;
    return Math.max(0.99, Math.ceil(v) - 0.01);
}

function toCard(p, markup) {
    return {
        id: p.pid,
        name: p.productNameEn,
        price: retail(p.sellPrice, markup),  // retail (cost x markup, x.99)
        cost: Number(p.sellPrice),           // your CJ cost, for reference
        image: p.productImage,
        sku: p.productSku,
        category: p.categoryName || "",
        fabric: "",        // only on the detail endpoint; left blank for cards
        colorways: [],     // hydrated from variants on the product page
        usStock: null,     // unknown at list level — see /api/inventory or the D1 sync
        badge: null,
    };
}

/* ---- PRODUCT LIST -> women's clothing, category-scoped, mapped + KV cached ----
   product/list returns the LEAF categoryName (e.g. "Lady Dresses"), not the
   "Women's Clothing / ..." breadcrumb, so we scope by categoryId. Default to the
   Women's Clothing parent id; if CJ doesn't expand parent categories (empty
   result), fall back to a flagship leaf so the rail is never empty. The D1 sync
   (next phase) aggregates ALL women's categories + US-stock filtering. */
async function listByCategory(env, categoryId, page, q, markup) {
    const data = await cj(env, "/product/list", {
        pageNum: page,
        pageSize: "40",
        categoryId,
        ...(q ? { productNameEn: q } : {}),
    });
    return (data?.data?.list || []).map((p) => toCard(p, markup));
}

app.get("/api/products", async (c) => {
    const page = c.req.query("page") || "1";
    const q = c.req.query("q") || "";
    const reqCat = c.req.query("categoryId") || "";
    const markup = Number(c.env.MARKUP) || 2.5;
    const cacheKey = `${LIST_KEY}:${reqCat || "default"}:${q}:${page}`;

    const cached = await c.env.CJ_KV.get(cacheKey, "json");
    if (cached) return c.json(cached);

    let cards = await listByCategory(c.env, reqCat || WOMENS_FIRST_ID, page, q, markup);
    if (!cards.length && !reqCat && !q) {
        await new Promise((r) => setTimeout(r, 1100)); // respect QPS=1 before retry
        cards = await listByCategory(c.env, FLAGSHIP_LEAF, page, q, markup);
    }

    await c.env.CJ_KV.put(cacheKey, JSON.stringify(cards), { expirationTtl: LIST_TTL });
    return c.json(cards);
});

/* ---- CATEGORY TREE: use once to grab the Women's Clothing categoryId ---- */
app.get("/api/categories", async (c) => {
    const data = await cj(c.env, "/product/getCategory");
    return c.json(data?.data ?? data);
});

/* ---- INVENTORY BY VARIANT ID: detect US-warehouse stock ---- */
app.get("/api/inventory/:vid", async (c) => {
    const data = await cj(c.env, "/product/stock/queryByVid", { vid: c.req.param("vid") });
    const areas = Array.isArray(data?.data) ? data.data : [];
    const us = areas.find((a) => a.countryCode === "US");
    return c.json({
        vid: c.req.param("vid"),
        usStock: Number(us?.storageNum ?? 0),
        inUS: Number(us?.storageNum ?? 0) > 0,
        areas, // full per-warehouse breakdown
    });
});

/* ===== D1 catalog + admin (curation system) ========================
   D1 binding: DB. Admin auth: header "Authorization: Bearer <ADMIN_TOKEN>".
   Set token: npx wrangler secret put ADMIN_TOKEN
   The public storefront can switch to /api/catalog once you've synced + curated. */
function adminOk(c) {
    const t = c.env.ADMIN_TOKEN;
    return !!t && (c.req.header("Authorization") || "") === `Bearer ${t}`;
}

// Current season (Northern Hemisphere / US) + a brief the scorer reasons against.
function seasonNow() {
    const m = new Date().getMonth(); // 0=Jan ... 11=Dec
    if (m === 11 || m <= 1)
        return { name: "Winter", brief: "warm layers, sweaters, knitwear, coats, jackets, boots, long sleeves, scarves, darker and jewel tones; NOT swimwear, shorts, sleeveless sundresses, sandals" };
    if (m <= 4)
        return { name: "Spring", brief: "light layers, florals, pastels, light jackets, trench coats, midi dresses, transitional pieces; NOT heavy wool coats, swimwear, thick knitwear" };
    if (m <= 7)
        return { name: "Summer", brief: "lightweight dresses, linen, shorts, swimwear, sleeveless and short-sleeve tops, sandals, breathable fabrics, bright and pastel colors; NOT heavy coats, wool, thick knitwear, boots" };
    return { name: "Fall", brief: "knitwear, sweaters, jackets, light coats, boots, denim, layering, long sleeves, earth tones; NOT swimwear, sundresses, sandals" };
}

// Score a batch of products 0-100 for fit to the current season via the Anthropic API.
// Returns [{ n, score }] keyed by 1-based position in `items`.
async function scoreBatch(env, items, season) {
    const list = items.map((p, i) => `${i + 1}. [${p.category || "?"}] ${p.name}`).join("\n");
    const prompt = `You are merchandising a US women's clothing store. The current season is ${season.name}.
In-season items: ${season.brief}.

Rate how well each item fits RIGHT NOW, 0-100 (100 = perfect for this season, 0 = clearly off-season). Infer garment type and fabric from the name and category.

Return ONLY a JSON array, no prose, no code fences:
[{"n":1,"score":85},{"n":2,"score":20}]

Items:
${list}`;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "x-api-key": env.ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        },
        body: JSON.stringify({
            model: env.SCORE_MODEL || "claude-sonnet-4-20250514",
            max_tokens: 1500,
            messages: [{ role: "user", content: prompt }],
        }),
    });
    const data = await res.json();
    const text = (data.content || []).map((c) => c.text || "").join("").trim();
    const clean = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return JSON.parse(clean);
}

// Pull women's items into D1 by iterating leaf categories at 1 req/sec.
app.post("/sync", async (c) => {
    if (!adminOk(c)) return c.json({ error: "unauthorized" }, 401);
    const markup = Number(c.env.MARKUP) || 2.5;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    // Warm the access token first, then space the first product/list call (QPS = 1).
    try { await getToken(c.env); } catch (e) {
        return c.json({ error: "CJ auth failed", detail: String(e) }, 502);
    }
    await sleep(1100);

    let upserted = 0;
    const empty = [];
    for (const cat of WOMENS_CATS) {
        let cards = [];
        try { cards = await listByCategory(c.env, cat, "1", "", markup); } catch { /* skip */ }
        if (!cards.length) empty.push(cat);
        for (const it of cards) {
            await c.env.DB.prepare(
                `INSERT INTO products (pid,name,price,cost,image,sku,category,synced_at)
         VALUES (?1,?2,?3,?4,?5,?6,?7,datetime('now'))
         ON CONFLICT(pid) DO UPDATE SET
           name=?2, price=?3, cost=?4, image=?5, sku=?6, category=?7, synced_at=datetime('now')`
            ).bind(it.id, it.name, it.price, it.cost, it.image, it.sku, it.category).run();
            upserted++;
        }
        await sleep(1100); // QPS = 1 between category calls
    }
    return c.json({ ok: true, categories: WOMENS_CATS.length, upserted, emptyCategories: empty.length });
});

// Public storefront feed — visible items, most in-season first.
app.get("/api/catalog", async (c) => {
    const { results } = await c.env.DB.prepare(
        `SELECT pid AS id, name, price, cost, image, sku, category, us_stock AS usStock, season_score AS seasonScore
     FROM products WHERE hidden = 0
     ORDER BY (season_score IS NULL), season_score DESC, synced_at DESC
     LIMIT 80`
    ).all();
    return c.json((results || []).map((r) => ({ ...r, fabric: "", colorways: [], badge: null })));
});

// Admin: list everything (incl. hidden), most in-season first.
app.get("/admin/products", async (c) => {
    if (!adminOk(c)) return c.json({ error: "unauthorized" }, 401);
    const { results } = await c.env.DB.prepare(
        `SELECT pid AS id, name, price, cost, image, category, us_stock AS usStock, hidden,
            season_score AS seasonScore
     FROM products
     ORDER BY (season_score IS NULL), season_score DESC, synced_at DESC
     LIMIT 500`
    ).all();
    return c.json(results || []);
});

// Admin: hide/show a product.
app.post("/admin/visibility", async (c) => {
    if (!adminOk(c)) return c.json({ error: "unauthorized" }, 401);
    const { pid, hidden } = await c.req.json();
    await c.env.DB.prepare(`UPDATE products SET hidden=?2 WHERE pid=?1`)
        .bind(pid, hidden ? 1 : 0).run();
    return c.json({ ok: true, pid, hidden: hidden ? 1 : 0 });
});

// Admin: score a batch of not-yet-scored products for the current season.
// Call repeatedly until "remaining" is 0. Chunked to respect Worker limits.
app.post("/score", async (c) => {
    if (!adminOk(c)) return c.json({ error: "unauthorized" }, 401);
    if (!c.env.ANTHROPIC_API_KEY) return c.json({ error: "ANTHROPIC_API_KEY not set" }, 500);

    const season = seasonNow();
    const limit = Math.min(Number(c.req.query("limit") || "20"), 40);
    const { results } = await c.env.DB.prepare(
        `SELECT pid AS id, name, category FROM products
     WHERE season_score IS NULL ORDER BY synced_at DESC LIMIT ?1`
    ).bind(limit).all();

    if (!results.length) {
        return c.json({ ok: true, season: season.name, scored: 0, remaining: 0 });
    }

    let scores;
    try {
        scores = await scoreBatch(c.env, results, season);
    } catch (e) {
        return c.json({ error: "scoring failed", detail: String(e) }, 502);
    }

    const byN = new Map((scores || []).map((s) => [Number(s.n), Number(s.score)]));
    for (let i = 0; i < results.length; i++) {
        const sc = Math.max(0, Math.min(100, byN.get(i + 1) ?? 0));
        await c.env.DB.prepare(`UPDATE products SET season_score=?2 WHERE pid=?1`)
            .bind(results[i].id, sc).run();
    }

    const rem = await c.env.DB.prepare(
        `SELECT COUNT(*) AS c FROM products WHERE season_score IS NULL`
    ).first();
    return c.json({ ok: true, season: season.name, scored: results.length, remaining: rem?.c ?? 0 });
});

// Admin: hide everything below a season-fit threshold (default 50). One-click seasonal curation.
app.post("/admin/autohide", async (c) => {
    if (!adminOk(c)) return c.json({ error: "unauthorized" }, 401);
    const below = Math.max(0, Math.min(100, Number(c.req.query("below") || "50")));
    const r = await c.env.DB.prepare(
        `UPDATE products SET hidden=1 WHERE season_score IS NOT NULL AND season_score < ?1`
    ).bind(below).run();
    return c.json({ ok: true, below, hidden: r.meta?.changes ?? null });
});

// Admin: un-hide everything (reset curation).
app.post("/admin/showall", async (c) => {
    if (!adminOk(c)) return c.json({ error: "unauthorized" }, 401);
    const r = await c.env.DB.prepare(`UPDATE products SET hidden=0`).run();
    return c.json({ ok: true, shown: r.meta?.changes ?? null });
});

// Diagnostic: force a fresh token + list and surface CJ's raw codes.
// Hit in browser: /debug?t=YOUR_ADMIN_TOKEN  (remove after debugging)
app.get("/debug", async (c) => {
    const t = c.env.ADMIN_TOKEN;
    const ok = t && (c.req.query("t") === t || (c.req.header("Authorization") || "") === `Bearer ${t}`);
    if (!ok) return c.json({ error: "unauthorized" }, 401);

    const tRes = await fetch(`${CJ_BASE}/authentication/getAccessToken`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: c.env.CJ_API_KEY }),
    });
    const tData = await tRes.json().catch(() => ({}));
    const token = tData?.data?.accessToken;

    await new Promise((r) => setTimeout(r, 1100)); // QPS=1

    let list = null;
    if (token) {
        const lRes = await fetch(
            `${CJ_BASE}/product/list?pageNum=1&pageSize=5&categoryId=${FLAGSHIP_LEAF}`,
            { headers: { "CJ-Access-Token": token, "Content-Type": "application/json" } }
        );
        list = await lRes.json().catch(() => ({}));
    }

    return c.json({
        apiKeyPresent: !!c.env.CJ_API_KEY,
        token: { code: tData?.code, result: tData?.result, message: tData?.message, hasToken: !!token },
        list: list
            ? { code: list.code, message: list.message, total: list?.data?.total ?? null, count: (list?.data?.list || []).length }
            : "skipped (no token)",
    });
});

// Import pre-fetched products into D1 (no CJ call). Used by the local sync script,
// which fetches from CJ on a stable IP to avoid Cloudflare's shared-IP rate limit.
// Body: { products: [{ pid, name, cost, image, sku, category }] }
app.post("/admin/import", async (c) => {
    if (!adminOk(c)) return c.json({ error: "unauthorized" }, 401);
    const markup = Number(c.env.MARKUP) || 2.5;
    let body;
    try { body = await c.req.json(); } catch { return c.json({ error: "bad json" }, 400); }
    const products = Array.isArray(body?.products) ? body.products : null;
    if (!products) return c.json({ error: "products array required" }, 400);

    let upserted = 0;
    for (const p of products) {
        if (!p?.pid) continue;
        await c.env.DB.prepare(
            `INSERT INTO products (pid,name,price,cost,image,sku,category,synced_at)
       VALUES (?1,?2,?3,?4,?5,?6,?7,datetime('now'))
       ON CONFLICT(pid) DO UPDATE SET
         name=?2, price=?3, cost=?4, image=?5, sku=?6, category=?7, synced_at=datetime('now')`
        ).bind(p.pid, p.name, retail(p.cost, markup), Number(p.cost), p.image, p.sku, p.category || "").run();
        upserted++;
    }
    return c.json({ ok: true, upserted });
});

app.get("/", (c) => c.text("CJ proxy up. Try /api/products"));

export default app;