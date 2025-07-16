'use client';

import { AcademicCapIcon, StarIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const EducationSection = () => {
    const education = {
        degree: 'Bachelor of Science in Computer Science & Engineering',
        institution: 'Daffodil International University (DIU)',
        location: 'Dhaka, Bangladesh',
        period: '2017 - 2021',
        description: 'Focused on software engineering, algorithms, data structures, and web development. Gained comprehensive knowledge in computer science fundamentals and practical software development skills.',
        courses: [
            'Data Structures & Algorithms',
            'Software Engineering',
            'Database Management Systems',
            'Web Technologies',
            'Object-Oriented Programming',
            'Computer Networks'
        ]
    };

    const awards = [
        {
            id: 1,
            title: 'DIU Girls Programming Contest',
            position: '2nd Runner-Up',
            year: '2020',
            description: 'Achieved 3rd position in university-wide programming competition focusing on algorithmic problem solving.',
            icon: '🥉',
            category: 'Programming'
        },
        {
            id: 2,
            title: 'DIU Math Olympiad',
            position: 'Top 6 Finalist',
            year: '2019',
            description: 'Secured position among top 6 students in mathematics olympiad competition.',
            icon: '🏆',
            category: 'Mathematics'
        },
        {
            id: 3,
            title: 'Dean\'s List',
            position: 'Academic Excellence',
            year: '2020-2021',
            description: 'Recognized for outstanding academic performance and maintaining high GPA.',
            icon: '⭐',
            category: 'Academic'
        },
        {
            id: 4,
            title: 'Best Final Year Project',
            position: 'Project Excellence',
            year: '2021',
            description: 'Awarded for developing innovative web application as final year project.',
            icon: '💡',
            category: 'Project'
        }
    ];

    return (
        <section id="education" className="py-20 bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Education & Awards
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full"></div>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Academic background and achievements that shaped my journey in software engineering
                    </p>
                </motion.div>

                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
                    {/* Education */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full">
                                <AcademicCapIcon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-800">Education</h3>
                        </div>

                        <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="p-3 bg-purple-100 rounded-full">
                                    <AcademicCapIcon className="w-6 h-6 text-purple-600" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl font-bold text-gray-800 mb-2">{education.degree}</h4>
                                    <p className="text-purple-600 font-semibold text-lg">{education.institution}</p>
                                    <p className="text-gray-600">{education.location}</p>
                                    <span className="inline-block mt-2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm">
                                        {education.period}
                                    </span>
                                </div>
                            </div>

                            <p className="text-gray-700 mb-6 leading-relaxed">{education.description}</p>

                            <div>
                                <h5 className="font-semibold text-gray-800 mb-4">Key Courses:</h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {education.courses.map((course, index) => (
                                        <motion.div
                                            key={course}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="flex items-center gap-2 text-gray-700"
                                        >
                                            <span className="text-purple-500">▸</span>
                                            {course}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Awards */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
                                <TrophyIcon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-800">Awards & Achievements</h3>
                        </div>

                        <div className="space-y-6">
                            {awards.map((award, index) => (
                                <motion.div
                                    key={award.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    className="bg-white/60 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="text-4xl">{award.icon}</div>
                                        <div className="flex-1">
                                            <div className="flex flex-wrap justify-between items-start mb-2">
                                                <h4 className="text-lg font-bold text-gray-800">{award.title}</h4>
                                                <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm">
                                                    {award.year}
                                                </span>
                                            </div>
                                            <p className="text-purple-600 font-semibold mb-2">{award.position}</p>
                                            <p className="text-gray-600 text-sm mb-3">{award.description}</p>
                                            <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                                                {award.category}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Problem Solving Achievement */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-6 shadow-xl"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <StarIcon className="w-8 h-8" />
                                <h4 className="text-xl font-bold">Problem Solving Excellence</h4>
                            </div>
                            <p className="text-purple-100 mb-4">
                                Solved 500+ algorithmic problems across various online judges including HackerRank, LeetCode, and Codeforces.
                            </p>
                            <div className="flex gap-4">
                                <a
                                    href="https://www.beecrowd.com.br/judge/en/profile/your-profile"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                                >
                                    Beecrowd Profile
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default EducationSection; 