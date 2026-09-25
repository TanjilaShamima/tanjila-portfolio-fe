'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState, type ReactNode } from 'react';

export type TooltipState = { x: number; y: number; content: ReactNode } | null;

export const Tooltip = ({ state }: { state: TooltipState }) => (
    <AnimatePresence>
        {state && (
            <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="pointer-events-none absolute z-10 min-w-[10rem] -translate-x-1/2 -translate-y-full rounded-lg border border-line bg-surface px-3 py-2 text-xs shadow-lg"
                style={{ left: state.x, top: state.y - 10 }}
            >
                {state.content}
            </motion.div>
        )}
    </AnimatePresence>
);

export const TooltipRow = ({ label, value }: { label: string; value: ReactNode }) => (
    <div className="flex justify-between gap-4 py-0.5">
        <span className="text-muted">{label}</span>
        <span className="font-mono tabular-nums text-fg">{value}</span>
    </div>
);

type ChartFrameProps = {
    figure: string;
    title: string;
    caption: ReactNode;
    source?: ReactNode;
    table: { head: string[]; rows: (string | number)[][] };
    children: ReactNode;
    className?: string;
};

/** A figure with a numbered title, caption, and a toggle that swaps the chart for its data table. */
const ChartFrame = ({ figure, title, caption, source, table, children, className }: ChartFrameProps) => {
    const [showTable, setShowTable] = useState(false);

    return (
        <motion.figure
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`flex h-full min-w-0 flex-col rounded-2xl border border-line bg-bg p-5 shadow-card sm:p-6 ${className ?? ''}`}
        >
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="label">Fig. {figure}</p>
                    <h3 className="mt-1 text-base font-semibold tracking-[-0.01em] text-fg">{title}</h3>
                </div>
                <button
                    onClick={() => setShowTable((v) => !v)}
                    className="shrink-0 rounded-lg border border-line bg-bg px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:text-fg"
                    aria-pressed={showTable}
                >
                    {showTable ? 'Chart' : 'Table'}
                </button>
            </div>

            <div className="mt-5 flex-1">
                {showTable ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr>
                                    {table.head.map((h) => (
                                        <th key={h} className="border-b border-fg/30 py-2 pr-4 font-mono text-[11px] font-normal uppercase tracking-wider text-subtle">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {table.rows.map((row, ri) => (
                                    <tr key={ri}>
                                        {row.map((cell, ci) => (
                                            <td key={ci} className={`border-b border-line py-2 pr-4 ${ci > 0 ? 'font-mono tabular-nums' : ''} text-fg`}>
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    children
                )}
            </div>

            <figcaption className="mt-5 border-t border-line pt-4 text-[13.5px] leading-relaxed text-muted">
                {caption}
                {source && <span className="mt-2 block font-mono text-[11px] text-subtle">Source: {source}</span>}
            </figcaption>
        </motion.figure>
    );
};

export default ChartFrame;
