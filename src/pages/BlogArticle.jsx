// src/pages/BlogArticle.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BlogArticle.css';

const MAILING_LIST_URL =
    'https://script.google.com/macros/s/AKfycbxKrhjqiqCx7TkZeKByUxlFlOmURFgsSOWjuPPFmk09k5h6KH_b2oJQHC64CvvKUTnc/exec';

const BlogArticle = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const contentRef = useRef(null);

    // Fetch article content
    useEffect(() => {
        // CRITICAL: Reset state BEFORE fetching
        setIsLoading(true);
        setError(null);
        setContent('');

        console.log(`Fetching article: /blogs/${slug}.html`);

        fetch(`/blogs/${slug}.html`)
            .then(response => {
                console.log(`Response status: ${response.status}`);
                if (!response.ok) {
                    throw new Error(`Failed to load article (HTTP ${response.status})`);
                }
                return response.text();
            })
            .then(htmlContent => {
                console.log(`Fetched ${htmlContent.length} bytes`);

                // Parse HTML and extract body content
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlContent, 'text/html');

                // Get all body content (not just specific selectors)
                const bodyContent = doc.body.innerHTML;

                if (!bodyContent || bodyContent.trim().length === 0) {
                    throw new Error('Article content is empty');
                }

                // Set content and immediately render
                setContent(bodyContent);
                setIsLoading(false);
                setError(null);
                console.log('Article content loaded successfully');
            })
            .catch(err => {
                console.error('Article fetch error:', err);
                setError(`Could not load "${slug}": ${err.message}`);
                setIsLoading(false);
                setContent('');
            });
    }, [slug]); // Re-run whenever slug changes

    // Setup mailing list forms
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
                if (btn) {
                    btn.disabled = true;
                    btn.innerText = 'Joining…';
                }

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
                    if (btn) {
                        btn.disabled = false;
                        btn.innerText = original;
                    }
                    console.error('Mailing list error:', err);
                }
            };
            form.addEventListener('submit', handler);
            handlers.push([form, handler]);
        });

        return () => {
            handlers.forEach(([form, handler]) => {
                form.removeEventListener('submit', handler);
            });
        };
    }, [content, slug]);

    if (isLoading) {
        return (
            <div className="article-wrapper">
                <button onClick={() => navigate('/fashion-blog')} className="back-button">
                    ← Back to Blog
                </button>
                <p style={{ textAlign: 'center', padding: '60px 24px', color: '#666' }}>Loading article...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="article-wrapper error-message">
                <button onClick={() => navigate('/fashion-blog')} className="back-button">
                    ← Back to Blog
                </button>
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="article-wrapper">
            <button onClick={() => navigate('/fashion-blog')} className="back-button">
                ← Back to Blog
            </button>

            <div
                ref={contentRef}
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Footer with mailing list */}
            <footer className="article-footer">
                <h3>Stay Updated</h3>
                <p>Get new fashion insights delivered to your inbox weekly.</p>
                <form>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                    />
                    <button type="submit">Join the List</button>
                </form>
            </footer>
        </div>
    );
};

export default BlogArticle;