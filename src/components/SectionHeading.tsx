'use client';

import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

export const Reveal = ({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay, ease }}
        className={className}
    >
        {children}
    </motion.div>
);

/** Counts up from 0 when scrolled into view. Keeps any non-numeric suffix such as "+" or "×". */
export const Counter = ({ value, decimals = 0, className }: { value: string; decimals?: number; className?: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    const reduceMotion = useReducedMotion();
    const target = Number.parseFloat(value);
    const suffix = value.replace(/^[\d.,]+/, '');
    // Server HTML carries the real number (SEO, no-JS); the client resets to 0 before first paint, then counts up in view.
    const [display, setDisplay] = useState(target);

    useLayoutEffect(() => {
        if (!reduceMotion && !Number.isNaN(target)) setDisplay(0);
    }, [reduceMotion, target]);

    useEffect(() => {
        if (!inView || Number.isNaN(target) || reduceMotion) return;
        const controls = animate(0, target, { duration: 1.4, ease, onUpdate: setDisplay });
        return () => controls.stop();
    }, [inView, target, reduceMotion]);

    if (Number.isNaN(target)) return <span className={className}>{value}</span>;
    return (
        <span ref={ref} className={`tabular-nums ${className ?? ''}`}>
            {display.toFixed(decimals)}
            {suffix}
        </span>
    );
};

type SectionProps = {
    id: string;
    eyebrow: string;
    title: ReactNode;
    description?: ReactNode;
    action?: ReactNode;
    /** `plain` uses the page background; `band` a contrasting surface strip with hairline edges. */
    tone?: 'plain' | 'band';
    className?: string;
    children: ReactNode;
};

/** Full-width section: its own background band, a heading block (eyebrow, title, description, optional action), then content. */
const Section = ({ id, eyebrow, title, description, action, tone = 'plain', className = '', children }: SectionProps) => (
    <section id={id} className={`scroll-mt-16 py-20 md:py-28 ${tone === 'band' ? 'border-y border-line bg-surface' : ''} ${className}`}>
        <div className="container-page">
            <Reveal className="mb-12 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                    <p className="eyebrow">{eyebrow}</p>
                    <h2 className="mt-3 text-balance text-3xl font-bold tracking-[-0.02em] text-fg md:text-[2.6rem] md:leading-[1.1]">{title}</h2>
                    {description && <p className="mt-4 text-pretty text-base leading-relaxed text-muted md:text-[17px]">{description}</p>}
                </div>
                {action && <div className="shrink-0">{action}</div>}
            </Reveal>
            {children}
        </div>
    </section>
);

export default Section;
