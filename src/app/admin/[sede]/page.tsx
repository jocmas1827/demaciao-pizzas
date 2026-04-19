'use client';

import { ArrowUpRight, DollarSign, Percent, TrendingUp, Calculator, Receipt, Package } from "lucide-react";
import { useOrdersStore } from "@/store/ordersStore";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function AdminSedeDashboard() {
  const params = useParams();
  const sedeId = params.sede as string;
  const { getOrdersBySede } = useOrdersStore();

  const orders = getOrdersBySede(sedeId);
  
  // Real financial calculations from orders
  const brutoDB = orders.reduce((sum, o) => sum + o.totalUSD, 0);
  const ivaTotal = brutoDB * 0.16 / 1.16; // extract IVA from total (IVA-inclusive)
  const netoTotal = brutoDB - ivaTotal;
  
  const pendingCount = orders.filter(o => o.status === 'Pendiente').length;
  const preppingCount = orders.filter(o => o.status === 'En Preparación').length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 pb-4 border-b border-gray-200 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resumen Financiero</h1>
          <p className="text-gray-500 font-medium text-sm mt-1">
            Datos del día actual — <span className="font-bold text-gray-700">{orders.length}</span> pedidos procesados.
          </p>
        </div>
        <Link href={`/admin/${sedeId}/tasa`} className="flex bg-white border border-gray-200 rounded-xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:border-demaciao-red transition-colors group">
           <div className="px-5 py-2.5 border-r border-gray-200 flex flex-col justify-center bg-gray-50 group-hover:bg-red-50/50 transition-colors">
             <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest block">Tasa BCV del Día</span>
             <span className="font-bold text-xl text-gray-900 tracking-tight">Bs. 36.45</span>
           </div>
           <div className="px-5 py-2.5 bg-white flex items-center text-sm font-bold text-demaciao-red">
              Modificar →
           </div>
        </Link>
      </div>

      {/* FINANCIAL CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bruto */}
        <div className="bg-gradient-to-br from-[#e11d24] to-[#a81419] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
          <div className="absolute -top-4 -right-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <TrendingUp className="w-32 h-32" />
          </div>
          <p className="font-semibold text-red-100 mb-1 flex items-center gap-2 text-sm uppercase tracking-wider">
            <DollarSign className="w-4 h-4" /> Bruto Hoy
          </p>
          <h3 className="font-title font-black text-5xl tracking-wide mb-5 mt-1">
            $ {brutoDB.toFixed(2)}
          </h3>
          <div className="inline-flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-full text-xs font-bold">
            <ArrowUpRight className="w-3 h-3" /> {orders.length} pedidos
          </div>
        </div>

        {/* IVA */}
        <div className="bg-gradient-to-br from-[#F5B418] to-[#d6980d] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
          <div className="absolute -top-4 -right-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
            <Percent className="w-32 h-32" />
          </div>
          <p className="font-semibold text-yellow-50 mb-1 flex items-center gap-2 text-sm uppercase tracking-wider">
            <Percent className="w-4 h-4" /> IVA (16%)
          </p>
          <h3 className="font-title font-black text-5xl tracking-wide mb-5 mt-1">
            $ {ivaTotal.toFixed(2)}
          </h3>
          <div className="inline-flex items-center gap-1 bg-black/10 px-3 py-1.5 rounded-full text-xs font-bold">
            Retención SENIAT
          </div>
        </div>

        {/* Neto */}
        <div className="bg-gradient-to-br from-[#22c55e] to-[#15803d] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
          <div className="absolute -top-4 -right-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
            <DollarSign className="w-32 h-32" />
          </div>
          <p className="font-semibold text-emerald-100 mb-1 flex items-center gap-2 text-sm uppercase tracking-wider">
            <DollarSign className="w-4 h-4" /> Neto Hoy
          </p>
          <h3 className="font-title font-black text-5xl tracking-wide mb-5 mt-1">
            $ {netoTotal.toFixed(2)}
          </h3>
          <div className="inline-flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-full text-xs font-bold">
            Disponible para Caja
          </div>
        </div>
      </div>

      {/* STATUS CARDS row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
            <Receipt className="w-6 h-6 text-demaciao-red" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pendientes</p>
            <p className="font-title font-black text-3xl text-gray-900">{pendingCount}</p>
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center shrink-0">
            <Package className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Preparando</p>
            <p className="font-title font-black text-3xl text-gray-900">{preppingCount}</p>
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Pedidos</p>
            <p className="font-title font-black text-3xl text-gray-900">{orders.length}</p>
          </div>
        </div>
      </div>

      {/* POS CTA */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-red-50 text-demaciao-red rounded-2xl flex items-center justify-center border border-red-100 shrink-0">
            <Calculator className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Terminal POS Habilitada</h2>
            <p className="text-gray-500 font-light text-sm mt-1">Procesa pedidos del mostrador directamente desde el panel.</p>
          </div>
        </div>
        <Link href={`/admin/${sedeId}/pos`} className="shrink-0 bg-demaciao-red hover:bg-[#C1121C] text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-[0_4px_15px_rgba(230,30,37,0.3)] whitespace-nowrap">
          Abrir POS →
        </Link>
      </div>

    </div>
  );
}
