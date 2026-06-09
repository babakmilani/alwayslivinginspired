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

// Pull women's product/list pages into D1 (token-protected; run manually or via cron).
app.post("/sync", async (c) => {
    if (!adminOk(c)) return c.json({ error: "unauthorized" }, 401);
    const markup = Number(c.env.MARKUP) || 2.5;
    const pages = Math.min(Number(c.req.query("pages") || "3"), 10);
    let upserted = 0;
    for (let p = 1; p <= pages; p++) {
        const cards = await listByCategory(c.env, WOMENS_FIRST_ID, String(p), "", markup);
        for (const it of cards) {
            await c.env.DB.prepare(
                `INSERT INTO products (pid,name,price,cost,image,sku,category,synced_at)
         VALUES (?1,?2,?3,?4,?5,?6,?7,datetime('now'))
         ON CONFLICT(pid) DO UPDATE SET
           name=?2, price=?3, cost=?4, image=?5, sku=?6, category=?7, synced_at=datetime('now')`
            ).bind(it.id, it.name, it.price, it.cost, it.image, it.sku, it.category).run();
            upserted++;
        }
        if (p < pages) await new Promise((r) => setTimeout(r, 1100)); // QPS=1 between CJ pages
    }
    return c.json({ ok: true, pages, upserted });
});

// Public storefront feed — visible (non-hidden) items from D1.
app.get("/api/catalog", async (c) => {
    const { results } = await c.env.DB.prepare(
        `SELECT pid AS id, name, price, cost, image, sku, category, us_stock AS usStock
     FROM products WHERE hidden = 0 ORDER BY synced_at DESC LIMIT 80`
    ).all();
    return c.json((results || []).map((r) => ({ ...r, fabric: "", colorways: [], badge: null })));
});

// Admin: list everything (incl. hidden), newest first.
app.get("/admin/products", async (c) => {
    if (!adminOk(c)) return c.json({ error: "unauthorized" }, 401);
    const { results } = await c.env.DB.prepare(
        `SELECT pid AS id, name, price, cost, image, category, us_stock AS usStock, hidden
     FROM products ORDER BY synced_at DESC LIMIT 500`
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

app.get("/", (c) => c.text("CJ proxy up. Try /api/products"));

export default app;