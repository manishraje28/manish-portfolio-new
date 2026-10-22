import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Dot + trailing ring cursor; ring grows over interactive elements. Desktop (fine pointer) only.
const Cursor = () => {
  const dot = useRef(null);
  const ring = useRef(null);
  const [enabled] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("custom-cursor");
    const xDot = gsap.quickTo(dot.current, "x", { duration: 0.1 });
    const yDot = gsap.quickTo(dot.current, "y", { duration: 0.1 });
    const xRing = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const yRing = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

    const move = (e) => {
      xDot(e.clientX); yDot(e.clientY);
      xRing(e.clientX); yRing(e.clientY);
    };
    const over = (e) => {
      const hot = e.target.closest("a, button, [data-cursor]");
      gsap.to(ring.current, { scale: hot ? 2.2 : 1, duration: 0.3 });
      gsap.to(dot.current, { scale: hot ? 0 : 1, duration: 0.2 });
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={ring} className="cursor-ring" />
      <div ref={dot} className="cursor-dot" />
    </>
  );
};

export default Cursor;
