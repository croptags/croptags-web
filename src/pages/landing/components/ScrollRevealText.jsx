import { Fragment, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

function RevealedWord({ word, index, count, progress, range, reducedMotion }) {
  // Match the durian market section: each word follows a fixed portion
  // of scroll progress, with a soft overlap into the following word.
  const start = range[0] + (index / Math.max(count - 1, 1)) * (range[1] - range[0]);
  const opacity = useTransform(progress, [start, start + 0.06], [0.2, 1]);
  return <motion.span className="scroll-reveal__word" aria-hidden="true" style={reducedMotion ? undefined : { opacity }}>{word}</motion.span>;
}

export function ScrollRevealText({ as: Tag = "p", text, breakAfter, breakClassName, progress, range = [0, 0.8], ...props }) {
  const elementRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ["start 88%", "end 45%"],
  });
  const words = text.split(" ");
  return (
    <Tag ref={elementRef} {...props}>
      <span className="sr-only">{text}</span>
      {words.map((word, index) => (
        <Fragment key={`${index}-${word}`}>
          <RevealedWord word={word} index={index} count={words.length} progress={progress ?? scrollYProgress} range={range} reducedMotion={Boolean(reducedMotion)} />
          {index === breakAfter && <br className={breakClassName} aria-hidden="true" />}
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
