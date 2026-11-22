import { motion, useReducedMotion } from "motion/react";
import "./Hero.css";

export const Hero = () => {
  const reducedMotion = useReducedMotion();
  return (
    <section className="landing-hero" aria-labelledby="hero-title">
      <picture className="landing-hero__photo">
        <source media="(max-width: 700px)" srcSet="/assets/image/hero-mobile.svg" />
        <img src="/assets/image/background-image.svg?v=2" alt="CropTags QR tag on a durian tree" />
      </picture>
      <div className="landing-hero__shade" aria-hidden="true" />
      <motion.div
        className="landing-hero__content"
        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
      >
        <h1 id="hero-title">Know every tree.<br />Track every fruit.</h1>
        <p>Keep track of your trees, individual fruits and farm<br className="landing-hero__desktop-break" /> records in one simple place.</p>
      </motion.div>
    </section>
  );
};
