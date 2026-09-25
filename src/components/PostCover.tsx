import type { PostMeta } from '@/lib/blog';

/* Generated cover art for posts without an image. Each motif illustrates the post's topic; the palette is fixed
   (not themed) so covers read as artwork in both light and dark mode. */

const palettes: Record<string, string> = {
    runtime: 'from-[#0f766e] to-[#0b3b37]',
    context: 'from-[#1e3a5f] to-[#0b1628]',
    vector: 'from-[#9a3412] to-[#3b1206]',
    jwt: 'from-[#4c1d95] to-[#1a0b3d]',
    closure: 'from-[#155e75] to-[#082f3a]',
    agile: 'from-[#166534] to-[#07260f]',
    operators: 'from-[#a16207] to-[#3a2303]',
    basics: 'from-[#374151] to-[#111827]',
};

const mono = { fontFamily: 'var(--font-mono), monospace' };

const RuntimeArt = () => (
    <g fill="none" stroke="white" strokeWidth="1.5">
        {['log()', 'fetch()', 'main()'].map((label, i) => (
            <g key={label} opacity={0.55 + i * 0.15}>
                <rect x="44" y={46 + i * 30} width="104" height="24" rx="5" />
                <text x="56" y={62 + i * 30} fill="white" stroke="none" fontSize="11" style={mono}>
                    {label}
                </text>
            </g>
        ))}
        <text x="44" y="36" fill="white" stroke="none" fontSize="9" opacity="0.6" style={mono}>
            CALL STACK
        </text>
        <circle cx="236" cy="90" r="40" opacity="0.8" strokeDasharray="5 6" />
        <path d="M268 66 l8 -2 l-2 8" opacity="0.9" />
        <text x="208" y="94" fill="white" stroke="none" fontSize="10" style={mono}>
            event loop
        </text>
    </g>
);

const ContextArt = () => (
    <g fill="none" stroke="white" strokeWidth="1.5">
        <rect x="40" y="30" width="240" height="122" rx="10" opacity="0.5" />
        <rect x="70" y="56" width="180" height="82" rx="8" opacity="0.7" />
        <rect x="100" y="82" width="120" height="42" rx="6" opacity="0.95" />
        {[
            ['global', 52, 47, 0.6],
            ['function()', 82, 73, 0.75],
            ['{ block }', 128, 107, 1],
        ].map(([label, x, y, o]) => (
            <text key={label as string} x={x as number} y={y as number} fill="white" stroke="none" fontSize="10" opacity={o as number} style={mono}>
                {label}
            </text>
        ))}
    </g>
);

const VectorArt = () => (
    <g fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
        <path d="M60 150 H270 M60 150 V24" opacity="0.5" />
        <path d="M60 150 L230 60" />
        <path d="M222 58 l9 1 l-4 8" />
        <path d="M60 150 L250 128" opacity="0.8" />
        <path d="M242 124 l9 4 l-8 5" opacity="0.8" />
        <path d="M112 150 A52 52 0 0 0 106 126" opacity="0.8" />
        <text x="118" y="140" fill="white" stroke="none" fontSize="12" style={mono}>
            θ
        </text>
        <text x="236" y="52" fill="white" stroke="none" fontSize="12" style={mono}>
            a
        </text>
        <text x="258" y="126" fill="white" stroke="none" fontSize="12" style={mono}>
            b
        </text>
        <text x="296" y="30" textAnchor="end" fill="white" stroke="none" fontSize="10" opacity="0.8" style={mono}>
            a · b = |a||b| cos θ
        </text>
    </g>
);

const JwtArt = () => (
    <g fill="none" stroke="white" strokeWidth="1.5">
        {[
            ['header', 34, 0.6],
            ['payload', 124, 0.8],
            ['signature', 214, 1],
        ].map(([label, x, o]) => (
            <g key={label as string} opacity={o as number}>
                <rect x={x as number} y="66" width="76" height="40" rx="7" />
                <text x={(x as number) + 38} y="90" textAnchor="middle" fill="white" stroke="none" fontSize="10" style={mono}>
                    {label}
                </text>
            </g>
        ))}
        <text x="115" y="91" fill="white" stroke="none" fontSize="16" style={mono}>.</text>
        <text x="205" y="91" fill="white" stroke="none" fontSize="16" style={mono}>.</text>
        <text x="160" y="138" textAnchor="middle" fill="white" stroke="none" fontSize="10" opacity="0.7" style={mono}>
            HS256 · RS256
        </text>
    </g>
);

