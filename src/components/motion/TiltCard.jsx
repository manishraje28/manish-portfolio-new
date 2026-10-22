import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "motion/react";

// 3D tilt toward the pointer with a moving spotlight glow
const TiltCard = ({ children, className = "" }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 200, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(500px circle at ${useTransform(mx, (v) => v * 100)}% ${useTransform(my, (v) => v * 100)}%, rgba(122,87,219,0.25), transparent 45%)`;

  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const reset = () => { mx.set(0.5); my.set(0.5); };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`relative h-full rounded-3xl p-4 bg-white/[0.03] border border-white/10 backdrop-blur-sm ${className}`}
      data-cursor
    >
      <motion.div style={{ background: glow }} className="absolute inset-0 rounded-3xl pointer-events-none" />
      <div className="relative" style={{ transform: "translateZ(40px)" }}>{children}</div>
    </motion.div>
  );
};

export default TiltCard;
