'use client';

import React, { useState, useEffect } from 'react';

const CATEGORIES = [
  { name: 'Combos', id: 'combos-imbatibles' },
  { name: 'Pizzas', id: 'pizzas-casa' },
  { name: 'Calzones', id: 'calzones' },
  { name: 'Pastas', id: 'pastas' },
  { name: 'Pastichos', id: 'pastichos' },
  { name: 'Ensaladas', id: 'ensaladas' },
  { name: 'Postres', id: 'postres' },
];

export default function CategoryNavigation() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 400);

      const sections = CATEGORIES.map(cat => document.getElementById(cat.id));
      const currentSection = sections.find(section => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 200 && rect.bottom >= 200;
      });

      if (currentSection) {
        setActiveCategory(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`sticky top-[72px] left-0 w-full z-40 transition-all duration-500 py-4 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm' : 'bg-white'}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-start md:justify-center gap-3 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={(e) => scrollToSection(cat.id, e)}
              className={`
                whitespace-nowrap px-6 py-2.5 rounded-2xl font-title text-lg uppercase tracking-wider transition-all duration-300 border-2
                ${activeCategory === cat.id 
                  ? 'bg-demaciao-red text-white border-demaciao-red shadow-lg shadow-red-500/20 scale-105' 
                  : 'bg-gray-50 text-gray-400 border-transparent hover:border-gray-200'}
              `}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
