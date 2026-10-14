import React from 'react';
import { useStore } from '../context/StoreContext';

export const BestSellersView: React.FC = () => {
  const { products, openProductDetailModal, openWhatsAppDrawer, toggleWishlist, isWishlisted } = useStore();

  const bestSellers = products.filter((p) => p.isBestSeller || p.rating >= 4.8);

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto px-margin-sm sm:px-margin lg:px-margin-lg py-space-xl">
      <div className="mb-space-xl text-center max-w-2xl mx-auto space-y-space-xs">
        <div className="inline-flex items-center gap-space-xs text-primary font-label-md text-label-md uppercase tracking-wider font-semibold">
          <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
          <span>Awarded & Highly Rated</span>
        </div>
        <h1 className="font-headline-xl text-headline-xl text-on-surface">
          Our Best Sellers
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Formulas celebrated worldwide by beauty editors and customer communities for their lightweight radiance, skin-caring ingredients, and true-to-tone pigments.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter-lg">
        {bestSellers.map((product) => {
          const isFav = isWishlisted(product.id);
          return (
            <div
              key={product.id}
              className="flex flex-col bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative w-full aspect-square rounded-xl bg-surface-container-low flex items-center justify-center p-6 mb-space-md overflow-hidden">
                <span
                  className={`absolute top-3 left-3 px-space-sm py-space-xs rounded-full font-label-sm text-label-sm tracking-wider uppercase font-semibold z-10 ${
                    product.tagColor || 'bg-primary text-on-primary'
                  }`}
                >
                  {product.tag || 'Best Seller'}
                </span>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer z-10"
                >
                  <span
                    className={`material-symbols-outlined text-[18px] ${
                      isFav ? 'text-error' : 'text-outline hover:text-error'
                    }`}
                    style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>
                <div className="w-48 h-48 rounded-full bg-[#f3ecff] flex items-center justify-center shadow-inner overflow-hidden relative">
                  <img
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    src={product.image}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm mb-1">
                <div className="flex items-center text-amber-500 gap-1">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface font-bold">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-outline text-label-sm font-label-sm">
                    ({product.reviewCount})
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">
                  {product.subtitle}
                </span>
              </div>

              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                {product.name}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md line-clamp-2">
                {product.description}
              </p>

              <div className="mt-auto pt-space-sm flex items-center justify-between">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  ${product.price.toFixed(2)}
                </span>
                <span className="font-label-sm text-label-sm text-primary uppercase bg-surface-container-high px-2 py-0.5 rounded font-semibold">
                  {product.stockStatus || 'In Stock'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-space-xs mt-space-md">
                <button
                  className="h-11 rounded-lg bg-surface-container-high text-primary hover:bg-surface-container hover:text-on-surface font-label-sm text-label-sm transition-colors flex items-center justify-center cursor-pointer font-semibold"
                  onClick={() => openProductDetailModal(product)}
                >
                  View Details
                </button>
                <button
                  className="h-11 rounded-lg bg-[#25D366] text-white hover:bg-[#20ba5a] font-label-sm text-label-sm transition-colors flex items-center justify-center gap-1 shadow-[0_4px_14px_rgba(37,211,102,0.3)] cursor-pointer font-semibold"
                  onClick={() => openWhatsAppDrawer(product)}
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>Order WhatsApp</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
