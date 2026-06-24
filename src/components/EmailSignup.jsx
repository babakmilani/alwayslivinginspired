// src/components/EmailSignup.jsx
// Drop this wherever your signup field lives (footer / homepage hero).
// On submit it captures the email and the welcome code is emailed automatically.
import { useState } from "react";
import { subscribe } from "../api/cj.js";

export default function EmailSignup({
    source = "site",
    heading = "Get 10% off your first order",
    sub = "Join the edit — we'll send your code and the occasional new-in drop.",
}) {
    const [email, setEmail] = useState("");
    const [state, setState] = useState("idle"); // idle | loading | done | error
    const [msg, setMsg] = useState("");

    async function submit(e) {
        e.preventDefault();
        if (state === "loading") return;
        const value = email.trim();
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
            setState("error"); setMsg("Please enter a valid email.");
            return;
        }
        setState("loading");
        try {
            await subscribe(value, source);
            setState("done");
            setMsg("Check your inbox — your code is on the way.");
        } catch {
            setState("error");
            setMsg("Something went wrong. Please try again.");
        }
    }

    if (state === "done") {
        return (
            <div style={st.wrap}>
                <p style={st.heading}>You're in.</p>
                <p style={st.sub}>{msg}</p>
            </div>
        );
    }

    return (
        <div style={st.wrap}>
            <p style={st.heading}>{heading}</p>
            <p style={st.sub}>{sub}</p>
            <form onSubmit={submit} style={st.form}>
                <input
                    type="email"
                    inputMode="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
                    style={st.input}
                    aria-label="Email address"
                />
                <button type="submit" style={st.btn} disabled={state === "loading"}>
                    {state === "loading" ? "Sending…" : "Get my code"}
                </button>
            </form>
            {state === "error" && <p style={st.err}>{msg}</p>}
        </div>
    );
}

const st = {
    wrap: { maxWidth: 440 },
    heading: { fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.25rem", color: "#19140F", margin: "0 0 6px" },
    sub: { fontFamily: "'Archivo', system-ui, sans-serif", fontSize: "0.95rem", color: "rgba(25,20,15,0.7)", lineHeight: 1.55, margin: "0 0 14px" },
    form: { display: "flex", gap: 8, flexWrap: "wrap" },
    input: {
        flex: "1 1 200px", minWidth: 0, padding: "12px 14px", borderRadius: 999,
        border: "1px solid rgba(25,20,15,0.25)", background: "#FBF6EC",
        fontFamily: "'Archivo', system-ui, sans-serif", fontSize: "0.95rem", color: "#19140F",
    },
    btn: {
        padding: "12px 22px", borderRadius: 999, border: "none", cursor: "pointer",
        background: "#19140F", color: "#F1E9DC", fontFamily: "'Archivo', system-ui, sans-serif",
        fontWeight: 600, fontSize: "0.95rem", whiteSpace: "nowrap",
    },
    err: { fontFamily: "'Archivo', system-ui, sans-serif", fontSize: "0.85rem", color: "#b23b2e", margin: "8px 0 0" },
};