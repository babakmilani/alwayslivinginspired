import React from 'react';
import LegalPage from '../components/LegalPage';
import '../LegalPages.css'; // <-- Import the new shared CSS file

const PrivacyPolicy = () => {
    const content = (
        <div className="legal-content">
            <h2>Privacy Policy</h2>
            <p>Effective Date: October 10, 2025</p>

            <h3>1. Information We Collect</h3>
            <p>We collect information you provide directly to us, such as your name, email address, shipping address, and payment information when you make a purchase.</p>
            <p>We also automatically collect certain information about your device when you use our website, including your IP address, browser type, operating system, and browsing behavior.</p>

            <h3>2. How We Use Information</h3>
            <p>We use the information we collect to:</p>
            <ul>
                <li>Process transactions and send order confirmations</li>
                <li>Provide customer support and respond to your inquiries</li>
                <li>Improve our services and develop new features</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Detect and prevent fraud</li>
            </ul>

            <h3>3. Cookies and Tracking Technologies</h3>
            <p>We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts. You can choose to disable cookies through your browser settings, but this may limit your ability to use certain features of our website.</p>
            <p>We use third-party service providers for analytics and advertising, which may also use cookies and similar technologies.</p>

            <h3>4. Sharing of Information</h3>
            <p>We do not sell your personal information. We may share information with third parties only in the following circumstances:</p>
            <ul>
                <li>With service providers who perform functions on our behalf (e.g., payment processing, shipping)</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and property</li>
            </ul>

            <h3>5. Security</h3>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>

            <h3>6. Your Rights</h3>
            <p>You have the right to:</p>
            <ul>
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Object to processing of your information</li>
            </ul>

            <h3>7. Children's Privacy</h3>
            <p>Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.</p>

            <h3>8. Changes to This Policy</h3>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date.</p>

            <h3>9. Contact Us</h3>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p>Email: livinginspiredsince1958@gmail.com</p>
            <p>Address: 534 West 112th Street nr. 250225, New York, NY 10025</p>
        </div>
    );

    return <LegalPage title="Privacy Policy" content={content} />;
};

export default PrivacyPolicy;
