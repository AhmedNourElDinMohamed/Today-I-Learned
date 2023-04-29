import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://njifgkzakqbaxiqzumtr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qaWZna3pha3FiYXhpcXp1bXRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI3ODg4NzIsImV4cCI6MTk4ODM2NDg3Mn0.fB9hisk4awRErn7-gVuxWIVMiw0FuOUinNcn9WGcdvc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
