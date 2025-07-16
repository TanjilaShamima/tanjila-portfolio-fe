'use client';

import profile from '@/@assets/images/profile.jpg'; // Adjust the path as necessary
import { motion } from 'framer-motion';
import Image from 'next/image';

const unplush_image = "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"

const AboutSection = () => {
    return (
        <section id="about" className="py-20 bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 relative overflow-hidden">
            {/* Floating Particles Background */}
            <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-purple-300/30 rounded-full"
                        animate={{
                            y: [0, -50, 0],
                            x: [0, Math.random() * 100 - 50, 0],
                            opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{
                            duration: Math.random() * 4 + 3,
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

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        About Me
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative flex justify-center mt-20"
                    >
                        <div className="relative w-80 h-80 mx-auto lg:mx-0">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
                            <div className="relative w-full h-full bg-white/20 backdrop-blur-lg rounded-full border border-white/30 shadow-xl overflow-hidden">
                                <Image
                                    src={profile.src}
                                    alt="Tanjila Akter - Profile Photo"
                                    fill
                                    className="object-cover rounded-full"
                                />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-6"
                    >
                        <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                Passionate Developer & Problem Solver
                            </h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                I'm Tanjila Akter, a passionate and results-driven Senior Software Engineer with over 4 years of experience in building scalable, modern web applications. I specialize in React.js, Next.js, Node.js, TypeScript, and have a strong command over full-stack development using the MERN stack.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                I've worked across diverse industries, delivering high-performance applications and collaborating closely with cross-functional teams. With a strong foundation in problem-solving (500+ problems solved), UI/UX design, and a keen eye for detail, I focus on building elegant, responsive, and efficient web solutions.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                I'm currently working at Cosmos Tech Labs where I focus on system design, real-time features, and advanced Next.js-based architectures. I'm also actively learning Python, Django, and AWS.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="bg-white/40 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-lg text-center"
                            >
                                <div className="text-3xl font-bold text-purple-600 mb-2">5</div>
                                <div className="text-gray-700">Years Experience</div>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="bg-white/40 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-lg text-center"
                            >
                                <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
                                <div className="text-gray-700">Problems Solved</div>
                            </motion.div>
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-6 shadow-xl"
                        >
                            <h4 className="text-lg font-semibold mb-2">Current Focus</h4>
                            <p className="text-purple-100">
                                System Design • Real-time Features • Microservice • Python & Django • AWS Cloud Services • Blockchain • Artifical Intelligence
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection; 