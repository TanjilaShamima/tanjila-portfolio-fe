// Single source of truth for all portfolio content.
// Update values here — every section reads from this file.

export const profile = {
    name: 'Tanjila Akter',
    fullName: 'Tanjila Akter Shamima',
    role: 'Senior Software Engineer',
    currentCompany: 'Technovative Solutions',
    experienceYears: '6+',
    location: 'Dhaka, Bangladesh',
    email: 'tanjila.diu.edu@gmail.com',
    phone: '+880 199 741 2643',
    resumeUrl: 'https://drive.google.com/file/d/1lcpmeM-1SFuh6TcAjA0u25gOF6VDDnrB/view?usp=sharing',
    tagline:
        'I design and build fast, scalable, and beautifully crafted web products with React, Next.js, Node.js and TypeScript.',
    bio: [
        'I’m a Senior Software Engineer with 6+ years of experience turning complex product requirements into elegant, high-performance web applications. My core stack is React.js, Next.js, Node.js and TypeScript, with strong full-stack depth across the MERN ecosystem.',
        'I’ve shipped products for international clients across diverse industries — owning everything from front-end architecture and system design to real-time features, SEO and deployment. A competitive-programming background (800+ problems solved) keeps my problem-solving sharp.',
        'I’m currently a Senior Software Engineer at Technovative Solutions, and pursuing an MSc in Data Science at BRAC University to bring data and AI thinking into the products I build.',
    ],
    focus: ['System Design', 'Real-time Systems', 'Microservices', 'Python & Django', 'AWS Cloud', 'Data Science & AI'],
};

export const socials = [
    { name: 'GitHub', url: 'https://github.com/TanjilaShamima/', handle: '@TanjilaShamima' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/tanjila-shamima/', handle: 'in/tanjila-shamima' },
    { name: 'Beecrowd', url: 'https://judge.beecrowd.com/en/profile/181949', handle: '500+ solved' },
] as const;

export const stats = [
    { value: '6+', label: 'Years of experience' },
    { value: '50+', label: 'Projects delivered' },
    { value: '4', label: 'Companies' },
    { value: '500+', label: 'Problems solved' },
];

export type Experience = {
    title: string;
    company: string;
    period: string;
    location: string;
    current?: boolean;
    description: string;
    achievements: string[];
    technologies: string[];
};

export const experiences: Experience[] = [
    {
        title: 'Senior Software Engineer',
        company: 'Technovative Solutions',
        period: 'Dec 2025 – Present',
        location: 'Remote',
        current: true,
        description:
            'Building and scaling modern web products end-to-end — owning front-end architecture, API integration and delivery quality across the team.',
        achievements: [
            'Driving architecture decisions for scalable, maintainable Next.js and React applications',
            'Delivering production features end-to-end, from technical planning to deployment',
            'Raising the engineering bar through code reviews, reusable patterns and mentoring',
        ],
        technologies: ['Next.js', 'React.js', 'TypeScript', 'Node.js', 'AWS'],
    },
    {
        title: 'Senior Software Engineer',
        company: 'Cosmos Tech Labs Ltd',
        period: 'May 2024 – Nov 2025',
        location: 'Dhaka, Bangladesh',
        description:
            'Led front-end development and system architecture for SEO-optimized, real-time web products.',
        achievements: [
            'Integrated real-time features including QR-code scanning, live chat and AWS Chime-based communication',
            'Designed a scalable front-end architecture using atomic design and BEM methodology',
            'Applied system-design principles to build maintainable, high-performance Next.js applications',
            'Improved planning accuracy through reliable project estimation across development cycles',
        ],
        technologies: ['Next.js', 'React.js', 'TypeScript', 'Node.js', 'AWS Chime', 'Socket.io'],
    },
    {
        title: 'Software Engineer',
        company: 'BJIT Group',
        period: 'Mar 2021 – May 2024',
        location: 'Dhaka, Bangladesh',
        description:
            'Built high-performance, SEO-optimized web applications for international clients in cross-functional teams.',
        achievements: [
            'Engineered reusable front-end and back-end components that accelerated delivery',
            'Transformed UI/UX designs and wireframes into efficient, scalable code',
            'Played a key role in launching several high-impact web products',
            'Participated in client requirement analysis, technical planning and full-stack implementation',
        ],
        technologies: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'MySQL'],
    },
    {
        title: 'Full Stack Web Engineer',
        company: 'Flyte Solution',
        period: 'Nov 2020 – Feb 2021',
        location: 'Dhaka, Bangladesh',
        description:
            'Started my professional journey building secure, scalable web applications and custom CMS solutions.',
        achievements: [
            'Built custom CMS solutions tailored to client-specific requirements',
            'Collaborated with design and back-end teams to deliver end-to-end solutions',
            'Contributed to system optimization and UI enhancements for better usability',
        ],
        technologies: ['JavaScript', 'React.js', 'Node.js', 'Bootstrap', 'Git'],
    },
];

