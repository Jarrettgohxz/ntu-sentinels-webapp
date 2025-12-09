import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import AboutUs from "./components/aboutUs.jsx";
import Events from "./components/events.jsx";
import ContactUs from "./components/contactUs.jsx";
import NotFound from "./components/notFound.jsx";
import App from "./App.jsx";

import "./css/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="events" element={<Events />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
