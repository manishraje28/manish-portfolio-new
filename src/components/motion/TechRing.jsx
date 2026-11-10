import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OUTER = ["react", "nodejs", "mongodb", "expressjs", "nextjs", "javascript", "python", "tailwindcss", "fastapi", "supabase"];
const INNER = ["java", "html5", "css3", "firebase", "mysql", "git", "postman", "vitejs"];

const Ring = ({ logos, className }) => (
  <div className={`ring3d-tilt ${className}`}>
    <div className="ring3d-spin" style={{ "--n": logos.length }}>
      {logos.map((logo, i) => (
        <div key={logo} className="ring3d-item" style={{ "--i": i }}>
          <img src={`assets/logos/${logo}.svg`} alt={logo} loading="lazy" />
        </div>
      ))}
    </div>
  </div>
);

// Two counter-rotating 3D rings of tech logos around a glowing core.
// Pure CSS 3D transforms: the spin runs on the compositor, so it stays smooth on phones.
const TechRing = () => {
  const root = useRef(null);
  const inView = useInView(root, { margin: "200px" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Whole atom leans as you scroll through it
      gsap.fromTo(
        ".ring3d-atom",
        { rotateX: 28, rotateY: -25 },
        {
          rotateX: -18,
          rotateY: 25,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="c-space mt-20 md:mt-30 overflow-x-clip" id="stack">
      <h2 className="text-heading">Tech Arsenal</h2>
      <p className="mt-4 subtext max-w-xl">
        The tools I reach for most, in orbit.
      </p>
      <div className="ring3d-scene" data-paused={!inView}>
        <div className="ring3d-atom">
          <div className="ring3d-core" />
          <Ring logos={OUTER} className="ring3d-outer" />
          <Ring logos={INNER} className="ring3d-inner" />
        </div>
      </div>
    </section>
  );
};

export default TechRing;
