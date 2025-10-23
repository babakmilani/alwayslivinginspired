// src/components/LegalPage.jsx
import React from 'react';

const LegalPage = ({ title, content }) => {
    return (
        // ⭐️ EDITED: This container now serves as the main layout grid ⭐️
        <div className="legal-page-container">


            {/* ⭐️ NEW LAYOUT CONTAINER: To hold the side ads and the main content ⭐️ */}
            <div className="legal-layout-grid">



                {/* Main Legal Content */}
                <div className="legal-content-wrapper">
                    {content}
                </div>



            </div>


        </div>
    );
};

export default LegalPage;
