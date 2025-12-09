import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import Header from "./components/header.jsx";

import Home from "./components/home.jsx";
import AboutUs from "./components/aboutUs.jsx";
import Events from "./components/events.jsx";
import ContactUs from "./components/contactUs.jsx";
import NotFound from "./components/notFound.jsx";

import localStorage from "./utils/localStorage.js";

function App() {
  // useEffect(() => {
  //   // LIGHT/DARK MODE
  //   let theme;

  //   theme = localStorage.retrieveTheme("theme");

  //   if (!theme) {
  //     if (
  //       window.matchMedia &&
  //       window.matchMedia("(prefers-color-scheme: dark)").matches
  //     ) {
  //       theme = "dark";
  //       localStorage.storeTheme("dark");
  //     } else if (
  //       window.matchMedia &&
  //       window.matchMedia("(prefers-color-scheme: light)").matches
  //     ) {
  //       theme = "light";
  //       localStorage.storeTheme("light");
  //     }
  //   }

  //   if (theme === "dark") {
  //     document.body.classList.add("dark-mode");
  //   } else {
  //     document.body.classList.remove("dark-mode");
  //   }

  //   setTheme(theme);
  // }, []);

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route index element={<Home />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="events" element={<Events />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
