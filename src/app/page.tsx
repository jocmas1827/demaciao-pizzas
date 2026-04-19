import Link from 'next/link';
import { MapPin } from 'lucide-react';

const SEDES = [
  {
    id: 'aviadores',
    name: 'C.C. PARQUE LOS AVIADORES',
    address: 'C.C. Parque Los Av...',
    emoji: '✈️',
  },
  {
    id: 'unicentro',
    name: 'C.C. UNICENTRO MARACAY',
    address: 'C.C. Unicentro, Ma...',
    emoji: '🏢',
  },
  {
    id: 'turmero',
    name: 'TURMERO',
    address: 'Turmero, Aragua',
    emoji: '🌿',
  },
  {
    id: 'samanes1',
    name: 'LOS SAMANES 1',
    address: 'Los Samanes 1, Ma...',
    emoji: '🌳',
  },
  {
    id: 'samanes2',
    name: 'LOS SAMANES 2',
    address: 'Los Samanes 2, M...',
    emoji: '🌲',
  },
  {
    id: 'bosque',
    name: 'EL BOSQUE',
    address: 'El Bosque, Maracay',
    emoji: '🏡',
  },
];

export default function SedeSelectionPage() {
  return (
    <main className="min-h-screen bg-demaciao-dark flex flex-col items-center pt-16 px-4 relative overflow-hidden">
      {/* Background radial gradient overlay imitating smoke/dark vibe */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#4a2420] via-demaciao-dark to-demaciao-dark opacity-80"></div>
      
      <div className="z-10 flex flex-col items-center w-full max-w-5xl">
        <div className="flex flex-col items-center mb-8 text-center mt-4">
          {/* Provisional Logo Placeholder */}
          <div className="w-24 h-24 bg-white/5 rounded-2xl flex items-center justify-center rotate-45 mb-8 shadow-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-demaciao-red/80 via-white/20 to-demaciao-yellow/80 opacity-50 mix-blend-overlay"></div>
            <div className="flex flex-col items-center justify-center -rotate-45 relative z-10 w-full px-2">
               <span className="text-xl font-bold italic text-demaciao-yellow font-title tracking-tighter leading-none">De</span>
               <span className="text-2xl font-bold text-white font-title tracking-tighter leading-none">ma</span>
               <span className="text-xl font-bold italic text-green-500 font-title tracking-tighter leading-none">ciao</span>
            </div>
          </div>
          
          <h1 className="font-title text-6xl md:text-8xl tracking-wider text-white font-black drop-shadow-2xl mb-1">
            DEMACIAO
          </h1>
          <h2 className="font-title text-2xl md:text-3xl tracking-[0.4em] text-demaciao-yellow font-bold mb-8">
            PIZZAS
          </h2>
          
          <p className="text-gray-50/90 text-xl font-light tracking-wide mb-8">
            Selecciona tu sede para continuar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4 mb-20">
          {SEDES.map((sede) => (
            <Link 
              key={sede.id} 
              id={`sede-link-${sede.id}`}
              href={`/${sede.id}`}
              className="glass-card hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(230,30,37,0.15)] transition-all duration-500 group rounded-2xl overflow-hidden flex flex-col items-center text-center p-8 cursor-pointer relative border border-white/10 z-20"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-500 drop-shadow-md">
                {sede.emoji}
              </div>
              
              <h3 className="font-title text-[1.15rem] font-bold text-white mb-2 tracking-wider w-full px-2 group-hover:text-demaciao-yellow transition-colors">
                {sede.name}
              </h3>
              
              <p className="text-gray-400 text-sm flex items-center justify-center gap-1.5 font-light group-hover:text-white/80 transition-colors">
                <MapPin className="w-4 h-4 opacity-70" />
                {sede.address}
              </p>
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 text-white/60 text-sm pb-8 font-light">
          <span className="text-base">🍕</span>
          <p>¡Que el AMOR y la PIZZA nunca falten!</p>
        </div>
      </div>
    </main>
  );
}
