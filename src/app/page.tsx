'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Star, ChevronRight } from 'lucide-react';

const SEDES = [
  { id: 'aviadores', name: 'C.C. PARQUE LOS AVIADORES', address: 'C.C. Parque Los Av...', emoji: '✈️' },
  { id: 'unicentro', name: 'C.C. UNICENTRO MARACAY', address: 'C.C. Unicentro, Ma...', emoji: '🏢' },
  { id: 'turmero', name: 'TURMERO', address: 'Turmero, Aragua', emoji: '🌿' },
  { id: 'samanes1', name: 'LOS SAMANES 1', address: 'Los Samanes 1, Ma...', emoji: '🌳' },
  { id: 'samanes2', name: 'LOS SAMANES 2', address: 'Los Samanes 2, M...', emoji: '🌲' },
  { id: 'bosque', name: 'EL BOSQUE', address: 'El Bosque, Maracay', emoji: '🏡' },
];

export default function SedeSelectionPage() {
  return (
    <main className="min-h-screen bg-demaciao-dark flex flex-col items-center justify-center px-4 relative overflow-hidden py-20">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(230,30,37,0.08)_0%,transparent_50%)] animate-smoke opacity-50 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(255,209,0,0.05)_0%,transparent_50%)] animate-smoke opacity-40 blur-3xl" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          {/* Logo */}
          <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center rotate-45 mb-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 group hover:rotate-[225deg] transition-all duration-700">
            <div className="flex flex-col items-center justify-center -rotate-45 group-hover:rotate-[-225deg] transition-all duration-700">
               <span className="text-2xl font-black italic text-demaciao-red font-title tracking-tighter leading-none">D</span>
               <span className="text-xl font-bold text-white font-title tracking-tighter leading-none">p</span>
            </div>
          </div>
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-demaciao-yellow text-[10px] font-black uppercase tracking-[0.4em] mb-6">
            <Star className="w-3 h-3 fill-demaciao-yellow" />
            Bienvenido a la Experiencia
            <Star className="w-3 h-3 fill-demaciao-yellow" />
          </div>

          <h1 className="font-display text-[12vw] md:text-[120px] text-white leading-[0.8] tracking-tight uppercase mb-4 drop-shadow-2xl">
            DEMACIAO <span className="text-demaciao-yellow">PIZZAS</span>
          </h1>
          
          <p className="text-white/40 text-lg md:text-xl font-medium tracking-[0.2em] uppercase italic">
            Selecciona tu sede para ordenar
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {SEDES.map((sede, i) => (
            <motion.div
              key={sede.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link 
                href={`/${sede.id}`}
                className="group relative flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 hover:border-demaciao-red/50 hover:bg-white/10 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-demaciao-red/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-demaciao-red/20 transition-colors" />
                
                <div className="text-6xl mb-6 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500">
                  {sede.emoji}
                </div>
                
                <h3 className="font-title text-2xl font-bold text-white mb-2 tracking-wide group-hover:text-demaciao-yellow transition-colors">
                  {sede.name}
                </h3>
                
                <p className="text-white/40 text-sm flex items-center justify-center gap-2 font-medium mb-6">
                  <MapPin size={14} className="text-demaciao-red" />
                  {sede.address}
                </p>

                <div className="mt-auto flex items-center gap-2 text-demaciao-red font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                  Ver Menú <ChevronRight size={14} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          className="mt-24 flex items-center gap-4 text-white font-black text-[10px] uppercase tracking-[0.6em]"
        >
          <span>Calidad</span>
          <div className="w-1.5 h-1.5 rounded-full bg-demaciao-red" />
          <span>Tradición</span>
          <div className="w-1.5 h-1.5 rounded-full bg-demaciao-red" />
          <span>Pasión</span>
        </motion.div>
      </div>
    </main>
  );
}
