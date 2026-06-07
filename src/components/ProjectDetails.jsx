import { motion } from "motion/react";
const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
}) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full p-4 sm:p-6 backdrop-blur-md bg-black/60"
      onClick={closeModal}
    >
      <motion.div
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl rounded-2xl bg-[#0a0a0a] border border-white/10 overflow-hidden"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute z-10 flex items-center justify-center p-2 rounded-full top-4 right-4 bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 transition-colors"
        >
          <img src="assets/close.svg" className="w-5 h-5 invert" alt="Close" />
        </button>
        
        {/* Image Section - Fixed Height */}
        {image && (
          <div className="w-full h-48 sm:h-64 lg:h-80 shrink-0 bg-neutral-900">
            <img src={image} alt={title} className="w-full h-full object-cover object-top" />
          </div>
        )}

        {/* Content Section - Scrollable */}
        <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
          <h5 className="mb-3 text-3xl font-bold text-white">{title}</h5>
          
          <div className="h-[1px] w-full bg-white/10 mb-5" />

          <p className="mb-4 text-base leading-relaxed text-neutral-300">{description}</p>
          
          <div className="mb-8 space-y-3">
            {subDescription.map((subDesc, index) => (
              <p key={index} className="text-sm sm:text-base leading-relaxed text-neutral-400">
                • {subDesc}
              </p>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-auto pt-6 border-t border-white/10">
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <div key={tag.id} className="p-2.5 bg-white/5 rounded-full border border-white/10" title={tag.name}>
                  <img src={tag.path} alt={tag.name} className="w-5 h-5 object-contain" />
                </div>
              ))}
            </div>
            {href && (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-black bg-white rounded-full hover:bg-neutral-200 transition-colors shrink-0"
              >
                View Live Project
                <img src="assets/arrow-up.svg" className="w-4 h-4" alt="Arrow" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
