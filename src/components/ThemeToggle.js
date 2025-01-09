import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="bg-green-200 dark:bg-gray-700 dark:text-white text-green-700 py-2 px-4 rounded hover:bg-green-300 dark:hover:bg-gray-600 transition-colors"
    >
      {theme === "light" ? "Тёмная тема" : "Светлая тема"}
    </button>
  );
};

export default ThemeToggle;
