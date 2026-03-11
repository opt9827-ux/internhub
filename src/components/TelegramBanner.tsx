import { Send } from 'lucide-react';

export default function TelegramBanner() {
    return (
        <div className="w-full relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 sm:p-12 text-white shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4 max-w-xl text-center md:text-left">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Get Daily Internship Alerts</h2>
                    <p className="text-blue-100 text-lg sm:text-xl">
                        Join our Telegram Channel to receive instant notifications when new CS internships are posted. Don't miss out on your dream role.
                    </p>
                </div>
                <div className="flex-shrink-0">
                    <a
                        href="https://t.me/internhub_cs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg transition-all hover:scale-105 hover:bg-neutral-50 active:scale-95"
                    >
                        <Send className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                        Join Telegram
                    </a>
                </div>
            </div>
        </div>
    );
}
