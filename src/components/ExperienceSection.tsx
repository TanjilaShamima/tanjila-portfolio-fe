'use client';

import { experiences, profile } from '@/data/profile';
import { formatDuration, parsePeriod } from '@/lib/period';
import { motion, useScroll } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { useRef } from 'react';
import Section from './SectionHeading';
import TechIcon from './TechIcon';

const ExperienceSection = () => {
    const listRef = useRef<HTMLOListElement>(null);
    // The accent line grows as the timeline scrolls through the middle of the viewport.
    const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] });

    return (
        <Section
            id="experience"
            eyebrow="Experience"
            title="Six years, four teams, a lot of shipped products."
            description="From a custom CMS at my first job to real-time video, chat and SEO-heavy platforms today."
            action={
                <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    Full résumé <ArrowUpRight size={15} />
                </a>
            }
        >
            <ol ref={listRef} className="relative space-y-8 md:space-y-12">
                {/* Track + progress line: left edge on mobile, centred on desktop */}
                <span className="absolute bottom-0 left-[11px] top-0 w-0.5 rounded-full bg-line md:left-1/2 md:-translate-x-1/2" />
                <motion.span
                    style={{ scaleY: scrollYProgress }}
                    className="absolute bottom-0 left-[11px] top-0 w-0.5 origin-top rounded-full bg-accent md:left-1/2 md:-translate-x-1/2"
                />

                {experiences.map((exp, i) => {
                    const { months } = parsePeriod(exp.period);
                    const onLeft = i % 2 === 0;
                    return (
                        <li key={`${exp.company}-${exp.period}`} className="relative grid pl-10 md:grid-cols-2 md:gap-16 md:pl-0">
                            <span
                                className={`absolute left-0 top-6 grid h-6 w-6 place-items-center rounded-full border-2 bg-bg md:left-1/2 md:-translate-x-1/2 ${
                                    exp.current ? 'border-accent' : 'border-line'
                                }`}
                            >
                                <span className={`h-2 w-2 rounded-full ${exp.current ? 'bg-accent' : 'bg-subtle/60'}`} />
                            </span>

                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.8, delay: 0.15 }}
                                className={`hidden pt-5 md:row-start-1 md:block ${onLeft ? 'md:col-start-2' : 'md:col-start-1 md:text-right'}`}
                            >
                                <p className="text-3xl font-extrabold tracking-[-0.02em] text-fg">{exp.period}</p>
                                <p className="mt-2 text-sm font-semibold text-accent-ink" suppressHydrationWarning>
                                    {formatDuration(months)} at {exp.company}
                                </p>
                                <p className={`mt-1 flex items-center gap-1 text-sm text-subtle ${onLeft ? '' : 'justify-end'}`}>
                                    <MapPin size={13} /> {exp.location}
                                </p>
                                {exp.current && <span className="pill mt-3">Current role</span>}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: onLeft ? -24 : 24 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className={`card card-hover p-6 md:row-start-1 ${onLeft ? 'md:col-start-1' : 'md:col-start-2'}`}
                            >
                                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold md:hidden">
                                    <span className="rounded-full bg-fg/[0.06] px-2.5 py-1 text-fg">{exp.period}</span>
                                    <span className="text-subtle" suppressHydrationWarning>
                                        {formatDuration(months)}
                                    </span>
                                    {exp.current && <span className="pill">Current</span>}
                                </div>
                                <h3 className="mt-4 text-lg font-bold tracking-[-0.01em] text-fg">{exp.title}</h3>
                                <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-sm">
                                    <span className="font-semibold text-accent-ink">{exp.company}</span>
                                    <span className="inline-flex items-center gap-1 text-xs text-subtle">
                                        <MapPin size={12} /> {exp.location}
                                    </span>
                                </p>
                                <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">{exp.description}</p>
                                <ul className="mt-4 space-y-2">
                                    {exp.achievements.map((a) => (
                                        <li key={a} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                                            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                                            {a}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-4">
                                    {exp.technologies.map((t) => (
                                        <span key={t} className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-bg px-2 py-1 text-xs font-medium text-muted">
                                            <TechIcon name={t} size={13} />
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </li>
                    );
                })}
            </ol>
        </Section>
    );
};

export default ExperienceSection;
