import { ScrollRevealText } from "../components/ScrollRevealText";
import { useRef } from "react";
import { useScroll } from "motion/react";
import "./SampleKit.css";

export function SampleKit() {
  const introRef = useRef(null);
  // One sequence for heading then description, measured in normal page flow.
  const { scrollYProgress: progress } = useScroll({
    target: introRef,
    offset: ["start 80%", "end 35%"],
  });
  return (
    <section className="sample-kit" id="contact" aria-labelledby="sample-kit-title">
      <div className="sample-kit__card">
        <div className="sample-kit__intro" ref={introRef}>
        <ScrollRevealText progress={progress} range={[0, 0.3]} as="h2" id="sample-kit-title" className="sample-kit__title" text="Ready to tag your farm?" />
        <ScrollRevealText progress={progress} range={[0.41, 0.75]} className="sample-kit__description" text="Leave your details and we’ll reach out with our pricing and sample kit." />
        </div>
        <form className="sample-kit__form" aria-label="Sample kit request preview" onSubmit={(event) => event.preventDefault()}>
          <label>Your Name<input type="text" placeholder="Ali Muthu" /></label>
          <label>Email address<input type="email" placeholder="ali@example.com" /></label>
          <label>Farm Name<input type="text" placeholder="Orchard Rising" /></label>
          <label>Approx. Number of Trees<input type="number" min="0" placeholder="300" /></label>
          <button type="button" title="Form submission will be connected when the client provides an endpoint">Request sample kit</button>
        </form>
      </div>
    </section>
  );
}
