'use client';

import type { PostMeta } from '@/lib/blog';
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import PostCover from './PostCover';
import Section, { Reveal } from './SectionHeading';

export type PostWithDate = PostMeta & { dateLabel: string };

/** Cover-image card used by the home slider and the blog list page. External posts open LinkedIn / Medium in a new tab. */
export const PostCard = ({ post }: { post: PostWithDate }) => {
    const className =
        'group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift';
    const body = (
        <>
            <div className="relative aspect-[16/9] overflow-hidden border-b border-line">
                <PostCover post={post} />
                {post.platform && (
                    <span className="absolute right-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                        On {post.platform}
                    </span>
                )}
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="flex flex-wrap items-center gap-x-2 text-xs font-medium text-subtle">
                    <span>{post.dateLabel}</span>
                    {!post.external && (
                        <>
                            <span>·</span>
                            <span className="inline-flex items-center gap-1">
                                <Clock size={12} /> {post.readingMinutes} min read
                            </span>
                        </>
                    )}
                    {post.lang === 'bn' && (
                        <>
                            <span>·</span>
                            <span lang="bn">বাংলা</span>
                        </>
                    )}
                </p>
                <h3 lang={post.lang} className="mt-3 text-lg font-bold leading-snug tracking-[-0.01em] text-fg transition-colors group-hover:text-accent-ink">
                    {post.title}
                </h3>
                <p lang={post.lang} className="mt-2 line-clamp-3 flex-1 text-pretty text-sm leading-relaxed text-muted">
                    {post.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-fg">
                    {post.external ? `Read on ${post.platform ?? 'the web'}` : 'Read article'}
                    <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
            </div>
        </>
    );

    return post.external ? (
        <a href={post.external} target="_blank" rel="noopener noreferrer" className={className}>
            {body}
        </a>
    ) : (
        <Link href={`/blog/${post.slug}/`} className={className}>
            {body}
        </Link>
    );
};

const BlogSlider = ({ posts }: { posts: PostWithDate[] }) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(posts.length > 1);

    const update = useCallback(() => {
        const track = trackRef.current;
        if (!track) return;
        const slide = track.firstElementChild as HTMLElement | null;
        const step = slide ? slide.offsetWidth + 20 : track.clientWidth;
        setIndex(Math.round(track.scrollLeft / step));
        setCanPrev(track.scrollLeft > 4);
        setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
    }, []);

    useEffect(() => {
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, [update]);

    const go = (dir: 1 | -1) => {
        const track = trackRef.current;
        const slide = track?.firstElementChild as HTMLElement | null;
        if (track && slide) track.scrollBy({ left: dir * (slide.offsetWidth + 20), behavior: 'smooth' });
    };

    const arrow = 'grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-fg shadow-card transition-all hover:border-fg/25 disabled:cursor-not-allowed disabled:opacity-40';

    return (
        <div>
            <div
                ref={trackRef}
                onScroll={update}
                className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto scroll-smooth px-5 pb-4 sm:scroll-px-8 [scrollbar-width:none] sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
                aria-roledescription="carousel"
            >
                {posts.map((post) => (
                    <div key={post.slug} className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc(40%-12px)]">
                        <PostCard post={post} />
                    </div>
                ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
                <div className="flex gap-1.5" aria-hidden>
                    {posts.map((p, i) => (
                        <span key={p.slug} className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-7 bg-fg' : 'w-1.5 bg-fg/20'}`} />
                    ))}
                </div>
                <div className="flex gap-2">
                    <button onClick={() => go(-1)} disabled={!canPrev} className={arrow} aria-label="Previous posts">
                        <ArrowLeft size={18} />
                    </button>
                    <button onClick={() => go(1)} disabled={!canNext} className={arrow} aria-label="Next posts">
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

const WritingSection = ({ posts }: { posts: PostWithDate[] }) => (
    <Section
        id="blog"
        eyebrow="Blog"
        title="Notes from my learning desk."
        description="Study notes, plus articles I have published on LinkedIn and Medium — JavaScript, security, engineering practice and maths, in English and Bangla."
        action={
            <Link href="/blog/" className="btn-primary">
                See all posts <ArrowRight size={15} />
            </Link>
        }
    >
        <Reveal>
            <BlogSlider posts={posts} />
        </Reveal>
    </Section>
);

export default WritingSection;
