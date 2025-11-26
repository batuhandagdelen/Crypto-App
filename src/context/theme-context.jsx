import { createContext, useEffect, useState, useContext } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // tema state i

  const [isDarkMode, setİsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // temayı değiştirecek fonksiyon
  const toggleTheme = () => {
    setİsDarkMode((prev) => !prev);
  };

  // tema state i değişince arayüzü güncelle

  useEffect(() => {
    const root = window.document.documentElement;

    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// custom hook tasarla

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("Provider ile App i sarmala");
  }
  return context;
};
