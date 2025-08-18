"use client";
import { motion } from "framer-motion";
import Slider from "react-slick";

import { useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import BlogCard from "./BlogCard";

const blogs = [
  {
    title:
      "Understanding JSON Web Tokens (JWT) – What I Missed Before and What I Know Now!",
    image:
      "https://media.licdn.com/dms/image/v2/D5612AQFLCO4gK_odSw/article-cover_image-shrink_720_1280/B56ZecWLP2H8AI-/0/1750674756049?e=1761177600&v=beta&t=7zEnKcjKA28NmneTZiw0D69MHsNTWSFR7K9aVuyOf4c",
    description:
      "I have used JWT in many projects, but I finally understood how it really works: its structure, signing algorithms (HS256 vs RS256), and security best practices. If you are using JWT without knowing what is under the hood, this post is for you.",
    url: "https://www.linkedin.com/pulse/understanding-json-web-tokens-jwt-what-i-missed-before-shamima-hdwbc",
    author: "Tanjila Shamima",
  },
  {
    title:
      "Ever Wondered How JavaScript “Remembers” Variables? Let's Demystify Scope & Closure!",
    image:
      "https://media.licdn.com/dms/image/v2/D5612AQHwtTrX9Sbfpw/article-cover_image-shrink_720_1280/B56ZapNv.QGUAI-/0/1746595676945?e=1761177600&v=beta&t=VTCCrnjD0BQL2ASyO7NqZapjQPlupYxjMD2niofvrYQ",
    description:
      "Scope defines the part of your code where variables and functions can be accessed. In other words, it's the current execution context that determines which variables are visible and usable at any given point..",
    url: "https://www.linkedin.com/pulse/ever-wondered-how-javascript-remembers-lets-demystify-shamima-chmjc",
    author: "Tanjila Shamima",
  },
  {
    title: "Good and Bad side of Agile Methodology!",
    image:
      "https://media.licdn.com/dms/image/v2/D5612AQH5DItWbjYpHA/article-cover_image-shrink_720_1280/B56ZaLQSCvHAAI-/0/1746093031030?e=1761177600&v=beta&t=8I0pxLfqrygWJykExuHRlKhSWuGoC7DavujfxgVi2FE",
    description:
      "Agile is one of the most popular project management approaches in the tech world today. Many companies believe it brings speed, flexibility, and better communication. While Agile can offer some benefits, it also comes with serious risks — especially for developers and project success. In this post, I want to share both the good and bad sides of Agile, with a focus on how it impacts developers and increases project risk when not handled properly.",
    url: "https://www.linkedin.com/pulse/good-bad-side-agile-methodology-tanjila-akter-shamima-pn1ic",
    author: "Tanjila Shamima",
  },
  {
    title: "অপারেটর এন্ড অপারেন্ড(Operator and Operand)",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80", // Unsplash code image
    description:
      "প্রোগ্রামিং এ আমরা ছোটখাটো যোগ, বিয়োগ, ভাগ, গুন ইত্যাদি করে থাকি । এর জন্য আমরা প্রতিনিয়ত এই সিম্বল বা চিনহ গুলো ব্যাবহার করে থাকি । এছাড়াও অনেক সময় বিভিন্ন লজিক স্থাপন এর জন্যও আমাদের কিছু সিম্বল ব্যাবহার করতে হয়। আর আমাদের ব্যাবহ্রত এই সকল সিম্বল গূলোকে প্রোগ্রামিং এর ভাষায় অপারেটর বলা হয়।",
    url: "https://tanjila-cse-diu.medium.com/অপারেটর-এন্ড-অপারেন্ড-operator-and-operand-897394e0c748",
    author: "Tanjila Shamima",
  },
  {
    title: "Basic JavaScript(ব্যাসিক জাভাস্ক্রিপ্ট)",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80", // Unsplash code image
    description:
      "হাই লেভেল প্রোগ্রামিং ল্যাঙ্গুয়েজ মানে ইউজার ফ্রেন্ডলী ল্যাঙ্গুয়েজ যা যেকোন কম্পিউটারে খুব সহজে ব্যাবহার করা যায়। যা সহজে ইউজার বুঝতে পারে ।",
    url: "https://tanjila-cse-diu.medium.com/basic-javascript-ব্যাসিক-জাভাস্ক্রিপ্ট-6830d9fe90fb",
    author: "Tanjila Shamima",
  },
];

const BlogSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, setSliderRef] = useState<Slider | null>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    pauseOnHover: true,
    rows: 1,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          rows: 1,
        },
      },
      {
        breakpoint: 678,
        settings: {
          slidesToShow: 1,
          rows: 1,
        },
      },
    ],
  };

  const nextSlide = () => {
    sliderRef?.slickNext();
  };

  const prevSlide = () => {
    sliderRef?.slickPrev();
  };

  const goToSlide = (index: number) => {
    sliderRef?.slickGoTo(index);
  };

  return (
    <section className="relative py-16" aria-label="Blog Slider">
      <div className="max-w-[320px] md:max-w-[680px] xl:max-w-[1400px] 2xl:max-w-[1440px] mx-auto text-center lg:text-center m-auto">
        {/* Heading and Subheading */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Latest Blogs
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore my latest articles on web development, Javascript, React, Next.js, and
            more. Stay updated and inspired!
          </p>
        </motion.div>

        {/* Next/Prev Buttons inside section above slider */}
        <motion.div
          className="flex justify-end gap-3 mb-6"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="group relative flex justify-center items-center rounded-2xl w-12 h-12 outline-none overflow-hidden transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevSlide}
            aria-label="Previous blog"
          >
            <div className="absolute inset-0 bg-gray-800/80 backdrop-blur-xl border border-gray-900/30 rounded-2xl" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
            <div className="relative z-10 text-white flex items-center justify-center">
              {/* Left Arrow */}
              <svg
                className="w-6 h-6 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {/* <span className="hidden md:inline text-sm font-semibold">
                Prev
              </span> */}
            </div>
          </motion.button>
          <motion.button
            className="group relative flex justify-center items-center rounded-2xl w-12 h-12 outline-none overflow-hidden transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextSlide}
            aria-label="Next blog"
          >
            <div className="absolute inset-0 bg-gray-800/80 backdrop-blur-xl border border-gray-900/30 rounded-2xl" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
            <div className="relative z-10 text-white flex items-center justify-center">
              {/* <span className="hidden md:inline text-sm font-semibold">
                Next
              </span> */}
              {/* Right Arrow */}
              <svg
                className="w-6 h-6 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </motion.button>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          className="hidden lg:flex absolute -top-8 right-0 items-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {/* <span className="text-sm text-gray-400">
            {currentSlide + 1} of {OUR_MEMBERS.length}
          </span> */}
          <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentSlide + 1) / blogs.length) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Enhanced Slider Container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Slider {...settings} ref={setSliderRef}>
            {blogs.map((blog, index) => (
              <div key={index} className="px-2 sm:px-3 py-2">
                <BlogCard
                  member={blog}
                  index={index}
                  isActive={Math.abs(currentSlide - index) <= 1}
                />
              </div>
            ))}
          </Slider>
        </motion.div>

        {/* Mobile Navigation */}
        <motion.div
          className="gap-3 flex justify-center w-full lg:hidden mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="group relative flex justify-center items-center rounded-2xl w-12 h-12 outline-none overflow-hidden transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevSlide}
            aria-label="Previous team member"
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
            <div className="relative z-10 text-white">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
          </motion.button>

          {/* Mobile Progress Dots */}
          <div className="flex items-center gap-2 mx-4">
            {blogs.map((_, index) => (
              <motion.button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-purple-400 scale-125"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => goToSlide(index)}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>

          <motion.button
            className="group relative flex justify-center items-center rounded-2xl w-12 h-12 outline-none overflow-hidden transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextSlide}
            aria-label="Next team member"
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
            <div className="relative z-10 text-white">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSlider;
