// src/pages/BlogArticle.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BlogArticle.css';

// Same endpoint the site footer posts to; routes by formType on the Apps Script side.
const MAILING_LIST_URL =
    'https://script.google.com/macros/s/AKfycbxKrhjqiqCx7TkZeKByUxlFlOmURFgsSOWjuPPFmk09k5h6KH_b2oJQHC64CvvKUTnc/exec';

const BlogArticle = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const contentRef = useRef(null);

    // Fetch and parse the HTML article
    useEffect(() => {
        setIsLoading(true);
        setError(null);
        setContent('');

        fetch(`/blogs/${slug}.html`)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.text();
            })
            .then(htmlContent => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlContent, 'text/html');

                // Extract just the article content (not the full page structure)
                const articleContent = doc.querySelector('.blog-post-content');
                if (articleContent) {
                    setContent(articleContent.innerHTML);
                } else {
                    // Fallback: get all content from body
                    setContent(doc.body.innerHTML);
                }
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to load article:", err);
                setError(`Could not load "${slug}". Error: ${err.message}`);
                setIsLoading(false);
            });
    }, [slug]);

    // Wire mailing-list forms inside the injected article HTML
    useEffect(() => {
        if (!content || !contentRef.current) return;

        const forms = contentRef.current.querySelectorAll('form');
        if (!forms.length) return;

        const handlers = [];
        forms.forEach((form) => {
            const handler = async (e) => {
                e.preventDefault();
                const emailEl = form.querySelector('input[type="email"], input[name="email"]');
                const email = emailEl ? emailEl.value.trim() : '';
                if (!email) return;

                const btn = form.querySelector('button, input[type="submit"]');
                const original = btn ? btn.innerText : '';
                if (btn) { btn.disabled = true; btn.innerText = 'Joining…'; }

                try {
                    await fetch(MAILING_LIST_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                        body: JSON.stringify({ formType: 'mailing-list', email, source: `blog:${slug}` }),
                    });
                    form.innerHTML =
                        '<p style="padding:14px 0;font-weight:600;">Thanks — you\'re on the list.</p>';
                } catch (err) {
                    if (btn) { btn.disabled = false; btn.innerText = original; }
                    console.error('Mailing list submit failed:', err);
                }
            };
            form.addEventListener('submit', handler);
            handlers.push([form, handler]);
        });

        return () => handlers.forEach(([form, handler]) => form.removeEventListener('submit', handler));
    }, [content, slug]);

    if (isLoading) {
        return (
            <div className="article-wrapper">
                <p style={{ textAlign: 'center', padding: '60px 24px', color: '#666' }}>Loading article...</p>
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
            <button onClick={() => navigate('/fashion-blog')} className="back-button">
                <i className="fas fa-arrow-left"></i> Back to Blog
            </button>

            <div
                ref={contentRef}
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Mailing list footer */}
            <footer className="article-footer">
                <h3>Stay Updated</h3>
                <p>Get new fashion insights delivered to your inbox weekly.</p>
                <form style={{ marginTop: '20px' }}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        style={{
                            padding: '10px 16px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            width: '100%',
                            marginBottom: '12px',
                            fontSize: '14px',
                            fontFamily: 'inherit'
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            padding: '10px 24px',
                            background: '#2a2420',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '14px',
                            transition: 'opacity 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.opacity = '0.85'}
                        onMouseLeave={(e) => e.target.style.opacity = '1'}
                    >
                        Join the List
                    </button>
                </form>
            </footer>
        </div>
    );
};

export default BlogArticle;