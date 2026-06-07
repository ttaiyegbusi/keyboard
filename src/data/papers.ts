// ─────────────────────────────────────────────────────────────
// src/data/papers.ts
// swatchColor must match the ACTUAL background of the paper
// so the notepad shows the correct color when selected.
// ─────────────────────────────────────────────────────────────

import { PaperOption } from "@/types";

export const PAPERS: PaperOption[] = [
  { id: "cream",    label: "Cream",       swatchColor: "#f5edd6", thumbClass: "pt-cream"    },
  { id: "a4white",  label: "A4 White",    swatchColor: "#f8f8f8", thumbClass: "pt-white"    },
  { id: "kraft",    label: "Brown Kraft", swatchColor: "#9e5e28", thumbClass: "pt-kraft"    },
  { id: "antique",  label: "Antique",     swatchColor: "#c9a040", thumbClass: "pt-antique"  },
  { id: "carton",   label: "Carton",      swatchColor: "#b07838", thumbClass: "pt-carton"   },
  { id: "oilpaper", label: "Oil Paper",   swatchColor: "#ede0b0", thumbClass: "pt-oilpaper" },
  { id: "notebook", label: "Note Book",   swatchColor: "#f8f9ff", thumbClass: "pt-notebook" },
  { id: "dots",     label: "Dots",        swatchColor: "#fff2f6", thumbClass: "pt-dots"     },
];
