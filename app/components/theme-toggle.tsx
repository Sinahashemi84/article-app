"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleTheme } from "@/store/slices/themeSlice";

const ThemeToggle = () => {
  const theme = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  const handleToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    dispatch(toggleTheme());
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded bg-gray-300 dark:bg-gray-700 text-sm"
    >
      Switch to {theme === "dark" ? "Light" : "Dark"} Mode
    </button>
  );
};

export default ThemeToggle;
