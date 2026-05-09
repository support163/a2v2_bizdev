'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type ProspectStatus = 'new' | 'contacted' | 'responded' | 'meeting' | 'proposal' | 'closed_won' | 'closed_lost'

interface PipelineSummary {
  status: ProspectStatus
  count: number
}

export default function Dashboard() {
  const [summary, setSummary] = useState<PipelineSummary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPipelineSummary()
  }, [])

  const fetchPipelineSummary = async () => {
    try {
      const response = await fetch('/api/pipeline')
      if (response.ok) {
        const data = await response.json()
        setSummary(data)
      }
    } catch (error) {
      console.error('Error fetching pipeline:', error)
    } finally {
      setLoading(false)
    }
  }

  const totalProspects = summary.reduce((sum, item) => sum + item.count, 0)

  const statusColors: Record<ProspectStatus, string> = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-purple-100 text-purple-800',
    responded: 'bg-yellow-100 text-yellow-800',
    meeting: 'bg-orange-100 text-orange-800',
    proposal: 'bg-green-100 text-green-800',
    closed_won: 'bg-emerald-100 text-emerald-800',
    closed_lost: 'bg-red-100 text-red-800',
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">📊 Pipeline Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-3xl font-bold text-blue-600">{totalProspects}</div>
          <div className="text-gray-600 mt-2">Total Prospects</div>
        </div>

        {summary.map((item) => (
          <div key={item.status} className={`rounded-lg shadow p-6 ${statusColors[item.status]}`}>
            <div className="text-2xl font-bold">{item.count}</div>
            <div className="capitalize text-sm mt-2">{item.status.replace('_', ' ')}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/prospects/new">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              ➕ Add Prospect
            </button>
          </Link>
          <Link href="/prospects">
            <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              👥 View All Prospects
            </button>
          </Link>
          <Link href="/api-integration">
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              🔗 API Integration
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">📖 Setup Instructions</h2>
        <div className="space-y-3 text-gray-700">
          <p><strong>1. Create Supabase Account:</strong> Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">supabase.com</a></p>
          <p><strong>2. Create Project:</strong> Create a new project (choose region closest to you)</p>
          <p><strong>3. Create Table:</strong> Run SQL in Supabase dashboard:</p>
          <pre className="bg-gray-100 p-3 rounded mt-2 text-sm overflow-auto">
{`CREATE TABLE prospects (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  clinic_name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT,
  linkedin TEXT,
  location TEXT,
  specialty TEXT,
  status TEXT DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);`}
          </pre>
          <p className="mt-3"><strong>4. Get API Keys:</strong> Copy from Supabase → Project Settings → API</p>
          <p><strong>5. Update .env.local:</strong> Paste URL and Anon Key</p>
          <p><strong>6. Deploy to Vercel:</strong> <a href="https://vercel.com/import" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">vercel.com/import</a></p>
        </div>
      </div>
    </div>
  )
}
