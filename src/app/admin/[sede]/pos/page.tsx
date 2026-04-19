'use client';

import React, { useState, useRef } from 'react';
import { Calculator, Trash2, Printer, Plus, Minus, X, CheckCircle2, ChefHat } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useOrdersStore } from '@/store/ordersStore';
import { useParams } from 'next/navigation';

// ── Data ─────────────────────────────────────────────────────────────────────
const PIZZAS = [
  { id: 'p1', name: 'MARGARITA', desc: 'Salsa, queso mozzarella', prices: { Pequeña: 4.00, Grande: 7.00, Gigante: 9.00 } },
  { id: 'p2', name: 'NAPOLITANA', desc: 'Salsa, queso mozzarella y jamón', prices: { Pequeña: 4.50, Grande: 7.50, Gigante: 10.50 } },
  { id: 'p3', name: '3 SABORES', desc: 'Salsa, queso mozzarella y 3 ingredientes a elección', prices: { Pequeña: 8.00, Grande: 12.00, Gigante: 16.00 } },
  { id: 'p4', name: 'ESPAÑOLA', desc: 'Salsa, queso mozzarella, jamón, chorizo español y queso roquefort', prices: { Pequeña: 7.00, Grande: 11.00, Gigante: 15.50 } },
  { id: 'p5', name: 'CAPRESSA', desc: 'Salsa, queso mozzarella, tomate, salsa pesto y queso perla', prices: { Pequeña: 6.00, Grande: 8.00, Gigante: 12.00 } },
  { id: 'pext', name: 'PIZZA EXTREMA 🔥', desc: 'La pizza más grande! Todos los sabores que quieras', prices: { Extremo: 31.50 } },
];

const COMBOS = [
  { id: 'c1', name: 'PROMO PARA TI', desc: '1 Margarita + 1 Iced Tea + 1 bebida pequeña', price: 4.99, size: 'Individual 22cm' },
  { id: 'c2', name: 'PROMO TRIFECTA', desc: '1 Pizza Americana + Tocineta, jamón + 1 Refresco + 1 Barquilla', price: 5.99, size: 'Individual 22cm' },
  { id: 'c3', name: 'PROMO IDEAL', desc: '1 Pizza Margarita + Refresco 1 Lt.', price: 7.50, size: 'Grande 33cm' },
  { id: 'c4', name: '100 PROMO PEPPERONI', desc: 'Pizza Pepperoni + Refresco 1 Lt.', price: 14.50, size: 'Gigante 40cm' },
  { id: 'c5', name: 'PROMO CIAO 2.0', desc: '2 Pizzas 3 Sabores + Refresco 1.5 Lts.', price: 17.50, size: 'Grande 33cm' },
  { id: 'c6', name: 'PROMO SUPREMA', desc: '2 Pizzas + 2 Sundaes + Refresco 1.5 Lts.', price: 22.50, size: 'Grande 33cm' },
];

const EXTRA_PRICES: Record<string, number> = { Pequeña: 1.99, Grande: 2.50, Gigante: 2.99, Extremo: 4.99, 'Individual 22cm': 1.50 };
const EXTRAS_LIST = {
  '🥩 Charcutería': ['Salchichón', 'Tocineta', 'Pepperoni', 'Jamón', 'Anchoas', 'Chorizo Español'],
  '🧀 Quesos': ['Queso Amarillo', 'Queso Parmesano', 'Queso Pecorino', 'Queso Roquefort', 'Queso Mozzarella'],
  '🥦 Vegetales': ['Maíz', 'Cebolla', 'Tomate', 'Pimentón', 'Champiñones'],
};

type Tab = 'pizzas' | 'combos';
type Toast = { type: 'kitchen' | 'print'; id: string } | null;

interface POSItem { id: string; name: string; size: string; price: number; quantity: number; extras: string[]; }

const SEDES: Record<string, string> = {
  aviadores: 'C.C. Parque Los Aviadores', unicentro: 'C.C. Unicentro Maracay',
  turmero: 'Turmero', samanes1: 'Los Samanes 1', samanes2: 'Los Samanes 2', bosque: 'El Bosque',
};

