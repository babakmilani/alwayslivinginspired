// src/api/cj.js
// Product data layer. Returns CJ-shaped objects so going live is a one-line swap.
// When the Worker proxy is deployed, uncomment the fetch blocks and set
// VITE_API_BASE in your Cloudflare Pages env (e.g. https://cj-proxy.<you>.workers.dev).

const MOCK_PRODUCTS = [
    { id: "cj-1042", name: "Ribbed Knit Midi", fabric: "Ribbed modal knit", fit: "Bodycon midi dress", price: 48, usStock: 320, colorways: ["#1C1611", "#C9A98C", "#7C3B45"], badge: "Bestseller" },
    { id: "cj-1088", name: "Oversized Poplin Shirt", fabric: "Cotton poplin", fit: "Relaxed button-down", price: 39, usStock: 204, colorways: ["#FBF7EF", "#9FB0C3", "#1C1611"], badge: "New" },
    { id: "cj-1130", name: "Wide-Leg Trouser", fabric: "Crepe twill", fit: "High-rise wide-leg", price: 56, usStock: 142, colorways: ["#2E2630", "#C9A98C"], badge: null },
    { id: "cj-1175", name: "Cropped Zip Hoodie", fabric: "Brushed fleece", fit: "Cropped athleisure", price: 42, usStock: 388, colorways: ["#B5675A", "#1C1611", "#D7C7B0"], badge: "Trending" },
    { id: "cj-1201", name: "Bias Slip Skirt", fabric: "Satin-finish", fit: "Midi slip", price: 34, usStock: 96, colorways: ["#7C3B45", "#2E2630", "#C9A98C"], badge: null },
    { id: "cj-1233", name: "Ribbed Lounge Set", fabric: "Two-piece knit", fit: "Tank + short set", price: 52, usStock: 0, colorways: ["#C9A98C", "#1C1611"], badge: null },
    { id: "cj-1260", name: "Quilted Liner Jacket", fabric: "Recycled quilt", fit: "Boxy overshirt", price: 78, usStock: 61, colorways: ["#3A1F2B", "#9A8F7D"], badge: "New" },
    { id: "cj-1299", name: "The Baby Tee", fabric: "Compact cotton", fit: "Cropped fitted tee", price: 24, usStock: 510, colorways: ["#FBF7EF", "#D98E84", "#1C1611"], badge: "Bestseller" },
];

export async function getProducts({
    category = "womens-clothing",
    country = "US",
    inStock = true,
    confirmed = true,
} = {}) {
    // LIVE:
    // const qs = new URLSearchParams({ category, country, inStock: inStock ? 1 : 0, confirmed: confirmed ? 1 : 0 });
    // const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/products?${qs}`);
    // return res.json();
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_PRODUCTS), 350));
}

export async function getInventory(pid) {
    // const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/inventory/${pid}`);
    // return res.json();
    const p = MOCK_PRODUCTS.find((x) => x.id === pid);
    return { pid, usStock: p?.usStock ?? 0 };
}