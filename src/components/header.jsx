import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { RiMenu2Fill, RiCloseFill } from "react-icons/ri";

import URL_PATH from "../config/path.json";

function Header() {
  const [currentPage, setCurrentPage] = useState();
  const navigate = useNavigate();

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

  const handleEventsPageNavigation = async () => {
    navigate("/");

    await new Promise((res) => setTimeout(res, 500));

    const element = document.getElementById("events-section-scroll-marker");

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handlePageNavigation = (id) => {
    const menuList = document.querySelector(".main-nav");
    menuList.classList.remove("is-open");

    setCurrentPage(id);

    if (id === "events") {
      handleEventsPageNavigation();
      return;
    }
  };

  return (
    <>
      <nav className="main-nav">
        <div className="menu-close-icon-container" onClick={handleMenuClose}>
          <RiCloseFill className="menu-close-icon" color="white" />
        </div>

        <div className="main-nav-inner">
          <div className="menu-title">Menu</div>

          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  currentPage == "home" ? "selected" : ""
                }`}
                to={URL_PATH.path.home}
                onClick={() => handlePageNavigation("home")}
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
                onClick={() => handlePageNavigation("about-us")}
              >
                About Us
              </Link>
            </li>
            <li className="nav-item" onClick={handleEventsPageNavigation}>
              <Link
                className={`nav-link ${
                  currentPage == "events" ? "selected" : ""
                }`}
                onClick={() => handlePageNavigation("events")}
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
                onClick={() => handlePageNavigation("contact-us")}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="header-bottom-divider" />
      </nav>

      <div className="icon-menu-container">
        <RiMenu2Fill className="icon-menu" onClick={handleOpenMenu} />
      </div>
    </>
  );
}

export default Header;
