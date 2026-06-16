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
        </div>
    );
}