'use client';

import React from 'react';
import { useCartStore } from '@/store/cartStore';

// Data strictly extracted from the provided reference images
const PIZZAS = [
  { id: 'p1', name: 'MARGARITA', desc: 'Salsa, queso mozzarella', prices: { pequena: 4.00, grande: 7.00, gigante: 9.00 } },
  { id: 'p2', name: 'NAPOLITANA', desc: 'Salsa, queso mozzarella y jamón', prices: { pequena: 4.50, grande: 7.50, gigante: 10.50 } },
  { id: 'p3', name: '3 SABORES', desc: 'Salsa, queso mozzarella y 3 Ingredientes a elección', prices: { pequena: 8.00, grande: 12.00, gigante: 16.00 } },
  { id: 'p4', name: 'PRIMAVERA', desc: 'Salsa, queso mozzarella, jamón, anchoas y maíz', prices: { pequena: 5.50, grande: 10.00, gigante: 14.00 } },
  { id: 'p5', name: 'AHUMADA ESPECIAL', desc: 'Salsa, queso mozzarella, jamón, anchoas, cebolla, champiñones, salsa ahumada, pimentón y tocineta', prices: { pequena: 7.00, grande: 11.50, gigante: 17.00 } },
  { id: 'p6', name: 'AMERICANA ESPECIAL', desc: 'Salsa, queso mozzarella, jamón, tocineta, cebolla, queso amarillo, pimentón y champiñones', prices: { pequena: 7.50, grande: 11.50, gigante: 16.50 } },
  { id: 'p7', name: 'DEMACIAO', desc: 'Salsa, queso mozzarella, jamón, tomates, tocineta, cebolla y queso parmesano', prices: { pequena: 7.50, grande: 11.00, gigante: 15.00 } },
  { id: 'p8', name: 'DOBLE', desc: 'Salsa, queso mozzarella, doble jamón, salchichón y anchoas', prices: { pequena: 9.50, grande: 16.00, gigante: 23.50 } },
  { id: 'p9', name: 'ESPECIAL', desc: 'Salsa, queso mozzarella, jamón, anchoas, cebolla, pimentón, champiñones y salchichón', prices: { pequena: 8.50, grande: 14.00, gigante: 20.00 } },
  { id: 'p10', name: 'ITALIANA', desc: 'Salsa, queso mozzarella, jamón, pepperoni, anchoas, orégano y queso roquefort', prices: { pequena: 7.50, grande: 12.00, gigante: 17.50 } },
  { id: 'p11', name: '4 ESTACIONES', desc: 'Salsa, queso mozzarella, maíz, champiñones, aceitunas negras, tocineta y pepperoni', prices: { pequena: 7.50, grande: 12.00, gigante: 17.00 } },
  { id: 'p12', name: 'AHUMADA', desc: 'Salsa, queso mozzarella, jamón, salsa ahumada, tocineta y anchoas', prices: { pequena: 6.50, grande: 10.00, gigante: 15.00 } },
  { id: 'p13', name: 'AMERICANA', desc: 'Salsa, queso mozzarella, jamón, tocineta, queso amarillo', prices: { pequena: 6.50, grande: 10.00, gigante: 15.00 } },
  { id: 'p14', name: 'VIENESA', desc: 'Salsa, queso mozzarella, jamón, tocineta, maíz, salchichón', prices: { pequena: 8.00, grande: 12.50, gigante: 18.00 } },
  { id: 'p15', name: '4 QUESOS', desc: 'Salsa, queso mozzarella, queso amarillo, parmesano y pecorino', prices: { pequena: 9.00, grande: 14.00, gigante: 19.00 } },
  { id: 'p16', name: 'VEGETARIANA', desc: 'Salsa, queso mozzarella, cebolla, champiñón, pimentón, aceituna y maíz', prices: { pequena: 6.00, grande: 10.00, gigante: 14.00 } },
  { id: 'p17', name: 'ESPAÑOLA', desc: 'Salsa, queso mozzarella, jamón, chorizo español y queso roquefort', prices: { pequena: 7.00, grande: 11.00, gigante: 15.50 } },
  { id: 'p18', name: 'CAPRESSA', desc: 'Salsa, queso mozzarella, tomate, salsa pesto y queso perla', prices: { pequena: 6.00, grande: 8.00, gigante: 12.00 } },
];

const EXTRAS = {
  charcuteria: ['Salchichón', 'Tocineta', 'Pepperoni', 'Jamón', 'Anchoas', 'Chorizo Español'],
  quesos: ['Queso Amarillo', 'Queso Parmesano', 'Queso Pecorino', 'Queso Roquefort', 'Queso Mozzarella'],
  vegetales: ['Maíz', 'Cebolla', 'Tomate', 'Pimentón', 'Champiñones'],
};

