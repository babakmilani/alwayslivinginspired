// cj-sync.mjs
// Run locally (your machine = stable IP, avoids CJ's shared-IP rate limit):
//   CJ_API_KEY='CJUserNum@api@xxxx' ADMIN_TOKEN='your-admin-token' node cj-sync.mjs
//
// Fetches the women's catalog from CJ at 1 req/sec and imports it into D1
// through the Worker's /admin/import endpoint (which applies your markup).

const CJ_BASE = "https://developers.cjdropshipping.com/api2.0/v1";
const API_BASE = process.env.API_BASE || "https://cj-proxy.milani-babak.workers.dev";
const CJ_API_KEY = process.env.CJ_API_KEY;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

// Women's leaf categories (id : label)
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

async function listCategory(token, categoryId) {
  const url = `${CJ_BASE}/product/list?pageNum=1&pageSize=40&categoryId=${categoryId}`;
  const r = await fetch(url, { headers: { "CJ-Access-Token": token, "Content-Type": "application/json" } });
  const d = await r.json();
  if (d.code !== 200) { console.warn(`  ! CJ ${d.code}: ${d.message}`); return []; }
  return (d?.data?.list || []).map((p) => ({
    pid: p.pid,
    name: p.productNameEn,
    cost: Number(p.sellPrice),
    image: p.productImage,
    sku: p.productSku,
    category: p.categoryName || "",
  }));
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
  console.log("Authenticating with CJ…");
  const token = await getToken();
  await sleep(1100); // QPS = 1

  let total = 0;
  for (const [id, label] of CATS) {
    const items = await listCategory(token, id);
    console.log(`  ${label}: ${items.length} items`);
    if (items.length) total += await importProducts(items);
    await sleep(1100); // QPS = 1 between CJ calls
  }
  console.log(`\nDone. Imported ${total} products into D1.`);
})();
