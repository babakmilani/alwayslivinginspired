import React from 'react';
import LegalPage from '../components/LegalPage';
import '../LegalPages.css'; // <-- Import the new shared CSS file

const Cookies = () => {
    const content = (
        <div className="legal-content">
            <h2>Cookie Policy</h2>
            <p>Last Modified: October 10, 2025</p>

            <p>This policy details how **Always Living Inspired** uses cookies and similar tracking technologies on our website. By continuing to use our website, you consent to the use of cookies in accordance with this policy.</p>

            <h3>What are Cookies?</h3>
            <p>Cookies are small text files that are downloaded to your computer or mobile device when you visit a website. They allow the website to recognize your device and store information about your preferences or past actions. We use both **session cookies** (which are automatically deleted when you close your browser) and **persistent cookies** (which remain on your device for a set period or until you manually delete them).</p>

            <h3>The Types of Cookies We Use</h3>
            <p>We use cookies for several purposes, which fall into the following categories:</p>

            <h4>1. Necessary (Essential) Cookies</h4>
            <p>These cookies are crucial for the basic operation of the website. They enable core functions like security, accessibility, and navigation. Because the website cannot function properly without them, you cannot opt-out of these cookies.</p>

            <h4>2. Performance and Analytics Cookies</h4>
            <p>These cookies collect anonymous, aggregated data to help us understand how visitors use our site, which pages they visit most often, and if they encounter any errors. This data is vital for us to measure and improve the technical performance and user experience of our website.</p>

            <h4>3. Functionality Cookies</h4>
            <p>Functionality cookies allow the website to remember choices you make (such as remembering your login details, language preference, or customizing specific parts of the site for you). These are designed to provide a more personalized and convenient experience.</p>

            <h4>4. Advertising and Targeting Cookies</h4>
            <p>These cookies track your browsing habits to build a profile of your interests and show you relevant advertisements on other sites. They also help us limit the number of times you see an ad and measure the effectiveness of our campaigns. These are typically placed by third-party advertising networks.</p>

            <h3>Third-Party Cookies</h3>
            <p>Some cookies placed on our website are not set by us but by third parties, such as social media platforms or advertising partners. These third parties may use these cookies to serve advertisements and track your activity across the internet. We do not have direct control over the content or management of these cookies, and we encourage you to review the privacy policies of these third parties.</p>

            <h3>Managing Your Cookie Preferences</h3>
            <p>You have the full right to decide whether to accept or reject cookies. You can exercise your preferences by adjusting the settings in your web browser. Most major browsers allow you to:</p>
            <ul>
                <li>View the cookies stored and delete them individually.</li>
                <li>Block third-party cookies specifically.</li>
                <li>Block cookies from particular sites.</li>
                <li>Block all cookies from being set.</li>
            </ul>
            <p>Please be aware that restricting or disabling cookies may negatively impact the functionality of our website and affect your user experience.</p>

            <h3>Changes to This Cookie Policy</h3>
            <p>We reserve the right to update this Cookie Policy at any time to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new policy on this page.</p>

            <h3>Contact Us</h3>
            <p>If you have any questions about this Cookie Policy, you can contact us at: livinginspiredsince1958@gmail.com</p>
        </div>
    );

    return <LegalPage title="Cookie Policy" content={content} />;
};

export default Cookies;
