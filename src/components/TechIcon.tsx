import { Code2, KeyRound, Network, Radio, type LucideIcon } from 'lucide-react';
import {
    siAmazonwebservices,
    siAntdesign,
    siBootstrap,
    siDjango,
    siDocker,
    siExpress,
    siFastapi,
    siFigma,
    siFirebase,
    siFramer,
    siGit,
    siGithub,
    siGraphql,
    siJavascript,
    siJsonwebtokens,
    siKubernetes,
    siMongodb,
    siMui,
    siMysql,
    siNestjs,
    siNextdotjs,
    siNginx,
    siNodedotjs,
    siPostgresql,
    siPython,
    siReact,
    siRedis,
    siSass,
    siScikitlearn,
    siSocketdotio,
    siTailwindcss,
    siTypescript,
    type SimpleIcon,
} from 'simple-icons';

// Skill names as written in src/data/profile.ts → brand logo. Anything unlisted falls back to a generic icon.
const brands: Record<string, SimpleIcon> = {
    'React.js': siReact,
    'Next.js': siNextdotjs,
    TypeScript: siTypescript,
    'JavaScript (ES6+)': siJavascript,
    JavaScript: siJavascript,
    'Tailwind CSS': siTailwindcss,
    'Material UI': siMui,
    'Ant Design': siAntdesign,
    SCSS: siSass,
    'Framer Motion': siFramer,
    'Node.js': siNodedotjs,
    'Express.js': siExpress,
    Express: siExpress,
    NestJS: siNestjs,
    GraphQL: siGraphql,
    MongoDB: siMongodb,
    MySQL: siMysql,
    PostgreSQL: siPostgresql,
    'Socket.io': siSocketdotio,
    'AWS Chime': siAmazonwebservices,
    AWS: siAmazonwebservices,
    'AWS S3': siAmazonwebservices,
    JWT: siJsonwebtokens,
    Firebase: siFirebase,
    NGINX: siNginx,
    Docker: siDocker,
    Git: siGit,
    'GitHub / GitLab': siGithub,
    Figma: siFigma,
    Python: siPython,
    Django: siDjango,
    Kubernetes: siKubernetes,
    FastAPI: siFastapi,
    'scikit-learn': siScikitlearn,
    Redis: siRedis,
    Bootstrap: siBootstrap,
};

const fallbacks: Record<string, LucideIcon> = {
    'REST APIs': Network,
    WebSockets: Radio,
    RBAC: KeyRound,
};

/** Brand colours that are near-black or near-white would vanish on one of the themes; those use the text colour. */
const usesInk = (hex: string) => {
    const n = Number.parseInt(hex, 16);
    const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return luminance < 0.22 || luminance > 0.92;
};

export const hasBrandIcon = (name: string) => name in brands;

const TechIcon = ({ name, size = 20, className = '' }: { name: string; size?: number; className?: string }) => {
    const icon = brands[name];
    if (!icon) {
        const Fallback = fallbacks[name] ?? Code2;
        return <Fallback size={size} className={`text-muted ${className}`} aria-hidden />;
    }
    return (
        <svg
            role="img"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            aria-label={icon.title}
            className={`${usesInk(icon.hex) ? 'fill-fg' : ''} ${className}`}
            style={usesInk(icon.hex) ? undefined : { fill: `#${icon.hex}` }}
        >
            <path d={icon.path} />
        </svg>
    );
};

export default TechIcon;
