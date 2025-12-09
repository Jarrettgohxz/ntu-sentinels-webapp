const THEME_STORAGE_KEY = "user-theme-preference";

/**
 * Stores the given theme preference in localStorage
 * @param {string} theme - The theme value to store (e.g., 'dark', 'light')
 */
function storeTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    console.error("Error storing theme in localStorage:", error);
    // Handle cases where localStorage might be unavailable (e.g., private browsing)
  }
}

/**
 * Retrieves the stored theme preference from localStorage
 * @returns {string | null} The stored theme value, or null if nothing is stored
 */
function retrieveTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch (error) {
    console.error("Error retrieving theme from localStorage:", error);
    return null;
  }
}

export default { storeTheme, retrieveTheme };
