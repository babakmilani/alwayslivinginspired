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
            
            {/* Blog Header Section */}
            <div className="blog-header">
                <h1>Fashion & Style Blog</h1>
                <p className="blog-intro">
                    Discover the latest trends, styling tips, and fashion inspiration to keep you living inspired every day.
                </p>
            </div>

            {/* Blog Gallery Section */}
            <div className="gallery">
                {/* NEW ARTICLE: The Art of Pattern Mixing: Mastering the Bold Trend Reshaping Contemporary Style in 2025 */}
                <Link to="/blogs/the-art-of-pattern-mixing-mastering-the-bold-trend-reshaping-contemporary-style-in-2025" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)', color: '#fff' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-palette blog-icon" style={{ color: '#ff6b6b' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#fff' }}>The Art of Pattern Mixing: Mastering the Bold Trend Reshaping Contemporary Style in 2025</h2>
                        <p style={{ color: '#fff' }}>Pattern mixing has emerged as 2025's most daring and creative fashion trend, allowing individuals to break traditional style rules while creating uniquely personal and expressive looks. This comprehensive guide reveals the art and science behind successfully combining different patterns for maximum impact.</p>
                    </div>
                </Link>

                {/* NEW ARTICLE: The Art of Capsule Wardrobe Building: Creating Maximum Style with Minimal Pieces in 2025 */}
                <Link to="/blogs/the-art-of-capsule-wardrobe-building-creating-maximum-style-with-minimal-pieces-in-2025" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-layer-group blog-icon" style={{ color: '#646cff' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#fff' }}>The Art of Capsule Wardrobe Building: Creating Maximum Style with Minimal Pieces in 2025</h2>
                        <p style={{ color: '#fff' }}>Discover how to build a strategic capsule wardrobe that maximizes style versatility while minimizing clutter. Learn the essential pieces, color coordination strategies, and styling formulas that create endless outfit possibilities from just 30-40 carefully chosen items.</p>
                    </div>
                </Link>

                {/* NEW ARTICLE: The Micro-Trend Revolution: How Viral Fashion Moments Are Reshaping How We Shop and Style */}
                <Link to="/blogs/the-micro-trend-revolution-how-viral-fashion-moments-are-reshaping-how-we-shop-and-style" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)', color: '#fff' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-mobile-alt blog-icon" style={{ color: '#ff6b9d' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#fff' }}>The Micro-Trend Revolution: How Viral Fashion Moments Are Reshaping How We Shop and Style</h2>
                        <p style={{ color: '#fff' }}>From TikTok-driven aesthetics to Instagram-inspired micro-trends, social media is creating fashion cycles that last weeks instead of seasons. We explore how to navigate this fast-paced style landscape while building a thoughtful, adaptable wardrobe.</p>
                    </div>
                </Link>

                {/* NEW ARTICLE: The Tech-Fashion Fusion: How Smart Accessories Are Revolutionizing Personal Style in 2025 */}
                <Link to="/blogs/the-tech-fashion-fusion-how-smart-accessories-are-revolutionizing-personal-style-in-2025" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-microchip blog-icon" style={{ color: '#667eea' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#fff' }}>The Tech-Fashion Fusion: How Smart Accessories Are Revolutionizing Personal Style in 2025</h2>
                        <p style={{ color: '#fff' }}>Explore the groundbreaking intersection of technology and fashion as smart accessories transform how we express personal style. From AI-powered jewelry to adaptive footwear, discover how tech-infused fashion pieces are creating a new era of intelligent style.</p>
                    </div>
                </Link>

                {/* NEW ARTICLE: The Artisan Revival: How Handcrafted Fashion is Redefining Luxury in the Digital Age */}
                <Link to="/blogs/the-artisan-revival-how-handcrafted-fashion-is-redefining-luxury-in-the-digital-age" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #8B4513 0%, #DEB887 100%)', color: '#fff' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-hands blog-icon" style={{ color: '#8B4513' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#fff' }}>The Artisan Revival: How Handcrafted Fashion is Redefining Luxury in the Digital Age</h2>
                        <p style={{ color: '#fff' }}>Discover how the resurgence of handcrafted fashion is challenging fast fashion dominance, with artisan-made pieces becoming the ultimate status symbol. From hand-embroidered details to traditional weaving techniques, explore how to incorporate authentic craftsmanship into your modern wardrobe.</p>
                    </div>
                </Link>

                {/* NEW ARTICLE: The Mirror Method: How Self-Styling Technology and Smart Wardrobes Are Revolutionizing Personal Fashion */}
                <Link to="/blogs/the-mirror-method-how-self-styling-technology-and-smart-wardrobes-are-revolutionizing-personal-fashion" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-mirror blog-icon" style={{ color: '#667eea' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#fff' }}>The Mirror Method: How Self-Styling Technology and Smart Wardrobes Are Revolutionizing Personal Fashion</h2>
                        <p style={{ color: '#fff' }}>Explore how smart mirrors, AI styling assistants, and tech-integrated wardrobes are transforming the way we approach personal style. From virtual try-ons to mood-responsive outfit curation, discover the future of fashion at your fingertips.</p>
                    </div>
                </Link>

                {/* NEW ARTICLE: The Art of Effortless Elegance: How French Girl Style is Redefining Modern Sophistication */}
                <Link to="/blogs/the-art-of-effortless-elegance-how-french-girl-style-is-redefining-modern-sophistication" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #ff6b8a 0%, #4ecdc4 100%)', color: '#fff' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-heart blog-icon" style={{ color: '#ff6b8a' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#fff' }}>The Art of Effortless Elegance: How French Girl Style is Redefining Modern Sophistication</h2>
                        <p style={{ color: '#fff' }}>Discover the timeless secrets of French girl style and learn how to master the art of effortless elegance. This comprehensive guide breaks down the essential elements, key pieces, and styling philosophy that make this aesthetic eternally chic.</p>
                    </div>
                </Link>

                {/* NEW ARTICLE: The Art of Layered Textures: How Mixed-Media Fashion is Creating Depth in Modern Style */}
                <Link to="/blogs/the-art-of-layered-textures-how-mixed-media-fashion-is-creating-depth-in-modern-style" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-layer-group blog-icon" style={{ color: '#764ba2' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#fff' }}>The Art of Layered Textures: How Mixed-Media Fashion is Creating Depth in Modern Style</h2>
                        <p style={{ color: '#fff' }}>Discover how the strategic combination of contrasting textures and materials is revolutionizing contemporary fashion, creating visually compelling outfits that tell stories through tactile experiences. This comprehensive guide explores the art of mixing silk with denim, leather with knits, and other unexpected combinations that are defining modern style.</p>
                    </div>
                </Link>

                {/* NEW ARTICLE: The Androgynous Fashion Revolution: How Gender-Neutral Styling is Reshaping Contemporary Fashion */}
                <Link to="/blogs/the-androgynous-fashion-revolution-how-gender-neutral-styling-is-reshaping-contemporary-fashion" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', color: '#fff' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-venus-mars blog-icon" style={{ color: '#7c3aed' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#fff' }}>The Androgynous Fashion Revolution: How Gender-Neutral Styling is Reshaping Contemporary Fashion</h2>
                        <p style={{ color: '#fff' }}>Explore the transformative power of androgynous fashion as it breaks traditional gender barriers and creates a new paradigm for self-expression. This comprehensive guide reveals how to master the art of gender-neutral styling for a more inclusive and versatile wardrobe.</p>
                    </div>
                </Link>

                {/* NEW ARTICLE: The Art of Elevated Casual: How Contemporary Comfort Wear is Redefining Modern Sophistication */}
                <Link to="/blogs/the-art-of-elevated-casual-how-contemporary-comfort-wear-is-redefining-modern-sophistication" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-tshirt blog-icon" style={{ color: '#667eea' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#fff' }}>The Art of Elevated Casual: How Contemporary Comfort Wear is Redefining Modern Sophistication</h2>
                        <p style={{ color: '#fff' }}>Discover how the elevated casual movement is transforming everyday comfort wear into sophisticated fashion statements. This comprehensive guide explores the techniques, key pieces, and styling secrets that make casual clothing look effortlessly chic and intentionally curated.</p>
                    </div>
                </Link>

                {/* NEW ARTICLE: The New Romantic: How Cottagecore-Inspired Evening Wear is Transforming Modern Formal Dressing */}
                <Link to="/blogs/the-new-romantic-how-cottagecore-inspired-evening-wear-is-transforming-modern-formal-dressing" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #ff7eb3 0%, #ff758c 100%)', color: '#fff' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-leaf blog-icon" style={{ color: '#e91e63' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#fff' }}>The New Romantic: How Cottagecore-Inspired Evening Wear is Transforming Modern Formal Dressing</h2>
                        <p style={{ color: '#fff' }}>Discover how the romantic cottagecore aesthetic is revolutionizing evening wear with prairie-inspired silhouettes, artisanal details, and sustainable luxury. This comprehensive guide explores how to master the new romantic formal style that's captivating fashion enthusiasts worldwide.</p>
                    </div>
                </Link>

                {/* NEW ARTICLE: The Art of Transitional Dressing: Mastering Climate-Adaptive Fashion for the Modern Wardrobe */}
                <Link to="/blogs/the-art-of-transitional-dressing-mastering-climate-adaptive-fashion-for-the-modern-wardrobe" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-thermometer-half blog-icon" style={{ color: '#667eea' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#fff' }}>The Art of Transitional Dressing: Mastering Climate-Adaptive Fashion for the Modern Wardrobe</h2>
                        <p style={{ color: '#fff' }}>As global weather patterns become increasingly unpredictable, mastering the art of transitional dressing has become essential for the modern fashion-conscious individual. This comprehensive guide explores innovative layering techniques, versatile pieces, and climate-responsive styling strategies that ensure you look polished regardless of temperature fluctuations.</p>
                    </div>
                </Link>

                {/* NEW ARTICLE: The Art of Color Blocking: Mastering Bold Combinations for Modern Style */}
                <Link to="/blogs/the-art-of-color-blocking-mastering-bold-combinations-for-modern-style" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)', color: '#fff' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-palette blog-icon" style={{ color: '#ff6b6b' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#fff' }}>The Art of Color Blocking: Mastering Bold Combinations for Modern Style</h2>
                        <p style={{ color: '#fff' }}>Color blocking has emerged as one of the most powerful styling techniques of 2025, allowing fashion enthusiasts to create striking, confident looks through strategic color pairing. This comprehensive guide explores how to master this vibrant trend with sophistication and personal flair.</p>
                    </div>
                </Link>

                {/* NEW ARTICLE: The Digital Fashion Revolution: How Virtual Styling and AI-Powered Wardrobes Are Transforming Personal Style in 2025 */}
                <Link to="/blogs/the-digital-fashion-revolution-how-virtual-styling-and-ai-powered-wardrobes-are-transforming-personal-style-in-2025" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-robot blog-icon" style={{ color: '#667eea' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#fff' }}>The Digital Fashion Revolution: How Virtual Styling and AI-Powered Wardrobes Are Transforming Personal Style in 2025</h2>
                        <p style={{ color: '#fff' }}>Explore how cutting-edge technology is revolutionizing the way we approach fashion, from AI-powered style recommendations to virtual try-on experiences. Discover the tools and trends that are making personal styling more accessible, sustainable, and personalized than ever before.</p>
                    </div>
                </Link>

                {/* NEW ARTICLE: The Minimalist Renaissance: How Clean Lines and Quiet Luxury Are Defining 2025's Fashion Movement */}
                <Link to="/blogs/the-minimalist-renaissance-how-clean-lines-and-quiet-luxury-are-defining-2025s-fashion-movement" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', color: '#fff' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-gem blog-icon" style={{ color: '#646cff' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#fff' }}>The Minimalist Renaissance: How Clean Lines and Quiet Luxury Are Defining 2025's Fashion Movement</h2>
                        <p style={{ color: '#fff' }}>Discover how minimalist fashion is experiencing a sophisticated revival, blending timeless elegance with modern innovation. From capsule wardrobes to investment pieces that transcend seasons, explore the art of refined simplicity that's reshaping contemporary style.</p>
                    </div>
                </Link>

                {/* NEW ARTICLE: The Revival of Power Dressing: How Contemporary Blazers Are Defining Professional Confidence in 2025 */}
                <Link to="/blogs/the-revival-of-power-dressing-how-contemporary-blazers-are-defining-professional-confidence-in-2025" className="gallery-item blog-card" style={{ '--card-gradient': 'linear-gradient(135deg, #2E3192 0%, #1BFFFF 100%)', color: '#fff' }}>
                    <div className="blog-icon-wrapper">
                        <i className="fas fa-user-tie blog-icon" style={{ color: '#2E3192' }}></i>
                    </div>
                    <div className="blog-text">
                        <h2 style={{ color: '#fff' }}>The Revival of Power Dressing: How Contemporary Blazers Are Defining Professional Confidence in 2025</h2>
                        <p style={{ color: '#fff' }}>Discover how the modern blazer has evolved beyond traditional suiting to become the ultimate symbol of professional power and personal style. From oversized silhouettes to unexpected textures, explore the blazer trends that are reshaping workplace fashion.</p>
                    </div>
                </Link>

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

        </div>

    );
};

export default FashionBlog;