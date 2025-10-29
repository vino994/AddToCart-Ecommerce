import React from "react";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="shadow-box bg-white dark:bg-[#11224E] p-4 flex flex-col hover:shadow-lg hover:-translate-y-1 transition">
      <div className="h-44 flex items-center justify-center mb-3 border-b border-[#CBD99B] pb-3">
        <img src={product.image} alt={product.title} className="max-h-full object-contain" />
      </div>

      <h3 className="text-sm font-medium mb-2">{product.title}</h3>
      <div className="text-lg font-semibold mb-3 text-[#F87B1B]">₹{product.price}</div>

      <button
        onClick={onAdd}
        className="mt-auto bg-[#F87B1B] text-white px-3 py-2 rounded hover:bg-[#CBD99B] hover:text-[#11224E]"
      >
        Add to Cart
      </button>
    </div>
  );
}
