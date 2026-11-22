import { ScrollRevealText } from "../components/ScrollRevealText";
import { FileQuestion } from "lucide-react";
import "./Comparison.css";

const rows = [
  { beforeIcon: "paintbrush.svg", afterIcon: "qr-code.svg", before: "Paint fades in 1 - 2 seasons, label becomes unreadable", after: "Laser engraved stainless steel QR tags legible for 20+ years" },
  { beforeIcon: "circle-slash.svg", afterIcon: "spring.svg", before: "Tight wire tags girdle branches, stunting tree growth or killing it", after: "304 stainless steel tension spring expands with tree girth" },
  { beforeIcon: FileQuestion, afterIcon: "harvest-records.svg", before: "No harvest records and yield guesswork every season.", after: "Full digital harvest log, activity trail and yield analytics" },
  { beforeIcon: "separate-records.svg", afterIcon: "connected-records.svg", before: "Fruit and tree records kept separately", after: "Fruit can be connected to its tree" },
];

function ComparisonIcon({ icon: Icon }) {
  return typeof Icon === "string"
    ? <img className="comparison-section__icon" src={`/assets/icons/comparison/${Icon}`} width="24" height="24" alt="" aria-hidden="true" />
    : <Icon className="comparison-section__icon" aria-hidden="true" size={24} strokeWidth={1.8} />;
}

export function Comparison() {
  return (
    <section className="comparison-section px-5 py-28 md:px-10" aria-labelledby="comparison-title">
      <div className="mx-auto max-w-[1100px]">
        <ScrollRevealText as="h2" id="comparison-title" className="comparison-section__title" text="From scattered records to a connected farm history" breakAfter={4} breakClassName="hidden md:block" />
        <div className="comparison-section__table" role="table" aria-label="Without and with CropTags">
          <div className="comparison-section__head" role="row">
            <div role="columnheader">Without Croptags</div>
            <div role="columnheader">With Croptags</div>
          </div>
          {rows.map(({ beforeIcon: BeforeIcon, afterIcon: AfterIcon, before, after }) => (
            <div className="comparison-section__row" role="row" key={before}>
              <div role="cell"><ComparisonIcon icon={BeforeIcon} /><span>{before}</span></div>
              <div role="cell"><ComparisonIcon icon={AfterIcon} /><span>{after}</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
