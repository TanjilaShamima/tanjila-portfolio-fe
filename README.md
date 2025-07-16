# Tanjila Akter - Portfolio Website

A modern, responsive portfolio website showcasing my journey as a Senior Software Engineer. Built with cutting-edge technologies and featuring smooth animations, glass morphism design, and an intuitive user experience.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14.2.30-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🌟 Live Demo

Visit the live portfolio: [https://tanjila-shamima.web.app](https://tanjila-shamima.web.app)

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Contact](#contact)

## 🎯 About

This portfolio website represents my professional journey as a Senior Software Engineer with 4+ years of experience in modern web development. It showcases my skills, projects, experience, and educational background through an interactive and visually appealing interface.

### Key Highlights:
- **Professional Experience**: 4+ years in React.js, Next.js, Node.js, and TypeScript
- **Problem Solving**: 500+ problems solved across various platforms
- **Current Role**: Senior Software Engineer at Cosmos Tech Labs
- **Specialization**: Full-stack development with MERN stack

## ✨ Features

### 🎨 Design & User Experience
- **Modern Glass Morphism Design** with purple/pink gradient themes
- **Responsive Layout** that works seamlessly across all devices
- **Smooth Scrolling Navigation** with active section detection
- **Dynamic Animations** powered by Framer Motion
- **Interactive Components** with hover and tap effects

### 🧭 Navigation
- **Fixed Navigation Bar** with dynamic background opacity
- **Mobile-Friendly Menu** with hamburger toggle
- **Active Section Highlighting** with smooth transitions
- **One-Click Section Jumping** for easy navigation

### 📱 Responsive Sections
- **Hero Section**: Animated introduction with floating particles
- **About Section**: Professional summary and achievements
- **Skills Section**: Interactive skill showcase with filtering
- **Projects Section**: Featured projects with live demos
- **Experience Section**: Professional timeline with detailed descriptions
- **Education Section**: Academic background and awards
- **Contact Section**: Multiple ways to get in touch

### 🎭 Animations & Interactions
- **Entrance Animations**: Staggered reveals for each section
- **Scroll-Triggered Animations**: Elements animate as they come into view
- **Hover Effects**: Interactive feedback on all clickable elements
- **Loading States**: Smooth transitions between different states

## 🛠 Technologies Used

### Frontend Framework
- **Next.js 14.2.30** - React framework with App Router
- **React 18** - UI library
- **TypeScript 5** - Type-safe JavaScript

### Styling & Design
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Framer Motion 11.18.2** - Animation library
- **Heroicons** - Beautiful SVG icons

### UI Components
- **Radix UI** - Accessible component primitives
  - Dialog, Dropdown Menu, Select, Slider, Tabs, Toast
- **Class Variance Authority** - Component variant management
- **Clsx** - Conditional className utility

### Additional Libraries
- **Lucide React** - Additional icon set
- **React Slick** - Carousel components
- **Axios** - HTTP client
- **Zustand** - State management
- **React Toastify** - Toast notifications

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **SVGR** - SVG to React component conversion

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tanjila-shamima/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the portfolio.

### Environment Setup

Create a `.env.local` file in the root directory for any environment variables:

```env
# Add any required environment variables here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── fonts/             # Custom fonts (Geist Sans & Mono)
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── AboutSection.tsx   # About me section
│   ├── ContactSection.tsx # Contact information and form
│   ├── EducationSection.tsx # Educational background
│   ├── ExperienceSection.tsx # Professional experience
│   ├── HeroSection.tsx    # Landing section with animation
│   ├── Navigation.tsx     # Main navigation component
│   ├── ProjectsSection.tsx # Portfolio projects showcase
│   └── SkillsSection.tsx  # Technical skills display
├── @components/           # Global reusable components
│   └── ui/               # UI component library
└── @types/               # TypeScript type definitions
```

## 📜 Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint for code quality
```

## 🚀 Deployment

This portfolio is optimized for deployment on various platforms:

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Firebase Hosting
```bash
# Build the project
npm run build

# Deploy to Firebase
firebase deploy
```

### Other Platforms
The project can be deployed on any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## 🎨 Customization

### Colors & Theme
The design system uses CSS custom properties and Tailwind configuration:

```css
/* globals.css */
:root {
  --background: #ffffff;
  --foreground: #171717;
}
```

### Content Updates
- **Personal Information**: Update `src/components/HeroSection.tsx` and `src/components/AboutSection.tsx`
- **Skills**: Modify the skills array in `src/components/SkillsSection.tsx`
- **Projects**: Update project data in `src/components/ProjectsSection.tsx`
- **Experience**: Edit experience timeline in `src/components/ExperienceSection.tsx`

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add some improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Tanjila Akter**
- 🌐 Portfolio: [https://tanjila-shamima.web.app](https://tanjila-shamima.web.app)
- 💼 LinkedIn: [linkedin.com/in/tanjila-akter](https://linkedin.com/in/tanjila-akter)
- 🐱 GitHub: [github.com/tanjila-shamima](https://github.com/tanjila-shamima)
- 📧 Email: tanjila.cse.diu@gmail.com

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

*Last updated: July 2025*
