// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { getProduct } from "../api/cj";
import { useCart } from "../context/CartContext";
import "./ProductDetail.css";

export default function ProductDetail() {
    const { pid } = useParams();
    const navigate = useNavigate();
    const { addItem, openCart } = useCart();

    const [p, setP] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(false);
    const [size, setSize] = useState(null);
    const [activeImg, setActiveImg] = useState(0);
    const [needSize, setNeedSize] = useState(false);

    useEffect(() => {
        let live = true;
        setLoading(true); setErr(false); setSize(null); setActiveImg(0); setNeedSize(false);
        window.scrollTo(0, 0);
        getProduct(pid)
            .then((d) => { if (!live) return; if (!d || d.error) setErr(true); else setP(d); setLoading(false); })
            .catch(() => { if (live) { setErr(true); setLoading(false); } });
        return () => { live = false; };
    }, [pid]);

    if (loading) return <div className="pdp brand"><div className="pdp-msg">Loading…</div></div>;
    if (err || !p) {
        return (
            <div className="pdp brand">
                <div className="pdp-msg">
                    <p>We couldn't load this piece.</p>
                    <Link to="/" className="pdp-back-link">← Back to the edit</Link>
                </div>
            </div>
        );
    }

    const hasVariants = p.variants && p.variants.length > 0;
    const out = p.usStock === 0;
    const images = (p.images && p.images.length ? p.images : [p.image]).filter(Boolean);

    const add = () => {
        if (out) return;
        if (hasVariants && !size) { setNeedSize(true); return; }
        const chosen = hasVariants ? p.variants.find((v) => v.label === size) : null;
        addItem(
            { id: p.id, name: p.name, image: p.image, price: p.price, category: p.category },
            { size: chosen?.label || null, vid: chosen?.vid || null, qty: 1 }
        );
        openCart();
    };

    return (
        <div className="pdp brand">
            <button className="pdp-back" onClick={() => navigate(-1)}><ArrowLeft size={16} strokeWidth={1.8} /> Back</button>

            <div className="pdp-grid">
                <div className="pdp-gallery">
                    <div className="pdp-main">{images[activeImg] && <img src={images[activeImg]} alt={p.name} />}</div>
                    {images.length > 1 && (
                        <div className="pdp-thumbs">
                            {images.slice(0, 6).map((src, i) => (
                                <button key={i} className={`pdp-thumb ${i === activeImg ? "on" : ""}`} onClick={() => setActiveImg(i)} aria-label={`Image ${i + 1}`}>
                                    <img src={src} alt="" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="pdp-info">
                    {p.category && <span className="pdp-cat">{p.category}</span>}
                    <h1 className="pdp-name">{p.name}</h1>
                    <div className="pdp-price">${Number(p.price).toFixed(2)}</div>

                    {typeof p.usStock === "number" && (
                        <div className={`pdp-stock ${out ? "out" : ""}`}>
                            {out ? "Currently restocking" : `${p.usStock} in US warehouse · ships in days`}
                        </div>
                    )}

                    {hasVariants && (
                        <div className="pdp-sizes">
                            <div className="pdp-sizes-label">
                                Size{needSize && !size ? <em> — please choose one</em> : ""}
                            </div>
                            <div className="pdp-size-grid">
                                {p.variants.map((v) => (
                                    <button
                                        key={v.vid}
                                        className={`pdp-size ${size === v.label ? "on" : ""}`}
                                        onClick={() => { setSize(v.label); setNeedSize(false); }}
                                    >
                                        {v.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <button className="pdp-add" disabled={out} onClick={add}>
                        {out ? "Notify me" : "Add to bag"} <ArrowUpRight size={16} strokeWidth={2} />
                    </button>

                    <ul className="pdp-trust">
                        <li>Ships from a US warehouse</li>
                        <li>3-day delivery on in-stock styles</li>
                        <li>Curated, not cluttered</li>
                    </ul>
                </div>
            </div>

            {/* ABOUT THIS PIECE */}
            <section className="pdp-section">
                <h2>About this piece</h2>
                <p>
                    A carefully curated {p.category?.toLowerCase() || "women's clothing"} piece selected for its quality, fit, and
                    wearability. We pick styles designed for real life — pieces you'll reach for repeatedly, that work with
                    what you already own, and that hold up over time. Each item in our edit is vetted for durability and
                    trend-relevance, so you're investing in something that will last.
                </p>
            </section>

            {/* WHY WE PICKED IT */}
            <section className="pdp-section">
                <h2>Why we picked it</h2>
                <ul className="pdp-reasons">
                    <li><strong>Trend-led.</strong> Fresh styles that reflect current fashion without chasing every fleeting trend.</li>
                    <li><strong>Wear-tested.</strong> Styles picked for real-world durability and comfort.</li>
                    <li><strong>Versatile.</strong> Pieces that layer, transition between seasons, and work with multiple looks.</li>
                </ul>
            </section>

            {/* SIZING & FIT */}
            <section className="pdp-section">
                <h2>Sizing & fit</h2>
                <p>
                    Sizing runs true to standard US sizing. If you're between sizes, we recommend sizing up for comfort.
                    All pieces are designed with everyday wear in mind — expect a relaxed, functional fit unless otherwise noted.
                    Check product photos for fit details (slim, loose, regular fit, etc.).
                </p>
                <p>
                    <strong>Not sure about your size?</strong> Our return policy lets you exchange for a different size within
                    30 days of purchase at no cost.
                </p>
            </section>

            {/* CARE INSTRUCTIONS */}
            <section className="pdp-section">
                <h2>Care instructions</h2>
                <ul className="pdp-care">
                    <li>Machine wash cold with similar colors</li>
                    <li>Tumble dry low or hang dry for best results</li>
                    <li>Avoid bleach and high heat</li>
                    <li>For delicate fabrics, use a gentle cycle or hand wash</li>
                </ul>
            </section>

            {/* SHIPPING & RETURNS */}
            <section className="pdp-section">
                <h2>Shipping & returns</h2>
                <p>
                    <strong>Shipping:</strong> All orders ship from our US warehouse within 1-2 business days. Most arrive within 3-5 days via standard
                    USPS Priority Mail. Shipping is calculated at checkout.
                </p>
                <p>
                    <strong>Returns:</strong> 30-day returns on unworn items with tags attached. We want you to love what you buy —
                    if something doesn't fit or work, send it back for an exchange or refund.
                </p>
            </section>

            {/* OUR PROMISE */}
            <section className="pdp-section pdp-promise">
                <h2>Our promise</h2>
                <p>
                    We're building a different kind of women's clothing edit. Not fast fashion. Not overcomplicated.
                    Just trend-led pieces you'll actually wear, sourced from US warehouse stock so they land before the mood passes.
                    New drops every week, same quality standard, same curated approach. We think that's worth your attention.
                </p>
            </section>
        </div>
    );
}