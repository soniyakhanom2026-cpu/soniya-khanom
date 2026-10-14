import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

export const ShopView: React.FC = () => {
  const {
    products,
    setCurrentView,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    isWishlisted,
    toggleWishlist,
    openWhatsAppDrawer,
    openQuickView,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [finishFilter, setFinishFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedShades, setSelectedShades] = useState<Record<string, string>>({});
  const [simulatedEmpty, setSimulatedEmpty] = useState(false);

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      all: products.length,
      lips: products.filter((p) => p.category === 'lips').length,
      face: products.filter((p) => p.category === 'face').length,
      eyes: products.filter((p) => p.category === 'eyes').length,
      cheeks: products.filter((p) => p.category === 'cheeks').length,
    };
  }, [products]);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    if (simulatedEmpty) return [];

    let list = products.filter((product) => {
      // Category filter
      if (selectedCategoryFilter !== 'all' && product.category !== selectedCategoryFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesCat = product.categoryLabel.toLowerCase().includes(q);
        const matchesFinish = product.finish.toLowerCase().includes(q);
        const matchesShade = product.shades.some((s) => s.name.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesCat && !matchesFinish && !matchesShade) {
          return false;
        }
      }

      // Price filter
      if (priceFilter === 'under-20' && product.price >= 20) return false;
      if (priceFilter === '20-30' && (product.price < 20 || product.price > 30)) return false;
      if (priceFilter === 'over-30' && product.price < 30) return false;

      // Finish filter
      if (finishFilter !== 'all' && product.finish.toLowerCase() !== finishFilter.toLowerCase()) {
        return false;
      }

      return true;
    });

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, selectedCategoryFilter, searchQuery, priceFilter, finishFilter, sortBy, simulatedEmpty]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setPriceFilter('all');
    setFinishFilter('all');
    setSortBy('featured');
    setSelectedCategoryFilter('all');
    setSimulatedEmpty(false);
  };

  const handleShadeSelect = (productId: string, shadeName: string) => {
    setSelectedShades((prev) => ({ ...prev, [productId]: shadeName }));
  };

  const getActiveShade = (product: Product) => {
    return selectedShades[product.id] || product.shades[0]?.name || 'Default';
  };

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full max-w-[1440px] mx-auto px-margin-sm sm:px-margin lg:px-margin-lg py-space-md sm:py-space-lg">
        {/* Breadcrumb Bar & Viewport Controls */}
        <div className="flex flex-wrap items-center justify-between gap-space-sm mb-space-md">
          <nav aria-label="Breadcrumbs" className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
            <button
              onClick={() => setCurrentView('home')}
              className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">home</span>
              Home
            </button>
            <span className="material-symbols-outlined text-[14px] text-outline-variant">
              chevron_right
            </span>
            <span className="text-primary font-semibold">Shop All Beauty</span>
          </nav>
          <div className="flex items-center gap-space-xs">
            <span className="inline-flex items-center gap-1.5 px-space-sm py-1 bg-surface-container-high rounded-full font-label-sm text-label-sm text-primary font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
              Live WhatsApp Ordering Active
            </span>
            <button
              className="px-space-sm py-1 bg-surface-container-low hover:bg-surface-container-highest text-on-surface-variant rounded-lg font-label-sm text-label-sm transition-all flex items-center gap-1 cursor-pointer"
              onClick={() => setSimulatedEmpty(!simulatedEmpty)}
            >
              <span className="material-symbols-outlined text-[15px]">
                {simulatedEmpty ? 'refresh' : 'troubleshoot'}
              </span>
              <span>{simulatedEmpty ? 'Restore Catalog' : 'Simulate Zero Results'}</span>
            </button>
          </div>
        </div>

        {/* Editorial Header Section */}
        <div className="relative overflow-hidden bg-surface-container-lowest rounded-xl p-space-md sm:p-space-xl shadow-sm mb-space-xl">
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-primary-fixed/40 blur-3xl pointer-events-none"></div>
          <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-secondary-fixed/40 blur-2xl pointer-events-none"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-end">
            <div className="lg:col-span-8 space-y-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-sm text-label-sm tracking-widest text-primary uppercase font-bold">
                  Atelier Collection
                </span>
                <span className="w-8 h-[2px] bg-primary"></span>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                  Formulated for Radiance
                </span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                Shop All Beauty
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl pt-1">
                Explore our complete curated makeup collection. Handcrafted formulas designed for radiant wear, versatile finishes, and easy WhatsApp ordering.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col lg:items-end justify-between self-stretch pt-2 lg:pt-0">
              <div className="flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container rounded-lg">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  inventory_2
                </span>
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  Showing {filteredProducts.length} of {products.length} Products
                </span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm mt-3">
                <span className="material-symbols-outlined text-primary text-[16px]">
                  verified
                </span>
                <span>Worldwide Encrypted WhatsApp Concierge</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Filters & Sort Matrix */}
        <section className="mb-space-xl space-y-space-sm">
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm space-y-space-md">
            {/* Search and Primary Controls */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-space-sm items-center">
              {/* Live Search Bar */}
              <div className="md:col-span-5 relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[20px]">
                  search
                </span>
                <input
                  className="w-full h-12 pl-10 pr-4 bg-surface rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-fixed-dim transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, shades, finishes..."
                  type="text"
                />
              </div>

              {/* Price Filter Dropdown */}
              <div className="md:col-span-3">
                <div className="relative">
                  <select
                    className="w-full h-12 px-space-md bg-surface rounded-lg font-label-md text-label-md text-on-surface appearance-none focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim transition-all cursor-pointer"
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                  >
                    <option value="all">All Prices (USD)</option>
                    <option value="under-20">Under $20.00</option>
                    <option value="20-30">$20.00 - $30.00</option>
                    <option value="over-30">$30.00 and Above</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-[20px]">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Finish Filter Dropdown */}
              <div className="md:col-span-2">
                <div className="relative">
                  <select
                    className="w-full h-12 px-space-md bg-surface rounded-lg font-label-md text-label-md text-on-surface appearance-none focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim transition-all cursor-pointer"
                    value={finishFilter}
                    onChange={(e) => setFinishFilter(e.target.value)}
                  >
                    <option value="all">All Finishes</option>
                    <option value="matte">Matte</option>
                    <option value="radiant">Radiant</option>
                    <option value="satin">Satin</option>
                    <option value="luminous">Luminous</option>
                    <option value="glossy">Glossy</option>
                    <option value="volumizing">Volumizing</option>
                    <option value="natural">Natural</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-[20px]">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="md:col-span-2">
                <div className="relative">
                  <select
                    className="w-full h-12 px-space-md bg-surface rounded-lg font-label-md text-label-md text-on-surface appearance-none focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim transition-all cursor-pointer"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-[20px]">
                    swap_vert
                  </span>
                </div>
              </div>
            </div>

            {/* Filter Category Pills */}
            <div className="flex flex-wrap items-center gap-space-xs pt-1">
              <span className="font-label-sm text-label-sm text-outline uppercase font-semibold mr-1">
                Category:
              </span>
              <button
                className={`px-space-md py-1.5 rounded-full font-label-sm text-label-sm transition-all cursor-pointer ${
                  selectedCategoryFilter === 'all'
                    ? 'bg-primary text-on-primary font-semibold shadow-sm'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                }`}
                onClick={() => setSelectedCategoryFilter('all')}
                type="button"
              >
                All Categories ({categoryCounts.all})
              </button>
              <button
                className={`px-space-md py-1.5 rounded-full font-label-sm text-label-sm transition-all cursor-pointer ${
                  selectedCategoryFilter === 'lips'
                    ? 'bg-primary text-on-primary font-semibold shadow-sm'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                }`}
                onClick={() => setSelectedCategoryFilter('lips')}
                type="button"
              >
                Lips ({categoryCounts.lips})
              </button>
              <button
                className={`px-space-md py-1.5 rounded-full font-label-sm text-label-sm transition-all cursor-pointer ${
                  selectedCategoryFilter === 'face'
                    ? 'bg-primary text-on-primary font-semibold shadow-sm'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                }`}
                onClick={() => setSelectedCategoryFilter('face')}
                type="button"
              >
                Face ({categoryCounts.face})
              </button>
              <button
                className={`px-space-md py-1.5 rounded-full font-label-sm text-label-sm transition-all cursor-pointer ${
                  selectedCategoryFilter === 'eyes'
                    ? 'bg-primary text-on-primary font-semibold shadow-sm'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                }`}
                onClick={() => setSelectedCategoryFilter('eyes')}
                type="button"
              >
                Eyes ({categoryCounts.eyes})
              </button>
              <button
                className={`px-space-md py-1.5 rounded-full font-label-sm text-label-sm transition-all cursor-pointer ${
                  selectedCategoryFilter === 'cheeks'
                    ? 'bg-primary text-on-primary font-semibold shadow-sm'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                }`}
                onClick={() => setSelectedCategoryFilter('cheeks')}
                type="button"
              >
                Cheeks ({categoryCounts.cheeks})
              </button>
              <button
                className="ml-auto font-label-sm text-label-sm text-primary hover:text-on-primary-fixed-variant flex items-center gap-1 transition-colors underline cursor-pointer"
                onClick={resetAllFilters}
                type="button"
              >
                <span className="material-symbols-outlined text-[14px]">refresh</span>
                Reset Filters
              </button>
            </div>
          </div>
        </section>

        {/* Main Catalog Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-lg transition-opacity duration-300">
            {filteredProducts.map((product) => {
              const activeShade = getActiveShade(product);
              const isFav = isWishlisted(product.id);

              return (
                <article
                  key={product.id}
                  className="product-card group bg-surface-container-lowest rounded-xl p-space-md flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 relative"
                >
                  <div className="relative">
                    <div className="flex items-center justify-between mb-space-sm z-10 relative">
                      <span
                        className={`px-space-sm py-0.5 font-label-sm text-label-sm rounded-full font-semibold ${
                          product.tagColor || 'bg-primary text-on-primary'
                        }`}
                      >
                        {product.tag || 'Formulation'}
                      </span>
                      <button
                        aria-label="Save to Wishlist"
                        className="w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer"
                        onClick={() => toggleWishlist(product.id)}
                      >
                        <span
                          className={`material-symbols-outlined text-[18px] transition-colors ${
                            isFav ? 'text-error' : 'text-outline hover:text-error'
                          }`}
                          style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
                        >
                          favorite
                        </span>
                      </button>
                    </div>

                    {/* Pristine Circular Pale Lavender Stage Disc */}
                    <div className="relative w-full aspect-square rounded-xl flex items-center justify-center p-space-md overflow-hidden bg-surface-container-low mb-space-md">
                      <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-[#F3ECFF] flex items-center justify-center shadow-inner overflow-hidden relative transition-transform duration-500 group-hover:scale-105">
                        <img
                          alt={product.name}
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                          src={product.image}
                        />
                      </div>
                    </div>

                    <div className="space-y-space-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider">
                          {product.finishLabel}
                        </span>
                        <div className="flex items-center text-primary font-label-sm text-label-sm">
                          <span
                            className="material-symbols-outlined text-[16px] text-amber-500"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>
                          <span className="ml-0.5 font-bold">{product.rating.toFixed(1)}</span>
                        </div>
                      </div>

                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                        {product.description}
                      </p>

                      {/* Swatch Selector */}
                      {product.shades && product.shades.length > 0 && (
                        <div className="pt-space-xs flex items-center gap-2">
                          <span className="font-label-sm text-label-sm text-outline">Shade:</span>
                          <div className="flex items-center gap-1.5 shade-swatches">
                            {product.shades.map((s) => {
                              const isSelected = activeShade === s.name;
                              return (
                                <button
                                  key={s.name}
                                  className={`w-5 h-5 rounded-full transition-all cursor-pointer ${
                                    isSelected
                                      ? 'ring-2 ring-primary scale-110'
                                      : 'ring-1 ring-outline-variant hover:scale-110'
                                  }`}
                                  style={{ backgroundColor: s.hex }}
                                  onClick={() => handleShadeSelect(product.id, s.name)}
                                  title={s.name}
                                />
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-space-md mt-space-md space-y-space-sm bg-surface-container-low/50 -mx-space-md -mb-space-md p-space-md rounded-b-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-label-sm text-label-sm text-outline-variant block">
                          Price USD
                        </span>
                        <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                      <button
                        className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-sm text-label-sm font-semibold transition-colors cursor-pointer"
                        onClick={() => openQuickView(product, activeShade)}
                      >
                        Details
                      </button>
                    </div>
                    <button
                      className="w-full h-11 rounded-lg bg-[#25D366] hover:bg-[#1fa851] text-white flex items-center justify-center gap-2 font-label-md text-label-md font-semibold transition-all shadow-[0_4px_16px_-2px_rgba(37,211,102,0.35)] cursor-pointer"
                      onClick={() => openWhatsAppDrawer(product, activeShade)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">chat</span>
                      <span>Order via WhatsApp</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty State Container */
          <div className="my-space-xl p-space-xl bg-surface-container-lowest rounded-xl text-center max-w-xl mx-auto shadow-sm animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-surface-container-high text-primary flex items-center justify-center mx-auto mb-space-md">
              <span className="material-symbols-outlined text-[36px]">filter_alt_off</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold mb-space-xs">
              No Products Found
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg">
              We couldn't find any cosmetic formulations matching your current filters. Try resetting the criteria or exploring our entire atelier.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-space-sm">
              <button
                className="w-full sm:w-auto px-space-lg py-space-sm bg-primary text-on-primary rounded-lg font-label-md text-label-md font-semibold hover:bg-tertiary transition-colors cursor-pointer"
                onClick={resetAllFilters}
              >
                Reset All Filters
              </button>
              <button
                className="w-full sm:w-auto px-space-lg py-space-sm bg-[#25D366] text-white rounded-lg font-label-md text-label-md font-semibold hover:bg-[#1fa851] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                onClick={() => {
                  const firstProd = products[0];
                  if (firstProd) openWhatsAppDrawer(firstProd);
                }}
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Ask Beauty Concierge</span>
              </button>
            </div>
          </div>
        )}

        {/* Atelier Highlights & WhatsApp Commerce Advantage */}
        <div className="mt-space-xl bg-surface-container rounded-xl p-space-lg sm:p-space-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg items-center">
            <div className="flex items-start gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">chat_bubble</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Conversational Commerce
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Confirm skin tone matches, request formulation video demos, and complete checkout straight via encrypted WhatsApp.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-secondary text-on-secondary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">flight_takeoff</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Global Atelier Dispatch
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Climate-controlled cosmetic transit packaged in biodegradable violet silk cushions with tracked courier confirmation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-tertiary-container text-on-tertiary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">spa</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Clean Botanical Alchemy
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Every shade is vegan, paraben-free, cruelty-free, and dermatologically approved for sensitive skin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
