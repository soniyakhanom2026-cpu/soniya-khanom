import React from 'react';
import { useStore } from '../context/StoreContext';

export const FloatingWhatsApp: React.FC = () => {
  const { config } = useStore();
  const cleanPhone = config.whatsAppNumber.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanPhone || '18005550199'}?text=${encodeURIComponent(
    'Hello Violet Muse! I have a question about your products and would like to order.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <a
        className="group flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-[0_8px_24px_rgba(37,211,102,0.35)] hover:bg-[#20ba5a] hover:scale-105 transition-all cursor-pointer"
        href={waUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="material-symbols-outlined text-[24px]">chat</span>
        <span className="hidden sm:inline font-label-md text-label-md font-bold tracking-wide">
          Quick Order
        </span>
      </a>
    </div>
  );
};
