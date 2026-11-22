import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hop, SunMoon, SprayCan, TreeDeciduous, UsersRound } from "lucide-react";
import "./ProblemReveal.css";

gsap.registerPlugin(ScrollTrigger);

const lines = [
  "The durian market is suffering.",
  "Poor farm management is the",
  "root cause.",
];
const description = "New plantations are bearing fruit without the care or records to back it up. Buyers cannot distinguish quality and price collapses for everyone, including farmers who did the work right.";
// Keep Figma's mobile lines stable across Safari and desktop font rounding.
const mobileDescription = `New plantations are bearing fruit
without the care or records to back it up.
Buyers cannot distinguish quality and
price collapses for everyone, including
farmers who did the work right.`;
const descriptionWords = description.split(" ");

// Mobile reading and reveal order follows the alternating Figma cards.
// Desktop uses its own clockwise sequence below.
const questions = [
  { icon: SprayCan, text: "When was this tree last treated?", position: "top-right" },
  { icon: TreeDeciduous, text: "Which tree did this fruit come from?", position: "top-left" },
  { icon: SunMoon, text: "What happened to this tree last season?", position: "bottom" },
  { icon: UsersRound, text: "Which worker handled this farm activity?", position: "middle-left" },
  { icon: Hop, text: "Which fruits were harvested from this tree?", position: "middle-right" },
];

const wordCount = lines.join(" ").split(" ").length;

function RevealedWord({ word, index, progress, reducedMotion }) {
  // White heading finishes before the paragraph starts revealing.
  const start = wordCount <= 1 ? 0 : (index / (wordCount - 1)) * 0.3;
  const opacity = useTransform(progress, [start, start + 0.06], [0.2, 1]);

  return (
    <motion.span aria-hidden="true" style={reducedMotion ? undefined : { opacity }}>
      {word}
    </motion.span>
  );
}

function RevealedDescriptionWord({ word, index, progress, reducedMotion }) {
  const start = 0.41 + (index / Math.max(descriptionWords.length - 1, 1)) * 0.24;
  const color = useTransform(progress, [start, start + 0.055], ["rgba(25, 56, 58, 0.3)", "#192b2e"]);
  return <motion.span style={reducedMotion ? undefined : { color }}>{word}</motion.span>;
}

function MobileWords({ text, className }) {
  const words = text.split(" ");
  return <>
    <span className="sr-only">{text}</span>
    {words.map((word, index) => (
      <Fragment key={`${index}-${word}`}>
        <span className={className} aria-hidden="true">{word}</span>
        {index < words.length - 1 ? " " : null}
      </Fragment>
    ))}
  </>;
}

function MobileProblemCopy() {
  return (
    <div className="problem-reveal__mobile-copy">
      <h2 id="problem-title" className="problem-reveal__title">
        <MobileWords text={lines.join(" ")} className="problem-reveal__mobile-heading-word" />
      </h2>
      <p className="problem-reveal__description">
        <MobileWords text={mobileDescription} className="problem-reveal__mobile-body-word" />
      </p>
    </div>
  );
}

export function ProblemReveal() {
  const sectionRef = useRef(null);
  const [compact, setCompact] = useState(() => window.matchMedia("(max-width: 1000px), (max-height: 650px)").matches);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 1000px), (max-height: 650px)");
    const update = () => setCompact(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const cardsRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useLayoutEffect(() => {
    if (reducedMotion) return;

    const media = gsap.matchMedia();
    media.add({ compact: "(max-width: 1000px), (max-height: 650px)", full: "(min-width: 1001px) and (min-height: 651px)" }, (context) => {
      const cards = gsap.utils.toArray(".problem-reveal__card", cardsRef.current);
      if (context.conditions.compact) {
        const headingWords = sectionRef.current.querySelectorAll(".problem-reveal__mobile-heading-word");
        const bodyWords = sectionRef.current.querySelectorAll(".problem-reveal__mobile-body-word");
        // Scroll starts one ordered reveal. No pin or viewport-sized spacer:
        // animation timing changes visibility only, never the Figma layout.
        gsap.set([...headingWords, ...bodyWords], { opacity: 0.2 });
        gsap.set(cards, { autoAlpha: 0, y: 16 });
        const sequence = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current.querySelector(".problem-reveal__mobile-copy"),
            start: "top 85%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        });
        sequence.to(headingWords, { opacity: 1, duration: 0.2, stagger: 0.055, ease: "none" });
        sequence.to(bodyWords, { opacity: 1, duration: 0.2, stagger: 0.025, ease: "none" }, "+=0.08");
        sequence.to(cards, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.14, ease: "power2.out" }, "+=0.08");
        return;
      }
      const desktopOrder = ["top-left", "top-right", "middle-right", "bottom", "middle-left"]
        .map((position) => cardsRef.current.querySelector(`.problem-reveal__card--${position}`));
      gsap.set(cards, { autoAlpha: 0, y: 28, scale: 0.94 });
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom bottom", scrub: 0.8, invalidateOnRefresh: true },
      });
      timeline.fromTo(desktopOrder, { autoAlpha: 0, y: 28, scale: 0.94 }, {
        autoAlpha: 1, y: 0, scale: 1, duration: 0.10, stagger: 0.035, ease: "power2.inOut",
      }, 0.76);
      // Paragraph ends at 0.705; first card follows at 0.76.
      timeline.to({}, { duration: 0.001 }, 0.999);
    }, sectionRef);
    return () => media.revert();
  }, [reducedMotion, compact]);

  let wordIndex = 0;

  return (
    <section ref={sectionRef} className="problem-reveal" id="the-problem" aria-labelledby="problem-title">
      <div className="problem-reveal__stage">
        <div className="problem-reveal__content">
          {compact ? <MobileProblemCopy /> : (
          <h2
            id="problem-title"
            className="problem-reveal__title"
            aria-label={lines.join(" ")}
          >
            {lines.map((line) => (
              <span className="problem-reveal__line" key={line}>
                {line.split(" ").map((word, index, words) => {
                  const currentIndex = wordIndex++;
                  return (
                    <Fragment key={`${line}-${index}`}>
                      <RevealedWord
                        word={word}
                        index={currentIndex}
                        progress={scrollYProgress}
                        reducedMotion={Boolean(reducedMotion)}
                      />
                      {index < words.length - 1 ? " " : null}
                    </Fragment>
                  );
                })}
              </span>
            ))}
          </h2>
          )}

          {!compact && (
          <p className="problem-reveal__description">
            {descriptionWords.map((word, index) => (
              <Fragment key={`${index}-${word}`}>
                <RevealedDescriptionWord word={word} index={index} progress={scrollYProgress} reducedMotion={Boolean(reducedMotion)} />
                {index < descriptionWords.length - 1 ? " " : null}
              </Fragment>
            ))}
          </p>
          )}

          <div ref={cardsRef} className="problem-reveal__cards" aria-label="Questions CropTags helps answer">
            {questions.map(({ icon: Icon, text, position }) => (
              <div className={`problem-reveal__card problem-reveal__card--${position}`} key={text}>
                <Icon aria-hidden="true" size={22} strokeWidth={1.8} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
