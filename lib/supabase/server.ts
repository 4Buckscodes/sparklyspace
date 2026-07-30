import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isServerSupabaseConfigured = (): boolean => {
  return Boolean(supabaseUrl && serviceRoleKey);
};

export const getSupabaseServerClient = (): SupabaseClient | null => {
  if (!isServerSupabaseConfigured()) {
    console.warn('Supabase server environment variables missing.');
    return null;
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
    },
  });
};
