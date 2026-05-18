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
                    {/* Featured Blog: The Rise of Architectural Fashion: How Geometric Silhouettes Are Sculpting Tomorrow's Wardrobe */}
                    <Link
                        to="/blogs/the-rise-of-architectural-fashion-how-geometric-silhouettes-are-sculpting-tomorrows-wardrobe"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-drafting-compass blog-icon" style={{ color: '#667eea' }}></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>The Rise of Architectural Fashion: How Geometric Silhouettes Are Sculpting Tomorrow's Wardrobe</h3>
                            <p style={{ color: '#fff', fontSize: '0.95em' }}>Architectural fashion is revolutionizing modern style with bold geometric cuts, structured silhouettes, and construction-inspired details. This movement transforms clothing into wearable art, blending engineering precision with haute couture elegance.</p>
                        </div>
                    </Link>

                    {/* Featured Blog: The Rise of Textural Storytelling: How Fabric Mixing is Creating the Most Dynamic Wardrobes of 2025 */}
                    <Link
                        to="/blogs/the-rise-of-textural-storytelling-how-fabric-mixing-is-creating-the-most-dynamic-wardrobes-of-2025"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-palette blog-icon" style={{ color: '#667eea' }}></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>The Rise of Textural Storytelling: How Fabric Mixing is Creating the Most Dynamic Wardrobes of 2025</h3>
                            <p style={{ color: '#fff', fontSize: '0.95em' }}>Discover how the revolutionary trend of textural storytelling is transforming modern wardrobes through strategic fabric mixing and sensory fashion experiences. Learn to master the art of combining contrasting textures to create visually compelling and emotionally resonant outfits that speak volumes without saying a word.</p>
                        </div>
                    </Link>

                    {/* Featured Blog: The Art of Statement Sleeves: How Dramatic Silhouettes Are Redefining Contemporary Fashion */}
                    <Link
                        to="/blogs/the-art-of-statement-sleeves-how-dramatic-silhouettes-are-redefining-contemporary-fashion"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-tshirt blog-icon" style={{ color: '#667eea' }}></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>The Art of Statement Sleeves: How Dramatic Silhouettes Are Redefining Contemporary Fashion</h3>
                            <p style={{ color: '#fff', fontSize: '0.95em' }}>Statement sleeves are taking center stage in 2025, transforming ordinary outfits into extraordinary fashion moments. From billowing bishop sleeves to architectural puff details, discover how this bold trend is reshaping modern style and learn to master the art of dramatic sleeve styling.</p>
                        </div>
                    </Link>

                    {/* Featured Blog: The Rise of Dopamine Dressing: How Color Psychology Is Revolutionizing Wardrobe Choices in 2025 */}
                    <Link
                        to="/blogs/the-rise-of-dopamine-dressing-how-color-psychology-is-revolutionizing-wardrobe-choices-in-2025"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-palette blog-icon" style={{ color: '#ff6b6b' }}></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>The Rise of Dopamine Dressing: How Color Psychology Is Revolutionizing Wardrobe Choices in 2025</h3>
                            <p style={{ color: '#fff', fontSize: '0.95em' }}>Discover how dopamine dressing is transforming the fashion landscape, using scientifically-backed color psychology to boost mood and confidence. Learn practical styling strategies to incorporate joy-inducing hues into your everyday wardrobe.</p>
                        </div>
                    </Link>

                    {/* Featured Blog: The Textile Revolution: How Advanced Fabric Innovation is Transforming Modern Fashion */}
                    <Link
                        to="/blogs/the-textile-revolution-how-advanced-fabric-innovation-is-transforming-modern-fashion"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-microscope blog-icon" style={{ color: '#646cff' }}></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>The Textile Revolution: How Advanced Fabric Innovation is Transforming Modern Fashion</h3>
                            <p style={{ color: '#fff', fontSize: '0.95em' }}>Discover how cutting-edge fabric technologies are reshaping fashion, from temperature-regulating textiles to self-cleaning materials. This comprehensive guide explores the revolutionary fabrics changing how we dress and style ourselves.</p>
                        </div>
                    </Link>

                    {/* Featured Blog: The Art of Wardrobe Remixing: How Creative Styling is Revolutionizing Fashion Consumption */}
                    <Link
                        to="/blogs/the-art-of-wardrobe-remixing-how-creative-styling-is-revolutionizing-fashion-consumption"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-recycle blog-icon" style={{ color: '#646cff' }}></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>The Art of Wardrobe Remixing: How Creative Styling is Revolutionizing Fashion Consumption</h3>
                            <p style={{ color: '#fff', fontSize: '0.95em' }}>Discover how wardrobe remixing is transforming the fashion landscape by teaching us to reimagine existing pieces in countless new ways. Learn the techniques and strategies that make creative styling the ultimate sustainable fashion practice.</p>
                        </div>
                    </Link>

                    {/* Featured Blog: The New Vintage: How Y2K-Inspired Tech Wear is Defining Future Fashion */}
                    <Link
                        to="/blogs/the-new-vintage-how-y2k-inspired-tech-wear-is-defining-future-fashion"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-rocket blog-icon" style={{ color: '#667eea' }}></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>The New Vintage: How Y2K-Inspired Tech Wear is Defining Future Fashion</h3>
                            <p style={{ color: '#fff', fontSize: '0.95em' }}>The Y2K tech wear revival is transforming modern fashion with metallic fabrics, holographic details, and futuristic silhouettes. This comprehensive guide explores how to master this bold trend that's bridging nostalgia with cutting-edge style.</p>
                        </div>
                    </Link>

                    {/* Featured Blog: The Quiet Revolution: How Stealth Wealth Fashion is Redefining Modern Status Dressing */}
                    <Link
                        to="/blogs/the-quiet-revolution-how-stealth-wealth-fashion-is-redefining-modern-status-dressing"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-gem blog-icon" style={{ color: '#bdc3c7' }}></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>The Quiet Revolution: How Stealth Wealth Fashion is Redefining Modern Status Dressing</h3>
                            <p style={{ color: '#fff', fontSize: '0.95em' }}>Discover how the stealth wealth movement is transforming luxury fashion, where understated elegance and quality craftsmanship replace flashy logos and obvious displays of wealth. This comprehensive guide explores the psychology, key pieces, and styling strategies behind fashion's most sophisticated trend.</p>
                        </div>
                    </Link>

                    {/* Featured Blog: The Art of Pattern Mixing: Mastering the Bold Trend Reshaping Contemporary Style in 2025 */}
                    <Link
                        to="/blogs/the-art-of-pattern-mixing-mastering-the-bold-trend-reshaping-contemporary-style-in-2025"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-palette blog-icon" style={{ color: '#ff6b6b' }}></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>The Art of Pattern Mixing: Mastering the Bold Trend Reshaping Contemporary Style in 2025</h3>
                            <p style={{ color: '#fff', fontSize: '0.95em' }}>Pattern mixing has emerged as 2025's most daring and creative fashion trend, allowing individuals to break traditional style rules while creating uniquely personal and expressive looks. This comprehensive guide reveals the art and science behind successfully combining different patterns for maximum impact.</p>
                        </div>
                    </Link>

                    {/* Featured Blog: The Art of Capsule Wardrobe Building: Creating Maximum Style with Minimal Pieces in 2025 */}
                    <Link
                        to="/blogs/the-art-of-capsule-wardrobe-building-creating-maximum-style-with-minimal-pieces-in-2025"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-layer-group blog-icon" style={{ color: '#646cff' }}></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>The Art of Capsule Wardrobe Building: Creating Maximum Style with Minimal Pieces in 2025</h3>
                            <p style={{ color: '#fff', fontSize: '0.95em' }}>Discover how to build a strategic capsule wardrobe that maximizes style versatility while minimizing clutter. Learn the essential pieces, color coordination strategies, and styling formulas that create endless outfit possibilities from just 30-40 carefully chosen items.</p>
                        </div>
                    </Link>

                    {/* Featured Blog: The Micro-Trend Revolution: How Viral Fashion Moments Are Reshaping How We Shop and Style */}
                    <Link
                        to="/blogs/the-micro-trend-revolution-how-viral-fashion-moments-are-reshaping-how-we-shop-and-style"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-mobile-alt blog-icon" style={{ color: '#ff6b9d' }}></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>The Micro-Trend Revolution: How Viral Fashion Moments Are Reshaping How We Shop and Style</h3>
                            <p style={{ color: '#fff', fontSize: '0.95em' }}>From TikTok-driven aesthetics to Instagram-inspired micro-trends, social media is creating fashion cycles that last weeks instead of seasons. We explore how to navigate this fast-paced style landscape while building a thoughtful, adaptable wardrobe.</p>
                        </div>
                    </Link>

                    {/* Featured Blog: The Tech-Fashion Fusion: How Smart Accessories Are Revolutionizing Personal Style in 2025 */}
                    <Link
                        to="/blogs/the-tech-fashion-fusion-how-smart-accessories-are-revolutionizing-personal-style-in-2025"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-microchip blog-icon" style={{ color: '#667eea' }}></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>The Tech-Fashion Fusion: How Smart Accessories Are Revolutionizing Personal Style in 2025</h3>
                            <p style={{ color: '#fff', fontSize: '0.95em' }}>Explore the groundbreaking intersection of technology and fashion as smart accessories transform how we express personal style. From AI-powered jewelry to adaptive footwear, discover how tech-infused fashion pieces are creating a new era of intelligent style.</p>
                        </div>
                    </Link>

                    {/* Featured Blog: The Artisan Revival: How Handcrafted Fashion is Redefining Luxury in the Digital Age */}
                    <Link
                        to="/blogs/the-artisan-revival-how-handcrafted-fashion-is-redefining-luxury-in-the-digital-age"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #8B4513 0%, #DEB887 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-hands blog-icon" style={{ color: '#8B4513' }}></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>The Artisan Revival: How Handcrafted Fashion is Redefining Luxury in the Digital Age</h3>
                            <p style={{ color: '#fff', fontSize: '0.95em' }}>Discover how the resurgence of handcrafted fashion is challenging fast fashion dominance, with artisan-made pieces becoming the ultimate status symbol. From hand-embroidered details to traditional weaving techniques, explore how to incorporate authentic craftsmanship into your modern wardrobe.</p>
                        </div>
                    </Link>

                    {/* Featured Blog: The Mirror Method: How Self-Styling Technology and Smart Wardrobes Are Revolutionizing Personal Fashion */}
                    <Link
                        to="/blogs/the-mirror-method-how-self-styling-technology-and-smart-wardrobes-are-revolutionizing-personal-fashion"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-mirror blog-icon" style={{ color: '#667eea' }}></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>The Mirror Method: How Self-Styling Technology and Smart Wardrobes Are Revolutionizing Personal Fashion</h3>
                            <p style={{ color: '#fff', fontSize: '0.95em' }}>Explore how smart mirrors, AI styling assistants, and tech-integrated wardrobes are transforming the way we approach personal style. From virtual try-ons to mood-responsive outfit curation, discover the future of fashion at your fingertips.</p>
                        </div>
                    </Link>

                    {/* Featured Blog: The Art of Effortless Elegance: How French Girl Style is Redefining Modern Sophistication */}
                    <Link
                        to="/blogs/the-art-of-effortless-elegance-how-french-girl-style-is-redefining-modern-sophistication"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #ff6b8a 0%, #4ecdc4 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-heart blog-icon" style={{ color: '#ff6b8a' }}></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>The Art of Effortless Elegance: How French Girl Style is Redefining Modern Sophistication</h3>
                            <p style={{ color: '#fff', fontSize: '0.95em' }}>Discover the timeless secrets of French girl style and learn how to master the art of effortless elegance. This comprehensive guide breaks down the essential elements, key pieces, and styling philosophy that make this aesthetic eternally chic.</p>
                        </div>
                    </Link>

                    {/* Featured Blog: The Art of Layered Textures: How Mixed-Media Fashion is Creating Depth in Modern Style */}
                    <Link
                        to="/blogs/the-art-of-layered-textures-how-mixed-media-fashion-is-creating-depth-in-modern-style"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-layer-group blog-icon" style={{ color: '#764ba2' }}></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>The Art of Layered Textures: How Mixed-Media Fashion is Creating Depth in Modern Style</h3>
                            <p style={{ color: '#fff', fontSize: '0.95em' }}>Discover how the strategic combination of contrasting textures and materials is revolutionizing contemporary fashion, creating visually compelling outfits that tell stories through tactile experiences. This comprehensive guide explores the art of mixing silk with denim, leather with knits, and other unexpected combinations that are defining modern style.</p>
                        </div>
                    </Link>

                    {/* Featured Blog: The Androgynous Fashion Revolution: How Gender-Neutral Styling is Reshaping Contemporary Fashion */}
                    <Link
                        to="/blogs/the-androgynous-fashion-revolution-how-gender-neutral-styling-is-reshaping-contemporary-fashion"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-venus-mars blog-icon" style={{ color: '#7c3aed' }}></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>The Androgynous Fashion Revolution: How Gender-Neutral Styling is Reshaping Contemporary Fashion</h3>
                            <p style={{ color: '#fff', fontSize: '0.95em' }}>Explore the transformative power of androgynous fashion as it breaks traditional gender barriers and creates a new paradigm for self-expression. This comprehensive guide reveals how to master the art of gender-neutral styling for a more inclusive and versatile wardrobe.</p>
                        </div>
                    </Link>

                    {/* Featured Blog: The Art of Elevated Casual: How Contemporary Comfort Wear is Redefining Modern Sophistication */}
                    <Link
                        to="/blogs/the-art-of-elevated-casual-how-contemporary-comfort-wear-is-redefining-modern-sophistication"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-tshirt blog-icon" style={{ color: '#667eea' }}></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>The Art of Elevated Casual: How Contemporary Comfort Wear is Redefining Modern Sophistication</h3>
                            <p style={{ color: '#fff', fontSize: '0.95em' }}>Discover how the elevated casual movement is transforming everyday comfort wear into sophisticated fashion statements. This comprehensive guide explores the techniques, key pieces, and styling secrets that make casual clothing look effortlessly chic and intentionally curated.</p>
                        </div>
                    </Link>

                    {/* Featured Blog: The New Romantic: How Cottagecore-Inspired Evening Wear is Transforming Modern Formal Dressing */}
                    <Link
                        to="/blogs/the-new-romantic-how-cottagecore-inspired-evening-wear-is-transforming-modern-formal-dressing"
                        className="gallery-item blog-card"
                        style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #ff7eb3 0%, #ff758c 100%)' }}
                    >
                        <div className="blog-icon-wrapper">
                            <i className="fas fa-leaf blog-icon" style={{ color: '#e91e63' }}></i>
                        </div>
                        <div className="blog-text" style={{ padding: '20px' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>The New Romantic: How Cottagecore-Inspired Evening Wear is Transforming Modern Formal Dressing</h3>
                            <p style={{ color: '#fff', fontSize: '0.95em' }}>Discover how the romantic cottagecore aesthetic is revolutionizing evening wear with prairie-inspired silhouettes, artisanal details, and sustainable luxury. This comprehensive guide explores how to master the new romantic formal style that's captivating fashion enthusiasts worldwide.</p>
                        </div>
                    </Link>

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
