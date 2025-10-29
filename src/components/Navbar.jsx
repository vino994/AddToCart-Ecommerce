import React, { useState, useEffect, useCallback } from "react";

export default function Navbar({ count, onCartClick }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 shadow-md"
      style={{ backgroundColor: theme === "light" ? "#11224E" : "#F87B1B" }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#EEEEEE]">🛍️ JStore</h1>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="bg-[#CBD99B] text-[#11224E] px-3 py-1.5 rounded font-semibold hover:bg-[#F87B1B] hover:text-white transition"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          <button
            onClick={onCartClick}
            className="relative bg-[#F87B1B] text-white px-4 py-1.5 rounded font-medium hover:bg-[#CBD99B] hover:text-[#11224E]"
          >
            Cart
            <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-sm bg-[#EEEEEE] text-[#11224E] rounded-full font-semibold">
              {count}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
