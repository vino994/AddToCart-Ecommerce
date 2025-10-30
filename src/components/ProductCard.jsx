import React from "react";

export default function ProductCard({ product, onAdd }) {
  return (
   <div className="shadow-box p-4 flex flex-col hover:-translate-y-1 transition bg-transparent">
  <div className="h-44 flex items-center justify-center mb-3 border-b-2 border-black pb-3">
    <img src={product.image} alt={product.title} className="max-h-full object-contain" />
  </div>

  <h3 className="text-sm font-medium mb-2">{product.title}</h3>
  <div className="text-lg font-semibold mb-3">₹{product.price}</div>

  <button
    onClick={onAdd}
    className="mt-auto border-2 border-black rounded px-3 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
  >
    Add to Cart
  </button>
</div>

  );
}
