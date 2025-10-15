import React, { useState } from 'react';
import LegalPage from '../components/LegalPage';
import './Contact.css';
import '../pages/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Replace 'YOUR_SCRIPT_URL' with your actual Google Apps Script web app URL
            const scriptURL = 'https://script.google.com/macros/s/AKfycbxKrhjqiqCx7TkZeKByUxlFlOmURFgsSOWjuPPFmk09k5h6KH_b2oJQHC64CvvKUTnc/exec';

            const response = await fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors', // Google Apps Script requires this
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            // With no-cors mode, we can't read the response, so we assume success
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const content = (
        <div className="contact-container">
            <h2>Get In Touch With Inspiration</h2>
            <p className="intro">
                We'd love to hear from you! Whether you have questions about our apparel, an order inquiry, or just want to share your inspired story, reach out using the form or the details below.
            </p>

            {/* AD PLACEHOLDER 1: Top of the content */}
            <div className="adsense-placeholder top-ad">
                Google AdSense Ad - Top Placeholder (e.g., Leaderboard or Banner)
            </div>

            <div className="contact-grid">
                {/* Contact Information Column */}
                <div className="contact-info">
                    <h3>Contact Details</h3>
                    <div className="contact-details-list">
                        <div className="contact-detail">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <a href="mailto:livinginspiredsince1958@gmail.com">livinginspiredsince1958@gmail.com</a>
                        </div>
                        <div className="contact-detail">
                            <FontAwesomeIcon icon={faPhone} />
                            <p>(646) 410 - 9559</p>
                        </div>
                        <div className="contact-detail">
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                            <p>534 W 112th Street Nr. 250225, New York, NY 10025</p>
                        </div>
                    </div>

                    <h3 className='mt-8'>Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com/alwayslivinginspired" aria-label="Facebook">
                            <FontAwesomeIcon icon={faFacebook} size="2x" className="text-[#3b5998] hover:scale-110 transition-transform" />
                        </a>
                        <a href="https://instagram.com/alwayslivinginspired" aria-label="Instagram">
                            <FontAwesomeIcon icon={faInstagram} size="2x" className="text-[#E1306C] hover:scale-110 transition-transform" />
                        </a>
                        <a href="https://twitter.com/ali_apparel" aria-label="Twitter">
                            <FontAwesomeIcon icon={faTwitter} size="2x" className="text-[#1DA1F2] hover:scale-110 transition-transform" />
                        </a>
                    </div>
                </div>

                {/* Contact Form Column */}
                <div className="contact-form">
                    <h3>Send Us a Message</h3>

                    {/* Success Message */}
                    {submitStatus === 'success' && (
                        <div style={{
                            padding: '15px',
                            marginBottom: '20px',
                            backgroundColor: '#d4edda',
                            color: '#155724',
                            border: '1px solid #c3e6cb',
                            borderRadius: '6px'
                        }}>
                            Thank you for your message! We will get back to you shortly.
                        </div>
                    )}

                    {/* Error Message */}
                    {submitStatus === 'error' && (
                        <div style={{
                            padding: '15px',
                            marginBottom: '20px',
                            backgroundColor: '#f8d7da',
                            color: '#721c24',
                            border: '1px solid #f5c6cb',
                            borderRadius: '6px'
                        }}>
                            There was an error submitting your form. Please try again or email us directly.
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                        <div>
                            <label htmlFor="subject">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                        <div>
                            <label htmlFor="message">Your Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>

            {/* AD PLACEHOLDER 2: Bottom of the content */}
            <div className="adsense-placeholder bottom-ad">
                Google AdSense Ad - Bottom Placeholder (e.g., Large Rectangle)
            </div>
        </div>
    );

    return <LegalPage title="Contact Us" content={content} />;
};

export default Contact;