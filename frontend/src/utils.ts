export function localizedPath(path: string, lang?: string) {
  return lang && lang.toLocaleLowerCase() !== "en-us"
    ? `/${lang}${path}`
    : path;
}
