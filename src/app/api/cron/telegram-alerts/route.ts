import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendTelegramMessage } from '@/lib/telegram';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const now = new Date();
        const tomorrow = new Date();
        tomorrow.setHours(now.getHours() + 24);

        const twoDays = new Date();
        twoDays.setHours(now.getHours() + 48);

        // Fetch internships expiring within the 48-hour window
        const { data: internships, error } = await supabase
            .from("internships")
            .select("*")
            .gte("deadline", now.toISOString())
            .lte("deadline", twoDays.toISOString())
            .eq("is_active", true);

        if (error) {
            console.error("Supabase Query Error:", error);
            throw error;
        }

        if (!internships || internships.length === 0) {
            return NextResponse.json({ message: "No expiring internships found in this window." });
        }

        let sentCount = 0;
        let failedCount = 0;

        for (const internship of internships) {
            const dateStr = internship.deadline 
                ? new Date(internship.deadline).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                : 'Expiring Soon';

            const message = `⏰ <b>Internship Closing Soon!</b>

<b>${internship.title}</b>

Deadline: ${dateStr}

Apply here:
${internship.link}`;
            
            const success = await sendTelegramMessage(message);
            
            if (success) {
                sentCount++;
            } else {
                failedCount++;
            }
        }

        return NextResponse.json({ 
            message: "Processed deadline alerts successfully.", 
            processed_count: internships.length,
            sent: sentCount,
            failed: failedCount 
        });

    } catch (error: any) {
        console.error("Cron Job Execution Error:", error);
        return NextResponse.json({ error: error.message || "Failed to process Telegram alerts" }, { status: 500 });
    }
}
