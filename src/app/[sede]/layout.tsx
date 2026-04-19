'use client';

import CustomerHeader from '@/components/CustomerHeader';
import ClientModals from '@/components/ClientModals';
import OrderStatusBanner from '@/components/OrderStatusBanner';
import SupabaseInitializer from '@/components/SupabaseInitializer';
import { useCartStore } from '@/store/cartStore';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';

const SEDES: Record<string, string> = {
  'aviadores': 'C.C. Parque Los Aviadores',
  'unicentro': 'C.C. Unicentro Maracay',
  'turmero': 'Turmero',
  'samanes1': 'Los Samanes 1',
  'samanes2': 'Los Samanes 2',
  'bosque': 'El Bosque',
};

function SedeInitializer() {
  const params = useParams();
  const sedeId = params.sede as string;
  const setSede = useCartStore(s => s.setSede);

  useEffect(() => {
    if (sedeId) setSede(sedeId);
  }, [sedeId, setSede]);

  return null;
}

export default function SedeLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const sede = params.sede as string;
  const sedeName = SEDES[sede] || 'Sede Desconocida';

  return (
    <div className="flex flex-col min-h-screen bg-background relative selection:bg-demaciao-red selection:text-white">
      <SedeInitializer />
      <SupabaseInitializer />
      {/* Sticky status banner — shows active order state across all client pages */}
      <OrderStatusBanner />
      <CustomerHeader sedeName={sedeName} />
      <ClientModals />
      <main className="flex-grow flex flex-col">
        {children}
      </main>
    </div>
  );
}
