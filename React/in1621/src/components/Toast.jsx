// components/Toast.jsx
'use client';
import { useEffect } from 'react';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-[#3C2A21] text-[#E5E5CB] px-4 py-2 rounded-lg shadow-lg z-50">
      {message}
    </div>
  );
}