import { MenuItem } from '../types/menu';

export const PIZZAS: MenuItem[] = [
  { id: 'p1', name: 'MARGARITA', description: 'Salsa de la casa, abundante queso mozzarella y orégano.', prices: { 'Pequeña': 4.00, 'Grande': 7.00, 'Gigante': 9.00 }, type: 'Pizza', category: 'pizzas' },
  { id: 'p2', name: 'NAPOLITANA', description: 'Salsa, queso mozzarella y jamón.', prices: { 'Pequeña': 4.50, 'Grande': 7.50, 'Gigante': 10.50 }, type: 'Pizza', category: 'pizzas' },
  { id: 'p3', name: 'AMERICANA', description: 'Salsa, mozzarella, maíz y jamón.', prices: { 'Pequeña': 5.00, 'Grande': 8.00, 'Gigante': 11.00 }, type: 'Pizza', category: 'pizzas' },
  { id: 'p4', name: '3 SABORES', description: 'Salsa, queso mozzarella y 3 ingredientes a tu elección.', prices: { 'Pequeña': 8.00, 'Grande': 12.00, 'Gigante': 16.00 }, type: 'Pizza', category: 'pizzas' },
  { id: 'p5', name: 'TOCINETA', description: 'Salsa, mozzarella y crujiente tocineta.', prices: { 'Pequeña': 6.00, 'Grande': 8.50, 'Gigante': 11.50 }, type: 'Pizza', category: 'pizzas' },
  { id: 'p6', name: 'CHAMPIÑONES', description: 'Salsa, mozzarella y champiñones frescos.', prices: { 'Pequeña': 6.00, 'Grande': 8.50, 'Gigante': 11.50 }, type: 'Pizza', category: 'pizzas' },
  { id: 'p7', name: 'VEGETARIANA', description: 'Salsa, mozzarella, maíz, cebolla, pimentón y champiñones.', prices: { 'Pequeña': 6.50, 'Grande': 9.00, 'Gigante': 12.00 }, type: 'Pizza', category: 'pizzas' },
  { id: 'p8', name: 'HAWAIANA', description: 'Salsa, mozzarella, jamón y piña.', prices: { 'Pequeña': 6.50, 'Grande': 9.00, 'Gigante': 12.50 }, type: 'Pizza', category: 'pizzas' },
  { id: 'p9', name: 'POLLO', description: 'Salsa, mozzarella y pollo desmechado sazonado.', prices: { 'Pequeña': 6.50, 'Grande': 9.50, 'Gigante': 13.00 }, type: 'Pizza', category: 'pizzas' },
  { id: 'p10', name: 'POLLO CON CHAMPIÑONES', description: 'Salsa, mozzarella, pollo y champiñones.', prices: { 'Pequeña': 7.00, 'Grande': 10.50, 'Gigante': 14.50 }, type: 'Pizza', category: 'pizzas' },
  { id: 'p11', name: 'POLLO CON MAÍZ', description: 'Salsa, mozzarella, pollo y maíz.', prices: { 'Pequeña': 7.00, 'Grande': 10.50, 'Gigante': 14.50 }, type: 'Pizza', category: 'pizzas' },
  { id: 'p12', name: 'PEPERONI', description: 'Salsa, mozzarella y abundante pepperoni.', prices: { 'Pequeña': 7.00, 'Grande': 11.00, 'Gigante': 15.50 }, type: 'Pizza', category: 'pizzas' },
  { id: 'p13', name: 'ESPAÑOLA', description: 'Salsa, mozzarella, jamón, chorizo español y queso roquefort.', prices: { 'Pequeña': 7.00, 'Grande': 11.00, 'Gigante': 15.50 }, type: 'Pizza', category: 'pizzas' },
  { id: 'p14', name: 'MEXICANA', description: 'Salsa, mozzarella, carne molida, cebolla, pimentón y picante.', prices: { 'Pequeña': 7.50, 'Grande': 11.50, 'Gigante': 16.00 }, type: 'Pizza', category: 'pizzas' },
  { id: 'p15', name: 'CAPRESSA', description: 'Salsa, mozzarella, rodajas de tomate, pesto y queso perla.', prices: { 'Pequeña': 6.00, 'Grande': 8.00, 'Gigante': 12.00 }, type: 'Pizza', category: 'pizzas' },
  { id: 'p16', name: 'BOLOÑESA', description: 'Salsa, mozzarella y nuestra salsa boloñesa especial.', prices: { 'Pequeña': 7.50, 'Grande': 11.50, 'Gigante': 16.00 }, type: 'Pizza', category: 'pizzas' },
  { id: 'p17', name: 'CUATRO QUESOS', description: 'Salsa, mozzarella, queso amarillo, parmesano y roquefort.', prices: { 'Pequeña': 8.50, 'Grande': 12.50, 'Gigante': 17.00 }, type: 'Pizza', category: 'pizzas' },
  { id: 'p18', name: 'DEMACIAO', description: '¡La especialidad! Todos los ingredientes de la casa.', prices: { 'Pequeña': 9.50, 'Grande': 14.00, 'Gigante': 19.50 }, type: 'Pizza', category: 'pizzas' },
  { id: 'pext', name: 'PIZZA EXTREMA 🔥', description: '¡La pizza más grande! Elige todos los sabores que quieras.', prices: { 'Extremo': 31.50 }, type: 'Pizza', category: 'pizzas' },
];

