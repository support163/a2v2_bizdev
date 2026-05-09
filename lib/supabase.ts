import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase credentials in environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
