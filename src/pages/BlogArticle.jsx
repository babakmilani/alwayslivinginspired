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

    const articlePath = `/blogs/${filename}.html`;

    useEffect(() => {
        setIsLoading(true);
        fetch(articlePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Article not found (Error ${response.status})`);
                }
                return response.text();
            })
            .then(htmlContent => {
                // Create a temporary DOM element to parse the HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlContent, 'text/html');

                // Extract styles from the head and add them to the page
                const styles = doc.querySelectorAll('style, link[rel="stylesheet"]');
                styles.forEach(style => {
                    if (style.tagName === 'STYLE') {
                        // Add inline styles
                        const styleElement = document.createElement('style');
                        styleElement.textContent = style.textContent;
                        document.head.appendChild(styleElement);
                    } else if (style.tagName === 'LINK') {
                        // Add external stylesheets
                        const linkElement = document.createElement('link');
                        linkElement.rel = 'stylesheet';
                        linkElement.href = style.href;
                        document.head.appendChild(linkElement);
                    }
                });

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
        return <div className="article-container">Loading article...</div>;
    }

    if (error) {
        return <div className="article-container error-message">Error: {error}</div>;
    }

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