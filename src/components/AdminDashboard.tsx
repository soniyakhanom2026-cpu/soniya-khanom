import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, OrderInquiry } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    orders,
    config,
    updateConfig,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductStock,
    updateOrderStatus,
    deleteOrder,
    resetDefaultCatalog,
    setCurrentView,
    showToast,
    isAuthenticated,
    adminUser,
    logout,
    setAuthModalOpen,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'settings'>('overview');
  const [productSearch, setProductSearch] = useState('');
  const [selectedCatFilter, setSelectedCatFilter] = useState('all');

  // Modal states for Product Add / Edit
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states for Add / Edit
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<'lips' | 'face' | 'eyes' | 'cheeks'>('lips');
  const [formPrice, setFormPrice] = useState(18.0);
  const [formFinish, setFormFinish] = useState('Matte');
  const [formTag, setFormTag] = useState<'Best Seller' | 'New Shade' | 'Clean Beauty' | 'Award Winner' | 'Trending' | 'Staff Pick' | 'New Release' | 'Editorial Pick'>('Best Seller');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formShadesStr, setFormShadesStr] = useState('Rose Velvet:#9b3a54, Plum Noir:#5c1c38');

  // Store settings form state
  const [settingsPhone, setSettingsPhone] = useState(config.whatsAppNumber);
  const [settingsBanner, setSettingsBanner] = useState(config.announcementText);
  const [settingsStoreName, setSettingsStoreName] = useState(config.storeName);
  const [settingsCurrency, setSettingsCurrency] = useState(config.currency);

  // Analytics Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const outOfStockCount = products.filter((p) => !p.inStock).length;
  const pendingInquiriesCount = orders.filter((o) => o.status === 'New Inquiry').length;

  const handleOpenAddModal = () => {
    setFormName('');
    setFormCategory('lips');
    setFormPrice(18.0);
    setFormFinish('Matte');
    setFormTag('New Shade');
    setFormSubtitle('Velvet Finish');
    setFormDesc('Weightless clean formulation engineered for smooth application.');
    setFormImage('https://lh3.googleusercontent.com/aida-public/AB6AXuC7HObGtJonnmudX0CkI4vONnzo2RQ_uE4kH99S47Umd85pFgNpMkOIAw2mM8pWX_qaASkNsLZIDcLETWx_L47urvoC3Wpz1faaJFS1dOQLqqlNF2A_D1Ok-M5qwqj7MKUwouhHL8fN4wGD08SzMkfp7RoZg5Od5FcUcQmeRIukAhrdabsUgVH_US25vEHT9mqkdHTykoTffI9RkB7e2_Pz6HxM2tv7n1WqBBFbFbNSzWOnVX-FssHNqg');
    setFormSku(`VM-NEW-${Math.floor(100 + Math.random() * 900)}`);
    setFormShadesStr('Rose Velvet:#9b3a54, Plum Noir:#5c1c38');
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormName(product.name);
    setFormCategory(product.category);
    setFormPrice(product.price);
    setFormFinish(product.finish);
    setFormTag((product.tag as any) || 'Best Seller');
    setFormSubtitle(product.subtitle || '');
    setFormDesc(product.description);
    setFormImage(product.image);
    setFormSku(product.sku);
    setFormShadesStr(product.shades.map((s) => `${s.name}:${s.hex}`).join(', '));
  };

  const parseShades = (str: string) => {
    return str
      .split(',')
      .map((item) => {
        const [name, hex] = item.split(':').map((s) => s.trim());
        return { name: name || 'Shade', hex: hex || '#9b3a54' };
      })
      .filter((s) => s.name);
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const shades = parseShades(formShadesStr);
    const catLabels = {
      lips: 'Lipstick & Lips',
      face: 'Foundation',
      cheeks: 'Blush & Glow',
      eyes: 'Eye Palette',
    };

    addProduct({
      name: formName,
      slug: formName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category: formCategory,
      categoryLabel: catLabels[formCategory],
      price: Number(formPrice),
      rating: 4.9,
      reviewCount: 1,
      finish: formFinish.toLowerCase(),
      finishLabel: `${formFinish} Finish • ${shades.length} Shades`,
      tag: formTag,
      tagColor: 'bg-primary text-on-primary',
      subtitle: formSubtitle || 'Atelier Exclusive',
      description: formDesc,
      image: formImage,
      sku: formSku,
      inStock: true,
      stockStatus: 'In Stock',
      shades: shades.length > 0 ? shades : [{ name: 'Default', hex: '#9b3a54' }],
    });

    setIsAddModalOpen(false);
    showToast(`Formulation "${formName}" added successfully.`);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    const shades = parseShades(formShadesStr);
    const catLabels = {
      lips: 'Lipstick & Lips',
      face: 'Foundation',
      cheeks: 'Blush & Glow',
      eyes: 'Eye Palette',
    };

    updateProduct(editingProduct.id, {
      name: formName,
      category: formCategory,
      categoryLabel: catLabels[formCategory],
      price: Number(formPrice),
      finish: formFinish.toLowerCase(),
      finishLabel: `${formFinish} Finish • ${shades.length} Shades`,
      tag: formTag,
      subtitle: formSubtitle,
      description: formDesc,
      image: formImage,
      sku: formSku,
      shades: shades.length > 0 ? shades : editingProduct.shades,
    });

    setEditingProduct(null);
    showToast(`Formulation "${formName}" updated.`);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      whatsAppNumber: settingsPhone.trim(),
      announcementText: settingsBanner.trim(),
      storeName: settingsStoreName.trim(),
      currency: settingsCurrency.trim(),
    });
    showToast('Atelier WhatsApp and store settings saved.');
  };

  const adminFilteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      prod.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
      prod.description.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCat = selectedCatFilter === 'all' || prod.category === selectedCatFilter;
    return matchesSearch && matchesCat;
  });

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-220px)] px-4 py-space-xl text-center">
        <div className="bg-white max-w-md w-full p-8 rounded-3xl shadow-sm border border-[#eddcf6] space-y-5 animate-scaleUp">
          <div className="w-16 h-16 rounded-2xl bg-[#faf0ff] text-primary flex items-center justify-center mx-auto shadow-inner">
            <span className="material-symbols-outlined text-[32px]">admin_panel_settings</span>
          </div>
          <div className="space-y-1.5">
            <span className="text-xs uppercase tracking-widest font-bold text-primary">
              Management Portal
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
              Atelier Operations Access
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              The Violet Muse Operations Dashboard is restricted to authenticated managers. Please sign in to manage inventory, catalog, and WhatsApp consultations.
            </p>
          </div>

          <div className="pt-2 space-y-3">
            <button
              onClick={() => setAuthModalOpen(true)}
              className="w-full h-12 rounded-xl bg-primary hover:bg-primary-container text-white font-label-md text-label-md font-semibold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">lock_open</span>
              <span>Sign In to Admin Portal</span>
            </button>
            <button
              onClick={() => setCurrentView('home')}
              className="w-full py-2 text-center text-outline hover:text-primary font-label-sm text-label-sm cursor-pointer transition-colors"
            >
              Return to Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-180px)] bg-surface py-6 sm:py-8">
      <div className="max-w-[1440px] w-full mx-auto px-margin-sm sm:px-margin lg:px-margin-lg space-y-6">
        
        {/* Top Operational Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-3xl p-6 shadow-sm border border-[#eddcf6]">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-primary to-primary-container text-white flex items-center justify-center shrink-0 shadow-md">
              <span className="material-symbols-outlined text-[26px]">admin_panel_settings</span>
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Violet Muse Atelier Operations
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live Gateway
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Manager: <span className="font-semibold text-primary">{adminUser?.name}</span> ({adminUser?.email}) · <span className="text-secondary font-medium">{adminUser?.role}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setCurrentView('home')}
              className="px-4 h-10 rounded-xl bg-[#faf0ff] hover:bg-[#f3e6fd] text-primary font-label-sm text-label-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-[#eddcf6]"
            >
              <span className="material-symbols-outlined text-[18px]">storefront</span>
              <span>View Storefront</span>
            </button>
            <button
              onClick={handleOpenAddModal}
              className="px-4 h-10 rounded-xl bg-primary hover:bg-primary-container text-white font-label-sm text-label-sm font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>New Formulation</span>
            </button>
            <button
              onClick={logout}
              className="px-3.5 h-10 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-label-sm text-label-sm font-semibold flex items-center gap-1 transition-colors cursor-pointer border border-rose-200/40"
              title="Sign Out"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Elegant Segmented Tab Controls (Consistent with Atelier Luxury aesthetic) */}
        <div className="p-1.5 bg-[#faf0ff] rounded-2xl flex items-center gap-1 overflow-x-auto border border-[#eddcf6]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-2.5 rounded-xl font-label-md text-label-md font-semibold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-white text-primary shadow-sm border border-[#eddcf6]'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">dashboard</span>
            <span>Overview & KPIs</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2.5 rounded-xl font-label-md text-label-md font-semibold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'products'
                ? 'bg-white text-primary shadow-sm border border-[#eddcf6]'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">inventory_2</span>
            <span>Product Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-xl font-label-md text-label-md font-semibold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap relative ${
              activeTab === 'orders'
                ? 'bg-white text-primary shadow-sm border border-[#eddcf6]'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">mark_chat_unread</span>
            <span>WhatsApp Orders ({orders.length})</span>
            {pendingInquiriesCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-5 py-2.5 rounded-xl font-label-md text-label-md font-semibold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-white text-primary shadow-sm border border-[#eddcf6]'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
            <span>Store & WhatsApp Settings</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW & KPIS */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#eddcf6] hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span className="font-label-sm text-label-sm uppercase font-semibold text-outline">
                    Estimated Pipeline
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#faf0ff] text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">payments</span>
                  </div>
                </div>
                <p className="font-headline-lg text-headline-lg text-on-surface font-bold mt-2">
                  ${totalRevenue.toFixed(2)}
                </p>
                <p className="font-body-sm text-[12px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span>
                  <span>+18.4% from customer inquiries</span>
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#eddcf6] hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span className="font-label-sm text-label-sm uppercase font-semibold text-outline">
                    WhatsApp Inquiries
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#25D366] flex items-center justify-center border border-emerald-200/40">
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                  </div>
                </div>
                <p className="font-headline-lg text-headline-lg text-on-surface font-bold mt-2">
                  {orders.length}
                </p>
                <p className="font-body-sm text-[12px] text-primary font-semibold mt-1">
                  {pendingInquiriesCount} new consultations to answer
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#eddcf6] hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span className="font-label-sm text-label-sm uppercase font-semibold text-outline">
                    Active Catalog
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#faf0ff] text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">category</span>
                  </div>
                </div>
                <p className="font-headline-lg text-headline-lg text-on-surface font-bold mt-2">
                  {products.length} Formulations
                </p>
                <p className="font-body-sm text-[12px] text-on-surface-variant mt-1">
                  Across Lips, Face, Eyes, Cheeks
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#eddcf6] hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span className="font-label-sm text-label-sm uppercase font-semibold text-outline">
                    Inventory Status
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200/50">
                    <span className="material-symbols-outlined text-[20px]">warehouse</span>
                  </div>
                </div>
                <p className="font-headline-lg text-headline-lg text-on-surface font-bold mt-2">
                  {products.length - outOfStockCount} In Stock
                </p>
                <p className="font-body-sm text-[12px] text-outline mt-1">
                  {outOfStockCount > 0 ? `${outOfStockCount} currently unavailable` : 'Full catalog ready for order'}
                </p>
              </div>
            </div>

            {/* Recent WhatsApp Orders stream and quick actions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Recent WhatsApp Orders stream */}
              <div className="lg:col-span-8 bg-white p-6 rounded-3xl shadow-sm border border-[#eddcf6]">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      Recent WhatsApp Inquiries
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Customer orders and consultation requests generated from storefront buttons.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="font-label-sm text-label-sm text-primary hover:underline font-semibold cursor-pointer"
                  >
                    View All ({orders.length}) →
                  </button>
                </div>

                <div className="space-y-3">
                  {orders.slice(0, 4).map((ord) => (
                    <div
                      key={ord.id}
                      className="p-3.5 bg-[#faf0ff] rounded-2xl flex items-center justify-between gap-3 hover:bg-[#f6e9ff] transition-colors border border-[#eddcf6]"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary font-bold text-xs shrink-0 shadow-sm border border-[#eddcf6]">
                          {ord.customerName ? ord.customerName.charAt(0) : 'U'}
                        </div>
                        <div className="min-w-0">
                          <p className="font-label-md text-label-md text-on-surface font-bold truncate">
                            {ord.customerName || 'Anonymous Client'} · {ord.productName}
                          </p>
                          <p className="font-body-sm text-[12px] text-outline">
                            Shade: <span className="text-on-surface font-medium">{ord.shade}</span> · Qty: {ord.quantity} · {ord.createdAt}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-label-md text-label-md text-on-surface font-bold">
                          ${ord.totalPrice.toFixed(2)}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                            ord.status === 'New Inquiry'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : ord.status === 'Shipped'
                              ? 'bg-blue-50 text-blue-800 border-blue-200'
                              : ord.status === 'Confirmed'
                              ? 'bg-purple-50 text-purple-800 border-purple-200'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Quick Tools */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#eddcf6] space-y-3">
                  <h4 className="font-label-lg text-label-lg text-on-surface font-bold">
                    Quick Operations
                  </h4>
                  <button
                    onClick={handleOpenAddModal}
                    className="w-full py-2.5 px-3 rounded-xl bg-primary hover:bg-primary-container text-white font-label-md text-label-md font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    <span>Add New Cosmetic Formulation</span>
                  </button>
                  <button
                    onClick={() => {
                      const testPhone = config.whatsAppNumber.replace(/[^0-9]/g, '');
                      window.open(`https://wa.me/${testPhone}?text=Test%20Connection`, '_blank');
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#1fa851] text-white font-label-md text-label-md font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    <span>Test WhatsApp Business Link</span>
                  </button>
                  <button
                    onClick={resetDefaultCatalog}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#faf0ff] hover:bg-[#f3e6fd] text-on-surface-variant font-label-sm text-label-sm flex items-center justify-center gap-1.5 cursor-pointer transition-colors border border-[#eddcf6]"
                  >
                    <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                    <span>Reset Factory Seed Catalog</span>
                  </button>
                </div>

                <div className="bg-[#faf0ff] border border-[#eddcf6] p-5 rounded-3xl space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <span className="material-symbols-outlined text-[20px]">verified</span>
                    <span>Direct WhatsApp Checkout Ready</span>
                  </div>
                  <p className="font-body-sm text-[12px] text-on-surface-variant leading-relaxed">
                    Customer orders automatically formulate an encoded chat payload containing product name, selected shade, price, and custom delivery note.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCT CATALOG MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#eddcf6] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative flex-1 w-full sm:max-w-md">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products by name, SKU..."
                  className="w-full h-11 pl-10 pr-3 rounded-xl bg-[#faf0ff] font-body-sm text-body-sm border border-[#eddcf6] focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <select
                  value={selectedCatFilter}
                  onChange={(e) => setSelectedCatFilter(e.target.value)}
                  className="h-11 px-3.5 rounded-xl bg-[#faf0ff] font-label-sm text-label-sm text-on-surface border border-[#eddcf6] focus:outline-none focus:bg-white cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  <option value="lips">Lips</option>
                  <option value="face">Face</option>
                  <option value="eyes">Eyes</option>
                  <option value="cheeks">Cheeks</option>
                </select>
                <button
                  onClick={handleOpenAddModal}
                  className="px-4 h-11 rounded-xl bg-primary hover:bg-primary-container text-white font-label-sm text-label-sm font-semibold flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-[#eddcf6] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#faf0ff] text-outline uppercase font-label-sm text-[11px] tracking-wider border-b border-[#eddcf6]">
                      <th className="py-3.5 px-5">Product & Formulation</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Price</th>
                      <th className="py-3.5 px-4">Shades</th>
                      <th className="py-3.5 px-4">Stock Status</th>
                      <th className="py-3.5 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f3ecff] font-body-sm text-body-sm">
                    {adminFilteredProducts.map((prod) => (
                      <tr key={prod.id} className="hover:bg-[#faf0ff]/60 transition-colors">
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3.5">
                            <div className="w-13 h-13 rounded-xl bg-[#f3ecff] overflow-hidden shrink-0 shadow-inner flex items-center justify-center">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-full h-full object-cover object-center"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="font-label-md text-label-md font-bold text-on-surface truncate">
                                {prod.name}
                              </p>
                              <p className="text-[11px] text-outline font-mono">SKU: {prod.sku}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#faf0ff] text-primary font-label-sm text-[11px] font-semibold border border-[#eddcf6]">
                            {prod.categoryLabel}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-headline-sm text-sm font-bold text-on-surface">
                          ${prod.price.toFixed(2)}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5">
                            {prod.shades.map((s) => (
                              <span
                                key={s.name}
                                title={s.name}
                                className="w-4 h-4 rounded-full ring-1 ring-[#e2d0ee] inline-block shadow-sm"
                                style={{ backgroundColor: s.hex }}
                              />
                            ))}
                            <span className="text-[11px] text-outline ml-1 font-semibold">
                              ({prod.shades.length})
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => toggleProductStock(prod.id)}
                            className={`px-3 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-colors flex items-center gap-1.5 border ${
                              prod.inStock
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200/60 hover:bg-emerald-100'
                                : 'bg-rose-50 text-rose-800 border-rose-200/60 hover:bg-rose-100'
                            }`}
                            title="Click to toggle stock availability"
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                prod.inStock ? 'bg-emerald-500' : 'bg-rose-500'
                              }`}
                            />
                            <span>{prod.inStock ? 'In Stock' : 'Out of Stock'}</span>
                          </button>
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditModal(prod)}
                              className="p-2 rounded-xl text-primary hover:bg-[#faf0ff] cursor-pointer transition-colors"
                              title="Edit Product"
                            >
                              <span className="material-symbols-outlined text-[18px]">edit</span>
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete "${prod.name}"?`)) {
                                  deleteProduct(prod.id);
                                }
                              }}
                              className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                              title="Delete Product"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {adminFilteredProducts.length === 0 && (
                <div className="py-12 text-center text-outline font-body-md text-body-md">
                  No formulations found matching criteria.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS & INQUIRIES */}
        {activeTab === 'orders' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#eddcf6] flex items-center justify-between">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  All WhatsApp Orders & Consultations
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Update customer communication status, view requested custom shades, and initiate instant chat.
                </p>
              </div>
              <span className="px-3.5 py-1 bg-[#faf0ff] rounded-full font-label-sm text-label-sm text-primary font-bold border border-[#eddcf6]">
                {orders.length} Records
              </span>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-[#eddcf6] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#faf0ff] text-outline uppercase font-label-sm text-[11px] tracking-wider border-b border-[#eddcf6]">
                      <th className="py-3.5 px-5">Order ID & Date</th>
                      <th className="py-3.5 px-4">Customer Details</th>
                      <th className="py-3.5 px-4">Formulation & Shade</th>
                      <th className="py-3.5 px-4">Total</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f3ecff] font-body-sm text-body-sm">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-[#faf0ff]/60 transition-colors">
                        <td className="py-3.5 px-5 font-mono font-bold text-xs text-primary">
                          {ord.id}
                          <span className="block text-outline text-[11px] font-sans font-normal mt-0.5">
                            {ord.createdAt}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-label-md text-label-md font-semibold text-on-surface">
                            {ord.customerName || 'Inquiry Client'}
                          </p>
                          <p className="text-[12px] text-outline font-mono">
                            {ord.customerPhone || 'Direct App Trigger'}
                          </p>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-label-md text-label-md font-bold text-on-surface">
                            {ord.productName}
                          </p>
                          <p className="text-[12px] text-on-surface-variant">
                            Shade: <span className="font-semibold text-primary">{ord.shade}</span> (Qty: {ord.quantity})
                          </p>
                          {ord.notes && (
                            <p className="text-[11px] text-outline italic bg-[#faf0ff] p-1.5 rounded-lg mt-1 border border-[#eddcf6]">
                              "{ord.notes}"
                            </p>
                          )}
                        </td>
                        <td className="py-3.5 px-4 font-headline-sm text-sm font-bold text-on-surface">
                          ${ord.totalPrice.toFixed(2)}
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={ord.status}
                            onChange={(e) =>
                              updateOrderStatus(ord.id, e.target.value as OrderInquiry['status'])
                            }
                            className="px-3 py-1.5 rounded-xl text-[12px] font-semibold bg-[#faf0ff] border border-[#eddcf6] focus:outline-none focus:bg-white cursor-pointer"
                          >
                            <option value="New Inquiry">New Inquiry</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                const phone = (ord.customerPhone || config.whatsAppNumber).replace(/[^0-9]/g, '');
                                const text = encodeURIComponent(
                                  `Hello ${ord.customerName || 'there'}! This is Violet Muse Atelier following up on your order of ${ord.productName} (${ord.shade}).`
                                );
                                window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
                              }}
                              className="p-2 rounded-xl bg-[#25D366] text-white hover:bg-[#20ba5a] cursor-pointer transition-colors shadow-sm"
                              title="Chat with Customer on WhatsApp"
                            >
                              <span className="material-symbols-outlined text-[16px]">chat</span>
                            </button>
                            <button
                              onClick={() => deleteOrder(ord.id)}
                              className="p-2 rounded-xl text-outline hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                              title="Remove Record"
                            >
                              <span className="material-symbols-outlined text-[16px]">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {orders.length === 0 && (
                <div className="py-12 text-center text-outline font-body-md text-body-md">
                  No orders or customer consultations recorded yet.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: STORE & WHATSAPP SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-[#eddcf6] max-w-2xl mx-auto space-y-5 animate-fadeIn">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                WhatsApp Commerce & Atelier Configuration
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Customize your official WhatsApp Business number and store information. Any change updates all checkout links across the website in real-time.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4 pt-2">
              <div>
                <label className="font-label-md text-label-md text-on-surface font-semibold block mb-1.5">
                  WhatsApp Business Phone Number (International Format)
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                    phone
                  </span>
                  <input
                    type="text"
                    value={settingsPhone}
                    onChange={(e) => setSettingsPhone(e.target.value)}
                    placeholder="e.g. 18005550199 or 447700900077"
                    className="w-full h-12 pl-11 pr-3 rounded-xl bg-[#faf0ff] border border-[#eddcf6] font-mono text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>
                <p className="font-body-sm text-[12px] text-outline mt-1.5">
                  Digits only without spaces or + sign (used for https://wa.me/&lt;number&gt;).
                </p>
              </div>

              <div>
                <label className="font-label-md text-label-md text-on-surface font-semibold block mb-1.5">
                  Top Announcement Banner Copy
                </label>
                <input
                  type="text"
                  value={settingsBanner}
                  onChange={(e) => setSettingsBanner(e.target.value)}
                  placeholder="e.g. Discover your next beauty essential"
                  className="w-full h-12 px-4 rounded-xl bg-[#faf0ff] border border-[#eddcf6] font-body-sm text-body-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-label-md text-label-md text-on-surface font-semibold block mb-1.5">
                    Atelier Brand Name
                  </label>
                  <input
                    type="text"
                    value={settingsStoreName}
                    onChange={(e) => setSettingsStoreName(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl bg-[#faf0ff] border border-[#eddcf6] font-body-sm text-body-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>

                <div>
                  <label className="font-label-md text-label-md text-on-surface font-semibold block mb-1.5">
                    Store Currency
                  </label>
                  <input
                    type="text"
                    value={settingsCurrency}
                    onChange={(e) => setSettingsCurrency(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl bg-[#faf0ff] border border-[#eddcf6] font-body-sm text-body-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-primary hover:bg-primary-container text-white font-label-md text-label-md font-semibold transition-all shadow-sm cursor-pointer"
                >
                  Save Store Configuration
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* MODAL: ADD PRODUCT */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#eddcf6] relative max-h-[90vh] overflow-y-auto animate-scaleUp">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute right-5 top-5 w-9 h-9 rounded-full bg-[#faf0ff] flex items-center justify-center text-outline hover:text-on-surface cursor-pointer border border-[#eddcf6]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-4">
              Add New Cosmetic Formulation
            </h3>

            <form onSubmit={handleSaveAdd} className="space-y-3.5">
              <div>
                <label className="font-label-sm text-label-sm text-outline uppercase font-semibold block mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Luminous Peptide Tint"
                  className="w-full h-11 px-3.5 rounded-xl bg-[#faf0ff] border border-[#eddcf6] text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-label-sm text-label-sm text-outline uppercase font-semibold block mb-1">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#faf0ff] border border-[#eddcf6] text-sm focus:outline-none focus:bg-white"
                  >
                    <option value="lips">Lips</option>
                    <option value="face">Face</option>
                    <option value="eyes">Eyes</option>
                    <option value="cheeks">Cheeks</option>
                  </select>
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-outline uppercase font-semibold block mb-1">
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#faf0ff] border border-[#eddcf6] text-sm focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-label-sm text-label-sm text-outline uppercase font-semibold block mb-1">
                    Finish Style
                  </label>
                  <input
                    type="text"
                    required
                    value={formFinish}
                    onChange={(e) => setFormFinish(e.target.value)}
                    placeholder="e.g. Matte, Radiant, Satin"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#faf0ff] border border-[#eddcf6] text-sm focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-outline uppercase font-semibold block mb-1">
                    Editorial Badge
                  </label>
                  <select
                    value={formTag}
                    onChange={(e) => setFormTag(e.target.value as any)}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#faf0ff] border border-[#eddcf6] text-sm focus:outline-none focus:bg-white"
                  >
                    <option value="Best Seller">Best Seller</option>
                    <option value="New Shade">New Shade</option>
                    <option value="Clean Beauty">Clean Beauty</option>
                    <option value="Award Winner">Award Winner</option>
                    <option value="Trending">Trending</option>
                    <option value="Staff Pick">Staff Pick</option>
                    <option value="New Release">New Release</option>
                    <option value="Editorial Pick">Editorial Pick</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-outline uppercase font-semibold block mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  required
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-[#faf0ff] border border-[#eddcf6] text-sm focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-outline uppercase font-semibold block mb-1">
                  Shade Swatches (Format: Name:#hex, Name:#hex)
                </label>
                <input
                  type="text"
                  value={formShadesStr}
                  onChange={(e) => setFormShadesStr(e.target.value)}
                  placeholder="Rose Velvet:#9b3a54, Plum Noir:#5c1c38"
                  className="w-full h-11 px-3.5 rounded-xl bg-[#faf0ff] border border-[#eddcf6] text-sm focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-outline uppercase font-semibold block mb-1">
                  Formula Description
                </label>
                <textarea
                  required
                  rows={2}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#faf0ff] border border-[#eddcf6] text-sm focus:outline-none focus:bg-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#faf0ff] hover:bg-[#f3e6fd] text-on-surface font-label-md text-label-md cursor-pointer border border-[#eddcf6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white font-label-md text-label-md font-semibold cursor-pointer shadow-sm"
                >
                  Save Formulation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT PRODUCT */}
      {editingProduct && (
        <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#eddcf6] relative max-h-[90vh] overflow-y-auto animate-scaleUp">
            <button
              onClick={() => setEditingProduct(null)}
              className="absolute right-5 top-5 w-9 h-9 rounded-full bg-[#faf0ff] flex items-center justify-center text-outline hover:text-on-surface cursor-pointer border border-[#eddcf6]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-4">
              Edit Formulation: {editingProduct.name}
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-3.5">
              <div>
                <label className="font-label-sm text-label-sm text-outline uppercase font-semibold block mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-[#faf0ff] border border-[#eddcf6] text-sm focus:outline-none focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-label-sm text-label-sm text-outline uppercase font-semibold block mb-1">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#faf0ff] border border-[#eddcf6] text-sm focus:outline-none focus:bg-white"
                  >
                    <option value="lips">Lips</option>
                    <option value="face">Face</option>
                    <option value="eyes">Eyes</option>
                    <option value="cheeks">Cheeks</option>
                  </select>
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-outline uppercase font-semibold block mb-1">
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#faf0ff] border border-[#eddcf6] text-sm focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-label-sm text-label-sm text-outline uppercase font-semibold block mb-1">
                    Finish Style
                  </label>
                  <input
                    type="text"
                    required
                    value={formFinish}
                    onChange={(e) => setFormFinish(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#faf0ff] border border-[#eddcf6] text-sm focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-outline uppercase font-semibold block mb-1">
                    Editorial Badge
                  </label>
                  <select
                    value={formTag}
                    onChange={(e) => setFormTag(e.target.value as any)}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#faf0ff] border border-[#eddcf6] text-sm focus:outline-none focus:bg-white"
                  >
                    <option value="Best Seller">Best Seller</option>
                    <option value="New Shade">New Shade</option>
                    <option value="Clean Beauty">Clean Beauty</option>
                    <option value="Award Winner">Award Winner</option>
                    <option value="Trending">Trending</option>
                    <option value="Staff Pick">Staff Pick</option>
                    <option value="New Release">New Release</option>
                    <option value="Editorial Pick">Editorial Pick</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-outline uppercase font-semibold block mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  required
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-[#faf0ff] border border-[#eddcf6] text-sm focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-outline uppercase font-semibold block mb-1">
                  Shade Swatches (Format: Name:#hex, Name:#hex)
                </label>
                <input
                  type="text"
                  value={formShadesStr}
                  onChange={(e) => setFormShadesStr(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-[#faf0ff] border border-[#eddcf6] text-sm focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-outline uppercase font-semibold block mb-1">
                  Formula Description
                </label>
                <textarea
                  required
                  rows={2}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#faf0ff] border border-[#eddcf6] text-sm focus:outline-none focus:bg-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2.5 rounded-xl bg-[#faf0ff] hover:bg-[#f3e6fd] text-on-surface font-label-md text-label-md cursor-pointer border border-[#eddcf6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white font-label-md text-label-md font-semibold cursor-pointer shadow-sm"
                >
                  Update Formulation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
