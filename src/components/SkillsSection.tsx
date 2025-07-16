'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const SkillsSection = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const skills = {
        Frontend: [
            { name: 'React.js', level: 95, icon: '⚛️' },
            { name: 'Next.js', level: 90, icon: '▲' },
            { name: 'TypeScript', level: 85, icon: '📘' },
            { name: 'Tailwind CSS', level: 90, icon: '💨' },
            { name: 'Material UI', level: 80, icon: '🎨' },
            { name: 'Ant Design', level: 85, icon: '🐜' },
        ],
        Backend: [
            { name: 'Node.js', level: 85, icon: '🟢' },
            { name: 'Express.js', level: 80, icon: '🚀' },
            { name: 'NestJS', level: 75, icon: '🐱' },
            { name: 'MongoDB', level: 80, icon: '🍃' },
            { name: 'MySQL', level: 75, icon: '🗄️' },
            { name: 'GraphQL', level: 70, icon: '📊' },
        ],
        Tools: [
            { name: 'Git', level: 90, icon: '📋' },
            { name: 'Firebase', level: 85, icon: '🔥' },
            { name: 'NGINX', level: 70, icon: '🌐' },
            { name: 'Socket.io', level: 80, icon: '🔌' },
            { name: 'JWT', level: 85, icon: '🔐' },
            { name: 'Figma', level: 75, icon: '🎨' },
        ],
        Animation: [
            { name: 'Framer Motion', level: 85, icon: '🎭' },
            { name: 'Lottie', level: 75, icon: '🎨' },
            { name: 'SCSS', level: 80, icon: '💎' },
            { name: 'Bootstrap', level: 85, icon: '🅱️' },
        ],
    };

    const categories = ['All', ...Object.keys(skills)];

    const getFilteredSkills = () => {
        if (activeFilter === 'All') {
            return Object.entries(skills).flatMap(([category, skillList]) =>
                skillList.map(skill => ({ ...skill, category }))
            );
        }
        return skills[activeFilter as keyof typeof skills]?.map(skill => ({
            ...skill,
            category: activeFilter,
        })) || [];
    };

    return (
        <section id="skills" className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                        Technical Skills
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
                    <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                        Proficient in modern web technologies with a focus on creating scalable and performant applications
                    </p>
                </motion.div>

                {/* Filter Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4 mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveFilter(category)}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeFilter === category
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                                    : 'bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Skills Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {getFilteredSkills().map((skill, index) => (
                        <motion.div
                            key={`${skill.category}-${skill.name}`}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                        >
                            <div className="flex items-center mb-4">
                                <span className="text-3xl mr-3">{skill.icon}</span>
                                <div>
                                    <h3 className="text-white font-semibold text-lg">{skill.name}</h3>
                                    <p className="text-purple-300 text-sm">{skill.category}</p>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="flex justify-between text-sm text-gray-300 mb-2">
                                    <span>Proficiency</span>
                                    <span>{skill.level}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, delay: 0.5 }}
                                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative"
                                    >
                                        <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Learning Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                        <h3 className="text-2xl font-bold text-white mb-4">Currently Learning</h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {['Python', 'Django', 'AWS', 'Docker', 'Kubernetes', 'Blockchain', 'Artificial Intelligence'].map((tech, index) => (
                                <motion.span
                                    key={tech}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                                    className="bg-white/20 text-white px-4 py-2 rounded-full font-medium"
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SkillsSection; 