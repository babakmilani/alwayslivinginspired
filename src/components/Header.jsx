// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import "./Header.css";
import SocialLinks from "./SocialLinks.jsx";

const ETHOS = ["NEW IN WEEKLY", "SHIPS FROM THE US", "3-DAY DELIVERY", "CURATED, NOT CLUTTERED", "THE WEAR-NOW EDIT"];

export default function Header() {
    const { count, openCart } = useCart();

    return (
        <header className="site-header brand">
            <div className="mast">
                <nav className="mast-nav left">
                    <Link to="/">New in</Link>
                    <Link to="/fashion-blog">Journal</Link>
                    <Link to="/about">About</Link>
                </nav>

                <Link to="/" className="wordmark">
                    <span className="wm-line">Always Living Inspired</span>
                    <span className="wm-sub">Women's Edit</span>
                </Link>

                <nav className="mast-nav right">
                    <SocialLinks variant="header" />
                    <Link to="/contact">Help</Link>
                    <button className="bag" aria-label="Bag" onClick={openCart}>
                        <ShoppingBag size={17} strokeWidth={1.6} /> <span>{count}</span>
                    </button>
                </nav>
            </div>

            <div className="marquee" aria-hidden>
                <div className="marquee-track">
                    {[...ETHOS, ...ETHOS, ...ETHOS].map((w, i) => (
                        <span key={i} className="mq-item">{w}<i className="dot">✶</i></span>
                    ))}
                </div>
            </div>
        </header>
    );
}