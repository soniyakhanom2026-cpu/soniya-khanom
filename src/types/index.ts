export interface ProductShade {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'lips' | 'face' | 'eyes' | 'cheeks';
  categoryLabel: string;
  price: number;
  rating: number;
  reviewCount: number;
  finish: string;
  finishLabel: string;
  tag?: 'Best Seller' | 'New Shade' | 'Clean Beauty' | 'Award Winner' | 'Trending' | 'Staff Pick' | 'New Release' | 'Editorial Pick';
  tagColor?: string;
  subtitle: string;
  description: string;
  image: string;
  sku: string;
  shades: ProductShade[];
  inStock: boolean;
  stockStatus?: 'In Stock' | 'Low Stock' | 'Out of Stock' | string;
  featured?: boolean;
  isBestSeller?: boolean;
}

export interface OrderInquiry {
  id: string;
  createdAt: string;
  customerName?: string;
  customerPhone?: string;
  productName: string;
  shade: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  sku: string;
  notes?: string;
  status: 'New Inquiry' | 'Contacted' | 'Confirmed' | 'Shipped' | 'Completed' | 'Cancelled';
}

export interface StoreConfig {
  storeName: string;
  tagline: string;
  announcementText: string;
  whatsAppNumber: string;
  currency: string;
  supportEmail: string;
}

export interface AdminUser {
  email: string;
  name: string;
  role: string;
}
