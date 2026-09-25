import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PostCover from '@/components/PostCover';
import { PostCard } from '@/components/WritingSection';
import { formatPostDate, getAllPosts, getLocalPosts, getPost } from '@/lib/blog';
import { ArrowLeft, Clock, Github } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export function generateStaticParams() {
    return getLocalPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = getAllPosts().find((p) => p.slug === params.slug);
    if (!post) return {};
    return {
        title: `${post.title} — Tanjila Akter`,
        description: post.summary,
        alternates: { canonical: `/blog/${post.slug}/` },
        openGraph: { type: 'article', title: post.title, description: post.summary, publishedTime: post.date, authors: ['Tanjila Akter'] },
    };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const { meta, html, toc } = await getPost(params.slug);
    const more = getAllPosts()
        .filter((p) => p.slug !== meta.slug)
        .slice(0, 3)
        .map((p) => ({ ...p, dateLabel: formatPostDate(p.date) }));

    return (
        <>
            <Navbar />
            <main>
                <header className="container-page pt-28 md:pt-32">
                    <Link href="/blog/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-fg">
                        <ArrowLeft size={15} /> All posts
                    </Link>
                    <div className="mx-auto mt-8 max-w-3xl text-center" lang={meta.lang}>
                        <div className="flex flex-wrap justify-center gap-1.5">
                            {meta.tags.map((t) => (
                                <span key={t} className="pill">
                                    {t}
                                </span>
                            ))}
                        </div>
                        <h1 className="mt-5 text-balance text-3xl font-extrabold leading-tight tracking-[-0.02em] text-fg sm:text-5xl">{meta.title}</h1>
                        <p className="mx-auto mt-5 max-w-2xl text-pretty text-[17px] leading-relaxed text-muted">{meta.summary}</p>
                        <p className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm font-medium text-subtle">
                            <span className="font-semibold text-fg">Tanjila Akter</span>
                            <span>·</span>
                            <span>{formatPostDate(meta.date)}</span>
                            <span>·</span>
                            <span className="inline-flex items-center gap-1">
                                <Clock size={14} /> {meta.readingMinutes} min read
                            </span>
                        </p>
                    </div>
                    <div className="mx-auto mt-10 aspect-[21/9] max-w-5xl overflow-hidden rounded-3xl border border-line shadow-lift">
                        <PostCover post={meta} />
                    </div>
                </header>

                <div className="container-page grid gap-10 py-14 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[240px_minmax(0,46rem)_1fr]">
                    <aside className="hidden lg:block">
                        {toc.length > 2 && (
                            <nav className="sticky top-24" aria-label="On this page">
                                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-subtle">On this page</p>
                                <ol className="space-y-2 border-l border-line text-[13px]" lang={meta.lang}>
                                    {toc.map((item) => (
                                        <li key={item.id}>
                                            <a href={`#${item.id}`} className="-ml-px block border-l-2 border-transparent pl-3 leading-snug text-muted transition-colors hover:border-accent hover:text-fg">
                                                {item.text}
                                            </a>
                                        </li>
                                    ))}
                                </ol>
                            </nav>
                        )}
                    </aside>

                    <article lang={meta.lang} className="min-w-0">
                        <div className="prose-post" dangerouslySetInnerHTML={{ __html: html }} />
                        {meta.repo && (
                            <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-sm text-muted">The runnable examples for this note are on GitHub.</p>
                                <a href={meta.repo} target="_blank" rel="noopener noreferrer" className="btn-primary shrink-0">
                                    <Github size={15} /> View source
                                </a>
                            </div>
                        )}
                    </article>
                </div>

                {more.length > 0 && (
                    <section className="border-t border-line bg-surface py-16">
                        <div className="container-page">
                            <div className="mb-8 flex items-end justify-between gap-4">
                                <h2 className="text-2xl font-bold tracking-[-0.02em] text-fg">Keep reading</h2>
                                <Link href="/blog/" className="text-sm font-semibold text-accent-ink hover:underline">
                                    See all posts
                                </Link>
                            </div>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {more.map((p) => (
                                    <PostCard key={p.slug} post={p} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </>
    );
}
