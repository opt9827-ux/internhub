# InternHub 🚀

InternHub is a fully automated internship aggregator designed for Computer Science students. It automatically scrapes various platforms daily, saves opportunities to a Supabase PostgreSQL database, and sends alerts to a Telegram channel. 

The frontend uses Next.js 14 App Router and is designed with an Apple-inspired minimal UI.

## Features
- **Automated Scraping**: Fetcher utility runs daily to find new internships.
- **Deduplication**: Source IDs prevent duplicate entries.
- **Telegram Integration**: Instant alerts for daily aggregated posts.
- **Modern UI**: Apple-like glassmorphism, countdown timers, responsive filters.
- **SEO Ready**: Schema.org `JobPosting` structured data.

## Project Structure
- `src/app/api/cron`: The main automation endpoint.
- `src/app/api/internships`: Endpoints for fetching jobs with flexible queries.
- `src/lib/fetcher.ts`: The scraping engine.
- `src/lib/telegram.ts`: Telegram bot integration.
- `supabase/migrations`: SQL scripts for setting up the backend schema.

## Deployment Guide (Zero Cost, Fully Automated)

To deploy InternHub completely free, we will use **Vercel** for the Next.js frontend and **Supabase** for the PostgreSQL database.

### 1. Database Setup (Supabase)
1. Go to [Supabase](https://supabase.com) and create a new project.
2. Navigate to **SQL Editor** in the dashboard.
3. Copy the contents of `supabase/migrations/00001_create_tables.sql` into a new query and run it. This creates the `internships`, `daily_posts`, and `bookmarks` tables.
4. Go to **Project Settings -> API** to get your `Project URL` and `Service Role Key`.

### 2. Telegram Bot Setup
1. Open Telegram and search for `@BotFather`.
2. Send `/newbot` and follow instructions to create a bot. You will get a **Bot Token**.
3. Create a public Telegram Channel for your internship alerts. Make your bot an **administrator** of this channel.
4. Your `Channel ID` is typically your handle like `@internhub_cs`.

### 3. Frontend Deployment (Vercel)
1. Push this code to a GitHub repository.
2. Log into [Vercel](https://vercel.com) and create a new project from your GitHub repo.
3. Configure the following **Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`: (from step 1)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (from step 1)
   - `SUPABASE_SERVICE_ROLE_KEY`: (from step 1)
   - `TELEGRAM_BOT_TOKEN`: (from step 2)
   - `TELEGRAM_CHANNEL_ID`: (from step 2)
   - `CRON_SECRET`: Generate a random secure string.
4. Click **Deploy**.

### 4. Cron Automation configuration
Vercel supports invoking an endpoint automatically on a schedule.
1. `vercel.json` is already included to configure the cron to run every day at 12:00 PM IST (06:30 UTC):

```json
{
  "crons": [
    {
      "path": "/api/cron",
      "schedule": "30 6 * * *"
    }
  ]
}
```

2. Make sure you set your Vercel project's Cron setup to send the `CRON_SECRET` in the `Authorization` header.

## Running Locally

1. `npm install`
2. Create `.env.local` using `.env` values (copied from `.env.example`).
3. `npm run dev`

The site will be running at `http://localhost:3000`.
You can manually trigger the scraper by sending a GET request to `http://localhost:3000/api/cron` (be sure to include your Bearer token if you set up the secret check!).