// ── Main ──────────────────────────────────────────────────────────────────────
export default function POSTerminalPage() {
  const params = useParams();
  const sedeId = params.sede as string;
  const sedeName = SEDES[sedeId] || sedeId;
  const { tasaBcv } = useCartStore();
  const { addOrder } = useOrdersStore();

  const [tab, setTab] = useState<Tab>('pizzas');
  const [ticket, setTicket] = useState<POSItem[]>([]);
  const [modal, setModal] = useState<any | null>(null);
  const [extras, setExtras] = useState<string[]>([]);
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState<Toast>(null);
  const printRef = useRef<HTMLDivElement>(null);

  // Customer data
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [customerError, setCustomerError] = useState('');

  // ── Helpers ────────────────────────────────────────────────────────────────
  const addToTicket = (item: Omit<POSItem, 'id'>) =>
    setTicket(prev => [...prev, { ...item, id: Date.now() + Math.random().toString(36) }]);
  const removeFromTicket = (id: string) => setTicket(prev => prev.filter(i => i.id !== id));
  const changeQty = (id: string, delta: number) =>
    setTicket(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));

  const subtotal = parseFloat(ticket.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2));
  const iva       = parseFloat((subtotal * 0.16).toFixed(2));
  const total     = parseFloat((subtotal + iva).toFixed(2));
  const totalBS   = parseFloat((total * (tasaBcv || 479.78)).toFixed(2));
  const now       = new Date().toLocaleString('es-VE', { dateStyle: 'short', timeStyle: 'short' });

  const showToast = (type: Toast['type'], id: string) => {
    setToast({ type, id });
    setTimeout(() => setToast(null), 4000);
  };

  // ── Send to Kitchen ─────────────────────────────────────────────────────────
  const handleSendToKitchen = () => {
    if (!ticket.length) return;
    if (!cedula.trim() || !nombre.trim() || !apellido.trim() || !telefono.trim()) {
      setCustomerError('Completa los datos del cliente antes de enviar.');
      return;
    }
    setCustomerError('');
    const customerName = `${nombre.trim()} ${apellido.trim()} (C.I. ${cedula.trim()})`;
    const id = addOrder({
      sedeId,
      items: ticket.map(i => ({
        id: i.id, productId: i.id, name: i.name, size: i.size,
        price: i.price, quantity: i.quantity, extras: i.extras, type: 'Pizza' as const,
      })),
      totalUSD: total,
      totalBS,
      customerName,
      customerPhone: telefono.trim(),
    });
    showToast('kitchen', id);
    setTicket([]);
    setCedula(''); setNombre(''); setApellido(''); setTelefono('');
  };

  // ── Print Invoice ──────────────────────────────────────────────────────────
  const handlePrint = () => {
    if (!ticket.length) return;
    if (!cedula.trim() || !nombre.trim() || !apellido.trim() || !telefono.trim()) {
      setCustomerError('Completa los datos del cliente antes de imprimir.');
      return;
    }
    setCustomerError('');
    const ticketId = 'TKT-' + Date.now().toString().slice(-6);
    const customerFull = `${nombre.trim()} ${apellido.trim()}`;

    const invoiceHTML = `
      <html>
        <head>
          <title>Factura Demaciao Pizzas</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Courier New', monospace; font-size: 12px; width: 80mm; padding: 8px; }
            .center { text-align: center; }
            .bold { font-weight: bold; }
            .large { font-size: 16px; }
            .xlarge { font-size: 20px; }
            hr { border: none; border-top: 1px dashed #000; margin: 6px 0; }
            .row { display: flex; justify-content: space-between; margin: 3px 0; }
            .total-row { display: flex; justify-content: space-between; font-size: 15px; font-weight: bold; margin: 4px 0; }
            .bs-row { display: flex; justify-content: space-between; font-size: 13px; font-weight: bold; margin: 4px 0; border-top: 1px solid #000; padding-top: 4px; }
            .footer { margin-top: 12px; font-size: 10px; }
          </style>
        </head>
        <body>
          <div class="center bold xlarge">DEMACIAO PIZZAS</div>
          <div class="center">${sedeName}</div>
          <div class="center">RIF: J-XXXXXXXX-X</div>
          <hr/>
          <div class="row"><span>Ticket:</span><span class="bold">${ticketId}</span></div>
          <div class="row"><span>Fecha:</span><span>${now}</span></div>
          <div class="row"><span>Cajero:</span><span>Mostrador</span></div>
          <hr/>
          <div class="center bold">DATOS DEL CLIENTE</div>
          <div class="row"><span>C.I.:</span><span class="bold">${cedula.trim()}</span></div>
          <div class="row"><span>Nombre:</span><span>${customerFull}</span></div>
          <hr/>
          ${ticket.map(i => `
            <div class="row">
              <span>${i.quantity}x ${i.name} (${i.size})</span>
              <span>$${(i.price * i.quantity).toFixed(2)}</span>
            </div>
            ${i.extras.length ? `<div style="font-size:10px; padding-left:12px;">  + ${i.extras.join(', ')}</div>` : ''}
          `).join('')}
          <hr/>
          <div class="row"><span>SubTotal:</span><span>$${subtotal.toFixed(2)}</span></div>
          <div class="row"><span>IVA (16%):</span><span>$${iva.toFixed(2)}</span></div>
          <div class="total-row"><span>TOTAL USD:</span><span>$${total.toFixed(2)}</span></div>
          <div class="bs-row"><span>TOTAL Bs. (BCV ${tasaBcv.toFixed(2)}):</span><span>Bs. ${totalBS.toFixed(2)}</span></div>
          <hr/>
          <div class="center footer">
            ¡Gracias por su preferencia!<br/>
            Que el AMOR y la PIZZA nunca falten 🍕
          </div>
        </body>
      </html>
    `;

    const win = window.open('', '_blank', 'width=350,height=600');
    if (!win) return;
    win.document.write(invoiceHTML);
    win.document.close();
    win.focus();
    win.print();
    win.close();
    showToast('print', ticketId);
  };

  // ── Modal ──────────────────────────────────────────────────────────────────
  const openModal = (product: any) => { setModal(product); setExtras([]); setQty(1); };
  const handleAddFromModal = () => {
    if (!modal) return;
    const extraPrice = EXTRA_PRICES[modal.size] || 0;
    const price = parseFloat((modal.price + extras.length * extraPrice).toFixed(2));
    addToTicket({ name: modal.name, size: modal.size, price, quantity: qty, extras });
    setModal(null);
  };

  // ── UI ─────────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full -m-6 lg:-m-8">

      {/* HEADER */}
      <div className="px-6 py-3 bg-white border-b border-gray-200 flex items-center justify-between shrink-0 shadow-sm">
        <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-demaciao-red" /> POS Cajero
          <span className="text-sm font-normal text-gray-400">— {sedeName}</span>
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => setTicket([])}
            disabled={!ticket.length}
            className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 rounded-lg text-sm font-bold text-gray-500 transition-colors disabled:opacity-30"
          >
            <Trash2 className="w-4 h-4" /> Limpiar
          </button>

          {/* ENVIAR A COCINA */}
          <button
            onClick={handleSendToKitchen}
            disabled={!ticket.length}
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-30 text-white rounded-lg text-sm font-bold transition-colors shadow-sm"
          >
            <ChefHat className="w-4 h-4" /> Enviar a Cocina
          </button>

          {/* IMPRIMIR FACTURA */}
          <button
            onClick={handlePrint}
            disabled={!ticket.length}
            className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 hover:bg-gray-700 disabled:opacity-30 text-white rounded-lg text-sm font-bold transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" /> Imprimir Factura
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden min-h-0">

        {/* LEFT: Menu */}
        <div className="flex-1 flex flex-col overflow-hidden border-r border-gray-200 min-w-0">
          <div className="flex bg-gray-100 p-1 m-4 rounded-xl shrink-0 gap-1">
            <button onClick={() => setTab('pizzas')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${tab === 'pizzas' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>🍕 Pizzas</button>
            <button onClick={() => setTab('combos')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${tab === 'combos' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>🔥 Combos</button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
            {tab === 'pizzas' && PIZZAS.map(pizza => (
              <div key={pizza.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-4 py-2.5 border-b border-gray-50">
                  <p className="font-title font-bold text-gray-900 uppercase tracking-wide text-sm">{pizza.name}</p>
                  <p className="text-xs text-gray-400 font-light">{pizza.desc}</p>
                </div>
                <div className="flex">
                  {Object.entries(pizza.prices).map(([size, price]) => (
                    <button key={size} onClick={() => openModal({ ...pizza, size, price })}
                      className="flex-1 py-3 flex flex-col items-center hover:bg-orange-50 active:bg-yellow-50 transition-colors border-r last:border-0 border-gray-100 group">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{size}</span>
                      <span className="font-title font-black text-demaciao-yellow text-lg group-hover:text-orange-500 transition-colors">${(price as number).toFixed(2)}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {tab === 'combos' && (
              <div className="grid grid-cols-2 gap-3">
                {COMBOS.map(combo => (
                  <button key={combo.id} onClick={() => openModal({ ...combo, type: 'Combo' })}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-left hover:border-demaciao-red hover:shadow-md transition-all active:scale-95 group">
                    <p className="font-title font-bold text-gray-900 uppercase text-xs tracking-wide group-hover:text-demaciao-red">{combo.name}</p>
                    <p className="text-[10px] text-gray-400 font-light mt-1 leading-tight">{combo.desc}</p>
                    <p className="font-title font-black text-demaciao-yellow text-2xl mt-3">${combo.price.toFixed(2)}</p>
                    <span className="text-[9px] font-bold text-gray-400 uppercase">{combo.size}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Ticket */}
        <div className="w-72 shrink-0 flex flex-col bg-white">
          <div className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center shrink-0">
            <h3 className="font-bold uppercase tracking-wider text-sm font-title">Ticket</h3>
            <span className="bg-demaciao-yellow text-black text-xs font-black px-2 py-0.5 rounded-full">
              {ticket.reduce((s, i) => s + i.quantity, 0)} items
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50 min-h-0">
            {ticket.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center opacity-40 py-10">
                <Calculator className="w-10 h-10 text-gray-400 mb-2" />
                <p className="text-sm font-bold text-gray-400">Sin items</p>
              </div>
            ) : ticket.map(item => (
              <div key={item.id} className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-xs uppercase truncate">{item.name}</p>
                    <p className="text-[10px] text-demaciao-red font-bold">{item.size}</p>
                    {item.extras.length > 0 && (
                      <p className="text-[9px] text-gray-400 mt-0.5 leading-tight truncate">+{item.extras.join(', ')}</p>
                    )}
                  </div>
                  <button onClick={() => removeFromTicket(item.id)} className="text-red-300 hover:text-red-500 shrink-0">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center bg-gray-100 rounded-lg">
                    <button onClick={() => changeQty(item.id, -1)} className="px-2 py-1 font-black text-gray-500 hover:text-black text-sm">-</button>
                    <span className="w-5 text-center text-xs font-bold">{item.quantity}</span>
                    <button onClick={() => changeQty(item.id, +1)} className="px-2 py-1 font-black text-gray-500 hover:text-black text-sm">+</button>
                  </div>
                  <span className="font-title font-black text-sm text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t border-gray-200 p-4 bg-white shrink-0 space-y-1.5">

            {/* Customer fields */}
            <div className="pb-3 mb-2 border-b border-gray-100 space-y-2">
              <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest">📋 Datos del Cliente</p>
              <div className="flex gap-1.5">
                <input
                  value={cedula} onChange={e => { setCedula(e.target.value); setCustomerError(''); }}
                  placeholder="Cédula (V-...)"
                  className="w-28 px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-50"
                />
                <input
                  value={nombre} onChange={e => { setNombre(e.target.value); setCustomerError(''); }}
                  placeholder="Nombre"
                  className="flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-50"
                />
              </div>
              <input
                value={apellido} onChange={e => { setApellido(e.target.value); setCustomerError(''); }}
                placeholder="Apellido"
                className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-50"
              />
              <input
                value={telefono} onChange={e => { setTelefono(e.target.value); setCustomerError(''); }}
                placeholder="Teléfono (WhatsApp)"
                className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-50"
              />
              {customerError && <p className="text-[10px] text-red-500 font-bold">{customerError}</p>}
            </div>
            <div className="flex justify-between text-xs text-gray-500 font-medium"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-xs text-gray-500 font-medium"><span>IVA 16%</span><span>${iva.toFixed(2)}</span></div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <span className="font-bold text-gray-900 text-sm">TOTAL USD</span>
              <span className="font-title font-black text-demaciao-red text-2xl">${total.toFixed(2)}</span>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-2 flex justify-between items-center">
              <p className="text-[10px] font-black text-yellow-700 uppercase">BCV {tasaBcv.toFixed(2)}</p>
              <span className="font-title font-black text-lg text-yellow-700">Bs. {totalBS.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCT MODAL */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-title text-2xl font-black text-demaciao-red uppercase">{modal.name}</h2>
                  <p className="text-gray-400 text-sm mt-1">{modal.desc}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="bg-orange-100 text-orange-600 font-bold px-3 py-1 rounded-full text-xs uppercase">{modal.size}</span>
                    <span className="font-title font-black text-demaciao-yellow text-2xl">${modal.price.toFixed(2)}</span>
                  </div>
                </div>
                <button onClick={() => setModal(null)} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {modal.type !== 'Combo' && (
              <div className="bg-orange-50/60 px-6 py-4 border-t border-orange-100">
                <p className="font-semibold text-gray-700 text-sm mb-3">Extras — <span className="text-demaciao-yellow font-black">${EXTRA_PRICES[modal.size] || 1.99} c/u</span></p>
                <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                  {Object.values(EXTRAS_LIST).flat().map(e => (
                    <label key={e} className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" checked={extras.includes(e)}
                        onChange={() => setExtras(prev => prev.includes(e) ? prev.filter(x => x !== e) : [...prev, e])}
                        className="w-3.5 h-3.5 accent-demaciao-red" />
                      <span className="text-xs text-gray-600">{e}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="p-6 pt-4 flex items-center gap-3">
              <div className="flex items-center bg-gray-100 rounded-2xl p-1">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="p-2.5 bg-white rounded-xl shadow-sm hover:text-demaciao-red"><Minus className="w-4 h-4" /></button>
                <span className="w-10 text-center font-bold">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="p-2.5 bg-white rounded-xl shadow-sm hover:text-green-500"><Plus className="w-4 h-4" /></button>
              </div>
              <button onClick={handleAddFromModal}
                className="flex-1 bg-demaciao-yellow hover:bg-yellow-500 text-black font-title font-bold py-3.5 rounded-xl text-lg uppercase tracking-wide transition-colors shadow-lg shadow-yellow-400/30">
                Añadir — ${((modal.price + extras.length * (EXTRA_PRICES[modal.size] || 1.99)) * qty).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 font-bold animate-in slide-in-from-bottom duration-300 ${toast.type === 'kitchen' ? 'bg-orange-500' : 'bg-gray-900'}`}>
          {toast.type === 'kitchen' ? <ChefHat className="w-5 h-5" /> : <Printer className="w-5 h-5" />}
          {toast.type === 'kitchen' ? `Pedido ${toast.id} enviado a Cocina ✓` : `Factura ${toast.id} enviada a impresora ✓`}
        </div>
      )}
    </div>
  );
}
