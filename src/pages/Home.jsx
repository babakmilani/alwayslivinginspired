// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { getProducts } from "../api/cj";
import { useCart } from "../context/CartContext";
import "./Home.css";

const CATEGORIES = ["Dresses", "Tops", "Knitwear", "Denim", "Sets", "Outerwear", "Activewear"];

function swatchGradient(colors = []) {
    if (!colors.length) return "var(--paper-2, #EFE7D8)";
    if (colors.length === 1) return colors[0];
    return `linear-gradient(135deg, ${colors[0]} 0%, ${colors[0]} 45%, ${colors[colors.length - 1]} 100%)`;
}

// usStock is a number from inventory, or null at list level (unknown yet).
function stockLabel(p) {
    if (p.usStock === 0) return { text: "Restocking", out: true };
    if (typeof p.usStock === "number") return { text: `${p.usStock} in US warehouse`, out: false };
    return null;
}

// Live products have no `fit`; fall back to the leaf of the CJ category path.
function cardSub(p) {
    if (p.fabric && p.fit) return `${p.fabric} · ${p.fit}`;
    if (p.fabric) return p.fabric;
    if (p.category) return p.category.split("/").pop().trim();
    return "Women's clothing";
}

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const { addItem } = useCart();

    useEffect(() => {
        setMounted(true);
        getProducts().then((p) => { setProducts(p); setLoading(false); });
    }, []);

    return (
        <div className="home brand">
            {/* HERO */}
            <section className="hero">
                <div className="hero-type">
                    <span className={`eyebrow rise ${mounted ? "in" : ""}`} style={{ "--d": "0ms" }}>(01) — New this week</span>
                    <h1>
                        <span className={`rise ${mounted ? "in" : ""}`} style={{ "--d": "80ms" }}>Clothes you'll</span>
                        <span className={`rise it ${mounted ? "in" : ""}`} style={{ "--d": "180ms" }}>actually wear.</span>
                    </h1>
                    <p className={`rise ${mounted ? "in" : ""}`} style={{ "--d": "300ms" }}>
                        A tight, trend-led edit of women's clothing — picked for real life, not the
                        runway, and shipped from a US shelf so it lands in days, not weeks.
                    </p>
                    <button className={`cta rise ${mounted ? "in" : ""}`} style={{ "--d": "400ms" }}>
                        Shop new in <ArrowRight size={18} strokeWidth={2} />
                    </button>
                </div>

                <aside className={`hero-panel rise ${mounted ? "in" : ""}`} style={{ "--d": "260ms" }}>
                    <span className="panel-rot">EST. 2026 · PITTSBURG, CA</span>
                    <div className="panel-stat"><b>3-day</b><span>US delivery on in-stock styles</span></div>
                    <div className="panel-rule" />
                    <div className="panel-stat"><b>Weekly</b><span>new drops — a small edit, refreshed often</span></div>
                </aside>
            </section>

            {/* CATEGORIES */}
            <section className="cats">
                <span className="sec-label">(02) — Shop by category</span>
                <div className="cat-pills">
                    {CATEGORIES.map((c) => <button key={c} className="pill">{c}</button>)}
                </div>
            </section>

            {/* PRODUCT RAIL */}
            <section className="shop">
                <div className="shop-head">
                    <span className="sec-label">(03) — The edit</span>
                    <span className="shop-hint">drag / scroll →</span>
                </div>

                {loading ? (
                    <div className="rail">{[0, 1, 2, 3].map((i) => <div key={i} className="card skeleton" />)}</div>
                ) : (
                    <div className="rail">
                        {products.map((p) => {
                            const sl = stockLabel(p);
                            return (
                                <article key={p.id} className="card">
                                    <div
                                        className="card-vis"
                                        style={p.image ? undefined : { background: swatchGradient(p.colorways) }}
                                    >
                                        {p.image && <img className="card-img" src={p.image} alt={p.name} loading="lazy" />}
                                        {p.badge && <span className="tag">{p.badge}</span>}
                                        {sl && <span className={`stock ${sl.out ? "out" : ""}`}>{sl.text}</span>}
                                        {!p.image && p.colorways?.length > 0 && (
                                            <div className="swatches">{p.colorways.map((c, i) => <i key={i} style={{ background: c }} />)}</div>
                                        )}
                                    </div>
                                    <div className="card-meta">
                                        <div className="cm-row"><h3>{p.name}</h3><span className="price">${p.price}</span></div>
                                        <p className="cm-sub">{cardSub(p)}</p>
                                        <button className="add" disabled={p.usStock === 0} onClick={() => addItem(p)}>
                                            {p.usStock === 0 ? "Notify me" : "Add to bag"} <ArrowUpRight size={15} strokeWidth={2} />
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* MANIFESTO */}
            <section className="manifesto">
                <span className="sec-label light">(04) — Why we bother</span>
                <p className="manifesto-q">
                    Fast fashion floods you with <em>a thousand</em> things that show up in a month
                    and fall apart in a week. We pick the <em>few</em> you'll actually reach for —
                    and ship them from a shelf close enough to land before the mood passes.
                </p>
                <div className="manifesto-foot">
                    <span>Trend-led, wear-tested</span>
                    <span>US-warehoused stock</span>
                    <span>New drops weekly</span>
                </div>
            </section>
        </div>
    );
}