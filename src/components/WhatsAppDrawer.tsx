import React from 'react';
import { useStore } from '../context/StoreContext';

export const WhatsAppDrawer: React.FC = () => {
  const {
    whatsAppDrawer,
    closeWhatsAppDrawer,
    setDrawerQuantity,
    setDrawerNotes,
    setDrawerShade,
    getWhatsAppUrl,
    getWhatsAppMessage,
  } = useStore();

  const { isOpen, product, selectedShade, quantity, notes } = whatsAppDrawer;

  if (!isOpen || !product) return null;

  const total = (product.price * quantity).toFixed(2);
  const waUrl = getWhatsAppUrl();
  const messagePreview = getWhatsAppMessage();

  return (
    <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-50 flex justify-end animate-fadeIn">
      {/* Background click handler */}
      <div className="absolute inset-0" onClick={closeWhatsAppDrawer} />

      {/* Drawer panel */}
      <div className="relative z-10 w-full max-w-md bg-surface-container-lowest shadow-2xl p-space-md sm:p-space-lg flex flex-col justify-between h-full overflow-y-auto animate-slideInRight">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-space-md mb-space-md border-b border-outline-variant/20">
            <div className="flex items-center gap-space-xs">
              <span className="w-3 h-3 rounded-full bg-[#25D366] animate-pulse"></span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Instant Order Preview
              </span>
            </div>
            <button
              onClick={closeWhatsAppDrawer}
              className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Selected Item Card */}
          <div className="bg-surface-container p-space-md rounded-xl flex items-center gap-space-md mb-space-md">
            <div className="w-16 h-16 rounded-xl bg-[#F3ECFF] flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
              <img
                alt={product.name}
                className="w-full h-full object-cover object-center"
                src={product.image}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-label-lg text-label-lg text-on-surface font-bold truncate">
                {product.name}
              </h4>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-label-sm text-label-sm text-primary font-semibold">
                  Shade: {selectedShade}
                </span>
                <span className="text-outline-variant">•</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <span className="font-body-sm text-[11px] text-outline">
                SKU: {product.sku}
              </span>
            </div>
          </div>

          {/* Shades Picker within drawer */}
          {product.shades && product.shades.length > 0 && (
            <div className="mb-space-md">
              <label className="font-label-sm text-label-sm text-outline uppercase font-semibold block mb-1.5">
                Selected Shade Variant:
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {product.shades.map((s) => {
                  const isSelected = selectedShade === s.name;
                  return (
                    <button
                      key={s.name}
                      onClick={() => setDrawerShade(s.name)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-primary text-white font-semibold ring-2 ring-primary ring-offset-1'
                          : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full ring-1 ring-[#e2d0ee] inline-block"
                        style={{ backgroundColor: s.hex }}
                      />
                      <span>{s.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity & Custom Notes */}
          <div className="space-y-space-sm mb-space-md">
            <div className="flex items-center justify-between">
              <label className="font-label-md text-label-md text-on-surface font-semibold">
                Quantity
              </label>
              <div className="flex items-center gap-3 bg-surface-container-high px-space-sm py-1 rounded-lg">
                <button
                  className="text-on-surface-variant hover:text-primary font-bold px-2 py-0.5 cursor-pointer text-base"
                  onClick={() => setDrawerQuantity(-1)}
                >
                  −
                </button>
                <span className="font-label-md text-label-md font-bold text-on-surface w-6 text-center">
                  {quantity}
                </span>
                <button
                  className="text-on-surface-variant hover:text-primary font-bold px-2 py-0.5 cursor-pointer text-base"
                  onClick={() => setDrawerQuantity(1)}
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="font-label-md text-label-md text-on-surface font-semibold block mb-1">
                Custom Delivery Request / Tone Advice
              </label>
              <textarea
                className="w-full p-2.5 bg-surface border border-outline-variant/40 rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim"
                value={notes}
                onChange={(e) => setDrawerNotes(e.target.value)}
                placeholder="e.g. Include express courier gift wrap, please confirm shade undertone..."
                rows={2}
              />
            </div>
          </div>

          {/* Real-Time Encrypted Message Preview */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                Encrypted Message Preview
              </span>
              <span className="font-label-sm text-label-sm text-[#25D366] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                <span>256-Bit Prepared</span>
              </span>
            </div>
            <div className="p-space-sm bg-surface rounded-lg font-body-sm text-body-sm text-on-surface-variant whitespace-pre-wrap select-all font-mono text-[12px] leading-relaxed max-h-36 overflow-y-auto border border-outline-variant/30 shadow-inner">
              {messagePreview}
            </div>
          </div>
        </div>

        {/* Footer WhatsApp Trigger */}
        <div className="pt-space-md border-t border-outline-variant/20 space-y-space-xs mt-space-md">
          <div className="flex items-center justify-between text-on-surface font-label-md text-label-md">
            <span>Estimated Total:</span>
            <span className="font-headline-sm text-headline-sm font-bold text-primary">
              ${total}
            </span>
          </div>
          <a
            className="w-full h-12 rounded-lg bg-[#25D366] hover:bg-[#1fa851] text-white flex items-center justify-center gap-2 font-label-lg text-label-lg font-semibold transition-all shadow-[0_6px_20px_rgba(37,211,102,0.4)]"
            href={waUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
            <span>Open WhatsApp & Complete Order</span>
          </a>
          <p className="font-label-sm text-label-sm text-outline text-center">
            No prepayment mandatory • Finalize currency & tracking in WhatsApp chat
          </p>
        </div>
      </div>
    </div>
  );
};
