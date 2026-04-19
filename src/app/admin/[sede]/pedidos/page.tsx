'use client';

import React, { useEffect, useState } from 'react';
import { useOrdersStore, Order } from '@/store/ordersStore';
import { Package, Flame, ChefHat, CheckCircle2, Truck, MessageSquare } from 'lucide-react';
import { useParams } from 'next/navigation';

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS_FLOW: Order['status'][] = ['Pendiente', 'Al Horno', 'En Preparación', 'Listo', 'Entregado'];

const STATUS_CONFIG: Record<Order['status'], { label: string; color: string; bg: string; border: string; icon: React.ReactNode; glow: string }> = {
  'Pendiente': {
    label: 'Pendiente',
    color: 'text-gray-500', bg: 'bg-gray-100', border: 'border-gray-200',
    icon: <Package className="w-4 h-4" />,
    glow: ''
  },
  'Al Horno': {
    label: 'Al Horno 🔥',
    color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-300',
    icon: <Flame className="w-4 h-4 animate-pulse" />,
    glow: 'shadow-[0_0_12px_rgba(239,68,68,0.3)]'
  },
  'En Preparación': {
    label: 'En Preparación',
    color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-300',
    icon: <ChefHat className="w-4 h-4" />,
    glow: 'shadow-[0_0_12px_rgba(234,88,12,0.25)]'
  },
  'Listo': {
    label: '¡Listo! ✓',
    color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-300',
    icon: <CheckCircle2 className="w-4 h-4" />,
    glow: 'shadow-[0_0_12px_rgba(34,197,94,0.3)]'
  },
  'Entregado': {
    label: 'Entregado',
    color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200',
    icon: <Truck className="w-4 h-4" />,
    glow: ''
  },
};

// Next action button for each status
const NEXT_ACTION: Partial<Record<Order['status'], { label: string; next: Order['status']; btnClass: string }>> = {
  'Pendiente':     { label: '🔥 Poner al Horno',      next: 'Al Horno',       btnClass: 'bg-demaciao-red hover:bg-red-700 text-white' },
  'Al Horno':      { label: '👨‍🍳 En Preparación',      next: 'En Preparación', btnClass: 'bg-orange-500 hover:bg-orange-600 text-white' },
  'En Preparación':{ label: '✅ Marcar Listo',          next: 'Listo',          btnClass: 'bg-green-500 hover:bg-green-600 text-white' },
  'Listo':         { label: '🛵 Marcar Entregado',     next: 'Entregado',      btnClass: 'bg-blue-500 hover:bg-blue-600 text-white' },
};

function getTimeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
  if (diff < 1) return 'Ahora mismo';
  if (diff === 1) return 'Hace 1 min';
  return `Hace ${diff} mins`;
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function PedidosPage() {
  const params = useParams();
  const sedeId = params.sede as string;
  const { getOrdersBySede, updateOrderStatus } = useOrdersStore();

  // Auto-refresh: poll every 5s + listen to cross-tab storage events
  const [, setTick] = useState(0);
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'demaciao-orders') setTick(t => t + 1);
    };
    window.addEventListener('storage', onStorage);
    const timer = setInterval(() => setTick(t => t + 1), 5000);
    return () => {
      window.removeEventListener('storage', onStorage);
      clearInterval(timer);
    };
  }, []);

  const orders = getOrdersBySede(sedeId);
  const activeOrders  = orders.filter(o => o.status !== 'Entregado');
  const doneOrders    = orders.filter(o => o.status === 'Entregado');

  const statusCount = (s: Order['status']) => orders.filter(o => o.status === s).length;

  return (
    <div className="flex flex-col space-y-6 max-w-[1600px] mx-auto">

      {/* Header + counters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-gray-200 gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Portal de Cocina</h1>
          <p className="text-gray-500 font-medium text-sm mt-1">Gestiona el estado de cada pedido en tiempo real.</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          {(['Pendiente', 'Al Horno', 'En Preparación', 'Listo'] as Order['status'][]).map(s => {
            const cfg = STATUS_CONFIG[s];
            return (
              <div key={s} className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold ${cfg.bg} ${cfg.border} ${cfg.color}`}>
                {cfg.icon}
                <span>{statusCount(s)}</span>
                <span className="font-medium opacity-70">{s}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Empty state */}
      {orders.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-16 flex flex-col items-center text-center shadow-sm">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Package className="w-9 h-9 text-gray-300" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-1">Sin pedidos aún</h3>
          <p className="text-gray-400 text-sm">Cuando los clientes hagan un pedido aparecerán aquí.</p>
        </div>
      )}

      {/* ACTIVE ORDERS GRID */}
      {activeOrders.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {activeOrders.map(order => {
            const cfg = STATUS_CONFIG[order.status];
            const nextAction = NEXT_ACTION[order.status];
            return (
              <div key={order.id} className={`bg-white rounded-2xl border-2 ${cfg.border} ${cfg.glow} flex flex-col overflow-hidden transition-all duration-300`}>
                
                {/* Card header */}
                <div className={`px-4 py-3 flex items-center justify-between ${cfg.bg} border-b ${cfg.border}`}>
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{getTimeAgo(order.date)}</div>
                    <div className="font-title font-black text-gray-900 tracking-widest">{order.id}</div>
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-black ${cfg.bg} ${cfg.border} ${cfg.color}`}>
                    {cfg.icon} {cfg.label}
                  </div>
                </div>

                {/* Customer */}
                {(order.customerName || order.customerPhone) && (
                  <div className="px-4 pt-3 pb-0 flex items-start justify-between">
                    <div className="min-w-0">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Cliente</p>
                      <p className="text-sm font-bold text-gray-700 truncate">{order.customerName}</p>
                      {order.customerPhone && (
                        <p className="text-[10px] text-gray-400 font-medium">{order.customerPhone}</p>
                      )}
                    </div>
                    {order.customerPhone && (
                      <a
                        href={`https://wa.me/${order.customerPhone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                        title="Contactar por WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}

                {/* Items */}
                <div className="px-4 py-3 flex-1 space-y-2 max-h-40 overflow-y-auto">
                  {order.items.map(item => (
                    <div key={item.id} className="flex gap-2">
                      <span className="font-black text-demaciao-red text-sm">{item.quantity}×</span>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 text-sm uppercase truncate">{item.name}</p>
                        <p className="text-[10px] text-gray-400">{item.size}</p>
                        {item.extras.length > 0 && (
                          <p className="text-[10px] text-gray-400 leading-tight">+{item.extras.join(', ')}</p>
                        )}
                      </div>
                      <span className="ml-auto font-black text-sm text-demaciao-yellow shrink-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="px-4 py-3 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total</span>
                  <div className="text-right">
                    <div className="font-title font-black text-gray-900">${order.totalUSD.toFixed(2)}</div>
                    <div className="text-[10px] text-gray-400">Bs. {order.totalBS.toFixed(2)}</div>
                  </div>
                </div>

                {/* ACTION BUTTON */}
                {nextAction && (
                  <button
                    onClick={() => updateOrderStatus(order.id, nextAction.next)}
                    className={`w-full py-3.5 font-bold text-sm uppercase tracking-widest transition-colors ${nextAction.btnClass}`}
                  >
                    {nextAction.label}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* DELIVERED ORDERS — collapsed */}
      {doneOrders.length > 0 && (
        <div className="mt-4">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Entregados hoy ({doneOrders.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {doneOrders.map(order => (
              <div key={order.id} className="bg-white border border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between shadow-sm opacity-60">
                <div>
                  <p className="font-title font-bold text-xs text-gray-500 uppercase">{order.id}</p>
                  <p className="text-sm font-bold text-gray-700">${order.totalUSD.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-1 bg-blue-50 text-blue-500 text-xs font-bold px-2 py-1 rounded-full">
                  <Truck className="w-3 h-3" /> Entregado
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
