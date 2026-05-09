# A2V2 Business Development Web App

A full-stack web application for managing sales prospects and tracking your pipeline to TRT/HRT/Wellness clinics.

**Stack:** Next.js + Supabase + Vercel + React  
**Features:** Prospect management, pipeline tracking, API integration with OpenClaw

## Quick Start

### Prerequisites
- Node.js 18+
- Supabase account (free at https://supabase.com)
- Vercel account (free at https://vercel.com)

### Local Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create Supabase Table:**
   
   Go to your Supabase project → SQL Editor → Run this:
   
   ```sql
   CREATE TABLE prospects (
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
   );

   CREATE INDEX idx_status ON prospects(status);
   CREATE INDEX idx_created_at ON prospects(created_at);
   ```

3. **Get Supabase Credentials:**
   - Go to Project Settings → API
   - Copy `Project URL` and `Anon Key`

4. **Configure Environment:**
   
   Create `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=YOUR_PROJECT_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

5. **Run locally:**
   ```bash
   npm run dev
   ```
   
   Open http://localhost:3000

## Deployment to Vercel

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "A2V2 Business Dev Web App"
git branch -M main
git remote add origin https://github.com/YOUR_USER/business-dev-web.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repo
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL` → Your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Your Anon Key
4. Click Deploy

### Step 3: Update .env.local
Once deployed, update your local `.env.local`:
```
NEXT_PUBLIC_API_URL=https://your-app.vercel.app
```

## Using the Web App

### Dashboard (/)
- View pipeline summary (prospects by status)
- Quick actions (add prospect, view all, API integration)
- Setup instructions

### Prospects (/prospects)
- View all prospects in a table
- Filter by status
- Click "Edit" to update prospect details
- Add new prospects

### Add Prospect (/prospects/new)
- Form to add new prospect
- Fields: clinic name, contact, email, location, specialty, notes

### API Integration (/api-integration)
- How to add prospects via API
- OpenClaw integration code
- All available endpoints

## API Endpoints

### Add Prospect (OpenClaw Integration)
```
POST /api/prospects
Content-Type: application/json

{
  "clinic_name": "Alpha Men's Health",
  "contact_name": "Dr. John Smith",
  "email": "john@alphamens.com",
  "linkedin": "https://linkedin.com/company/alpha",
  "location": "Dallas, TX",
  "specialty": "TRT/HRT/Wellness",
  "notes": "Found via research"
}
```

### Get All Prospects
```
GET /api/prospects
GET /api/prospects?status=new
```

### Update Prospect
```
PATCH /api/prospects/[id]
Content-Type: application/json

{
  "status": "contacted",
  "notes": "Sent LinkedIn message"
}
```

### Delete Prospect
```
DELETE /api/prospects/[id]
```

## OpenClaw Integration Example

Add this to your OpenClaw bot to add prospects:

```javascript
async function addProspect(clinicName, contact, email, location) {
  const response = await fetch(
    'https://your-app.vercel.app/api/prospects',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clinic_name: clinicName,
        contact_name: contact,
        email: email,
        location: location,
        specialty: 'TRT/HRT/Wellness'
      })
    }
  );
  
  const prospect = await response.json();
  console.log(`Added prospect #${prospect.id}`);
  return prospect;
}
```

## File Structure

```
business-dev-web/
├── app/
│   ├── api/
│   │   ├── prospects/
│   │   │   ├── route.ts          # GET/POST prospects
│   │   │   └── [id]/route.ts     # GET/PATCH/DELETE single prospect
│   │   └── pipeline/route.ts      # Get pipeline summary
│   ├── prospects/
│   │   ├── page.tsx              # List all prospects
│   │   ├── new/page.tsx          # Add new prospect form
│   │   └── [id]/page.tsx         # Edit prospect (TODO)
│   ├── api-integration/page.tsx   # API docs
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Dashboard
│   └── globals.css               # Tailwind styles
├── lib/
│   └── supabase.ts               # Supabase client
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
└── next.config.js
```

## Troubleshooting

### "no such table: prospects"
- Run the SQL schema in Supabase SQL Editor
- Check NEXT_PUBLIC_SUPABASE_URL is correct

### 401 Unauthorized errors
- Check NEXT_PUBLIC_SUPABASE_ANON_KEY is correct
- Make sure table has public read/write permissions in Supabase

### Vercel deployment fails
- Check environment variables are set in Vercel project settings
- Ensure Node.js version is 18+

## Next Steps

1. Set up Supabase and deploy to Vercel
2. Share your Vercel URL with your OpenClaw bot
3. Start adding prospects!
4. Check the Discord #business-dev channel for incoming data

---

Built with Next.js, Supabase, and Vercel for A2V2.ai
