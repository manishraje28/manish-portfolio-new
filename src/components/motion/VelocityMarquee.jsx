import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ROWS = [
  "FULL-STACK ✦ AI / ML ✦ AGENTIC SYSTEMS ✦ MERN ✦ ",
  "CODE IS CRAFT ✦ BUILD ✦ SHIP ✦ ITERATE ✦ ",
];

// Giant text bands that slide in opposite directions with scroll and skew with scroll velocity
const VelocityMarquee = () => {
  const root = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray(".vm-row");
      rows.forEach((row, i) => {
        gsap.fromTo(
          row,
          { xPercent: i % 2 ? -40 : 0 },
          {
            xPercent: i % 2 ? 0 : -40,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
          }
        );
      });
      const skew = gsap.quickTo(rows, "skewX", { duration: 0.4, ease: "power3" });
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => skew(gsap.utils.clamp(-14, 14, self.getVelocity() / -250)),
        onLeave: () => skew(0),
        onLeaveBack: () => skew(0),
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-16 md:py-28 overflow-hidden select-none" aria-hidden="true">
      {ROWS.map((text, i) => (
        <div
          key={i}
          className={`vm-row whitespace-nowrap font-black leading-none tracking-tight text-[18vw] md:text-[10vw] ${
            i % 2 ? "text-outline" : "text-gradient"
          }`}
        >
          {text.repeat(4)}
        </div>
      ))}
    </section>
  );
};

export default VelocityMarquee;
