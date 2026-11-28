import { useState } from "react";
import { EmptyState } from "@/pages/tree-detail/components/EmptyState";
import {
  SectionTitle,
  TreeInfoCard,
} from "@/pages/tree-detail/components/TreeInfoCard";
import noHarvest from "@/assets/tree-detail/no-harvest.svg";
import { formatDate } from "@/utils/formatDate";

function HarvestIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.9267 0.99707C14.3763 0.99707 14.7409 1.36167 14.7409 1.81123C14.7409 2.26079 14.3763 2.62539 13.9267 2.62539C13.474 2.62543 13.1915 2.78713 12.9711 3.04224C12.8361 3.19854 12.7177 3.39993 12.6148 3.64239L14.5399 3.2702L14.6236 3.25811C14.8183 3.24098 15.0139 3.29473 15.1736 3.4107C15.3559 3.54325 15.4753 3.7453 15.5029 3.96898L15.7923 6.32028L17.9408 7.32425C18.145 7.41968 18.3009 7.59559 18.3706 7.80996C18.4404 8.0245 18.4176 8.25926 18.3083 8.45663L17.1601 10.5297L18.3083 12.6037C18.4174 12.801 18.4403 13.0351 18.3706 13.2495C18.3009 13.4638 18.145 13.6397 17.9408 13.7352L15.7923 14.7382L15.5029 17.0904C15.4753 17.3141 15.3559 17.5162 15.1736 17.6487C14.9911 17.7813 14.7614 17.8321 14.5399 17.7892L12.2128 17.3389L10.5957 19.0714C10.4418 19.2361 10.2265 19.33 10.0011 19.3301C9.7755 19.3301 9.55953 19.2363 9.40558 19.0714L7.78843 17.3379L5.46133 17.7892C5.23995 17.8321 5.01105 17.7813 4.82861 17.6487C4.64619 17.5162 4.52692 17.3142 4.49923 17.0904L4.20799 14.7373L2.0614 13.7352C1.85712 13.6398 1.70129 13.4639 1.63152 13.2495C1.56183 13.035 1.58469 12.8011 1.69387 12.6037L2.84113 10.5297L1.69387 8.45663C1.58461 8.25926 1.56181 8.0245 1.63152 7.80996C1.7013 7.59559 1.85713 7.41965 2.0614 7.32425L4.20799 6.32121L4.49923 3.96898L4.51318 3.88617C4.55705 3.69571 4.66897 3.52669 4.82861 3.4107C5.01104 3.27818 5.23996 3.22737 5.46133 3.2702L7.78843 3.72055L9.40558 1.98802C9.55953 1.82313 9.7755 1.72935 10.0011 1.72935C10.2265 1.72941 10.4418 1.82333 10.5957 1.98802L11.26 2.6989C11.3914 2.44299 11.548 2.19814 11.7383 1.97778C12.2554 1.379 12.9821 0.997118 13.9267 0.99707ZM8.67051 5.16091C8.47928 5.36564 8.19654 5.45787 7.92149 5.4047L6.00751 5.03344L5.76932 6.96788C5.73499 7.24613 5.55996 7.48756 5.30594 7.60618L3.53991 8.42965L4.48434 10.1352C4.62012 10.3805 4.62012 10.679 4.48434 10.9242L3.53991 12.6288L5.30594 13.4532L5.39713 13.5035C5.60137 13.6329 5.73927 13.848 5.76932 14.0915L6.00751 16.0251L7.92149 15.6547L8.02477 15.6417C8.26583 15.6265 8.50318 15.7194 8.67051 15.8985L10.0002 17.3231L11.3307 15.8985L11.407 15.8269C11.5931 15.6728 11.84 15.6081 12.0807 15.6547L13.9928 16.0251L14.2329 14.0915L14.2515 13.9892C14.3114 13.7549 14.4739 13.5571 14.6962 13.4532L16.4613 12.6288L15.5178 10.9242C15.382 10.679 15.382 10.3805 15.5178 10.1352L16.4613 8.42965L14.6962 7.60618C14.4422 7.48756 14.2672 7.24613 14.2329 6.96788L13.9928 5.03344L12.0807 5.4047C11.8054 5.45803 11.522 5.36584 11.3307 5.16091L10.0002 3.73544L8.67051 5.16091ZM10.0225 12.6903C10.2687 12.3141 10.7731 12.2086 11.1493 12.4549C11.5253 12.7011 11.6308 13.2055 11.3847 13.5816L10.671 14.6712C10.4254 15.0465 9.92216 15.153 9.54608 14.9085L8.55979 14.2665C8.18286 14.0215 8.07565 13.5175 8.32066 13.1406C8.56563 12.7638 9.06964 12.6567 9.44652 12.9015L9.75265 13.1006L10.0225 12.6903ZM5.93401 8.5441C6.18485 8.17105 6.69054 8.07183 7.0636 8.32264C7.43666 8.5735 7.5359 9.07917 7.28505 9.45223L7.08034 9.75463L7.48789 10.031C7.86013 10.283 7.95766 10.7892 7.70562 11.1615C7.45357 11.5337 6.94733 11.6312 6.5751 11.3792L5.49669 10.6488C5.12526 10.3973 5.0268 9.89238 5.2771 9.52016L5.93401 8.5441Z"
        fill="currentColor"
      />
    </svg>
  );
}

function formatHarvestAmount(record, t) {
  if (record.quantity != null) {
    const unit = Number(record.quantity) === 1 ? t("fruit") : t("fruits");
    return `${record.quantity} ${unit}`;
  }
  if (record.weight_kg != null) {
    return `${record.weight_kg} kg`;
  }
  return "—";
}

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
            key={`${record.date}-${record.quantity ?? record.weight_kg ?? "harvest"}-${index}`}
            className="relative flex gap-3.5"
          >
            {index < visibleRecords.length - 1 && (
              <span className="absolute left-[16px] top-9 h-[calc(100%+1.25rem)] w-px bg-border-default" />
            )}
            <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success-solid text-white">
              <HarvestIcon size={18} />
            </span>
            <div className="min-w-0 pt-0.5">
              <p className="label-2-regular md:label-1-regular text-text-secondary">
                {formatDate(record.date, locale)}
              </p>
              <p className="label-2-medium md:label-1-medium mt-1 text-text-primary">
                {formatHarvestAmount(record, t)}
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
