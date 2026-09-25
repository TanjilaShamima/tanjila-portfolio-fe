'use client';

import { experiences, stackMatrixTech } from '@/data/profile';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ChartFrame from './ChartFrame';

// "AWS" should match "AWS Chime", but "React.js" must not match "React Native".
const usesTech = (technologies: string[], tech: string) => technologies.some((t) => t === tech || t.startsWith(`${tech} `));

const StackMatrix = () => {
    const roles = [...experiences].reverse(); // oldest → newest, left → right
    const [hoverRow, setHoverRow] = useState<string | null>(null);
    const [hoverCol, setHoverCol] = useState<number | null>(null);

    const rows = stackMatrixTech.map((tech) => ({
        tech,
        used: roles.map((r) => usesTech(r.technologies, tech)),
    }));
    const constants = rows.filter((r) => r.used.every(Boolean)).map((r) => r.tech);

    return (
        <ChartFrame
            figure="2"
            title="What I used, where"
            caption={
                <>
                    {constants.length > 0 ? (
                        <>
                            <span className="text-fg">{constants.join(' and ')}</span> run through every role
                        </>
                    ) : (
                        'No single tool runs through every role'
                    )}
                    ; TypeScript and AWS arrive with the senior years. Filled dots mark a technology listed for that role.
                </>
            }
            table={{
                head: ['Technology', ...roles.map((r) => r.company)],
                rows: rows.map((r) => [r.tech, ...r.used.map((u) => (u ? 'Yes' : '—'))]),
            }}
        >
            <div className="overflow-x-auto" onMouseLeave={() => { setHoverRow(null); setHoverCol(null); }}>
                <table className="w-full min-w-[26rem] border-collapse text-left">
                    <thead>
                        <tr>
                            <th className="w-32" />
                            {roles.map((r, ci) => (
                                <th
                                    key={r.company + r.period}
                                    className={`pb-3 text-center align-bottom font-mono text-[10px] font-normal uppercase leading-tight tracking-wider transition-colors ${hoverCol === ci ? 'text-fg' : 'text-subtle'}`}
                                >
                                    {r.company.split(' ')[0]}
                                    <span className="block normal-case tracking-normal">{r.period.match(/\d{4}/)?.[0]}</span>
                                </th>
                            ))}
                            <th className="w-10" />
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, ri) => {
                            const count = row.used.filter(Boolean).length;
                            return (
                                <tr key={row.tech} onMouseEnter={() => setHoverRow(row.tech)} className="group">
                                    <th scope="row" className={`border-t border-line py-2 pr-3 text-sm font-normal transition-colors ${hoverRow === row.tech ? 'text-accent-ink' : 'text-fg'}`}>
                                        {row.tech}
                                    </th>
                                    {row.used.map((used, ci) => (
                                        <td
                                            key={ci}
                                            onMouseEnter={() => setHoverCol(ci)}
                                            className={`border-t border-line py-2 text-center transition-colors ${hoverCol === ci || hoverRow === row.tech ? 'bg-fg/[0.03]' : ''}`}
                                        >
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ type: 'spring', stiffness: 400, damping: 22, delay: 0.1 + ri * 0.04 + ci * 0.06 }}
                                                className={`inline-block rounded-full ${
                                                    used
                                                        ? `h-2.5 w-2.5 ${hoverRow === row.tech ? 'bg-accent' : 'bg-fg'}`
                                                        : 'h-1 w-1 bg-fg/20'
                                                }`}
                                                aria-label={used ? 'used' : 'not used'}
                                            />
                                        </td>
                                    ))}
                                    <td className="border-t border-line py-2 text-right font-mono text-[11px] tabular-nums text-subtle">
                                        {count}/{roles.length}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </ChartFrame>
    );
};

export default StackMatrix;
