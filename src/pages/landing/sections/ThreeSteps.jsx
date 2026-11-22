import { ScrollRevealText } from "../components/ScrollRevealText";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import "./ThreeSteps.css";

const steps = [
  {
    title: "Tag your tree",
    description: "Give each tree its own Crop Tag. Record the information that matters to your farm and create a history for that tree.",
  },
  {
    title: "Tag your fruit",
    description: "When you need to track individual fruits, give them their own tags too. Connect the fruit back to the tree it came from.",
  },
  {
    title: "Scan and record",
    description: "Use your phone to scan a tree or fruit tag. View its information, record what happened and keep its history up to date.",
  },
];

function Step({ step, index, progress, reducedMotion }) {
  // The right-side heading completes before the first step starts.
  const start = 0.16 + index * 0.27;
  const active = useTransform(progress, [start, start + 0.23], [0, 1]);
  const markerColor = useTransform(active, [0, 1], ["#80e6ae", "#00c970"]);

  return (
    <li className="three-steps__step">
      <motion.span
        className="three-steps__marker"
        style={reducedMotion ? undefined : { backgroundColor: markerColor }}
        aria-hidden="true"
      >
        {index + 1}
      </motion.span>
      <span className="three-steps__connector-track" aria-hidden="true" />
      <motion.span className="three-steps__connector-progress" aria-hidden="true" style={{ scaleY: reducedMotion ? 1 : active }} />
      <div className="three-steps__step-content">
        <ScrollRevealText as="h3" text={step.title} progress={active} range={[0, 0.3]} />
        <ScrollRevealText text={step.description} progress={active} range={[0.41, 0.8]} />
      </div>
    </li>
  );
}

export function ThreeSteps() {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const processScrollRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 1000px)").matches);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress: desktopProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const { scrollYProgress: mobileProgress } = useScroll({
    target: processScrollRef,
    offset: ["start 80%", "end 60%"],
  });
  const { scrollYProgress: introProgress } = useScroll({
    target: introRef,
    offset: ["start 80%", "end 35%"],
  });
  const introRevealProgress = isMobile ? introProgress : desktopProgress;
  // Desktop: finish the entire left column before starting the right column.
  const rightProgress = useTransform(desktopProgress, [0.44, 1], [0, 1]);
  const rightVisibility = useTransform(desktopProgress, [0.40, 0.44], [0, 1]);
  const scrollYProgress = isMobile ? mobileProgress : rightProgress;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1000px)");
    const update = () => setIsMobile(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <section ref={sectionRef} className="three-steps" id="how-it-works" aria-labelledby="three-steps-title">
      <div className="three-steps__stage">
      <div className="three-steps__inner">
        <div className="three-steps__intro" ref={introRef}>
          <ScrollRevealText progress={introRevealProgress} range={isMobile ? [0, 0.3] : [0, 0.08]} as="h2" id="three-steps-title" text="Give every tree and fruit its own identity" breakAfter={3} breakClassName="three-steps__desktop-break" />
          <ScrollRevealText progress={introRevealProgress} range={isMobile ? [0.41, 0.65] : [0.17, 0.34]} text="A simple digital farm record system that connects your physical crops to their digital records. Give a tree its own QR tag and tag individual fruits when you need more detail. Scan the tag with your phone to view information, add a record or update its history." />
        </div>

        <div className="three-steps__process-scroll" ref={processScrollRef}>
          <motion.div className="three-steps__process" style={isMobile || reducedMotion ? undefined : { opacity: rightVisibility }}>
            <ScrollRevealText progress={scrollYProgress} range={[0, 0.08]} as="h3" className="three-steps__heading" text="Three simple steps" />
            <div className="three-steps__list">
              <ol className="three-steps__items">
                {steps.map((step, index) => (
                  <Step key={step.title} step={step} index={index} progress={scrollYProgress} reducedMotion={Boolean(reducedMotion)} />
                ))}
              </ol>
            </div>
          </motion.div>
        </div>
      </div>
      </div>
    </section>
  );
}
