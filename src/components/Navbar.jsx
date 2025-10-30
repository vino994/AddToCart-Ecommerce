import React, { useState, useEffect, useCallback } from "react";

export default function Navbar({ count, onCartClick }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [wireframe, setWireframe] = useState(() => localStorage.getItem("wireframe") === "true");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.toggle("wireframe", wireframe);
    localStorage.setItem("wireframe", wireframe);
  }, [wireframe]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const toggleWireframe = useCallback(() => {
    setWireframe((prev) => !prev);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 border-b-2 border-black ${
        theme === "light" ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">🛍️ JStore</h1>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleWireframe}
            className="border-2 border-black px-3 py-1 rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
          >
            {wireframe ? "Live Mode" : "Sketch Mode"}
          </button>

          <button
            onClick={toggleTheme}
            className="border-2 border-black px-3 py-1 rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          <button
            onClick={onCartClick}
            className="relative border-2 border-black px-4 py-1 rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
          >
            Cart
            <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-sm border-2 border-black rounded-full font-semibold">
              {count}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
