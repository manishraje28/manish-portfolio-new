import { useState } from "react";
import { motion } from "motion/react";
import Button from "../components/Button";

const resumeUrl =
  import.meta.env.VITE_RESUME_URL || "/assets/resume.pdf";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

function Navigation() {
  return (
    <ul className="nav-ul">
      {navLinks.map((link) => (
        <li className="nav-li" key={link.href}>
          <a className="nav-link" href={link.href}>
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

const ResumeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

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
          <Button
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex"
            icon={<ResumeIcon />}
          >
            View Resume
          </Button>
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
          <Button
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="mb-5"
            icon={<ResumeIcon />}
          >
            View Resume
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
