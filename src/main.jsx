import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/index.css";
import "./css/fonts.css";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ThemeProvider>
    <App />
  </ThemeProvider>
  // </StrictMode>
);
