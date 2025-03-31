import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ztzjacjoxwhyliswtyhx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0emphY2pveHdoeWxpc3d0eWh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzMzI4OTQsImV4cCI6MjA1NzkwODg5NH0.srLjrnMob8iMAzyAnzEFa7MwbYvA9XfURTTsZx7bJTM'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase;