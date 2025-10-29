import React, { useEffect } from "react";

export default function AlertPopup({ message, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-6 right-6 z-50 animate-fade-in">
      <div className="bg-[#11224E] text-[#EEEEEE] dark:bg-[#F87B1B] dark:text-white px-6 py-3 rounded-lg shadow-lg border border-[#CBD99B] flex items-center gap-3">
        
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
}
