import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type MemberCardProps = {
  member: {
    image: string;
    title: string;
    author: string;
    description: string;
    url: string;
  };
  index?: number;
  isActive?: boolean;
};

const BlogCard: React.FC<MemberCardProps> = ({
  member,
  index = 0,
  isActive = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDescription, setShowDescription] = useState(true);

  // Check if description is long enough to need expansion
  const needsExpansion = member.description.length > 80;

  return (
    <motion.article
      className="group relative w-[280px] lg:w-[320px] h-[400px] rounded-3xl overflow-hidden cursor-pointer mx-auto bg-white shadow-lg shadow-gray-700/30 hover:shadow-2xl transition-all duration-300 text-left"
      whileHover={{
        scale: 1.03,
        y: -10,
        boxShadow: "0 8px 32px rgba(55,65,81,0.25)",
        transition: { duration: 0.3, type: "spring", stiffness: 300 },
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onClick={() => window.open(member.url, "_blank")}
    >
      {/* Image Container */}
      <div className="relative h-[200px] overflow-hidden rounded-t-3xl">
        <motion.div
          className="h-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image
            src={member.image}
            alt={`Portrait of ${member.title}`}
            width={280}
            height={340}
            className=""
            loading="lazy"
          />
        </motion.div>

        {/* Image Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Description Toggle Button */}
        <motion.button
          className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/30"
          onClick={(e) => {
            e.stopPropagation();
            setShowDescription(!showDescription);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={showDescription ? "Hide Description" : "Show Description"}
        >
          <svg
            className="w-4 h-4 text-white transition-transform duration-200"
            style={{
              transform: showDescription ? "rotate(180deg)" : "rotate(0deg)",
            }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.button>
      </div>

      {/* Content Area - Dynamic Height */}
      <motion.div
        className="relative p-4 flex flex-col"
        initial={{ height: 120 }}
        animate={{
          height: showDescription && isExpanded ? "auto" : 120,
          minHeight: 120,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Name, Title, Author */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="font-bold text-lg text-gray-900 mb-1">
            {member.title.length > 30 ? `${member.title.slice(0, 50)}...` : member.title}
          </h3>
          {/* <div className="flex items-center gap-3 mb-2">
            <Image src={member.author.image} alt={member.author.name} width={32} height={32} className="rounded-full" />
            <div>
              <span className="font-semibold text-purple-700 text-base block">{member.author.name}</span>
              <span className="text-xs text-gray-500 block">{member.description}</span>
            </div>
          </div> */}
        </motion.div>

        {/* Description with Expandable Functionality */}
        {showDescription && (
          <motion.div
            className="flex-1 mt-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.p
              className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-900 transition-colors duration-300"
              style={{
                overflow: isExpanded ? "visible" : "hidden",
                display: isExpanded ? "block" : "-webkit-box",
                WebkitLineClamp: isExpanded ? "none" : 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {member.description}
            </motion.p>

            {/* Read More/Less Button */}
            {needsExpansion && (
              <motion.button
                className="text-purple-400 hover:text-purple-300 text-xs font-medium transition-colors duration-200 flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isExpanded ? "Read Less" : "Read More"}
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Social Links - Only show when not expanded or description hidden */}
      </motion.div>

      {/* Interactive Particles on Hover */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-60"
            style={{
              left: `${20 + i * 25}%`,
              top: `${30 + i * 15}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1.2, 0],
            }}
            transition={{
              duration: 2.5,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Achievement Badge */}
      <motion.div
        className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        whileHover={{ scale: 1.2, rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-xs">⭐</span>
      </motion.div>

      {/* Border Glow on Hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl border-2 border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.3))",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "xor",
        }}
      />

      {/* Active State Indicator */}
      {isActive && (
        <motion.div
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 48, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      )}
    </motion.article>
  );
};

export default BlogCard;
