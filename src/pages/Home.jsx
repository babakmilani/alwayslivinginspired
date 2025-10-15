// Home.jsx
import React from 'react';
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
        <>
            {/* AD PLACEHOLDER 1: BETWEEN GRID AND HEADER */}
            <div className="adsense-placeholder top-ad">
                Google AdSense Ad - Top Placeholder (e.g., Leaderboard or Banner)
            </div>

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
                    {/* Blog 1: Color Trends */}
                    <a
                        href="/blogs/5-autumn-color-trends-2025"
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
                    </a>

                    {/* Blog 2: Fall Skirt Outfits */}
                    <a
                        href="/blogs/30-Fall-Skirt-Outfits"
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
                    </a>

                    {/* Blog 3: Structure & Texture */}
                    <a
                        href="/blogs/The-New-Luxury-Structure-and-Texture-Fall-2025"
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
                    </a>

                    {/* Blog 4: Unexpected Neutrals */}
                    <a
                        href="/blogs/The-Unexpected-Neutrals-of-2026"
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
                    </a>
                </div>
            </div>
        </>
    );
};

export default Home;