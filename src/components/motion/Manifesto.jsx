import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEXT =
  "I build full-stack products and AI systems that feel effortless — from multi-agent learning companions to blockchain verification. Clean code, sharp design, real impact.";
const HIGHLIGHT = new Set(["full-stack", "AI", "multi-agent", "blockchain", "impact."]);

// Pinned statement whose words light up one by one as you scroll
const Manifesto = () => {
  const root = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray(".mf-word");
      gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 1.4}`,
          scrub: 0.5,
          pin: true,
        },
      })
        .to(words, { opacity: 1, stagger: 0.1, ease: "none" })
        .to(".mf-glow", { scale: 1.6, opacity: 0.7, ease: "none" }, 0);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative flex items-center min-h-screen c-space overflow-hidden">
      <div className="mf-glow absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] rounded-full bg-royal/30 blur-[120px] opacity-30 pointer-events-none" />
      <p className="relative max-w-5xl mx-auto text-3xl font-bold leading-tight md:text-6xl">
        {TEXT.split(" ").map((w, i) => (
          <span
            key={i}
            className={`mf-word inline-block mr-[0.25em] opacity-15 ${
              HIGHLIGHT.has(w) ? "text-gradient" : "text-white"
            }`}
          >
            {w}
          </span>
        ))}
      </p>
    </section>
  );
};

export default Manifesto;
