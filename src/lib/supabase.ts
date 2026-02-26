import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const CORRECT_PROJECT_ID = '0ec90b57d6e95fcbda19832f';
if (!supabaseUrl.includes(CORRECT_PROJECT_ID)) {
  console.error('ERRO CRÍTICO: URL do Supabase incorreto!');
  console.error(`Esperado: https://${CORRECT_PROJECT_ID}.supabase.co`);
  console.error(`Recebido: ${supabaseUrl}`);
  throw new Error(`URL do Supabase incorreto. Verifique o ficheiro .env e as variáveis de ambiente na Vercel.`);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Contact {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  project_type: string;
  message: string;
  status?: string;
  created_at?: string;
}
