import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "motion/react";
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
import detailBanner from "@/assets/tree-detail/durian-detail-banner.webp";

const TABS = [
  ["Overview", "overview"],
  ["Harvest", "harvest"],
  ["Care Records", "careRecords"],
];

const tabPanelVariants = {
  inactive: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -24 : 24,
  }),
  active: (direction) => ({
    opacity: [0, 1],
    x: [direction === 0 ? 0 : direction > 0 ? 28 : -28, 0],
  }),
};

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
  const rawStatus = typeof tree.status === "string" ? tree.status.trim() : "";
  const normalizedStatus = rawStatus.toLowerCase().replace(/[ _-]+/g, "");
  const isHealthy = !normalizedStatus || normalizedStatus === "healthy";
  const isAttention = normalizedStatus.includes("attention");
  const status = isHealthy
    ? t("healthy")
    : isAttention
      ? t("needsAttention")
      : rawStatus;
  const statusBadgeClass = isHealthy
    ? "border-success-border bg-success-bg text-success-text"
    : "border-yellow-400 bg-yellow-100 text-yellow-900";

  return (
    <header className="relative isolate h-71 overflow-hidden bg-brand sm:h-85 lg:h-100">
      <img
        src={detailBanner}
        alt="Durian growing on a tree"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-foreground/0 to-foreground" />
      <button
        type="button"
        aria-label={`${t("language")}: ${language === "ms" ? "Malay" : language === "zh" ? "Chinese" : "English"}`}
        onClick={onOpenLanguage}
        className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-background border-border-default pl-3 pr-2 md:pl-4 md:pr-3 py-1.5 text-xs font-semibold text-text-primary shadow-sm md:text-sm"
      >
        {language.toUpperCase()} <ChevronDown size={16} />
      </button>
      <div className="absolute inset-x-4 bottom-8 text-white sm:inset-x-8">
        <span
          className={`label-2-medium md:label-1-medium mb-2 inline-flex items-center gap-1 rounded-full border px-2.5 py-1 ${statusBadgeClass}`}
        >
          {status}
        </span>
        <h1 className="heading-h5-medium sm:heading-h4-medium md:heading-h2-medium md:pb-2.5">
          {tree.variety?.name || "Durian tree"}
          {tree.variety?.code ? ` (${tree.variety.code})` : ""}
        </h1>
        <p className="body-2-regular md:body-1-regular text-text-tertiary md:pb-2.5">
          {tree.tree_label}
        </p>
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
          className="flex md:min-h-27.5 min-h-22 flex-col items-center justify-center border-r border-border-default px-2 text-center last:border-r-0"
        >
          <Icon
            size={20}
            strokeWidth={1.9}
            className="mb-2 text-brand md:h-6.5 md:w-6.5"
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
  const [tabState, setTabState] = useState({
    activeTab: "Overview",
    direction: 0,
  });
  const [languageOpen, setLanguageOpen] = useState(false);
  const closeLanguagePicker = () => setLanguageOpen(false);
  const selectLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    closeLanguagePicker();
  };

  useEffect(() => {
    const img = new Image();
    img.src = detailBanner;
  }, []);

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

  const tree = currentTreeState.tree;
  const activeIndex = TABS.findIndex(([tab]) => tab === tabState.activeTab);

  const handleSelectTab = (nextTab) => {
    if (nextTab === tabState.activeTab) return;
    const nextIndex = TABS.findIndex(([tab]) => tab === nextTab);
    setTabState({
      activeTab: nextTab,
      direction: nextIndex > activeIndex ? 1 : -1,
    });
  };

  return (
    <main className="min-h-dvh bg-linear-to-b from-[#f4f6f7] to-[#eafff6] pb-8">
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
            className="relative flex rounded-xl border border-border-default bg-white p-1 sm:p-2"
          >
            {TABS.map(([tab, translationKey]) => {
              const isActive = tabState.activeTab === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => handleSelectTab(tab)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative min-h-10 flex-1 rounded-lg px-1 transition-colors duration-200 sm:px-2 md:min-h-12 ${
                    isActive
                      ? "label-2-medium md:label-1-medium text-white"
                      : "label-2-regular md:label-1-regular text-text-secondary hover:bg-surface-subtle"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId={`treeDetailActiveTab-${tree.id || id}`}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 28,
                      }}
                      className="absolute inset-0 rounded-lg bg-brand will-change-transform"
                    />
                  )}
                  <span className="relative z-10">{t(translationKey)}</span>
                </button>
              );
            })}
          </nav>

          <div className="overflow-hidden">
            <motion.div
              custom={tabState.direction}
              variants={tabPanelVariants}
              initial={false}
              animate={
                tabState.activeTab === "Overview" ? "active" : "inactive"
              }
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className={tabState.activeTab === "Overview" ? "block" : "hidden"}
            >
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
            </motion.div>

            <motion.div
              custom={tabState.direction}
              variants={tabPanelVariants}
              initial={false}
              animate={tabState.activeTab === "Harvest" ? "active" : "inactive"}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className={tabState.activeTab === "Harvest" ? "block" : "hidden"}
            >
              <HarvestRecords
                records={tree.harvest_log || []}
                t={t}
                locale={locale}
              />
            </motion.div>

            <motion.div
              custom={tabState.direction}
              variants={tabPanelVariants}
              initial={false}
              animate={
                tabState.activeTab === "Care Records" ? "active" : "inactive"
              }
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className={
                tabState.activeTab === "Care Records" ? "block" : "hidden"
              }
            >
              <CareRecords
                records={tree.activities_log || []}
                t={t}
                locale={locale}
              />
            </motion.div>
          </div>
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
