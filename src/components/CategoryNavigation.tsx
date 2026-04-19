'use client';

import React, { useState, useEffect } from 'react';

const CATEGORIES = [
  { name: 'Combos', id: 'combos-imbatibles' },
  { name: 'Pizzas', id: 'pizzas-casa' },
  { name: 'Calzones', id: 'calzones' },
  { name: 'Pastas', id: 'pastas' },
  { name: 'Extras', id: 'hamburguesas' },
];

export default function CategoryNavigation() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      const sections = CATEGORIES.map(cat => document.getElementById(cat.id));
      const currentSection = sections.find(section => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
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
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1800px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={(e) => scrollToSection(cat.id, e)}
              className={`
                whitespace-nowrap px-6 py-2.5 rounded-full font-title text-xl uppercase tracking-wider transition-all duration-300
                ${activeCategory === cat.id 
                  ? 'bg-demaciao-red text-white shadow-lg shadow-red-500/20 scale-105' 
                  : 'bg-white/10 text-gray-500 hover:bg-gray-100 border border-transparent'}
                ${!scrolled && activeCategory !== cat.id ? 'bg-white/5 text-white/70 hover:bg-white/10' : ''}
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
