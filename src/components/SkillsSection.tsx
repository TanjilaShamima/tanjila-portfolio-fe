'use client';

import { learning, skillGroups } from '@/data/profile';
import { AnimatePresence, motion } from 'framer-motion';
import { Cloud, Layout, Radio, Server, Sprout, type LucideIcon } from 'lucide-react';
import { useState } from 'react';
import Section, { Reveal } from './SectionHeading';
import TechIcon, { hasBrandIcon } from './TechIcon';

const groupIcons: Record<string, LucideIcon> = {
    Frontend: Layout,
    Backend: Server,
    'Real-time & Security': Radio,
    'Cloud & Tooling': Cloud,
};

const SkillsSection = () => {
    const [active, setActive] = useState(skillGroups[0].title);
    const group = skillGroups.find((g) => g.title === active) ?? skillGroups[0];

    return (
        <Section id="skills" eyebrow="Skills" title="The toolkit I ship with." description="Technologies I use in production every week, grouped by where they sit in the stack.">
            <Reveal className="grid gap-5 lg:grid-cols-[280px_1fr]">
                <div role="tablist" aria-label="Skill categories" className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
                    {skillGroups.map((g) => {
                        const Icon = groupIcons[g.title] ?? Layout;
                        const isActive = g.title === active;
                        return (
                            <button
                                key={g.title}
                                role="tab"
                                aria-selected={isActive}
                                onClick={() => setActive(g.title)}
                                className={`relative flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-colors ${
                                    isActive ? 'border-fg/15 bg-surface shadow-card' : 'border-transparent hover:bg-fg/[0.04]'
                                }`}
                            >
                                <span className={`grid h-9 w-9 place-items-center rounded-xl transition-colors ${isActive ? 'bg-accent text-white' : 'bg-fg/[0.06] text-muted'}`}>
                                    <Icon size={17} />
                                </span>
                                <span>
                                    <span className="block whitespace-nowrap text-sm font-semibold text-fg">{g.title}</span>
                                    <span className="hidden text-xs text-subtle lg:block">{g.skills.length} technologies</span>
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="card min-h-[18rem] p-6" role="tabpanel">
                    <p className="text-sm text-muted">{group.description}</p>
                    <AnimatePresence mode="wait">
                        <motion.ul
                            key={group.title}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            variants={{ show: { transition: { staggerChildren: 0.035 } } }}
                            className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4"
                        >
                            {group.skills.map((skill) => (
                                <motion.li
                                    key={skill}
                                    variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                                    className="flex items-center gap-3 rounded-xl border border-line bg-bg px-3.5 py-3 transition-colors hover:border-fg/20"
                                >
                                    <TechIcon name={skill} size={22} />
                                    <span className="text-sm font-semibold text-fg">{skill}</span>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </AnimatePresence>
                </div>
            </Reveal>

            <Reveal delay={0.08} className="mt-5 flex flex-col gap-3 rounded-2xl border border-dashed border-line p-5 sm:flex-row sm:items-center">
                <p className="flex shrink-0 items-center gap-2 text-sm font-semibold text-fg">
                    <Sprout size={16} className="text-accent-ink" /> Learning next
                </p>
                <div className="flex flex-wrap gap-2">
                    {learning.map((item) => (
                        <span key={item} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-muted">
                            {hasBrandIcon(item) && <TechIcon name={item} size={13} />}
                            {item}
                        </span>
                    ))}
                </div>
            </Reveal>
        </Section>
    );
};

export default SkillsSection;
