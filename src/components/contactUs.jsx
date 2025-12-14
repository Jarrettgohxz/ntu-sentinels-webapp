import { useTheme } from "../context/ThemeContext";
import { FaLinkedin, FaInstagram, FaTelegram, FaDiscord } from "react-icons/fa";

import "../css/contactUs.css";

function ContactUs() {
  const { logoSrc } = useTheme();

  return (
    <div className="contact-container">
      {/* Logo + header text */}
      <div className="contact-us-header-container">
        <img src={logoSrc} alt="Logo" className="contact-us-page-logo" />
        <p>Contact Us!</p>
      </div>

      {/* Form section */}
      <form className="contact-form">
        <input
          type="text"
          placeholder="Your Name"
          className="input-field"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="input-field"
          required
        />
        <textarea
          placeholder="Your Message"
          className="input-message"
          required
        />
      </form>

      {/* Socials */}
      <div class="social-links">
        <a href="#" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
        <a href="#" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="#" aria-label="Telegram">
          <FaTelegram />
        </a>
        <a href="#" aria-label="Discord">
          <FaDiscord />
        </a>
      </div>
    </div>
  );
}

export default ContactUs;
