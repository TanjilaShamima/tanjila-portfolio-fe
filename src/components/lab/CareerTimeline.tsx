'use client';

import { experiences } from '@/data/profile';
import { currentMonthIndex, formatDuration, parsePeriod } from '@/lib/period';
import { motion } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import ChartFrame, { Tooltip, TooltipRow, type TooltipState } from './ChartFrame';

const CareerTimeline = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [tooltip, setTooltip] = useState<TooltipState>(null);

    const { rows, domainStart, domainEnd, years, totalMonths } = useMemo(() => {
        const parsed = [...experiences].reverse().map((exp) => ({ ...exp, ...parsePeriod(exp.period) }));
        const firstYear = Math.floor(Math.min(...parsed.map((r) => r.start)) / 12);
        const domainStart = firstYear * 12;
        const domainEnd = Math.max(currentMonthIndex(), ...parsed.map((r) => r.end)) + 1;
        const lastYear = Math.ceil(domainEnd / 12);
        const years = Array.from({ length: lastYear - firstYear + 1 }, (_, i) => firstYear + i);
        const totalMonths = parsed.reduce((sum, r) => sum + r.months, 0);
        return { rows: parsed, domainStart, domainEnd: lastYear * 12, years, totalMonths };
    }, []);

    const span = domainEnd - domainStart;
    const longest = rows.reduce((a, b) => (b.months > a.months ? b : a));
    const pct = (month: number) => `${((month - domainStart) / span) * 100}%`;

    return (
        <ChartFrame
            figure="1"
            title="Career, month by month"
            caption={
                <>
                    {formatDuration(totalMonths)} across {rows.length} companies since {years[0]}. The longest stretch was{' '}
                    <span className="text-fg">
                        {formatDuration(longest.months)} at {longest.company}
                    </span>
                    .
                </>
            }
            table={{
                head: ['Company', 'Role', 'Period', 'Tenure'],
                rows: rows.map((r) => [r.company, r.title, r.period, formatDuration(r.months)]),
            }}
        >
            <div ref={ref} className="relative" onMouseLeave={() => setTooltip(null)} suppressHydrationWarning>
                <div className="relative">
                    {years.map((y) => (
                        <span key={y} className="pointer-events-none absolute top-0 h-full w-px bg-line" style={{ left: pct(y * 12) }} />
                    ))}

                    <ul className="relative space-y-3 py-1">
                        {rows.map((row, i) => (
                            <li
                                key={row.company + row.period}
                                className="relative h-11"
                                onMouseMove={(e) => {
                                    const box = ref.current?.getBoundingClientRect();
                                    if (!box) return;
                                    setTooltip({
                                        x: Math.min(Math.max(e.clientX - box.left, 90), box.width - 90),
                                        y: e.clientY - box.top,
                                        content: (
                                            <>
                                                <p className="mb-1 font-medium text-fg">{row.company}</p>
                                                <TooltipRow label="Role" value={row.title} />
                                                <TooltipRow label="Tenure" value={formatDuration(row.months)} />
                                            </>
                                        ),
                                    });
                                }}
                            >
                                <span
                                    className="absolute top-0 whitespace-nowrap text-xs text-fg"
                                    style={{ left: pct(row.start), transform: row.start - domainStart > span * 0.7 ? 'translateX(-60%)' : undefined }}
                                >
                                    {row.company}
                                </span>
                                <motion.span
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.9, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                    className={`absolute bottom-1 h-3 origin-left rounded-[4px] ${row.current ? 'bg-accent' : 'bg-fg/25'}`}
                                    style={{ left: pct(row.start), width: `${(row.months / span) * 100}%` }}
                                />
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="relative mt-2 h-4 font-mono text-[10px] text-subtle">
                    {years.slice(0, -1).map((y) => (
                        <span key={y} className="absolute" style={{ left: pct(y * 12) }}>
                            &nbsp;{y}
                        </span>
                    ))}
                </div>

                <Tooltip state={tooltip} />
            </div>
        </ChartFrame>
    );
};

export default CareerTimeline;
