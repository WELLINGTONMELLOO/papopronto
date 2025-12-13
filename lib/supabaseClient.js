// lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Verificação simples para ajudar debug se algo faltar
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ Variáveis NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_ANON_KEY não estão definidas. Verifique seu .env.local."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
