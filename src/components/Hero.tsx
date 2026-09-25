'use client';

import portrait from '@/@assets/images/profile-1.jpg';
import { education, profile, socials } from '@/data/profile';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Briefcase, Code2, GraduationCap, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { socialIcons } from './socialIcons';

const specialties = ['React & Next.js apps', 'Node.js APIs', 'real-time products', 'data-driven features'];
const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
});

const RotatingWord = () => {
    const [i, setI] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setI((n) => (n + 1) % specialties.length), 2600);
        return () => clearInterval(id);
    }, []);
    return (
        <span className="relative inline-flex h-[1.15em] overflow-hidden align-bottom">
            <AnimatePresence mode="wait">
                <motion.span
                    key={specialties[i]}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.45, ease }}
                    className="whitespace-nowrap text-accent-ink"
                >
                    {specialties[i]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

const FloatingCard = ({ icon: Icon, title, text, className, delay }: { icon: typeof Briefcase; title: string; text: string; className: string; delay: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay, ease }}
        className={`absolute flex items-center gap-3 rounded-2xl border border-line bg-surface/95 px-4 py-3 shadow-lift backdrop-blur ${className}`}
    >
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/10 text-accent-ink">
            <Icon size={17} />
        </span>
        <span>
            <span className="block text-sm font-bold text-fg">{title}</span>
            <span className="block text-xs text-subtle">{text}</span>
        </span>
    </motion.div>
);

const Hero = () => (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
        {/* Dot grid fading out from the top, plus one soft light behind the portrait */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(var(--fg)/0.09)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="pointer-events-none absolute right-[-10%] top-10 h-[480px] w-[480px] rounded-full bg-accent/15 blur-[110px]" />

        <div className="container-page relative grid items-center gap-16 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
                <motion.a
                    {...fadeUp(0)}
                    href="#experience"
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1 pl-1 pr-3 text-[13px] font-medium text-muted shadow-card transition-colors hover:text-fg"
                >
                    <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent-ink">Now</span>
                    {profile.role} at {profile.currentCompany}
                    <ArrowRight size={13} />
                </motion.a>

                <motion.h1 {...fadeUp(0.08)} className="mt-7 text-[2.6rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-fg sm:text-6xl lg:text-[4.2rem]">
                    Hi, I&apos;m {profile.name}.
                </motion.h1>
                <motion.p {...fadeUp(0.16)} className="mt-4 text-2xl font-semibold tracking-[-0.01em] text-fg/80 sm:text-3xl">
                    I build <RotatingWord />
                </motion.p>

                <motion.p {...fadeUp(0.24)} className="mt-6 max-w-xl text-pretty text-[17px] leading-relaxed text-muted">
                    {profile.experienceYears} years turning complex product requirements into fast, maintainable web applications for international clients — now
                    studying data science to bring ML into the products I build.
                </motion.p>

                <motion.div {...fadeUp(0.32)} className="mt-9 flex flex-wrap items-center gap-3">
                    <a href="#projects" className="btn-primary !px-5 !py-3">
                        See my work <ArrowRight size={16} />
                    </a>
                    <a href="#contact" className="btn-secondary !px-5 !py-3">
                        Get in touch
                    </a>
                    <div className="ml-1 flex items-center gap-1.5">
                        {socials.map((s) => {
                            const Icon = socialIcons[s.name];
                            return (
                                <a
                                    key={s.name}
                                    href={s.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.name}
                                    title={s.name}
                                    className="grid h-11 w-11 place-items-center rounded-xl text-muted transition-colors hover:bg-fg/[0.05] hover:text-fg"
                                >
                                    <Icon size={19} />
                                </a>
                            );
                        })}
                    </div>
                </motion.div>

                <motion.p {...fadeUp(0.4)} className="mt-8 flex items-center gap-1.5 text-sm text-subtle">
                    <MapPin size={15} /> Based in {profile.location}
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.1, ease }}
                className="relative mx-auto w-full max-w-[360px] lg:max-w-none"
            >
                {/* Offset backing plate gives the photo depth without a glow effect */}
                <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] border border-accent/30 bg-accent/10" />
                <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface shadow-lift">
                    <Image src={portrait} alt={`Portrait of ${profile.fullName}`} priority sizes="(min-width: 1024px) 400px, 360px" className="aspect-[4/5] w-full object-cover object-top" />
                </div>

                <FloatingCard icon={Briefcase} title={`${profile.experienceYears} years`} text="Professional experience" className="-left-6 top-10 hidden sm:flex" delay={0.5} />
                <FloatingCard icon={Code2} title="800+ problems" text="Solved in contests" className="-right-4 top-1/2 hidden sm:flex" delay={0.62} />
                <FloatingCard icon={GraduationCap} title={education[0].degree} text={education[0].institution} className="-bottom-6 left-6" delay={0.74} />
            </motion.div>
        </div>
    </section>
);

export default Hero;
