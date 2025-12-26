import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

import Events from "./events";

import "../css/home.css";
import "../css/header.css";
import ConsoleTypingAnimation from "../animations/consoleTypingAnimation";
import FlickerAnimation from "../animations/flickerAnimation";

function Home() {
  const { theme, toggleTheme, logoSrc } = useTheme();
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // Calculate opacity: starts at 1, reaches 0 when scrolled 1 full page
      // We use Math.max to ensure it doesn't go below 0
      const newOpacity = Math.max(1 - scrollY / vh, 0);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <div className="content-wrapper" style={{ opacity: opacity }}>
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
            <p id="body1">
              {/* [Insert short overview] */}
              <ConsoleTypingAnimation text = "overview" className = "overview"/>
            </p>
          </div>

          {/* Right section: Logo  */}
          {/* <div className="logo-section">
            <img src={logoSrc} alt="Logo" id="logo-img" />
          </div> */}
          <div className="animatedSentinelLogo">
            <div className = "flickeringLogo">
                <FlickerAnimation className="flickering-Logo" asciiArt="splitLogo_A" minReveal={0.4} flickerDuration={900} flickerRate={60}/>
                <FlickerAnimation className="flickering-Logo" asciiArt="splitLogo_C" minReveal={0.3} flickerDuration={800} flickerRate={40}/>
                <FlickerAnimation className="flickering-Logo" asciiArt="splitLogo_E" minReveal={0.2} flickerDuration={600} flickerRate={50}/>
                <FlickerAnimation className="flickering-Logo" asciiArt="splitLogo_B" minReveal={0.4} flickerDuration={600} flickerRate={50}/>
                <FlickerAnimation className="flickering-Logo" asciiArt="splitLogo_D" minReveal={0.1} flickerDuration={800} flickerRate={70}/>
                <FlickerAnimation className="flickering-Logo" asciiArt="splitLogo_F" minReveal={0.2} flickerDuration={900} flickerRate={70}/>
            </div>
            <div className = "flickeringText">
                <FlickerAnimation className="flickering-Letters" asciiArt="splitLetter_A" minReveal={1}/>
                <FlickerAnimation className="flickering-Letters" asciiArt="splitLetter_B" minReveal={1}/>
                <FlickerAnimation className="flickering-Letters" asciiArt="splitLetter_C" minReveal={1}/>
            </div>
          </div>
        </div>
      </div>

      {/* EVENTS SECTION */}

      <Events />
    </div>
  );
}

export default Home;
