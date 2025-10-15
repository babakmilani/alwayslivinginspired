// src/pages/BlogArticle.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './FashionBlog.css';

// Import all blog HTML files directly
import blog1 from './blogs/4-Mens-Wear-for-Fall.html?raw';
import blog2 from './blogs/7-Shoes-to-Achieve-the-Fall-Look.html?raw';
import blog3 from './blogs/8-Trends-set-for-Fall-2025.html?raw';
import blog4 from './blogs/30-Fall-Skirt-Outfits.html?raw';
import blog5 from './blogs/5-autumn-color-trends-2025.html?raw';
import blog6 from './blogs/top-5-must-have-autumn-styles.html?raw';
import blog7 from './blogs/The-New-Luxury-Structure-and-Texture-Fall-2025.html?raw';
import blog8 from './blogs/The-Unexpected-Neutrals-of-2026.html?raw';
import blog9 from './blogs/Functional-Necklaces-and-Necklace-Bags.html?raw';
import blog10 from './blogs/Luxe-leather.html?raw';
import blog11 from './blogs/The-Power-Couple.html?raw';
import blog12 from './blogs/Moccasins-and-Loafers.html?raw';

// Create a mapping of filenames to their imported content
const blogMap = {
    '4-Mens-Wear-for-Fall': blog1,
    '7-Shoes-to-Achieve-the-Fall-Look': blog2,
    '8-Trends-set-for-Fall-2025': blog3,
    '30-Fall-Skirt-Outfits': blog4,
    '5-autumn-color-trends-2025': blog5,
    'top-5-must-have-autumn-styles': blog6,
    'The-New-Luxury-Structure-and-Texture-Fall-2025': blog7,
    'The-Unexpected-Neutrals-of-2026': blog8,
    'Functional-Necklaces-and-Necklace-Bags': blog9,
    'Luxe-leather': blog10,
    'The-Power-Couple': blog11,
    'Moccasins-and-Loafers': blog12,
};

const BlogArticle = () => {
    const { filename } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Loading blog:', filename); // Debug log
        setIsLoading(true);
        setError(null);

        try {
            // Get the HTML content from the map
            const htmlContent = blogMap[filename];

            if (!htmlContent) {
                throw new Error('Blog not found');
            }

            // Create a temporary DOM element to parse the HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent, 'text/html');

            // Remove all link tags to prevent CSS loading attempts
            const links = doc.querySelectorAll('link[rel="stylesheet"]');
            links.forEach(link => link.remove());

            // Extract only the body content
            const bodyContent = doc.body.innerHTML;
            setContent(bodyContent);
            setIsLoading(false);
        } catch (err) {
            console.error("Failed to load article:", err);
            setError(`Sorry, the article "${filename}" could not be loaded.`);
            setIsLoading(false);
        }
    }, [filename]);

    if (isLoading) {
        return <div className="article-wrapper">Loading article...</div>;
    }

    if (error) {
        return (
            <div className="article-wrapper error-message">
                <p>Error: {error}</p>
                <button onClick={() => navigate('/fashion-blog')} className="back-button">
                    Back to Blog
                </button>
            </div>
        );
    }

    return (
        <div className="article-wrapper">
            <button
                onClick={() => navigate('/fashion-blog')}
                className="back-button"
            >
                <i className="fas fa-arrow-left"></i> Back to Blog
            </button>

            <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: content }}
            />

            <div className="adsense-placeholder article-ad" style={{ maxWidth: '800px', margin: '40px auto' }}>
                Google AdSense Ad - Article Footer Placeholder
            </div>
        </div>
    );
};

export default BlogArticle;