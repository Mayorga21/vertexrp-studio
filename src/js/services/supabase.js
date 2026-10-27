import { config } from '../config.js';

const TABLE = 'solicitudes';

export const isConfigured = () => Boolean(config.supabaseUrl && config.supabaseAnonKey);

/**
 * Guarda una solicitud en la tabla "solicitudes" usando la API REST de Supabase.
 * Lanza un error si la respuesta no es exitosa.
 */
export async function insertOrder(order) {
  const base = config.supabaseUrl.replace(/\/$/, '');
  const response = await fetch(`${base}/rest/v1/${TABLE}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: config.supabaseAnonKey,
      Authorization: `Bearer ${config.supabaseAnonKey}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(order),
  });
  if (!response.ok) throw new Error(`Supabase respondió ${response.status}`);
}
