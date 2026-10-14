import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, OrderInquiry, StoreConfig } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_CONFIG } from '../data/initialData';

export type ViewType = 'home' | 'shop' | 'categories' | 'best-sellers' | 'admin';

interface WhatsAppDrawerState {
  isOpen: boolean;
  product: Product | null;
  selectedShade: string;
  quantity: number;
  notes: string;
}

interface QuickViewState {
  isOpen: boolean;
  product: Product | null;
  selectedShade: string;
}

interface ProductDetailModalState {
  isOpen: boolean;
  product: Product | null;
}

interface StoreContextType {
  products: Product[];
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (cat: string) => void;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  wishlistDrawerOpen: boolean;
  setWishlistDrawerOpen: (open: boolean) => void;
  
  // WhatsApp Drawer
  whatsAppDrawer: WhatsAppDrawerState;
  openWhatsAppDrawer: (product: Product, shade?: string) => void;
  closeWhatsAppDrawer: () => void;
  setDrawerQuantity: (delta: number) => void;
  setDrawerNotes: (notes: string) => void;
  setDrawerShade: (shade: string) => void;
  getWhatsAppUrl: () => string;
  getWhatsAppMessage: () => string;
  
  // Modals
  quickView: QuickViewState;
  openQuickView: (product: Product, shade?: string) => void;
  closeQuickView: () => void;
  
  productDetailModal: ProductDetailModalState;
  openProductDetailModal: (product: Product) => void;
  closeProductDetailModal: () => void;

  searchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;
  
  // Admin Auth & Management
  isAuthenticated: boolean;
  adminUser: { email: string; name: string; role: string } | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;

  orders: OrderInquiry[];
  updateOrderStatus: (id: string, status: OrderInquiry['status']) => void;
  deleteOrder: (id: string) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductStock: (id: string) => void;
  resetDefaultCatalog: () => void;

