import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/parallaxBackground";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  return (
    <section id="home" className="relative flex min-h-screen overflow-hidden pt-20 md:pt-32 w-full">
      <div className="w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-10 flex items-start justify-start">
        <HeroText />
      </div>
      <ParallaxBackground />
    </section>
  );
};

export default Hero;
