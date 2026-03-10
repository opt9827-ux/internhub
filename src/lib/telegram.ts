import axios from 'axios';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID || '';

export async function sendTelegramMessage(message: string): Promise<boolean> {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHANNEL_ID) {
        console.warn("Telegram Bot Token or Channel ID is missing.");
        return false;
    }

    try {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        const response = await axios.post(url, {
            chat_id: TELEGRAM_CHANNEL_ID,
            text: message,
            parse_mode: 'HTML',
            disable_web_page_preview: true
        });

        return response.data.ok;
    } catch (error) {
        console.error("Failed to send Telegram message:", error);
        return false;
    }
}
