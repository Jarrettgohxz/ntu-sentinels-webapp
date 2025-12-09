import { useEffect } from "react";

import Header from "./components/header";

import "./css/App.css";
import "./css/header.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  function modeToggle() {
    // Toggle dark mode class
    document.body.classList.toggle("dark-mode");

    // Change logo based on current mode
    const logo = document.getElementById("logo-img");
    if (document.body.classList.contains("dark-mode")) {
      logo.src = "images/darkmode-logo.png"; // dark mode image
    } else {
      logo.src = "images/lightmode-logo.png"; // light mode image
    }
  }

  useEffect(() => {
    // Ensure initial state is light-mode visually
    document.body.classList.remove("dark-mode");

    // Optional: keep toggle state in sync with body class on load
    const toggle = document.getElementById("modeSwitch");
    toggle.checked = document.body.classList.contains("dark-mode");

    // Set initial logo
    const logo = document.getElementById("logo-img");
    logo.src = "images/lightmode-logo.png";
  });

  return (
    <div className="app">
      {/*  1st row - Header */}
      <div className="row">
        <div className="col-sm-12">
          <Header />
        </div>
      </div>

      <div className="divider" />

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
            <img src="lightmode-logo.png" alt="Logo" id="logo-img" />
          </div>
        </div>
      </div>

      {/* 3rd row - Footer */}
      <div className="row" id="footer">
        <div className="col-sm-12">
          {/* To Do: Include the footer section  */}
          <div w3-include-html="footer.html"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
