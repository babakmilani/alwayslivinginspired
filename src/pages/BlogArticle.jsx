// src/pages/BlogArticle.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './FashionBlog.css'; // Use existing CSS for styling

// Component to fetch and display static HTML content
const BlogArticle = () => {
    // useParams retrieves the dynamic part of the URL (the filename)
    const { filename } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // The path is relative to the PUBLIC folder since you moved the file there
    const articlePath = `/pages/blogs/${filename}.html`;

    useEffect(() => {
        setIsLoading(true);
        // 1. Fetch the raw HTML content from the public folder
        fetch(articlePath)
            .then(response => {
                if (!response.ok) {
                    // Handle 404 Not Found error
                    throw new Error(`Article not found (Error ${response.status})`);
                }
                return response.text();
            })
            .then(htmlContent => {
                // 2. Set the content state
                setContent(htmlContent);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to load article:", err);
                setError("Sorry, the article could not be loaded or found.");
                setIsLoading(false);
            });
    }, [articlePath, filename]);

    if (isLoading) {
        return <div className="article-container">Loading article...</div>;
    }

    if (error) {
        return <div className="article-container error-message">Error: {error}</div>;
    }

    /*
     * DANGER: We use dangerouslySetInnerHTML to render the raw HTML.
     * This is necessary for static HTML blog content but ensures
     * you trust the content of The-New-Luxury-Structure-and-Texture-Fall-2025.html.
     */
    return (
        <div className="article-wrapper">
            <button
                onClick={() => navigate('/fashion-blog')}
                className="back-button"
                style={{
                    padding: '10px 20px',
                    margin: '20px auto',
                    display: 'block',
                    fontSize: '1em',
                    cursor: 'pointer',
                    borderRadius: '5px'
                }}
            >
                <i className="fas fa-arrow-left"></i> Back to Blog
            </button>

            <div
                className="blog-content"
                style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left', padding: '20px' }}
                dangerouslySetInnerHTML={{ __html: content }}
            />

            <div className="adsense-placeholder article-ad" style={{ maxWidth: '800px', margin: '40px auto' }}>
                Google AdSense Ad - Article Footer Placeholder
            </div>
        </div>
    );
};

export default BlogArticle;