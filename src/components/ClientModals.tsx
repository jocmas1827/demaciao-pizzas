'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useOrdersStore } from '@/store/ordersStore';
import { MenuItem } from '@/types/menu';
import { ShoppingCart, X, Plus, Minus, Trash2, CheckCircle2, MapPin, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const EXTRAS_PRICES: Record<string, number> = {
  'Pequeña': 1.99,
  'Grande': 2.50,
  'Gigante': 2.99,
  'Extremo': 4.99,
  'Individual 22cm': 1.50,
  'Normal': 1.50,
  'Único': 1.50
};

const EXTRAS_LIST = {
  charcuteria: ['Salchichón', 'Tocineta', 'Pepperoni', 'Jamón', 'Anchoas', 'Chorizo Español'],
  quesos: ['Queso Amarillo', 'Queso Parmesano', 'Queso Pecorino', 'Queso Roquefort', 'Queso Mozzarella'],
  vegetales: ['Maíz', 'Cebolla', 'Tomate', 'Pimentón', 'Champiñones'],
};

export default function ClientModals() {
  const { 
    isProductModalOpen, 
    closeProductModal, 
    selectedProductData,
    addItem,
    isCheckoutOpen,
    closeCheckout,
    items,
    getTotal,
    tasaBcv,
    updateQuantity,
    removeItem,
    openCheckout,
    getItemCount,
    sede,
    clearCart
  } = useCartStore();

  const addOrder = useOrdersStore((state) => state.addOrder);
  const params = useParams();
  const urlSede = (params?.sede as string) || sede || 'aviadores';

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [orderSuccessId, setOrderSuccessId] = useState<string | null>(null);
  const [snapshotBS, setSnapshotBS] = useState(0);

  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [customerError, setCustomerError] = useState('');

  // Reset modal state when opened
  useEffect(() => {
    if (isProductModalOpen && selectedProductData) {
      const sizes = Object.keys((selectedProductData as MenuItem).prices);
      setSelectedSize(sizes[0]);
      setSelectedExtras([]);
      setQuantity(1);
    }
  }, [isProductModalOpen, selectedProductData]);

  const currentTotal = getTotal();
  const ivaCalculated = currentTotal * 0.16;
  const finalTotalUSD = parseFloat((currentTotal + ivaCalculated).toFixed(2));
  const finalTotalBS = parseFloat((finalTotalUSD * (tasaBcv || 479.78)).toFixed(2));
  const itemCount = getItemCount();
  
  // live price preview
  const product = selectedProductData as MenuItem;
  const basePrice = product?.prices[selectedSize] || 0;
  const modalExtraPrice = EXTRAS_PRICES[selectedSize] || 1.99;
  const modalFinalPricePerUnit = basePrice + (selectedExtras.length * modalExtraPrice);

  const handleToggleExtra = (extra: string) => {
    setSelectedExtras(prev =>
      prev.includes(extra) ? prev.filter(e => e !== extra) : [...prev, extra]
    );
  };

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      productId: product.id,
      name: product.name,
      size: selectedSize,
      price: modalFinalPricePerUnit,
      quantity,
      extras: selectedExtras,
      type: product.type
    });
    closeProductModal();
  };

  const handleCompleteOrder = () => {
    if (items.length === 0) return;
    if (!cedula.trim() || !nombre.trim() || !apellido.trim() || !telefono.trim()) {
      setCustomerError('Por favor completa todos los campos para la factura.');
      return;
    }
    setCustomerError('');
    setSnapshotBS(finalTotalBS);

    const id = addOrder({
      sedeId: urlSede,
      items: [...items],
      totalUSD: finalTotalUSD,
      totalBS: finalTotalBS,
      customerName: `${nombre.trim()} ${apellido.trim()} (C.I. ${cedula.trim()})`,
      customerPhone: telefono.trim(),
    });

    localStorage.setItem('demaciao-active-order', JSON.stringify({ orderId: id, sede: urlSede }));
    setOrderSuccessId(id);
    clearCart();
    setCedula(''); setNombre(''); setApellido(''); setTelefono('');
    setTimeout(() => {
      setOrderSuccessId(null);
      closeCheckout();
    }, 5000);
  };

  return (
    <>
      {/* 1. FLOATING CART BUTTON */}
      {!isCheckoutOpen && itemCount > 0 && (
        <div className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-40 flex flex-col items-end gap-2">
          <button
            onClick={openCheckout}
            className="flex items-center gap-3 bg-demaciao-red text-white pl-5 pr-6 py-4 rounded-full shadow-[0_10px_40px_rgba(230,30,37,0.45)] hover:scale-105 active:scale-95 transition-all border border-red-400 group"
          >
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-demaciao-yellow text-black text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border border-yellow-600">
                {itemCount}
              </span>
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="font-title font-black text-sm uppercase tracking-wider">Ver Mi Carrito</span>
              <span className="text-[10px] text-white/80 font-bold mt-0.5">
                ${finalTotalUSD.toFixed(2)} / Bs. {finalTotalBS.toLocaleString()}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 ml-1 opacity-50 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {/* 2. PRODUCT MODAL */}
      {isProductModalOpen && product && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-[40px] w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl relative flex flex-col">
            <button
              onClick={closeProductModal}
              className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-red-50 hover:text-red-600 rounded-full transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto flex-1">
              {/* Header */}
              <div className="p-8 pb-4">
                <span className="bg-demaciao-red/10 text-demaciao-red text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-demaciao-red/20 mb-3 inline-block">
                  {product.type}
                </span>
                <h2 className="font-title text-5xl font-normal text-gray-950 uppercase leading-none">{product.name}</h2>
                <p className="text-gray-400 font-medium mt-4 text-sm">{product.description || 'Nuestra receta secreta con ingredientes seleccionados.'}</p>
              </div>

              {/* Size Selection */}
              {Object.keys(product.prices).length > 1 && (
                <div className="px-8 py-6">
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4">Selecciona el tamaño</p>
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(product.prices).map(([size, price]) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-4 rounded-2xl font-title text-xl uppercase tracking-wider transition-all border-2 ${
                          selectedSize === size 
                            ? 'bg-demaciao-dark text-white border-demaciao-dark shadow-xl' 
                            : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'
                        }`}
                      >
                        {size} — ${price.toFixed(2)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Extras */}
              {product.type === 'Pizza' && (
                <div className="bg-gray-50/50 p-8 border-y border-gray-100 mt-4">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="font-title text-3xl font-normal text-gray-950 uppercase">¿Algo extra?</h3>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1">
                        +${modalExtraPrice.toFixed(2)} p/u
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {(Object.entries(EXTRAS_LIST) as [string, string[]][]).map(([cat, list]) => (
                      <div key={cat}>
                        <h4 className="font-black text-[10px] text-demaciao-red uppercase tracking-widest mb-4 opacity-70">{cat}</h4>
                        <div className="space-y-3">
                          {list.map(e => (
                            <label key={e} className="flex items-center gap-3 cursor-pointer group">
                              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                                selectedExtras.includes(e) ? 'bg-demaciao-red border-demaciao-red text-white' : 'bg-white border-gray-200'
                              }`}>
                                {selectedExtras.includes(e) && <CheckCircle2 className="w-3.5 h-3.5" />}
                              </div>
                              <input
                                type="checkbox"
                                className="hidden"
                                checked={selectedExtras.includes(e)}
                                onChange={() => handleToggleExtra(e)}
                              />
                              <span className={`text-xs font-bold transition-colors ${selectedExtras.includes(e) ? 'text-gray-900' : 'text-gray-400'}`}>{e}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-8 pt-6 bg-white border-t border-gray-100 flex flex-col sm:flex-row items-center gap-6">
              <div className="flex items-center bg-gray-100 rounded-2xl p-1.5">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 bg-white rounded-xl shadow-sm hover:text-demaciao-red transition-colors"><Minus className="w-5 h-5" /></button>
                <span className="w-14 text-center font-black text-xl">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="p-3 bg-white rounded-xl shadow-sm hover:text-green-500 transition-colors"><Plus className="w-5 h-5" /></button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 w-full bg-demaciao-yellow hover:bg-yellow-500 text-black py-5 rounded-2xl font-title font-black text-xl uppercase tracking-widest transition-all shadow-xl shadow-yellow-400/20 active:scale-95"
              >
                Añadir — ${(modalFinalPricePerUnit * quantity).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. CHECKOUT SIDE PANEL */}
      {isCheckoutOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-300" onClick={closeCheckout} />
          <div className="fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-500">
            
            <div className="p-10 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white">
              <div>
                <h2 className="font-title text-5xl font-normal text-gray-950 uppercase leading-none tracking-tight">Tu Pedido</h2>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-3">Sabor de Demaciao listo para llevar</p>
              </div>
              <button onClick={closeCheckout} className="p-4 bg-gray-50 hover:bg-red-50 hover:text-red-600 rounded-2xl transition-all shadow-sm">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-300">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingCart className="w-10 h-10" />
                  </div>
                  <p className="font-black uppercase tracking-widest text-sm">Tu carrito está vacío</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="w-20 h-20 bg-gray-50 rounded-[20px] flex items-center justify-center shrink-0 border border-gray-100 text-4xl shadow-sm group-hover:scale-105 transition-transform">
                      {item.type === 'Pizza' ? '🍕' : item.type === 'Hamburguesa' ? '🍔' : item.type === 'Pasta' ? '🍝' : '🎁'}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-black text-gray-900 uppercase tracking-tight text-base leading-none">
                            {item.name}
                          </h4>
                          <p className="text-[10px] text-demaciao-red font-black uppercase tracking-widest mt-1.5">{item.size}</p>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      
                      {item.extras.length > 0 && (
                        <p className="text-[10px] text-gray-400 font-medium leading-tight mt-2 italic">
                          +{item.extras.join(', ')}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center bg-gray-100 rounded-xl p-1">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black font-black">-</button>
                          <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black font-black">+</button>
                        </div>
                        <span className="font-title font-black text-lg text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

             {items.length > 0 && (
               <div className="px-8 pb-4">
                 <div className="bg-gray-50 rounded-[32px] p-6 border border-gray-100">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">📋 Datos de Facturación</p>
                   <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                       <div>
                         <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1.5 ml-1">Cédula</label>
                         <input
                           value={cedula}
                           onChange={e => { setCedula(e.target.value); setCustomerError(''); }}
                           placeholder="V-12345678"
                           className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-demaciao-red focus:ring-1 focus:ring-demaciao-red bg-white font-bold"
                         />
                       </div>
                       <div>
                         <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1.5 ml-1">Nombre</label>
                         <input
                           value={nombre}
                           onChange={e => { setNombre(e.target.value); setCustomerError(''); }}
                           placeholder="Carlos"
                           className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-demaciao-red focus:ring-1 focus:ring-demaciao-red bg-white font-bold"
                         />
                       </div>
                     </div>
                     <div>
                       <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1.5 ml-1">Apellido</label>
                       <input
                         value={apellido}
                         onChange={e => { setApellido(e.target.value); setCustomerError(''); }}
                         placeholder="Rodríguez"
                         className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-demaciao-red focus:ring-1 focus:ring-demaciao-red bg-white font-bold"
                       />
                     </div>
                     <div>
                       <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1.5 ml-1">Teléfono (WhatsApp)</label>
                       <input
                         value={telefono}
                         onChange={e => { setTelefono(e.target.value); setCustomerError(''); }}
                         placeholder="04121234567"
                         className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-demaciao-red focus:ring-1 focus:ring-demaciao-red bg-white font-bold"
                       />
                     </div>
                   </div>
                   {customerError && (
                     <p className="text-[10px] text-red-500 font-black mt-3 ml-1 uppercase">{customerError}</p>
                   )}
                 </div>
               </div>
             )}

            {items.length > 0 && (
              <div className="p-8 bg-white border-t border-gray-100 shrink-0">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-gray-500 font-bold">
                    <span>Subtotal</span>
                    <span>${currentTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 font-bold">
                    <span>IVA (16%)</span>
                    <span>${ivaCalculated.toFixed(2)}</span>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
                    <div>
                      <p className="font-black text-gray-900 uppercase text-[10px] tracking-widest mb-1">Total a Pagar</p>
                      <p className="font-title font-normal text-6xl text-demaciao-red leading-none">
                        ${finalTotalUSD.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-yellow-600 uppercase tracking-widest mb-1">En Bolívares</p>
                      <p className="font-title font-normal text-3xl text-yellow-600 leading-none">
                        Bs. {finalTotalBS.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCompleteOrder}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-green-500/20 transition-all uppercase tracking-[0.2em] text-lg active:scale-95"
                >
                  ✓ Confirmar Pedido
                </button>
              </div>
            )}

            {/* Success screen */}
            {orderSuccessId && (
              <div className="absolute inset-0 bg-white z-[60] flex flex-col items-center justify-center p-12 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-8 border-4 border-green-100 animate-bounce">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h2 className="font-title text-6xl font-normal text-gray-950 mb-6 uppercase leading-[0.9]">¡Pedido<br/>Confirmado!</h2>
                <p className="text-gray-400 font-medium mb-10 px-4">Tu orden ya está en la cocina. Prepárate para el mejor sabor.</p>
                
                <div className="bg-gray-50 rounded-[40px] p-10 border border-gray-100 w-full mb-10 shadow-inner">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4">Tu Ticket de Orden</p>
                  <p className="font-title font-normal text-6xl text-gray-950 tracking-widest mb-6">{orderSuccessId}</p>
                  <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Cancelado</span>
                    <span className="font-title font-normal text-3xl text-demaciao-red">${finalTotalUSD.toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  href={`/${urlSede}/seguimiento/${orderSuccessId}`}
                  onClick={() => { setOrderSuccessId(null); closeCheckout(); }}
                  className="w-full flex items-center justify-center gap-3 bg-gray-950 hover:bg-black text-white font-black py-5 rounded-2xl transition-all shadow-xl text-sm uppercase tracking-[0.2em]"
                >
                  <MapPin className="w-5 h-5 text-demaciao-yellow" />
                  Seguir Pedido en Vivo
                </Link>

                <button
                  onClick={() => { setOrderSuccessId(null); closeCheckout(); }}
                  className="mt-6 text-gray-400 hover:text-gray-600 font-black text-[10px] uppercase tracking-widest underline"
                >
                  Volver al Menú
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