export const skillGroups = [
    {
        title: 'Frontend',
        description: 'Pixel-perfect, accessible and fast interfaces',
        skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'Material UI', 'Ant Design', 'SCSS', 'Framer Motion'],
    },
    {
        title: 'Backend',
        description: 'Reliable APIs and data layers',
        skills: ['Node.js', 'Express.js', 'NestJS', 'REST APIs', 'GraphQL', 'MongoDB', 'MySQL', 'PostgreSQL'],
    },
    {
        title: 'Real-time & Security',
        description: 'Live, interactive and secure experiences',
        skills: ['Socket.io', 'AWS Chime', 'WebSockets', 'JWT', 'RBAC'],
    },
    {
        title: 'Cloud & Tooling',
        description: 'Shipping and operating in production',
        skills: ['AWS', 'Firebase', 'NGINX', 'Docker', 'Git', 'GitHub / GitLab', 'Figma'],
    },
];

export const learning = ['Python', 'Django', 'Data Science', 'Machine Learning', 'Kubernetes', 'Blockchain'];

export type Project = {
    title: string;
    kind: string;
    year: string;
    summary: string;
    highlight?: string;
    technologies: string[];
    links: { label: string; url: string }[];
};

// Public work only — client projects from employers are under NDA.
export const projects: Project[] = [
    {
        title: 'Crime Hotspot Detection',
        kind: 'MSc research',
        year: '2026',
        summary:
            'Spatio-temporal pattern recognition on historical crime data using symbolic sequences, grammar-based patterns and explainable risk indicators.',
        technologies: ['Next.js', 'TypeScript', 'FastAPI', 'Python'],
        links: [
            { label: 'Frontend', url: 'https://github.com/TanjilaShamima/crime-hotspot-detect-frontend' },
            { label: 'Backend & research', url: 'https://github.com/TanjilaShamima/crime-hotspot-detect-backend' },
        ],
    },
    {
        title: 'Parallel Server Log Analyzer',
        kind: 'Systems',
        year: '2026',
        summary:
            'Sequential vs parallel server-log processing with Node.js worker threads, newline-aligned partitioning, benchmarking and live SSE observability.',
        highlight: '3.55× faster on 1M records',
        technologies: ['Next.js', 'Node.js', 'Worker Threads', 'SSE'],
        links: [
            { label: 'Frontend', url: 'https://github.com/TanjilaShamima/parallel-server-log-analyzer-fe' },
            { label: 'Backend', url: 'https://github.com/TanjilaShamima/parallel-server-log-analyzer-be' },
        ],
    },
    {
        title: 'Backend Authentication Service',
        kind: 'Backend',
        year: '2025',
        summary: 'Authentication and user management service with Node.js, Express, PostgreSQL and AWS S3 for file storage.',
        technologies: ['Node.js', 'Express', 'PostgreSQL', 'AWS S3'],
        links: [{ label: 'Repository', url: 'https://github.com/TanjilaShamima/BE-Auth-Service-Express-Node-Js-postgres-S3' }],
    },
    {
        title: 'Machine Learning Journey',
        kind: 'Learning in public',
        year: '2026',
        summary: 'Structured notes and experiments covering EDA, preprocessing, regression, classification and model tuning alongside my MSc.',
        technologies: ['Python', 'scikit-learn', 'Data Analysis'],
        links: [{ label: 'Repository', url: 'https://github.com/TanjilaShamima/machine-learning-journey' }],
    },
];

// Saved single-sweep benchmark from the Parallel Server Log Analyzer report
// (1,000,000 synthetic records, 59.8 MB). Times in milliseconds.
export const benchmark = {
    records: 1_000_000,
    bytes: 59_794_677,
    runs: [
        { label: 'Sequential', workers: 0, ms: 660.269, speedup: 1, efficiency: null },
        { label: '1 worker', workers: 1, ms: 640.73, speedup: 1.03, efficiency: 103.05 },
        { label: '2 workers', workers: 2, ms: 318.799, speedup: 2.071, efficiency: 103.56 },
        { label: '4 workers', workers: 4, ms: 226.274, speedup: 2.918, efficiency: 72.95 },
        { label: '8 workers', workers: 8, ms: 185.885, speedup: 3.552, efficiency: 44.4 },
    ],
    mergeOverheadPct: 0.279,
};

// Technologies tracked in the stack-by-role matrix, in display order.
export const stackMatrixTech = ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'AWS', 'Socket.io'];

export type Education = {
    degree: string;
    institution: string;
    location: string;
    period?: string;
    status?: string;
    highlights: string[];
};

export const education: Education[] = [
    {
        degree: 'MSc in Data Science',
        institution: 'BRAC University',
        location: 'Dhaka, Bangladesh',
        status: 'Postgraduate',
        highlights: ['Bringing data-driven and AI thinking into product engineering'],
    },
    {
        degree: 'BSc in Computer Science & Engineering',
        institution: 'Daffodil International University',
        location: 'Dhaka, Bangladesh',
        period: '2017 – 2021',
        highlights: [
            'Assistant General Secretary, Girls Computer Programming Club',
            'Member, DIU Computer Programming Club',
            'Data Structures & Algorithms, Software Engineering, DBMS',
        ],
    },
];

export const awards = [
    { title: 'DIU Intra University Girls Programming Contest', result: '2nd Runner-Up', year: '2020' },
    { title: 'DIU Math Olympiad', result: 'Top 6 Finalist', year: '2019' },
    { title: 'National Girls Programming Contest', result: 'Participant', year: '' },
    { title: 'ICPC Mock & Takeoff Programming Contest, DIU', result: 'Participant', year: '' },
];
