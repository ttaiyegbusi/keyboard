// ─────────────────────────────────────────────────────────────
// src/app/layout.tsx
//
// Root Next.js layout. Sets:
//   - Page metadata (title, description)
//   - Google Fonts (Inter, Special Elite, Caveat)
//   - Global CSS import
//   - <html> and <body> wrappers
// ─────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import { Inter, Special_Elite, Caveat } from "next/font/google";
import "./globals.css";

// ── Font config ───────────────────────────────────────────────
// Each font is loaded via next/font for zero-layout-shift and
// automatic self-hosting. The CSS variable is then referenced
// in globals.css under "PAPER TYPOGRAPHY".

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-special-elite",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-caveat",
  display: "swap",
});

// ── Metadata ──────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "tta — Paper Typewriter",
  description: "A beautiful paper typewriter with a functional keyboard.",
};

// ── Layout component ──────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${specialElite.variable} ${caveat.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
