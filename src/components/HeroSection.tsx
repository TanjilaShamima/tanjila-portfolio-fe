'use client';

import { ArrowDownIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const HeroSection = () => {
    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
            {/* Animated Background Particles */}
            <div className="absolute inset-0">
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/20 rounded-full"
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 container mx-auto px-4 flex items-center justify-center min-h-screen py-32">
                <div className="text-center text-white max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        {/* Animated SVG Illustration */}
                        <motion.svg
                            width="200"
                            height="200"
                            viewBox="0 0 200 200"
                            className="mx-auto mb-8"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            <motion.circle
                                cx="100"
                                cy="100"
                                r="80"
                                fill="none"
                                stroke="url(#gradient)"
                                strokeWidth="2"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, delay: 1 }}
                            />
                            <motion.circle
                                cx="100"
                                cy="100"
                                r="60"
                                fill="rgba(147, 51, 234, 0.3)"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1, delay: 1.5 }}
                            />
                            <motion.path
                                d="M70 90 L85 105 L130 60"
                                fill="none"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1, delay: 2 }}
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#8B5CF6" />
                                    <stop offset="100%" stopColor="#3B82F6" />
                                </linearGradient>
                            </defs>
                        </motion.svg>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                    >
                        Tanjila Akter Shamima
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-xl md:text-2xl mb-4 text-purple-200"
                    >
                        Senior Software Engineer
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="text-lg md:text-xl mb-12 text-gray-300 max-w-2xl mx-auto"
                    >
                        Passionate full-stack developer with 5 years of experience building scalable web applications using React.js, Next.js, and Node.js
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <a
                            href="https://www.linkedin.com/in/tanjila-shamima/"
                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                            Get In Touch
                        </a>
                        <a
                            href="https://drive.google.com/file/d/1lcpmeM-1SFuh6TcAjA0u25gOF6VDDnrB/view?usp=sharing"
                            className="border-2 border-purple-400 text-purple-400 px-8 py-4 rounded-full font-semibold hover:bg-purple-400 hover:text-white transition-all duration-300"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            My Resume
                        </a>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.5 }}
                        onClick={scrollToAbout}
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-purple-300 transition-colors duration-200"
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <ArrowDownIcon className="w-8 h-8" />
                        </motion.div>
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection; 