const ClosureArt = () => (
    <g fill="none" stroke="white" strokeWidth="1.5">
        <rect x="40" y="36" width="150" height="110" rx="10" opacity="0.6" />
        <text x="54" y="56" fill="white" stroke="none" fontSize="10" opacity="0.7" style={mono}>
            outer()
        </text>
        <text x="54" y="80" fill="white" stroke="none" fontSize="11" style={mono}>
            let count = 0
        </text>
        <rect x="150" y="96" width="130" height="40" rx="8" />
        <text x="164" y="120" fill="white" stroke="none" fontSize="10" style={mono}>
            inner() → count++
        </text>
        <path d="M200 96 C 200 70, 160 70, 150 78" strokeDasharray="4 4" opacity="0.85" />
        <path d="M156 72 l-7 6 l9 2" opacity="0.85" />
    </g>
);

const AgileArt = () => (
    <g fill="none" stroke="white" strokeWidth="1.5">
        <circle cx="170" cy="80" r="42" strokeDasharray="6 6" opacity="0.85" />
        <path d="M206 56 l6 -8 l2 10" opacity="0.9" />
        {[
            ['plan', 170, 28],
            ['build', 236, 84],
            ['review', 170, 138],
            ['ship', 104, 84],
        ].map(([label, x, y]) => (
            <text key={label as string} x={x as number} y={y as number} textAnchor="middle" fill="white" stroke="none" fontSize="10" style={mono}>
                {label}
            </text>
        ))}
        <text x="170" y="84" textAnchor="middle" fill="white" stroke="none" fontSize="11" opacity="0.8" style={mono}>
            sprint
        </text>
    </g>
);

const OperatorsArt = () => (
    <g fill="white">
        {['+', '−', '×', '÷', '%', '==', '&&', '||'].map((op, i) => (
            <text key={op} x={60 + (i % 4) * 66} y={i < 4 ? 82 : 132} textAnchor="middle" fontSize={op.length > 1 ? 22 : 30} opacity={0.55 + (i % 3) * 0.2} style={mono}>
                {op}
            </text>
        ))}
    </g>
);

const BasicsArt = () => (
    <g fill="none" stroke="white" strokeWidth="1.5">
        <rect x="112" y="46" width="96" height="88" rx="12" opacity="0.9" />
        <text x="160" y="106" textAnchor="middle" fill="white" stroke="none" fontSize="34" fontWeight="700" style={mono}>
            JS
        </text>
        <text x="60" y="100" fill="white" stroke="none" fontSize="30" opacity="0.5" style={mono}>
            {'{'}
        </text>
        <text x="244" y="100" fill="white" stroke="none" fontSize="30" opacity="0.5" style={mono}>
            {'}'}
        </text>
    </g>
);

const arts: Record<string, () => JSX.Element> = {
    runtime: RuntimeArt,
    context: ContextArt,
    vector: VectorArt,
    jwt: JwtArt,
    closure: ClosureArt,
    agile: AgileArt,
    operators: OperatorsArt,
    basics: BasicsArt,
};

const PostCover = ({ post, className = '' }: { post: PostMeta; className?: string }) => {
    if (post.cover) {
        // eslint-disable-next-line @next/next/no-img-element -- static export serves /public files as-is
        return <img src={post.cover} alt="" className={`h-full w-full object-cover ${className}`} />;
    }
    const art = post.coverArt ?? 'runtime';
    const Art = arts[art] ?? RuntimeArt;
    return (
        <div className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${palettes[art] ?? palettes.runtime} ${className}`} aria-hidden>
            <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.12)_1px,transparent_1px)] [background-size:14px_14px]" />
            <svg viewBox="0 0 320 180" className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.04]" preserveAspectRatio="xMidYMid meet">
                <Art />
            </svg>
            <span className="absolute bottom-3 left-3 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">{post.tags[0]}</span>
        </div>
    );
};

export default PostCover;
