'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DeliveryMapPicker from '@/components/DeliveryMapPicker';
import SedeSelector from '@/components/SedeSelector';
import { ShoppingCart, Plus, Minus, Trash2, Send, Upload, Bike, X, ChevronDown, Phone, MapPin, Clock, Instagram, Flame, Star, Zap } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MenuItem, PizzaSize, CartItem, CartExtra, ComboItem, IceCreamFlavor } from '@/types/menu';
import { categoryLabels, categoryOrder, IVA_RATE, initialCombos } from '@/data/menuData';
import { calculateExactBs, calculateLineTotal, calculateOrderTotalBs, calculateOrderTotals, formatMoney, roundMoney } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

// Using remote URLs for missing assets to ensure immediate visual parity
const logo = "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=200&auto=format&fit=crop";
const heroPizza = "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop";
const pizzaSmall = "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=100&auto=format&fit=crop";
const pizzaMedium = "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=150&auto=format&fit=crop";
const pizzaLarge = "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=200&auto=format&fit=crop";
const comboImg1 = "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=300&auto=format&fit=crop";

const comboImages = [comboImg1, comboImg1, comboImg1, comboImg1];
const comboImageOverrides: Record<number, string> = { };

const sizeImages: Record<PizzaSize, string> = {
  pequeña: pizzaSmall,
  grande: pizzaMedium,
  gigante: pizzaLarge,
};
const sizeCm: Record<PizzaSize, string> = {
  pequeña: '25cm',
  grande: '33cm',
  gigante: '40cm',
};

// Slugs that allow hamburguesas
const HAMBURGUESA_SLUGS = ['turmero', 'samanes1', 'samanes2', 'unicentro'];

