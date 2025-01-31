import { supabase } from "../lib/supabase";

export async function fetchClimbs() {
  const { data, error } = await supabase.from("Climbs").select("*");
  if (error) throw new Error(error.message);
  return data;
}

export async function fetchClimbById(id: number) {
  const { data, error } = await supabase
    .from("Climbs")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data;
}
