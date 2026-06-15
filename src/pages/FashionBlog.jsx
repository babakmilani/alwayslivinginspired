// src/pages/FashionBlog.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./FashionBlog.css";
import "../pages/Home.css";

export default function FashionBlog() {
    const [articles, setArticles] = useState([]);
    const [q, setQ] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/blogs/articles.json")
            .then((r) => r.json())
            .then((d) => { setArticles(Array.isArray(d) ? d : []); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const term = q.trim().toLowerCase();
    const shown = useMemo(() => {
        if (!term) return articles;
        return articles.filter((a) =>
            `${a.title} ${a.summary || ""} ${a.category || ""}`.toLowerCase().includes(term)
        );
    }, [articles, term]);

    return (
        <div className="fashion-blog-page">
            <div className="blog-header">
                <h1>Fashion &amp; Style Blog</h1>
                <p className="blog-intro">
                    Discover the latest trends, styling tips, and fashion inspiration to keep you living inspired every day.
                </p>

                <div className="blog-search-wrap">
                    <input
                        className="blog-search"
                        type="search"
                        placeholder="Search articles by keyword…"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        aria-label="Search articles"
                    />
                    {!loading && (
                        <span className="blog-count">
                            {shown.length} article{shown.length !== 1 ? "s" : ""}{term ? ` matching “${q}”` : ""}
                        </span>
                    )}
                </div>
            </div>

            <div className="gallery">
                {shown.map((a) => (
                    <Link
                        key={a.slug}
                        to={`/blogs/${a.slug}`}
                        className="gallery-item blog-card"
                        style={{ "--card-gradient": a.gradient, color: "#fff" }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className={`${a.iconClass} blog-icon`} style={{ color: a.iconColor }}></i>
                        </div>
                        <div className="blog-text">
                            <h2 style={{ color: "#fff" }}>{a.title}</h2>
                            <p style={{ color: "#fff" }}>{a.summary}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {loading && <p className="blog-status">Loading articles…</p>}
            {!loading && shown.length === 0 && (
                <p className="blog-status">No articles match “{q}”.</p>
            )}
        </div>
    );
}