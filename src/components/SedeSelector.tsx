import React from 'react';
import { Button } from './ui/button';

interface SedeSelectorProps {
  sedes: any[];
  onSelect: (sedeId: string) => void;
}

const SedeSelector: React.FC<SedeSelectorProps> = ({ sedes, onSelect }) => {
  return (
    <div className="min-h-screen bg-demaciao-dark flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-display text-white mb-8">BIENVENIDO A DEMACIAO</h1>
        <p className="text-gray-400 mb-8">Selecciona la sucursal más cercana para tu pedido.</p>
        <div className="grid gap-4">
          {sedes.map(sede => (
            <Button key={sede.id} className="h-16 text-lg bg-white/10 hover:bg-white/20 border-white/10" onClick={() => onSelect(sede.id)}>
              {sede.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SedeSelector;
