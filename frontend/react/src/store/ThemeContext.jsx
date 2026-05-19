import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    // Check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Update localStorage when theme changes
    localStorage.setItem("theme", isDark ? "dark" : "light");
    
    // Update document class for Tailwind dark mode
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = {
    isDark,
    // Light theme colors
    light: {
      bg: "bg-white",
      text: "text-black",
      headerBg: "bg-[#fff]/85",
      sidebarBg: "bg-blue-700",
      sidebarText: "text-white",
      cardBg: "bg-gray-50",
      borderColor: "border-gray-200",
    },
    // Dark theme colors
    dark: {
      bg: "bg-gray-900",
      text: "text-white",
      headerBg: "bg-gray-800/85",
      sidebarBg: "bg-gray-800",
      sidebarText: "text-gray-100",
      cardBg: "bg-gray-800",
      borderColor: "border-gray-700",
    },
  };

  const currentTheme = isDark ? theme.dark : theme.light;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
