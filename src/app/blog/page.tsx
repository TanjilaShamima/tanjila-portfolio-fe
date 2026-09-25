import BlogList from '@/components/BlogList';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { formatPostDate, getAllPosts } from '@/lib/blog';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog — Tanjila Akter',
    description: 'Study notes on JavaScript internals, Node.js and the mathematics behind machine learning, in English and Bangla.',
    alternates: { canonical: '/blog/' },
};

export default function BlogIndex() {
    const posts = getAllPosts().map((post) => ({ ...post, dateLabel: formatPostDate(post.date) }));
    return (
        <>
            <Navbar />
            <main>
                <section className="relative overflow-hidden border-b border-line pb-14 pt-32 md:pt-40">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(var(--fg)/0.09)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
                    <div className="container-page relative">
                        <p className="eyebrow">Blog</p>
                        <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.03em] text-fg md:text-6xl">Notes from my learning desk</h1>
                        <p className="mt-5 max-w-2xl text-pretty text-[17px] leading-relaxed text-muted">
                            Deep-dive study notes written here — how JavaScript actually runs, the maths behind ML — plus the articles I have published on LinkedIn and Medium since 2021.
                        </p>
                        <p className="mt-6 text-sm font-semibold text-subtle">{posts.length} articles</p>
                    </div>
                </section>
                <section className="container-page py-12 md:py-16">
                    <BlogList posts={posts} />
                </section>
            </main>
            <Footer />
        </>
    );
}
