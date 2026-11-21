import { MapPin, Shovel } from "lucide-react";
import { formatDate } from "@/utils/formatDate";

export const TreeInfoCard = ({ children, className = "" }) => {
  return (
    <section
      className={`rounded-xl border border-border-default bg-white p-4 ${className}`}
    >
      {children}
    </section>
  );
};

export function SectionTitle({ children }) {
  return (
    <h2 className="heading-h5-medium text-text-primary">
      {children}
    </h2>
  );
}

function LocationPanel({ tree, t, locale }) {
  const { location = {} } = tree;
  const coordinates = [location.latitude, location.longitude].every(
    (coordinate) => coordinate != null,
  )
    ? `${Number(location.latitude).toFixed(4)}° N, ${Number(location.longitude).toFixed(4)}° E`
    : null;

  return (
    <div className="space-y-3">
      <div className="flex gap-2.5 rounded-xl bg-surface-subtle p-3.5">
        <MapPin size={17} className="mt-0.5 shrink-0 text-brand" />
        <div className="min-w-0 body-3-regular md:body-2-regular">
          <p className="body-3-medium md:body-2-medium text-text-primary">
            {tree.farm_name || t("farm")}
          </p>
          <span className="body-3-regular md:body-2-regular text-text-secondary">
            {[location.mukim, location.district].filter(Boolean).join(", ")}<br />
          </span>
          <span className="body-3-regular md:body-2-regular text-text-secondary">
            {[location.state, location.country].filter(Boolean).join(", ")}<br />
          </span>
          {coordinates && (
            <span className="body-4-regular md:body-3-regular text-text-secondary">{coordinates}</span>
          )}
        </div>
      </div>
      <div className="flex gap-2.5 rounded-xl bg-surface-subtle p-3.5">
        <Shovel size={17} className="mt-0.5 shrink-0 text-brand" />
        <div>
          <p className="body-3-medium md:body-2-medium text-text-primary">
            {formatDate(tree.date_planted, locale, {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className="body-4-regular md:body-3-regular text-text-secondary">{t("datePlanted")}</p>
        </div>
      </div>
    </div>
  );
}

export function TreeOverviewCard({ tree, t, locale }) {
  return (
    <TreeInfoCard className="space-y-4">
      <SectionTitle>{t("description")}</SectionTitle>
      <p className="body-3-regular md:body-2-regular text-text-secondary">
        {tree.variety?.description || t("noDescription")}
      </p>
      <LocationPanel tree={tree} t={t} locale={locale} />
    </TreeInfoCard>
  );
}

export default TreeInfoCard;
