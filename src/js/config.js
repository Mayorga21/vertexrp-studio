/**
 * Configuración pública de Supabase.
 * Pega aquí la Project URL y la clave "anon public" (Project Settings > API).
 * La clave anon es pública por diseño: la seguridad la dan las políticas RLS de supabase/setup.sql.
 * NUNCA pegues aquí la clave "service_role".
 */
export const config = {
  supabaseUrl: '',      // ejemplo: 'https://abcdxyz.supabase.co'
  supabaseAnonKey: '',  // clave anon public
};
