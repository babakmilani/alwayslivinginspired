// src/pages/Products.jsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Products.css';

const Products = () => {
    const location = useLocation();

    // Scroll to section when component mounts or hash changes
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                // Smooth scroll to the section
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [location]);

    return (
        <div className="products-page">
            {/* Top Ad Placeholder */}
            <div className="adsense-placeholder top-ad">
                Google AdSense Ad - Products Top Placeholder
            </div>

            {/* Page Header */}
            <div className="products-header">
                <h1>Our Products</h1>
                <p>Discover our collection of inspiring apparel and accessories</p>
            </div>

            {/* Quick Navigation */}
            <nav className="products-nav">
                <button onClick={() => scrollToSection('accessories')} className="nav-link">Accessories</button>
                <button onClick={() => scrollToSection('tshirts')} className="nav-link">T-Shirts</button>
                <button onClick={() => scrollToSection('shoes')} className="nav-link">Shoes</button>
                <button onClick={() => scrollToSection('bags')} className="nav-link">Bags</button>
            </nav>

            {/* ACCESSORIES SECTION */}
            <section id="accessories" className="product-section">
                <h2 className="section-title">Accessories</h2>
                <p className="section-description">
                    Complete your look with our stylish accessories collection, featuring hats, caps, and more.
                </p>
                <div className="products-grid">
                    {/* Product Card 1 */}
                    <div className="product-card">
                        <div className="product-image">
                            <img src="/images/Woman+white+hat.png" alt="White Hat" />
                        </div>
                        <div className="product-info">
                            <h3>Classic White Hat</h3>
                            <p className="product-price">$29.99</p>
                            <button className="add-to-cart">Add to Cart</button>
                        </div>
                    </div>

                    {/* Add more accessory products here */}
                    <div className="product-card">
                        <div className="product-image">
                            <img src="/images/Woman+white+hat.png" alt="Summer Hat" />
                        </div>
                        <div className="product-info">
                            <h3>Summer Vibes Hat</h3>
                            <p className="product-price">$34.99</p>
                            <button className="add-to-cart">Add to Cart</button>
                        </div>
                    </div>

                    <div className="product-card">
                        <div className="product-image">
                            <img src="/images/Woman+white+hat.png" alt="Sport Cap" />
                        </div>
                        <div className="product-info">
                            <h3>Sport Cap</h3>
                            <p className="product-price">$24.99</p>
                            <button className="add-to-cart">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mid-Section Ad */}
            <div className="adsense-placeholder">
                Google AdSense Ad - Mid-Section Placeholder
            </div>

            {/* T-SHIRTS SECTION */}
            <section id="tshirts" className="product-section">
                <h2 className="section-title">T-Shirts</h2>
                <p className="section-description">
                    Express yourself with our premium quality, comfortable t-shirts.
                </p>
                <div className="products-grid">
                    <div className="product-card">
                        <div className="product-image">
                            <img src="/images/Man+White+shirt.png" alt="White T-Shirt" />
                        </div>
                        <div className="product-info">
                            <h3>Classic White Tee</h3>
                            <p className="product-price">$24.99</p>
                            <button className="add-to-cart">Add to Cart</button>
                        </div>
                    </div>

                    <div className="product-card">
                        <div className="product-image">
                            <img src="/images/Man+White+shirt.png" alt="Graphic Tee" />
                        </div>
                        <div className="product-info">
                            <h3>Inspired Graphic Tee</h3>
                            <p className="product-price">$29.99</p>
                            <button className="add-to-cart">Add to Cart</button>
                        </div>
                    </div>

                    <div className="product-card">
                        <div className="product-image">
                            <img src="/images/Man+White+shirt.png" alt="Premium Tee" />
                        </div>
                        <div className="product-info">
                            <h3>Premium Cotton Tee</h3>
                            <p className="product-price">$34.99</p>
                            <button className="add-to-cart">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* SHOES SECTION */}
            <section id="shoes" className="product-section">
                <h2 className="section-title">Shoes</h2>
                <p className="section-description">
                    Step out in style with our comfortable and trendy footwear collection.
                </p>
                <div className="products-grid">
                    <div className="product-card">
                        <div className="product-image">
                            <img src="/images/shoes.png" alt="Casual Sneakers" />
                        </div>
                        <div className="product-info">
                            <h3>Casual Sneakers</h3>
                            <p className="product-price">$79.99</p>
                            <button className="add-to-cart">Add to Cart</button>
                        </div>
                    </div>

                    <div className="product-card">
                        <div className="product-image">
                            <img src="/images/shoes.png" alt="Sport Shoes" />
                        </div>
                        <div className="product-info">
                            <h3>Sport Performance</h3>
                            <p className="product-price">$89.99</p>
                            <button className="add-to-cart">Add to Cart</button>
                        </div>
                    </div>

                    <div className="product-card">
                        <div className="product-image">
                            <img src="/images/shoes.png" alt="Urban Style" />
                        </div>
                        <div className="product-info">
                            <h3>Urban Style</h3>
                            <p className="product-price">$84.99</p>
                            <button className="add-to-cart">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mid-Section Ad */}
            <div className="adsense-placeholder">
                Google AdSense Ad - Mid-Section Placeholder
            </div>

            {/* BAGS SECTION */}
            <section id="bags" className="product-section">
                <h2 className="section-title">Bags</h2>
                <p className="section-description">
                    Carry your essentials in style with our versatile bag collection.
                </p>
                <div className="products-grid">
                    <div className="product-card">
                        <div className="product-image">
                            <img src="/images/bags.png" alt="Backpack" />
                        </div>
                        <div className="product-info">
                            <h3>Urban Backpack</h3>
                            <p className="product-price">$54.99</p>
                            <button className="add-to-cart">Add to Cart</button>
                        </div>
                    </div>

                    <div className="product-card">
                        <div className="product-image">
                            <img src="/images/bags.png" alt="Tote Bag" />
                        </div>
                        <div className="product-info">
                            <h3>Canvas Tote</h3>
                            <p className="product-price">$39.99</p>
                            <button className="add-to-cart">Add to Cart</button>
                        </div>
                    </div>

                    <div className="product-card">
                        <div className="product-image">
                            <img src="/images/bags.png" alt="Messenger Bag" />
                        </div>
                        <div className="product-info">
                            <h3>Messenger Bag</h3>
                            <p className="product-price">$49.99</p>
                            <button className="add-to-cart">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Ad Placeholder */}
            <div className="adsense-placeholder bottom-ad">
                Google AdSense Ad - Products Bottom Placeholder
            </div>
        </div>
    );
};

export default Products;