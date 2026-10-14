import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

export const HomeView: React.FC = () => {
  const {
    products,
    setCurrentView,
    setSelectedCategoryFilter,
    openProductDetailModal,
    openWhatsAppDrawer,
    config,
    showToast,
  } = useStore();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const cleanPhone = config.whatsAppNumber.replace(/[^0-9]/g, '');

  const handleCategoryClick = (categoryKey: string) => {
    setSelectedCategoryFilter(categoryKey);
    setCurrentView('shop');
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      showToast('Thank you for joining our beauty circle!');
      setNewsletterEmail('');
    }
  };

  const bestSellerProducts = products.filter((p) => p.isBestSeller).slice(0, 6);

  const handleLookPairOrder = (lookName: string, itemsDesc: string, price: string) => {
    const text = encodeURIComponent(
      `Hello! I would like to order the ${lookName} bundle (${itemsDesc}) for ${price}. Please share availability and shipping details.`
    );
    window.open(`https://wa.me/${cleanPhone || '18005550199'}?text=${text}`, '_blank');
  };

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO */}
      <section className="relative w-full max-w-[1440px] mx-auto px-margin sm:px-gutter-lg lg:px-margin-lg py-space-xl lg:py-space-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
          {/* Hero Left: Content & Action */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-space-md z-10">
            <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-high w-fit">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold">
                Pre-Fall Formulation 2025
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface leading-[1.08] tracking-tight">
              Makeup That <br className="hidden sm:inline" />
              <span className="text-primary italic font-normal">Feels Like You</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              Discover beauty essentials that help you express your style, create your favourite looks and feel confident every day.
            </p>
            <div className="pt-space-sm flex flex-wrap items-center gap-space-md">
              <button
                onClick={() => {
                  setSelectedCategoryFilter('all');
                  setCurrentView('shop');
                }}
                className="h-12 px-space-lg rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-space-xs shadow-md hover:bg-on-tertiary-fixed-variant transition-all duration-200 cursor-pointer"
              >
                <span>Shop Collection</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <button
                onClick={() => setCurrentView('best-sellers')}
                className="h-12 px-space-lg rounded-lg bg-surface-container-low text-primary font-label-lg text-label-lg flex items-center justify-center hover:bg-surface-container-high transition-all duration-200 cursor-pointer"
              >
                <span>Explore Best Sellers</span>
              </button>
            </div>
            <div className="pt-space-sm flex items-center gap-space-md text-on-surface-variant">
              <div className="flex -space-x-2">
                <span className="w-7 h-7 rounded-full bg-[#f3ecff] flex items-center justify-center text-primary text-[10px] font-bold ring-2 ring-surface">
                  01
                </span>
                <span className="w-7 h-7 rounded-full bg-[#e8ddfc] flex items-center justify-center text-primary text-[10px] font-bold ring-2 ring-surface">
                  02
                </span>
                <span className="w-7 h-7 rounded-full bg-[#dbcbf9] flex items-center justify-center text-primary text-[10px] font-bold ring-2 ring-surface">
                  03
                </span>
              </div>
              <p className="font-label-sm text-label-sm text-outline tracking-wide uppercase">
                Find your shade. Create your look.
              </p>
            </div>
          </div>

          {/* Hero Right: Campaign Stage Visual */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ethereal lavender glow halo */}
            <div className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-secondary-container/40 blur-3xl pointer-events-none -z-0"></div>
            <div className="relative w-full aspect-[4/5] sm:aspect-square max-w-[480px] rounded-full p-3 sm:p-5 bg-gradient-to-b from-surface-container-lowest to-surface-container-high shadow-xl flex items-center justify-center">
              <div className="w-full h-full rounded-full overflow-hidden relative shadow-inner bg-[#f6edff]">
                <img
                  alt="Violet Muse Editorial Campaign"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeq6Z_PJbSLoy6XkYPl7UN0K7WoSDGXcbGAQ_zdROFnb21o40B4FDX2Yimq0lLsfg6IAxiO18j7zSrnWmf2tZ2uzCpZMvugCOjT891JKpHALaWYKpQSGmy8MIEdHG2V7xjbx0_tepg8tGcWFmWT5AA2__SB4U7o_wHdOY-Jy2C9-7oDgj4X0OH9P-I5Va-UsqkIVk_qPQd0x9DYYICZtE1VgxQNaDQ3x9cS75tWW-6Wjlz218nSqo2UQ"
                />
                {/* Ambient tag overlay */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-surface/90 backdrop-blur-md px-space-md py-space-xs rounded-full shadow-md flex items-center gap-space-xs whitespace-nowrap">
                  <span className="material-symbols-outlined text-primary text-[16px]">verified</span>
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold tracking-wider uppercase">
                    Editorial Beauty Muse
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SHOP BY CATEGORY */}
      <section className="w-full max-w-[1440px] mx-auto px-margin sm:px-gutter-lg lg:px-margin-lg py-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-sm">
          <div>
            <span className="font-label-md text-label-md text-primary tracking-widest uppercase font-semibold">
              Formulated Portfolios
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-xs">
              Shop by Category
            </h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
            Clean formulations calibrated for light dispersion, breathable wear, and intuitive daily application.
          </p>
        </div>

        {/* Category Grid: 6 cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-gutter-sm">
          {/* Category 1 */}
          <div
            onClick={() => handleCategoryClick('lips')}
            className="group flex flex-col p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <div className="w-full aspect-square rounded-full bg-[#f3ecff] mb-space-sm flex items-center justify-center relative overflow-hidden">
              <img
                alt="Lipstick & Lip Care"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7HObGtJonnmudX0CkI4vONnzo2RQ_uE4kH99S47Umd85pFgNpMkOIAw2mM8pWX_qaASkNsLZIDcLETWx_L47urvoC3Wpz1faaJFS1dOQLqqlNF2A_D1Ok-M5qwqj7MKUwouhHL8fN4wGD08SzMkfp7RoZg5Od5FcUcQmeRIukAhrdabsUgVH_US25vEHT9mqkdHTykoTffI9RkB7e2_Pz6HxM2tv7n1WqBBFbFbNSzWOnVX-FssHNqg"
              />
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface truncate group-hover:text-primary transition-colors">
              Lipstick & Lips
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
              Velvet & gloss tints
            </p>
            <div className="mt-space-sm flex items-center gap-1 text-primary font-label-sm text-label-sm">
              <span>Explore</span>
              <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>

          {/* Category 2 */}
          <div
            onClick={() => handleCategoryClick('face')}
            className="group flex flex-col p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <div className="w-full aspect-square rounded-full bg-[#f3ecff] mb-space-sm flex items-center justify-center relative overflow-hidden">
              <img
                alt="Foundation & Concealer"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6KVAWTqIHA3DJl5YT3kIePw8EeIvF98469fSYXc1tEhUTA03IdXAcq6zPIjJFhsEPTdgEZCRb9eGRWSQqW8KTUbP7zZOs7HtlR5AcE8FNv1LzuQwypee2YMHD-1tkjDj7byZiMqO87ct1y6OeQ1vG1JJXoqr_TLgYDCdTAMJ3X_FLL2xdq_N9rV1wwqn1h3v5sb5uK3xPxYiWifc3L0aYjpptmPeq1wGzruLLn3CNrhBdLyCBCPxI2A"
              />
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface truncate group-hover:text-primary transition-colors">
              Foundation
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
              Air-light complexion
            </p>
            <div className="mt-space-sm flex items-center gap-1 text-primary font-label-sm text-label-sm">
              <span>Explore</span>
              <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>

          {/* Category 3 */}
          <div
            onClick={() => handleCategoryClick('cheeks')}
            className="group flex flex-col p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <div className="w-full aspect-square rounded-full bg-[#f3ecff] mb-space-sm flex items-center justify-center relative overflow-hidden">
              <img
                alt="Blush & Highlighter"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfNwhWp4L4oK-A5Cci4Ufk2peqM6Lh2f1FnHA_WMZG-7KvOp2Ar3qoBaj4-oANVSC_5OHPHxcCGj2XyJc3oQ2zHgudL2t6gv7poApFqi843TBX9RRLxCtmY9HkC4XZf1m9GjACDqwzy_dw5kn2VmfH2oa3N2sdStEDSHn_kjEl4FuvgtrSEmMJnnVb6SNxTxWB_JwINBULq8LAU4CV0YthgCVggkRzdof1LiQhZ0mpoB_nviHxF0WYGA"
              />
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface truncate group-hover:text-primary transition-colors">
              Blush & Glow
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
              Soft orchid pigments
            </p>
            <div className="mt-space-sm flex items-center gap-1 text-primary font-label-sm text-label-sm">
              <span>Explore</span>
              <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>

          {/* Category 4 */}
          <div
            onClick={() => handleCategoryClick('eyes')}
            className="group flex flex-col p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <div className="w-full aspect-square rounded-full bg-[#f3ecff] mb-space-sm flex items-center justify-center relative overflow-hidden">
              <img
                alt="Eyeshadow & Eyeliner"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVLHPyyJ_sfkaXAJh5viVqLA40iThtv-uZNfhDufFuSNt5ME5rOvMRcz7srmFH01xZ1cVd7TYgn4B0Prq3cBk_CTmnRSr2aHsMyCTSG7wd2bTs7qN_EgzPboXQ9lWORF-_txJHjweQxJoMxNrJdfCUwkfm8J8DopdHqVZJlQ9HObHvnY9vOdYEmSgu9ErSuLUzzHgJeEu4aPTfqQYpzn59PuM3nCc0jaIUomDkPoUOMlLEOgMsCPFVdQ"
              />
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface truncate group-hover:text-primary transition-colors">
              Eye Palette
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
              Nude & plum satin
            </p>
            <div className="mt-space-sm flex items-center gap-1 text-primary font-label-sm text-label-sm">
              <span>Explore</span>
              <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>

          {/* Category 5 */}
          <div
            onClick={() => handleCategoryClick('eyes')}
            className="group flex flex-col p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <div className="w-full aspect-square rounded-full bg-[#f3ecff] mb-space-sm flex items-center justify-center relative overflow-hidden">
              <img
                alt="Mascara & Brows"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJWL3FWjbT4sAFUmI2Sesf0bObS_wFYKKQSEMAnBCF5045siSoeqLA-n1PU9FhCPSAs7WdgXKKbi4ye_LPRLH-u2qimtXWwKp7QJiaL6YNjMBO2aV74BM5j7ZGN54OUx6nC9FQFjZDZ-DqslLbUCrcPjp3fGPHn-N4L27OEImXoTCUkwLuHxkUFPv4GvM47Xk5hWGrKsKEhZak_Uz3mYPqQTHUXRK94r6PFvmEwo7mQG0z_0qjZOhhRw"
              />
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface truncate group-hover:text-primary transition-colors">
              Mascara & Brow
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
              Lift, seal & define
            </p>
            <div className="mt-space-sm flex items-center gap-1 text-primary font-label-sm text-label-sm">
              <span>Explore</span>
              <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>

          {/* Category 6 */}
          <div
            onClick={() => handleCategoryClick('face')}
            className="group flex flex-col p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <div className="w-full aspect-square rounded-full bg-[#f3ecff] mb-space-sm flex items-center justify-center relative overflow-hidden">
              <img
                alt="Concealers & Complexion"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCP4mKkEdjlj-_-bMOvhF65YAXUIrjPmyJKdrJMnd7mXn4rEXuoV9TymWHU6lVK0Pcsknza_DLiNki_-eqvCUZ0wneVtkKqSFHRKPjKkhHaS9oBOVvJRA9ICxdkJrjdxkkI7RN7hCppQkyFeyjoEV8PbSKOlteYfPgyfV7RB49LJF0mTZVn8QM6QSavSQQv7thnMvX506fTt667e7if9rzQutR3Gfx_Kh2sMX5mTTqWW2JbwDffNpcgw"
              />
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface truncate group-hover:text-primary transition-colors">
              Concealer
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
              Velvet finish base
            </p>
            <div className="mt-space-sm flex items-center gap-1 text-primary font-label-sm text-label-sm">
              <span>Explore</span>
              <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: BEST SELLERS */}
      <section className="w-full max-w-[1440px] mx-auto px-margin sm:px-gutter-lg lg:px-margin-lg py-space-xl" id="bestsellers">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-space-lg">
          <div>
            <div className="flex items-center gap-space-xs text-primary font-label-md text-label-md uppercase tracking-wider font-semibold">
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              <span>Curated Icons</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-xs">
              Our Best Sellers
            </h2>
          </div>
          <p className="font-body-sm text-body-sm text-outline mt-2 sm:mt-0">
            Direct 1-click international WhatsApp reservation available
          </p>
        </div>

        {/* Product Grid: 6 items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter-lg">
          {bestSellerProducts.map((product) => {
            const cleanPrice = `$${product.price.toFixed(2)}`;
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
                    {cleanPrice}
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
      </section>

      {/* SECTION 4: FEATURED COLLECTION (EDITORIAL SPLIT) */}
      <section className="w-full bg-surface-container-low py-space-xl my-space-lg">
        <div className="max-w-[1440px] mx-auto px-margin sm:px-gutter-lg lg:px-margin-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
            {/* Left Editorial Column */}
            <div className="lg:col-span-5 space-y-space-md">
              <div className="inline-flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase tracking-widest font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span>The Curated Capsule</span>
              </div>
              <h2 className="font-headline-xl text-headline-xl text-on-surface leading-[1.1]">
                Your Everyday <br />
                <span className="text-primary italic font-normal">Beauty Edit</span>
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Explore versatile makeup essentials for effortless everyday looks and special occasions. Each shade in this edit was hand-tested across diverse undertones.
              </p>

              {/* Swatch Showcase */}
              <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm space-y-space-sm">
                <span className="font-label-sm text-label-sm text-outline tracking-wider uppercase font-semibold">
                  Signature Edit Shade Swatches
                </span>
                <div className="flex items-center gap-space-sm">
                  <div className="group relative flex flex-col items-center">
                    <span className="w-9 h-9 rounded-full bg-[#8E4A5B] shadow-inner ring-2 ring-primary"></span>
                    <span className="font-label-sm text-[10px] text-on-surface mt-1">Mulberry</span>
                  </div>
                  <div className="group relative flex flex-col items-center">
                    <span className="w-9 h-9 rounded-full bg-[#E59A84] shadow-inner ring-2 ring-transparent hover:ring-primary transition-all"></span>
                    <span className="font-label-sm text-[10px] text-on-surface mt-1">Peche</span>
                  </div>
                  <div className="group relative flex flex-col items-center">
                    <span className="w-9 h-9 rounded-full bg-[#D19293] shadow-inner ring-2 ring-transparent hover:ring-primary transition-all"></span>
                    <span className="font-label-sm text-[10px] text-on-surface mt-1">Petal</span>
                  </div>
                  <div className="group relative flex flex-col items-center">
                    <span className="w-9 h-9 rounded-full bg-[#C99166] shadow-inner ring-2 ring-transparent hover:ring-primary transition-all"></span>
                    <span className="font-label-sm text-[10px] text-on-surface mt-1">Warm Honey</span>
                  </div>
                  <div className="group relative flex flex-col items-center">
                    <span className="w-9 h-9 rounded-full bg-[#4A2633] shadow-inner ring-2 ring-transparent hover:ring-primary transition-all"></span>
                    <span className="font-label-sm text-[10px] text-on-surface mt-1">Cassis</span>
                  </div>
                </div>
              </div>

              <div className="pt-space-xs">
                <button
                  onClick={() => {
                    setSelectedCategoryFilter('all');
                    setCurrentView('shop');
                  }}
                  className="inline-flex items-center gap-space-xs px-space-lg h-12 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg hover:bg-tertiary-container transition-all cursor-pointer font-semibold shadow-sm"
                >
                  <span>Explore the Collection</span>
                  <span className="material-symbols-outlined text-[18px]">north_east</span>
                </button>
              </div>
            </div>

            {/* Right Visual Mosaic Bento */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-gutter-sm">
              <div className="space-y-gutter-sm">
                <div
                  onClick={() => {
                    const prod = products.find((p) => p.name.includes('Eyeshadow'));
                    if (prod) openWhatsAppDrawer(prod);
                  }}
                  className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
                >
                  <div className="w-full aspect-square rounded-full bg-[#f3ecff] flex items-center justify-center mb-space-sm overflow-hidden relative">
                    <img
                      alt="Nude Edit Palette"
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVLHPyyJ_sfkaXAJh5viVqLA40iThtv-uZNfhDufFuSNt5ME5rOvMRcz7srmFH01xZ1cVd7TYgn4B0Prq3cBk_CTmnRSr2aHsMyCTSG7wd2bTs7qN_EgzPboXQ9lWORF-_txJHjweQxJoMxNrJdfCUwkfm8J8DopdHqVZJlQ9HObHvnY9vOdYEmSgu9ErSuLUzzHgJeEu4aPTfqQYpzn59PuM3nCc0jaIUomDkPoUOMlLEOgMsCPFVdQ"
                    />
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface">The Ambient Palette</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Satin matte & violet reflect pigments</p>
                </div>

                <div
                  onClick={() => {
                    const prod = products.find((p) => p.name.includes('Mascara'));
                    if (prod) openWhatsAppDrawer(prod);
                  }}
                  className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center gap-space-md hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-[#f3ecff] flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      alt="Mascara"
                      className="w-full h-full object-cover object-center"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJWL3FWjbT4sAFUmI2Sesf0bObS_wFYKKQSEMAnBCF5045siSoeqLA-n1PU9FhCPSAs7WdgXKKbi4ye_LPRLH-u2qimtXWwKp7QJiaL6YNjMBO2aV74BM5j7ZGN54OUx6nC9FQFjZDZ-DqslLbUCrcPjp3fGPHn-N4L27OEImXoTCUkwLuHxkUFPv4GvM47Xk5hWGrKsKEhZak_Uz3mYPqQTHUXRK94r6PFvmEwo7mQG0z_0qjZOhhRw"
                    />
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-secondary font-bold uppercase">Volume Lock</span>
                    <p className="font-headline-sm text-headline-sm text-on-surface">Ultra Definition</p>
                  </div>
                </div>
              </div>

              <div className="space-y-gutter-sm pt-space-lg">
                <div
                  onClick={() => {
                    const prod = products.find((p) => p.name.includes('Blush'));
                    if (prod) openWhatsAppDrawer(prod);
                  }}
                  className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center gap-space-md hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-[#f3ecff] flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      alt="Blush"
                      className="w-full h-full object-cover object-center"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfNwhWp4L4oK-A5Cci4Ufk2peqM6Lh2f1FnHA_WMZG-7KvOp2Ar3qoBaj4-oANVSC_5OHPHxcCGj2XyJc3oQ2zHgudL2t6gv7poApFqi843TBX9RRLxCtmY9HkC4XZf1m9GjACDqwzy_dw5kn2VmfH2oa3N2sdStEDSHn_kjEl4FuvgtrSEmMJnnVb6SNxTxWB_JwINBULq8LAU4CV0YthgCVggkRzdof1LiQhZ0mpoB_nviHxF0WYGA"
                    />
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-secondary font-bold uppercase">Soft Bloom</span>
                    <p className="font-headline-sm text-headline-sm text-on-surface">Orchid Kiss</p>
                  </div>
                </div>

                <div
                  onClick={() => {
                    const prod = products.find((p) => p.name.includes('Lipstick'));
                    if (prod) openWhatsAppDrawer(prod);
                  }}
                  className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
                >
                  <div className="w-full aspect-square rounded-full bg-[#f3ecff] flex items-center justify-center mb-space-sm overflow-hidden relative">
                    <img
                      alt="Velvet Lipstick"
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7HObGtJonnmudX0CkI4vONnzo2RQ_uE4kH99S47Umd85pFgNpMkOIAw2mM8pWX_qaASkNsLZIDcLETWx_L47urvoC3Wpz1faaJFS1dOQLqqlNF2A_D1Ok-M5qwqj7MKUwouhHL8fN4wGD08SzMkfp7RoZg5Od5FcUcQmeRIukAhrdabsUgVH_US25vEHT9mqkdHTykoTffI9RkB7e2_Pz6HxM2tv7n1WqBBFbFbNSzWOnVX-FssHNqg"
                    />
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface">Velvet Berry Muse</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Clean, transfer-resistant comfort</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: WHY SHOP WITH US (4 Features) */}
      <section className="w-full max-w-[1440px] mx-auto px-margin sm:px-gutter-lg lg:px-margin-lg py-space-xl">
        <div className="text-center max-w-xl mx-auto mb-space-xl">
          <span className="font-label-md text-label-md text-primary tracking-widest uppercase font-semibold">
            The Violet Muse Standard
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-xs">
            Why Shop With Us
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
            Thoughtfully engineered from formula testing to international delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-lg">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center text-primary mb-space-md">
              <span className="material-symbols-outlined text-[28px]">verified</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
              Carefully Selected Beauty Essentials
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Strict clean cosmetics curation ensuring high pigment density, safe ingredients, and cruelty-free ethics.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center text-primary mb-space-md">
              <span className="material-symbols-outlined text-[28px]">info</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
              Clear Product Information
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Detailed ingredient transparency, formula specifications, true-to-tone swatches, and application guidance.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full bg-[#dcf8c6] flex items-center justify-center text-[#25D366] mb-space-md">
              <span className="material-symbols-outlined text-[28px]">chat</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
              Easy WhatsApp Ordering
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Instant 1-click cart assembly and prefilled order messages that bypass complicated online checkouts.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-center text-center p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center text-primary mb-space-md">
              <span className="material-symbols-outlined text-[28px]">support_agent</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
              Personal Ordering Assistance
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Speak with our licensed shade advisors in real-time to confirm skin undertones before your shipment ships.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: BEAUTY INSPIRATION & SHADE PAIRINGS */}
      <section className="w-full max-w-[1440px] mx-auto px-margin sm:px-gutter-lg lg:px-margin-lg py-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
          <div>
            <span className="font-label-md text-label-md text-primary tracking-widest uppercase font-semibold">
              Editorial Gallery
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-xs">
              Beauty Inspiration & Looks
            </h2>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mt-2 md:mt-0">
            Curated cosmetic pairings styled by our runway makeup directors.
          </p>
        </div>

        {/* Lookbook Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-lg">
          {/* Look 1 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-md">
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-surface-container-high">
              <img
                alt="Luminous Satin Look"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeq6Z_PJbSLoy6XkYPl7UN0K7WoSDGXcbGAQ_zdROFnb21o40B4FDX2Yimq0lLsfg6IAxiO18j7zSrnWmf2tZ2uzCpZMvugCOjT891JKpHALaWYKpQSGmy8MIEdHG2V7xjbx0_tepg8tGcWFmWT5AA2__SB4U7o_wHdOY-Jy2C9-7oDgj4X0OH9P-I5Va-UsqkIVk_qPQd0x9DYYICZtE1VgxQNaDQ3x9cS75tWW-6Wjlz218nSqo2UQ"
              />
              <span className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm px-2.5 py-1 rounded text-on-surface font-label-sm text-label-sm font-semibold">
                Look 01: Soft Radiance
              </span>
            </div>
            <div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface">The Luminous Dewy Base</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Built using Radiant Liquid Foundation layered with Soft Glow Blush in Peach Orchid.
              </p>
            </div>
            <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-primary font-semibold">
                2-Piece Ensemble · $44.00
              </span>
              <button
                className="text-[#25D366] hover:text-[#20ba5a] flex items-center gap-1 font-label-sm text-label-sm cursor-pointer font-bold"
                onClick={() =>
                  handleLookPairOrder(
                    'Luminous Dewy Base Look',
                    'Radiant Liquid Foundation + Soft Glow Blush',
                    '$44.00'
                  )
                }
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>Get Pair</span>
              </button>
            </div>
          </div>

          {/* Look 2 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-md">
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#f3ecff] flex items-center justify-center">
              <img
                alt="Violet Smoke Eye Look"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVLHPyyJ_sfkaXAJh5viVqLA40iThtv-uZNfhDufFuSNt5ME5rOvMRcz7srmFH01xZ1cVd7TYgn4B0Prq3cBk_CTmnRSr2aHsMyCTSG7wd2bTs7qN_EgzPboXQ9lWORF-_txJHjweQxJoMxNrJdfCUwkfm8J8DopdHqVZJlQ9HObHvnY9vOdYEmSgu9ErSuLUzzHgJeEu4aPTfqQYpzn59PuM3nCc0jaIUomDkPoUOMlLEOgMsCPFVdQ"
              />
              <span className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm px-2.5 py-1 rounded text-on-surface font-label-sm text-label-sm font-semibold">
                Look 02: Sculpted Eye
              </span>
            </div>
            <div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface">Smoky Neutral Plum Contour</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Nude Edit Eyeshadow blended with Volume Lift Mascara for feathered lash intensity.
              </p>
            </div>
            <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-primary font-semibold">
                2-Piece Ensemble · $46.00
              </span>
              <button
                className="text-[#25D366] hover:text-[#20ba5a] flex items-center gap-1 font-label-sm text-label-sm cursor-pointer font-bold"
                onClick={() =>
                  handleLookPairOrder(
                    'Smoky Neutral Plum Contour Eye',
                    'Nude Edit Eyeshadow Palette + Volume Lift Mascara',
                    '$46.00'
                  )
                }
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>Get Pair</span>
              </button>
            </div>
          </div>

          {/* Look 3 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-md">
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#f3ecff] flex items-center justify-center">
              <img
                alt="Petal Velvet Lip Look"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7HObGtJonnmudX0CkI4vONnzo2RQ_uE4kH99S47Umd85pFgNpMkOIAw2mM8pWX_qaASkNsLZIDcLETWx_L47urvoC3Wpz1faaJFS1dOQLqqlNF2A_D1Ok-M5qwqj7MKUwouhHL8fN4wGD08SzMkfp7RoZg5Od5FcUcQmeRIukAhrdabsUgVH_US25vEHT9mqkdHTykoTffI9RkB7e2_Pz6HxM2tv7n1WqBBFbFbNSzWOnVX-FssHNqg"
              />
              <span className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm px-2.5 py-1 rounded text-on-surface font-label-sm text-label-sm font-semibold">
                Look 03: Velvet Statement
              </span>
            </div>
            <div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface">The Signature Violet Muse Lip</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Single stroke Velvet Matte Lipstick paired with Silk Finish Concealer for sharp boundary precision.
              </p>
            </div>
            <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-primary font-semibold">
                2-Piece Ensemble · $38.00
              </span>
              <button
                className="text-[#25D366] hover:text-[#20ba5a] flex items-center gap-1 font-label-sm text-label-sm cursor-pointer font-bold"
                onClick={() =>
                  handleLookPairOrder(
                    'Signature Violet Muse Lip',
                    'Velvet Matte Lipstick + Silk Finish Concealer',
                    '$38.00'
                  )
                }
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>Get Pair</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: NEWSLETTER / VIOLET MUSE CLUB */}
      <section className="w-full max-w-[1440px] mx-auto px-margin sm:px-gutter-lg lg:px-margin-lg py-space-xl">
        <div className="w-full bg-gradient-to-r from-surface-container-high via-surface-container-low to-surface-container rounded-2xl p-space-lg sm:p-space-xl text-center relative overflow-hidden shadow-sm">
          <div className="max-w-2xl mx-auto space-y-space-md z-10 relative">
            <span className="material-symbols-outlined text-primary text-[36px]">
              mark_email_read
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Join the Violet Muse Club
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Receive seasonal private sales, invitations to WhatsApp preview drops, and curated formula notes directly to your inbox.
            </p>
            <form
              className="flex flex-col sm:flex-row items-center gap-space-xs max-w-md mx-auto pt-space-xs"
              onSubmit={handleNewsletterSubmit}
            >
              <input
                className="w-full sm:flex-1 h-12 px-space-md rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary text-body-md font-body-md shadow-sm"
                placeholder="Enter your email address"
                required
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
              />
              <button
                className="w-full sm:w-auto h-12 px-space-lg rounded-lg bg-primary text-on-primary font-label-lg text-label-lg hover:bg-on-tertiary-fixed-variant transition-colors whitespace-nowrap shadow-sm cursor-pointer font-semibold"
                type="submit"
              >
                Get Beauty Updates
              </button>
            </form>
            {newsletterSubscribed && (
              <p className="text-primary font-label-sm text-label-sm pt-2 font-semibold animate-fadeIn">
                Thank you for joining our beauty circle!
              </p>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 8: FINAL CALL TO ACTION */}
      <section className="w-full max-w-[1440px] mx-auto px-margin sm:px-gutter-lg lg:px-margin-lg py-space-xl text-center">
        <div className="max-w-2xl mx-auto space-y-space-md">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold">
            Uncompromising Luxury Formulations
          </span>
          <h2 className="font-headline-xl text-headline-xl text-on-surface">
            Ready to Find Your Next Favourite?
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Explore the collection and find beauty essentials that suit your style. Our beauty concierges are on standby 24/7.
          </p>
          <div className="pt-space-sm flex flex-wrap justify-center items-center gap-space-md">
            <button
              onClick={() => {
                setSelectedCategoryFilter('all');
                setCurrentView('shop');
              }}
              className="h-12 px-space-xl rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg hover:bg-on-tertiary-fixed-variant transition-colors flex items-center justify-center gap-space-xs shadow-md cursor-pointer font-semibold"
            >
              <span>Shop All Products</span>
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
            </button>
            <a
              className="h-12 px-space-lg rounded-lg bg-[#25D366] text-white hover:bg-[#20ba5a] font-label-lg text-label-lg transition-colors flex items-center justify-center gap-space-xs shadow-[0_4px_16px_rgba(37,211,102,0.25)] font-semibold"
              href={`https://wa.me/${cleanPhone || '18005550199'}?text=${encodeURIComponent(
                'Hello! I would like to consult with a Violet Muse beauty advisor.'
              )}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[18px]">forum</span>
              <span>Chat with Beauty Concierge</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
