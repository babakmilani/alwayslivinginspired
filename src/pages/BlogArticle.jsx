// src/pages/BlogArticle.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './FashionBlog.css'; // This imports the fixed CSS file

const BlogArticle = () => {
    const { filename } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Loading blog:', filename);
        setIsLoading(true);
        setError(null);

        // Fetch from public folder - Vite serves public folder at root
        fetch(`/blogs/${filename}.html`)
            .then(response => {
                console.log('Fetch response:', response.status, response.url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(htmlContent => {
                console.log('HTML loaded successfully');
                // Parse and clean the HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlContent, 'text/html');

                // Remove link tags (prevents external blog styles from conflicting)
                const links = doc.querySelectorAll('link[rel="stylesheet"]');
                links.forEach(link => link.remove());

                // Get body content (The content that needs fixing)
                const bodyContent = doc.body.innerHTML;
                setContent(bodyContent);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to load article:", err);
                setError(`Could not load "${filename}". Error: ${err.message}`);
                setIsLoading(false);
            });
    }, [filename]);

    if (isLoading) {
        return (
            <div className="article-wrapper">
                <p>Loading article...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="article-wrapper error-message">
                <p>Error: {error}</p>
                <button onClick={() => navigate('/fashion-blog')} className="back-button">
                    ← Back to Blog
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

            {/* The blog content is inserted here with the class 'blog-content' */}
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