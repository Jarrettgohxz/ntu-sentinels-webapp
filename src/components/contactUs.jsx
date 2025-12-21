import { useTheme } from "../context/ThemeContext";
import { FaLinkedin, FaInstagram, FaTelegram, FaDiscord } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

import "../css/contactUs.css";

function ContactUs() {
  const { logoSrc } = useTheme();

  return (
    <div className="contact-container">
      {/* Logo + header text */}
      <div className="contact-us-header-container">
        <p>Contact Us!</p>
      </div>

      {/* Socials */}
      <div class="social-links">
        <a href="#" aria-label="Email">
          <MdOutlineMail id="email-icon" />
        </a>

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
