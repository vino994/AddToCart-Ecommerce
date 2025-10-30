import React, { useEffect, useMemo } from "react";

export default function CartModal({ open, onClose, cartItems, onRemove }) {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  const total = useMemo(() => cartItems.reduce((sum, item) => sum + Number(item.price), 0), [cartItems]);

  if (!open) return null;

  return (
 <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
  <div className="absolute inset-0 bg-black/30 dark:bg-white/10" onClick={onClose} />
  <div className="relative z-10 bg-white dark:bg-black border-2 border-black rounded-lg shadow-lg w-full max-w-3xl mx-4">
    <div className="flex items-center justify-between px-4 py-3 border-b-2 border-black">
      <h2 className="text-lg font-semibold">Your Cart ({cartItems.length})</h2>
      <button onClick={onClose} className="font-bold">✖</button>
    </div>

    <div className="p-4 max-h-96 overflow-auto">
      {cartItems.length === 0 ? (
        <div className="text-center py-12 text-gray-600 dark:text-gray-400">
          Your cart is empty.
        </div>
      ) : (
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between border-2 border-black rounded p-3">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-contain border border-black" />
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="font-semibold text-sm">₹{item.price}</p>
                </div>
              </div>
              <button
                onClick={() => onRemove(item.id)}
                className="border-2 border-black px-3 py-1 rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>

    {cartItems.length > 0 && (
      <div className="border-t-2 border-black p-4 flex justify-between items-center">
        <div className="font-semibold">Total: ₹{total.toFixed(2)}</div>
        <button className="border-2 border-black px-4 py-2 rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
          Checkout
        </button>
      </div>
    )}
  </div>
</div>

  );
}
