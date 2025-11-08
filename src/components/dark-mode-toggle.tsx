"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isDark}
        onChange={toggleDarkMode}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-300 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary transition-colors duration-300">
        <span
          className={`absolute top-0.5 left-[2px] w-5 h-5 bg-white border border-gray-300 dark:border-gray-600 rounded-full transition-transform duration-300 flex items-center justify-center ${
            isDark ? "translate-x-5" : "translate-x-0"
          }`}
        >
          {isDark ? (
            <Moon className="w-3 h-3 text-gray-700 dark:text-gray-300" />
          ) : (
            <Sun className="w-3 h-3 text-gray-700" />
          )}
        </span>
      </div>
    </label>
  );
}

