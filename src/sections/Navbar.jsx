import { useState } from "react";
import { motion } from "motion/react";
const resumeUrl =
  import.meta.env.VITE_RESUME_URL ||
  "https://drive.google.com/file/d/1c2GOj6viOxCV4Fe-UZCSs98UUfo9qmer/view?usp=sharing";

function Navigation() {
  return (
    <ul className="nav-ul">
      <li className="nav-li">
        <a className="nav-link" href="#home">
          Home
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#about">
          About
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#work">
          Work
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#contact">
          Contact
        </a>
      </li>
      <li className="nav-li sm:hidden">
        <a
          href={resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition-colors border rounded-full border-white/15 bg-white/10 hover:bg-white/15"
        >
          View Resume
        </a>
      </li>
    </ul>
  );
}
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40">
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-0">
          <a
            href="/"
            className="text-xl font-bold transition-colors text-neutral-400 hover:text-white"
          >
            Manish
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
          >
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              className="w-6 h-6"
              alt="toggle"
            />
          </button>
          <nav className="hidden sm:flex">
            <Navigation />
          </nav>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden px-4 py-2 ml-4 text-sm font-medium text-white transition-colors border rounded-full sm:inline-flex border-white/15 bg-white/10 hover:bg-white/15 hover-animation"
          >
            View Resume
          </a>
        </div>
      </div>
      {isOpen && (
        <motion.div
          className="block overflow-hidden text-center sm:hidden"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ maxHeight: "100vh" }}
          transition={{ duration: 1 }}
        >
          <nav className="pb-5">
            <Navigation />
          </nav>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-5 py-3 mb-5 text-sm font-medium text-white transition-colors border rounded-full border-white/15 bg-white/10 hover:bg-white/15"
          >
            View Resume
          </a>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
