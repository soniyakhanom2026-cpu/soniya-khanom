import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

export const SearchModal: React.FC = () => {
  const {
    searchModalOpen,
    setSearchModalOpen,
    products,
    openWhatsAppDrawer,
    openQuickView,
  } = useStore();
  const [query, setQuery] = useState('');

  if (!searchModalOpen) return null;

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(query.toLowerCase()) ||
          p.finish.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.shades.some((s) => s.name.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4 animate-fadeIn">
      <div className="absolute inset-0" onClick={() => setSearchModalOpen(false)} />
      <div className="relative z-10 bg-surface-container-lowest rounded-2xl max-w-xl w-full p-space-md sm:p-space-lg shadow-2xl animate-scaleUp">
        <div className="flex items-center gap-space-sm border-b border-outline-variant/30 pb-space-sm">
          <span className="material-symbols-outlined text-outline-variant text-[24px]">
            search
          </span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search formulations, shades, finishes..."
            className="w-full bg-transparent font-body-md text-body-md text-on-surface focus:outline-none placeholder:text-outline"
          />
          <button
            onClick={() => setSearchModalOpen(false)}
            className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Results */}
        <div className="mt-space-md max-h-96 overflow-y-auto space-y-2">
          {query.trim() === '' ? (
            <div className="py-6 text-center text-outline font-body-sm text-body-sm">
              Type keywords like "Lipstick", "Plum", "Luminous", "Concealer" or shade names...
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-8 text-center text-on-surface-variant font-body-md text-body-md">
              No matching luxury formulations found for "{query}".
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container transition-colors"
              >
                <div
                  className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                  onClick={() => {
                    setSearchModalOpen(false);
                    openQuickView(product);
                  }}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F3ECFF] flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="font-label-md text-label-md text-on-surface font-semibold truncate">
                      {product.name}
                    </h5>
                    <p className="font-body-sm text-[12px] text-on-surface-variant">
                      {product.categoryLabel} • {product.finish} finish • ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSearchModalOpen(false);
                    openWhatsAppDrawer(product);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#25D366] text-white font-label-sm text-label-sm font-semibold flex items-center gap-1 ml-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">chat</span>
                  <span>Order</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
