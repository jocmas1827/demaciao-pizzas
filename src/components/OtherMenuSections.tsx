'use client';

import React from 'react';
import { useCartStore } from '@/store/cartStore';

const CALZONES = [
  { id: 'cal1', name: 'Calzone Clásico', desc: 'Salsa Nápoles y Queso Mozzarella (Opcional: Pepperoni o Jamón).', price: 5.00 },
  { id: 'cal2', name: 'Calzone Especial', desc: 'Salsa Nápoles, Queso Mozzarella y Pepperoni (Opcional: Jamón, Maíz y Champiñones).', price: 5.50 },
];

const PASTAS = [
  { id: 'pas1', name: 'NAPOLI', desc: 'Salsa de tomate, especias y albahaca', price: 4.50, subtext: 'Spaguetti • Plumita • Tornillo • Fetuccini' },
  { id: 'pas2', name: 'BOLOÑA', desc: 'Salsa de carne y tomate y especias', price: 4.99, subtext: 'Spaguetti • Plumita • Tornillo • Fetuccini' },
  { id: 'pas3', name: 'CARBONARA', desc: 'Salsa blanca, amarilla de huevo, queso maduro, tocineta y pimienta', price: 5.99, subtext: 'Spaguetti • Plumita • Tornillo • Fetuccini' },
  { id: 'pas4', name: 'PESTO', desc: 'Aceite de oliva, ajo, albahaca y parmesano', price: 4.99, subtext: 'Spaguetti • Plumita • Tornillo • Fetuccini' },
  { id: 'pas5', name: '4 QUESOS', desc: 'Salsa blanca con queso amarillo, pecorino, mozzarella y queso roquefort', price: 5.99, subtext: 'Spaguetti • Plumita • Tornillo • Fetuccini' },
  { id: 'pas6', name: 'MATRICCIANA', desc: 'Salsa napole, tocineta, cebolla, aceite y pecorino', price: 5.99, subtext: 'Spaguetti • Plumita • Tornillo • Fetuccini' },
  { id: 'pas7', name: 'PASTA AL HORNO', desc: 'Salsa blanca, salsa roja, queso parmesano, queso mozzarella, maíz, champiñones, bolitas de carne, jamón, cebolla y pimentón', price: 7.50 },
  { id: 'pas8', name: 'TRIS DE PASTAS', desc: 'Pasta napolitana, pasta pesto y pasta 4 quesos', price: 4.99 },
  { id: 'pas9', name: 'BERENJENAS AL GRATÉN', desc: 'Láminas de berenjenas con queso parmesano gratinado', price: 5.99 },
];

const PASTICHOS = [
  { id: 'pst1', name: 'PASTICHO PEQUEÑO', desc: '400gr de pasticho + pan con mantequilla y ajo', price: 4.99 },
  { id: 'pst2', name: 'PASTICHO MEDIANO', desc: '700gr de pasticho + 2 rodajas de pan con mantequilla y ajo', price: 7.99 },
  { id: 'pst3', name: 'PASTICHO FAMILIAR', desc: '5kg de pasticho + 20 rodajas de pan con mantequilla y ajo', price: 49.99, note: 'Se realizan con un día de anticipación' },
];

const ENSALADAS = [
  { id: 'ens1', name: 'CÉSAR CON POLLO', desc: 'Lechuga, tocineta crunch, pollo, crotones de pan, queso pecorino, aderezo césar', price: 6.50 },
  { id: 'ens2', name: 'BACON RANCH', desc: 'Lechuga, tocineta, maíz, queso amarillo, salsa ranch', price: 6.50 },
  { id: 'ens3', name: 'ITALIANA', desc: 'Lechuga, tomate, aceitunas, pecorino, mozzarella, aderezo pesto', price: 6.50 },
  { id: 'ens4', name: 'AMERICANA', desc: 'Lechuga, maíz, cebolla, pimentón, champiñón, aderezo miel mostaza', price: 6.50 },
  { id: 'ens5', name: 'CÉSAR CLÁSICA', desc: 'Lechuga, tocineta crunch, crotones de pan, queso pecorino, aderezo césar', price: 5.50 },
];

