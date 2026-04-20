'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MapPin } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { categoryOrder, categoryLabels } from '@/data/menuData';
import MenuCategory from '@/components/MenuCategory';
import OtherMenuSections from '@/components/OtherMenuSections';
import CategoryNavigation from '@/components/CategoryNavigation';

// Hero image - using a high-quality pizza photo
const heroPizza = "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop";

const SedePage: React.FC = () => {
  const { menuItems, currentSede, currentSedeId, sedes, setCurrentSede } = useApp();
  const menuRef = useRef<HTMLDivElement>(null);

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // If no sede selected, the layout's initializer should handle it, 
  // but we keep the main content clean.
  if (!currentSedeId || !currentSede) {
    return null; // Layout or SedeSelector will handle this
  }

  return (
    <div className="relative">
      {/* 1. HERO SECTION - Premium Look */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax-like feel */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroPizza} 
            alt="Demaciao Pizzas Hero" 
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay with Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-demaciao-dark" />
          
          {/* Animated Glow / Smoke Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-demaciao-red/10 rounded-full blur-[120px] animate-pulse-glow" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-demaciao-yellow text-[10px] font-black uppercase tracking-[0.4em] mb-8">
              Auténtico Sabor Artesanal
            </span>
            
            <h1 className="font-display text-[15vw] md:text-[120px] text-white leading-[0.85] tracking-tight uppercase mb-2 drop-shadow-2xl">
              DEMACIAO
            </h1>
            <h2 className="font-display text-[6vw] md:text-[48px] text-demaciao-yellow tracking-[0.3em] uppercase mb-12 drop-shadow-lg">
              PIZZAS
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4">
              <button 
                onClick={scrollToMenu}
                className="group relative px-10 py-5 bg-demaciao-red text-white rounded-2xl font-title text-2xl uppercase tracking-widest shadow-xl shadow-red-600/30 hover:scale-105 active:scale-95 transition-all"
              >
                Ver el Menú
                <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              
              <div className="flex items-center gap-3 text-white/80 font-medium">
                <MapPin className="w-5 h-5 text-demaciao-yellow" />
                <span>{currentSede.name}</span>
              </div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
            onClick={scrollToMenu}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Explorar</span>
              <ChevronDown className="w-8 h-8 text-white/30 animate-bounce" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. MENU SECTION */}
      <div ref={menuRef} className="bg-white min-h-screen">
        {/* Secondary Navigation (Sticky) */}
        <CategoryNavigation />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32">
          {/* Categorías Principales (Pizzas, Combos, etc.) */}
          {categoryOrder.map((catId) => {
            // Hamburguesas and others are handled by OtherMenuSections or separately
            if (['pastas', 'hamburguesas', 'postres', 'calzones'].includes(catId)) return null;
            
            const items = menuItems.filter(i => i.category === catId);
            return (
              <MenuCategory 
                key={catId}
                id={catId === 'combos-imbatibles' ? 'combos-imbatibles' : 'pizzas-casa'}
                name={categoryLabels[catId]}
                items={items}
              />
            );
          })}

          {/* Secciones Especiales (Pastas, Calzones, Ensaladas, Postres) */}
          <OtherMenuSections />
        </div>

        {/* Footer info */}
        <footer className="py-20 bg-gray-50 border-t border-gray-100 flex flex-col items-center">
          <div className="w-16 h-16 bg-white rounded-2xl rotate-45 flex items-center justify-center shadow-xl border border-gray-100 mb-8">
            <span className="font-title text-2xl font-black text-demaciao-red -rotate-45 italic">Dp</span>
          </div>
          <p className="font-display text-4xl text-gray-900 tracking-widest mb-2">DEMACIAO PIZZAS</p>
          <p className="text-gray-400 font-medium tracking-wide italic">¡Que el AMOR y la PIZZA nunca falten!</p>
          
          <div className="flex gap-8 mt-12 text-gray-300 font-black text-[10px] uppercase tracking-[0.3em]">
            <span>Calidad</span>
            <span className="text-demaciao-red">•</span>
            <span>Tradición</span>
            <span className="text-demaciao-red">•</span>
            <span>Pasión</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SedePage;
