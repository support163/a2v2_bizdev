import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'

// GET - fetch all prospects with optional filtering
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const supabase = getSupabaseClient()

    let query = supabase.from('prospects').select('*').order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching prospects:', error)
    return NextResponse.json({ error: 'Failed to fetch prospects' }, { status: 500 })
  }
}

// POST - create a new prospect (from OpenClaw or web form)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { clinic_name, contact_name, email, linkedin, location, specialty, notes } = body
    const supabase = getSupabaseClient()

    if (!clinic_name) {
      return NextResponse.json({ error: 'clinic_name is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('prospects')
      .insert([
        {
          clinic_name,
          contact_name: contact_name || null,
          email: email || null,
          linkedin: linkedin || null,
          location: location || null,
          specialty: specialty || 'TRT/HRT/Wellness',
          status: 'new',
          notes: notes || null,
        },
      ])
      .select()

    if (error) throw error

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error('Error creating prospect:', error)
    return NextResponse.json({ error: 'Failed to create prospect' }, { status: 500 })
  }
}
