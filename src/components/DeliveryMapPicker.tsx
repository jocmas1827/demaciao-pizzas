import React from 'react';
import { Button } from './ui/button';

interface DeliveryMapPickerProps {
  sedeLat: number;
  sedeLng: number;
  pricePerKm: number;
  onConfirm: (fee: number, dist: number) => void;
  onCancel: () => void;
}

const DeliveryMapPicker: React.FC<DeliveryMapPickerProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl p-6 max-w-sm w-full text-center">
        <h2 className="text-xl font-bold mb-4">Seleccionar Ubicación</h2>
        <p className="text-muted-foreground mb-6">Selecciona en el mapa tu ubicación para calcular el delivery.</p>
        <div className="bg-muted h-48 rounded-xl mb-6 flex items-center justify-center">
           Map Placeholder
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1" onClick={onCancel}>Cancelar</Button>
          <Button className="flex-1" onClick={() => onConfirm(5, 10)}>Confirmar ($5.00)</Button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryMapPicker;
