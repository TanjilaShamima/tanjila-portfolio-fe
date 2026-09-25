'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { PostCard, type PostWithDate } from './WritingSection';

/** Blog index grid with topic filter chips. */
const BlogList = ({ posts }: { posts: PostWithDate[] }) => {
    const topics = ['All', ...Array.from(new Set(posts.flatMap((p) => p.tags)))];
    const [topic, setTopic] = useState('All');
    const visible = topic === 'All' ? posts : posts.filter((p) => p.tags.includes(topic));

    return (
        <>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by topic">
                {topics.map((t) => (
                    <button
                        key={t}
                        role="tab"
                        aria-selected={topic === t}
                        onClick={() => setTopic(t)}
                        lang={/[ঀ-৿]/.test(t) ? 'bn' : undefined}
                        className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                            topic === t ? 'border-fg bg-fg text-bg' : 'border-line bg-surface text-muted hover:text-fg'
                        }`}
                    >
                        {t}
                    </button>
                ))}
            </div>
            <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                    {visible.map((post) => (
                        <motion.div
                            key={post.slug}
                            layout
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.35 }}
                        >
                            <PostCard post={post} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </>
    );
};

export default BlogList;
