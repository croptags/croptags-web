import { useState } from "react";
import {
  BugOff,
  Droplets,
  FlaskConical,
  Scissors,
  ShieldAlert,
  Sprout,
} from "lucide-react";
import { EmptyState } from "@/pages/tree-detail/components/EmptyState";
import {
  SectionTitle,
  TreeInfoCard,
} from "@/pages/tree-detail/components/TreeInfoCard";
import { formatDate } from "@/utils/formatDate";
import noCareRecord from "@/assets/tree-detail/no-care-record.svg";

const ACTIVITY_TYPES = {
  fertilizer: Sprout,
  attention: ShieldAlert,
  pruning: Scissors,
  pesticide: BugOff,
  fungicide: FlaskConical,
  watering: Droplets,
};

function normalizeActivityType(action = "") {
  const normalized = action
    .toLowerCase()
    .trim()
    .replace(/[ _-]+/g, "");
  if (normalized.includes("fertil")) return "fertilizer";
  if (normalized.includes("attention")) return "attention";
  if (normalized.includes("prun")) return "pruning";
  if (normalized.includes("pesticide") || normalized.includes("pestcontrol"))
    return "pesticide";
  if (normalized.includes("fungicid")) return "fungicide";
  if (normalized.includes("water")) return "watering";
  return "attention";
}

export function CareRecords({ records = [], t, locale }) {
  const [showAll, setShowAll] = useState(false);

  if (!records.length) {
    return (
      <EmptyState
        image={noCareRecord}
        title={t("noRecords")}
        description={t("noRecordsDescription")}
      />
    );
  }

  const visibleRecords = showAll ? records : records.slice(0, 5);

  return (
    <TreeInfoCard>
      <SectionTitle>{t("records")}</SectionTitle>
      <ol className="mt-5 space-y-5">
        {visibleRecords.map((record, index) => {
          const type = normalizeActivityType(record.action_type);
          const Icon = ACTIVITY_TYPES[type];

          return (
            <li
              key={`${record.date}-${record.action_type}-${index}`}
              className="relative flex gap-3.5"
            >
              {index < visibleRecords.length - 1 && (
                <span className="absolute left-[16px] top-9 h-[calc(100%+1.25rem)] w-px bg-[#e5ebed]" />
              )}
              <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success-solid text-white">
                <Icon size={17} />
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="label-2-regular md:label-1-regular text-text-secondary">
                  {formatDate(record.date, locale)}
                </p>
                <p className="label-2-medium md:label-1-medium mt-1 text-text-primary">
                  {t(type)}
                </p>
                {record.product && (
                  <p className="label-2-regular md:label-1-regular mt-1 text-text-secondary">
                    {record.product}
                  </p>
                )}
                {record.by_who && (
                  <p className="label-2-regular md:label-1-regular mt-1 text-text-secondary">
                    {record.by_who}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      {records.length > 5 && (
        <button
          type="button"
          onClick={() => setShowAll((visible) => !visible)}
          className="label-2-medium md:label-1-medium mt-6 text-brand underline underline-offset-4"
        >
          {showAll ? t("viewLess") : t("viewMore")}
        </button>
      )}
    </TreeInfoCard>
  );
}
