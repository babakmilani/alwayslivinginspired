// src/pages/AboutUs.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "./AboutUs.css";

const AboutUs = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div className="about-page brand">
            <section className="about-hero">
                <span className={`eyebrow rise ${mounted ? "in" : ""}`} style={{ "--d": "0ms" }}>
                    (About) — Always Living Inspired
                </span>
                <h1 className={`rise ${mounted ? "in" : ""}`} style={{ "--d": "80ms" }}>
                    We built a <span className="it">smaller</span> store on purpose.
                </h1>
                <p className={`about-lead rise ${mounted ? "in" : ""}`} style={{ "--d": "200ms" }}>
                    Always Living Inspired is a tight, rotating edit of women's clothing — not a catalog of
                    ten thousand things you'll scroll past, but a short list of pieces chosen to earn a place
                    in your week.
                </p>
            </section>

            <section className="about-block">
                <span className="sec-label">(01) — The idea</span>
                <p>
                    Fast fashion's whole bet is volume: flood you with options, hope something sticks, and
                    ship it slowly from the other side of the world. We took the opposite bet — choose less,
                    choose things that work in real life, and keep them close enough to arrive fast.
                </p>
            </section>

            <section className="about-block">
                <span className="sec-label">(02) — How we choose</span>
                <p>
                    We watch what's actually being worn, not just what walks a runway, and we keep the edit
                    deliberately small — a handful of new pieces at a time, refreshed often. If we wouldn't
                    reach for it ourselves, it doesn't make the cut.
                </p>
            </section>

            <section className="about-block">
                <span className="sec-label">(03) — How it reaches you</span>
                <p>
                    Everything we carry is held in US warehouses, so your order ships from a domestic shelf and
                    lands in days — not the two-to-three weeks most overseas shops quietly run. Fast isn't a
                    premium add-on here; it's the default.
                </p>
            </section>

            <section className="about-block">
                <span className="sec-label">(04) — The honest part</span>
                <p>
                    We're small and independent — a one-person studio, not a fashion house. That's the point.
                    It keeps the edit tight, the choices personal, and the whole thing honest about what it is:
                    a place to find a few good things and get on with your day.
                </p>
            </section>

            <section className="about-cta">
                <p className="about-close">No noise. No thousand-item scroll. Just the edit, refreshed each week.</p>
                <Link to="/" className="cta">Shop the edit <ArrowRight size={18} /></Link>
            </section>
        </div>
    );
};

export default AboutUs;