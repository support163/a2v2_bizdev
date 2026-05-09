'use client'

export default function ApiIntegrationPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">🔗 API Integration</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📝 Add Prospect via API</h2>
          <p className="text-gray-600 mb-4">OpenClaw or any system can add prospects using this endpoint:</p>

          <div className="bg-gray-100 p-4 rounded mb-4">
            <p className="text-sm font-mono font-bold text-gray-800 mb-2">POST /api/prospects</p>
            <p className="text-xs text-gray-600">
              Base URL: <code className="bg-gray-200 px-2 py-1 rounded">https://your-app.vercel.app</code>
            </p>
          </div>

          <h3 className="font-bold text-gray-900 mb-2">Request Body:</h3>
          <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto mb-4">
{`{
  "clinic_name": "Alpha Men's Health",
  "contact_name": "Dr. John Smith",
  "email": "john@alphamens.com",
  "linkedin": "https://linkedin.com/company/alpha",
  "location": "Dallas, TX",
  "specialty": "TRT/HRT/Wellness",
  "notes": "Found via LinkedIn research"
}`}
          </pre>

          <h3 className="font-bold text-gray-900 mb-2">Success Response (201):</h3>
          <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
{`{
  "id": 1,
  "clinic_name": "Alpha Men's Health",
  "contact_name": "Dr. John Smith",
  "email": "john@alphamens.com",
  "status": "new",
  "created_at": "2024-05-09T10:30:00Z",
  ...
}`}
          </pre>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🤖 OpenClaw Integration</h2>
          <p className="text-gray-600 mb-4">Use this in OpenClaw to add prospects:</p>

          <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto mb-4">
{`// Add prospect from OpenClaw
const response = await fetch(
  'https://your-app.vercel.app/api/prospects',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      clinic_name: 'New Clinic',
      contact_name: 'Dr. Name',
      email: 'contact@clinic.com',
      location: 'City, State',
      specialty: 'TRT/HRT/Wellness'
    })
  }
);

const prospect = await response.json();
console.log('Prospect added:', prospect.id);`}
          </pre>

          <div className="bg-blue-50 border border-blue-200 rounded p-4">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> Replace <code>https://your-app.vercel.app</code> with your actual Vercel deployment URL.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">📚 Other API Endpoints</h2>

        <div className="space-y-6">
          <div>
            <p className="font-mono text-sm font-bold text-gray-800 mb-2">GET /api/prospects</p>
            <p className="text-sm text-gray-600 mb-2">Get all prospects (or filtered by status)</p>
            <p className="text-xs text-gray-500">Query params: <code className="bg-gray-100 px-2 py-1 rounded">?status=new</code></p>
          </div>

          <div>
            <p className="font-mono text-sm font-bold text-gray-800 mb-2">GET /api/prospects/[id]</p>
            <p className="text-sm text-gray-600">Get single prospect by ID</p>
          </div>

          <div>
            <p className="font-mono text-sm font-bold text-gray-800 mb-2">PATCH /api/prospects/[id]</p>
            <p className="text-sm text-gray-600 mb-2">Update prospect (status, notes, etc.)</p>
            <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
{`{
  "status": "contacted",
  "notes": "Sent LinkedIn message"
}`}
            </pre>
          </div>

          <div>
            <p className="font-mono text-sm font-bold text-gray-800 mb-2">DELETE /api/prospects/[id]</p>
            <p className="text-sm text-gray-600">Delete prospect</p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded p-6 mt-8">
        <h2 className="text-lg font-bold text-yellow-900 mb-4">⚠️ Setup Checklist</h2>
        <ul className="space-y-2 text-sm text-yellow-800">
          <li>✅ Create Supabase account</li>
          <li>✅ Create table with SQL schema</li>
          <li>✅ Get API URL and Anon Key from Supabase</li>
          <li>✅ Add to .env.local</li>
          <li>✅ Deploy to Vercel</li>
          <li>✅ Get your Vercel URL</li>
          <li>✅ Update OpenClaw with your Vercel URL</li>
        </ul>
      </div>
    </div>
  )
}
