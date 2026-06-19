// cj-sync.mjs
// Run from a stable IP (your machine, or a scheduled job) — avoids CJ's
// shared-IP rate limit:
//   CJ_API_KEY='CJUserNum@api@xxxx' ADMIN_TOKEN='your-admin-token' node cj-sync.mjs
//
// Sources US-WAREHOUSE, IN-STOCK women's products from CJ's listV2 search
// (countryCode=US + startWarehouseInventory=1) and imports them into D1 via the
// Worker's /admin/import. Stock comes back inline, so it's one call per category.

const CJ_BASE = "https://developers.cjdropshipping.com/api2.0/v1";
const API_BASE = process.env.API_BASE || "https://cj-proxy.milani-babak.workers.dev";
// Strip stray wrapping quotes (incl. smart quotes) and whitespace that can sneak
// in via copy/paste — they'd otherwise break HTTP headers (ByteString error).
const clean = (s) => (s || "").trim().replace(/^[\u2018\u2019\u201C\u201D'"]+|[\u2018\u2019\u201C\u201D'"]+$/g, "");
const CJ_API_KEY = clean(process.env.CJ_API_KEY);
const ADMIN_TOKEN = clean(process.env.ADMIN_TOKEN);
// One or more CJ warehouse country codes to source from.
//   US            -> US catalog
//   DE            -> EU catalog from the Germany warehouse (ships all of Europe)
//   DE,CZ,NL,PL   -> EU catalog merged across several EU warehouses (more selection)
const COUNTRIES = (process.env.WAREHOUSE_COUNTRY || "US")
  .split(",").map((s) => s.trim().toUpperCase()).filter(Boolean);
const COUNTRY = COUNTRIES.join("+");                              // for logging

// Map a CJ warehouse country to a storefront region (matches the Worker).
const EU_COUNTRIES = new Set([
  "AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT",
  "LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE","IS","LI","NO",
]);
function regionFor(country) {
  const cc = (country || "").toUpperCase();
  if (cc === "GB") return "UK";            // UK is its own zone (post-Brexit)
  if (EU_COUNTRIES.has(cc)) return "EU";
  return "US";
}
const REGIONS = [...new Set(COUNTRIES.map(regionFor))]; // regions this run will write
const PAGE_SIZE = 100; // listV2 max
const SKIP_VARIANTS = process.env.SKIP_VARIANTS === "1";

// Women's leaf categories (third-level categoryId : storefront label)
const CATS = [
  ["D2432903-0D4E-4787-886F-D3D9DA7890D9", "Lady Dresses"],
  ["5A3E7341-18B5-4C61-BFCD-8965B3479A9A", "Blouses & Shirts"],
  ["DE9C662C-3F48-4855-87E7-E18733EFF6D2", "Sweaters"],
  ["ECDBD4C4-7467-4831-9F55-740E3C7968BE", "Suits & Sets"],
  ["63584B9B-5275-4268-8BEA-7D3C7A7BB925", "Woman Jeans"],
  ["3B8946E7-B608-4DAB-B2F0-C425B7875035", "Skirts"],
  ["9694B484-7EA0-4D71-993B-9CF02D24B271", "Pants & Capris"],
  ["07398ADB-FC5E-4CC4-AD00-EB230E779E88", "Blazers"],
  ["4CF7E664-A644-4B96-951B-B76FA973320A", "Basic Jacket"],
  ["396E962A-5632-49C2-B9BF-9529DE3B9141", "Leggings"],
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const QPS = 1100; // CJ allows 1 request/sec; pad a little

async function getToken() {
  const r = await fetch(`${CJ_BASE}/authentication/getAccessToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apiKey: CJ_API_KEY }),
  });
  const d = await r.json();
  if (!d?.data?.accessToken) throw new Error("CJ auth failed: " + JSON.stringify(d));
  return d.data.accessToken;
}

function cjHeaders(token) {
  return { "CJ-Access-Token": token, "Content-Type": "application/json" };
}

// listV2: US-warehouse, in-stock products for a category, stock returned inline.
async function listCategory(token, categoryId, label) {
  const byKey = new Map();
  for (const country of COUNTRIES) {
    const region = regionFor(country);
    const params = new URLSearchParams({
      page: "1",
      size: String(PAGE_SIZE),
      categoryId,
      countryCode: country,          // a specific warehouse country
      startWarehouseInventory: "1",  // in-stock only
      verifiedWarehouse: "1",        // verified (real) inventory only
      orderBy: "4",                  // 4 = inventory
      sort: "desc",                  // most stock first
    });
    const r = await fetch(`${CJ_BASE}/product/listV2?${params}`, { headers: cjHeaders(token) });
    const d = await r.json();
    if (d.code !== 200) { console.warn(`  ! listV2 ${country} CJ ${d.code}: ${d.message}`); continue; }

    const blocks = d?.data?.content || [];
    for (const b of blocks) {
      for (const p of (b.productList || [])) {
        const cost = Number(p.sellPrice) || Number(p.nowPrice) || Number(p.discountPrice) || 0;
        if (!cost) continue; // skip products CJ returned with no usable price
        const stock = Number(p.warehouseInventoryNum ?? 0);
        const key = `${region}:${p.id}`; // one row per (region, product)
        const existing = byKey.get(key);
        if (existing) {
          existing.usStock = Math.max(existing.usStock, stock); // same region, two warehouses
        } else {
          byKey.set(key, {
            pid: p.id,
            name: p.nameEn,
            cost,
            image: p.bigImage,
            sku: p.sku || p.spu,
            category: label, // our storefront label (matches the catalog pills)
            usStock: stock,
            region, // US / EU / UK, from this warehouse
          });
        }
      }
    }
    if (COUNTRIES.length > 1) await sleep(QPS); // pace multi-warehouse calls
  }
  return [...byKey.values()];
}

async function importProducts(products) {
  const r = await fetch(`${API_BASE}/admin/import`, {
    method: "POST",
    headers: { Authorization: `Bearer ${ADMIN_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ products }),
  });
  const d = await r.json();
  if (!d.ok) throw new Error("import failed: " + JSON.stringify(d));
  return d.upserted;
}

// Thrown when CJ's per-day API quota is exhausted, to abort the variant phase.
class DailyLimit extends Error {}

// region:pid keys that already have variants stored in D1 — skip to save quota.
async function haveVariantKeys() {
  const set = new Set();
  for (const region of REGIONS) {
    try {
      const r = await fetch(`${API_BASE}/admin/have-variants?region=${region}`, {
        headers: { Authorization: `Bearer ${ADMIN_TOKEN}` },
      });
      const d = await r.json();
      for (const pid of (Array.isArray(d.pids) ? d.pids : [])) set.add(`${region}:${pid}`);
    } catch {
      /* ignore */
    }
  }
  return set;
}

// Product detail -> variants [{ vid, label }]. One CJ call per product, with
// backoff on transient rate-limits and a hard stop on the daily quota.
async function getVariants(token, pid, attempt = 0) {
  let d;
  try {
    const r = await fetch(`${CJ_BASE}/product/query?pid=${pid}`, { headers: cjHeaders(token) });
    d = await r.json();
  } catch {
    if (attempt < 3) { await sleep(1500 * (attempt + 1)); return getVariants(token, pid, attempt + 1); }
    return null;
  }
  if (d.code === 200) {
    const vs = d?.data?.variants || [];
    return vs
      .map((v, i) => ({
        vid: v.vid,
        label: (v.variantKey || v.variantStandard || v.variantSku || `Option ${i + 1}`)
          .toString()
          .trim(),
      }))
      .filter((v) => v.vid);
  }
  // Daily quota exhausted — no point continuing; bubble up to stop the phase.
  if (d.code === 1600200 && /daily request limit/i.test(d.message || "")) {
    throw new DailyLimit(d.message);
  }
  // Per-second / concurrency limit — back off and retry a few times.
  if (attempt < 4) { await sleep(2000 * (attempt + 1)); return getVariants(token, pid, attempt + 1); }
  return null;
}

// Adds .variants to each product (size/color options + vids for fulfillment).
// Skips products already in haveSet to conserve CJ's daily quota.
async function enrichVariants(token, items, haveSet) {
  let ok = 0, skipped = 0, tried = 0;
  for (const p of items) {
    if (haveSet.has(`${p.region}:${p.pid}`)) { skipped++; continue; }
    const v = await getVariants(token, p.pid); // may throw DailyLimit
    tried++;
    if (v && v.length) { p.variants = v; ok++; }
    await sleep(QPS);
    if (tried % 20 === 0) process.stdout.write(`    …${ok} ok / ${tried} tried (${skipped} cached)\n`);
  }
  return { ok, skipped };
}

(async () => {
  if (!CJ_API_KEY || !ADMIN_TOKEN) {
    console.error("Set CJ_API_KEY and ADMIN_TOKEN env vars first.");
    process.exit(1);
  }
  console.log(`Authenticating with CJ… (sourcing ${COUNTRY} warehouse, in-stock)`);
  const token = await getToken();
  await sleep(QPS);

  const haveSet = SKIP_VARIANTS ? new Set() : await haveVariantKeys();
  if (!SKIP_VARIANTS) console.log(`  ${haveSet.size} products already have variants — will skip those.`);

  let total = 0, variantsOk = 0, quotaHit = false;
  for (const [id, label] of CATS) {
    const items = await listCategory(token, id, label);
    console.log(`  ${label}: ${items.length} ${COUNTRY}-stock items`);
    await sleep(QPS);
    if (items.length && !SKIP_VARIANTS && !quotaHit) {
      try {
        const { ok } = await enrichVariants(token, items, haveSet);
        variantsOk += ok;
      } catch (e) {
        if (e instanceof DailyLimit) {
          quotaHit = true;
          console.log(`    ⚠ CJ daily API quota (1000/day) reached — pausing variant fetch.`);
        } else throw e;
      }
    }
    if (items.length) total += await importProducts(items);
  }

  console.log(
    `\nDone. Imported ${total} ${COUNTRY}-warehouse products` +
      (SKIP_VARIANTS ? "." : ` — ${variantsOk} got new variants this run.`)
  );
  if (quotaHit) {
    console.log(
      `Note: CJ's daily quota was hit, so some products still lack variants.\n` +
        `Run this again tomorrow — it only fetches the ones still missing, so it'll finish fast.`
    );
  }
})();
