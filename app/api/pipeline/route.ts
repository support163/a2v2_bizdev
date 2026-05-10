import { NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = getSupabaseClient()
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
