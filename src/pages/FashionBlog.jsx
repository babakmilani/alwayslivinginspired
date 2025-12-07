// src/pages/FashionBlog.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './FashionBlog.css';
import '../pages/Home.css'; // For the adsense placeholder style

/* Modal functions for blog previews (kept for consistency) */
function openModal(modalId, caption) {
    let modal = document.getElementById(modalId);
    modal.style.display = "flex";
    modal.classList.add("show");
    let message = modal.querySelector(".caption");
    message.innerText = caption;
}

function closeModal(modalId) {
    let modal = document.getElementById(modalId);
    modal.classList.remove("show");
    setTimeout(function () {
        modal.style.display = "none";
        modal.querySelector(".caption").innerText = "";
    }, 300);
}

const FashionBlog = () => {
    return (


        <div className="fashion-blog-page">
            {/* ⭐️ AD PLACEHOLDER 1: TOP OF PAGE ⭐️ */}
            <div className="adsense-placeholder top-ad">
                {/* When approved, replace this comment with your AdSense code */}
                Google AdSense Ad - Top Placeholder (e.g., Leaderboard or Banner)
            </div>

            {/* Blog Header Section */}
            <div className="blog-header">
                <h1>Fashion & Style Blog</h1>
                <p className="blog-intro">
                    Discover the latest trends, styling tips, and fashion inspiration to keep you living inspired every day.
                </p>
            </div>

            {/* Blog Gallery Section */}
            <div className="gallery">
                {/* NEW ARTICLE: The Art of Sustainable Fashion: How Eco-Conscious Styling is Reshaping Modern Wardrobes */}
                <Link to="/blogs/the-art-of-sustainable-fashion-how-eco-conscious-styling-is-reshaping-modern-wardrobes" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #4ade80 0%, #059669 100%)', color: '#fff' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-leaf blog-icon" style={{ color: '#10b981' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#fff' }}>The Art of Sustainable Fashion: How Eco-Conscious Styling is Reshaping Modern Wardrobes</h2>
                        <p style={{ color: '#fff' }}>Discover how sustainable fashion is evolving beyond just eco-friendly materials to become a sophisticated style movement. Learn practical strategies for building a conscious wardrobe that's both environmentally responsible and effortlessly chic.</p>
                    </div>
                </Link>

                {/* NEW ARTICLE: The Renaissance of Vintage-Inspired Workwear: How Heritage Craft Clothing Is Revolutionizing Modern Professional Style */}
                <Link to="/blogs/the-renaissance-of-vintage-inspired-workwear-how-heritage-craft-clothing-is-revolutionizing-modern-professional-style" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-hard-hat blog-icon" style={{ color: '#CD853F' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#ffffffff' }}>The Renaissance of Vintage-Inspired Workwear: How Heritage Craft Clothing Is Revolutionizing Modern Professional Style</h2>
                        <p style={{ color: '#ffffffff' }}>Vintage-inspired workwear is making a powerful comeback, blending authentic craftsmanship with contemporary professional needs. This comprehensive guide explores how heritage brands and traditional techniques are reshaping modern workplace fashion.</p>
                    </div>
                </Link>

                {/* NEW ARTICLE: The Rise of Maximalist Jewelry: How Bold Statement Pieces Are Redefining Personal Style */}
                <Link to="/blogs/the-rise-of-maximalist-jewelry-how-bold-statement-pieces-are-redefining-personal-style" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #ffd700 0%, #ff6b6b 100%)' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-gem blog-icon" style={{ color: '#ffd700' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#ffffffff' }}>The Rise of Maximalist Jewelry: How Bold Statement Pieces Are Redefining Personal Style</h2>
                        <p style={{ color: '#ffffffff' }}>After years of minimalist jewelry dominating fashion, maximalist accessories are making a powerful comeback. From chunky chains to layered statement pieces, bold jewelry is becoming the ultimate form of self-expression and personal branding.</p>
                    </div>
                </Link>


                {/* 1. NEW ARTICLE: 8 Defining Trends (8-Trends-set-for-Fall-2025.html) */}
                <Link to="/blogs/8-Trends-set-for-Fall-2025" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #434343 0%, #000000 100%)', color: '#fff' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-magic blog-icon" style={{ color: '#fff' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#fff' }}>The Eight Themes</h2>
                        <p style={{ color: '#eee' }}>Dark Age, Curvature, and Technicolor: The 8 Concepts Defining Fall 2025.</p>
                    </div>
                </Link>

                {/* 2. EXISTING ARTICLE: Fall Shoe Guide (7-Shoes-to-Achieve-the-Fall-Look.html) */}
                <Link to="/blogs/7-Shoes-to-Achieve-the-Fall-Look" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #a87f58 0%, #b8976b 100%)', color: '#fff' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-shoe-prints blog-icon" style={{ color: '#fff' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#fff' }}>Fall Shoe Edit</h2>
                        <p style={{ color: '#eee' }}>7 essential shoes to complete all your Fall 2025 looks (Loafers, Mary Janes & more).</p>
                    </div>
                </Link>

                {/* 3. EXISTING ARTICLE: Menswear Guide (4-Mens-Wear-for-Fall.html) */}
                <Link to="/blogs/4-Mens-Wear-for-Fall" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', color: '#fff' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-male blog-icon" style={{ color: '#fff' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#fff' }}>Menswear Pillars</h2>
                        <p style={{ color: '#eee' }}>The Four Essential Investment Pieces to Anchor Your Fall Style.</p>
                    </div>
                </Link>

                {/* 4. EXISTING ARTICLE: Structure and Texture (The-New-Luxury-Structure-and-Texture-Fall-2025.html) */}
                <Link to="/blogs/The-New-Luxury-Structure-and-Texture-Fall-2025" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-tshirt blog-icon"></i>
                    </div>
                    <div className="blog-text">
                        <h2>Structure & Texture</h2>
                        <p>The New Rules of Style for Fall 2025: Why Structure and Suede Are Back.</p>
                    </div>
                </Link>

                {/* 5. EXISTING ARTICLE: Skirt Outfits (30-Fall-Skirt-Outfits.html) */}
                <Link to="/blogs/30-Fall-Skirt-Outfits" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #f0f0f0 0%, #dddddd 100%)', color: '#333' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-venus blog-icon" style={{ color: '#764ba2' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#ffffffff' }}>Fall Skirt Formulas</h2>
                        <p style={{ color: '#ffffffff' }}>My 3 Go-To Skirt Formulas for Effortless Fall Dressing.</p>
                    </div>
                </Link>

                {/* 6. EXISTING ARTICLE: Color Trends (5-autumn-color-trends-2025.html) */}
                <Link to="/blogs/5-autumn-color-trends-2025" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #74ebd5 0%, #9face6 100%)' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-palette blog-icon"></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#ffffffff' }}>Color Conviction</h2>
                        <p style={{ color: '#ffffffff' }}>Opinion: The 5 Essential Colors You Need for the Bold & Textured Fall 2025.</p>
                    </div>
                </Link>

                {/* 7. EXISTING ARTICLE: Autumn Must-Haves (top-5-must-have-autumn-styles.html) */}
                <Link to="/blogs/top-5-must-have-autumn-styles" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #ffc3a0 0%, #ff9e86 100%)' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-star blog-icon" style={{ color: '#a80000' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#ffffffff' }}>Autumn Must-Haves</h2>
                        <p style={{ color: '#ffffffff' }}>My Top 5 Must-Have Pieces to Nail Autumn Style.</p>
                    </div>
                </Link>

                {/* 8. NEW ARTICLE: The Return of the Structured Suit (The-New-Luxury-Structure-and-Texture-Fall-2025.html) */}
                <Link to="/blogs/The-New-Luxury-Structure-and-Texture-Fall-2025" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #a8c0ff 0%, #375d8d 100%)' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-tshirt blog-icon" style={{ color: '#ffffff' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#ffffffff' }}>The Power Suit Returns</h2>
                        <p style={{ color: '#ffffffff' }}>Sharp Tailoring: How to wear the oversized shoulder and 'working girl' gray suit.</p>
                    </div>
                </Link>

                {/* 9. NEW ARTICLE: The Unexpected Neutrals of 2026 (The-Unexpected-Neutrals-of-2026.html) */}
                <Link to="/blogs/The-Unexpected-Neutrals-of-2026" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #e6e6fa 0%, #ffefd5 100%)' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-palette blog-icon" style={{ color: '#8a2be2' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#ffffffff' }}>Unexpected Neutrals</h2>
                        <p style={{ color: '#ffffffff' }}>Forget Beige: Why Creamy Yellow and Lilac are your new base layer essentials.</p>
                    </div>
                </Link>

                {/* 10. NEW ARTICLE: Functional Necklaces (Functional-Necklaces-and-Necklace-Bags.html) */}
                <Link to="/blogs/Functional-Necklaces-and-Necklace-Bags" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #bdb76b 0%, #696969 100%)' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-boxes blog-icon" style={{ color: '#ffffff' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#ffffffff' }}>Accessories with Purpose</h2>
                        <p style={{ color: '#ffffffff' }}>Necklace Bags & Utility Pendants: The ultimate hands-free fashion statement.</p>
                    </div>
                </Link>

                {/* 11. NEW ARTICLE: Luxe Leather: How to Invest in Soft, Butter-Finished Leather (Luxe-leather.html)) */}
                <Link to="/blogs/Luxe-leather" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #bdb76b 0%, #696969 100%)' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-boxes blog-icon" style={{ color: '#b31919ff' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#ffffffff' }}>Leather</h2>
                        <p style={{ color: '#ffffffff' }}>How to Invest in Soft, Butter-Finished Leather Essentials.</p>
                    </div>
                </Link>

                {/* 12. NEW ARTICLE: The Power Couple: Pink and Red (The-Power-Couple.html) */}
                <Link to="/blogs/The-Power-Couple" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #e91e63 0%, #d32f2f 100%)' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-heart blog-icon" style={{ color: '#ffffff' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#ffffffff' }}>The Power Couple</h2>
                        <p style={{ color: '#ffffffff' }}>Mastering High-Impact Pink and Red Color Combinations.</p>
                    </div>
                </Link>

                {/* 13. NEW ARTICLE: Moccasins and Loafers: The Elegant Footwear That Replaces the Sneaker (Moccasins-and-Loafers.html) */}
                <Link to="/blogs/Moccasins-and-Loafers" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #4b4b4b 0%, #2c3e50 100%)' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-shoe-prints blog-icon" style={{ color: '#ffffff' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#ffffffff' }}>The Elegant Flat</h2>
                        <p style={{ color: '#ffffffff' }}>Moccasins and Loafers: The footwear replacing the chunky sneaker.</p>
                    </div>
                </Link>

            </div>

            {/* ⭐️ AD PLACEHOLDER 2: BOTTOM OF PAGE ⭐️ */}
            <div className="adsense-placeholder bottom-ad">
                {/* When approved, replace this comment with your AdSense code */}
                Google AdSense Ad - Bottom Placeholder (e.g., Large Rectangle)
            </div>

        </div>

    );
};

export default FashionBlog;