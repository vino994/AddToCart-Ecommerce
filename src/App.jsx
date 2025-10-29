import React, { useState, useEffect, useMemo, useCallback } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import CartModal from "./components/CartModal";
import HeroSection from "./components/HeroSection";
import ScrollToTop from "./components/ScrollToTop";
import AlertPopup from "./components/AlertPopup";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState(1000);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  //  Fetch products on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  //  Unique categories
  const categories = useMemo(
    () => ["all", ...new Set(products.map((p) => p.category))],
    [products]
  );

  //  Add to Cart 
  const handleAddToCart = useCallback(
    (product) => {
      const exists = cart.some((p) => p.id === product.id);
      if (exists) {
        setAlertMsg("⚠️ Item already added to the cart!");
        return;
      }
      setCart((prev) => [...prev, product]);
      setAlertMsg("✅ Item added to cart!");
    },
    [cart]
  );

  //  Remove from Cart
  const handleRemoveFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  }, []);

  //  Filter products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => (category === "all" ? true : p.category === category))
      .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => p.price <= price);
  }, [products, category, search, price]);

  return (
    <div className="min-h-screen bg-[#EEEEEE] dark:bg-[#0b1733] text-[#11224E] dark:text-[#EEEEEE]">
      {/*  Navbar */}
      <Navbar count={cart.length} onCartClick={() => setModalOpen(true)} />

      {/*  Hero Section */}
      <HeroSection />

      {/*  Filter Bar */}
      <main className="max-w-6xl mx-auto p-6">
        <div className="shadow-md bg-[#CBD99B]/40 dark:bg-[#11224E] p-5 mb-6 flex flex-col sm:flex-row flex-wrap gap-4 items-center justify-center text-center rounded-xl border border-[#CBD99B]">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-[#CBD99B] rounded px-3 py-2 w-64 bg-white dark:bg-[#0b1733] text-[#11224E] dark:text-[#EEEEEE] focus:ring-2 focus:ring-[#F87B1B]"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-[#CBD99B] rounded px-3 py-2 bg-white dark:bg-[#0b1733] text-[#11224E] dark:text-[#EEEEEE] focus:ring-2 focus:ring-[#F87B1B]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.toUpperCase()}
              </option>
            ))}
          </select>

          <div className="flex flex-col sm:flex-row items-center gap-2">
            <label className="text-sm text-[#11224E] dark:text-[#EEEEEE] font-semibold">
              Max: ₹{price}
            </label>
            <input
              type="range"
              min="0"
              max="1000"
              step="50"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="accent-[#F87B1B]"
            />
          </div>
        </div>

        {/*  Product Grid */}
        {loading ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-56 rounded bg-[#CBD99B]/30 animate-pulse shadow-md"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={() => handleAddToCart(product)} // ✅ Now defined properly
              />
            ))}
          </div>
        )}
      </main>

      {/*  Cart Modal */}
      <CartModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        cartItems={cart}
        onRemove={handleRemoveFromCart}
      />

      {/*  Scroll Button */}
      <ScrollToTop />

      {/*  Alert Popup */}
      <AlertPopup message={alertMsg} onClose={() => setAlertMsg("")} />

      {/*  Footer */}
      <footer className="text-xs text-gray-400 text-center py-5 border-t border-[#CBD99B]/40">
        © {new Date().getFullYear()}{" "}
        <span className="text-[#F87B1B] font-semibold">Vinoth Sanjeev</span>.{" "}
        All Rights Reserved.
      </footer>
    </div>
  );
}
