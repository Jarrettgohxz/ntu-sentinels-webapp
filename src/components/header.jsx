import { useEffect, useState } from "react";
import { Link } from "react-router";
import { RiMenu2Fill, RiCloseFill } from "react-icons/ri";

import URL_PATH from "../config/path.json";

function Header() {
  const [currentPage, setCurrentPage] = useState();

  useEffect(() => {
    let currentPath = window.location.pathname;

    currentPath = currentPath.startsWith("/")
      ? currentPath.substring(1) // Start from the second character (index 1)
      : currentPath;

    currentPath = currentPath === "" ? URL_PATH.path.home : currentPath;

    setCurrentPage(currentPath);
  }, []);

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
        <div className="menu-close-icon-container" onClick={handleMenuClose}>
          <RiCloseFill className="menu-close-icon" color="white" />
        </div>

        <div className="main-nav-inner d-flex flex-column">
          <div className="menu-title">Menu</div>

          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  currentPage == "home" ? "selected" : ""
                }`}
                to={URL_PATH.path.home}
                onClick={() => setCurrentPage("home")}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  currentPage == "about-us" ? "selected" : ""
                }`}
                to={URL_PATH.path.aboutUs}
                onClick={() => setCurrentPage("about-us")}
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  currentPage == "events" ? "selected" : ""
                }`}
                to={URL_PATH.path.events}
                onClick={() => setCurrentPage("events")}
              >
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  currentPage == "contact-us" ? "selected" : ""
                }`}
                to={URL_PATH.path.contactUs}
                onClick={() => setCurrentPage("contact-us")}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="header-bottom-divider" />

      <div className="icon-menu-container">
        <RiMenu2Fill className="icon-menu" onClick={handleOpenMenu} />
      </div>
    </>
  );
}

export default Header;
