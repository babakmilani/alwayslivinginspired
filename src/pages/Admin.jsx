// src/pages/Admin.jsx
// Internal curation page. Visit /admin, paste your ADMIN_TOKEN, then sync + hide/show.
import React, { useEffect, useState } from "react";
import "./Admin.css";

const API_BASE =
    import.meta.env.VITE_API_BASE || "https://cj-proxy.milani-babak.workers.dev";

export default function Admin() {
    const [token, setToken] = useState(localStorage.getItem("ali_admin") || "");
    const [authed, setAuthed] = useState(false);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

    const load = async () => {
        setLoading(true);
        setMsg("");
        try {
            const res = await fetch(`${API_BASE}/admin/products`, { headers });
            if (res.status === 401) { setAuthed(false); setMsg("Invalid token."); return; }
            const data = await res.json();
            setItems(data);
            setAuthed(true);
            localStorage.setItem("ali_admin", token);
        } catch (e) {
            setMsg("Failed to load.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { if (token) load(); /* eslint-disable-next-line */ }, []);

    const toggle = async (pid, hidden) => {
        setItems((xs) => xs.map((x) => (x.id === pid ? { ...x, hidden: hidden ? 1 : 0 } : x)));
        await fetch(`${API_BASE}/admin/visibility`, {
            method: "POST",
            headers,
            body: JSON.stringify({ pid, hidden }),
        });
    };

    const sync = async (pages = 3) => {
        setLoading(true);
        setMsg("Syncing from CJ…");
        try {
            const res = await fetch(`${API_BASE}/sync?pages=${pages}`, { method: "POST", headers });
            const data = await res.json();
            setMsg(data.ok ? `Synced ${data.upserted} items across ${data.pages} pages.` : "Sync failed.");
            await load();
        } catch {
            setMsg("Sync failed.");
        } finally {
            setLoading(false);
        }
    };

    if (!authed) {
        return (
            <div className="admin-gate">
                <h1>Catalog admin</h1>
                <p>Enter your admin token.</p>
                <input
                    type="password"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="ADMIN_TOKEN"
                    onKeyDown={(e) => e.key === "Enter" && load()}
                />
                <button onClick={load} disabled={!token || loading}>{loading ? "Checking…" : "Enter"}</button>
                {msg && <p className="admin-msg">{msg}</p>}
            </div>
        );
    }

    const visible = items.filter((i) => !i.hidden).length;

    return (
        <div className="admin">
            <header className="admin-bar">
                <div>
                    <h1>Catalog</h1>
                    <span>{items.length} synced · {visible} visible · {items.length - visible} hidden</span>
                </div>
                <div className="admin-actions">
                    <button onClick={() => sync(3)} disabled={loading}>Sync 3 pages</button>
                    <button onClick={load} disabled={loading}>Refresh</button>
                </div>
            </header>
            {msg && <p className="admin-msg">{msg}</p>}
            <div className="admin-grid">
                {items.map((p) => (
                    <div key={p.id} className={`admin-card ${p.hidden ? "is-hidden" : ""}`}>
                        <div className="ac-img">{p.image && <img src={p.image} alt={p.name} loading="lazy" />}</div>
                        <div className="ac-body">
                            <p className="ac-name">{p.name}</p>
                            <p className="ac-meta">${p.price} <span>· cost ${p.cost}</span></p>
                            <p className="ac-cat">{p.category}</p>
                        </div>
                        <button className="ac-toggle" onClick={() => toggle(p.id, !p.hidden)}>
                            {p.hidden ? "Show" : "Hide"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}