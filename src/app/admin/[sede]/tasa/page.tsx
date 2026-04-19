'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { TrendingUp, Save, History, CheckCircle2, AlertTriangle, RefreshCw, Wifi, WifiOff } from 'lucide-react';

const HISTORY_KEY = 'demaciao_tasa_history';

interface HistoryEntry {
  date: string;
  tasa: number;
  source: 'BCV Auto' | 'Manual';
}

export default function TasaBCVPage() {
  const { tasaBcv, setTasaBcv } = useCartStore();
  const [inputValue, setInputValue] = useState(String(tasaBcv.toFixed(2)));
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [fetchStatus, setFetchStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [fetchMsg, setFetchMsg] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Load history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  // Auto-fetch BCV rate on page load
  useEffect(() => {
    fetchBCV(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveToHistory = (tasa: number, source: 'BCV Auto' | 'Manual') => {
    const entry: HistoryEntry = {
      date: new Date().toLocaleString('es-VE', { dateStyle: 'short', timeStyle: 'short' }),
      tasa,
      source,
    };
    const updated = [entry, ...history].slice(0, 10); // keep last 10
    setHistory(updated);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  };

  const fetchBCV = async (manual = true) => {
    setFetchStatus('loading');
    setFetchMsg('');
    try {
      const res = await fetch('/api/bcv');
      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Error al conectar con BCV');
      }

      const tasa = Number(data.tasa.toFixed(2));
      setTasaBcv(tasa);
      setInputValue(String(tasa.toFixed(2)));
      setFetchStatus('success');
      setFetchMsg(`Tasa obtenida: Bs. ${tasa.toFixed(2)}`);
      if (manual) saveToHistory(tasa, 'BCV Auto');
    } catch (e: any) {
      setFetchStatus('error');
      setFetchMsg(e.message || 'Error desconocido');
    }
  };

  const handleManualSave = () => {
    const parsed = parseFloat(inputValue);
    if (isNaN(parsed) || parsed <= 0) {
      setError('Ingresa un valor válido mayor a cero.');
      return;
    }
    setError('');
    setTasaBcv(parsed);
    setSaved(true);
    saveToHistory(parsed, 'Manual');
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* Header */}
      <div className="pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-demaciao-red" /> Tasa BCV
        </h1>
        <p className="text-gray-500 text-sm mt-1 font-medium">
          Se actualiza automáticamente al cargar. También puedes refrescar manualmente o editar el valor.
        </p>
      </div>

      {/* Current rate hero */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white flex items-center justify-between shadow-xl">
        <div>
          <p className="text-gray-400 font-semibold text-sm uppercase tracking-widest mb-1">Tasa Activa Ahora</p>
          <h2 className="font-title font-black text-6xl text-white tracking-tight">
            {tasaBcv.toFixed(2)}
          </h2>
          <p className="text-gray-400 text-sm mt-1">Bs. por cada $1.00 USD</p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="w-20 h-20 rounded-2xl bg-demaciao-yellow/10 border border-demaciao-yellow/30 flex items-center justify-center">
            <TrendingUp className="w-10 h-10 text-demaciao-yellow" />
          </div>
        </div>
      </div>

      {/* AUTO-FETCH BCV card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-1 text-lg flex items-center gap-2">
          <Wifi className="w-5 h-5 text-blue-500" /> Tasa Oficial BCV (Automática)
        </h3>
        <p className="text-sm text-gray-500 mb-5">
          Consulta la tasa oficial publicada diariamente por el BCV. Se actualiza al ingresar a esta página.
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => fetchBCV(true)}
            disabled={fetchStatus === 'loading'}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold px-5 py-3 rounded-xl transition-colors shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${fetchStatus === 'loading' ? 'animate-spin' : ''}`} />
            {fetchStatus === 'loading' ? 'Consultando BCV…' : 'Actualizar desde BCV'}
          </button>
        </div>

        {/* Fetch feedback */}
        {fetchStatus === 'success' && (
          <div className="mt-4 flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-xl text-sm font-bold">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            ✓ {fetchMsg} — Precios del portal actualizados.
          </div>
        )}
        {fetchStatus === 'error' && (
          <div className="mt-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
            <WifiOff className="w-4 h-4 shrink-0" />
            {fetchMsg} — Puedes ingresarla manualmente abajo.
          </div>
        )}
      </div>

      {/* MANUAL UPDATE card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-1 text-lg">Ajuste Manual</h3>
        <p className="text-sm text-gray-500 mb-5">Usa esto si conoces el valor exacto o si la API no está disponible.</p>

        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">
          Valor Bs. / $1 USD
        </label>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-gray-400 text-lg">Bs.</span>
            <input
              type="number"
              step="0.01"
              min="0"
              value={inputValue}
              onChange={e => { setInputValue(e.target.value); setError(''); setSaved(false); }}
              className="w-full pl-14 pr-4 py-4 text-2xl font-black text-gray-900 border-2 border-gray-200 focus:border-demaciao-red rounded-xl outline-none transition-colors"
              placeholder="479.78"
            />
          </div>
          <button
            onClick={handleManualSave}
            className="flex items-center gap-2 bg-demaciao-red hover:bg-[#C1121C] text-white font-bold px-6 py-4 rounded-xl transition-colors shadow-[0_4px_15px_rgba(230,30,37,0.3)] shrink-0"
          >
            <Save className="w-5 h-5" />
            Guardar
          </button>
        </div>

        {error && (
          <div className="mt-3 flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm font-medium">
            <AlertTriangle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}
        {saved && (
          <div className="mt-3 flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm font-bold">
            <CheckCircle2 className="w-4 h-4 shrink-0" /> Tasa manual guardada: Bs. {parseFloat(inputValue).toFixed(2)}
          </div>
        )}

        {/* Live preview */}
        <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Vista Previa de Precios</p>
          <div className="grid grid-cols-3 gap-3">
            {[4.00, 9.00, 31.50].map(usd => (
              <div key={usd} className="text-center bg-white rounded-lg p-3 border border-gray-100 shadow-sm">
                <div className="font-bold text-gray-400 text-xs mb-0.5">$ {usd.toFixed(2)}</div>
                <div className="font-title font-black text-demaciao-yellow text-lg leading-none">
                  Bs. {(usd * (parseFloat(inputValue) || tasaBcv)).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* History */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <History className="w-5 h-5 text-gray-400" /> Historial de Cambios
        </h3>
        {history.length === 0 ? (
          <p className="text-gray-400 text-sm">No hay cambios registrados aún.</p>
        ) : (
          <div className="space-y-2">
            {history.map((h, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-bold text-gray-700">Bs. {h.tasa.toFixed(2)}</p>
                  <p className="text-xs text-gray-400">{h.source} · {h.date}</p>
                </div>
                {i === 0 && <span className="bg-green-100 text-green-600 text-xs font-bold px-2 py-0.5 rounded-full">Actual</span>}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
