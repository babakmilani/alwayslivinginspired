import React, { useState } from "react";
import LegalPage from "../components/LegalPage";
import "./Contact.css";

const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxKrhjqiqCx7TkZeKByUxlFlOmURFgsSOWjuPPFmk09k5h6KH_b2oJQHC64CvvKUTnc/exec";

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        try {
            await fetch(SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, formType: "contact" }),
            });
            setSubmitStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            console.error("Error submitting form:", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const content = (
        <div className="contact-container">
            <h2>Get in touch</h2>
            <p className="intro">
                Questions about an order, a piece, or anything else? Send a note and we'll get back to you.
            </p>

            <div className="contact-form" style={{ maxWidth: "640px", margin: "0 auto" }}>
                {submitStatus === "success" && (
                    <div style={{ padding: "15px", marginBottom: "20px", backgroundColor: "#d4edda", color: "#155724", border: "1px solid #c3e6cb", borderRadius: "6px" }}>
                        Thanks — your message is in. We'll reply soon.
                    </div>
                )}
                {submitStatus === "error" && (
                    <div style={{ padding: "15px", marginBottom: "20px", backgroundColor: "#f8d7da", color: "#721c24", border: "1px solid #f5c6cb", borderRadius: "6px" }}>
                        Something went wrong. Please try again, or email support@alwayslivinginspired.com.
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required disabled={isSubmitting} />
                    </div>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required disabled={isSubmitting} />
                    </div>
                    <div>
                        <label htmlFor="subject">Subject</label>
                        <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required disabled={isSubmitting} />
                    </div>
                    <div>
                        <label htmlFor="message">Your Message</label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} required disabled={isSubmitting} />
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>
        </div>
    );

    return <LegalPage title="Contact" content={content} />;
};

export default Contact;