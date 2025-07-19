import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const supabaseUrl_2 = import.meta.env.VITE_SUPABASE_URL_2;
const supabaseKey_2 = import.meta.env.VITE_SUPABASE_ANON_KEY_2;
const db = createClient(supabaseUrl_2, supabaseKey_2);

export default supabase;
export { db };