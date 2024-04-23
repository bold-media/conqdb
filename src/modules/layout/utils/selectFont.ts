import { Inter, Noto_Sans_Arabic } from "next/font/google";

const latin = Inter({
  weight: ["400", "500", "600"],
  display: "swap",
  subsets: ["latin"],
});
const latinExt = Inter({
  weight: ["400", "500", "600"],
  display: "swap",
  subsets: ["latin-ext"],
});
const cyrillic = Inter({
  weight: ["400", "500", "600"],
  display: "swap",
  subsets: ["cyrillic"],
});
const arabic = Inter({
  weight: ["400", "500", "600"],
  display: "swap",
  subsets: ["latin-ext"],
});

export const selectFont = (locale: string) => {
  return (
    {
      ar: arabic,
      cz: latinExt,
      de: latinExt,
      pl: latinExt,
      ru: cyrillic,
      tr: latinExt,
    }[locale] || latin
  );
};
