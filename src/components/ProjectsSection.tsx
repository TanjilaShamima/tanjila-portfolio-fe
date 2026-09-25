'use client';

import { projects, socials } from '@/data/profile';
import { ArrowUpRight, Github } from 'lucide-react';
import Section, { Reveal } from './SectionHeading';
import TechIcon from './TechIcon';

const githubUrl = socials.find((s) => s.name === 'GitHub')?.url;

/* Small line diagrams, one per project, drawn in the ink colour with the accent for the "interesting" part.
   They animate on card hover via the `group` class. */

const HotspotGlyph = () => {
    // Deterministic 12×6 grid with a few hot cells, standing in for a crime-density map.
    const hot = new Set([15, 16, 27, 28, 29, 40, 52, 53, 45, 57]);
    return (
        <svg viewBox="0 0 240 120" className="h-full w-full" aria-hidden>
            {Array.from({ length: 72 }, (_, i) => {
                const x = (i % 12) * 20 + 10;
                const y = Math.floor(i / 12) * 20 + 10;
                const isHot = hot.has(i);
                return (
                    <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r={isHot ? 5 : 2}
                        className={isHot ? 'origin-center fill-accent transition-transform duration-500 [transform-box:fill-box] group-hover:scale-150' : 'fill-fg/20'}
                    />
                );
            })}
        </svg>
    );
};

const WorkersGlyph = () => (
    <svg viewBox="0 0 240 120" className="h-full w-full" aria-hidden>
        <rect x="8" y="12" width="224" height="10" rx="2" className="fill-fg/15" />
        {Array.from({ length: 8 }, (_, i) => (
            <rect
                key={i}
                x="8"
                y={34 + i * 10}
                height="6"
                rx="2"
                width={62 + ((i * 7) % 5)}
                className="origin-left fill-accent transition-transform duration-700 [transform-box:fill-box] group-hover:scale-x-[1.35]"
                style={{ transitionDelay: `${i * 40}ms` }}
            />
        ))}
    </svg>
);

const AuthGlyph = () => (
    <svg viewBox="0 0 240 120" className="h-full w-full" aria-hidden fill="none">
        <path d="M20 60h60" className="stroke-fg/25" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M160 60h60" className="stroke-fg/25" strokeWidth="2" strokeDasharray="4 4" />
        <rect x="92" y="52" width="56" height="44" rx="6" className="stroke-fg/60" strokeWidth="2" />
        <path d="M104 52v-12a16 16 0 0 1 32 0v12" className="stroke-accent transition-transform duration-500 group-hover:-translate-y-2" strokeWidth="2" />
        <circle cx="120" cy="74" r="4" className="fill-accent" />
        <circle cx="20" cy="60" r="5" className="fill-fg/40" />
        <circle cx="220" cy="60" r="5" className="fill-fg/40" />
    </svg>
);

const RegressionGlyph = () => {
    const points = [
        [20, 96], [36, 88], [52, 90], [66, 76], [82, 80], [96, 66], [112, 70], [128, 56], [142, 58], [158, 44], [174, 48], [190, 34], [206, 38], [220, 24],
    ];
    return (
        <svg viewBox="0 0 240 120" className="h-full w-full" aria-hidden fill="none">
            {points.map(([x, y]) => (
                <circle key={x} cx={x} cy={y} r="3" className="fill-fg/35" />
            ))}
            <path
                d="M16 100 L224 22"
                className="stroke-accent [stroke-dasharray:240] [stroke-dashoffset:240] transition-[stroke-dashoffset] duration-700 group-hover:[stroke-dashoffset:0]"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
};

const glyphs: Record<string, () => JSX.Element> = {
    'Crime Hotspot Detection': HotspotGlyph,
    'Parallel Server Log Analyzer': WorkersGlyph,
    'Backend Authentication Service': AuthGlyph,
    'Machine Learning Journey': RegressionGlyph,
};

const ProjectsSection = () => (
    <Section
        id="projects"
        tone="band"
        eyebrow="Projects"
        title="Selected work, built in the open."
        description="Most of my professional work is client-owned and under NDA. These are public projects from research and study — code included."
        action={
            githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    <Github size={15} /> All repositories
                </a>
            )
        }
    >
        <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project, i) => {
                const Glyph = glyphs[project.title] ?? HotspotGlyph;
                return (
                    <Reveal key={project.title} delay={(i % 2) * 0.08} className="h-full">
                        <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-bg transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                            <div className="relative flex h-52 items-center justify-center overflow-hidden border-b border-line bg-gradient-to-br from-accent/[0.12] via-accent/[0.04] to-transparent px-10">
                                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(var(--fg)/0.07)_1px,transparent_1px)] [background-size:16px_16px]" />
                                <div className="relative h-32 w-full max-w-[260px] transition-transform duration-500 group-hover:scale-105">
                                    <Glyph />
                                </div>
                                <span className="absolute left-5 top-5 rounded-full border border-line bg-surface/90 px-3 py-1 text-xs font-semibold text-fg backdrop-blur">
                                    {project.kind}
                                </span>
                                <span className="absolute right-5 top-5 text-xs font-semibold text-subtle">{project.year}</span>
                            </div>

                            <div className="flex flex-1 flex-col p-6">
                                <h3 className="text-xl font-bold tracking-[-0.01em] text-fg">{project.title}</h3>
                                <p className="mt-2 flex-1 text-pretty text-[15px] leading-relaxed text-muted">{project.summary}</p>
                                {project.highlight && (
                                    <p className="mt-4 inline-flex w-fit rounded-lg bg-accent/10 px-3 py-1.5 text-sm font-semibold text-accent-ink">{project.highlight}</p>
                                )}
                                <div className="mt-5 flex flex-wrap gap-1.5">
                                    {project.technologies.map((t) => (
                                        <span key={t} className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-2 py-1 text-xs font-medium text-muted">
                                            <TechIcon name={t} size={13} />
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
                                    {project.links.map((link) => (
                                        <a
                                            key={link.url}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-fg transition-colors hover:bg-fg/[0.05]"
                                        >
                                            <Github size={15} /> {link.label} <ArrowUpRight size={14} className="text-subtle" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </article>
                    </Reveal>
                );
            })}
        </div>
    </Section>
);

export default ProjectsSection;
