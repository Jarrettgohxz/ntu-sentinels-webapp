import { BrowserRouter, Routes, Route } from "react-router";

import Header from "./components/header.jsx";

import Home from "./components/home.jsx";
import AboutUs from "./components/aboutUs.jsx";
import Events from "./components/events.jsx";
import ContactUs from "./components/contactUs.jsx";
import NotFound from "./components/notFound.jsx";

function App() {
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
