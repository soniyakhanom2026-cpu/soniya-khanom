import React, { useState } from 'react';
import { useStore, ViewType } from '../context/StoreContext';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    wishlist,
    setWishlistDrawerOpen,
    setSearchModalOpen,
    config,
    setSelectedCategoryFilter,
    isAuthenticated,
    adminUser,
    setAuthModalOpen,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; view: ViewType }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Shop', view: 'shop' },
    { label: 'Categories', view: 'categories' },
    { label: 'Best Sellers', view: 'best-sellers' },
    { label: 'Admin', view: 'admin' },
  ];

  const handleNavClick = (view: ViewType) => {
    if (view === 'shop') {
      setSelectedCategoryFilter('all');
    }
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  const cleanPhone = config.whatsAppNumber.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanPhone || '18005550199'}?text=${encodeURIComponent(
    'Hello Violet Muse! I have a question about your luxury formulations and shade advisory.'
  )}`;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top Banner */}
      <div className="w-full bg-primary py-space-xs px-margin-sm text-center">
        <p className="font-label-sm text-label-sm text-on-primary tracking-wider uppercase">
          {config.announcementText || 'Discover your next beauty essential'}
        </p>
      </div>

      {/* Main Header */}
      <header className="w-full bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(53,20,94,0.04)]">
        <div className="h-20 max-w-[1440px] mx-auto px-margin lg:px-margin-lg flex items-center justify-between gap-space-lg">
          {/* Logo & Brand */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-space-md cursor-pointer select-none"
          >
            <img
              alt="Violet Muse Beauty Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1W_6EIX575eq9yAVcY50xeg3Spg2P8du1QdDqrkOwcmU5qrZJiHIUNKxjEOqmfyub4YS_Ayb6lFHmWbRBClWIfLjyGprN_w9Y6PIjdDadijFyP4IiTW3826KDB7hcLryJXYN0EYMjf2J9L3Tf-9ppN8WojTUpYW1Svtpsx2U70aPhmA0d52csYnV_1WYqLDBZeYzMxoQCptw675Fl0keXuNPFUx47CLCJiJrXotqG_yyjFgbXxWiyiCHqE"
            />
            <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">
              {config.storeName || 'Violet Muse'}
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-space-lg h-full">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  className={`py-2 transition-colors font-label-lg text-label-lg relative cursor-pointer ${
                    isActive
                      ? 'text-primary font-semibold border-b-2 border-primary'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {item.label}
                  {item.view === 'admin' && (
                    <span className="ml-1.5 px-1.5 py-0.2 bg-surface-container-high text-primary text-[10px] rounded-full font-bold uppercase">
                      Portal
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-space-sm">
            {/* Search */}
            <button
              aria-label="Search catalog"
              onClick={() => setSearchModalOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>

            {/* Wishlist */}
            <button
              aria-label="Wishlist"
              onClick={() => setWishlistDrawerOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors relative cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">favorite</span>
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* WhatsApp direct order shortcut */}
            <a
              className="hidden sm:inline-flex items-center gap-space-xs bg-tertiary-container text-on-tertiary px-space-md py-space-sm rounded-lg shadow-[0_4px_16px_-2px_rgba(103,51,208,0.25)] hover:bg-tertiary hover:text-on-tertiary transition-all"
              href={waUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span className="font-label-sm text-label-sm">WhatsApp</span>
            </a>

            {/* Profile / Admin fast toggle */}
            <div className="relative">
              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    setAuthModalOpen(true);
                  } else {
                    handleNavClick(currentView === 'admin' ? 'home' : 'admin');
                  }
                }}
                title={
                  isAuthenticated
                    ? currentView === 'admin'
                      ? 'Return to Storefront'
                      : `Signed in as ${adminUser?.name} — Open Admin Dashboard`
                    : 'Admin Sign In'
                }
                className="w-8 h-8 rounded-full bg-primary hover:bg-primary-container flex items-center justify-center transition-all cursor-pointer shadow-sm relative"
              >
                <span className="material-symbols-outlined text-on-primary text-[18px]">
                  {currentView === 'admin' ? 'storefront' : isAuthenticated ? 'verified_user' : 'person'}
                </span>
                {isAuthenticated && (
                  <span
                    className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white"
                    title="Authenticated"
                  />
                )}
              </button>
            </div>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-high cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-surface-container-lowest border-t border-outline-variant/30 px-space-md py-space-md shadow-lg animate-fadeIn">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  className={`text-left px-space-md py-2.5 rounded-lg font-label-md text-label-md transition-all ${
                    currentView === item.view
                      ? 'bg-primary text-white font-semibold'
                      : 'text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t border-outline-variant/20">
                <a
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-lg font-label-md text-label-md font-semibold"
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};
