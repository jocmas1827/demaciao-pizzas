import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://ve.dolarapi.com/v1/dolares/oficial', {
      // Revalidate every hour (BCV usually updates once a day)
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error('API unavailable');

    const data = await res.json();
    
    return NextResponse.json({
      tasa: data.promedio,
      fecha: data.fechaActualizacion,
      fuente: 'BCV Oficial vía DolarApi.com',
    });
  } catch {
    // Fallback if API is down
    return NextResponse.json(
      { tasa: null, error: 'No se pudo obtener la tasa. Configúrala manualmente.' },
      { status: 503 }
    );
  }
}
