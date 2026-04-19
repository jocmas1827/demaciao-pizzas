'use client';

import React, { useState } from 'react';
import { MenuItem } from '@/types/menu';
import { useCartStore } from '@/store/cartStore';
import { Plus, ShoppingCart, Star } from 'lucide-react';

interface ProductCardProps {
  product: MenuItem;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { openProductModal, addItem } = useCartStore();
  const [isHovered, setIsHovered] = useState(false);

  const priceKeys = Object.keys(product.prices);
  const hasMultipleSizes = priceKeys.length > 1;
  const firstPrice = product.prices[priceKeys[0]];

  const handleAction = () => {
    if (hasMultipleSizes || product.type === 'Pizza') {
      openProductModal(product);
    } else {
      addItem({
        productId: product.id,
        name: product.name,
        size: priceKeys[0],
        price: firstPrice,
        quantity: 1,
        extras: [],
        type: product.type,
      });
    }
  };

  return (
    <div 
      className="group relative bg-white rounded-[32px] p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative Gradient Background */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-demaciao-red/5 to-transparent rounded-bl-[100px] transition-all duration-500 ${isHovered ? 'scale-150 opacity-100' : 'opacity-50'}`} />

      {/* Product Tag */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <span className="bg-demaciao-red text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-red-500/20">
          {product.type}
        </span>
        {product.type === 'Combo' && (
          <div className="flex items-center gap-1 text-demaciao-yellow bg-demaciao-dark px-2 py-1 rounded-lg">
             <Star className="w-3 h-3 fill-demaciao-yellow" />
             <span className="text-[10px] font-black uppercase tracking-tighter">Imbatible</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 relative z-10">
        <h3 className="font-title text-2xl font-normal text-gray-950 leading-tight uppercase transition-colors group-hover:text-demaciao-red">
          {product.name}
        </h3>
        <p className="text-gray-400 text-sm mt-3 font-medium leading-relaxed line-clamp-3">
          {product.description || 'Nuestra receta secreta con ingredientes seleccionados de primera calidad.'}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-between gap-4 relative z-10">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Desde</span>
          <div className="flex items-baseline gap-1">
            <span className="font-title text-3xl text-gray-950">
              ${firstPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <button
          onClick={handleAction}
          className={`
            relative flex items-center justify-center h-14 rounded-2xl transition-all duration-500 overflow-hidden
            ${isHovered 
              ? 'bg-demaciao-red text-white w-32 shadow-[0_10px_25px_rgba(230,30,37,0.3)]' 
              : 'bg-gray-50 text-gray-400 w-14 border border-gray-100'}
          `}
        >
          <div className="flex items-center gap-2 whitespace-nowrap font-black uppercase tracking-tighter text-xs px-4">
            {isHovered ? (
              <>
                <span>Añadir</span>
                <Plus className="w-5 h-5 stroke-[3px]" />
              </>
            ) : (
              <ShoppingCart className="w-6 h-6" />
            )}
          </div>
        </button>
      </div>

      {/* Border Highlight on Hover */}
      <div className={`absolute inset-0 border-2 border-demaciao-red/10 rounded-[32px] transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  );
}
