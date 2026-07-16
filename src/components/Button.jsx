import { motion } from "motion/react";

const Button = ({
  children,
  href,
  onClick,
  className = "",
  icon,
  target,
  rel,
  ...props
}) => {
  const baseStyles =
    "group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold tracking-wide text-white rounded-full cursor-pointer overflow-hidden transition-transform duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0";

  const content = (
    <>
      {/* Static ambient glow */}
      <span className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-aqua via-lavender to-fuchsia opacity-60 blur-[1px] group-hover:opacity-90 transition-opacity duration-300" />

      {/* Animated rotating gradient border on hover */}
      <span className="absolute -inset-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
        <span className="absolute inset-[-50%] w-[200%] h-[200%] animate-spin-slow bg-[conic-gradient(from_0deg,#33c2cc,#7a57db,#ca2f8c,#33c2cc)]" />
      </span>

      {/* Inner background */}
      <span className="absolute inset-[1px] rounded-full bg-primary" />
      <span className="absolute inset-[2px] rounded-full bg-gradient-to-b from-white/[0.07] to-transparent" />

      {/* Shine sweep */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

      {/* Content */}
      <span className="relative z-20 flex items-center gap-2">
        {children}
        {icon && <span className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">{icon}</span>}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={`${baseStyles} ${className}`}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={`${baseStyles} ${className}`}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {content}
    </motion.button>
  );
};

export default Button;
