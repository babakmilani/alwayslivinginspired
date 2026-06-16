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
const CJ_API_KEY = process.env.CJ_API_KEY;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
const COUNTRY = process.env.WAREHOUSE_COUNTRY || "US"; // warehouse to source from
const PAGE_SIZE = 100; // listV2 max

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
  const params = new URLSearchParams({
    page: "1",
    size: String(PAGE_SIZE),
    categoryId,
    countryCode: COUNTRY,          // source from the US warehouse
    startWarehouseInventory: "1",  // in-stock only
    verifiedWarehouse: "1",        // verified (real) inventory only
    orderBy: "4",                  // 4 = inventory
    sort: "desc",                  // most stock first
  });
  const r = await fetch(`${CJ_BASE}/product/listV2?${params}`, { headers: cjHeaders(token) });
  const d = await r.json();
  if (d.code !== 200) { console.warn(`  ! listV2 CJ ${d.code}: ${d.message}`); return []; }

  const blocks = d?.data?.content || [];
  const out = [];
  for (const b of blocks) {
    for (const p of (b.productList || [])) {
      const cost = Number(p.sellPrice) || Number(p.nowPrice) || Number(p.discountPrice) || 0;
      if (!cost) continue; // skip products CJ returned with no usable price
      out.push({
        pid: p.id,
        name: p.nameEn,
        cost,
        image: p.bigImage,
        sku: p.sku || p.spu,
        category: label, // our storefront label (matches the catalog pills)
        usStock: Number(p.warehouseInventoryNum ?? 0),
      });
    }
  }
  return out;
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

(async () => {
  if (!CJ_API_KEY || !ADMIN_TOKEN) {
    console.error("Set CJ_API_KEY and ADMIN_TOKEN env vars first.");
    process.exit(1);
  }
  console.log(`Authenticating with CJ… (sourcing ${COUNTRY} warehouse, in-stock)`);
  const token = await getToken();
  await sleep(QPS);

  let total = 0;
  for (const [id, label] of CATS) {
    const items = await listCategory(token, id, label);
    console.log(`  ${label}: ${items.length} ${COUNTRY}-stock items`);
    if (items.length) total += await importProducts(items);
    await sleep(QPS); // QPS = 1 between CJ calls
  }
  console.log(`\nDone. Imported ${total} ${COUNTRY}-warehouse, in-stock products into D1.`);
})();
