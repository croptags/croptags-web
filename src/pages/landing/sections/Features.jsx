import { ScrollRevealText } from "../components/ScrollRevealText";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Scissors, Sprout, Droplets,
  SprayCan, Hop, BugOff, BriefcaseMedical,
} from "lucide-react";
import "./Features.css";

gsap.registerPlugin(ScrollTrigger);

const featureItems = [
  { icon: "harvest-yield.svg", title: "Harvest yield tracking", text: "Keep your records in one place so they are easier to find when you need them." },
  { icon: "farm-activity.svg", title: "Farm activity log", text: "Connect individual fruits back to their trees and keep a clearer record of where they came from." },
  { icon: "consumer-traceability.svg", title: "Consumer traceability", text: "Give workers a simple way to identify trees, view information and record farm activities." },
];

// DOM order follows the mobile Figma's alternating vertical list.
// The desktop animation uses its clockwise order below.
const activities = [
  { icon: Scissors, label: "Pruning", position: "pruning" },
  { icon: Sprout, label: "Fertiliser", position: "fertiliser" },
  { icon: Droplets, label: "Irrigation", position: "irrigation" },
  { icon: SprayCan, label: "Foliar Spray", position: "foliar" },
  { icon: BugOff, label: "Pest control", position: "pest" },
  { icon: Hop, label: "Harvest", position: "harvest" },
  { icon: "/assets/icons/features/soil-amendment.svg", label: "Soil amendment", position: "soil" },
  { icon: BriefcaseMedical, label: "Disease treatment", position: "disease" },
];

function FeatureSummary({ item, index, progress, mobileProgress, desktop }) {
  // The section title finishes first; each feature then gets its own phase.
  const start = 0.20 + index * 0.26;
  const cardProgress = useTransform(mobileProgress, [start, start + 0.26], [0, 1]);
  const phase = 0.18 + index * 0.25;
  return (
    <article>
      <img className="features__item-icon mb-5" src={`/assets/icons/features/${item.icon}`} width="40" height="40" alt="" aria-hidden="true" />
      <ScrollRevealText as="h3" className="features__item-title" text={item.title}
        progress={desktop ? progress : cardProgress} range={desktop ? [phase, phase + 0.035] : [0, 0.25]} />
      <ScrollRevealText className="features__body" text={item.text}
        progress={desktop ? progress : cardProgress} range={desktop ? [phase + 0.10, phase + 0.17] : [0.38, 0.8]} />
    </article>
  );
}

export function Features() {
  const summaryScrollRef = useRef(null);
  const { scrollYProgress: mobileProgress } = useScroll({ target: summaryScrollRef, offset: ["start 80%", "end 65%"] });
  const [desktop, setDesktop] = useState(() => window.matchMedia("(min-width: 1001px) and (min-height: 700px)").matches);
  const { scrollYProgress: summaryProgress } = useScroll({ target: summaryScrollRef, offset: ["start start", "end end"] });
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1001px) and (min-height: 700px)");
    const update = () => setDesktop(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const animationRef = useRef(null);
  const arenaRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const media = gsap.matchMedia();
    media.add({ desktop: "(min-width: 1001px) and (min-height: 700px)", compact: "(max-width: 1000px), (max-height: 699px)" }, (context) => {
      const pills = gsap.utils.toArray(".features__pill", arenaRef.current);
      const clockwiseOrder = ["pruning", "fertiliser", "foliar", "pest", "disease", "soil", "harvest", "irrigation"]
        .map((position) => arenaRef.current.querySelector(`.features__pill--${position}`));
      gsap.set(pills, { autoAlpha: 0, scale: 0.6, y: 18 });
      if (context.conditions.compact) {
        pills.forEach((pill) => {
          gsap.to(pill, {
            autoAlpha: 1, scale: 1, y: 0, duration: 0.45, ease: "power2.out",
            scrollTrigger: { trigger: pill, start: "top 92%", toggleActions: "play none none reverse", invalidateOnRefresh: true },
          });
        });
        return;
      }
      // Hold the activity arena in view until the clockwise sequence has finished.
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: animationRef.current,
          start: "center center",
          end: () => `+=${Math.max(1200, window.innerHeight * 1.7)}`,
          pin: true,
          // Keep the landing-page ancestor and its responsive CSS variables.
          // Transform pinning also avoids fixed-position issues beneath the
          // glass panel's backdrop filter.
          pinReparent: false,
          pinType: "transform",
          pinSpacing: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      timeline.to(clockwiseOrder, {
        autoAlpha: 1, scale: 1, y: 0, ease: "power2.inOut", duration: 0.3, stagger: 0.22,
      }, 0.15);
      // A final hold shows all eight labels before the next section enters.
      timeline.to({}, { duration: 0.45 });
    }, arenaRef);
    let disposed = false;
    document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
    return () => { disposed = true; media.revert(); };
  }, []);

  return (
    <section className="features" id="feature" aria-labelledby="features-title">
      <div className="features__panel">
        <div className="features__summary-scroll" ref={summaryScrollRef}>
          <div className="features__summary">
            <div className="features__summary-content">
              <ScrollRevealText as="h2" id="features-title" className="features__title" text="More than keeping records"
                progress={desktop ? summaryProgress : mobileProgress} range={desktop ? [0, 0.09] : [0, 0.10]} />
              <div className="features__grid mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
                {featureItems.map((item, index) => (
                  <FeatureSummary key={item.title} item={item} index={index} progress={summaryProgress} mobileProgress={mobileProgress} desktop={desktop} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="features__animation" ref={animationRef}>
          <div className="features__arena" ref={arenaRef}>
            <h3 className="features__arena-title">Log Farm Activities</h3>
            {activities.map(({ icon: Icon, label, position }) => (
              <span key={label} className={`features__pill features__pill--${position} inline-flex items-center gap-2 rounded-full bg-[#009d61] px-4 py-2 text-white`}>
                {typeof Icon === "string" ? <img src={Icon} width="24" height="24" alt="" aria-hidden="true" className="features__activity-icon" /> : <Icon aria-hidden="true" size={24} strokeWidth={1.8} />}
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
