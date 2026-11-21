import { Droplets } from "lucide-react";
import {
  SectionTitle,
  TreeInfoCard,
} from "@/pages/tree-detail/components/TreeInfoCard";

export function TasteProfile({ profile = {}, t }) {
  const tastes = [
    ["sweet", profile.sweet],
    ["bitter", profile.bitter],
    ["creamy", profile.creaminess],
    ["intense", profile.aroma],
  ];

  return (
    <TreeInfoCard className="space-y-4">
      <SectionTitle>{t("tasteProfile")}</SectionTitle>
      <div className="space-y-2.5">
        {tastes.map(([key, value]) => (
          <div key={key} className="flex items-center gap-2 md:gap-4">
            <span className="w-[58px] body-3-regular md:body-2-regular text-text-secondary">
              {t(key)}
            </span>
            <div
              className="flex gap-1.5"
              aria-label={`${t(key)}: ${value ?? 0} out of 5`}
            >
              {[1, 2, 3, 4, 5].map((level) => (
                <Droplets
                  key={level}
                  size={20}
                  strokeWidth={1.6}
                  className={
                    level <= (Number(value) || 0)
                      ? "fill-[#FB923C] text-[#FB923C]"
                      : "text-[#CAD3D7]"
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[58px_1fr] gap-2 body-3-regular md:grid-cols-[72px_1fr] md:body-2-regular">
        {/* <span className="text-text-secondary">{t("texture")}</span>
        <p>{t("denseTexture")}</p> */}
        <span className="text-text-secondary">{t("color")}</span>
        <p>{profile.color || "—"}</p>
      </div>
    </TreeInfoCard>
  );
}
