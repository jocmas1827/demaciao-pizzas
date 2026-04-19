'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PIZZAS, CALZONES, PASTAS, HAMBURGUESAS, COMBOS } from '../data/menuData';

const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentSedeId, setCurrentSedeId] = useState<string | null>(null);
  const [dollarRate, setDollarRate] = useState(479.78);

  const sedes = [
    { id: 'unicentro', name: 'Centro Comercial Unicentro', slug: 'unicentro', lat: 10.48, lng: -66.90, pricePerKm: 0.50 },
    { id: 'aviadores', name: 'Los Aviadores', slug: 'aviadores', lat: 10.20, lng: -67.60, pricePerKm: 0.50 },
  ];

  const currentSede = sedes.find(s => s.id === currentSedeId);

  const menuItems = [...PIZZAS, ...CALZONES, ...PASTAS, ...HAMBURGUESAS, ...COMBOS];
  const extras = [
    { id: 'ex1', name: 'Extra Queso', category: 'quesos', prices: { pequeña: 1.99, grande: 2.50, gigante: 2.99 } },
    { id: 'ex2', name: 'Tocineta', category: 'charcutería', prices: { pequeña: 1.99, grande: 2.50, gigante: 2.99 } },
    { id: 'ex3', name: 'Maíz', category: 'vegetales', prices: { pequeña: 1.99, grande: 2.50, gigante: 2.99 } },
  ];

  const addOrder = (order: any) => {
    console.log('Order submitted:', order);
  };

  const value = {
    menuItems,
    extras,
    addOrder,
    dollarRate,
    currentSede,
    sedes,
    currentSedeId,
    setCurrentSede: setCurrentSedeId,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
