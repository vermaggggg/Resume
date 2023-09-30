import React, { useEffect, useState } from "react";
import { WbSunny, DarkMode } from "@mui/icons-material";

const ThemeSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize the theme preference from local storage or default to false (light mode).
    const storedTheme = localStorage.getItem("isDarkMode");
    return storedTheme ? JSON.parse(storedTheme) : true;
  });

  const handleThemeToggle = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("isDarkMode", JSON.stringify(newTheme));
    // You can also save the theme preference in other state management solutions or use a global context.
  };

  useEffect(() => {
    // Set the initial theme class when the component mounts.
    const body = document.body;
    body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <label className="theme-switch">
      <input
        type="checkbox"
        checked={isDarkMode}
        onChange={handleThemeToggle}
      />
      <span className="slider round">
        {isDarkMode ? <DarkMode className="dark_icon" /> : <WbSunny className="light_icon" />}
      </span>
    </label>
  );
};

export default ThemeSwitch;

