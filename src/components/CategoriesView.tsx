import React from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES_DATA } from '../data/initialData';

export const CategoriesView: React.FC = () => {
  const { products, setCurrentView, setSelectedCategoryFilter, openWhatsAppDrawer, openQuickView } = useStore();

  const handleExploreCategory = (catId: string) => {
    setSelectedCategoryFilter(catId);
    setCurrentView('shop');
  };

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto px-margin-sm sm:px-margin lg:px-margin-lg py-space-xl">
      {/* Editorial Header */}
      <div className="mb-space-xl text-center max-w-2xl mx-auto space-y-space-xs">
        <span className="font-label-md text-label-md text-primary tracking-widest uppercase font-semibold">
          Formulated Portfolios
        </span>
        <h1 className="font-headline-xl text-headline-xl text-on-surface">
          Cosmetic Collections
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Discover our dedicated laboratories of clean, high-performance makeup designed for effortless everyday wear and couture occasions.
        </p>
      </div>

      {/* Categories Showcase */}
      <div className="space-y-space-xl">
        {CATEGORIES_DATA.map((cat, index) => {
          const categoryProducts = products.filter((p) =>
            cat.id === 'lips'
              ? p.category === 'lips'
              : cat.id === 'face'
              ? p.category === 'face'
              : cat.id === 'cheeks'
              ? p.category === 'cheeks'
              : p.category === 'eyes'
          );

          const isEven = index % 2 === 0;

          return (
            <div
              key={`${cat.name}-${index}`}
              className="bg-surface-container-lowest rounded-2xl p-space-lg sm:p-space-xl shadow-sm border border-outline-variant/20 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
                {/* Visual / Image */}
                <div
                  className={`lg:col-span-5 flex justify-center ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[#f3ecff] flex items-center justify-center shadow-inner group overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-4 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full shadow text-on-surface font-label-sm text-label-sm font-semibold z-10">
                      {cat.desc}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`lg:col-span-7 space-y-space-md ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div>
                    <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">
                      Portfolio {index + 1}
                    </span>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
                      {cat.name}
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                      {cat.philosophy}
                    </p>
                  </div>

                  {/* Micro products preview in this category */}
                  <div className="pt-2">
                    <h4 className="font-label-sm text-label-sm text-outline uppercase font-semibold mb-2">
                      Featured In This Category:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {categoryProducts.slice(0, 2).map((prod) => (
                        <div
                          key={prod.id}
                          className="bg-surface-container-low p-3 rounded-xl flex items-center justify-between gap-2"
                        >
                          <div
                            className="flex items-center gap-2 cursor-pointer min-w-0"
                            onClick={() => openQuickView(prod)}
                          >
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#f3ecff] shrink-0 shadow-sm">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-full h-full object-cover object-center"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="font-label-sm text-label-sm text-on-surface font-bold truncate">
                                {prod.name}
                              </p>
                              <p className="font-label-sm text-[11px] text-primary font-semibold">
                                ${prod.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => openWhatsAppDrawer(prod)}
                            className="px-2.5 py-1 bg-[#25D366] text-white rounded font-label-sm text-label-sm font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[14px]">chat</span>
                            <span>Order</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => handleExploreCategory(cat.id)}
                      className="px-space-lg h-11 rounded-lg bg-primary text-white font-label-md text-label-md font-semibold hover:bg-tertiary transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore Entire {cat.name} Range</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
