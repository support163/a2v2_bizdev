import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.warn('Missing Supabase credentials:', { supabaseUrl, supabaseKey })
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '')

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
