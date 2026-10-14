import React from 'react';
import { useStore } from '../context/StoreContext';

export const WishlistDrawer: React.FC = () => {
  const {
    products,
    wishlist,
    toggleWishlist,
    wishlistDrawerOpen,
    setWishlistDrawerOpen,
    openWhatsAppDrawer,
    config,
  } = useStore();

  if (!wishlistDrawerOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));
  const totalValue = wishlistedProducts.reduce((sum, p) => sum + p.price, 0).toFixed(2);

  const cleanPhone = config.whatsAppNumber.replace(/[^0-9]/g, '');
  const bundleSummary = wishlistedProducts
    .map((p, idx) => `${idx + 1}. ${p.name} ($${p.price.toFixed(2)})`)
    .join('\n');
  const bundleMsg = encodeURIComponent(
    `Hello Violet Muse Atelier! ✨\n\nI would like to order my entire Saved Beauty Bag (${wishlistedProducts.length} items):\n${bundleSummary}\n\nTotal: $${totalValue} USD\n\nPlease let me know how to proceed with payment and shipping.`
  );
  const bundleWaUrl = `https://wa.me/${cleanPhone || '18005550199'}?text=${bundleMsg}`;

  return (
    <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-50 flex justify-end animate-fadeIn">
      <div className="absolute inset-0" onClick={() => setWishlistDrawerOpen(false)} />
      <div className="relative z-10 w-full max-w-md bg-surface-container-lowest shadow-2xl p-space-md sm:p-space-lg flex flex-col justify-between h-full overflow-y-auto animate-slideInRight">
        <div>
          <div className="flex items-center justify-between pb-space-md mb-space-md border-b border-outline-variant/20">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[22px]">favorite</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Saved Beauty Bag ({wishlistedProducts.length})
              </h3>
            </div>
            <button
              onClick={() => setWishlistDrawerOpen(false)}
              className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {wishlistedProducts.length === 0 ? (
            <div className="py-space-xl text-center space-y-space-sm">
              <div className="w-16 h-16 rounded-full bg-surface-container-high text-outline flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[32px]">favorite_border</span>
              </div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Your Bag is Empty
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs mx-auto">
                Tap the heart icon on any product to save your desired luxury shades and order them anytime.
              </p>
            </div>
          ) : (
            <div className="space-y-space-sm">
              {wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-surface-container p-space-sm rounded-xl flex items-center gap-space-sm"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#F3ECFF] flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                    <img
                      alt={product.name}
                      className="w-full h-full object-cover object-center"
                      src={product.image}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-label-md text-label-md text-on-surface font-semibold truncate">
                      {product.name}
                    </h5>
                    <p className="font-label-sm text-label-sm text-primary font-bold">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setWishlistDrawerOpen(false);
                        openWhatsAppDrawer(product);
                      }}
                      className="p-1.5 rounded-lg bg-[#25D366] text-white hover:bg-[#1fa851] cursor-pointer"
                      title="Order this item via WhatsApp"
                    >
                      <span className="material-symbols-outlined text-[16px]">chat</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="p-1.5 rounded-lg hover:bg-surface-container-high text-outline hover:text-error cursor-pointer"
                      title="Remove from bag"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {wishlistedProducts.length > 0 && (
          <div className="pt-space-md border-t border-outline-variant/20 space-y-space-sm mt-space-md">
            <div className="flex items-center justify-between text-on-surface font-label-md text-label-md">
              <span>Bag Total ({wishlistedProducts.length} items):</span>
              <span className="font-headline-sm text-headline-sm font-bold text-primary">
                ${totalValue}
              </span>
            </div>
            <a
              className="w-full h-12 rounded-lg bg-[#25D366] hover:bg-[#1fa851] text-white flex items-center justify-center gap-2 font-label-lg text-label-lg font-semibold transition-all shadow-md"
              href={bundleWaUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              <span>Order Full Beauty Bag via WhatsApp</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
