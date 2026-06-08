import Project from "../components/Project";
import { myProjects } from "../constants";
import { motion } from "motion/react";

const Projects = () => {
  return (
    <section id="work" className="relative c-space section-spacing">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-16 flex flex-col items-center sm:items-start"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-300 to-neutral-500 drop-shadow-sm">
          Projects
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-aqua to-lavender mt-4 rounded-full" />
        <p className="text-neutral-400 mt-6 text-base md:text-lg text-center sm:text-left max-w-2xl leading-relaxed">
          A showcase of my recent projects, featuring scalable web applications, AI integrations, and innovative solutions.
          Hover over each project to explore the tech stack and details.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10 relative z-10">
        {myProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="h-full"
          >
            <Project {...project} />
          </motion.div>
        ))}
      </div>

      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-royal/10 blur-[120px] rounded-full pointer-events-none -z-10" />
    </section>
  );
};

export default Projects;
