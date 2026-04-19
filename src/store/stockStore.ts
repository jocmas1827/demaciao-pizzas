import { create } from 'zustand';

export interface ProductStock {
  id: string;
  name: string;
  category: 'Pizza' | 'Combo' | 'Extra';
  available: boolean;
}

interface StockState {
  products: ProductStock[];
  toggleProduct: (id: string) => void;
  setAvailability: (id: string, available: boolean) => void;
}

const INITIAL_PRODUCTS: ProductStock[] = [
  // Pizzas
  { id: 'p1', name: 'MARGARITA', category: 'Pizza', available: true },
  { id: 'p2', name: 'NAPOLITANA', category: 'Pizza', available: true },
  { id: 'p3', name: '3 SABORES', category: 'Pizza', available: true },
  { id: 'p4', name: 'ESPAÑOLA', category: 'Pizza', available: true },
  { id: 'p5', name: 'CAPRESSA', category: 'Pizza', available: true },
  { id: 'pext', name: 'PIZZA EXTREMA 🔥', category: 'Pizza', available: true },
  // Combos
  { id: 'c1', name: 'PROMO PARA TI', category: 'Combo', available: true },
  { id: 'c2', name: 'PROMO TRIFECTA', category: 'Combo', available: true },
  { id: 'c3', name: 'PROMO IDEAL', category: 'Combo', available: true },
  { id: 'c4', name: '100 PROMO PEPPERONI', category: 'Combo', available: true },
  { id: 'c5', name: 'PROMO CIAO 2.0', category: 'Combo', available: true },
  { id: 'c6', name: 'PROMO SUPREMA', category: 'Combo', available: true },
  // Extras
  { id: 'e1', name: 'Salchichón', category: 'Extra', available: true },
  { id: 'e2', name: 'Tocineta', category: 'Extra', available: true },
  { id: 'e3', name: 'Pepperoni', category: 'Extra', available: true },
  { id: 'e4', name: 'Jamón', category: 'Extra', available: true },
  { id: 'e5', name: 'Anchoas', category: 'Extra', available: true },
  { id: 'e6', name: 'Chorizo Español', category: 'Extra', available: true },
  { id: 'e7', name: 'Queso Amarillo', category: 'Extra', available: true },
  { id: 'e8', name: 'Queso Parmesano', category: 'Extra', available: true },
  { id: 'e9', name: 'Queso Roquefort', category: 'Extra', available: true },
  { id: 'e10', name: 'Queso Mozzarella', category: 'Extra', available: true },
];

export const useStockStore = create<StockState>((set) => ({
  products: INITIAL_PRODUCTS,
  
  toggleProduct: (id) => set((state) => ({
    products: state.products.map(p =>
      p.id === id ? { ...p, available: !p.available } : p
    )
  })),

  setAvailability: (id, available) => set((state) => ({
    products: state.products.map(p =>
      p.id === id ? { ...p, available } : p
    )
  })),
}));
