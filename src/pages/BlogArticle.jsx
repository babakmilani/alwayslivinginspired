// src/pages/BlogArticle.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './FashionBlog.css';

const BlogArticle = () => {
    const { filename } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const articlePath = `/public/pages/blogs/${filename}.html`;

    useEffect(() => {
        setIsLoading(true);
        fetch(articlePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Article not found (Error ${response.status})`);
                }
                return response.text();
            })
            .then(htmlContent => {  // ✅ FIXED: Added the dot before "then"
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
            })
            .catch(err => {
                console.error("Failed to load article:", err);
                setError("Sorry, the article could not be loaded or found.");
                setIsLoading(false);
            });
    }, [articlePath, filename]);

    if (isLoading) {
        return <div className="article-wrapper">Loading article...</div>;
    }

    if (error) {
        return <div className="article-wrapper error-message">Error: {error}</div>;
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