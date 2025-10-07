import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://bocjaxysoguvqotrblte.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvY2pheHlzb2d1dnFvdHJibHRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2NjgyNTEsImV4cCI6MjA3NTI0NDI1MX0.Wzpk__Vu2CrO5DOmnhP9s-pvjsGSqTtAsdB7nesNgd0";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

export default supabase