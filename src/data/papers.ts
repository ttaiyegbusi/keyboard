// ─────────────────────────────────────────────────────────────
// src/data/papers.ts
//
// All paper options in one place.
// To add a new paper:
//   1. Add its id to the PaperType union in src/types/index.ts
//   2. Add a new entry here
//   3. Add its CSS class to src/app/globals.css  (search "PAPER BACKGROUNDS")
//   4. Add its textarea typography rule in globals.css (search "PAPER TYPOGRAPHY")
// ─────────────────────────────────────────────────────────────

import { PaperOption } from "@/types";

export const PAPERS: PaperOption[] = [
  {
    id: "cream",
    label: "Cream",
    swatchColor: "#f5edd6",
    thumbClass: "pt-cream",
  },
  {
    id: "a4white",
    label: "A4 White",
    swatchColor: "#efefef",
    thumbClass: "pt-white",
  },
  {
    id: "kraft",
    label: "Brown Kraft",
    swatchColor: "#9e5e28",
    thumbClass: "pt-kraft",
  },
  {
    id: "antique",
    label: "Antique",
    swatchColor: "#c9a55a",
    thumbClass: "pt-antique",
  },
  {
    id: "carton",
    label: "Carton",
    swatchColor: "#ae7638",
    thumbClass: "pt-carton",
  },
  {
    id: "oilpaper",
    label: "Oil Paper",
    swatchColor: "#e6ddb8",
    thumbClass: "pt-oilpaper",
  },
  {
    id: "notebook",
    label: "Note Book",
    swatchColor: "#f7f8ff",
    thumbClass: "pt-notebook",
  },
  {
    id: "dots",
    label: "Dots",
    swatchColor: "#fff0f5",
    thumbClass: "pt-dots",
  },
];
