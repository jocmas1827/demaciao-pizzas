'use client';

import React, { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MapPin, Star, Flame } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { PIZZAS, COMBOS, categoryOrder, categoryLabels } from '@/data/menuData';
import MenuCategory from '@/components/MenuCategory';
import OtherMenuSections from '@/components/OtherMenuSections';
import CategoryNavigation from '@/components/CategoryNavigation';

const heroPizza = "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop";

const SEDE_NAMES: Record<string, string> = {
  'aviadores': 'Parque Los Aviadores',
  'unicentro': 'Unicentro Maracay',
  'turmero': 'Turmero',
  'samanes1': 'Los Samanes 1',
  'samanes2': 'Los Samanes 2',
  'bosque': 'El Bosque',
};

const SedePage: React.FC = () => {
  const currentSedeId = useCartStore(state => state.sede);
  const menuRef = useRef<HTMLDivElement>(null);

  // Combine items manually to avoid context issues
  const allMenuItems = useMemo(() => [...PIZZAS, ...COMBOS], []);
  const currentSedeName = SEDE_NAMES[currentSedeId || ''] || 'Nuestra Sede';

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative bg-demaciao-dark">
      {/* 1. HERO SECTION - Ultra Premium */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Layers */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            src={heroPizza} 
            alt="Demaciao Pizzas Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-demaciao-dark" />
          
          {/* MULTI-LAYER SMOKE EFFECT */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(230,30,37,0.1)_0%,transparent_50%)] animate-smoke opacity-40 blur-3xl" />
            <div className="absolute top-[10%] left-[20%] w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,rgba(255,209,0,0.05)_0%,transparent_50%)] animate-smoke opacity-30 blur-3xl" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
            <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-demaciao-red/10 rounded-full animate-pulse-glow" />
          </div>
        </div>

        {/* Floating Elements for "Vivid" feel */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100 }}
              animate={{ 
                opacity: [0, 0.4, 0], 
                y: -500,
                x: Math.sin(i) * 100
              }}
              transition={{ 
                duration: 5 + Math.random() * 5, 
                repeat: Infinity, 
                delay: Math.random() * 5 
              }}
              className="absolute bottom-0 text-demaciao-yellow/20"
              style={{ left: `${Math.random() * 100}%` }}
            >
              <Flame size={12 + Math.random() * 24} />
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-20 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-demaciao-yellow text-[10px] font-black uppercase tracking-[0.5em] mb-10 shadow-2xl">
              <Star className="w-3 h-3 fill-demaciao-yellow" />
              Sabor que Enamora
              <Star className="w-3 h-3 fill-demaciao-yellow" />
            </div>
            
            <h1 className="font-display text-[18vw] md:text-[160px] text-white leading-[0.75] tracking-tight uppercase mb-2 drop-shadow-[0_20px_50px_rgba(0,0,0,1)]">
              DEMACIAO
            </h1>
            <h2 className="font-display text-[8vw] md:text-[64px] text-demaciao-yellow tracking-[0.4em] uppercase mb-12 drop-shadow-2xl">
              PIZZAS
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-4">
              <button 
                onClick={scrollToMenu}
                className="group relative px-12 py-6 bg-demaciao-red text-white rounded-[2rem] font-title text-3xl uppercase tracking-widest shadow-[0_20px_50px_rgba(230,30,37,0.4)] hover:scale-105 hover:shadow-[0_25px_60px_rgba(230,30,37,0.6)] active:scale-95 transition-all duration-500 overflow-hidden"
              >
                <span className="relative z-10">ORDENAR AHORA</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
              
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="flex items-center gap-4 text-white/90 font-medium bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10"
              >
                <div className="w-10 h-10 rounded-full bg-demaciao-yellow/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-demaciao-yellow" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-widest text-white/50 font-black">Tu Sede</p>
                  <p className="text-lg font-title tracking-wide">{currentSedeName}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-[-10vh] md:bottom-[-15vh] left-1/2 -translate-x-1/2 cursor-pointer z-30"
            onClick={scrollToMenu}
          >
            <div className="flex flex-col items-center gap-3">
              <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Scrollea para saborear</span>
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-10 h-16 rounded-full border-2 border-white/10 flex items-start justify-center p-2"
              >
                <div className="w-1 h-3 bg-demaciao-yellow rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. MENU SECTION */}
      <div ref={menuRef} className="bg-white min-h-screen relative z-40 rounded-t-[3rem] md:rounded-t-[5rem] -mt-[10vh] shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
        <CategoryNavigation />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32 pt-10">
          {categoryOrder.map((catId) => {
            if (['pastas', 'hamburguesas', 'postres', 'calzones'].includes(catId)) return null;
            
            const items = allMenuItems.filter(i => i.category === catId);
            return (
              <MenuCategory 
                key={catId}
                id={catId === 'combos-imbatibles' ? 'combos-imbatibles' : 'pizzas-casa'}
                name={categoryLabels[catId]}
                items={items}
              />
            );
          })}

          <OtherMenuSections />
        </div>

        <footer className="py-20 bg-demaciao-dark flex flex-col items-center text-white">
          <div className="w-20 h-20 bg-white/5 rounded-3xl rotate-45 flex items-center justify-center shadow-2xl border border-white/10 mb-10 group hover:rotate-[225deg] transition-all duration-700">
            <span className="font-title text-4xl font-black text-demaciao-red -rotate-45 group-hover:rotate-[-225deg] transition-all duration-700 italic">Dp</span>
          </div>
          <p className="font-display text-5xl md:text-6xl text-white tracking-widest mb-4">DEMACIAO PIZZAS</p>
          <p className="text-white/40 font-medium tracking-[0.2em] uppercase text-xs italic mb-16">¡Que el AMOR y la PIZZA nunca falten!</p>
          
          <div className="flex flex-wrap justify-center gap-12 text-white/20 font-black text-[10px] uppercase tracking-[0.5em]">
            <span className="hover:text-demaciao-red transition-colors cursor-default">Calidad</span>
            <span className="text-demaciao-red/50">•</span>
            <span className="hover:text-demaciao-yellow transition-colors cursor-default">Tradición</span>
            <span className="text-demaciao-red/50">•</span>
            <span className="hover:text-white transition-colors cursor-default">Pasión</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SedePage;
