import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';

export const QuickViewModal: React.FC = () => {
  const { quickView, closeQuickView, openWhatsAppDrawer } = useStore();
  const { isOpen, product, selectedShade: initialShade } = quickView;
  const [activeShade, setActiveShade] = useState(initialShade);

  useEffect(() => {
    setActiveShade(initialShade);
  }, [initialShade, isOpen]);

  if (!isOpen || !product) return null;

  const handleProceed = () => {
    closeQuickView();
    openWhatsAppDrawer(product, activeShade);
  };

  return (
    <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-50 flex items-center justify-center p-space-md animate-fadeIn">
      <div className="absolute inset-0" onClick={closeQuickView} />
      <div className="bg-surface-container-lowest rounded-2xl max-w-2xl w-full p-space-md sm:p-space-lg shadow-2xl relative z-10 animate-scaleUp">
        <button
          onClick={closeQuickView}
          className="absolute right-4 top-4 w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg items-center">
          {/* Visual Stage */}
          <div className="w-full aspect-square rounded-xl bg-surface-container-low flex items-center justify-center p-space-md relative overflow-hidden">
            <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-[#F3ECFF] flex items-center justify-center shadow-inner overflow-hidden relative">
              <img
                alt={product.name}
                className="w-full h-full object-cover object-center"
                src={product.image}
              />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-space-sm">
            <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-widest">
              {product.categoryLabel} Collection
            </span>
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
              {product.name}
            </h3>
            <p className="font-label-md text-label-md text-secondary font-semibold">
              Finish: {product.finish.charAt(0).toUpperCase() + product.finish.slice(1)} Formulation
            </p>
            <p className="font-headline-sm text-headline-sm text-on-surface font-bold">
              ${product.price.toFixed(2)}
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {product.description}
            </p>

            {/* Shades */}
            {product.shades && product.shades.length > 0 && (
              <div className="pt-space-xs">
                <span className="font-label-sm text-label-sm text-outline block mb-1">
                  Active Shade Selected
                </span>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {product.shades.map((s) => (
                    <button
                      key={s.name}
                      onClick={() => setActiveShade(s.name)}
                      className={`px-3 py-1 rounded-full font-label-md text-label-md transition-all cursor-pointer flex items-center gap-1.5 ${
                        activeShade === s.name
                          ? 'bg-primary text-white font-bold ring-2 ring-primary'
                          : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/10 inline-block"
                        style={{ backgroundColor: s.hex }}
                      />
                      <span>{s.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-space-sm flex flex-col gap-2">
              <button
                className="w-full h-11 rounded-lg bg-[#25D366] hover:bg-[#1fa851] text-white flex items-center justify-center gap-2 font-label-md text-label-md font-semibold transition-all shadow-md cursor-pointer"
                onClick={handleProceed}
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Proceed to WhatsApp Order</span>
              </button>
              <button
                className="w-full py-2 text-center text-outline hover:text-on-surface font-label-sm text-label-sm cursor-pointer"
                onClick={closeQuickView}
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
