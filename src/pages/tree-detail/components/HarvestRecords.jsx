import { useState } from "react";
import { ShoppingBasket } from "lucide-react";
import { EmptyState } from "@/pages/tree-detail/components/EmptyState";
import {
  SectionTitle,
  TreeInfoCard,
} from "@/pages/tree-detail/components/TreeInfoCard";
import noHarvest from "@/assets/tree-detail/no-harvest.svg";
import { formatDate } from "@/utils/formatDate";

export function HarvestRecords({ records = [], t, locale }) {
  const [showAll, setShowAll] = useState(false);

  if (!records.length) {
    return (
      <EmptyState
        image={noHarvest}
        title={t("noFruits")}
        description={t("noFruitsDescription")}
      />
    );
  }

  const visibleRecords = showAll ? records : records.slice(0, 5);

  return (
    <TreeInfoCard>
      <SectionTitle>{t("harvest")}</SectionTitle>
      <ol className="mt-5 space-y-5">
        {visibleRecords.map((record, index) => (
          <li
            key={`${record.date}-${record.weight_kg ?? record.weight}-${index}`}
            className="relative flex gap-3.5"
          >
            {index < visibleRecords.length - 1 && (
              <span className="absolute left-[16px] top-9 h-[calc(100%+1.25rem)] w-px bg-border-default" />
            )}
            <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success-solid text-white">
              <ShoppingBasket size={17} />
            </span>
            <div className="min-w-0 pt-0.5">
              <p className="label-2-regular md:label-1-regular text-text-secondary">
                {formatDate(record.date, locale)}
              </p>
              <p className="label-2-medium md:label-1-medium mt-1 text-text-primary">
                {record.weight_kg ?? record.weight ?? "—"} kg
              </p>
              {record.by_who && (
                <p className="label-2-regular md:label-1-regular mt-1 text-text-secondary">
                  {record.by_who}
                </p>
              )}
            </div>
          </li>
        ))}
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
