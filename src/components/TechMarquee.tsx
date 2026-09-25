import { skillGroups } from '@/data/profile';
import TechIcon, { hasBrandIcon } from './TechIcon';

// Every skill that has a real brand logo, de-duplicated (e.g. AWS / AWS Chime share one logo).
const items = Array.from(new Set(skillGroups.flatMap((g) => g.skills).filter(hasBrandIcon))).filter((name) => name !== 'AWS Chime');

const Row = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={ariaHidden}>
        {items.map((name) => (
            <li key={name} className="flex items-center gap-2.5 whitespace-nowrap text-sm font-semibold text-muted">
                <TechIcon name={name} size={22} />
                {name}
            </li>
        ))}
    </ul>
);

/** Continuous logo strip; the second copy makes the loop seamless. Pauses on hover. */
const TechMarquee = () => (
    <div className="group relative overflow-hidden border-y border-line bg-surface py-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
            <Row />
            <Row ariaHidden />
        </div>
    </div>
);

export default TechMarquee;
