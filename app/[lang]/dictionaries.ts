import "server-only";

const dictionaries = {
  ch: () => import("./dictionaries/ch.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
};

type Locale = "ch" | "en";

export const getDictionary = async (locale: Locale): Promise<any> => {
  if (!dictionaries[locale]) {
    throw new Error(`No dictionary found for locale: ${locale}`);
  }
  return dictionaries[locale]();
};
