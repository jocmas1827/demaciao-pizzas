'use client';

import React, { useEffect, useState } from 'react';
import { useOrdersStore, Order } from '@/store/ordersStore';
import { Flame, ChefHat, CheckCircle2, Clock, X, ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const STATUS_CONFIG: Record<Order['status'], { label: string; bar: string; icon: React.ReactNode }> = {
  'Pendiente':      { label: 'Recibido — en espera...', bar: 'bg-gray-700 text-white',    icon: <Clock className="w-4 h-4 animate-pulse" /> },
  'Al Horno':       { label: '🔥 ¡En el horno!',         bar: 'bg-demaciao-red text-white',  icon: <Flame className="w-4 h-4 animate-pulse" /> },
  'En Preparación': { label: '👨‍🍳 Casi lista...',      bar: 'bg-orange-500 text-white',    icon: <ChefHat className="w-4 h-4" /> },
  'Listo':          { label: '✅ ¡Lista para retirar!', bar: 'bg-green-500 text-white',     icon: <CheckCircle2 className="w-4 h-4" /> },
  'Entregado':      { label: '🛵 ¡Buen provecho!',  bar: 'bg-blue-600 text-white',      icon: <CheckCircle2 className="w-4 h-4" /> },
};

export default function OrderStatusBanner() {
  const { orders } = useOrdersStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  // Filter for active orders (not delivered or just recently delivered)
  const activeOrders = orders.filter(o => o.status !== 'Entregado');

  // If we have orders but the index is out of bounds, reset it
  useEffect(() => {
    if (currentIndex >= activeOrders.length && activeOrders.length > 0) {
      setCurrentIndex(0);
    }
  }, [activeOrders.length, currentIndex]);

  if (activeOrders.length === 0 || dismissed) return null;

  const currentOrder = activeOrders[currentIndex];
  const cfg = STATUS_CONFIG[currentOrder.status];

  return (
    <div className={`w-full ${cfg.bar} px-4 py-2.5 flex items-center gap-3 text-sm font-bold shadow-md z-50 sticky top-0 transition-colors duration-500`}>
      {/* Icon */}
      <div className="shrink-0">{cfg.icon}</div>
      
      {/* Label & Multi-order info */}
      <div className="flex-1 truncate flex items-center gap-2">
        <span className="truncate">{cfg.label}</span>
        {activeOrders.length > 1 && (
          <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] whitespace-nowrap">
            {currentIndex + 1} de {activeOrders.length}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Navigation if multi-order */}
        {activeOrders.length > 1 && (
          <div className="flex items-center gap-1 mr-2 bg-black/10 rounded-lg px-1">
            <button 
              onClick={(e) => { e.preventDefault(); setCurrentIndex(prev => (prev > 0 ? prev - 1 : activeOrders.length - 1)); }}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={(e) => { e.preventDefault(); setCurrentIndex(prev => (prev < activeOrders.length - 1 ? prev + 1 : 0)); }}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Link to tracking */}
        <Link
          href={`/${currentOrder.sedeId}/seguimiento/${currentOrder.id}`}
          className="shrink-0 bg-white text-gray-900 px-3 py-1 rounded-full text-xs font-black transition-transform hover:scale-105 active:scale-95 whitespace-nowrap"
        >
          Ver Ticket →
        </Link>

        {/* Dismiss */}
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 p-1 hover:bg-white/20 rounded-full transition-colors ml-1"
          title="Cerrar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
