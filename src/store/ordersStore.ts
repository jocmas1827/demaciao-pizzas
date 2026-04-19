import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from './cartStore';
import { ordersService } from '@/lib/ordersService';

export interface Order {
  id: string;
  sedeId: string;
  items: CartItem[];
  totalUSD: number;
  totalBS: number;
  status: 'Pendiente' | 'Al Horno' | 'En Preparación' | 'Listo' | 'Entregado';
  date: string;
  customerName: string;
  customerPhone: string;
}

interface OrdersState {
  orders: Order[];
  addOrder: (orderData: Omit<Order, 'id' | 'date' | 'status'>) => Promise<string>;
  updateOrderStatus: (id: string, status: Order['status']) => Promise<void>;
  getOrdersBySede: (sedeId: string) => Order[];
  syncOrders: (sedeId: string) => Promise<void>;
  setOrders: (orders: Order[]) => void;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],

      setOrders: (orders) => set({ orders }),

      addOrder: async (orderData) => {
        const now = new Date();
        const timePart = now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0');
        const randomPart = Math.random().toString(36).substring(2, 5).toUpperCase();
        const id = `ORD-${timePart}-${randomPart}`;
        
        const date = now.toISOString();
        const newOrder: Order = {
          ...orderData,
          id,
          date,
          status: 'Pendiente',
        };
        
        // Optimistic update
        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));

        try {
          await ordersService.saveOrder(newOrder);
        } catch (error) {
          console.error("Error saving to Supabase:", error);
          // We could handle rollback here if needed
        }
        
        return id;
      },

      updateOrderStatus: async (id, status) => {
        // Optimistic update
        set((state) => ({
          orders: state.orders.map(o => o.id === id ? { ...o, status } : o),
        }));

        try {
          await ordersService.updateStatus(id, status);
        } catch (error) {
          console.error("Error updating status in Supabase:", error);
        }
      },

      getOrdersBySede: (sedeId) => {
        return get().orders.filter(o => o.sedeId === sedeId);
      },

      syncOrders: async (sedeId) => {
        try {
          const remoteOrders = await ordersService.fetchOrders(sedeId);
          set({ orders: remoteOrders });
        } catch (error) {
          console.error("Error fetching from Supabase:", error);
        }
      },
    }),
    {
      name: 'demaciao-orders',
      partialize: (state) => ({ orders: state.orders }),
    }
  )
);
