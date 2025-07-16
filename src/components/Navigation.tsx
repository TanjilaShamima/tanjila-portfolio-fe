'use client';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const { scrollY } = useScroll();

    // Transform scroll position to background opacity
    const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 0.9]);
    const blur = useTransform(scrollY, [0, 100], [0, 10]);

    const navigationItems = [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Experience', href: '#experience' },
        { name: 'Education', href: '#education' },
        { name: 'Contact', href: '#contact' },
    ];

    // Smooth scroll function
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId.replace('#', ''));
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    // Detect active section on scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <motion.div
                className="max-w-7xl mx-auto backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl"
                style={{
                    backgroundColor: `rgba(30, 27, 75, ${backgroundOpacity.get()})`,
                    backdropFilter: `blur(${blur.get()}px)`,
                }}
            >
                <div className="flex items-center justify-between px-6 py-4">
                    {/* Logo */}
                    <motion.div
                        className="flex items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <button
                            onClick={() => scrollToSection('#hero')}
                            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-300 transition-all duration-300"
                        >
                            Tanjila Akter
                        </button>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navigationItems.map((item, index) => (
                            <motion.button
                                key={item.name}
                                onClick={() => scrollToSection(item.href)}
                                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${activeSection === item.href.replace('#', '')
                                        ? 'text-white bg-white/20'
                                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                {item.name}
                                {activeSection === item.href.replace('#', '') && (
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-lg"
                                        layoutId="activeTab"
                                        initial={false}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </motion.button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden text-white hover:text-purple-300 transition-colors duration-200"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isMenuOpen ? (
                            <XMarkIcon className="w-6 h-6" />
                        ) : (
                            <Bars3Icon className="w-6 h-6" />
                        )}
                    </motion.button>
                </div>

                {/* Mobile Navigation Menu */}
                <motion.div
                    className="md:hidden overflow-hidden"
                    initial={false}
                    animate={{
                        height: isMenuOpen ? 'auto' : 0,
                        opacity: isMenuOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="px-6 pb-4 space-y-2 border-t border-white/10 pt-4">
                        {navigationItems.map((item, index) => (
                            <motion.button
                                key={item.name}
                                onClick={() => scrollToSection(item.href)}
                                className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${activeSection === item.href.replace('#', '')
                                        ? 'text-white bg-gradient-to-r from-purple-600/30 to-pink-600/30'
                                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                                    }`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{
                                    opacity: isMenuOpen ? 1 : 0,
                                    x: isMenuOpen ? 0 : -20
                                }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {item.name}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </motion.nav>
    );
};

export default Navigation; 