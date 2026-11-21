export function formatDate(
  value,
  locale,
  options = { day: "numeric", month: "short", year: "numeric" },
) {
  if (!value) return "—";

  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat(locale, options).format(date);
}