export const CALZONES: MenuItem[] = [
  { id: 'cz1', name: 'MARGARITA', description: 'Queso mozzarella y salsa.', prices: { 'Único': 5.00 }, type: 'Calzone', category: 'calzones' },
  { id: 'cz2', name: 'NAPOLITANO', description: 'Queso mozzarella y jamón.', prices: { 'Único': 5.50 }, type: 'Calzone', category: 'calzones' },
  { id: 'cz3', name: '3 SABORES', description: 'Queso mozzarella y 3 ingredientes.', prices: { 'Único': 6.50 }, type: 'Calzone', category: 'calzones' },
  { id: 'cz4', name: 'CAPRESSA', description: 'Mozzarella, tomate y pesto.', prices: { 'Único': 6.50 }, type: 'Calzone', category: 'calzones' },
  { id: 'cz5', name: 'VEGETARIANO', description: 'Mozzarella y vegetales.', prices: { 'Único': 6.50 }, type: 'Calzone', category: 'calzones' },
  { id: 'cz6', name: 'POLLO', description: 'Mozzarella y pollo.', prices: { 'Único': 7.00 }, type: 'Calzone', category: 'calzones' },
  { id: 'cz7', name: 'PEPERONI', description: 'Mozzarella y peperoni.', prices: { 'Único': 7.50 }, type: 'Calzone', category: 'calzones' },
  { id: 'cz8', name: 'ESPAÑOL', description: 'Mozzarella, chorizo español y roquefort.', prices: { 'Único': 7.50 }, type: 'Calzone', category: 'calzones' },
];

export const PASTAS: MenuItem[] = [
  { id: 'pst1', name: 'BOLOGÑA', description: 'Salsa roja con carne molida y queso parmesano.', prices: { 'Normal': 5.50 }, type: 'Pasta', category: 'pastas' },
  { id: 'pst2', name: 'NAPOLITANA', description: 'Salsa roja pomodoro y queso parmesano.', prices: { 'Normal': 4.50 }, type: 'Pasta', category: 'pastas' },
  { id: 'pst3', name: 'ALFREDO', description: 'Salsa blanca a base de crema y jamón.', prices: { 'Normal': 6.50 }, type: 'Pasta', category: 'pastas' },
  { id: 'pst4', name: 'CARBONARA', description: 'Salsa blanca con tocineta y huevo.', prices: { 'Normal': 7.50 }, type: 'Pasta', category: 'pastas' },
  { id: 'pst5', name: 'POLLO Y CHAMPIÑONES', description: 'Salsa blanca con pollo y champiñones.', prices: { 'Normal': 8.50 }, type: 'Pasta', category: 'pastas' },
  { id: 'pst6', name: 'PESTO', description: 'Salsa a base de albahaca, nueces y oliva.', prices: { 'Normal': 6.50 }, type: 'Pasta', category: 'pastas' },
];

