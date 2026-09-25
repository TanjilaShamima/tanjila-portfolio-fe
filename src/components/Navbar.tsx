'use client';

import { profile } from '@/data/profile';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

const links = [
    { id: 'about', name: 'About' },
    { id: 'experience', name: 'Experience' },
    { id: 'projects', name: 'Projects' },
    { id: 'skills', name: 'Skills' },
    { id: 'lab', name: 'Lab' },
    { id: 'blog', name: 'Blog' },
    { id: 'contact', name: 'Contact' },
];

const Navbar = () => {
    const pathname = usePathname();
    const isHome = pathname === '/';
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('');

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 12);
            if (!isHome) return;
            const marker = window.scrollY + window.innerHeight / 3;
            let current = '';
            for (const { id } of links) {
                const el = document.getElementById(id);
                if (el && el.offsetTop <= marker) current = id;
            }
            setActive(current);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [isHome]);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
    }, [open]);

    const href = (id: string) => (id === 'blog' && !isHome ? '/blog/' : isHome ? `#${id}` : `/#${id}`);
    const isActive = (id: string) => (id === 'blog' && pathname.startsWith('/blog')) || active === id;

    return (
        <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? 'border-b border-line bg-bg/80 backdrop-blur-lg' : 'border-b border-transparent'}`}>
            <nav className="container-page flex h-16 items-center justify-between gap-4">
                <Link href="/" className="flex items-center gap-2.5" aria-label="Home">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-fg text-sm font-bold text-bg">TA</span>
                    <span className="hidden text-[15px] font-bold tracking-[-0.01em] text-fg sm:block">{profile.name}</span>
                </Link>

                <ul className="hidden items-center gap-1 rounded-full border border-line bg-surface/70 p-1 shadow-card lg:flex">
                    {links.map((l) => (
                        <li key={l.id}>
                            <a href={href(l.id)} className={`relative block rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${isActive(l.id) ? 'text-fg' : 'text-muted hover:text-fg'}`}>
                                {isActive(l.id) && (
                                    <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-fg/[0.07]" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                                )}
                                {l.name}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-primary hidden !py-2 sm:inline-flex">
                        Résumé <ArrowUpRight size={15} />
                    </a>
                    <button
                        onClick={() => setOpen((v) => !v)}
                        className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-surface text-fg shadow-card lg:hidden"
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        aria-expanded={open}
                    >
                        {open ? <X size={17} /> : <Menu size={17} />}
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden lg:hidden"
                    >
                        <ul className="container-page grid gap-1 pb-5">
                            {links.map((l) => (
                                <li key={l.id}>
                                    <a
                                        href={href(l.id)}
                                        onClick={() => setOpen(false)}
                                        className={`block rounded-xl px-4 py-3 text-base font-semibold ${isActive(l.id) ? 'bg-fg/[0.06] text-fg' : 'text-muted'}`}
                                    >
                                        {l.name}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-2 w-full">
                                    View résumé <ArrowUpRight size={15} />
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
