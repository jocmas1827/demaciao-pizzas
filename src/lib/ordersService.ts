import { supabase } from './supabase';
import { Order } from '@/store/ordersStore';

export const ordersService = {
  // Save a new order to Supabase
  async saveOrder(order: Order) {
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          id: order.id,
          sede_id: order.sedeId,
          total_usd: order.totalUSD,
          total_bs: order.totalBS,
          status: order.status,
          customer_name: order.customerName,
          customer_phone: order.customerPhone,
          items: order.items,
          created_at: order.date,
        },
      ]);
    
    if (error) throw error;
    return data;
  },

  // Update order status
  async updateStatus(id: string, status: string) {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id);
    
    if (error) throw error;
  },

  // Get initial orders for a sede
  async fetchOrders(sedeId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('sede_id', sedeId)
      .order('created_at', { ascending: false })
      .limit(50);
    
    if (error) throw error;
    
    return data.map(o => ({
      id: o.id,
      sedeId: o.sede_id,
      totalUSD: parseFloat(o.total_usd),
      totalBS: parseFloat(o.total_bs),
      status: o.status,
      customerName: o.customer_name,
      customerPhone: o.customer_phone || '',
      items: o.items,
      date: o.created_at,
    }));
  },

  // Subscribe to real-time updates
  subscribeToOrders(sedeId: string, callback: (payload: any) => void) {
    return supabase
      .channel('orders-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `sede_id=eq.${sedeId}`,
        },
        (payload) => callback(payload)
      )
      .subscribe();
  }
};
