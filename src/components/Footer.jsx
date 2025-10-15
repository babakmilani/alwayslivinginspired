// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="ali-footer">
      <div className="footer-line top-line"></div>

      <div className="footer-content-container">

        <div className="footer-links">
          <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
          <Link to="/terms" className="footer-link">Terms & Conditions</Link>
          <Link to="/cookies" className="footer-link">Cookie Policy</Link>
          <Link to="/disclaimer" className="footer-link">Disclaimer</Link>
          <Link to="/contact" className="footer-link">Contact</Link>
          <Link to="/about" className="footer-link">About</Link>
          <Link to="/fashion-blog" className="footer-link">Fashion Blog</Link>
        </div>

        <div className="footer-copyright">
          &copy; 2025 Always Living Inspired
        </div>

        <div className="footer-social">
          <a
            href="YOUR_TIKTOK_URL"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our TikTok page"
            className="social-icon-link"
          >
            <i className="fab fa-tiktok social-icon"></i>
          </a>

          <a
            href="YOUR_INSTAGRAM_URL"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Instagram page"
            className="social-icon-link"
          >
            <i className="fab fa-instagram social-icon"></i>
          </a>
        </div>

      </div>

      <div className="footer-line bottom-line"></div>
    </footer>
  )
}

export default Footer;