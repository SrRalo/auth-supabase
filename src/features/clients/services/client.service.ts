import { Client } from '@/types/client'
import { getClients as getMockClients, createClient as createMockClient, updateClient as updateMockClient, deleteClient as deleteMockClient } from '@/lib/api/clients'

// Temporalmente usando los datos de ejemplo
export const getClients = getMockClients
export const createClient = createMockClient
export const updateClient = updateMockClient
export const deleteClient = deleteMockClient

// Código original comentado para futura implementación con Supabase
/*
import supabase from '@/config/supabase'

export async function getClients(): Promise<Client[]> {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}

export async function createClient(client: Omit<Client, 'id' | 'created_at'>): Promise<Client> {
  const { data, error } = await supabase
    .from('clients')
    .insert([{ ...client, created_at: new Date().toISOString() }])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function updateClient(id: number, client: Partial<Client>): Promise<Client> {
  const { data, error } = await supabase
    .from('clients')
    .update(client)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function deleteClient(id: number): Promise<void> {
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}
*/