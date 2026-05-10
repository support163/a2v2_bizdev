import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient | null = null

export function getSupabaseClient() {
  if (supabaseInstance) return supabaseInstance

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!url || !key) {
    throw new Error('Missing Supabase credentials')
  }

  supabaseInstance = createClient(url, key)
  return supabaseInstance
}

export type Prospect = {
  id: number
  clinic_name: string
  contact_name: string | null
  email: string | null
  linkedin: string | null
  location: string | null
  specialty: string | null
  status: 'new' | 'contacted' | 'responded' | 'meeting' | 'proposal' | 'closed_won' | 'closed_lost'
  notes: string | null
  created_at: string
  updated_at: string
}
