// ─────────────────────────────────────────────────────────────
// src/data/fonts.ts
//
// Available writing fonts for the paper textarea.
// These are loaded via next/font in layout.tsx.
// To add a new font:
//   1. Import it in layout.tsx and expose its CSS variable
//   2. Add an entry here referencing that variable
// ─────────────────────────────────────────────────────────────

import { FontOption } from "@/types";

export const FONTS: FontOption[] = [
  {
    id: "special-elite",
    label: "Special Elite",
    family: "var(--font-special-elite, 'Courier New', monospace)",
    description: "Vintage typewriter",
    style: "typewriter",
  },
  {
    id: "inter",
    label: "Inter",
    family: "var(--font-inter, sans-serif)",
    description: "Clean & modern",
    style: "sans",
  },
  {
    id: "caveat",
    label: "Caveat",
    family: "var(--font-caveat, cursive)",
    description: "Casual handwriting",
    style: "script",
  },
  {
    id: "playfair",
    label: "Playfair Display",
    family: "var(--font-playfair, Georgia, serif)",
    description: "Elegant editorial",
    style: "serif",
  },
  {
    id: "jetbrains",
    label: "JetBrains Mono",
    family: "var(--font-jetbrains, monospace)",
    description: "Developer mono",
    style: "mono",
  },
  {
    id: "lora",
    label: "Lora",
    family: "var(--font-lora, Georgia, serif)",
    description: "Literary serif",
    style: "serif",
  },
  {
    id: "dancing",
    label: "Dancing Script",
    family: "var(--font-dancing, cursive)",
    description: "Flowing calligraphy",
    style: "script",
  },
];
