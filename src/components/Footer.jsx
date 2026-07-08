// src/components/Footer.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "./Footer.css";
import SocialLinks from "./SocialLinks.jsx";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxKrhjqiqCx7TkZeKByUxlFlOmURFgsSOWjuPPFmk09k5h6KH_b2oJQHC64CvvKUTnc/exec";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // null | "sending" | "done" | "error"

  const join = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "mailing-list", email, source: "footer" }),
      });
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="foot brand">
      <div className="foot-top">
        <span className="wm-line big">Always Living Inspired</span>

        {status === "done" ? (
          <span className="join-done">You're on the list ✶</span>
        ) : (
          <form className="join" onSubmit={join}>
            <input
              type="email"
              required
              placeholder="Email for new drops"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            <button type="submit" className="cta" disabled={status === "sending"}>
              {status === "sending" ? "Joining…" : <>Join the list <ArrowRight size={16} /></>}
            </button>
          </form>
        )}
      </div>

      {status === "error" && <p className="join-error">Couldn't sign you up — please try again.</p>}

      <div className="foot-links">
        <Link to="/fashion-blog">Journal</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/privacy-policy">Privacy</Link>
        <Link to="/terms">Terms</Link>
        <Link to="/cookies">Cookies</Link>
        <Link to="/disclaimer">Disclaimer</Link>
      </div>

      <div className="foot-bot">
        <span>© 2026 Always Living Inspired · alwayslivinginspired.com</span>
        <SocialLinks variant="footer" />
        <span className="foot-credit">
          <a href="https://milanilabs.com" target="_blank" rel="noopener noreferrer">Built with Milani Labs</a>
        </span>
      </div>
    </footer>
  );
}