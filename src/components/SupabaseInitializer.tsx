'use client';

import { useEffect } from 'react';
import { useOrdersStore, Order } from '@/store/ordersStore';
import { ordersService } from '@/lib/ordersService';
import { useParams } from 'next/navigation';

export default function SupabaseInitializer() {
  const params = useParams();
  const sedeId = params?.sede as string;
  const { syncOrders, setOrders, orders } = useOrdersStore();

  useEffect(() => {
    if (!sedeId) return;

    // 1. Initial sync
    syncOrders(sedeId);

    // 2. Subscribe to real-time changes
    const subscription = ordersService.subscribeToOrders(sedeId, (payload) => {
      const { eventType, new: newRecord, old: oldRecord } = payload;

      if (eventType === 'INSERT') {
        const mapped: Order = {
          id: newRecord.id,
          sedeId: newRecord.sede_id,
          totalUSD: parseFloat(newRecord.total_usd),
          totalBS: parseFloat(newRecord.total_bs),
          status: newRecord.status,
          customerName: newRecord.customer_name,
          items: newRecord.items,
          date: newRecord.created_at,
        };
        
        // Add if not already present (to avoid double entry with optimistic update)
        setOrders([mapped, ...useOrdersStore.getState().orders.filter(o => o.id !== mapped.id)]);
      } 
      else if (eventType === 'UPDATE') {
        setOrders(useOrdersStore.getState().orders.map(o => 
          o.id === newRecord.id 
            ? { ...o, status: newRecord.status } 
            : o
        ));
      }
      else if (eventType === 'DELETE') {
        setOrders(useOrdersStore.getState().orders.filter(o => o.id !== oldRecord.id));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [sedeId, syncOrders, setOrders]);

  return null; // This component doesn't render anything
}