const POSTRES = [
  { id: 'pos1', name: 'BARQUILLA CLÁSICA', desc: '1 Topping sencillo', price: 0.99, image: 'https://images.unsplash.com/photo-1558500585-618844855219?q=80&w=800' },
  { id: 'pos2', name: 'BARQUILLA CIAO', desc: 'Topping + Sirope', price: 1.50, image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=800' },
  { id: 'pos3', name: '2 BARQUILLAS CLÁSICAS', desc: 'Promo: Sin topping', price: 1.70, image: 'https://images.unsplash.com/photo-1558500585-618844855219?q=80&w=800' },
  { id: 'pos4', name: 'SUNDAE CLÁSICO', desc: '1 Topping + Sirope', price: 1.99, image: 'https://images.unsplash.com/photo-1563805042-7684c8a9e9ce?q=80&w=800' },
  { id: 'pos5', name: '3 SUNDAES CLÁSICOS', desc: 'Promo: 1 Topping + Sirope', price: 4.99, image: 'https://images.unsplash.com/photo-1563805042-7684c8a9e9ce?q=80&w=800' },
  { id: 'pos6', name: 'SUNDAE OREO', desc: 'Sirope de chocolate', price: 2.50, image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800' },
  { id: 'pos7', name: '2 SUNDAES OREO', desc: 'Promo: Sirope de chocolate', price: 3.99, image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800' },
  { id: 'pos8', name: '3 SUNDAES OREO', desc: 'Promo: Sirope de chocolate', price: 5.99, image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800' },
  { id: 'pos9', name: 'CESTA DE HELADO', desc: 'Topping + Sirope', price: 2.99, image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=800' },
  { id: 'pos10', name: 'BROWNIE CON HELADO', desc: '+ Sirope', price: 3.50, image: 'https://images.unsplash.com/photo-1606502973842-f64bc2785fe5?q=80&w=800' },
  { id: 'pos11', name: 'TASTY PING PONG', desc: 'Topping de ping pong maní cubierto de chocolate con leche + sirope de chocolate', price: 3.50, image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=800' },
  { id: 'pos12', name: 'TASTY 3 LECHES', desc: 'Topping canela, ponqué vainilla, leche condensada', price: 3.50, image: 'https://images.unsplash.com/photo-1554902641-69ab9fc22a61?q=80&w=800' },
];

// Helper to render the cards matching the screenshot
function MenuCard({ item, type }: { item: any; type: string }) {
  const openProductModal = useCartStore(s => s.openProductModal);

  const handleAdd = () => {
    openProductModal({
      id: item.id,
      name: item.name,
      size: 'Regular', 
      price: item.price,
      desc: item.desc,
      type: type,
    });
  };

  return (
    <div 
      onClick={handleAdd}
      className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-red-200 transition-all cursor-pointer flex flex-col justify-between group"
    >
      <div>
        <div className="flex justify-between items-start mb-2 gap-4">
          <h3 className="font-title font-black text-gray-800 text-[17px] md:text-lg uppercase tracking-wide group-hover:text-demaciao-red transition-colors">
            {item.name}
          </h3>
          <div className="bg-[#fff8e1] text-[#ffb800] font-title font-black px-3 py-1 rounded-xl text-[17px] shrink-0 flex items-center justify-center">
            ${item.price.toFixed(2)}
          </div>
        </div>
        <p className="text-[13px] md:text-sm text-gray-500 font-medium leading-relaxed mb-3">
          {item.desc}
        </p>
      </div>

      <div className="mt-auto pt-2">
        {item.subtext && (
          <p className="text-xs font-bold text-red-500 tracking-wide">
            {item.subtext}
          </p>
        )}
        {item.note && (
          <p className="text-xs font-black text-[#ffb800] tracking-wide mt-1 flex items-center gap-1.5">
            <span className="text-[#ffb800]">📌</span> {item.note}
          </p>
        )}
      </div>
    </div>
  );
}

function DessertCard({ item }: { item: any }) {
  const openProductModal = useCartStore(s => s.openProductModal);

  const handleAdd = () => {
    openProductModal({
      id: item.id,
      name: item.name,
      size: 'Único', 
      price: item.price,
      desc: item.desc,
      type: 'Postre',
    });
  };

  return (
    <div 
      onClick={handleAdd}
      className="bg-white rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 hover:shadow-[0_8px_40px_rgba(230,30,37,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col group"
    >
      <div className="h-48 w-full bg-red-50 relative overflow-hidden">
        <div 
           className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-in-out"
           style={{ backgroundImage: `url('${item.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
        <div className="absolute bottom-3 right-4 bg-demaciao-yellow/95 backdrop-blur-sm px-3 py-1 rounded-xl shadow-lg border border-yellow-300 pointer-events-none">
          <span className="font-title font-black text-gray-900 text-xl md:text-2xl drop-shadow-sm leading-none">
            ${item.price.toFixed(2)}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow bg-gradient-to-b from-white to-red-50/20">
         <h3 className="font-title text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide group-hover:text-demaciao-red transition-colors line-clamp-2">
           {item.name}
         </h3>
         <p className="text-gray-500 font-medium text-[13px] leading-relaxed flex-grow">
           {item.desc}
         </p>
         <div className="mt-4 pt-3 border-t border-red-100 flex items-center text-demaciao-red font-bold text-[13px] group-hover:text-red-700 transition-colors w-max tracking-wide">
           <span className="text-lg leading-none mr-1.5">+</span> Añadir
         </div>
      </div>
    </div>
  );
}

export default function OtherMenuSections() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-20 my-16">
      
      {/* CALZONES */}
      <section id="calzones" className="scroll-mt-32">
        <div className="flex flex-col items-center justify-center mb-8">
          <h2 className="font-title text-5xl md:text-6xl font-bold text-orange-500 uppercase tracking-widest text-center mb-4 leading-none">
            CALZONES
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {CALZONES.map(item => <MenuCard key={item.id} item={item} type="Calzone" />)}
        </div>
      </section>

      {/* PASTAS */}
      <section id="pastas" className="scroll-mt-32">
        <div className="flex flex-col items-center justify-center mb-8">
          <h2 className="font-title text-5xl md:text-6xl font-bold text-orange-500 uppercase tracking-widest text-center mb-4 leading-none">
            PASTAS
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {PASTAS.map(item => <MenuCard key={item.id} item={item} type="Pasta" />)}
        </div>
      </section>

      {/* PASTICHOS */}
      <section id="pastichos" className="scroll-mt-32">
        <div className="flex flex-col items-center justify-center mb-8">
          <h2 className="font-title text-5xl md:text-6xl font-bold text-orange-500 uppercase tracking-widest text-center mb-4 leading-none">
            PASTICHOS
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
          {PASTICHOS.map((item, idx) => (
            <div key={item.id} className={idx === 2 ? "lg:col-span-2" : ""}>
               <MenuCard item={item} type="Pasticho" />
            </div>
          ))}
        </div>
      </section>

      {/* ENSALADAS */}
      <section id="ensaladas" className="scroll-mt-32">
        <div className="flex flex-col items-center justify-center mb-8">
          <h2 className="font-title text-5xl md:text-6xl font-bold text-orange-500 uppercase tracking-widest text-center mb-4 leading-none">
            ENSALADAS
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {ENSALADAS.map(item => <MenuCard key={item.id} item={item} type="Ensalada" />)}
        </div>
      </section>

      {/* POSTRES (Tasty Cream) */}
      <section id="postres" className="scroll-mt-32 pb-4">
        <div className="flex flex-col items-center justify-center mb-8 bg-gradient-to-br from-red-50 to-orange-50 py-10 rounded-[32px] border border-red-100 shadow-sm relative overflow-hidden">
          {/* Decorative splashes */}
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
          {POSTRES.map(item => <DessertCard key={item.id} item={item} />)}
        </div>
      </section>

      {/* Empty Sections for Navigation targets */}
      {['acompañantes', 'bebidas'].map(sec => (
        <section key={sec} id={sec} className="scroll-mt-32 pt-8">
          <div className="flex flex-col items-center justify-center opacity-40">
            <h2 className="font-title text-2xl font-bold text-gray-400 uppercase tracking-widest text-center">
              {sec}
            </h2>
            <p className="text-sm mt-2">Próximamente...</p>
          </div>
        </section>
      ))}

    </div>
  );
}
