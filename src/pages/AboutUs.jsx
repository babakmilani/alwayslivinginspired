import React from 'react';
import LegalPage from '../components/LegalPage'; // Using LegalPage for shared layout
import '../LegalPages.css'; // For the page layout
import '../pages/Home.css'; // For adsense placeholders
import '../pages/AboutUs.css';

const AboutUs = () => {
    const content = (
        <div className="legal-content">
            <h2>The Always Living Inspired Story</h2>


            {/* ⭐️ ADDED: Image of the Founder ⭐️ */}
            <div className="about-me-image-container">
                <img
                    src="/images/me.JPEG"
                    alt="Founder, John, standing by the sea"
                    className="about-me-image"
                />
            </div>

            <p className="text-xl font-semibold mt-8 mb-4">From Code to Canvas: A Creative Awakening</p>

            <p>
                Our founder, Bobby, used to be a Software Engineer—the kind who spent his days in the quiet hum of a server room, his world measured in lines of code and the cramped dimensions of a corporate cubicle. For years, the desk life paid the bills, but it slowly eroded his soul, leaving him with an unshakeable feeling of creative restlessness. He needed to build something tangible, something that spoke to the vibrancy missing from his routine.
            </p>

            <p className="mt-6">
                That need led him away from his keyboard and into the practical, tactile world of fabric and screen printing. He immersed himself in the mechanics of clothing creation, not just the art, mastering the supply chain and building strong, ethical relationships with manufacturers. This hands-on, relationship-building ensured that every piece created under the **Always Living Inspired** name would be an authentic extension of his original design, not a watered-down copy.
            </p>

            <p className="text-xl font-semibold mt-8 mb-4">Our Mission: To Live Inspired</p>

            <p>
                **Always Living Inspired** is the sweet result of that pivot—a place where technical diligence meets boundless creativity. We don't just sell apparel; we sell wearable art, designed for those who believe that life is too short to be confined by a cubicle or conventional fashion. Every stitch, every design, is a reminder that the greatest inspiration comes from daring to change your path.
            </p>

            <p className="mt-6">
                Thank you for being part of our story. We hope our creations inspire you to live your life with a little more color, a little more courage, and a whole lot of inspiration.
            </p>

            
        </div>
    );

    // Using the LegalPage component structure for layout consistency
    return <LegalPage title="About Always Living Inspired" content={content} />;
};

export default AboutUs;
