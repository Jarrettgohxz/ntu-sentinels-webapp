import { useState } from "react";
import { Link } from "react-router";

import { RiMenu2Fill, RiCloseFill } from "react-icons/ri";

function Header() {
  const [page, setPage] = useState();

  const handleOpenMenu = () => {
    const menuList = document.querySelector(".main-nav");
    menuList.classList.add("is-open");
  };

  const handleMenuClose = () => {
    const menuList = document.querySelector(".main-nav");
    menuList.classList.remove("is-open");
  };

  return (
    <>
      <nav className="main-nav">
        <div className="main-nav-inner d-flex flex-column">
          <div className="menu-title">Menu</div>

          <div className="menu-close-icon-container" onClick={handleMenuClose}>
            <RiCloseFill className="menu-close-icon" color="white" />
          </div>

          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={`nav-link ${page == "home" ? "underline" : ""}`}
                to="/"
                onClick={() => setPage("home")}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${page == "about-us" ? "underline" : ""}`}
                to="/about-us"
                onClick={() => setPage("about-us")}
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${page == "events" ? "underline" : ""}`}
                to="/events"
                onClick={() => setPage("events")}
              >
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  page == "contact-us" ? "underline" : ""
                }`}
                to="/contact-us"
                onClick={() => setPage("contact-us")}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="divider" />
      </nav>

      <RiMenu2Fill className="icon-menu" onClick={handleOpenMenu} />
    </>
  );
}

export default Header;
