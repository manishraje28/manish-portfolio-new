import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Splits an element's text into per-character spans (words kept intact for wrapping)
const splitChars = (el) => {
  if (el.dataset.split) return el.querySelectorAll(".char");
  const words = el.textContent.trim().split(/\s+/);
  el.replaceChildren();
  words.forEach((w, i) => {
    const word = document.createElement("span");
    word.className = "inline-block whitespace-nowrap";
    for (const c of w) {
      const ch = document.createElement("span");
      ch.className = "char inline-block";
      ch.textContent = c;
      word.appendChild(ch);
    }
    el.appendChild(word);
    if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
  });
  el.dataset.split = "1";
  return el.querySelectorAll(".char");
};

// Page-wide GSAP effects applied to existing markup
const ScrollEffects = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section headings: 3D character flip-in
      gsap.utils.toArray(".text-heading").forEach((h) => {
        gsap.from(splitChars(h), {
          yPercent: 120,
          rotateX: -90,
          opacity: 0,
          stagger: 0.025,
          duration: 0.9,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: h, start: "top 88%" },
        });
      });

      // Hero card drifts back and blurs as you scroll past
      gsap.to("#home .hero-card", {
        yPercent: -30,
        scale: 0.85,
        opacity: 0,
        filter: "blur(8px)",
        ease: "none",
        scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: true },
      });

      // About bento: tiles rise and unfold in sequence
      // fromTo with explicit end values: the tiles' CSS transitions would otherwise
      // let GSAP read a mid-fade opacity as the target
      gsap.fromTo("#about .grid > div", {
        y: 100,
        rotateX: -30,
        scale: 0.9,
        opacity: 0,
        transformPerspective: 1000,
        transition: "none",
      }, {
        y: 0,
        rotateX: 0,
        scale: 1,
        opacity: 1,
        stagger: 0.12,
        duration: 1.1,
        ease: "power4.out",
        clearProps: "all",
        scrollTrigger: { trigger: "#about .grid", start: "top 85%" },
      });

      // Timeline entries slide in from the side
      gsap.utils.toArray(".section-spacing .relative.pb-0 > div").forEach((el) => {
        gsap.from(el, {
          x: -80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Contact card zooms up out of the galaxy
      gsap.from("#contact > div.max-w-md", {
        scale: 0.8,
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: "#contact", start: "top 75%" },
      });

      // Generic reveal for elements marked data-reveal
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });
    });
    // Layout shifts after images/fonts load
    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    const late = setTimeout(refresh, 1500);
    window.addEventListener("load", refresh);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(late);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);
  return null;
};

export default ScrollEffects;
