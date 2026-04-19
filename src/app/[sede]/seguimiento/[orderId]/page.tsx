'use client';

import React from 'react';
import { useOrdersStore, Order } from '@/store/ordersStore';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Flame, ChefHat, CheckCircle2, Clock, ArrowLeft } from 'lucide-react';

// Steps visible to the client (3 stages + done)
const STEPS: { status: Order['status']; label: string; sublabel: string; icon: React.ReactNode; color: string; activeBg: string }[] = [
  {
    status: 'Al Horno',
    label: 'Al Horno',
    sublabel: 'Tu pizza entró al horno 🔥',
    icon: <Flame className="w-6 h-6" />,
    color: 'text-demaciao-red',
    activeBg: 'bg-demaciao-red',
  },
  {
    status: 'En Preparación',
    label: 'En Preparación',
    sublabel: 'Añadiendo los últimos toques 👨‍🍳',
    icon: <ChefHat className="w-6 h-6" />,
    color: 'text-orange-500',
    activeBg: 'bg-orange-500',
  },
  {
    status: 'Listo',
    label: '¡Lista para entregar!',
    sublabel: 'Tu orden está lista. ¡Buen provecho! 🍕',
    icon: <CheckCircle2 className="w-6 h-6" />,
    color: 'text-green-500',
    activeBg: 'bg-green-500',
  },
];

const STATUS_ORDER: Order['status'][] = ['Pendiente', 'Al Horno', 'En Preparación', 'Listo', 'Entregado'];

function getStepIndex(status: Order['status']) {
  return STATUS_ORDER.indexOf(status);
}

export default function SeguimientoPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const sede = params.sede as string;

  const { orders } = useOrdersStore();
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-8 text-center">
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="font-title text-3xl font-black text-white mb-3">Pedido no encontrado</h1>
        <p className="text-gray-400 mb-8">Verifica el código de tu ticket e intenta de nuevo.</p>
        <Link href={`/${sede}`} className="bg-demaciao-red text-white font-bold px-6 py-3 rounded-xl hover:bg-red-700 transition-colors">
          Volver al Menú
        </Link>
      </div>
    );
  }

  const currentStepIdx = getStepIndex(order.status); // index in STATUS_ORDER
  const isEntregado = order.status === 'Entregado';

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6">

      {/* Back */}
      <Link href={`/${sede}`} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 self-start max-w-lg w-full mx-auto">
        <ArrowLeft className="w-4 h-4" /> Volver al menú
      </Link>

      <div className="w-full max-w-lg mx-auto space-y-6">

        {/* Header card */}
        <div className="bg-gray-900 rounded-3xl p-8 border border-white/5 shadow-2xl">
          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-1">Seguimiento de Pedido</p>
          <h1 className="font-title font-black text-4xl text-white mb-1">{order.id}</h1>
          <p className="text-gray-400 text-sm">{order.customerName}</p>

          {/* Status badge */}
          <div className={`inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full font-bold text-sm border ${
            order.status === 'Al Horno'       ? 'bg-red-950/60 border-red-800 text-red-400' :
            order.status === 'En Preparación' ? 'bg-orange-950/60 border-orange-800 text-orange-400' :
            order.status === 'Listo'          ? 'bg-green-950/60 border-green-800 text-green-400' :
            order.status === 'Entregado'      ? 'bg-blue-950/60 border-blue-800 text-blue-400' :
            'bg-gray-800 border-gray-700 text-gray-400'
          }`}>
            {order.status === 'Al Horno'       && <Flame className="w-4 h-4 animate-pulse" />}
            {order.status === 'En Preparación' && <ChefHat className="w-4 h-4" />}
            {order.status === 'Listo'          && <CheckCircle2 className="w-4 h-4" />}
            {order.status === 'Pendiente'      && <Clock className="w-4 h-4 animate-pulse" />}
            {order.status}
          </div>
        </div>

        {/* Progress tracker */}
        {!isEntregado ? (
          <div className="bg-gray-900 rounded-3xl p-8 border border-white/5 shadow-xl space-y-0">
            {STEPS.map((step, i) => {
              const stepStatus = getStepIndex(step.status);
              const isDone   = currentStepIdx > stepStatus;
              const isActive = currentStepIdx === stepStatus;
              const isPending= currentStepIdx < stepStatus;

              return (
                <div key={step.status} className="flex gap-5 items-start">
                  {/* Icon circle + connector */}
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                      isDone   ? `${step.activeBg} border-transparent text-white opacity-70` :
                      isActive ? `${step.activeBg} border-transparent text-white shadow-lg` :
                                 'bg-gray-800 border-gray-700 text-gray-600'
                    }`}>
                      {isDone ? <CheckCircle2 className="w-5 h-5" /> : step.icon}
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className={`w-0.5 h-10 my-1 transition-all duration-500 ${isDone ? step.activeBg : 'bg-gray-800'}`} />
                    )}
                  </div>

                  {/* Text */}
                  <div className="pt-2.5 pb-8">
                    <p className={`font-bold text-base transition-colors ${
                      isActive ? step.color : isDone ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {step.label}
                    </p>
                    {isActive && (
                      <p className="text-gray-400 text-sm mt-0.5 animate-in fade-in duration-500">{step.sublabel}</p>
                    )}
                    {isDone && <p className="text-gray-600 text-xs mt-0.5">Completado ✓</p>}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-green-950/40 border border-green-800 rounded-3xl p-10 text-center">
            <div className="text-6xl mb-4">🍕</div>
            <h2 className="font-title text-3xl font-black text-green-400 mb-2">¡Entregado!</h2>
            <p className="text-green-300/70">Tu pedido fue entregado exitosamente. ¡Que lo disfrutes!</p>
          </div>
        )}

        {/* Order summary */}
        <div className="bg-gray-900 rounded-3xl p-6 border border-white/5 shadow-xl">
          <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Resumen del Pedido</h3>
          <div className="space-y-3">
            {order.items.map(item => (
              <div key={item.id} className="flex items-start justify-between gap-3">
                <div>
                  <span className="font-black text-demaciao-red mr-2">{item.quantity}×</span>
                  <span className="font-bold text-white text-sm">{item.name}</span>
                  <span className="text-gray-500 text-xs ml-2">({item.size})</span>
                  {item.extras.length > 0 && (
                    <p className="text-gray-500 text-xs mt-0.5 ml-5">+{item.extras.join(', ')}</p>
                  )}
                </div>
                <span className="font-title font-black text-demaciao-yellow shrink-0">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/5 flex justify-between">
            <span className="text-gray-400 font-bold">Total</span>
            <div className="text-right">
              <div className="font-title font-black text-white text-xl">${order.totalUSD.toFixed(2)}</div>
              <div className="text-gray-500 text-xs">Bs. {order.totalBS.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-700 text-xs">Actualiza la página para ver el estado más reciente.</p>
      </div>
    </div>
  );
}
