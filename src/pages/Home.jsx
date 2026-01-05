// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import './FashionBlog.css'; // Import blog card styling

const Home = () => {
    const navigate = useNavigate();

    // Navigate to products page with specific section
    const goToProducts = (section) => {
        navigate(`/products#${section}`);
    };

    return (
        <div className="home-page">
            

            <div className="gallery">
                {/* ITEM 1: ACCESSORIES */}
                <div
                    className="gallery-item product-card"
                    onClick={() => window.open('https://alwayslivinginspired.printful.me', '_blank')}
                >
                    <img src="/images/Woman+white+hat.png" alt="hats" width="600" height="400" />
                    <div className="product-label">ACCESSORIES</div>
                </div>

                {/* ITEM 2: T-SHIRTS */}
                <div
                    className="gallery-item product-card"
                    onClick={() => window.open('https://alwayslivinginspired.printful.me', '_blank')}
                >
                    <img src="/images/Man+White+shirt.png" alt="t-shirts" width="600" height="400" />
                    <div className="product-label">T-SHIRTS</div>
                </div>

                {/* ITEM 3: SHOES */}
                <div
                    className="gallery-item product-card"
                    onClick={() => window.open('https://alwayslivinginspired.printful.me', '_blank')}
                >
                    <img src="/images/shoes.png" alt="shoes" width="600" height="400" />
                    <div className="product-label">SHOES</div>
                </div>

                {/* ITEM 4: BAGS */}
                <div
                    className="gallery-item product-card"
                    onClick={() => window.open('https://alwayslivinginspired.printful.me', '_blank')}
                >
                    <img src="/images/bags.png" alt="bags" width="600" height="400" />
                    <div className="product-label">BAGS</div>
                </div>
            </div>

            {/* FEATURED BLOG ARTICLES SECTION */}
            <div style={{ marginTop: '60px', marginBottom: '40px' }}>
                <h2 style={{ textAlign: 'center', fontSize: '2.5em', marginBottom: '30px', color: '#646cff' }}>
                    Latest Fashion Insights
                </h2>

                <div className="gallery">
                    {/* Featured Blog: The Art of Transitional Dressing: Mastering Climate-Adaptive Fashion for the Modern Wardrobe */}
                    <Link
                        to="/blogs/the-art-of-transitional-dressing-mastering-climate-adaptive-fashion-for-the-modern-wardrobe"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-thermometer-half blog-icon" style={{ color: '#667eea' }}></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>The Art of Transitional Dressing: Mastering Climate-Adaptive Fashion for the Modern Wardrobe</h3>
                            <p style={{ color: '#fff', fontSize: '0.95em' }}>As global weather patterns become increasingly unpredictable, mastering the art of transitional dressing has become essential for the modern fashion-conscious individual. This comprehensive guide explores innovative layering techniques, versatile pieces, and climate-responsive styling strategies that ensure you look polished regardless of temperature fluctuations.</p>
                        </div>
                    </Link>

                    {/* Featured Blog: The Art of Color Blocking: Mastering Bold Combinations for Modern Style */}
                    <Link
                        to="/blogs/the-art-of-color-blocking-mastering-bold-combinations-for-modern-style"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-palette blog-icon" style={{ color: '#ff6b6b' }}></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>The Art of Color Blocking: Mastering Bold Combinations for Modern Style</h3>
                            <p style={{ color: '#fff', fontSize: '0.95em' }}>Color blocking has emerged as one of the most powerful styling techniques of 2025, allowing fashion enthusiasts to create striking, confident looks through strategic color pairing. This comprehensive guide explores how to master this vibrant trend with sophistication and personal flair.</p>
                        </div>
                    </Link>

                    {/* Featured Blog: The Digital Fashion Revolution: How Virtual Styling and AI-Powered Wardrobes Are Transforming Personal Style in 2025 */}
                    <Link
                        to="/blogs/the-digital-fashion-revolution-how-virtual-styling-and-ai-powered-wardrobes-are-transforming-personal-style-in-2025"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-robot blog-icon" style={{ color: '#667eea' }}></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>The Digital Fashion Revolution: How Virtual Styling and AI-Powered Wardrobes Are Transforming Personal Style in 2025</h3>
                            <p style={{ color: '#fff', fontSize: '0.95em' }}>Explore how cutting-edge technology is revolutionizing the way we approach fashion, from AI-powered style recommendations to virtual try-on experiences. Discover the tools and trends that are making personal styling more accessible, sustainable, and personalized than ever before.</p>
                        </div>
                    </Link>

                    {/* Featured Blog: The Minimalist Renaissance: How Clean Lines and Quiet Luxury Are Defining 2025's Fashion Movement */}
                    <Link
                        to="/blogs/the-minimalist-renaissance-how-clean-lines-and-quiet-luxury-are-defining-2025s-fashion-movement"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-gem blog-icon" style={{ color: '#646cff' }}></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>The Minimalist Renaissance: How Clean Lines and Quiet Luxury Are Defining 2025's Fashion Movement</h3>
                            <p style={{ color: '#fff', fontSize: '0.95em' }}>Discover how minimalist fashion is experiencing a sophisticated revival, blending timeless elegance with modern innovation. From capsule wardrobes to investment pieces that transcend seasons, explore the art of refined simplicity that's reshaping contemporary style.</p>
                        </div>
                    </Link>

                    {/* Featured Blog: The Revival of Power Dressing: How Contemporary Blazers Are Defining Professional Confidence in 2025 */}
                    <Link
                        to="/blogs/the-revival-of-power-dressing-how-contemporary-blazers-are-defining-professional-confidence-in-2025"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #2E3192 0%, #1BFFFF 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-user-tie blog-icon" style={{ color: '#2E3192' }}></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>The Revival of Power Dressing: How Contemporary Blazers Are Defining Professional Confidence in 2025</h3>
                            <p style={{ color: '#fff', fontSize: '0.95em' }}>Discover how the modern blazer has evolved beyond traditional suiting to become the ultimate symbol of professional power and personal style. From oversized silhouettes to unexpected textures, explore the blazer trends that are reshaping workplace fashion.</p>
                        </div>
                    </Link>

                    {/* Featured Blog: The Art of Sustainable Fashion: How Eco-Conscious Styling is Reshaping Modern Wardrobes */}
                    <Link
                        to="/blogs/the-art-of-sustainable-fashion-how-eco-conscious-styling-is-reshaping-modern-wardrobes"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #4ade80 0%, #059669 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-leaf blog-icon" style={{ color: '#10b981' }}></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>The Art of Sustainable Fashion: How Eco-Conscious Styling is Reshaping Modern Wardrobes</h3>
                            <p style={{ color: '#fff', fontSize: '0.95em' }}>Discover how sustainable fashion is evolving beyond just eco-friendly materials to become a sophisticated style movement. Learn practical strategies for building a conscious wardrobe that's both environmentally responsible and effortlessly chic.</p>
                        </div>
                    </Link>

                    {/* Featured Blog: The Renaissance of Vintage-Inspired Workwear: How Heritage Craft Clothing Is Revolutionizing Modern Professional Style */}
                    <Link
                        to="/blogs/the-renaissance-of-vintage-inspired-workwear-how-heritage-craft-clothing-is-revolutionizing-modern-professional-style"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-hard-hat blog-icon" style={{ color: '#CD853F' }}></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>The Renaissance of Vintage-Inspired Workwear: How Heritage Craft Clothing Is Revolutionizing Modern Professional Style</h3>
                            <p style={{ color: '#fff', fontSize: '0.95em' }}>Vintage-inspired workwear is making a powerful comeback, blending authentic craftsmanship with contemporary professional needs. This comprehensive guide explores how heritage brands and traditional techniques are reshaping modern workplace fashion.</p>
                        </div>
                    </Link>

                    {/* Blog 1: Color Trends */}
                    <Link
                        to="/blogs/5-autumn-color-trends-2025"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #74ebd5 0%, #9face6 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-palette blog-icon"></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>Color Conviction</h3>
                            <p style={{ color: '#fff', fontSize: '0.95em' }}>The 5 Essential Colors for Bold & Textured Fall 2025.</p>
                        </div>
                    </Link>

                    {/* Blog 2: Fall Skirt Outfits */}
                    <Link
                        to="/blogs/30-Fall-Skirt-Outfits"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #f0f0f0 0%, #dddddd 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-venus blog-icon" style={{ color: '#764ba2' }}></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#333', fontSize: '1.4em', marginBottom: '10px' }}>Fall Skirt Formulas</h3>
                            <p style={{ color: '#555', fontSize: '0.95em' }}>My 3 Go-To Skirt Formulas for Effortless Fall Dressing.</p>
                        </div>
                    </Link>

                    {/* Blog 3: Structure & Texture */}
                    <Link
                        to="/blogs/The-New-Luxury-Structure-and-Texture-Fall-2025"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-tshirt blog-icon"></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#333', fontSize: '1.4em', marginBottom: '10px' }}>Structure & Texture</h3>
                            <p style={{ color: '#555', fontSize: '0.95em' }}>The New Luxury: Five Trends Defining Fall 2025.</p>
                        </div>
                    </Link>

                    {/* Blog 4: Unexpected Neutrals */}
                    <Link
                        to="/blogs/The-Unexpected-Neutrals-of-2026"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #e6e6fa 0%, #ffefd5 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-palette blog-icon" style={{ color: '#8a2be2' }}></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#333', fontSize: '1.4em', marginBottom: '10px' }}>Unexpected Neutrals</h3>
                            <p style={{ color: '#555', fontSize: '0.95em' }}>Creamy Yellow and Lilac as Base Layer Essentials.</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
