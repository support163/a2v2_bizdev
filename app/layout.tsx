import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'A2V2 Business Development',
  description: 'Manage prospects and track sales pipeline',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900">A2V2 BizDev</h1>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <a href="/" className="mr-4 hover:text-gray-900">Dashboard</a>
                <a href="/prospects" className="hover:text-gray-900">Prospects</a>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