export default function PizzasTable() {
  const openProductModal = useCartStore((state) => state.openProductModal);

  const handleAddPizza = (pizza: any, size: string, price: number) => {
    openProductModal({
      id: pizza.id,
      name: pizza.name,
      size,
      price,
      desc: pizza.desc,
      type: 'Pizza'
    });
  };

  return (
    <div id="pizzas-tradicionales" className="w-full max-w-5xl mx-auto my-16 scroll-mt-32">
      
      {/* SECTION TITLE & ICONS */}
      <div className="flex flex-col items-center justify-center mb-8">
        <h2 className="font-title text-5xl md:text-6xl font-bold text-orange-500 uppercase tracking-widest text-center mb-4 leading-none">
          PIZZAS
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto mb-10"></div>

        <div className="flex items-end justify-center gap-8 md:gap-20 text-center font-title mt-4">
          <div className="flex flex-col items-center">
            {/* Si tienes las imagenes locales, puedes cambiarlas por <img src="/pizza-icon.png"> */}
            <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center mb-2 overflow-hidden border border-gray-100 origin-bottom transition-transform hover:scale-110">
              <span className="text-2xl drop-shadow-sm">🍕</span>
            </div>
            <span className="text-xs md:text-sm font-bold mt-1 text-gray-800">PEQUEÑA</span>
            <span className="text-demaciao-yellow text-xs md:text-sm font-black">25cm</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mb-2 overflow-hidden border border-gray-100 origin-bottom transition-transform hover:scale-110">
              <span className="text-4xl drop-shadow-sm">🍕</span>
            </div>
            <span className="text-xs md:text-sm font-bold mt-1 text-gray-800">GRANDE</span>
            <span className="text-demaciao-yellow text-xs md:text-sm font-black">33cm</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center mb-2 overflow-hidden border border-gray-100 origin-bottom transition-transform hover:scale-110">
              <span className="text-6xl drop-shadow-sm">🍕</span>
            </div>
            <span className="text-xs md:text-sm font-bold mt-1 text-gray-800">GIGANTE</span>
            <span className="text-demaciao-yellow text-xs md:text-sm font-black">40cm</span>
          </div>
        </div>
      </div>

      {/* PIZZAS TABLE */}
      <div className="bg-white rounded-[12px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden border border-gray-100 mt-6">
        
        {/* Table Header */}
        <div className="bg-[#e61e25] text-white flex items-center px-4 md:px-8 py-3.5 w-full">
          <div className="flex-1 font-title font-bold tracking-widest text-lg md:text-xl">PIZZA</div>
          <div className="hidden md:flex gap-8 lg:gap-16 justify-end w-1/2 mt-1">
             <div className="text-center w-20">
               <span className="block text-[10px] md:text-xs uppercase font-bold leading-none">PEQUEÑA</span>
               <span className="text-[10px] md:text-xs font-medium opacity-90">25cm</span>
             </div>
             <div className="text-center w-20">
               <span className="block text-[10px] md:text-xs uppercase font-bold leading-none">GRANDE</span>
               <span className="text-[10px] md:text-xs font-medium opacity-90">33cm</span>
             </div>
             <div className="text-center w-20">
               <span className="block text-[10px] md:text-xs uppercase font-bold leading-none">GIGANTE</span>
               <span className="text-[10px] md:text-xs font-medium opacity-90">40cm</span>
             </div>
          </div>
        </div>

        {/* Table Rows */}
        <div className="flex flex-col w-full">
          {PIZZAS.map((pizza, idx) => (
            <div key={pizza.id} className="flex flex-col md:flex-row md:items-center px-4 md:px-8 py-4 border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
              <div className="flex-1 pr-6 mb-3 md:mb-0">
                <h3 className="font-title font-black text-gray-800 text-[15px] md:text-base uppercase tracking-wide">{pizza.name}</h3>
                <p className="text-[13px] font-medium text-gray-400 mt-0.5">{pizza.desc}</p>
              </div>
              <div className="flex justify-between md:justify-end gap-8 lg:gap-16 w-full md:w-1/2 mt-2 md:mt-0 items-center">
                <button 
                  onClick={() => handleAddPizza(pizza, 'Pequeña', pizza.prices.pequena)}
                  className="text-center w-20 font-title font-black text-[#ffb800] text-lg md:text-xl hover:scale-110 transition-transform hover:text-orange-500"
                >
                  ${pizza.prices.pequena.toFixed(2)}
                </button>
                <button 
                  onClick={() => handleAddPizza(pizza, 'Grande', pizza.prices.grande)}
                  className="text-center w-20 font-title font-black text-[#ffb800] text-lg md:text-xl hover:scale-110 transition-transform hover:text-orange-500"
                >
                  ${pizza.prices.grande.toFixed(2)}
                </button>
                <button 
                  onClick={() => handleAddPizza(pizza, 'Gigante', pizza.prices.gigante)}
                  className="text-center w-20 font-title font-black text-[#ffb800] text-lg md:text-xl hover:scale-110 transition-transform hover:text-orange-500"
                >
                  ${pizza.prices.gigante.toFixed(2)}
                </button>
              </div>
            </div>
          ))}

          {/* Pizza Extrema Row */}
          <div className="bg-[#fff5f5] flex flex-col md:flex-row md:items-center justify-between px-4 md:px-8 py-5 border-b border-red-100 hover:bg-red-50 transition-colors cursor-pointer group" onClick={() => handleAddPizza({id: 'pext', name: 'PIZZA EXTREMA'}, 'Extremo', 31.50)}>
            <div className="pr-6 mb-3 md:mb-0">
              <h3 className="font-title font-black text-[#ffb800] text-lg md:text-xl uppercase tracking-wide flex items-center gap-2">
                PIZZA EXTREMA <span className="text-xl">🔥</span>
              </h3>
              <p className="text-[13px] font-medium text-gray-500 mt-0.5">La pizza más grande! Todos los sabores que quieras</p>
              <p className="text-[13px] font-bold text-[#ffb800] mt-0.5">¡Tamaño Extremo!</p>
            </div>
            <div className="font-title font-black text-[#ffb800] text-2xl md:text-3xl md:pr-4 group-hover:scale-105 transition-transform">
              $31.50
            </div>
          </div>
        </div>

        {/* Extras Footer */}
        <div className="bg-[#fff5f5] px-4 md:px-8 py-10 w-full rounded-b-[12px]">
           
           <h4 className="font-title text-[15px] font-bold uppercase tracking-widest text-center text-gray-700 flex items-center justify-center gap-2 mb-8">
              <span>🧀</span> AGREGA EXTRAS A TU PIZZA
           </h4>

           {/* Price tags for extras */}
           <div className="flex justify-center gap-[18px] mb-10">
              <div className="bg-white px-[18px] py-1.5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                 <span className="text-[11px] text-gray-500 font-bold mb-0.5 tracking-wide">Pequeña</span>
                 <span className="text-[#ffb800] font-title font-black text-[17px] leading-none">$1.99</span>
              </div>
              <div className="bg-white px-[18px] py-1.5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                 <span className="text-[11px] text-gray-500 font-bold mb-0.5 tracking-wide">Grande</span>
                 <span className="text-[#ffb800] font-title font-black text-[17px] leading-none">$2.50</span>
              </div>
              <div className="bg-white px-[18px] py-1.5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                 <span className="text-[11px] text-gray-500 font-bold mb-0.5 tracking-wide">Gigante</span>
                 <span className="text-[#ffb800] font-title font-black text-[17px] leading-none">$2.99</span>
              </div>
           </div>

           {/* Lists of extras */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-3xl mx-auto pl-2 md:pl-10">
              
              <div className="flex flex-col">
                <h5 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm"><span className="text-base text-red-400">🥩</span> Charcutería</h5>
                <ul className="flex flex-col gap-1.5 text-[13px] font-medium text-gray-500">
                  {EXTRAS.charcuteria.map(item => <li key={item} className="hover:text-demaciao-red transition-colors cursor-default">{item}</li>)}
                </ul>
              </div>
              
              <div className="flex flex-col">
                <h5 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm"><span className="text-base text-yellow-500">🧀</span> Quesos</h5>
                <ul className="flex flex-col gap-1.5 text-[13px] font-medium text-gray-500">
                  {EXTRAS.quesos.map(item => <li key={item} className="hover:text-demaciao-red transition-colors cursor-default">{item}</li>)}
                </ul>
              </div>

              <div className="flex flex-col">
                <h5 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm"><span className="text-base text-green-500">🥦</span> Vegetales</h5>
                <ul className="flex flex-col gap-1.5 text-[13px] font-medium text-gray-500">
                  {EXTRAS.vegetales.map(item => <li key={item} className="hover:text-demaciao-red transition-colors cursor-default">{item}</li>)}
                </ul>
              </div>

           </div>
        </div>

      </div>
    </div>
  );
}
