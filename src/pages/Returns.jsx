// src/pages/Returns.jsx
import { Link } from "react-router-dom";

export default function Returns() {
    return (
        <main style={s.wrap}>
            <article style={s.card}>
                <p style={s.eyebrow}>Customer Care</p>
                <h1 style={s.h1}>Returns &amp; Refunds</h1>
                <p style={s.updated}>Last updated: June 2026</p>

                <p style={s.p}>
                    We want you to love what you wear. If something isn’t right, here’s how returns and refunds work.
                </p>

                <h2 style={s.h2}>Return window</h2>
                <p style={s.p}>
                    You may request a return within <strong>30 days</strong> of delivery. Items must be unworn,
                    unwashed, with original tags attached and in their original packaging.
                </p>

                <h2 style={s.h2}>Items that can’t be returned</h2>
                <p style={s.p}>
                    For hygiene reasons, <strong>swimwear, lingerie, and other intimate apparel are final sale</strong>{" "}
                    and cannot be returned once the hygiene seal is removed or the item has been worn. Items marked
                    “Final Sale” at purchase are also non-returnable. This does not affect your rights regarding
                    faulty or incorrectly supplied goods.
                </p>

                <h2 style={s.h2}>How to start a return</h2>
                <p style={s.p}>
                    Email us through our <Link to="/contact" style={s.a}>Contact</Link> page with your order
                    reference and the item(s) you’d like to return. We’ll reply with return instructions and the
                    return address. Please don’t send items back before receiving instructions.
                </p>

                <h2 style={s.h2}>Return shipping</h2>
                <p style={s.p}>
                    For change-of-mind returns, return shipping is the customer’s responsibility. If your item
                    arrived <strong>faulty, damaged, or incorrect</strong>, we cover return shipping and will send a
                    replacement or full refund at no cost to you — just include a photo when you contact us.
                </p>

                <h2 style={s.h2}>Refunds</h2>
                <p style={s.p}>
                    Once your return is received and inspected, we’ll email you to confirm. Approved refunds are
                    issued to your original payment method, typically within 5–10 business days of inspection.
                    Depending on your bank or card issuer, it may take a few additional days to appear.
                </p>

                <h2 style={s.h2}>Exchanges</h2>
                <p style={s.p}>
                    The fastest way to exchange a size or color is to return the original item for a refund and
                    place a new order for the piece you want, subject to availability.
                </p>

                <h2 style={s.h2}>Order cancellations</h2>
                <p style={s.p}>
                    Need to cancel? Contact us as soon as possible after ordering. We process orders quickly, so we
                    can only cancel before an order has been dispatched.
                </p>

                <p style={s.foot}>
                    Need help with a return? Reach us via <Link to="/contact" style={s.a}>Contact</Link>, or review
                    our <Link to="/shipping" style={s.a}>Shipping</Link> policy.
                </p>
            </article>
        </main>
    );
}

const s = {
    wrap: { background: "#F1E9DC", padding: "56px 20px", display: "flex", justifyContent: "center" },
    card: { maxWidth: 760, width: "100%", background: "#FBF6EC", border: "1px solid rgba(25,20,15,0.10)", borderRadius: 18, padding: "44px 40px" },
    eyebrow: { fontFamily: "'Archivo', system-ui, sans-serif", textTransform: "uppercase", letterSpacing: "0.14em", fontSize: 12, color: "#C0664E", margin: 0 },
    h1: { fontFamily: "'Fraunces', Georgia, serif", fontSize: "2.1rem", color: "#19140F", margin: "8px 0 4px" },
    updated: { fontFamily: "'Archivo', system-ui, sans-serif", fontSize: 13, color: "rgba(25,20,15,0.5)", margin: "0 0 28px" },
    h2: { fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.2rem", color: "#19140F", margin: "26px 0 8px" },
    p: { fontFamily: "'Archivo', system-ui, sans-serif", fontSize: "1rem", lineHeight: 1.7, color: "rgba(25,20,15,0.82)", margin: "0 0 8px" },
    a: { color: "#C0664E", textDecoration: "underline" },
    foot: { fontFamily: "'Archivo', system-ui, sans-serif", fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(25,20,15,0.7)", marginTop: 30, paddingTop: 18, borderTop: "1px solid rgba(25,20,15,0.10)" },
};