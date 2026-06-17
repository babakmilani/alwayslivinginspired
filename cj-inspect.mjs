// cj-inspect.mjs — dump the raw CJ product detail for one product.
//   CJ_API_KEY='...' node cj-inspect.mjs <pid>
const CJ_BASE = "https://developers.cjdropshipping.com/api2.0/v1";
const clean = (s) => (s || "").trim().replace(/^['"\u2018\u2019\u201C\u201D]+|['"\u2018\u2019\u201C\u201D]+$/g, "");
const KEY = clean(process.env.CJ_API_KEY);
const pid = process.argv[2];

if (!KEY || !pid) {
  console.error("Usage: CJ_API_KEY='...' node cj-inspect.mjs <pid>");
  process.exit(1);
}

const tRes = await fetch(`${CJ_BASE}/authentication/getAccessToken`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ apiKey: KEY }),
});
const t = await tRes.json();
const token = t?.data?.accessToken;
if (!token) { console.error("auth failed:", JSON.stringify(t)); process.exit(1); }

const dRes = await fetch(`${CJ_BASE}/product/query?pid=${pid}`, {
  headers: { "CJ-Access-Token": token, "Content-Type": "application/json" },
});
const d = await dRes.json();

console.log("code:", d.code, "| message:", d.message);
console.log("data keys:", Object.keys(d.data || {}));
const vs = d?.data?.variants || d?.data?.variantList || d?.data?.variant || [];
console.log("variants length:", Array.isArray(vs) ? vs.length : typeof vs);
if (Array.isArray(vs) && vs[0]) {
  console.log("first variant keys:", Object.keys(vs[0]));
  console.log("first variant:", JSON.stringify(vs[0]).slice(0, 400));
}
