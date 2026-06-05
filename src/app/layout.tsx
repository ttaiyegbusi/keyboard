// ─────────────────────────────────────────────────────────────
// src/app/layout.tsx
// Root layout — loads all 7 Google Fonts via next/font.
// ─────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import {
  Inter, Special_Elite, Caveat,
  Playfair_Display, JetBrains_Mono, Lora, Dancing_Script,
} from "next/font/google";
import "./globals.css";

const inter         = Inter({ subsets: ["latin"], variable: "--font-inter",         display: "swap" });
const specialElite  = Special_Elite({ subsets: ["latin"], weight: "400", variable: "--font-special-elite", display: "swap" });
const caveat        = Caveat({ subsets: ["latin"], weight: ["400","500"], variable: "--font-caveat", display: "swap" });
const playfair      = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const jetbrains     = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });
const lora          = Lora({ subsets: ["latin"], variable: "--font-lora", display: "swap" });
const dancing       = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing", display: "swap" });

export const metadata: Metadata = {
  title: "tta — Paper Typewriter",
  description: "A beautiful paper typewriter with a functional keyboard.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={[
      inter.variable, specialElite.variable, caveat.variable,
      playfair.variable, jetbrains.variable, lora.variable, dancing.variable,
    ].join(" ")}>
      <body>{children}</body>
    </html>
  );
}
