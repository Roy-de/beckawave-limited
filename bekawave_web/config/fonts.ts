import {
  Baloo_2,
  Fira_Code as FontMono,
  Inter as FontSans,
  Outfit as FontOutfit,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
export const fontOutfit = FontOutfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});
export const fontBaloo = Baloo_2({
  subsets: ["latin"],
  variable: "--baloo",
});
