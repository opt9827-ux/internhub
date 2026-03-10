import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { fetchAllInternships } from '@/lib/fetcher';
import { sendTelegramMessage } from '@/lib/telegram';
export async function GET(request: Request) {
const url = new URL(request.url);
const secretParam = url.searchParams.get("secret");
const authHeader = request.headers.get("authorization");

const validSecret = process.env.CRON_SECRET;

if (
  validSecret &&
  authHeader !== `Bearer ${validSecret}` &&
  secretParam !== validSecret
) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

    try {
        console.log("Cron started: Fetching internships...");
        // 1. Fetch internships from sources
        const internships = await fetchAllInternships();

        if (internships.length === 0) {
            return NextResponse.json({ success: true, message: "No internships fetched.", added: 0, updated: 0 });
        }

        // 2 & 3. Deduplicate and Upsert into Database
        // Supabase upsert requires the primary key or a unique column (source_id). Let's use ON CONFLICT
        const { data: upsertData, error: upsertError } = await supabase
            .from('internships')
            .upsert(
                internships.map(i => ({
                    ...i,
                    slug: `${i.company?.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${i.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Math.random().toString(36).substring(2, 7)}`
                })),
                { onConflict: 'source_id', ignoreDuplicates: true } // Assuming 'source_id' is the unique constraint we want to use for skipping already existing ones. If we want to update, we can change this.
            )
            .select();

        if (upsertError) {
            console.error("Supabase upsert error:", upsertError);
            return NextResponse.json({ error: 'Database upsert failed', details: upsertError }, { status: 500 });
        }

        const addedCount = upsertData ? upsertData.length : 0;

        // 4. Mark expired internships inactive
        const { error: expireError } = await supabase
            .from('internships')
            .update({ is_active: false })
            .lt('deadline', new Date().toISOString());

        if (expireError) {
            console.error("Failed to mark expired internships inactive:", expireError);
        }

        // 5 & 6. Create Daily Post & Send Telegram Message if there are new internships
        if (addedCount > 0) {

            // Format message for Telegram
            const today = new Intl.DateTimeFormat('en-IN', { dateStyle: 'long' }).format(new Date());
            let telegramMessage = `🚀 <b>New CS Internships — ${today}</b>\n\n`;

            const topInternships = upsertData.slice(0, 5); // Take top 5 for the message to avoid making it too long

            topInternships.forEach((job, index) => {
                telegramMessage += `<b>${index + 1}️⃣ ${job.title} — ${job.company}</b>\n`;
                telegramMessage += `📍 ${job.location}\n`;
                telegramMessage += `💰 ${job.stipend || 'Unpaid/Not specified'}\n`;
                telegramMessage += `⏳ Deadline: ${job.deadline ? new Date(job.deadline).toLocaleDateString('en-IN') : 'Not specified'}\n`;
                telegramMessage += `<a href="${job.apply_url}">Apply Here</a>\n\n`;
            });

            telegramMessage += `👉 <a href="https://internhub.example.com">View all latest internships on InternHub</a>`;


            await sendTelegramMessage(telegramMessage);

            // Create Daily Blog Entry (Simplified)
            await supabase.from('daily_posts').insert({
                post_date: new Date().toISOString().split('T')[0],
                title: `New Internships - ${today}`,
                content: `Today we aggregated ${addedCount} new internships from various platforms...`
            });
        }

        return NextResponse.json({
            success: true,
            added: addedCount,
            updated: 0 // Simplification since ignoreDuplicates is true
        });

    } catch (error) {
        console.error("Cron execution error:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
