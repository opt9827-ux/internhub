import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-full border-t border-white/10 bg-background py-8 mt-auto">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                    <h2 className="text-lg font-semibold tracking-tight text-primary-foreground">InternHub</h2>
                    <p className="text-sm text-muted-foreground mt-1">The automated internship aggregator for CS students.</p>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <Link href="/" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link>
                    <Link href="/" className="hover:text-primary-foreground transition-colors">Terms of Service</Link>
                    <a href="https://t.me/internhub_cs" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">Telegram</a>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-8 text-center text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} InternHub. All rights reserved. Built automatically.
            </div>
        </footer>
    );
}
