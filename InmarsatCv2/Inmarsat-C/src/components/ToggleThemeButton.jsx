import { useState, useEffect } from "react";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { Button } from "antd";
import "../App.css";

const ToggleThemeButton = () => {
  // Initialize the theme based on local storage or default to light
  const isDarkThemeStored = localStorage.getItem("selectedTheme") === "dark";
  const [darkTheme, setDarkTheme] = useState(isDarkThemeStored);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  useEffect(() => {
    const root = document.documentElement;

    if (darkTheme) {
      // Set dark theme
      root.style.setProperty("--body_background", "#181826");
      root.style.setProperty("--body_color", "white");
      localStorage.setItem("selectedTheme", "dark");
      root.style.setProperty("--button_color", "white");
      root.style.setProperty("--button_background", "white");
      root.style.setProperty("--header_background", "#212134"); // Change header background to black
    } else {
      // Set light theme
      root.style.setProperty("--body_background", "#F5F6F6");
      root.style.setProperty("--body_color", "black");
      root.style.setProperty("--button_color", "black");
      root.style.setProperty("--button_background", "black");
      root.style.setProperty("--header_background", "white"); // Change header background to white
      localStorage.setItem("selectedTheme", "light");
    }
  }, [darkTheme]);

  return (
    <div className="toggle-theme-btn">
      <Button onClick={toggleTheme}>
        {darkTheme ? <HiOutlineSun /> : <HiOutlineMoon />}
      </Button>
    </div>
  );
};

export default ToggleThemeButton;
