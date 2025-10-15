import React from 'react';
import LegalPage from '../components/LegalPage';
import '../LegalPages.css'; // <-- Import the new shared CSS file

const Terms = () => {
    const content = (
        <div className="legal-content">
            <h2>Terms and Conditions ("Terms")</h2>
            <p>Last Updated: October 10, 2025</p>

            <p>Please read these Terms and Conditions carefully before using the Always Living Inspired website (the "Service") operated by Always Living Inspired ("us", "we", or "our").</p>

            <h3>1. Acceptance of Terms</h3>
            <p>By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service. These Terms apply to all visitors, users, and others who wish to access or use the Service.</p>

            <h3>2. Intellectual Property</h3>
            <p>The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of Always Living Inspired and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Always Living Inspired.</p>

            <h3>3. User Accounts</h3>
            <p>When you create an account with us, you guarantee that the information you provide is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on the Service. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or mobile device. You agree to accept responsibility for any and all activities or actions that occur under your account.</p>

            <h3>4. User Content and Conduct</h3>
            <p>You are solely responsible for any content you post, upload, link to, or otherwise make available via the Service. You agree that your content will not violate any law, infringe on any third-party rights (including intellectual property and privacy rights), or contain material that is defamatory, obscene, or harmful.</p>
            <ul>
                <li><strong>Prohibited Actions:</strong> You may not use the Service to transmit any spam, viruses, or destructive code. Any abusive or disrespectful behavior toward other users or our staff is grounds for immediate termination.</li>
                <li><strong>License to Us:</strong> By posting content, you grant Always Living Inspired a non-exclusive, royalty-free, perpetual, and worldwide license to use, modify, publish, and display such content in connection with the Service.</li>
            </ul>

            <h3>5. Termination</h3>
            <p>We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.</p>
            <p>If you wish to terminate your account, you may simply discontinue using the Service or contact us directly.</p>

            <h3>6. Disclaimer of Warranties</h3>
            <p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.</p>

            <h3>7. Limitation of Liability</h3>
            <p>In no event shall Always Living Inspired, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory.</p>

            <h3>8. Governing Law</h3>
            <p>These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction Here], without regard to its conflict of law provisions.</p>

            <h3>9. Changes to Terms</h3>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days notice prior to any new terms taking effect. By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.</p>

            <h3>10. Contact Us</h3>
            <p>If you have any questions about these Terms, please contact us by email at: livinginspiredsince1958@gmail.com</p>
        </div>
    );

    return <LegalPage title="Terms and Conditions" content={content} />;
};

export default Terms;