export const HAMBURGUESAS: MenuItem[] = [
  { id: 'h1', name: 'CLÁSICA', description: 'Carne, queso, lechuga, tomate y salsas.', prices: { 'Sencilla': 4.50, 'Doble': 6.50 }, type: 'Hamburguesa', category: 'hamburguesas' },
  { id: 'h2', name: 'AMERICANA', description: 'Carne, queso, tocineta, cebolla caramelizada.', prices: { 'Sencilla': 6.00, 'Doble': 8.00 }, type: 'Hamburguesa', category: 'hamburguesas' },
  { id: 'h3', name: 'DEMACIAO BURGER', description: 'Carne, pollo, chuleta, huevo y extra queso.', prices: { 'Especial': 9.50 }, type: 'Hamburguesa', category: 'hamburguesas' },
  { id: 'p1', name: 'PERRO CALIENTE CLÁSICO', description: 'Salchicha, repollo, cebolla, papitas y salsas.', prices: { 'Sencillo': 2.50, 'Doble': 3.50 }, type: 'Perro', category: 'hamburguesas' },
  { id: 'p2', name: 'PERRO ESPECIAL', description: 'Salchicha, queso amarillo, tocineta y maíz.', prices: { 'Sencillo': 4.00 }, type: 'Perro', category: 'hamburguesas' },
];

export const COMBOS: MenuItem[] = [
  { id: 'c1', name: 'PROMO PARA TI', description: '1 Margarita + 1 Iced Tea + 1 bebida pequeña', prices: { 'Individual 22cm': 4.99 }, type: 'Combo', category: 'combos-imbatibles' },
  { id: 'c2', name: 'PROMO TRIFECTA', description: '1 Pizza Americana + Tocineta, jamón + 1 Refresco + 1 Barquilla', prices: { 'Individual 22cm': 5.99 }, type: 'Combo', category: 'combos-imbatibles' },
  { id: 'c3', name: 'PROMO IDEAL', description: '1 Pizza Margarita + Refresco 1 Lt.', prices: { 'Grande 33cm': 7.50 }, type: 'Combo', category: 'combos-imbatibles' },
  { id: 'c4', name: '100 PROMO PEPPERONI', description: 'Pizza Pepperoni + Refresco 1 Lt.', prices: { 'Gigante 40cm': 14.50 }, type: 'Combo', category: 'combos-imbatibles' },
  { id: 'c5', name: 'PROMO CIAO 2.0', description: '2 Pizzas 3 Sabores + Refresco 1.5 Lts.', prices: { 'Grande 33cm': 17.50 }, type: 'Combo', category: 'combos-imbatibles' },
  { id: 'c6', name: 'PROMO SUPREMA', description: '2 Pizzas + 2 Sundaes + Refresco 1.5 Lts.', prices: { 'Grande 33cm': 22.50 }, type: 'Combo', category: 'combos-imbatibles' },
];

export const categoryLabels: Record<string, string> = {
  'combos-imbatibles': '🔥 COMBOS IMBATIBLES',
  'pizzas': '🍕 PIZZAS TRADICIONALES',
  'calzones': '🥟 CALZONES',
  'pastas': '🍝 PASTAS',
  'hamburguesas': '🍔 HAMBURGUESAS & PERROS',
  'postres': '🍦 POSTRES',
};

export const categoryOrder = ['combos-imbatibles', 'pizzas', 'calzones', 'pastas', 'hamburguesas', 'postres'];

export const IVA_RATE = 0.16;

export const initialCombos = COMBOS.map(c => ({
  ...c,
  available: true,
  price: typeof c.prices === 'number' ? c.prices : c.prices['Grande'] || c.prices['Grande 33cm'] || Object.values(c.prices)[0],
  size: Object.keys(c.prices)[0]
}));
