import { format } from "date-fns";
import { enUS, ptBR } from "date-fns/locale";

export function localizedPath(path: string, lang?: string) {
  return lang && lang.toLocaleLowerCase() !== "en-us"
    ? `/${lang}${path}`
    : path;
}

export function getFirstName(fullName: string) {
  return fullName.split(" ")[0];
}

export function getGreeting() {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 5 && hour < 12) {
    return "greeting.goodMorning";
  } else if (hour >= 12 && hour < 18) {
    return "greeting.goodAfternoon";
  } else {
    return "greeting.goodEvening";
  }
}

export function pluralize(
  count: number,
  singular: string,
  plural: string
): string {
  return count === 1 ? singular : plural;
}

export function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function removeAccentsAndDiacritics(text: string) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function formatToMonthDay(
  date: string | Date,
  locale: "en" | "pt" = "en"
) {
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  const locales = {
    en: enUS,
    pt: ptBR,
  };

  return format(parsedDate, "MMMM d", { locale: locales[locale] });
}