const Index: React.FC = () => {
  const { menuItems, extras, addOrder, dollarRate, currentSede, sedes, currentSedeId, setCurrentSede } = useApp();
  const sede = currentSede ?? { lat: 10.4806, lng: -66.9036, pricePerKm: 0.50, address: '' };
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pago_movil' | 'caja'>('caja');
  const [delivery, setDelivery] = useState(false);
  const [deliveryFeeAmount, setDeliveryFeeAmount] = useState(0);
  const [deliveryDistance, setDeliveryDistance] = useState(0);
  const [showDeliveryMap, setShowDeliveryMap] = useState(false);
  const [paymentProof, setPaymentProof] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('grande');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [selectedPastaType, setSelectedPastaType] = useState('');
  const [orderSent, setOrderSent] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState<ComboItem | null>(null);
  const [selectedIceCreamFlavor, setSelectedIceCreamFlavor] = useState<IceCreamFlavor>('vainilla');
  const [comboIceCreamFlavor, setComboIceCreamFlavor] = useState<IceCreamFlavor>('vainilla');
  const [showSedeDropdown, setShowSedeDropdown] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const ICE_CREAM_FLAVORS: { value: IceCreamFlavor; label: string; emoji: string }[] = [
    { value: 'vainilla', label: 'Vainilla', emoji: '🍦' },
    { value: 'fresa', label: 'Fresa', emoji: '🍓' },
    { value: 'chocolate', label: 'Chocolate', emoji: '🍫' },
  ];

  // Combos that include ice cream
  const comboHasIceCream = (combo: ComboItem) => {
    const desc = combo.description.toLowerCase();
    return desc.includes('sundae') || desc.includes('barquilla') || desc.includes('helado');
  };

  // Menu items that are ice cream
  const isIceCreamItem = (item: MenuItem) => {
    if (item.category !== 'postres') return false;
    const name = item.name.toLowerCase();
    return name.includes('barquilla') || name.includes('sundae') || name.includes('helado') || name.includes('brownie con helado') || name.includes('cesta') || name.includes('ping pong') || name.includes('3 leches');
  };

  const getPrice = (item: MenuItem, size?: PizzaSize) => {
    if (typeof item.prices === 'number') return item.prices;
    return item.prices[size || 'grande'];
  };

  const addToCart = () => {
    if (!selectedItem) return;
    const isPizza = selectedItem.category === 'pizzas' && typeof selectedItem.prices !== 'number';
    const size = isPizza ? selectedSize : undefined;
    const price = getPrice(selectedItem, size);
    
    // Safety check for extras structure
    const cartExtras: CartExtra[] = selectedExtras.map(exId => {
        const extra = extras.find(e => e.id === exId);
        return {
            extra: extra!,
            size: selectedSize,
        };
    }).filter(e => e.extra);

    const extrasTotal = cartExtras.reduce((sum, ce) => sum + (ce.extra.prices[ce.size] || 0), 0);
    
    const newItem: CartItem = {
      id: crypto.randomUUID(),
      menuItem: selectedItem,
      size,
      quantity: 1,
      extras: cartExtras,
      pastaType: selectedPastaType || undefined,
      iceCreamFlavor: isIceCreamItem(selectedItem) ? selectedIceCreamFlavor : undefined,
      unitPrice: roundMoney(price + extrasTotal),
    };
    setCart(prev => [...prev, newItem]);
    setSelectedItem(null);
    setSelectedExtras([]);
    setSelectedPastaType('');
    setSelectedIceCreamFlavor('vainilla');
  };

  const addComboToCart = (combo: ComboItem) => {
    const fakeMenuItem: MenuItem = {
      id: combo.id,
      name: combo.name,
      description: combo.description,
      category: 'pizzas',
      prices: combo.price,
      type: 'Combo'
    };
    const newItem: CartItem = {
      id: crypto.randomUUID(),
      menuItem: fakeMenuItem,
      quantity: 1,
      extras: [],
      iceCreamFlavor: comboHasIceCream(combo) ? comboIceCreamFlavor : undefined,
      unitPrice: roundMoney(combo.price),
    };
    setCart(prev => [...prev, newItem]);
    setComboIceCreamFlavor('vainilla');
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
  };

  const subtotalRaw = cart.reduce((sum, item) => sum + calculateLineTotal(item.unitPrice, item.quantity), 0);
  const deliveryFeeAmountVal = delivery ? deliveryFeeAmount : 0;
  const { subtotal, iva, deliveryFee, total } = calculateOrderTotals(subtotalRaw, deliveryFeeAmountVal, IVA_RATE);
  const totalBs = calculateOrderTotalBs(subtotalRaw, deliveryFeeAmountVal, IVA_RATE, dollarRate);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const handleSubmitOrder = () => {
    if (!customerName.trim()) return;
    addOrder({
      customerName, items: cart, subtotal, delivery, deliveryFee, total,
      paymentMethod, paymentProof: paymentProof || undefined,
      status: 'recibido', createdAt: new Date(), confirmed: false, source: 'web',
    });
    setCart([]); setShowCheckout(false); setShowCart(false);
    setCustomerName(''); setPaymentProof('');
    setOrderSent(true);
    setTimeout(() => setOrderSent(false), 4000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPaymentProof(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const scrollToMenu = () => menuRef.current?.scrollIntoView({ behavior: 'smooth' });

  const extrasByCategory = {
    charcutería: extras.filter(e => e.category === 'charcutería'),
    quesos: extras.filter(e => e.category === 'quesos'),
    vegetales: extras.filter(e => e.category === 'vegetales'),
  };

  // Filter hamburguesas by sede
  const sedeSlug = currentSede?.slug ?? '';
  const showHamburguesas = HAMBURGUESA_SLUGS.includes(sedeSlug);

  // Show sede selector if no sede selected
  if (!currentSedeId || !currentSede) {
    return <SedeSelector sedes={sedes} onSelect={setCurrentSede} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Order sent toast */}
      <AnimatePresence>
        {orderSent && (
          <motion.div initial={{ y: -80 }} animate={{ y: 0 }} exit={{ y: -80 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg font-bold text-lg">
            ✅ ¡Pedido enviado con éxito!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Bottom Pay Button */}
      {cartCount > 0 && !showCart && !showCheckout && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl">
          <button onClick={() => setShowCart(true)}
            className="w-full bg-yellow-400 text-black font-display text-xl tracking-wider h-14 rounded-xl shadow-lg hover:bg-yellow-500 flex items-center justify-center gap-3 transition-colors">
            <ShoppingCart size={22} />
            Pagar Aquí ({cartCount})
            <span className="ml-2 font-bold">${formatMoney(total)}</span>
          </button>
        </div>
      )}

      {/* Fixed sede selector - top left */}
      <div className="fixed top-4 left-4 z-[60]">
        <button
          onClick={() => setShowSedeDropdown(v => !v)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 backdrop-blur-xl border border-white/20 text-white font-medium text-sm hover:bg-black/90 transition-all duration-300 shadow-xl"
        >
          <MapPin size={15} className="text-yellow-400" />
          <span className="max-w-[160px] truncate">{currentSede?.name ?? 'Seleccionar sede'}</span>
          <ChevronDown size={14} className={`transition-transform duration-200 ${showSedeDropdown ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {showSedeDropdown && (
            <>
              <div className="fixed inset-0 z-[59]" onClick={() => setShowSedeDropdown(false)} />
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 mt-2 w-72 backdrop-blur-2xl bg-black/90 border border-white/20 rounded-2xl overflow-hidden shadow-2xl z-[61]"
              >
                {sedes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setCurrentSede(s.id); setShowSedeDropdown(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-all duration-200 ${
                      s.id === currentSedeId
                        ? 'bg-yellow-400/20 text-yellow-400'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <MapPin size={14} className={s.id === currentSedeId ? 'text-yellow-400' : 'text-white/40'} />
                    <span className="font-medium">{s.name}</span>
                    {s.id === currentSedeId && <span className="ml-auto text-yellow-400 text-xs">✓</span>}
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* HERO */}
      <section className="relative h-[85vh] sm:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroPizza} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.h1 className="font-display text-7xl sm:text-9xl text-white tracking-widest drop-shadow-lg"
            initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
            DEMACIAO
          </motion.h1>
          <motion.p className="font-display text-3xl sm:text-4xl text-yellow-400 tracking-[0.3em] mt-1 drop-shadow"
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            PIZZAS
          </motion.p>
          <motion.p className="text-white/80 mt-4 text-lg max-w-md mx-auto font-medium"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            ¡Que el AMOR y la PIZZA nunca falten! 🍕
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8">
            <button onClick={scrollToMenu} className="animate-bounce text-white/70 hover:text-white transition-colors">
              <ChevronDown size={44} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* MENU */}
      <div ref={menuRef} className="relative">
        {/* Sticky nav */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
          <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="font-display text-2xl text-red-600 tracking-wider">MENÚ</span>
            </div>
            <button onClick={() => setShowCart(true)}
              className="relative p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition-colors">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 pb-32 bg-white">
          {categoryOrder.map(cat => {
            if (cat === 'hamburguesas' && !showHamburguesas) return null;
            const items = menuItems.filter(i => i.category === cat);
            if (items.length === 0) return null;
            const isPizza = cat === 'pizzas';

            return (
              <section key={cat} className="py-10 border-b border-gray-100 last:border-0">
                <div className="mb-8 text-center">
                  <h2 className="font-display text-5xl sm:text-6xl text-red-600 tracking-wider">
                    {categoryLabels[cat] || cat.toUpperCase()}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {items.map(item => (
                    <div key={item.id} 
                      className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedItem(item)}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-display text-xl text-black tracking-wide">{item.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                        </div>
                        <div className="ml-4">
                           <span className="text-red-600 font-bold text-xl font-display">
                             ${typeof item.prices === 'number' ? formatMoney(item.prices) : '...'}
                           </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Simple Modals Implementation */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
            <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
              <h2 className="text-2xl font-bold mb-2">{selectedItem.name}</h2>
              <p className="text-gray-500 mb-6">{selectedItem.description}</p>
              
              {typeof selectedItem.prices !== 'number' && (
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {Object.entries(selectedItem.prices).map(([size, price]) => (
                    <button key={size} onClick={() => setSelectedSize(size as PizzaSize)}
                      className={`p-3 rounded-xl border-2 transition-all ${selectedSize === size ? 'border-red-600 bg-red-50' : 'border-gray-100'}`}>
                      <div className="text-xs uppercase font-bold">{size}</div>
                      <div className="text-lg font-bold">${price as number}</div>
                    </button>
                  ))}
                </div>
              )}

              <Button onClick={addToCart} className="w-full bg-red-600 hover:bg-red-700 text-white h-12 rounded-xl">
                Agregar al Carrito
              </Button>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {showCart && (
          <div className="fixed inset-0 z-50 bg-black/60" onClick={() => setShowCart(false)}>
            <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold">TU CARRITO</h2>
                <button onClick={() => setShowCart(false)}><X /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center mb-4 pb-4 border-b border-gray-50">
                    <div>
                      <p className="font-bold">{item.menuItem.name}</p>
                      <p className="text-xs text-gray-500">{item.size || ''}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-full bg-gray-100">-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-full bg-gray-100">+</button>
                      <span className="font-bold ml-2">${formatMoney(item.unitPrice * item.quantity)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <div className="flex justify-between font-bold text-2xl mb-4">
                  <span>TOTAL</span><span>${formatMoney(total)}</span>
                </div>
                <Button onClick={() => setShowCheckout(true)} className="w-full bg-red-600 h-14 text-xl">Pagar Ahora</Button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
