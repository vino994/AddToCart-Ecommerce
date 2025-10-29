import React, { useEffect, useMemo, useState } from "react";

export default function HeroSection() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("https://fakestoreapi.com/products?limit=3");
      const data = await res.json();
      setFeatured(data);
    })();
  }, []);

  const memoizedFeatured = useMemo(() => featured, [featured]);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Gradient background */}
      <div className="bg-gradient-to-r from-[#CBD99B] to-[#F87B1B] dark:from-[#0f1a3c] dark:to-[#F87B1B] text-white py-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <div className="text-center md:text-left md:w-1/2">
            <h1 className="font-bbh text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg">
  Discover Modern Fashion <br />
  & Lifestyle Essentials
</h1>
            <p className="text-lg mt-4 opacity-90">
              Explore premium collections, hand-picked for style, comfort, and everyday confidence.
            </p>
            <button className="mt-6 bg-[#11224E] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-[#CBD99B] hover:text-[#11224E] transition">
              🛍️ Start Shopping
            </button>
          </div>

          {/* Right Image / Showcase */}
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img
              src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
              alt="Shopping Illustration"
              className="w-64 md:w-80 drop-shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-6xl mx-auto mt-10 px-6">
        <h2 className="text-2xl font-semibold text-[#11224E] dark:text-[#EEEEEE] text-center mb-6">
          🌟 Featured Picks
        </h2>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {memoizedFeatured.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#0f1a3c] shadow-box rounded-xl p-5 flex flex-col items-center text-center hover:scale-105 transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-32 object-contain mb-3"
              />
              <p className="font-medium text-sm">{item.title}</p>
              <p className="text-[#F87B1B] font-semibold mt-2">₹{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
