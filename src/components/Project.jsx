import React, { useState } from "react";
import ProjectDetails from "./ProjectDetails";
import { motion } from "motion/react";

const Project = ({
  title,
  description,
  subDescription,
  href,
  image,
  tags,
}) => {
  const [isHidden, setIsHidden] = useState(false);
  return (
    <>
      <motion.div
        className="flex flex-col group cursor-pointer w-full"
        onClick={() => setIsHidden(true)}
      >
        {/* Image Container */}
        <div className="w-full overflow-hidden rounded-2xl mb-6 bg-neutral-900 border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full aspect-[16/10] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
            />
          ) : (
            <div className="w-full aspect-[16/10] bg-gradient-to-br from-storm to-indigo" />
          )}
        </div>
        
        {/* Title & Arrow */}
        <div className="flex items-center gap-3 mb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide transition-colors duration-300">
            {title}
          </h3>
          {href && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1 -ml-1 rounded-md transition-colors hover:bg-white/10 z-10"
              title="View Live Site"
            >
              <img 
                src="assets/arrow-up.svg" 
                className="w-4 h-4 sm:w-5 sm:h-5 opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1" 
                alt="arrow"
              />
            </a>
          )}
        </div>
        
        {/* Description */}
        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed line-clamp-2 pr-4">
          {description}
        </p>

        {/* Tags */}
        <div className="flex gap-3 mt-5">
          {tags.map((tag) => (
            <div key={tag.id} className="p-2 bg-white/5 rounded-full border border-white/10" title={tag.name}>
              <img src={tag.path} alt={tag.name} className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
            </div>
          ))}
        </div>
      </motion.div>

      {isHidden && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          tags={tags}
          href={href}
          closeModal={() => setIsHidden(false)}
        />
      )}
    </>
  );
};

export default Project;
