import React from 'react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategoryFilter, setWishlistDrawerOpen, config } = useStore();

  const cleanPhone = config.whatsAppNumber.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanPhone || '18005550199'}?text=${encodeURIComponent(
    'Hello! I would like to consult with a Violet Muse beauty advisor regarding order assistance and shade matching.'
  )}`;

  return (
    <footer className="w-full bg-surface-container-lowest shadow-[0_-4px_24px_rgba(53,20,94,0.03)] mt-space-xl">
      <div className="max-w-[1440px] mx-auto px-margin lg:px-margin-lg py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter-lg pb-space-xl">
          {/* Brand Column */}
          <div className="space-y-space-sm">
            <div
              onClick={() => setCurrentView('home')}
              className="flex items-center gap-space-xs cursor-pointer select-none"
            >
              <img
                alt="Violet Muse Beauty Logo"
                className="h-6 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1W_6EIX575eq9yAVcY50xeg3Spg2P8du1QdDqrkOwcmU5qrZJiHIUNKxjEOqmfyub4YS_Ayb6lFHmWbRBClWIfLjyGprN_w9Y6PIjdDadijFyP4IiTW3826KDB7hcLryJXYN0EYMjf2J9L3Tf-9ppN8WojTUpYW1Svtpsx2U70aPhmA0d52csYnV_1WYqLDBZeYzMxoQCptw675Fl0keXuNPFUx47CLCJiJrXotqG_yyjFgbXxWiyiCHqE"
              />
              <span className="font-headline-sm text-headline-sm text-primary font-bold">
                {config.storeName || 'Violet Muse'}
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Haute-couture cosmetic retail engineered for effortless discovery and seamless conversational checkout worldwide.
            </p>
          </div>

          {/* Collections Column */}
          <div className="space-y-space-sm">
            <h3 className="font-label-lg text-label-lg text-on-surface uppercase tracking-wider font-semibold">
              Collections
            </h3>
            <ul className="space-y-space-xs">
              <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
                <button
                  onClick={() => {
                    setSelectedCategoryFilter('face');
                    setCurrentView('shop');
                  }}
                  className="cursor-pointer"
                >
                  Complexion & Base
                </button>
              </li>
              <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
                <button
                  onClick={() => {
                    setSelectedCategoryFilter('lips');
                    setCurrentView('shop');
                  }}
                  className="cursor-pointer"
                >
                  Lip Atelier
                </button>
              </li>
              <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
                <button
                  onClick={() => {
                    setSelectedCategoryFilter('cheeks');
                    setCurrentView('shop');
                  }}
                  className="cursor-pointer"
                >
                  Pigment Radiance
                </button>
              </li>
              <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
                <button
                  onClick={() => setCurrentView('categories')}
                  className="cursor-pointer"
                >
                  Skincare Alchemy
                </button>
              </li>
            </ul>
          </div>

          {/* Experience Column */}
          <div className="space-y-space-sm">
            <h3 className="font-label-lg text-label-lg text-on-surface uppercase tracking-wider font-semibold">
              Experience
            </h3>
            <ul className="space-y-space-xs">
              <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
                <button onClick={() => setCurrentView('best-sellers')} className="cursor-pointer">
                  Curated Best Sellers
                </button>
              </li>
              <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
                <button onClick={() => setWishlistDrawerOpen(true)} className="cursor-pointer">
                  Saved Beauty Bag
                </button>
              </li>
              <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
                <button onClick={() => setCurrentView('admin')} className="cursor-pointer">
                  Store Operations
                </button>
              </li>
            </ul>
          </div>

          {/* WhatsApp Concierge */}
          <div className="space-y-space-sm">
            <h3 className="font-label-lg text-label-lg text-on-surface uppercase tracking-wider font-semibold">
              WhatsApp Concierge
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Consult our bespoke beauty advisors, verify international shades, and finalize express checkouts direct in chat.
            </p>
            <a
              className="inline-flex items-center gap-space-xs bg-surface-container-high text-primary px-space-md py-space-sm rounded-lg hover:bg-primary-container hover:text-white transition-all shadow-sm"
              href={waUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[18px]">forum</span>
              <span className="font-label-sm text-label-sm">Order Assistance</span>
            </a>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md border-t border-outline-variant/30">
          <p className="font-body-sm text-body-sm text-outline">
            © 2025 Violet Muse Beauty Atelier. All rights reserved.
          </p>
          <p className="font-label-sm text-label-sm text-outline-variant">
            Global Editorial Formulation & WhatsApp Commerce
          </p>
        </div>
      </div>
    </footer>
  );
};
