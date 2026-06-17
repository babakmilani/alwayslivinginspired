// src/api/cj.js
// Product data layer. Talks to the CJ proxy Worker when VITE_API_BASE is set,
// and falls back to mock data otherwise (so local dev works with no backend).
//
// Set in Cloudflare Pages > Settings > Env vars:
//   VITE_API_BASE = https://cj-proxy.<your-subdomain>.workers.dev

// Talks to the CJ proxy Worker. Defaults to the live Worker URL so it works
// even if the Pages env var isn't picked up; override with VITE_API_BASE if needed.
const API_BASE = import.meta.env.VITE_API_BASE || "https://cj-proxy.milani-babak.workers.dev";

const MOCK_PRODUCTS = [
    { id: "cj-1042", name: "Ribbed Knit Midi", fabric: "Ribbed modal knit", price: 48, usStock: 320, image: "", colorways: ["#1C1611", "#C9A98C", "#7C3B45"], badge: "Bestseller" },
    { id: "cj-1088", name: "Oversized Poplin Shirt", fabric: "Cotton poplin", price: 39, usStock: 204, image: "", colorways: ["#FBF7EF", "#9FB0C3", "#1C1611"], badge: "New" },
    { id: "cj-1130", name: "Wide-Leg Trouser", fabric: "Crepe twill", price: 56, usStock: 142, image: "", colorways: ["#2E2630", "#C9A98C"], badge: null },
    { id: "cj-1175", name: "Cropped Zip Hoodie", fabric: "Brushed fleece", price: 42, usStock: 388, image: "", colorways: ["#B5675A", "#1C1611", "#D7C7B0"], badge: "Trending" },
    { id: "cj-1201", name: "Bias Slip Skirt", fabric: "Satin-finish", price: 34, usStock: 96, image: "", colorways: ["#7C3B45", "#2E2630", "#C9A98C"], badge: null },
    { id: "cj-1233", name: "Ribbed Lounge Set", fabric: "Two-piece knit", price: 52, usStock: 0, image: "", colorways: ["#C9A98C", "#1C1611"], badge: null },
    { id: "cj-1260", name: "Quilted Liner Jacket", fabric: "Recycled quilt", price: 78, usStock: 61, image: "", colorways: ["#3A1F2B", "#9A8F7D"], badge: "New" },
    { id: "cj-1299", name: "The Baby Tee", fabric: "Compact cotton", price: 24, usStock: 510, image: "", colorways: ["#FBF7EF", "#D98E84", "#1C1611"], badge: "Bestseller" },
];

// Single product detail: D1 base + CJ variants (sizes + vids).
export async function getProduct(pid) {
    if (!API_BASE) return null;
    const res = await fetch(`${API_BASE}/api/product/${pid}`);
    if (!res.ok) throw new Error(`product ${res.status}`);
    return res.json();
}

// Reads the curated, seasonally-scored catalog from D1 (via the Worker).
// The Worker no longer calls CJ on page loads, so the live site is fast and
// never hits CJ's per-IP rate limit. `category` is a D1 category name.
export async function getProducts({ page = 1, q = "", category = "" } = {}) {
    if (!API_BASE) {
        return new Promise((r) => setTimeout(() => r(MOCK_PRODUCTS), 300)); // dev fallback
    }
    const qs = new URLSearchParams({ page: String(page) });
    if (q) qs.set("q", q);
    if (category) qs.set("cat", category);
    const res = await fetch(`${API_BASE}/api/catalog?${qs}`);
    if (!res.ok) throw new Error(`catalog ${res.status}`);
    return res.json();
}

// US-warehouse stock for a variant id (used on the product page).
export async function getInventory(vid) {
    if (!API_BASE) {
        const p = MOCK_PRODUCTS.find((x) => x.id === vid);
        return { vid, usStock: p?.usStock ?? 0, inUS: (p?.usStock ?? 0) > 0, areas: [] };
    }
    const res = await fetch(`${API_BASE}/api/inventory/${vid}`);
    if (!res.ok) throw new Error(`CJ proxy ${res.status}`);
    return res.json();
}

// Creates a Stripe Checkout Session from the cart and returns its hosted URL.
// Only pid/vid/size/qty are sent; the Worker re-prices from D1 server-side.
export async function createCheckout(items) {
    if (!API_BASE) throw new Error("checkout unavailable in local mock mode");
    const payload = {
        items: (items || []).map((it) => ({
            id: it.id,
            vid: it.vid || null,
            size: it.size || null,
            qty: it.qty || 1,
        })),
    };
    const res = await fetch(`${API_BASE}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.url) throw new Error(data.detail || data.error || `checkout ${res.status}`);
    return data.url;
}