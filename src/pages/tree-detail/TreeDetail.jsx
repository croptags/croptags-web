import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ChevronDown,
  CircleHelp,
  FileBadge,
  LoaderCircle,
  Mountain,
  TreePine,
} from "lucide-react";
import { TreeOverviewCard } from "@/pages/tree-detail/components/TreeInfoCard";
import { TasteProfile } from "@/pages/tree-detail/components/TasteProfile";
import { CertificationCard } from "@/pages/tree-detail/components/CertificationCard";
import { CareRecords } from "@/pages/tree-detail/components/CareRecords";
import { HarvestRecords } from "@/pages/tree-detail/components/HarvestRecords";
import { LanguagePicker } from "@/pages/tree-detail/components/LanguagePicker";
import { useI18n } from "@/i18n/useI18n";
import detailBanner from "@/assets/tree-detail/durian-detail-banner.png";

async function fetchTreeData(treeId, signal) {
  const response = await fetch(
    `https://croptags-prod.up.railway.app/api/v1/trees/${encodeURIComponent(treeId)}`,
    { signal },
  );
  if (!response.ok) throw new Error("We couldn't find this tree.");
  return response.json();
}

function getTreeAge(value) {
  if (!value) return null;
  const planted = new Date(value);
  if (Number.isNaN(planted.getTime())) return null;
  const now = new Date();
  let years = now.getFullYear() - planted.getFullYear();
  if (
    now < new Date(now.getFullYear(), planted.getMonth(), planted.getDate())
  ) {
    years -= 1;
  }
  return Math.max(years, 0);
}

function Hero({ tree, t, language, onOpenLanguage }) {
  const status =
    typeof tree.health === "string" && tree.health.toLowerCase() !== "healthy"
      ? tree.health
      : t("healthy");

  return (
    <header className="relative isolate h-[284px] overflow-hidden bg-brand sm:h-[340px] lg:h-[400px]">
      <img
        src={detailBanner}
        alt="Durian growing on a tree"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-foreground/0 to-foreground" />
      <button
        type="button"
        aria-label={`${t("language")}: ${language === "ms" ? "Malay" : language === "zh" ? "Chinese" : "English"}`}
        onClick={onOpenLanguage}
        className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-background border-border-default pl-3 pr-2 md:pl-4 md:pr-3 py-1.5 text-xs font-semibold text-text-primary shadow-sm md:text-sm"
      >
        {language.toUpperCase()} <ChevronDown size={16} />
      </button>
      <div className="absolute inset-x-4 bottom-8 text-white sm:inset-x-8">
        <div className="flex gap-2">
          <span className="label-2-medium md:label-1-medium mb-2 inline-flex items-center gap-1 rounded-full border border-info-border bg-info-bg px-2.5 py-1 text-info-text">
            {tree.tree_label}
          </span>
          <span className="label-2-medium md:label-1-medium mb-2 inline-flex items-center gap-1 rounded-full border border-success-border bg-success-bg px-2.5 py-1 text-success-text">
            {status}
          </span>
        </div>
        <h1 className="heading-h5-medium sm:heading-h4-medium md:heading-h2-medium md:pb-2.5">
          {tree.variety?.name || "Durian tree"}
          {tree.variety?.code ? ` (${tree.variety.code})` : ""}
        </h1>
      </div>
    </header>
  );
}

