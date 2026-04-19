'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  BarChart3, 
  Pizza, 
  Store, 
  Receipt, 
  Settings, 
  ChevronDown,
  LogOut,
  Calculator,
  ShieldCheck
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import SupabaseInitializer from '@/components/SupabaseInitializer';
import React from 'react';

const SEDES: Record<string, string> = {
  'aviadores': 'C.C. Parque Los Aviadores',
  'unicentro': 'C.C. Unicentro Maracay',
  'turmero': 'Turmero',
  'samanes1': 'Los Samanes 1',
  'samanes2': 'Los Samanes 2',
  'bosque': 'El Bosque',
};

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const sede = params.sede as string;
  const currentSedeName = SEDES[sede] || 'Desconocida';
  const { username, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/admin');
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <SupabaseInitializer />
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col transition-all duration-300 shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
          <div className="w-8 h-8 rounded-md bg-demaciao-red text-white flex items-center justify-center font-title font-bold text-lg mr-3">D</div>
          <span className="font-title font-bold tracking-widest text-lg uppercase">Admin</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-3 space-y-1">
            <Link href={`/admin/${sede}`} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white font-medium transition-colors">
              <BarChart3 className="w-5 h-5 text-demaciao-yellow" />
              <span>Dashboard</span>
            </Link>
            
            <Link href={`/admin/${sede}/pos`} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
              <Calculator className="w-5 h-5" />
              <span>POS Cajero</span>
            </Link>

            <Link href={`/admin/${sede}/stock`} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
              <Pizza className="w-5 h-5" />
              <span>Menú y Stock</span>
            </Link>

            <Link href={`/admin/${sede}/pedidos`} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
              <Receipt className="w-5 h-5" />
              <span>Pedidos en Vivo</span>
            </Link>

            <Link href={`/admin/${sede}/tasa`} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
              <span>Tasa BCV</span>
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-gray-800 space-y-2">
           <div className="flex items-center gap-2 px-3 py-2">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              <span className="text-xs text-gray-400 font-medium capitalize">{username || 'admin'}</span>
           </div>
           <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-red-400 text-sm transition-colors group w-full px-3 py-2 rounded-lg hover:bg-white/5">
             <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
             Cerrar Sesión
           </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* TOP NAVBAR */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
          <div className="font-title font-bold text-gray-800 tracking-wide text-xl">
            Panel de Control
          </div>
          
          <div className="flex items-center gap-4">
             {/* SEDE DROPDOWN */}
             <div className="relative group cursor-pointer inline-block">
                <div className="flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-xl transition-colors border border-gray-200">
                   <Store className="w-4 h-4 text-demaciao-red" />
                   <span className="font-semibold text-sm text-gray-700">{currentSedeName}</span>
                   <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>
                
                {/* Dropdown */}
                <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2 z-50">
                   <div className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 py-2 mb-1">Cambiar Sede</div>
                   {Object.entries(SEDES).map(([sId, sName]) => (
                     <Link key={sId} href={`/admin/${sId}`} className={`block px-3 py-2 text-sm rounded-lg hover:bg-red-50 hover:text-demaciao-red transition-colors ${sId === sede ? 'bg-red-50 text-demaciao-red font-bold' : 'text-gray-600 font-medium'}`}>
                       {sName}
                     </Link>
                   ))}
                </div>
             </div>
             
             {/* User avatar */}
             <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center border border-gray-700 cursor-pointer" onClick={handleLogout} title="Cerrar sesión">
               <span className="text-white font-bold text-xs uppercase">{(username || 'AD').slice(0, 2)}</span>
             </div>
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1 overflow-auto p-6 lg:p-8 bg-gray-50">
          {children}
        </main>
      </div>
      
    </div>
  );
}
