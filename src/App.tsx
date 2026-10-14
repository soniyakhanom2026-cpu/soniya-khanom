import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ShopView } from './components/ShopView';
import { CategoriesView } from './components/CategoriesView';
import { BestSellersView } from './components/BestSellersView';
import { AdminDashboard } from './components/AdminDashboard';
import { WhatsAppDrawer } from './components/WhatsAppDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminAuthModal } from './components/AdminAuthModal';

const MainContent: React.FC = () => {
  const { currentView, toastMessage } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Header />

      <main className="w-full pt-[112px] bg-surface flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'shop' && <ShopView />}
        {currentView === 'categories' && <CategoriesView />}
        {currentView === 'best-sellers' && <BestSellersView />}
        {currentView === 'admin' && <AdminDashboard />}
      </main>

      <Footer />

      {/* Overlays & Drawers */}
      <WhatsAppDrawer />
      <QuickViewModal />
      <ProductDetailModal />
      <WishlistDrawer />
      <SearchModal />
      <FloatingWhatsApp />
      <AdminAuthModal />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 font-label-md text-label-md animate-bounce">
          <span className="material-symbols-outlined text-[18px] text-emerald-400">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
