import { SmoothScrolling } from "./components/SmoothScrolling";
import { Navbar } from "@/pages/landing/components/Navbar";
import { Hero } from "@/pages/landing/sections/Hero";
import { ProblemReveal } from "@/pages/landing/sections/ProblemReveal";
import { ThreeSteps } from "@/pages/landing/sections/ThreeSteps";
import { Features } from "@/pages/landing/sections/Features";
import { Benefits } from "@/pages/landing/sections/Benefits";
import { Comparison } from "@/pages/landing/sections/Comparison";
import { SampleKit } from "@/pages/landing/sections/SampleKit";
import { Footer } from "@/pages/landing/components/Footer";

import "./MobileResponsive.css";

export const Landing = () => {
  return (
    <div className="landing-page relative min-h-screen" id="top">
      <SmoothScrolling />
      <Navbar />
      <main>
        <Hero />
        <ProblemReveal />
        <ThreeSteps />
        <Features />
        <Benefits />
        <div className="landing-comparison-contact">
          <Comparison />
          <SampleKit />
        </div>
      </main>
      <Footer />
    </div>
  );
};
