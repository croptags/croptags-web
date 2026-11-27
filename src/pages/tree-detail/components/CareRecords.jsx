import { useState } from "react";
import {
  BugOff,
  Droplets,
  FlaskConical,
  Scissors,
  ShieldAlert,
  ShieldCheck,
  SprayCan,
  Sprout,
  Waves,
} from "lucide-react";
import { EmptyState } from "@/pages/tree-detail/components/EmptyState";
import {
  SectionTitle,
  TreeInfoCard,
} from "@/pages/tree-detail/components/TreeInfoCard";
import { formatDate } from "@/utils/formatDate";
import noCareRecord from "@/assets/tree-detail/no-care-record.svg";

const ACTIVITY_TYPES = {
  fertiliser: {
    icon: Sprout,
    iconClass: "bg-emerald-600 text-white",
    badgeClass: "border-emerald-200 bg-emerald-50 text-emerald-800",
  },
  pesticide: {
    icon: BugOff,
    iconClass: "bg-rose-500 text-white",
    badgeClass: "border-rose-200 bg-rose-50 text-rose-800",
  },
  fungicide: {
    icon: FlaskConical,
    iconClass: "bg-violet-500 text-white",
    badgeClass: "border-violet-200 bg-violet-50 text-violet-800",
  },
  foliar: {
    icon: SprayCan,
    iconClass: "bg-teal-500 text-white",
    badgeClass: "border-teal-200 bg-teal-50 text-teal-800",
  },
  soilDrenching: {
    icon: Waves,
    iconClass: "bg-stone-600 text-white",
    badgeClass: "border-stone-300 bg-stone-100 text-stone-800",
  },
  watering: {
    icon: Droplets,
    iconClass: "bg-info-solid text-white",
    badgeClass: "border-info-border bg-info-bg text-info-text",
  },
  pruning: {
    icon: Scissors,
    iconClass: "bg-orange-500 text-white",
    badgeClass: "border-orange-200 bg-orange-50 text-orange-800",
  },
  needsAttention: {
    icon: ShieldAlert,
    iconClass: "bg-amber-500 text-white",
    badgeClass: "border-amber-300 bg-amber-50 text-amber-800",
  },
  markHealthy: {
    icon: ShieldCheck,
    iconClass: "bg-success-solid text-white",
    badgeClass: "border-success-border bg-success-bg text-success-text",
  },
};

const FALLBACK_ACTIVITY = {
  icon: Sprout,
  iconClass: "bg-brand text-white",
  badgeClass: "border-border-default bg-surface-subtle text-text-primary",
};

function cleanText(value) {
  if (value == null) return "";
  return String(value).trim();
}

function normalizeActivityType(action = "") {
  const normalized = cleanText(action)
    .toLowerCase()
    .replace(/[ _-]+/g, "");
  if (!normalized) return null;
  if (normalized.includes("fertil")) return "fertiliser";
  if (normalized.includes("pesticide") || normalized.includes("pestcontrol"))
    return "pesticide";
  if (normalized.includes("fungicid")) return "fungicide";
  if (normalized.includes("foliar")) return "foliar";
  if (
    normalized.includes("soildrench") ||
    normalized.includes("drench") ||
    normalized.includes("soil")
  )
    return "soilDrenching";
  if (normalized.includes("water") || normalized.includes("irrigat"))
    return "watering";
  if (normalized.includes("prun")) return "pruning";
  if (
    normalized.includes("markhealthy") ||
    normalized.includes("statuschange") ||
    normalized === "healthy" ||
    normalized.includes("recover")
  )
    return "markHealthy";
  if (normalized.includes("attention")) return "needsAttention";
  return null;
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
          const config = type ? ACTIVITY_TYPES[type] : FALLBACK_ACTIVITY;
          const Icon = config.icon;
          const label = type
            ? t(type)
            : cleanText(record.action_type) || t("needsAttention");
          const productSummary = [
            cleanText(record.product),
            cleanText(record.amount),
          ]
            .filter(Boolean)
            .join(" · ");
          const description = cleanText(record.description);
          const byWho = cleanText(record.by_who);

          return (
            <li
              key={`${record.date}-${record.action_type}-${index}`}
              className="relative flex gap-3.5"
            >
              {index < visibleRecords.length - 1 && (
                <span className="absolute left-[16px] top-9 h-[calc(100%+1.25rem)] w-px bg-[#e5ebed]" />
              )}
              <span
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${config.iconClass}`}
              >
                <Icon size={17} />
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span
                    className={`label-2-medium inline-flex items-center rounded-full border px-2.5 py-0.5 ${config.badgeClass}`}
                  >
                    {label}
                  </span>
                  <span className="body-4-regular md:body-3-regular text-text-secondary">
                    {formatDate(record.date, locale)}
                  </span>
                </div>
                {productSummary && (
                  <p className="label-2-medium md:label-1-medium mt-1.5 break-words text-text-primary">
                    {productSummary}
                  </p>
                )}
                {description && (
                  <p className="body-3-regular md:body-2-regular mt-1 break-words text-text-secondary">
                    {description}
                  </p>
                )}
                {byWho && (
                  <p className="body-4-regular md:body-3-regular mt-1 text-text-secondary/85">
                    {byWho}
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
