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
