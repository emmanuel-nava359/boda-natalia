import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/** Server-side only: jamás importar este módulo en componentes cliente. */
export function getSupabaseAdmin(): SupabaseClient | null {
 const url = process.env.SUPABASE_URL;
 const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
 if (!url || !key) return null;
 return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}
