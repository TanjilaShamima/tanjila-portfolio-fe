'use client';

import { motion } from 'framer-motion';

const ExperienceSection = () => {
    const experiences = [
        {
            id: 1,
            title: 'Senior Software Engineer',
            company: 'Cosmos Tech Labs',
            period: 'May 2024 – Present',
            location: 'Dhaka, Bangladesh',
            description: 'Leading frontend development initiatives and system architecture. Focusing on real-time features, advanced Next.js applications, and mentoring junior developers.',
            achievements: [
                'Architected and implemented real-time notification system serving 10,000+ users',
                'Led migration to Next.js 14 with App Router, improving page load times by 40%',
                'Designed responsive UI components used across multiple products',
                'Implemented advanced state management patterns with Zustand and React Query'
            ],
            technologies: ['Next.js', 'React.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
            current: true
        },
        {
            id: 2,
            title: 'Software Engineer',
            company: 'BJIT Group',
            period: 'Mar 2021 – May 2024',
            location: 'Dhaka, Bangladesh',
            description: 'Developed and maintained multiple web applications using modern JavaScript frameworks. Collaborated with international teams to deliver high-quality software solutions.',
            achievements: [
                'Built 15+ responsive web applications using React.js and Next.js',
                'Optimized application performance, reducing bundle size by 35%',
                'Implemented automated testing strategies, achieving 85% code coverage',
                'Collaborated with cross-functional teams across different time zones'
            ],
            technologies: ['React.js', 'Vue.js', 'Node.js', 'Express.js', 'MongoDB', 'MySQL'],
            current: false
        },
        {
            id: 3,
            title: 'Junior Frontend Developer',
            company: 'Flyte Solution',
            period: 'Nov 2020 – Feb 2021',
            location: 'Dhaka, Bangladesh',
            description: 'Started my professional journey focusing on frontend development. Gained hands-on experience with modern web technologies and best practices.',
            achievements: [
                'Developed responsive user interfaces for 5+ client projects',
                'Learned and implemented modern CSS frameworks like Tailwind CSS',
                'Participated in code reviews and agile development processes',
                'Contributed to improving overall code quality and documentation'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Bootstrap', 'Git'],
            current: false
        }
    ];

    return (
        <section id="experience" className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                        Professional Experience
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
                    <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                        5 years of professional experience building scalable web applications and leading development teams
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    {experiences.map((experience, index) => (
                        <motion.div
                            key={experience.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="relative mb-12 last:mb-0"
                        >
                            {/* Timeline Line */}
                            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 to-pink-400"></div>

                            {/* Timeline Dot */}
                            <div className={`absolute left-6 top-6 w-4 h-4 rounded-full border-4 ${experience.current
                                ? 'bg-gradient-to-r from-purple-400 to-pink-400 border-white animate-pulse'
                                : 'bg-white border-purple-400'
                                }`}></div>

                            {/* Content Card */}
                            <div className="ml-20 bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                                <div className="flex flex-wrap justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-1">{experience.title}</h3>
                                        <p className="text-purple-300 text-lg font-semibold">{experience.company}</p>
                                        <p className="text-gray-400">{experience.location}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${experience.current
                                            ? 'bg-gradient-to-r from-green-400 to-emerald-400 text-white'
                                            : 'bg-purple-600 text-white'
                                            }`}>
                                            {experience.period}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-gray-300 mb-6 leading-relaxed">{experience.description}</p>

                                <div className="mb-6">
                                    <h4 className="text-white font-semibold mb-3">Key Achievements:</h4>
                                    <ul className="space-y-2">
                                        {experience.achievements.map((achievement, idx) => (
                                            <motion.li
                                                key={idx}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: 0.1 * idx }}
                                                className="flex items-start gap-3 text-gray-300"
                                            >
                                                <span className="text-purple-400 mt-1">▸</span>
                                                {achievement}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-white font-semibold mb-3">Technologies:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {experience.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="bg-white/20 text-purple-200 px-3 py-1 rounded-full text-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Career Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
                >
                    {[
                        { label: 'Years Experience', value: '5' },
                        { label: 'Projects Completed', value: '50+' },
                        { label: 'Companies Worked', value: '3' },
                        { label: 'Problems Solved', value: '500+' }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center"
                        >
                            <div className="text-3xl font-bold text-purple-400 mb-2">{stat.value}</div>
                            <div className="text-gray-300 text-sm">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ExperienceSection; 