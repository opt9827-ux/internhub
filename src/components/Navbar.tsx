import Link from 'next/link';
import { Search } from 'lucide-react';
import { Suspense } from 'react';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-semibold tracking-tight text-primary-foreground">InternHub</span>
                </Link>
                <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-muted-foreground">
                    <Link href="/" className="hover:text-primary-foreground transition-colors">Home</Link>
                    <Link href="/guidelines" className="hover:text-primary-foreground transition-colors">Guidelines</Link>
                    <Link href="/resumes" className="hover:text-primary-foreground transition-colors">Resumes</Link>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="p-2 text-muted-foreground hover:text-primary-foreground transition-colors rounded-full hover:bg-white/5">
                        <Search className="w-5 h-5" />
                    </button>
                    <a
                        href="https://t.me/internhub_cs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:inline-flex h-9 items-center justify-center rounded-full bg-primary-foreground px-4 py-2 text-sm font-medium text-primary shadow transition-colors hover:bg-primary-foreground/90"
                    >
                        Join Telegram
                    </a>
                </div>
            </div>
        </nav>
    );
}
