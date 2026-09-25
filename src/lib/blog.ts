import fs from 'node:fs';
import path from 'node:path';
import { Marked, type Tokens } from 'marked';
import { createHighlighter, type Highlighter } from 'shiki';

// Build-time only: posts are markdown files in src/content/blog, rendered to static HTML during `next build`.

const POSTS_DIR = path.join(process.cwd(), 'src/content/blog');
const LANGS = ['javascript', 'typescript', 'python', 'bash', 'html', 'json'] as const;
const LANG_ALIASES: Record<string, string> = { js: 'javascript', ts: 'typescript', py: 'python', sh: 'bash', shell: 'bash' };

export type PostMeta = {
    slug: string;
    title: string;
    date: string;
    summary: string;
    tags: string[];
    lang: 'en' | 'bn';
    repo?: string;
    /** Optional image under /public (e.g. /blog/my-post.jpg). Without it a generated cover is drawn from `coverArt`. */
    cover?: string;
    coverArt?: string;
    /** Set for posts published elsewhere (LinkedIn, Medium): cards link out and no local page is generated. */
    external?: string;
    platform?: string;
    readingMinutes: number;
};

export type TocItem = { id: string; text: string };

const parseFrontmatter = (raw: string) => {
    const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
    if (!match) return { data: {} as Record<string, string>, body: raw };
    const data: Record<string, string> = {};
    for (const line of match[1].split('\n')) {
        const i = line.indexOf(':');
        if (i > 0) data[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
    return { data, body: raw.slice(match[0].length) };
};

const readPost = (slug: string) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), 'utf8').replace(/\r\n/g, '\n');
    const { data, body } = parseFrontmatter(raw);
    const words = body.replace(/```[\s\S]*?```/g, '').split(/\s+/).filter(Boolean).length;
    const meta: PostMeta = {
        slug,
        title: data.title ?? slug,
        date: data.date ?? '1970-01-01',
        summary: data.summary ?? '',
        tags: (data.tags ?? '').split(',').map((t) => t.trim()).filter(Boolean),
        lang: data.lang === 'bn' ? 'bn' : 'en',
        repo: data.repo,
        cover: data.cover || undefined,
        coverArt: data.coverArt || undefined,
        external: data.external || undefined,
        platform: data.platform || undefined,
        readingMinutes: Math.max(1, Math.round(words / 220)),
    };
    return { meta, body };
};

export const getAllPosts = (): PostMeta[] =>
    fs
        .readdirSync(POSTS_DIR)
        .filter((f) => f.endsWith('.md'))
        .map((f) => readPost(f.replace(/\.md$/, '')).meta)
        .sort((a, b) => b.date.localeCompare(a.date));

/** Posts that have their own page on this site (excludes LinkedIn / Medium links). */
export const getLocalPosts = () => getAllPosts().filter((p) => !p.external);

let highlighterPromise: Promise<Highlighter> | null = null;
const getHighlighter = () => {
    highlighterPromise ??= createHighlighter({ themes: ['github-light', 'github-dark'], langs: [...LANGS] });
    return highlighterPromise;
};

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const getPost = async (slug: string) => {
    const { meta, body } = readPost(slug);
    const highlighter = await getHighlighter();
    const toc: TocItem[] = [];
    const usedIds = new Set<string>();

    const marked = new Marked({
        gfm: true,
        renderer: {
            heading({ tokens, depth, text }) {
                const inner = this.parser.parseInline(tokens);
                if (depth !== 2 && depth !== 3) return `<h${depth}>${inner}</h${depth}>`;
                // ASCII slug when possible (English posts); fall back to a numbered id for Bangla headings.
                let id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `section-${usedIds.size + 1}`;
                while (usedIds.has(id)) id += '-2';
                usedIds.add(id);
                if (depth === 2) toc.push({ id, text: text.replace(/`/g, '') });
                return `<h${depth} id="${id}">${inner}</h${depth}>`;
            },
            code({ text, lang }: Tokens.Code) {
                const requested = (lang ?? '').trim().toLowerCase();
                const resolved = LANG_ALIASES[requested] ?? requested;
                if (!(LANGS as readonly string[]).includes(resolved)) {
                    return `<pre><code>${escapeHtml(text)}</code></pre>`;
                }
                return highlighter.codeToHtml(text, {
                    lang: resolved,
                    themes: { light: 'github-light', dark: 'github-dark' },
                    defaultColor: false,
                });
            },
        },
    });

    const html = await marked.parse(body);
    return { meta, html, toc };
};

export const formatPostDate = (date: string) =>
    new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
