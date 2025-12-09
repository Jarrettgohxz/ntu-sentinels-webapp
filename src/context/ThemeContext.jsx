import { createContext, useContext, useState, useEffect } from "react";
import localStorage from "../utils/localStorage"; // Your storage functions

// 1. Create the Context object
const ThemeContext = createContext();

// Utility function to get system preference (as defined previously)
const getSystemPreference = () => {
  let theme = localStorage.retrieveTheme("theme");

  if (!theme) {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      theme = "dark";
    }
    theme = "light";
  }

  return theme;
};

// 2. Create the Provider Component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getSystemPreference()); // Initial state

  // --- Runs whenever the 'theme' state changes ---
  useEffect(() => {
    // Synchronize body class and localStorage whenever 'theme' changes
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.storeTheme(theme);
  }, [theme]);

  // Function passed to children to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // The value exposed to consumers
  const contextValue = {
    theme,
    toggleTheme,
    logoSrc: `images/${theme === "dark" ? "darkmode" : "lightmode"}-logo.png`,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Custom Hook for easy consumption
export const useTheme = () => useContext(ThemeContext);
