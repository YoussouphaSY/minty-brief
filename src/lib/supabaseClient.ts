import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        '⚠️ Supabase credentials not found. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env.local file.'
    );
    console.warn('The application will not function properly without Supabase credentials.');
}

// Créer le client avec des valeurs par défaut si les credentials sont manquants
// Cela évite que l'application crash, mais les requêtes échoueront
export const supabase = createClient<Database>(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key',
    {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
        },
    }
);

// Fonction helper pour vérifier si Supabase est configuré
export const isSupabaseConfigured = (): boolean => {
    return !!(supabaseUrl && supabaseAnonKey &&
        supabaseUrl !== 'https://placeholder.supabase.co' &&
        supabaseAnonKey !== 'placeholder-key');
};
