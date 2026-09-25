'use client';

import { education, profile, stats } from '@/data/profile';
import { Briefcase, FlaskConical, GraduationCap, PenLine } from 'lucide-react';
import Section, { Counter, Reveal } from './SectionHeading';

const now = [
    { icon: Briefcase, label: 'Building', value: `Production web products at ${profile.currentCompany}` },
    { icon: GraduationCap, label: 'Studying', value: `${education[0].degree}, ${education[0].institution}` },
    { icon: FlaskConical, label: 'Researching', value: 'Spatio-temporal crime hotspot detection' },
    { icon: PenLine, label: 'Writing', value: 'Notes on JavaScript internals and the maths behind ML' },
];

const AboutSection = () => (
    <Section id="about" tone="band" eyebrow="About me" title="Engineer by trade, problem-solver by habit.">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <Reveal className="space-y-5 text-pretty text-[16.5px] leading-[1.8] text-muted">
                {profile.bio.map((paragraph, i) => (
                    <p key={paragraph.slice(0, 24)} className={i === 0 ? 'text-lg font-medium leading-relaxed text-fg' : ''}>
                        {paragraph}
                    </p>
                ))}
                <div className="flex flex-wrap gap-2 pt-2">
                    {profile.focus.map((f) => (
                        <span key={f} className="pill">
                            {f}
                        </span>
                    ))}
                </div>
            </Reveal>

            <div className="space-y-4">
                <Reveal delay={0.05} className="grid grid-cols-2 gap-3">
                    {stats.map((stat) => (
                        <div key={stat.label} className="rounded-2xl border border-line bg-bg p-5">
                            <p className="text-3xl font-extrabold tracking-[-0.02em] text-fg">
                                <Counter value={stat.value} />
                            </p>
                            <p className="mt-1 text-sm text-subtle">{stat.label}</p>
                        </div>
                    ))}
                </Reveal>

                <Reveal delay={0.1} className="rounded-2xl border border-line bg-bg p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">Currently</p>
                    <ul className="mt-4 space-y-4">
                        {now.map(({ icon: Icon, label, value }) => (
                            <li key={label} className="flex items-start gap-3">
                                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent-ink">
                                    <Icon size={16} />
                                </span>
                                <span className="text-sm">
                                    <span className="block font-semibold text-fg">{label}</span>
                                    <span className="text-muted">{value}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </div>
        </div>
    </Section>
);

export default AboutSection;
