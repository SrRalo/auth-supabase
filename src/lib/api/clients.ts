import supabase from "@/Supabase/SupabaseClient"

export interface Client {
  id: string
  name: string
  email: string
  phone?: string
  created_at: string
}

export async function getClients(searchTerm?: string) {
  let query = supabase.from("clients").select("*")

  if (searchTerm) {
    query = query.ilike("name", `%${searchTerm}%`)
  }

  const { data, error } = await query.order('created_at', { ascending: false })
  if (error) throw error
  return data as Client[]
}

export async function createClient(client: Omit<Client, "id" | "created_at">) {
  const { data, error } = await supabase
    .from("clients")
    .insert(client)
    .select()
    .single()

  if (error) throw error
  return data as Client
}

export async function updateClient(id: string, client: Partial<Client>) {
  const { data, error } = await supabase
    .from("clients")
    .update(client)
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data as Client
}

export async function deleteClient(id: string) {
  const { error } = await supabase
    .from("clients")
    .delete()
    .eq("id", id)

  if (error) throw error
  return true
}