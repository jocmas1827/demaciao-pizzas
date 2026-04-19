'use client';

import React from 'react';
import { MenuItem } from '@/types/menu';
import ProductCard from './ProductCard';

interface MenuCategoryProps {
  id: string;
  name: string;
  items: MenuItem[];
}

export default function MenuCategory({ id, name, items }: MenuCategoryProps) {
  if (items.length === 0) return null;

  return (
    <div id={id} className="pt-24 first:pt-8 scroll-mt-24">
      {/* Category Header */}
      <div className="flex flex-col mb-12 relative">
        <div className="absolute -left-4 top-0 w-1 h-full bg-demaciao-red rounded-full opacity-50" />
        <h2 className="font-title text-5xl md:text-7xl font-normal text-gray-950 uppercase tracking-tight leading-none">
          {name}
        </h2>
        <div className="flex items-center gap-4 mt-4">
          <div className="h-[2px] w-20 bg-demaciao-red" />
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em]">
            {items.length} Variedades disponibles
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
        {items.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