function TreeStats({ tree, t }) {
  const age = getTreeAge(tree.date_planted);
  const hasMyGap = Boolean(tree.certification?.is_mygap_certified);
  const stats = [
    {
      icon: TreePine,
      value: age === null ? "—" : `${age} ${t("years")}`,
      label: t("age"),
    },
    {
      icon: Mountain,
      value:
        tree.location?.altitude_m == null
          ? "—"
          : `${tree.location.altitude_m}m`,
      label: t("altitude"),
    },
    ...(hasMyGap
      ? [{ icon: FileBadge, value: "MYGAP", label: t("certified") }]
      : []),
  ];

  return (
    <div
      className={`relative z-10 -mt-5 mx-4 grid ${hasMyGap ? "grid-cols-3" : "grid-cols-2"} overflow-hidden rounded-xl border border-border-default bg-white shadow-[0_4px_12px_0_#00804D1A] sm:mx-6 lg:mx-8`}
    >
      {stats.map(({ icon: Icon, value, label }) => (
        <div
          key={label}
          className="flex md:min-h-[110px] min-h-[88px] flex-col items-center justify-center border-r border-border-default px-2 text-center last:border-r-0"
        >
          <Icon
            size={20}
            strokeWidth={1.9}
            className="mb-2 text-brand md:h-[26px] md:w-[26px]"
          />
          <span className="label-2-medium md:label-1-medium text-text-primary">
            {value}
          </span>
          <span className="body-4-regular md:body-3-regular text-text-secondary">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export const TreeDetail = () => {
  const { id } = useParams();
  const { t, locale, language, setLanguage } = useI18n();
  const [treeState, setTreeState] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const [languageOpen, setLanguageOpen] = useState(false);
  const closeLanguagePicker = () => setLanguageOpen(false);
  const selectLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    closeLanguagePicker();
  };

  useEffect(() => {
    if (!id) return undefined;

    const controller = new AbortController();
    fetchTreeData(id, controller.signal)
      .then((tree) => setTreeState({ id, status: "success", tree }))
      .catch((error) => {
        if (error.name !== "AbortError") {
          setTreeState({
            id,
            status: "error",
            message: error.message || "Unable to load tree details.",
          });
        }
      });

    return () => controller.abort();
  }, [id]);

  const currentTreeState = treeState?.id === id ? treeState : null;
  if (!currentTreeState) {
    return (
      <main
        role="status"
        aria-label="Loading tree details"
        className="grid min-h-dvh place-items-center bg-surface-subtle px-6"
      >
        <LoaderCircle className="h-9 w-9 animate-spin text-brand" />
      </main>
    );
  }

  if (currentTreeState.status === "error") {
    return (
      <main
        role="alert"
        className="grid min-h-dvh place-items-center bg-surface-subtle px-6 text-center text-sm text-text-primary"
      >
        <div>
          <CircleHelp className="mx-auto mb-3 text-brand" />
          <p>{currentTreeState.message}</p>
        </div>
      </main>
    );
  }

  // const tree = currentTreeState.tree;

  const tree = {
    id: "CT-2022-008",
    tree_label: "Block B, Row 7, Plot 8",
    farm_name: "Dusun Eco Farm",
    location: {
      mukim: "Mukim Gali",
      district: "Raub",
      state: "Pahang",
      country: "Malaysia",
      latitude: 1.4854,
      longitude: 103.7618,
      altitude_m: 312,
    },
    variety: {
      name: "Musang King",
      code: "D85",
      description:
        "Musang King (Mao Shan Wang) is famous for its luxurious, custard-like texture and complex flavor. It delivers an intense, candy-sweet punch up front, immediately balanced by a deep, lingering, chocolaty bitterness. This rich, buttery profile is accented by subtle hints of almond and spice.",
      taste_profile: {
        sweet: 3,
        bitter: 3,
        creaminess: 3,
        aroma: 3,
        color: "Deep, vibrant turmeric-gold.",
      },
    },
    date_planted: "2010-07-21",
    certification: {
      is_mygap_certified: true,
      cert_no: "myGAP.19.1088/B-5795",
      date_certified: "2012-09-23",
    },
    health: "Healthy",
    activities_log: [
      {
        date: "2022-07-31",
        action_type: "Pesticide",
        product: "ABC Pest",
        by_who: "Ahmad Shukri",
      },
      {
        date: "2022-07-30",
        action_type: "Fungicide",
        product: "Leaf treatment",
        by_who: "Ahmad Shukri",
      },
      {
        date: "2022-07-29",
        action_type: "Pruning",
        product: "",
        by_who: "Ahmad Shukri",
      },
      {
        date: "2022-07-28",
        action_type: "Fertilizer",
        product: "NPK 15-15-15: Cow dung fertilizers",
        by_who: "Ahmad Shukri",
      },
      {
        date: "2022-07-27",
        action_type: "Watering",
        product: "",
        by_who: "Ahmad Shukri",
      },
      {
        date: "2022-07-26",
        action_type: "Attention",
        product: "Inspect leaves for signs of stress",
        by_who: "Ahmad Shukri",
      },
    ],
    harvest_log: [
      { date: "2024-07-31", weight_kg: 160, by_who: "Ahmad Shukri" },
      { date: "2023-07-21", weight_kg: 80, by_who: "Ahmad Shukri" },
      { date: "2022-07-31", weight_kg: 112, by_who: "Ahmad Shukri" },
      { date: "2021-08-02", weight_kg: 96, by_who: "Ahmad Shukri" },
      { date: "2020-07-28", weight_kg: 74, by_who: "Ahmad Shukri" },
      { date: "2019-07-30", weight_kg: 68, by_who: "Ahmad Shukri" },
    ],
  };

  return (
    <main className="min-h-dvh bg-gradient-to-b from-[#f4f6f7] to-[#eafff6] pb-8">
      <Hero
        tree={tree}
        t={t}
        language={language}
        onOpenLanguage={() => setLanguageOpen(true)}
      />
      <div className="mx-auto w-full max-w-5xl">
        <TreeStats tree={tree} t={t} />
        <div className="space-y-4 px-4 pt-6 sm:px-6 lg:px-8">
          <nav
            aria-label={t("treeDetails")}
            className="flex rounded-xl border border-border-default bg-white p-1 sm:p-2"
          >
            {[
              ["Overview", t("overview")],
              ["Harvest", t("harvest")],
              ["Care Records", t("careRecords")],
            ].map(([tab, label]) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                aria-current={activeTab === tab ? "page" : undefined}
                className={`min-h-10 flex-1 rounded-lg px-1 transition-colors sm:px-2 md:min-h-12 ${activeTab === tab ? "label-2-medium md:label-1-medium bg-brand text-white" : "label-2-regular md:label-1-regular text-text-secondary hover:bg-surface-subtle"}`}
              >
                {label}
              </button>
            ))}
          </nav>
          {activeTab === "Overview" ? (
            <div className="grid gap-4 lg:grid-cols-2">
              <TreeOverviewCard tree={tree} t={t} locale={locale} />
              <div className="space-y-4">
                <TasteProfile profile={tree.variety?.taste_profile} t={t} />
                <CertificationCard
                  certification={tree.certification}
                  t={t}
                  locale={locale}
                />
              </div>
            </div>
          ) : activeTab === "Harvest" ? (
            <HarvestRecords
              records={tree.harvest_log || []}
              t={t}
              locale={locale}
            />
          ) : (
            <CareRecords
              records={tree.activities_log || []}
              t={t}
              locale={locale}
            />
          )}
        </div>
      </div>
      <LanguagePicker
        open={languageOpen}
        language={language}
        onSelect={selectLanguage}
        onClose={closeLanguagePicker}
        t={t}
      />
    </main>
  );
};
