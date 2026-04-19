'use client';

import React from 'react';
import { useCartStore } from '@/store/cartStore';

export default function ComboCard({ combo }: { combo: any }) {
  const openProductModal = useCartStore((state) => state.openProductModal);

  const handleOpenModal = () => {
    openProductModal({
      id: `combo-${combo.id}`,
      name: combo.title,
      price: combo.price,
      size: combo.sizeLabel,
      desc: combo.desc,
      type: 'Combo'
    });
  };

  return (
    <div onClick={handleOpenModal} className="bg-white rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_40px_rgba(230,30,37,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer group">
      {/* Image Area */}
      <div className="h-64 w-full bg-gray-100 relative overflow-hidden">
         <div 
            className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-in-out"
            style={{ backgroundImage: `url('${combo.image}')` }}
         />
         
         {/* Top Left Tag */}
         <div className="absolute top-0 left-0 bg-demaciao-red/95 backdrop-blur-sm text-white py-1.5 px-4 rounded-br-2xl font-bold text-sm tracking-wide z-10 flex items-center gap-1.5 shadow-md">
           <span className="scale-75 origin-center">📐</span> {combo.sizeLabel}
         </div>
         
         {/* Gradient overlay for price */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
         
         {/* Bottom Right Price */}
         <div className="absolute bottom-4 right-5 font-title text-4xl text-demaciao-yellow font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-10">
           ${combo.price.toFixed(2)}
         </div>
      </div>
      
      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow">
         <h3 className="font-title text-2xl font-bold text-demaciao-red mb-3 uppercase tracking-wide">
           {combo.title}
         </h3>
         <p className="text-gray-600 font-light text-[15px] leading-relaxed flex-grow mb-6">
           {combo.desc}
         </p>
         <div className="flex items-center text-demaciao-red/80 font-medium text-sm group-hover:text-demaciao-red transition-colors w-max">
           <span className="text-lg leading-none mr-1.5">+</span> Ver detalles
         </div>
      </div>
    </div>
  );
}
