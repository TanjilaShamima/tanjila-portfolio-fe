'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const ThemeToggle = ({ className = '' }: { className?: string }) => {
    const [isDark, setIsDark] = useState<boolean | null>(null);

    useEffect(() => setIsDark(document.documentElement.classList.contains('dark')), []);

    const toggle = () => {
        const next = !document.documentElement.classList.contains('dark');
        document.documentElement.classList.toggle('dark', next);
        try {
            localStorage.setItem('theme', next ? 'dark' : 'light');
        } catch {
            // Storage can be blocked (private mode); the toggle still works for this visit.
        }
        setIsDark(next);
    };

    return (
        <button
            onClick={toggle}
            className={`grid h-9 w-9 place-items-center overflow-hidden rounded-xl border border-line bg-surface text-muted shadow-card transition-colors hover:text-fg ${className}`}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={isDark ? 'moon' : 'sun'}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {isDark ? <Moon size={16} /> : <Sun size={16} />}
                </motion.span>
            </AnimatePresence>
        </button>
    );
};

export default ThemeToggle;
