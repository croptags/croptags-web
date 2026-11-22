import { ScrollRevealText } from "../components/ScrollRevealText";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion, useScroll } from "motion/react";
import { Bell, CheckCheck, FileCheck2, FileText, Files, History, MapPinned, Weight } from "lucide-react";
import "./Benefits.css";

const groups = {
  farmers: {
    heading: "Know every tree in your farm",
    description: "Whether you manage 50 or 5,000 trees, Croptags gives you a digital twin of your farm.",
    points: [
      { icon: History, text: "Per-tree yield history across multiple seasons" },
      { icon: FileCheck2, text: "Automated farm activity reports for certification." },
      { icon: Bell, text: "Alert when a tree hasn’t been serviced for 60 days" },
      { icon: FileText, text: "Export CSV / PDF for bank financing documentation" },
    ],
  },
  buyers: {
    heading: "Scan before you buy. Know what you are getting.",
    description: "The durian market is flooded with unknown-origin fruit. One scan of the Croptags QR reveals the tree’s age, variety, care record, and harvest date; so you can pay for quality, not promises.",
    points: [
      { icon: CheckCheck, text: "Verified tree variety and planting date" },
      { icon: Files, text: "Full care log: Fertilizer, Spray, irrigation history" },
      { icon: Weight, text: "Harvest date and batch weight" },
      { icon: MapPinned, text: "Farm location and farmer profile" },
    ],
  },
};

function BenefitsCopy({ content }) {
  const copyRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: copyRef,
    offset: ["start 85%", "end 45%"],
  });
  return (
    <div className="benefits__copy" ref={copyRef}>
      <ScrollRevealText as="h3" className="benefits__heading mx-auto max-w-[1000px] text-[#10275f]" text={content.heading} progress={scrollYProgress} range={[0, 0.3]} />
      <ScrollRevealText className="benefits__body mx-auto mt-5 max-w-[1050px] text-[#8099a7]" text={content.description} progress={scrollYProgress} range={[0.41, 0.65]} />
    </div>
  );
}

export function Benefits() {
  const [selected, setSelected] = useState("farmers");
  const reducedMotion = useReducedMotion();
  const content = groups[selected];

  useEffect(() => {
    const selectFromNavigation = (event) => {
      if (event.detail === "farmers" || event.detail === "buyers") setSelected(event.detail);
    };
    window.addEventListener("croptags:benefit", selectFromNavigation);
    return () => window.removeEventListener("croptags:benefit", selectFromNavigation);
  }, []);

  return (
    <section className="benefits bg-white px-5 py-24 md:px-10 md:py-28" id="beneficials" aria-labelledby="benefits-title">
      <div className="mx-auto max-w-[1370px] text-center">
        <ScrollRevealText as="h2" id="benefits-title" className="benefits__title" text="Beneficials" />
        <LayoutGroup id="benefits-tabs">
          <div className="benefits__tabs mt-12 flex justify-center gap-8 md:mt-14 md:gap-16" role="tablist" aria-label="Benefits for">
            {[["farmers", "For Farmers"], ["buyers", "For Buyers"]].map(([key, label]) => (
              <button
                key={key}
                type="button"
                id={`benefits-tab-${key}`}
                role="tab"
                aria-selected={selected === key}
                aria-controls="benefits-panel"
                onClick={() => setSelected(key)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                    event.preventDefault();
                    const next = key === "farmers" ? "buyers" : "farmers";
                    setSelected(next);
                    event.currentTarget.parentElement.querySelector(`#benefits-tab-${next}`)?.focus();
                  }
                }}
                className="benefits__tab relative isolate rounded-full px-6 py-2 md:px-8"
              >
                {selected === key && (
                  <motion.span
                    layoutId="active-benefit"
                    className="absolute inset-0 -z-10 rounded-full bg-[#00a461]"
                    transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {label}
              </button>
            ))}
          </div>
        </LayoutGroup>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selected}
            id="benefits-panel"
            role="tabpanel"
            aria-labelledby={`benefits-tab-${selected}`}
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.25, ease: "easeInOut" }}
            className="mt-14 md:mt-16"
          >
            <BenefitsCopy content={content} />
            <div className="benefits__points mt-14 grid grid-cols-2 gap-x-7 gap-y-10 text-left md:mt-20 md:grid-cols-4 md:gap-12">
              {content.points.map(({ icon: Icon, text }) => (
                <div key={text}>
                  <Icon aria-hidden="true" size={32} strokeWidth={1.7} className="mb-5 text-[#68c766]" />
                  <p className="benefits__body text-[#20272d]">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
