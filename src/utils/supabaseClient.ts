import { createClient, SupabaseClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Ensure environment variables are defined
if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;