  // Store Configuration
  config: StoreConfig;
  updateConfig: (newConfig: Partial<StoreConfig>) => void;

  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'violet_muse_products_v1',
  WISHLIST: 'violet_muse_wishlist_v1',
  ORDERS: 'violet_muse_orders_v1',
  CONFIG: 'violet_muse_config_v1',
  AUTH: 'violet_muse_admin_auth_v1',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<OrderInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [config, setConfig] = useState<StoreConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
      return saved ? JSON.parse(saved) : INITIAL_CONFIG;
    } catch {
      return INITIAL_CONFIG;
    }
  });

  const [adminUser, setAdminUser] = useState<{ email: string; name: string; role: string } | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUTH);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = !!adminUser;
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const [currentView, setCurrentViewState] = useState<ViewType>('home');

  const setCurrentView = (view: ViewType) => {
    if (view === 'admin' && !isAuthenticated) {
      setAuthModalOpen(true);
      showToast('Please sign in to access the Admin Dashboard');
      return;
    }
    setCurrentViewState(view);
  };

  const login = (email: string, pass: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    // Default valid check or demo admin
    if (
      (cleanEmail === 'admin@violetmuse.com' && pass === 'admin123') ||
      (cleanEmail.length > 3 && pass.length >= 4)
    ) {
      const user = {
        email: cleanEmail,
        name: cleanEmail.split('@')[0].toUpperCase(),
        role: 'Atelier Director',
      };
      setAdminUser(user);
      try {
        localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(user));
      } catch {}
      setAuthModalOpen(false);
      setCurrentViewState('admin');
      showToast(`Welcome back, ${user.name}!`);
      return true;
    } else {
      showToast('Invalid credentials. Use admin@violetmuse.com / admin123');
      return false;
    }
  };

  const logout = () => {
    setAdminUser(null);
    try {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    } catch {}
    if (currentView === 'admin') {
      setCurrentViewState('home');
    }
    showToast('Signed out of Admin Dashboard');
  };

  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [wishlistDrawerOpen, setWishlistDrawerOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // WhatsApp Drawer state
  const [whatsAppDrawer, setWhatsAppDrawer] = useState<WhatsAppDrawerState>({
    isOpen: false,
    product: null,
    selectedShade: '',
    quantity: 1,
    notes: '',
  });

  // Quick View modal state
  const [quickView, setQuickView] = useState<QuickViewState>({
    isOpen: false,
    product: null,
    selectedShade: '',
  });

  // Product Detail modal state
  const [productDetailModal, setProductDetailModal] = useState<ProductDetailModalState>({
    isOpen: false,
    product: null,
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
    } catch {}
  }, [config]);

  // Window scroll to top when changing views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Saved Beauty Bag');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Beauty Bag');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const openWhatsAppDrawer = (product: Product, shade?: string) => {
    const activeShade = shade || product.shades[0]?.name || 'Standard';
    setWhatsAppDrawer({
      isOpen: true,
      product,
      selectedShade: activeShade,
      quantity: 1,
      notes: '',
    });
  };

  const closeWhatsAppDrawer = () => {
    setWhatsAppDrawer((prev) => ({ ...prev, isOpen: false }));
  };

  const setDrawerQuantity = (delta: number) => {
    setWhatsAppDrawer((prev) => {
      let nextQty = prev.quantity + delta;
      if (nextQty < 1) nextQty = 1;
      if (nextQty > 10) nextQty = 10;
      return { ...prev, quantity: nextQty };
    });
  };

  const setDrawerNotes = (notes: string) => {
    setWhatsAppDrawer((prev) => ({ ...prev, notes }));
  };

  const setDrawerShade = (shade: string) => {
    setWhatsAppDrawer((prev) => ({ ...prev, selectedShade: shade }));
  };

  const getWhatsAppMessage = (): string => {
    const { product, selectedShade, quantity, notes } = whatsAppDrawer;
    if (!product) return '';
    const total = (product.price * quantity).toFixed(2);

    let msg = `Hello Violet Muse Atelier! ✨\n\nI would like to order:\n• Product: ${product.name}\n• Shade: ${selectedShade}\n• Quantity: ${quantity}\n• Est. Total: $${total} USD\n• Ref: ${product.sku}`;
    if (notes.trim()) {
      msg += `\n• Notes: ${notes.trim()}`;
    }
    msg += `\n\nPlease confirm product availability and international shipping timeline.`;
    return msg;
  };

  const getWhatsAppUrl = (): string => {
    const msg = getWhatsAppMessage();
    const encoded = encodeURIComponent(msg);
    const phone = config.whatsAppNumber.replace(/[^0-9]/g, '');
    return `https://wa.me/${phone || '18005550199'}?text=${encoded}`;
  };

  // Quick View
  const openQuickView = (product: Product, shade?: string) => {
    setQuickView({
      isOpen: true,
      product,
      selectedShade: shade || product.shades[0]?.name || 'Default',
    });
  };

  const closeQuickView = () => {
    setQuickView((prev) => ({ ...prev, isOpen: false }));
  };

  // Product detail modal
  const openProductDetailModal = (product: Product) => {
    setProductDetailModal({
      isOpen: true,
      product,
    });
  };

  const closeProductDetailModal = () => {
    setProductDetailModal({
      isOpen: false,
      product: null,
    });
  };

  // Admin Actions
  const updateOrderStatus = (id: string, status: OrderInquiry['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === id ? { ...ord, status } : ord))
    );
    showToast(`Order ${id} status updated to ${status}`);
  };

  const deleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((ord) => ord.id !== id));
    showToast(`Order ${id} deleted`);
  };

  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`;
    const product: Product = { ...newProd, id };
    setProducts((prev) => [product, ...prev]);
    showToast(`Product "${product.name}" added to catalog!`);
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    showToast('Product updated successfully!');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog');
  };

  const toggleProductStock = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newInStock = !p.inStock;
          return {
            ...p,
            inStock: newInStock,
            stockStatus: newInStock ? 'In Stock' : 'Out of Stock',
          };
        }
        return p;
      })
    );
    showToast('Product stock status toggled');
  };

  const resetDefaultCatalog = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setConfig(INITIAL_CONFIG);
    showToast('Reset catalog & store config to initial defaults');
  };

  const updateConfig = (newConfig: Partial<StoreConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
    showToast('Store configuration saved');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        currentView,
        setCurrentView,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        wishlist,
        toggleWishlist,
        isWishlisted,
        wishlistDrawerOpen,
        setWishlistDrawerOpen,
        whatsAppDrawer,
        openWhatsAppDrawer,
        closeWhatsAppDrawer,
        setDrawerQuantity,
        setDrawerNotes,
        setDrawerShade,
        getWhatsAppUrl,
        getWhatsAppMessage,
        quickView,
        openQuickView,
        closeQuickView,
        productDetailModal,
        openProductDetailModal,
        closeProductDetailModal,
        searchModalOpen,
        setSearchModalOpen,
        isAuthenticated,
        adminUser,
        login,
        logout,
        authModalOpen,
        setAuthModalOpen,
        orders,
        updateOrderStatus,
        deleteOrder,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStock,
        resetDefaultCatalog,
        config,
        updateConfig,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
