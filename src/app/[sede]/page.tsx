'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import CategoryNavigation from '@/components/CategoryNavigation';
import MenuCategory from '@/components/MenuCategory';
import { PIZZAS, CALZONES, PASTAS, HAMBURGUESAS, COMBOS } from '@/data/menuData';

export default function SedePage() {
  const categories = [
    { id: 'combos-imbatibles', name: 'Combos Imbatibles', items: COMBOS },
    { id: 'pizzas-casa', name: 'Pizzas de la Casa', items: PIZZAS },
    { id: 'calzones', name: 'Calzones', items: CALZONES },
    { id: 'pastas', name: 'Pastas', items: PASTAS },
    { id: 'hamburguesas', name: 'Hamburguesas y Perros', items: HAMBURGUESAS },
  ];

  return (
    <div className="bg-white min-h-screen">
      <CategoryNavigation />

      {/* HERO SECTION */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-demaciao-dark">
         {/* Background with Overlays */}
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-60"></div>
         <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-demaciao-red/20 via-transparent to-transparent opacity-50"></div>
         
         <div className="z-10 flex flex-col items-center text-center px-4">
            {/* Logo Wrapper */}
            <div className="relative mb-12 animate-in zoom-in duration-1000">
               <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center rotate-45 border-8 border-demaciao-red shadow-[0_0_80px_rgba(230,30,37,0.4)] relative">
                  <div className="flex flex-col items-center justify-center -rotate-45">
                     <span className="text-2xl font-black italic text-demaciao-yellow font-title leading-none">De</span>
                     <span className="text-3xl font-black text-black font-title leading-none">ma</span>
                     <span className="text-2xl font-black italic text-[#22c55e] font-title leading-none">ciao</span>
                  </div>
               </div>
            </div>
            
            <h1 className="font-title text-7xl md:text-[10rem] lg:text-[12rem] text-white font-normal leading-[0.8] mb-4 tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom duration-1000">
              DEMACIAO
            </h1>
            <h2 className="font-title text-3xl md:text-5xl lg:text-6xl text-demaciao-yellow font-normal tracking-[0.3em] drop-shadow-lg mb-16 animate-in slide-in-from-bottom duration-1000 delay-200">
              PIZZA HUB
            </h2>
            
            <div className="flex flex-col items-center gap-8 animate-in fade-in duration-1000 delay-500">
              <div className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-2xl">
                 <p className="text-white font-bold text-lg tracking-widest uppercase flex items-center gap-3">
                   <span className="animate-pulse">🔥</span>
                   ¡Que el AMOR y la PIZZA nunca falten!
                   <span className="animate-pulse">🔥</span>
                 </p>
              </div>
              
              <button 
                onClick={() => document.getElementById('combos-imbatibles')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex flex-col items-center gap-4 transition-all duration-300 hover:scale-110"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 group-hover:text-white">Explorar Menú</span>
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-demaciao-red group-hover:border-demaciao-red transition-all">
                  <ChevronDown className="w-6 h-6 text-white animate-bounce" />
                </div>
              </button>
            </div>
         </div>
         
         {/* Bottom Fade to Content */}
         <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* MENU CONTENT */}
      <main className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 pb-40">
        {categories.map((cat) => (
          <MenuCategory 
            key={cat.id} 
            id={cat.id} 
            name={cat.name} 
            items={cat.items} 
          />
        ))}

        {/* Footer Branding */}
        <footer className="mt-60 pt-20 border-t border-gray-100 flex flex-col items-center justify-center opacity-20">
          <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center rotate-45 mb-8 border-2 border-gray-100">
            <div className="flex flex-col items-center justify-center -rotate-45">
                <span className="text-xl font-bold italic text-demaciao-yellow font-title">De</span>
                <span className="text-2xl font-bold text-gray-400 font-title">ma</span>
                <span className="text-xl font-bold italic text-[#22c55e] font-title">ciao</span>
            </div>
          </div>
          <p className="font-title text-sm tracking-[0.5em] uppercase text-gray-400">
            Demaciao Pizza Hub © {new Date().getFullYear()}
          </p>
        </footer>
      </main>
    </div>
  );
}
