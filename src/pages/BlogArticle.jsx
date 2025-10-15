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

    // Fix: Use import.meta.env.BASE_URL to get the correct base path
    // This will be '/docs/' in production and '/' in development
    const basePath = import.meta.env.BASE_URL;
    const articlePath = `${basePath}blogs/${filename}.html`;

    useEffect(() => {
        console.log('Attempting to fetch:', articlePath); // Debug log
        setIsLoading(true);
        setError(null);

        fetch(articlePath)
            .then(response => {
                console.log('Response status:', response.status); // Debug log
                if (!response.ok) {
                    throw new Error(`Article not found (Error ${response.status})`);
                }
                return response.text();
            })
            .then(htmlContent => {
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
                setError(`Sorry, the article could not be loaded. Path tried: ${articlePath}`);
                setIsLoading(false);
            });
    }, [articlePath, filename]);

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