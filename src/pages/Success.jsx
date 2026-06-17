// src/pages/Success.jsx
// Landing page after a successful Stripe Checkout. Clears the cart and
// reassures the shopper. Order fulfillment (CJ) is handled server-side (3d).
import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Success() {
    const { clear } = useCart();
    const [params] = useSearchParams();
    const sessionId = params.get("session_id");
    const cleared = useRef(false);

    useEffect(() => {
        // Payment succeeded — empty the bag once.
        if (!cleared.current) {
            cleared.current = true;
            clear();
        }
    }, [clear]);

    return (
        <main style={styles.wrap}>
            <div style={styles.card}>
                <div style={styles.mark}>✓</div>
                <h1 style={styles.h1}>Thank you — your order is in.</h1>
                <p style={styles.lead}>
                    We’ve received your payment and your order is confirmed.
                    Your pieces ship from a US warehouse, typically arriving in about 3 days.
                </p>
                {sessionId && (
                    <p style={styles.ref}>
                        Order reference: <span style={styles.refCode}>{sessionId.slice(-12)}</span>
                    </p>
                )}
                <Link to="/" style={styles.btn}>Continue shopping</Link>
            </div>
        </main>
    );
}

const styles = {
    wrap: {
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 20px",
        background: "#F1E9DC",
    },
    card: {
        maxWidth: 560,
        width: "100%",
        textAlign: "center",
        background: "#FBF6EC",
        border: "1px solid rgba(25,20,15,0.10)",
        borderRadius: 18,
        padding: "44px 36px",
    },
    mark: {
        width: 56,
        height: 56,
        lineHeight: "56px",
        margin: "0 auto 22px",
        borderRadius: "50%",
        background: "#C0664E",
        color: "#FBF6EC",
        fontSize: 28,
        fontWeight: 700,
    },
    h1: {
        fontFamily: "'Fraunces', Georgia, serif",
        fontSize: "1.9rem",
        color: "#19140F",
        margin: "0 0 14px",
        lineHeight: 1.15,
    },
    lead: {
        fontFamily: "'Archivo', system-ui, sans-serif",
        fontSize: "1.02rem",
        color: "rgba(25,20,15,0.78)",
        lineHeight: 1.6,
        margin: "0 0 18px",
    },
    ref: {
        fontFamily: "'Archivo', system-ui, sans-serif",
        fontSize: "0.86rem",
        color: "rgba(25,20,15,0.55)",
        margin: "0 0 26px",
    },
    refCode: { color: "#C0664E", fontWeight: 600, letterSpacing: "0.04em" },
    btn: {
        display: "inline-block",
        background: "#19140F",
        color: "#F1E9DC",
        textDecoration: "none",
        fontFamily: "'Archivo', system-ui, sans-serif",
        fontWeight: 600,
        fontSize: "0.95rem",
        padding: "14px 30px",
        borderRadius: 999,
    },
};