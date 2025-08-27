// src/types/shop.types.ts
export interface Product {
  id: string;
  title: string;
  title_cs?: string;
  title_en?: string;
  price: number;
  currency: string;
  description: string;
  description_cs?: string;
  description_en?: string;
  category: string;
  images: string[];
  inStock: boolean;
  featured?: boolean;
  specifications?: Record<string, string>;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAdmin?: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
