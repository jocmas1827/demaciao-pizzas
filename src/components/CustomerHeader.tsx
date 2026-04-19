'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, ShoppingCart, ChevronDown } from 'lucide-react';

export default function CustomerHeader({ sedeName }: { sedeName: string }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-3 flex items-center justify-between
      ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'}
    `}
    >
      {/* Left: Location Selector Dropdown button */}
      <div className="flex-1">
        <Link href="/">
          <button className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors border
            ${isScrolled 
              ? 'bg-[#4a4a4a] text-white border-transparent hover:bg-black' 
              : 'bg-black/40 backdrop-blur-md text-white hover:bg-black/70 border-white/10'
            }`}
          >
            <MapPin className={`w-4 h-4 ${isScrolled ? 'text-demaciao-yellow' : 'text-demaciao-yellow mt-[-2px]'}`} />
            <span className="hidden sm:inline">{sedeName}</span>
            <ChevronDown className="w-4 h-4 ml-0.5" />
          </button>
        </Link>
      </div>

      {/* Center: Logo & Title (MENÚ) */}
      <div className={`flex-1 flex justify-center items-center gap-3 transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="relative w-8 h-8 rounded-md bg-white border border-gray-200 rotate-45 flex items-center justify-center p-1 shadow-sm overflow-hidden">
             <div className="absolute inset-0 bg-yellow-400/10"></div>
             <span className="text-[12px] font-bold italic text-demaciao-red -rotate-45 leading-none font-title z-10 pr-[2px]">Dp</span>
        </div>
        <span className="font-title text-xl md:text-2xl font-bold text-demaciao-red tracking-wide uppercase">Menú</span>
      </div>

      {/* Right: Cart Button */}
      <div className="flex-1 flex justify-end">
        <button className={`p-3 rounded-xl transition-all duration-300 relative flex items-center justify-center group
          ${isScrolled 
            ? 'bg-red-50 hover:bg-red-100 text-demaciao-red' 
            : 'bg-black/40 backdrop-blur-md text-white hover:bg-black/70 border border-white/10'
          }`}
        >
          <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-2 -right-2 bg-demaciao-yellow text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border border-black/10 shadow-sm">
            0
          </span>
        </button>
      </div>
    </header>
  );
}
