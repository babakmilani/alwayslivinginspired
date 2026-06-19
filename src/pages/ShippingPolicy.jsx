// src/pages/ShippingPolicy.jsx
import { Link } from "react-router-dom";

export default function ShippingPolicy() {
    return (
        <main style={s.wrap}>
            <article style={s.card}>
                <p style={s.eyebrow}>Customer Care</p>
                <h1 style={s.h1}>Shipping Policy</h1>
                <p style={s.updated}>Last updated: June 2026</p>

                <h2 style={s.h2}>Where your order ships from</h2>
                <p style={s.p}>
                    We ship from a regional warehouse closest to you — orders within the United States ship from
                    our US warehouse so they arrive quickly and without customs delays. Your order confirmation
                    notes the dispatch location.
                </p>

                <h2 style={s.h2}>Processing time</h2>
                <p style={s.p}>
                    In-stock pieces are prepared and dispatched within 1–2 business days of your order. You’ll
                    receive a confirmation email at purchase and a second email with tracking once your order
                    leaves the warehouse.
                </p>

                <h2 style={s.h2}>Delivery time</h2>
                <p style={s.p}>
                    In-stock US-warehouse items typically arrive within about 3 business days of dispatch.
                    Delivery windows are estimates provided by the carrier and can vary with location and
                    carrier conditions; they aren’t guarantees.
                </p>

                <h2 style={s.h2}>Shipping cost</h2>
                <p style={s.p}>
                    Standard shipping is complimentary on all current orders. Any applicable taxes are shown at
                    checkout before you pay.
                </p>

                <h2 style={s.h2}>Tracking your order</h2>
                <p style={s.p}>
                    A tracking number is emailed to you when your order ships. If it hasn’t arrived within the
                    estimated window, reach us through our <Link to="/contact" style={s.a}>Contact</Link> page with
                    your order reference and we’ll look into it right away.
                </p>

                <h2 style={s.h2}>Lost or delayed packages</h2>
                <p style={s.p}>
                    If tracking shows no movement for an extended period or your package is marked delivered but
                    missing, contact us within 14 days of the expected delivery date and we’ll help resolve it,
                    including a replacement or refund where appropriate.
                </p>

                <p style={s.foot}>
                    Questions about a shipment? Visit <Link to="/contact" style={s.a}>Contact</Link> or see our{" "}
                    <Link to="/returns" style={s.a}>Returns &amp; Refunds</Link> policy.
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