import { Star } from "lucide-react";
import {
  SectionTitle,
  TreeInfoCard,
} from "@/pages/tree-detail/components/TreeInfoCard";

function RatingStar({ score, level }) {
  if (score >= level) {
    return (
      <Star
        size={20}
        strokeWidth={1.6}
        className="shrink-0 fill-[#FB923C] text-[#FB923C]"
      />
    );
  }

  if (score >= level - 0.5) {
    return (
      <span className="relative inline-flex h-5 w-5 shrink-0">
        <Star size={20} strokeWidth={1.6} className="text-[#CAD3D7]" />
        <span className="pointer-events-none absolute inset-y-0 left-0 w-1/2 overflow-hidden">
          <Star
            size={20}
            strokeWidth={1.6}
            className="fill-[#FB923C] text-[#FB923C]"
          />
        </span>
      </span>
    );
  }

  return (
    <Star size={20} strokeWidth={1.6} className="shrink-0 text-[#CAD3D7]" />
  );
}

export function TasteProfile({ profile = {}, t }) {
  const tastes = [
    ["sweet", profile.sweet],
    ["bitter", profile.bitter],
    ["creamy", profile.creaminess],
    ["intense", profile.aroma],
  ];
  const hasRatings = tastes.some(([, value]) => (Number(value) || 0) > 0);

  return (
    <TreeInfoCard className="space-y-4">
      <SectionTitle>{t("tasteProfile")}</SectionTitle>
      {hasRatings ? (
        <div className="space-y-2.5">
          {tastes.map(([key, value]) => {
            const score = Math.max(0, Math.min(5, Number(value) || 0));
            return (
              <div key={key} className="flex items-center gap-2 md:gap-4">
                <span className="w-[58px] body-3-regular md:body-2-regular text-text-secondary">
                  {t(key)}
                </span>
                <div
                  className="flex gap-1.5"
                  aria-label={`${t(key)}: ${score} out of 5`}
                >
                  {[1, 2, 3, 4, 5].map((level) => (
                    <RatingStar key={level} score={score} level={level} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="body-3-regular md:body-2-regular text-text-secondary">
          {t("noTasteRatings")}
        </p>
      )}
      <div className="grid grid-cols-[58px_1fr] gap-2 body-3-regular md:grid-cols-[72px_1fr] md:body-2-regular">
        <span className="text-text-secondary">{t("color")}</span>
        <p>{profile.color || "—"}</p>
      </div>
    </TreeInfoCard>
  );
}
