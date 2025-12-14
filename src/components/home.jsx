import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

import Events from "./events";

import "../css/home.css";
import "../css/header.css";

function Home() {
  const { theme, toggleTheme, logoSrc } = useTheme();

  function modeToggle() {
    // // Toggle dark mode class
    // document.body.classList.toggle("dark-mode");

    // // Change logo based on current mode
    // const logo = document.getElementById("logo-img");
    // if (document.body.classList.contains("dark-mode")) {
    //   logo.src = "images/darkmode-logo.png"; // dark mode image
    // } else {
    //   logo.src = "images/lightmode-logo.png"; // light mode image
    // }

    toggleTheme();
  }

  useEffect(() => {
    const toggle = document.getElementById("modeSwitch");
    if (toggle) {
      // Use the state variable 'theme' directly
      toggle.checked = theme === "dark";
    }
  }, [theme]);

  return (
    <div className="app">
      {/* Main content  */}
      <div className="container main-content">
        <div className="content-wrapper">
          {/* Left section: Text + Toggle  */}
          <div className="text-section">
            <div className="top-row">
              <p id="body1">HELLO, WE ARE</p>
              <label className="switch">
                <input type="checkbox" id="modeSwitch" onClick={modeToggle} />
                <span className="slider round"></span>
              </label>
            </div>
            <p id="subheading1">NTU SENTINELS</p>
            <p id="body1">[Insert short overview]</p>
          </div>

          {/* Right section: Logo  */}
          <div className="logo-section">
            <img src={logoSrc} alt="Logo" id="logo-img" />
          </div>
        </div>
      </div>

      {/* EVENTS SECTION */}

      <Events />
    </div>
  );
}

export default Home;
