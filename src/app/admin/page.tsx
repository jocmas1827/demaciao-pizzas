import Link from 'next/link';
import { MapPin, ShieldCheck } from 'lucide-react';

const SEDES = [
  { id: 'aviadores', name: 'C.C. PARQUE LOS AVIADORES' },
  { id: 'unicentro', name: 'C.C. UNICENTRO MARACAY' },
  { id: 'turmero', name: 'TURMERO' },
  { id: 'samanes1', name: 'LOS SAMANES 1' },
  { id: 'samanes2', name: 'LOS SAMANES 2' },
  { id: 'bosque', name: 'EL BOSQUE' },
];

export default function AdminSedeSelectionPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col items-center p-8 md:p-12">
         <div className="w-20 h-20 bg-gray-900 rounded-full flex justify-center items-center mb-6 shadow-md border-4 border-demaciao-red">
            <ShieldCheck className="w-10 h-10 text-demaciao-yellow" />
         </div>

         <h1 className="font-title text-3xl md:text-5xl font-black text-gray-900 mb-2 uppercase tracking-wide">
           Portal Administrativo
         </h1>
         <p className="text-gray-500 mb-10 text-center text-lg font-light">
           Selecciona la sucursal que deseas gestionar.<br/> 
           <span className="text-sm text-demaciao-red font-semibold">*Acceso restringido*</span>
         </p>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {SEDES.map(sede => (
              <Link 
                key={sede.id}
                href={`/admin/${sede.id}`}
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-demaciao-red hover:shadow-md hover:bg-red-50/30 transition-all group"
              >
                 <div className="bg-gray-100 p-3 rounded-lg group-hover:bg-demaciao-red group-hover:text-white transition-colors">
                   <MapPin className="w-5 h-5 text-gray-500 group-hover:text-white" />
                 </div>
                 <span className="font-title font-bold text-gray-700 tracking-wide group-hover:text-demaciao-red transition-colors">
                   {sede.name}
                 </span>
              </Link>
            ))}
         </div>
      </div>
      
    </main>
  );
}
