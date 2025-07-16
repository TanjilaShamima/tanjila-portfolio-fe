'use client';

import { CodeBracketIcon, LinkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const ProjectsSection = () => {
    const [selectedProject, setSelectedProject] = useState<number | null>(null);

    const projects = [
        {
            id: 1,
            title: 'E-Commerce Platform',
            description: 'Full-stack e-commerce platform built with Next.js, Node.js, and MongoDB featuring real-time inventory management, payment integration, and admin dashboard.',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'TypeScript'],
            liveUrl: '#',
            githubUrl: '#',
            category: 'Full Stack'
        },
        {
            id: 2,
            title: 'Real-time Chat Application',
            description: 'Modern chat application with Socket.io integration, message encryption, file sharing, and group chat functionality.',
            image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            technologies: ['React.js', 'Socket.io', 'Express.js', 'JWT', 'MongoDB'],
            liveUrl: '#',
            githubUrl: '#',
            category: 'Full Stack'
        },
        {
            id: 3,
            title: 'Project Management Dashboard',
            description: 'Comprehensive project management tool with task tracking, team collaboration, time logging, and detailed analytics.',
            image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            technologies: ['React.js', 'TypeScript', 'Material UI', 'GraphQL', 'PostgreSQL'],
            liveUrl: '#',
            githubUrl: '#',
            category: 'Frontend'
        },
        {
            id: 4,
            title: 'Weather Analytics App',
            description: 'Weather forecasting application with interactive maps, historical data analysis, and personalized weather alerts.',
            image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            technologies: ['Next.js', 'Tailwind CSS', 'Chart.js', 'Weather API'],
            liveUrl: '#',
            githubUrl: '#',
            category: 'Frontend'
        },
        {
            id: 5,
            title: 'Task Automation API',
            description: 'RESTful API for task automation with webhook integration, scheduled jobs, and comprehensive logging system.',
            image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            technologies: ['Node.js', 'Express.js', 'Redis', 'Bull Queue', 'Docker'],
            liveUrl: '#',
            githubUrl: '#',
            category: 'Backend'
        },
        {
            id: 6,
            title: 'Learning Management System',
            description: 'Educational platform with course management, progress tracking, interactive quizzes, and student-teacher communication.',
            image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            technologies: ['React.js', 'Node.js', 'MongoDB', 'Socket.io', 'AWS S3'],
            liveUrl: '#',
            githubUrl: '#',
            category: 'Full Stack'
        },
    ];

    return (
        <section id="projects" className="py-20 bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Featured Projects
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full"></div>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Showcase of my recent work including full-stack applications, APIs, and frontend projects
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white/60 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-300 hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="absolute top-4 right-4">
                                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        {project.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
                                <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.slice(0, 3).map((tech) => (
                                        <span
                                            key={tech}
                                            className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies.length > 3 && (
                                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                                            +{project.technologies.length - 3} more
                                        </span>
                                    )}
                                </div>

                                <div className="flex gap-3">
                                    <a
                                        href={project.liveUrl}
                                        className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex-1 justify-center"
                                    >
                                        <LinkIcon className="w-4 h-4" />
                                        Live Demo
                                    </a>
                                    <a
                                        href={project.githubUrl}
                                        className="flex items-center gap-2 border-2 border-purple-600 text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-600 hover:text-white transition-all duration-200"
                                    >
                                        <CodeBracketIcon className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-center mt-12"
                >
                    <a
                        href="https://github.com/tanjila-shamima"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                        <CodeBracketIcon className="w-5 h-5" />
                        View All Projects on GitHub
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectsSection; 