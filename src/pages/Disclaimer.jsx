import React from 'react';
import LegalPage from '../components/LegalPage';
import '../LegalPages.css'; // <-- Import the new shared CSS file

const Disclaimer = () => {
    const content = (
        <div className="legal-content">
            <h2>Disclaimer</h2>
            <p>Last Modified: October 10, 2025</p>

            <h3>Accuracy of Information</h3>
            <p>The information provided on this website is for general informational purposes only. All information is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, or completeness of any information on the site.</p>

            <h3>External Links Disclaimer</h3>
            <p>The site may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR THE ACCURACY OR RELIABILITY OF ANY INFORMATION OFFERED BY THIRD-PARTY WEBSITES LINKED THROUGH THE SITE OR ANY WEBSITE OR FEATURE LINKED IN ANY BANNER OR OTHER ADVERTISING.</p>

            <h3>Errors and Omissions Disclaimer</h3>
            <p>While we have made every attempt to ensure that the information contained in this site has been obtained from reliable sources, Always Living Inspired is not responsible for any errors or omissions or for the results obtained from the use of this information. All information in this site is provided "as is", with no guarantee of completeness, accuracy, timeliness, or of the results obtained from the use of this information, and without warranty of any kind, express or implied.</p>

            <h3>Views Expressed Disclaimer</h3>
            <p>The views and opinions expressed on Always Living Inspired are solely those of the authors and do not necessarily reflect the official policy or position of any other agency, organization, employer, or company. The inspiration and advice provided should not be considered professional counsel (e.g., medical, financial, or legal advice).</p>

            <h3>No Responsibility</h3>
            <p>In no event will Always Living Inspired, or its partners, agents, or employees be liable to you or anyone else for any decision made or action taken in reliance on the information in this site or for any consequential, special, or similar damages, even if advised of the possibility of such damages.</p>

            <h3>"Use At Your Own Risk"</h3>
            <p>Your use of the site and your reliance on any information on the site is solely at your own risk. By using this website, you agree to these terms.</p>

            <h3>Contact Us</h3>
            <p>Should you have any feedback, comments, requests for technical support or other inquiries, please contact us by email: livinginspiredsince1958@gmail.com</p>
        </div>
    );

    return <LegalPage title="Disclaimer" content={content} />;
};

export default Disclaimer;
