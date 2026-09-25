import { profile, socials } from '@/data/profile';
import Link from 'next/link';
import { socialIcons } from './socialIcons';

const Footer = () => (
    <footer className="border-t border-line bg-surface">
        <div className="container-page flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
            <div>
                <Link href="/" className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-fg text-sm font-bold text-bg">TA</span>
                    <span className="text-[15px] font-bold text-fg">{profile.name}</span>
                </Link>
                <p className="mt-3 max-w-sm text-sm text-muted">
                    {profile.role} in {profile.location}. Designed and built by me with Next.js, Tailwind CSS and Framer Motion.
                </p>
            </div>
            <div className="flex flex-col gap-4 md:items-end">
                <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-muted">
                    <Link href="/#about" className="hover:text-fg">About</Link>
                    <Link href="/#projects" className="hover:text-fg">Projects</Link>
                    <Link href="/blog/" className="hover:text-fg">Blog</Link>
                    <Link href="/#contact" className="hover:text-fg">Contact</Link>
                </nav>
                <div className="flex gap-2">
                    {socials.map((s) => {
                        const Icon = socialIcons[s.name];
                        return (
                            <a
                                key={s.name}
                                href={s.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.name}
                                className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-bg text-muted transition-colors hover:text-fg"
                            >
                                <Icon size={16} />
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
        <div className="border-t border-line">
            <p className="container-page py-5 text-xs text-subtle">
                © {new Date().getFullYear()} {profile.fullName}. All rights reserved.
            </p>
        </div>
    </footer>
);

export default Footer;
