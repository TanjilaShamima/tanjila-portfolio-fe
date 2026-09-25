'use client';

import { benchmark } from '@/data/profile';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import ChartFrame, { Tooltip, TooltipRow, type TooltipState } from './ChartFrame';

const MAX_MS = 700;
const ticks = [0, 200, 400, 600];

const BenchmarkChart = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [tooltip, setTooltip] = useState<TooltipState>(null);
    const [hovered, setHovered] = useState<string | null>(null);
    const fastest = benchmark.runs.reduce((a, b) => (b.ms < a.ms ? b : a));
    const baseline = benchmark.runs[0];

    const showTooltip = (e: React.MouseEvent, run: (typeof benchmark.runs)[number]) => {
        const box = ref.current?.getBoundingClientRect();
        if (!box) return;
        setHovered(run.label);
        setTooltip({
            x: Math.min(Math.max(e.clientX - box.left, 80), box.width - 80),
            y: e.clientY - box.top,
            content: (
                <>
                    <p className="mb-1 font-medium text-fg">{run.label}</p>
                    <TooltipRow label="Time" value={`${run.ms.toFixed(1)} ms`} />
                    <TooltipRow label="Speedup" value={`${run.speedup.toFixed(2)}×`} />
                    {run.efficiency !== null && <TooltipRow label="Efficiency" value={`${run.efficiency.toFixed(1)}%`} />}
                </>
            ),
        });
    };

    return (
        <ChartFrame
            figure="3"
            title="Log analysis time on 1M records, by worker count"
            caption={
                <>
                    Splitting a 59.8 MB log into newline-aligned byte ranges across 8 Node.js worker threads cut analysis from{' '}
                    <span className="text-fg">660 ms to 186 ms</span>. Returns diminish past 4 workers — efficiency falls from 73% to 44%.
                </>
            }
            source="Parallel Server Log Analyzer, saved single-sweep benchmark (no repeated trials)"
            table={{
                head: ['Configuration', 'Time (ms)', 'Speedup', 'Efficiency'],
                rows: benchmark.runs.map((r) => [r.label, r.ms.toFixed(3), `${r.speedup.toFixed(3)}×`, r.efficiency === null ? '—' : `${r.efficiency}%`]),
            }}
        >
            <div ref={ref} className="relative" onMouseLeave={() => { setTooltip(null); setHovered(null); }}>
                <div className="grid grid-cols-[5.5rem_1fr] gap-x-3">
                    <div />
                    <div className="relative">
                        {/* Recessive gridlines behind the bars */}
                        <div className="pointer-events-none absolute inset-x-0 top-0" style={{ height: `${benchmark.runs.length * 40}px` }}>
                            {ticks.map((t) => (
                                <span key={t} className="absolute top-0 h-full w-px bg-line" style={{ left: `${(t / MAX_MS) * 100}%` }} />
                            ))}
                        </div>
                    </div>
                </div>

                <ul className="relative space-y-0">
                    {benchmark.runs.map((run, i) => {
                        const isFastest = run === fastest;
                        const isLabeled = isFastest || run === baseline;
                        const dim = hovered && hovered !== run.label;
                        return (
                            <li
                                key={run.label}
                                className="grid h-10 cursor-default grid-cols-[5.5rem_1fr] items-center gap-x-3"
                                onMouseMove={(e) => showTooltip(e, run)}
                            >
                                <span className={`font-mono text-xs transition-colors ${isFastest ? 'text-fg' : 'text-muted'}`}>{run.label}</span>
                                <div className="relative flex h-full items-center">
                                    <motion.span
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                        className={`block h-3.5 origin-left rounded-r-[4px] transition-opacity ${isFastest ? 'bg-accent' : 'bg-fg/25'} ${dim ? 'opacity-40' : ''}`}
                                        style={{ width: `${(run.ms / MAX_MS) * 100}%` }}
                                    />
                                    {isLabeled && (
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 1 + i * 0.1 }}
                                            className="ml-2 whitespace-nowrap font-mono text-[11px] tabular-nums text-fg"
                                        >
                                            {Math.round(run.ms)} ms{isFastest && <span className="text-muted"> · {run.speedup.toFixed(2)}×</span>}
                                        </motion.span>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>

                <div className="mt-2 grid grid-cols-[5.5rem_1fr] gap-x-3">
                    <div />
                    <div className="relative h-4 font-mono text-[10px] text-subtle">
                        {ticks.map((t) => (
                            <span key={t} className="absolute -translate-x-1/2 first:translate-x-0" style={{ left: `${(t / MAX_MS) * 100}%` }}>
                                {t}
                            </span>
                        ))}
                        <span className="absolute right-0">ms</span>
                    </div>
                </div>

                <Tooltip state={tooltip} />
            </div>

            {/* Parallel efficiency = speedup ÷ workers. Above 100% at low counts is a warm-up artefact, noted in the report. */}
            <div className="mt-6 rounded-xl border border-line bg-bg p-4">
                <p className="text-xs font-semibold text-fg">Parallel efficiency</p>
                <p className="text-xs text-subtle">Speedup divided by worker count — how much each extra thread pays off.</p>
                <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
                    {benchmark.runs
                        .filter((r) => r.efficiency !== null)
                        .map((r, i) => (
                            <li key={r.label}>
                                <div className="flex items-baseline justify-between text-xs">
                                    <span className="text-muted">{r.label}</span>
                                    <span className="font-mono font-semibold tabular-nums text-fg">{Math.round(r.efficiency ?? 0)}%</span>
                                </div>
                                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-fg/[0.07]">
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.9, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                        className="h-full origin-left rounded-full bg-fg/40"
                                        style={{ width: `${Math.min(r.efficiency ?? 0, 100)}%` }}
                                    />
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </ChartFrame>
    );
};

export default BenchmarkChart;
