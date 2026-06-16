// src/components/CartDrawer.jsx
import React from "react";
import { X, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import "./CartDrawer.css";

export default function CartDrawer() {
    const { items, subtotal, count, isOpen, closeCart, updateQty, removeItem, checkout } = useCart();

    const stepBtn = {
        boxSizing: "border-box", width: 28, height: 28, minWidth: 0, flex: "0 0 auto",
        padding: 0, margin: 0, borderRadius: "50%",
        border: "1px solid rgba(25,20,15,0.28)", background: "transparent",
        color: "#19140F", cursor: "pointer",
        fontSize: "1.15rem", lineHeight: 1, fontWeight: 400,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
    };

    return (
        <>
            <div className={`cart-scrim ${isOpen ? "show" : ""}`} onClick={closeCart} aria-hidden />
            <aside className={`cart-drawer ${isOpen ? "open" : ""}`} role="dialog" aria-label="Shopping bag" aria-hidden={!isOpen}>
                <div className="cd-head">
                    <h2>Your bag{count > 0 ? ` (${count})` : ""}</h2>
                    <button className="cd-x" onClick={closeCart} aria-label="Close bag"><X size={18} strokeWidth={1.8} /></button>
                </div>

                {items.length === 0 ? (
                    <div className="cd-empty">
                        <p>Your bag is empty.</p>
                        <button className="cd-continue" onClick={closeCart}>Continue shopping</button>
                    </div>
                ) : (
                    <>
                        <div className="cd-items">
                            {items.map((it) => (
                                <div className="cd-item" key={it.key}>
                                    <div className="cd-thumb">{it.image && <img src={it.image} alt={it.name} loading="lazy" />}</div>
                                    <div className="cd-info">
                                        <div className="cd-name">{it.name}</div>
                                        {it.size && <div className="cd-size">Size {it.size}</div>}
                                        <div className="cd-price">${it.price.toFixed(2)}</div>
                                        <div className="cd-qty">
                                            <button style={stepBtn} onClick={() => updateQty(it.key, it.qty - 1)} aria-label="Decrease quantity">−</button>
                                            <span>{it.qty}</span>
                                            <button style={stepBtn} onClick={() => updateQty(it.key, it.qty + 1)} aria-label="Increase quantity">+</button>
                                            <button className="cd-remove" onClick={() => removeItem(it.key)}>Remove</button>
                                        </div>
                                    </div>
                                    <div className="cd-line">${(it.price * it.qty).toFixed(2)}</div>
                                </div>
                            ))}
                        </div>

                        <div className="cd-foot">
                            <div className="cd-sub">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <p className="cd-note">Shipping &amp; taxes calculated at checkout.</p>
                            <button className="cd-checkout" onClick={checkout}>
                                Checkout <ArrowRight size={16} strokeWidth={2} />
                            </button>
                        </div>
                    </>
                )}
            </aside>
        </>
    );
}