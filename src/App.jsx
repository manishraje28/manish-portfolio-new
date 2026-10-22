import React from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import DeveloperActivity from "./sections/DeveloperActivity";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Education from "./sections/Education";
import Testimonial from "./sections/Testimonial";
import Contact from "./sections/Contact";
import Footer from './sections/Footer';
import SmoothScroll from "./components/motion/SmoothScroll";
import Cursor from "./components/motion/Cursor";
import ScrollProgress from "./components/motion/ScrollProgress";
import CosmicBackground from "./components/motion/CosmicBackground";
import ScrollEffects from "./components/motion/ScrollEffects";
import VelocityMarquee from "./components/motion/VelocityMarquee";
import Manifesto from "./components/motion/Manifesto";

const App = () => {
  return (
    <main className="w-full">
      <SmoothScroll />
      <ScrollProgress />
      <Cursor />
      <CosmicBackground />
      <Navbar />
      <Hero />
      <VelocityMarquee />
      <Manifesto />
      <div className="container mx-auto max-w-7xl">
        <About />
        <DeveloperActivity />
        <Projects />
        <Education />
        <Experiences />
        <Testimonial />
        <Contact />
        <Footer />
      </div>
      {/* Last, so its triggers are measured after the Manifesto pin spacer exists */}
      <ScrollEffects />
    </main>
  );
};

export default App;
