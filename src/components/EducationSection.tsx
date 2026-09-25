'use client';

import { awards, education } from '@/data/profile';
import { GraduationCap, Medal } from 'lucide-react';
import Section, { Reveal } from './SectionHeading';

const EducationSection = () => (
    <Section id="education" tone="band" eyebrow="Education & awards" title="Where the fundamentals came from.">
        <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-4">
                {education.map((edu, i) => (
                    <Reveal key={edu.degree} delay={i * 0.06} className="flex gap-4 rounded-2xl border border-line bg-bg p-6">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent-ink">
                            <GraduationCap size={20} />
                        </span>
                        <div className="min-w-0">
                            <span className="text-xs font-semibold uppercase tracking-wide text-subtle">{edu.period ?? edu.status}</span>
                            <h3 className="mt-1 text-lg font-bold tracking-[-0.01em] text-fg">{edu.degree}</h3>
                            <p className="text-sm font-medium text-accent-ink">{edu.institution}</p>
                            <ul className="mt-3 space-y-1.5">
                                {edu.highlights.map((h) => (
                                    <li key={h} className="flex gap-2.5 text-sm text-muted">
                                        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                                        {h}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                ))}
            </div>

            <Reveal delay={0.1} className="rounded-2xl border border-line bg-bg p-6">
                <h3 className="flex items-center gap-2 text-base font-bold text-fg">
                    <Medal size={18} className="text-accent-ink" /> Programming contests
                </h3>
                <ol className="mt-5 space-y-3">
                    {awards.map((award, i) => (
                        <li key={award.title} className="flex items-start gap-4 rounded-xl border border-line bg-surface p-4">
                            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-fg/[0.06] text-sm font-bold text-fg">{i + 1}</span>
                            <div>
                                <p className="text-sm font-semibold leading-snug text-fg">{award.title}</p>
                                <p className="mt-1 text-xs text-subtle">
                                    <span className="font-semibold text-accent-ink">{award.result}</span>
                                    {award.year && ` · ${award.year}`}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>
            </Reveal>
        </div>
    </Section>
);

export default EducationSection;
