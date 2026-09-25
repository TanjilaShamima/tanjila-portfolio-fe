'use client';

import { benchmark } from '@/data/profile';
import BenchmarkChart from './lab/BenchmarkChart';
import CareerTimeline from './lab/CareerTimeline';
import StackMatrix from './lab/StackMatrix';
import Section, { Counter, Reveal } from './SectionHeading';

const best = benchmark.runs[benchmark.runs.length - 1];
const baseline = benchmark.runs[0];

const figures = [
    { value: `${best.speedup.toFixed(2)}×`, decimals: 2, label: 'Faster with 8 worker threads' },
    { value: `${(((baseline.ms - best.ms) / baseline.ms) * 100).toFixed(1)}%`, decimals: 1, label: 'Less processing time' },
    { value: `${benchmark.mergeOverheadPct}%`, decimals: 3, label: 'Time spent merging results' },
    { value: `${benchmark.records / 1_000_000}M`, decimals: 0, label: 'Log records per test run' },
];

// Always rendered with the dark palette (the `dark` class re-scopes the colour tokens) so it reads as a distinct "lab" band.
const LabSection = () => (
    <Section
        id="lab"
        tone="band"
        className="dark text-fg"
        eyebrow="Lab"
        title="My work, as data."
        description="Charts built from my own career history and from benchmarks I ran. Hover any chart for detail, or switch it to a table."
    >
        <Reveal className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {figures.map((f) => (
                <div key={f.label} className="rounded-2xl border border-line bg-bg p-5">
                    <p className="text-3xl font-extrabold tracking-[-0.02em] text-accent-ink">
                        <Counter value={f.value} decimals={f.decimals} />
                    </p>
                    <p className="mt-1 text-sm text-muted">{f.label}</p>
                </div>
            ))}
        </Reveal>
        <div className="space-y-5">
            <CareerTimeline />
            <div className="grid gap-5 lg:grid-cols-2">
                <div className="min-w-0">
                    <StackMatrix />
                </div>
                <div className="min-w-0">
                    <BenchmarkChart />
                </div>
            </div>
        </div>
    </Section>
);

export default LabSection;
