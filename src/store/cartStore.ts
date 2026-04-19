import { create } from 'zustand';

import { ProductType } from '@/types/menu';

export interface CartItem {
  id: string; // Unique generated ID for the cart line
  productId: string | number;
  name: string;
  size?: string;
  price: number;
  quantity: number;
  extras: string[]; // List of extra strings
  type: ProductType;
}

interface CartState {
  items: CartItem[];
  sede: string | null;
  tasaBcv: number; // For demo purposes, stored here
  
  // Modals UI state
  isProductModalOpen: boolean;
  selectedProductData: any | null; // holds product to be added
  isCheckoutOpen: boolean;

  setSede: (sedeId: string) => void;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  
  // UI actions
  setTasaBcv: (tasa: number) => void;
  openProductModal: (productData: any) => void;
  closeProductModal: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  sede: null,
  tasaBcv: 479.78, // Tasa BCV oficial al 16/04/2026 — se actualiza desde /admin/[sede]/tasa
  
  isProductModalOpen: false,
  selectedProductData: null,
  isCheckoutOpen: false,

  setSede: (sedeId) => set((state) => {
    if (state.sede && state.sede !== sedeId) {
      return { sede: sedeId, items: [] };
    }
    return { sede: sedeId };
  }),

  addItem: (item) => set((state) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
    return { items: [...state.items, { ...item, id }] };
  }),

  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),

  updateQuantity: (id, delta) => set((state) => ({
    items: state.items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    })
  })),

  clearCart: () => set({ items: [] }),

  getTotal: () => {
    return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },
  
  setTasaBcv: (tasa) => set({ tasaBcv: tasa }),
  openProductModal: (productData) => set({ isProductModalOpen: true, selectedProductData: productData }),
  closeProductModal: () => set({ isProductModalOpen: false, selectedProductData: null }),
  openCheckout: () => set({ isCheckoutOpen: true }),
  closeCheckout: () => set({ isCheckoutOpen: false }),
}));
