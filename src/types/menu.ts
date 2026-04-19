export type ProductType = 'Pizza' | 'Combo' | 'Calzone' | 'Pasta' | 'Hamburguesa' | 'Perro' | 'Extra';

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  prices: Record<string, number>;
  image?: string;
  type: ProductType;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
}
