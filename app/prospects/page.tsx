'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Prospect {
  id: number
  clinic_name: string
  contact_name: string | null
  email: string | null
  location: string | null
  status: string
  created_at: string
}

export default function ProspectsPage() {
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('')
  const [sortColumn, setSortColumn] = useState<keyof Prospect>('created_at')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    fetchProspects()
  }, [filter])

  const handleSort = (column: keyof Prospect) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const sortedProspects = [...prospects].sort((a, b) => {
    const aVal = a[sortColumn] ?? ''
    const bVal = b[sortColumn] ?? ''
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const fetchProspects = async () => {
    try {
      setLoading(true)
      const url = filter ? `/api/prospects?status=${filter}` : '/api/prospects'
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setProspects(data || [])
      }
    } catch (error) {
      console.error('Error fetching prospects:', error)
    } finally {
      setLoading(false)
    }
  }

  const statusColors: Record<string, string> = {
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">👥 Prospects</h1>
        <Link href="/prospects/new">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            ➕ Add Prospect
          </button>
        </Link>
      </div>

      <div className="mb-6 flex gap-2 flex-wrap">
        <button
          onClick={() => setFilter('')}
          className={`px-4 py-2 rounded font-medium ${filter === '' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          All
        </button>
        {['new', 'contacted', 'responded', 'meeting', 'proposal', 'closed_won', 'closed_lost'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded font-medium ${filter === s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {s.replace('_', ' ')}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : prospects.length === 0 ? (
        <div className="text-center py-8 text-gray-600">
          No prospects found. <Link href="/prospects/new" className="text-blue-600 hover:underline">Add one now</Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                {([
                  ['clinic_name', 'Clinic Name'],
                  ['contact_name', 'Contact'],
                  ['email', 'Email'],
                  ['location', 'Location'],
                  ['status', 'Status'],
                ] as [keyof Prospect, string][]).map(([key, label]) => (
                  <th
                    key={key}
                    onClick={() => handleSort(key)}
                    className="px-6 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-200 select-none"
                  >
                    {label} {sortColumn === key ? (sortDirection === 'asc' ? ' ▲' : ' ▼') : ''}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {sortedProspects.map((prospect) => (
                <tr key={prospect.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{prospect.clinic_name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{prospect.contact_name || '—'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {prospect.email ? (
                      <a href={`mailto:${prospect.email}`} className="text-blue-600 hover:underline">
                        {prospect.email}
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{prospect.location || '—'}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[prospect.status]}`}>
                      {prospect.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Link href={`/prospects/${prospect.id}`} className="text-blue-600 hover:underline">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
