'use client';

import React from 'react';
import { useCartStore } from '@/store/cartStore';
import { MenuItem } from '@/types/menu';

// Helper to render the cards matching the screenshot
function MenuCard({ item }: { item: MenuItem }) {
  const openProductModal = useCartStore(s => s.openProductModal);
  const addItem = useCartStore(s => s.addItem);

  const handleAction = () => {
    const priceKeys = Object.keys(item.prices);
    if (priceKeys.length > 1 || item.type === 'Pizza' || item.type === 'Pasta') {
      openProductModal(item);
    } else {
      addItem({
        productId: item.id,
        name: item.name,
        size: priceKeys[0],
        price: item.prices[priceKeys[0]],
        quantity: 1,
        extras: [],
        type: item.type,
      });
    }
  };

  return (
    <div 
      onClick={handleAction}
      className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-red-200 transition-all cursor-pointer flex flex-col justify-between group"
    >
      <div>
        <div className="flex justify-between items-start mb-2 gap-4">
          <h3 className="font-title font-black text-gray-800 text-[17px] md:text-lg uppercase tracking-wide group-hover:text-demaciao-red transition-colors">
            {item.name}
          </h3>
          <div className="bg-[#fff8e1] text-[#ffb800] font-title font-black px-3 py-1 rounded-xl text-[17px] shrink-0 flex items-center justify-center">
            ${Object.values(item.prices)[0].toFixed(2)}
          </div>
        </div>
        <p className="text-[13px] md:text-sm text-gray-500 font-medium leading-relaxed mb-3">
          {item.description}
        </p>
      </div>

      <div className="mt-auto pt-2">
        {item.type === 'Pasta' && (
          <p className="text-xs font-bold text-red-500 tracking-wide">
            Spaguetti • Plumita • Tornillo • Fetuccini
          </p>
        )}
      </div>
    </div>
  );
}

function DessertCard({ item }: { item: MenuItem }) {
  const openProductModal = useCartStore(s => s.openProductModal);
  
  // Placeholder images for desserts if not provided
  const placeholderImg = "https://images.unsplash.com/photo-1563805042-7684c8a9e9ce?q=80&w=800";

  return (
    <div 
      onClick={() => openProductModal(item)}
      className="bg-white rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 hover:shadow-[0_8px_40px_rgba(230,30,37,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col group"
    >
      <div className="h-48 w-full bg-red-50 relative overflow-hidden">
        <div 
           className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-in-out"
           style={{ backgroundImage: `url('${placeholderImg}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
        <div className="absolute bottom-3 right-4 bg-demaciao-yellow/95 backdrop-blur-sm px-3 py-1 rounded-xl shadow-lg border border-yellow-300 pointer-events-none">
          <span className="font-title font-black text-gray-900 text-xl md:text-2xl drop-shadow-sm leading-none">
            ${Object.values(item.prices)[0].toFixed(2)}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow bg-gradient-to-b from-white to-red-50/20">
         <h3 className="font-title text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide group-hover:text-demaciao-red transition-colors line-clamp-2">
           {item.name}
         </h3>
         <p className="text-gray-500 font-medium text-[13px] leading-relaxed flex-grow">
           {item.description}
         </p>
         <div className="mt-4 pt-3 border-t border-red-100 flex items-center text-demaciao-red font-bold text-[13px] group-hover:text-red-700 transition-colors w-max tracking-wide">
           <span className="text-lg leading-none mr-1.5">+</span> Añadir
         </div>
      </div>
    </div>
  );
}

import { PIZZAS, CALZONES, PASTAS, HAMBURGUESAS, COMBOS } from '@/data/menuData';

// Combine items once
const ALL_MENU_ITEMS = [...PIZZAS, ...CALZONES, ...PASTAS, ...HAMBURGUESAS, ...COMBOS];

export default function OtherMenuSections() {
  const calzones = ALL_MENU_ITEMS.filter(i => i.category === 'calzones');
  const pastas = ALL_MENU_ITEMS.filter(i => i.category === 'pastas');
  const pastichos = ALL_MENU_ITEMS.filter(i => i.name.toLowerCase().includes('pasticho'));
  const ensaladas = ALL_MENU_ITEMS.filter(i => i.category === 'ensaladas');
  const postres = ALL_MENU_ITEMS.filter(i => i.category === 'postres');

  return (
    <div className="w-full space-y-20 my-16">
      
      {/* CALZONES */}
      {calzones.length > 0 && (
        <section id="calzones" className="scroll-mt-32">
          <div className="flex flex-col items-center justify-center mb-8">
            <h2 className="font-title text-5xl md:text-6xl font-bold text-orange-500 uppercase tracking-widest text-center mb-4 leading-none">
              CALZONES
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {calzones.map(item => <MenuCard key={item.id} item={item} />)}
          </div>
        </section>
      )}

      {/* PASTAS */}
      {pastas.length > 0 && (
        <section id="pastas" className="scroll-mt-32">
          <div className="flex flex-col items-center justify-center mb-8">
            <h2 className="font-title text-5xl md:text-6xl font-bold text-orange-500 uppercase tracking-widest text-center mb-4 leading-none">
              PASTAS
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {pastas.map(item => <MenuCard key={item.id} item={item} />)}
          </div>
        </section>
      )}

      {/* PASTICHOS */}
      {pastichos.length > 0 && (
        <section id="pastichos" className="scroll-mt-32">
          <div className="flex flex-col items-center justify-center mb-8">
            <h2 className="font-title text-5xl md:text-6xl font-bold text-orange-500 uppercase tracking-widest text-center mb-4 leading-none">
              PASTICHOS
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
            {pastichos.map((item, idx) => (
              <div key={item.id} className={idx === 2 ? "lg:col-span-2" : ""}>
                 <MenuCard item={item} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ENSALADAS */}
      {ensaladas.length > 0 && (
        <section id="ensaladas" className="scroll-mt-32">
          <div className="flex flex-col items-center justify-center mb-8">
            <h2 className="font-title text-5xl md:text-6xl font-bold text-orange-500 uppercase tracking-widest text-center mb-4 leading-none">
              ENSALADAS
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {ensaladas.map(item => <MenuCard key={item.id} item={item} />)}
          </div>
        </section>
      )}

      {/* POSTRES */}
      {postres.length > 0 && (
        <section id="postres" className="scroll-mt-32 pb-4">
          <div className="flex flex-col items-center justify-center mb-8 bg-gradient-to-br from-red-50 to-orange-50 py-10 rounded-[32px] border border-red-100 shadow-sm relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-demaciao-red/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-demaciao-yellow/20 rounded-full blur-2xl"></div>
            
            <h2 className="font-title text-5xl md:text-6xl font-black text-demaciao-red uppercase tracking-widest text-center mb-2 leading-none drop-shadow-sm z-10 relative">
              POSTRES
            </h2>
            <p className="font-title text-xl md:text-2xl text-demaciao-yellow font-bold tracking-[0.2em] uppercase z-10">
              Tasty Cream
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-demaciao-red to-demaciao-yellow mx-auto mt-6 rounded-full z-10"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {postres.map(item => <DessertCard key={item.id} item={item} />)}
          </div>
        </section>
      )}

    </div>
  );
}
