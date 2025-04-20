import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://goclnhvhdaiugnqdbpsn.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvY2xuaHZoZGFpdWducWRicHNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNDUyMzksImV4cCI6MjA2MDcyMTIzOX0.o67WgDDgpJKUa_safKS_qq80O3nmkhh8uekonD7bB9E";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
