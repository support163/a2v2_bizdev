import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''
  )
}

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase()
    const statuses = ['new', 'contacted', 'responded', 'meeting', 'proposal', 'closed_won', 'closed_lost']
    const summary = []

    for (const status of statuses) {
      const { count, error } = await supabase
        .from('prospects')
        .select('*', { count: 'exact', head: true })
        .eq('status', status)

      if (error) throw error

      summary.push({
        status,
        count: count || 0,
      })
    }

    return NextResponse.json(summary)
  } catch (error) {
    console.error('Error fetching pipeline:', error)
    return NextResponse.json({ error: 'Failed to fetch pipeline' }, { status: 500 })
  }
}
