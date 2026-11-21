import { useEffect } from "react";
import { CircleCheck } from "lucide-react";

export function LanguagePicker({ open, language, onSelect, onClose, t }) {
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const languages = [
    { code: "en", label: "English" },
    { code: "ms", label: "Malay" },
    { code: "zh", label: "Chinese" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center md:items-start md:justify-end md:px-4 md:pt-16"
      role="presentation"
    >
      <button
        type="button"
        aria-label={t("closeLanguagePicker")}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/55 md:bg-transparent"
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-label={t("language")}
        className="relative w-full rounded-t-[28px] border border-border-default bg-white px-5 pb-5 pt-3 shadow-[0_-8px_32px_rgba(0,0,0,0.12)] md:w-56 md:rounded-xl md:px-3 md:pb-2 md:pt-3 md:shadow-[0_8px_28px_rgba(28,32,36,0.16)]"
      >
        <div className="mx-auto mb-5 h-1.5 w-24 rounded-full bg-[#CAD3D7] md:hidden" />
        <h2 className="sr-only">{t("language")}</h2>
        <ul>
          {languages.map(({ code, label }) => (
            <li key={code}>
              <button
                type="button"
                onClick={() => onSelect(code)}
                className="label-2-medium md:label-1-medium flex min-h-[44px] w-full items-center justify-between px-1 text-left text-text-primary hover:text-brand focus-visible:outline-2 focus-visible:outline-brand md:min-h-11 md:px-2"
              >
                {label}
                {language === code && (
                  <CircleCheck
                    size={22}
                    className="text-brand"
                    aria-label={t("selected")}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
