import { formatDate } from "@/utils/formatDate";
import badgeCheck from "@/assets/tree-detail/badge-check.svg";

export function CertificationCard({ certification, t, locale }) {
  if (!certification?.is_mygap_certified) return null;

  return (
    <section className="rounded-xl bg-brand px-4 pt-6 pb-5 text-center text-white">
      <img
        src={badgeCheck}
        alt=""
        className="mx-auto mb-2 h-12 w-12 object-contain"
      />
      <h2 className="heading-h5-medium">myGAP Certified</h2>
      <p className="mt-2 body-4-regular md:body-3-regular text-white/70">
        {t("certificateNo")}
      </p>
      <p className="body-3-regular md:body-2-regular mt-1">
        {certification.cert_no || "—"}
      </p>
      <p className="mt-2 body-4-regular md:body-3-regular text-white/70">
        {t("dateCertified")}
      </p>
      <p className="body-3-regular md:body-2-regular mt-1">
        {formatDate(certification.date_certified, locale)}
      </p>
      <p className="body-4-regular md:body-3-regular mt-4 border-t border-dashed border-white/30 pt-3 text-white/85">
        {t("mygapDescription")}
      </p>
    </section>
  );
}
