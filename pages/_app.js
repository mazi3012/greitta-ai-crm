import { useState, useEffect, createContext, useContext } from "react";
import "../styles/globals.css";

export const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("greitta_theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    } else {
      setDarkMode(false); // Default to Light theme with Mint Green accent
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("greitta_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("greitta_theme", "light");
    }
  }, [darkMode, mounted]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}

export default MyApp;
