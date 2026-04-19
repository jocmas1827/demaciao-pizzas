'use client';

import { useState } from 'react';
import { useStockStore } from '@/store/stockStore';
import { Pizza, CheckCircle2, XCircle, Search } from 'lucide-react';

type Category = 'Todos' | 'Pizza' | 'Combo' | 'Extra';

export default function StockPage() {
  const { products, toggleProduct } = useStockStore();
  const [filter, setFilter] = useState<Category>('Todos');
  const [search, setSearch] = useState('');

  const filtered = products.filter(p => {
    const matchCat = filter === 'Todos' || p.category === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const available = products.filter(p => p.available).length;
  const unavailable = products.filter(p => !p.available).length;

  const cats: Category[] = ['Todos', 'Pizza', 'Combo', 'Extra'];
  const catEmoji: Record<Category, string> = { Todos: '📋', Pizza: '🍕', Combo: '🔥', Extra: '🧀' };

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-gray-200 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Pizza className="w-6 h-6 text-demaciao-red" /> Gestión de Stock
          </h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">
            Activa o desactiva productos. Los marcados como Agotado desaparecen del portal del cliente.
          </p>
        </div>
        <div className="flex gap-4 shrink-0">
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span className="font-black text-green-700">{available}</span>
            <span className="text-xs text-green-600 font-medium">Disponibles</span>
          </div>
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-2">
            <XCircle className="w-4 h-4 text-red-500" />
            <span className="font-black text-red-700">{unavailable}</span>
            <span className="text-xs text-red-600 font-medium">Agotados</span>
          </div>
        </div>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex bg-white border border-gray-200 rounded-xl p-1 shadow-sm gap-1">
          {cats.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                filter === cat
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {catEmoji[cat]} {cat}
            </button>
          ))}
        </div>
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-demaciao-red bg-white shadow-sm"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(product => (
          <div
            key={product.id}
            className={`bg-white rounded-2xl border-2 p-5 flex items-center justify-between shadow-sm transition-all duration-200 ${
              product.available
                ? 'border-gray-100 hover:border-green-200'
                : 'border-red-100 bg-red-50/30'
            }`}
          >
            <div className="flex-1 pr-4 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                  product.category === 'Pizza' ? 'bg-orange-100 text-orange-600' :
                  product.category === 'Combo' ? 'bg-red-100 text-red-600' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {product.category}
                </span>
              </div>
              <p className={`font-title font-bold text-sm uppercase tracking-wide truncate ${
                product.available ? 'text-gray-900' : 'text-gray-400 line-through'
              }`}>
                {product.name}
              </p>
              <p className={`text-xs mt-1 font-semibold ${product.available ? 'text-green-600' : 'text-red-500'}`}>
                {product.available ? '✓ Disponible' : '✗ Agotado'}
              </p>
            </div>

            {/* Toggle Switch */}
            <button
              onClick={() => toggleProduct(product.id)}
              className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors duration-300 focus:outline-none ${
                product.available
                  ? 'bg-green-500 border-green-600'
                  : 'bg-gray-200 border-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                  product.available ? 'translate-x-7' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <Pizza className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-bold">No se encontraron productos</p>
        </div>
      )}
    </div>
  );
}
