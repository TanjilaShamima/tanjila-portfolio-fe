'use client';

import {
    EnvelopeIcon,
    MapPinIcon,
    PaperAirplaneIcon,
    PhoneIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useState } from 'react';
import resumePdf from '../@assets/pdf/resume.pdf';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Reset form
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitting(false);

        // You would typically send the form data to your backend here
        alert('Thank you for your message! I\'ll get back to you soon.');
    };

    const socialLinks = [
        {
            name: 'GitHub',
            url: 'https://github.com/TanjilaShamima/',
            icon: '🐱',
            color: 'from-gray-600 to-gray-800'
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/tanjila-shamima/',
            icon: '💼',
            color: 'from-blue-600 to-blue-800'
        },
        {
            name: 'Beecrowd',
            url: 'https://judge.beecrowd.com/en/profile/181949',
            icon: '🧮',
            color: 'from-green-600 to-green-800'
        },
        // {
        //     name: 'Skype',
        //     url: 'skype:your-skype-id?chat',
        //     icon: '💬',
        //     color: 'from-blue-500 to-blue-700'
        // },
        {
            name: 'Portfolio',
            url: 'https://tanjila-shamima.web.app',
            icon: '🌐',
            color: 'from-purple-600 to-purple-800'
        }
    ];

    const contactInfo = [
        {
            icon: <EnvelopeIcon className="w-6 h-6" />,
            label: 'Email',
            value: 'tanjila.diu.edu@gmail.com',
            href: 'mailto:tanjila.diu.edu@gmail.com'
        },
        {
            icon: <PhoneIcon className="w-6 h-6" />,
            label: 'Phone',
            value: '+880 199 741 2643',
            href: '+880 199 741 2643'
        },
        {
            icon: <MapPinIcon className="w-6 h-6" />,
            label: 'Location',
            value: 'Dhaka, Bangladesh',
            href: 'https://maps.google.com/?q=Dhaka,Bangladesh'
        }
    ];

    return (
        <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white/10 rounded-full"
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 1, 0],
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
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                        Get In Touch
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
                    <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                        Let's discuss your next project or collaboration opportunity. I'm always excited to work on innovative solutions.
                    </p>
                </motion.div>

                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
                    >
                        <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-gray-300 mb-2 font-medium">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Project Discussion"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-gray-300 mb-2 font-medium">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                    placeholder="Tell me about your project..."
                                ></textarea>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <PaperAirplaneIcon className="w-5 h-5" />
                                        Send Message
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Contact Info & Social Links */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        {/* Contact Info */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                            <div className="space-y-4">
                                {contactInfo.map((info, index) => (
                                    <motion.a
                                        key={info.label}
                                        href={info.href}
                                        target={info.href.startsWith('http') ? '_blank' : undefined}
                                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{ scale: 1.05 }}
                                        className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors duration-200 group"
                                    >
                                        <div className="p-3 bg-purple-600/20 rounded-lg group-hover:bg-purple-600/30 transition-colors duration-200">
                                            {info.icon}
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400">{info.label}</p>
                                            <p className="font-medium">{info.value}</p>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                            <h3 className="text-2xl font-bold text-white mb-6">Connect With Me</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        className={`bg-gradient-to-r ${social.color} text-white p-4 rounded-xl text-center font-medium hover:shadow-xl transition-all duration-300`}
                                    >
                                        <div className="text-2xl mb-2">{social.icon}</div>
                                        <div className="text-sm">{social.name}</div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                            <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <a
                                    href="../@assets/pdf/resume.pdf"
                                    download
                                    className="block w-full bg-white/20 hover:bg-white/30 text-white text-center py-3 rounded-lg font-medium transition-colors duration-200"
                                >
                                    📄 Download Resume
                                </a>
                                <a
                                    href="#projects"
                                    className="block w-full bg-white/20 hover:bg-white/30 text-white text-center py-3 rounded-lg font-medium transition-colors duration-200"
                                >
                                    🚀 View Projects
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-center mt-16 pt-8 border-t border-white/20"
                >
                    <p className="text-gray-400">
                        © {new Date().getFullYear()} This site is copyright of Tanjila Shamima. All rights reserved.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection; 