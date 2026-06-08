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

export async function getProducts({ page = 1, q = "", categoryId = "" } = {}) {
    if (!API_BASE) {
        return new Promise((r) => setTimeout(() => r(MOCK_PRODUCTS), 300)); // dev fallback
    }
    const qs = new URLSearchParams({ page: String(page) });
    if (q) qs.set("q", q);
    if (categoryId) qs.set("categoryId", categoryId);
    const res = await fetch(`${API_BASE}/api/products?${qs}`);
    if (!res.ok) throw new Error(`CJ proxy ${res.status}`);
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