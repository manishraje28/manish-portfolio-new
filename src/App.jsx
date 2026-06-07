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

const App = () => {
  return (
    <main className="w-full">
      <Navbar />
      <Hero />
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
    </main>
  );
};

export default App;
