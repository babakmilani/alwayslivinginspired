// src/components/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="ali-header">
            {/* ... REMOVED: Top divider line ... */}

            <div className="header-content-container">

                {/* Logo Image */}
                <Link to="/">
                    <img
                        src="/images/Ali_Logo_White_0.png"
                        alt="Company Logo"
                        height="150"
                        width="135"
                    />
                </Link>

                {/* ⭐️ NAVIGATION WRAPPER WITH LINES ⭐️ */}
                <div className="nav-wrapper">
                    {/* ⭐️ MOVED: Top divider line is now here ⭐️ */}
                    <div className="header-line top-line"></div>

                    {/* Navigation (right-side content) */}
                    <nav className="double-line-nav">
                        <ul>
                            <li><Link to="/">Ali</Link></li>
                            <li><Link to="https://alwayslivinginspired.printful.me/">Shop</Link></li>
                            {/*<li><Link to="/products#accessories">Accessories</Link></li>*/}
                            {/*<li><Link to="/products#tshirts">T-shirts</Link></li>*/}
                            {/*<li><Link to="/products#shoes">Shoes</Link></li>*/}
                            {/*<li><Link to="/products#bags">Bags</Link></li>*/}
                            <li><Link to="/fashion-blog">Blog</Link></li>
                        </ul>
                    </nav>

                    {/* ⭐️ MOVED: Bottom divider line is now here ⭐️ */}
                    <div className="header-line bottom-line"></div>
                </div>

                {/* ⭐️ ADDED: SALE BILLBOARD AD ⭐️ */}
                <div className="sale-billboard-container">
                    <div className="marquee-content">
                        <span>💰 SITEWIDE 15% OFF! 🎁 FREE SHIPPING ON ALL ORDERS! ⚡️ LIMITED TIME ONLY! 💰 SITEWIDE 15% OFF! 🎁 FREE SHIPPING ON ALL ORDERS! ⚡️ LIMITED TIME ONLY!</span>
                    </div>
                </div>
 
            </div>

            {/* ... REMOVED: Bottom divider line ... */}
        </header>
    )
}

export default Header;