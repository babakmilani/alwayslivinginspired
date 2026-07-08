// src/components/SocialLinks.jsx
// Brand-styled social icons for header + footer. Uses the Font Awesome already
// loaded in index.html — no new dependencies.
//   <SocialLinks variant="header" />   // compact
//   <SocialLinks variant="footer" />   // full row
import "./SocialLinks.css";

// Edit these URLs in one place. NOTE: verify the Facebook page URL — copy it
// from your page's address bar (the slug below is a guess).
const SOCIALS = [
  { name: "Instagram", icon: "fa-instagram", url: "https://instagram.com/always_living_inspired" },
  { name: "TikTok", icon: "fa-tiktok", url: "https://www.tiktok.com/@alwayslivinginspired" },
  { name: "Facebook", icon: "fa-facebook-f", url: "https://www.facebook.com/AlwaysLivingInspired" },
];

export default function SocialLinks({ variant = "footer" }) {
  return (
    <div className={`social-links social-links--${variant}`}>
      {SOCIALS.map((s) => (
        <a
          key={s.name}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Always Living Inspired on ${s.name}`}
          className="social-link"
        >
          <i className={`fa-brands ${s.icon}`} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
