// src/components/LegalPage.jsx
import React from 'react';

const LegalPage = ({ title, content }) => {
    return (
        // ⭐️ EDITED: This container now serves as the main layout grid ⭐️
        <div className="legal-page-container">
            {/* ⭐️ AD PLACEHOLDER 1: TOP - Needs top-ad class for header clearance ⭐️ */}
            <div className="adsense-placeholder top-ad">
                {/* When approved, replace this comment with your AdSense code */}
                Google AdSense Ad - Legal Page Top Placeholder (e.g., Leaderboard)
            </div>

            {/* ⭐️ NEW LAYOUT CONTAINER: To hold the side ads and the main content ⭐️ */}
            <div className="legal-layout-grid">

                {/* ⭐️ AD PLACEHOLDER 3: LEFT SIDE (3 vertical units) ⭐️ */}
                <div className="side-ad-column left-side-ads">
                    <div className="adsense-placeholder vertical-ad">Left Ad Box 1</div>
                    <div className="adsense-placeholder vertical-ad">Left Ad Box 2</div>
                    <div className="adsense-placeholder vertical-ad">Left Ad Box 3</div>
                </div>

                {/* Main Legal Content */}
                <div className="legal-content-wrapper">
                    {content}
                </div>

                {/* ⭐️ AD PLACEHOLDER 4: RIGHT SIDE (3 vertical units) ⭐️ */}
                <div className="side-ad-column right-side-ads">
                    <div className="adsense-placeholder vertical-ad">Right Ad Box 1</div>
                    <div className="adsense-placeholder vertical-ad">Right Ad Box 2</div>
                    <div className="adsense-placeholder vertical-ad">Right Ad Box 3</div>
                </div>

            </div>

            {/* ⭐️ AD PLACEHOLDER 2: BOTTOM ⭐️ */}
            <div className="adsense-placeholder bottom-ad">
                {/* When approved, replace this comment with your AdSense code */}
                Google AdSense Ad - Legal Page Bottom Placeholder (e.g., Large Rectangle)
            </div>
        </div>
    );
};

export default LegalPage;
