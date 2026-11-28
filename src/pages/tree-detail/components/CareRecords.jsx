import { useState } from "react";
import {
  BugOff,
  Droplets,
  FlaskConical,
  Leaf,
  Scissors,
  ShieldAlert,
  ShieldCheck,
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

function FertilizerIcon({ size = 18 }) {
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
        d="M8.18976 2.81445C8.8506 2.81451 9.48517 3.07763 9.95245 3.54492C10.4195 4.01218 10.6819 4.64596 10.6819 5.30664V6.11719C10.7415 6.16596 10.7986 6.21796 10.8538 6.27246C11.1274 5.9089 11.4818 5.61178 11.8909 5.40723C12.3805 5.16248 12.9288 5.0593 13.4739 5.1084C14.0192 5.15756 14.5408 5.35714 14.9788 5.68555C15.1464 5.8113 15.2452 6.00927 15.2454 6.21875C15.2454 6.76616 15.0927 7.30384 14.805 7.76953C14.5172 8.23512 14.1051 8.61162 13.6155 8.85645C13.1258 9.10131 12.5769 9.20445 12.0316 9.15527C11.831 9.13715 11.6338 9.09876 11.4427 9.04102C11.4054 9.16948 11.3685 9.28796 11.3323 9.39648C11.2184 9.73833 11.1381 9.98895 11.138 10.3262C11.138 10.6756 11.2516 11.0163 11.4612 11.2959C11.4811 11.3224 11.4957 11.3516 11.511 11.3799C11.842 11.7494 12.1143 12.0562 12.4095 12.292C12.6897 12.5158 12.9459 12.6364 13.2249 12.6611C13.244 12.6436 13.2691 12.6228 13.3001 12.5928C13.3468 12.5475 13.4107 12.4846 13.4808 12.4219C13.7907 12.1446 14.2538 11.8366 14.9964 11.833C15.6933 11.8302 16.2453 12.0492 16.6712 12.4268C17.0758 12.7855 17.3259 13.2515 17.5081 13.666C17.6004 13.8759 17.6825 14.0908 17.7571 14.2852C17.8339 14.4851 17.9024 14.6638 17.9759 14.8291C18.1277 15.1705 18.2618 15.3626 18.3978 15.4648C18.6501 15.6534 18.8367 15.9172 18.931 16.2178C19.0252 16.5183 19.0225 16.8408 18.9232 17.1396C18.8237 17.4386 18.6328 17.6995 18.3773 17.8838C18.1218 18.0679 17.8143 18.1671 17.4993 18.167H2.49933C2.17823 18.1671 1.86499 18.0639 1.60675 17.873C1.34827 17.6819 1.1577 17.412 1.06378 17.1045C0.970043 16.7972 0.977837 16.4678 1.08527 16.165C1.1929 15.862 1.39557 15.6013 1.66242 15.4219C2.1731 15.0773 2.52941 14.5948 2.84113 14.0049C2.99773 13.7085 3.13783 13.3945 3.28253 13.0625C3.42422 12.7374 3.57313 12.387 3.73566 12.0518C4.06124 11.3803 4.47993 10.6841 5.15363 10.1641C5.84237 9.63259 6.73345 9.33307 7.91632 9.33301C8.68382 9.33301 9.31071 9.55171 9.83722 9.86719C9.88717 9.5109 9.98612 9.21933 10.0677 8.97461C10.1816 8.63286 10.261 8.38214 10.261 8.04492C10.261 7.73775 10.1393 7.44284 9.92218 7.22559C9.70498 7.00838 9.41001 6.88584 9.10285 6.88574C8.44196 6.88574 7.80748 6.62354 7.34015 6.15625C6.87304 5.68903 6.61077 5.0552 6.61066 4.39453V3.70996C6.61067 3.50225 6.68324 3.30182 6.81378 3.14258L6.87238 3.07715L6.93878 3.01758C7.09788 2.88734 7.29779 2.81453 7.50519 2.81445H8.18976ZM7.91632 10.667C6.9722 10.667 6.38276 10.8997 5.96808 11.2197C5.53847 11.5514 5.22932 12.0266 4.93488 12.6338C4.78748 12.9378 4.65294 13.2544 4.50421 13.5957C4.35848 13.9301 4.20167 14.2838 4.01984 14.6279C3.65458 15.3191 3.17003 16.0124 2.40656 16.5273L2.40558 16.5283C2.37606 16.5482 2.35403 16.5778 2.3421 16.6113C2.33026 16.6449 2.3288 16.6818 2.33917 16.7158C2.34963 16.7498 2.37119 16.7796 2.39972 16.8008C2.42836 16.8219 2.46374 16.833 2.49933 16.833H17.5003C17.535 16.8329 17.5688 16.8219 17.597 16.8018C17.6253 16.7814 17.6474 16.7528 17.6585 16.7197C17.6695 16.6867 17.6698 16.6505 17.6595 16.6172C17.649 16.5839 17.6279 16.5541 17.5999 16.5332C17.1809 16.2194 16.933 15.7643 16.7581 15.3711C16.6682 15.1688 16.5867 14.9571 16.512 14.7627C16.4352 14.5628 16.3647 14.3779 16.2874 14.2021C16.1304 13.845 15.9741 13.5912 15.7864 13.4248C15.6201 13.2774 15.3911 13.1654 15.0023 13.167C14.6865 13.1687 14.5237 13.2771 14.3694 13.415C14.3237 13.456 14.2812 13.498 14.2278 13.5498C14.1796 13.5966 14.1161 13.6591 14.0482 13.7158C13.9175 13.825 13.6747 13.9999 13.3333 14C12.6142 13.9999 12.0437 13.7054 11.5775 13.333C11.1319 12.977 10.7291 12.5048 10.3763 12.1133C9.62534 11.28 8.96881 10.667 7.91632 10.667ZM13.3548 6.43555C13.0563 6.40865 12.7557 6.46571 12.4876 6.59961C12.2195 6.73368 11.9929 6.94033 11.8353 7.19531C11.7406 7.34849 11.6733 7.51637 11.6341 7.69043C11.7972 7.7639 11.9718 7.81091 12.1517 7.82715C12.4504 7.85408 12.7506 7.79722 13.0189 7.66309C13.2869 7.52901 13.5126 7.32326 13.6702 7.06836C13.7652 6.91461 13.8333 6.74605 13.8724 6.57129C13.7094 6.49799 13.5344 6.45177 13.3548 6.43555ZM7.94367 4.39453C7.94378 4.70168 8.06632 4.99667 8.28351 5.21387C8.50077 5.43093 8.79572 5.55273 9.10285 5.55273C9.18533 5.55275 9.26757 5.55735 9.34894 5.56543V5.30664C9.34889 4.99945 9.22629 4.70454 9.0091 4.4873C8.79188 4.2702 8.49688 4.1485 8.18976 4.14844H7.94367V4.39453Z"
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
      />
      <path
        d="M14.261 9.31445C14.6292 9.31445 14.928 9.61326 14.928 9.98145V10C14.928 10.3682 14.6292 10.667 14.261 10.667C13.8929 10.6669 13.5941 10.3681 13.5941 10V9.98145C13.5941 9.6133 13.8929 9.31453 14.261 9.31445Z"
        fill="currentColor"
      />
      <path
        d="M6.05206 7.81543C6.42018 7.81543 6.71894 8.11433 6.71906 8.48242V8.50098C6.71906 8.86917 6.42025 9.16797 6.05206 9.16797C5.68393 9.1679 5.38507 8.86913 5.38507 8.50098V8.48242C5.38519 8.11437 5.684 7.8155 6.05206 7.81543Z"
        fill="currentColor"
      />
      <path
        d="M12.595 1.73926C12.963 1.73951 13.262 2.03822 13.262 2.40625V2.4248C13.2618 2.79267 12.9629 3.09154 12.595 3.0918C12.227 3.0918 11.9282 2.79283 11.928 2.4248V2.40625C11.928 2.03806 12.2268 1.73926 12.595 1.73926Z"
        fill="currentColor"
      />
    </svg>
  );
}

const ACTIVITY_TYPES = {
  fertilizer: {
    icon: FertilizerIcon,
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
  foliarFertilizer: {
    icon: Leaf,
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

function formatWaterLiters(value, t) {
  const raw = cleanText(value);
  if (!raw) return "";
  const numeric = Number(raw);
  if (Number.isFinite(numeric)) {
    if (numeric <= 0) return "";
    return `${String(numeric)} L ${t("water")}`;
  }
  return `${raw} ${t("water")}`;
}

function normalizeActivityType(action = "") {
  const normalized = cleanText(action)
    .toLowerCase()
    .replace(/[ _-]+/g, "");
  if (!normalized) return null;
  if (normalized.includes("foliar")) return "foliarFertilizer";
  if (normalized.includes("fertil")) return "fertilizer";
  if (normalized.includes("pesticide") || normalized.includes("pestcontrol"))
    return "pesticide";
  if (normalized.includes("fungicid")) return "fungicide";
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
          const product = cleanText(record.product);
          const amount = cleanText(record.amount);
          const water = formatWaterLiters(record.water_liters, t);
          const dosage = [amount, water].filter(Boolean).join(" / ");
          const productSummary = [product, dosage].filter(Boolean).join(" · ");
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
