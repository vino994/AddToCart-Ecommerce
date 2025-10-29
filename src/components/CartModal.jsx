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
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 bg-[#EEEEEE] dark:bg-[#11224E] border border-[#CBD99B] rounded-lg shadow-lg w-full max-w-3xl mx-4">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#CBD99B]">
          <h2 className="text-lg font-semibold text-[#11224E] dark:text-[#EEEEEE]">
            Your Cart ({cartItems.length})
          </h2>
          <button onClick={onClose} className="text-[#F87B1B] font-bold hover:opacity-70">
            ✖
          </button>
        </div>

        <div className="p-4 max-h-96 overflow-auto">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-[#CBD99B] py-12">
              Your cart is empty.
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border border-[#CBD99B] rounded p-3 bg-white dark:bg-[#11224E]"
                >
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-contain rounded" />
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-[#F87B1B] font-semibold text-sm">₹{item.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="bg-[#F87B1B] text-white px-3 py-1 rounded hover:bg-[#CBD99B] hover:text-[#11224E]"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-[#CBD99B] p-4 flex justify-between items-center">
            <div className="font-semibold text-[#11224E] dark:text-[#EEEEEE]">
              Total: ₹{total.toFixed(2)}
            </div>
            <button
              onClick={onClose}
              className="bg-[#F87B1B] text-white px-4 py-2 rounded hover:bg-[#CBD99B] hover:text-[#11224E]"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
