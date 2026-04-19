'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { ShieldCheck, Eye, EyeOff, AlertCircle, Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const login = useAuthStore(s => s.login);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate small network delay for polish
    await new Promise(r => setTimeout(r, 600));

    const ok = login(user, pass);
    if (!ok) {
      setError('Usuario o contraseña incorrectos.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      
      {/* Decorative background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-demaciao-red/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Card */}
        <div className="bg-gray-900 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-white/5 p-8 md:p-10">
          
          {/* Logo */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 bg-demaciao-red rounded-2xl flex items-center justify-center mb-5 shadow-[0_8px_30px_rgba(230,30,37,0.4)] rotate-6 border border-red-500">
              <ShieldCheck className="w-10 h-10 text-white -rotate-6" />
            </div>
            <h1 className="font-title font-black text-3xl text-white tracking-widest uppercase">
              Demaciao Admin
            </h1>
            <p className="text-gray-500 text-sm mt-1.5 font-medium text-center">
              Acceso restringido al personal autorizado
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">
                Usuario
              </label>
              <input
                type="text"
                value={user}
                onChange={e => { setUser(e.target.value); setError(''); }}
                placeholder="admin"
                required
                className="w-full bg-gray-800 border border-gray-700 focus:border-demaciao-red text-white placeholder-gray-600 rounded-xl px-4 py-3.5 outline-none transition-colors font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={pass}
                  onChange={e => { setPass(e.target.value); setError(''); }}
                  placeholder="••••••••••"
                  required
                  className="w-full bg-gray-800 border border-gray-700 focus:border-demaciao-red text-white placeholder-gray-600 rounded-xl px-4 py-3.5 pr-12 outline-none transition-colors font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 bg-red-950/60 border border-red-800 text-red-400 px-4 py-3 rounded-xl text-sm font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-demaciao-red hover:bg-[#C1121C] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors shadow-[0_4px_20px_rgba(230,30,37,0.35)] text-lg tracking-wide flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  Verificando...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Ingresar
                </>
              )}
            </button>
          </form>

          {/* Hint for demo */}
          <p className="text-center text-gray-700 text-xs mt-6">
            Demo: <span className="text-gray-500 font-mono">admin</span> / <span className="text-gray-500 font-mono">demaciao2024</span>
          </p>
        </div>
      </div>
    </div>
  );
}
