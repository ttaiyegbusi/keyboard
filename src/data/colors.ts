// ─────────────────────────────────────────────────────────────
// src/data/colors.ts
//
// The exact 7 Apple iMac aluminum finish colours.
// Source: Apple iMac 24" (2021) color lineup.
// Each shell has a subtle 2-stop gradient — lighter at top,
// richer/slightly darker at bottom — matching the anodized
// aluminum look in the real product photos.
//
// Keys are always white — only shellTop/shellBot change.
// ─────────────────────────────────────────────────────────────

import { KeyboardColorOption } from "@/types";

export const KEYBOARD_COLORS: KeyboardColorOption[] = [
  // ── Silver ───────────────────────────────────────────────────
  // The default finish. Cool neutral grey with warm undertone.
  {
    id: "silver",
    label: "Silver",
    swatch: "#c8c8c8",
    vars: {
      shellTop:    "#dcdcdc",
      shellBot:    "#b8b8b8",
      keyTop:    "#ffffff", keyMid: "#ffffff", keyBot: "#f5f5f7",
      keyText:   "#1d1d1f", keyTextSub: "#6e6e73",
      keyBorder:    "rgba(0,0,0,0.09)",
      keyHighlight: "rgba(255,255,255,0.92)",
      keyShadow:    "rgba(0,0,0,0.14)",
      dropShadow:   "rgba(0,0,0,0.10)",
      knob: "radial-gradient(circle at 38% 32%,#e8e8e8 0%,#b0b0b0 55%,#888 100%)",
    },
  },

  // ── Blue ─────────────────────────────────────────────────────
  // Periwinkle — soft cornflower blue with slight grey.
  // Apple calls this "Blue". See Image 3.
  {
    id: "skyblue",
    label: "Blue",
    swatch: "#81a4c8",
    vars: {
      shellTop:    "#9ab4cc",
      shellBot:    "#6e98bc",
      keyTop:    "#ffffff", keyMid: "#ffffff", keyBot: "#f0f4f8",
      keyText:   "#1d1d1f", keyTextSub: "#6e6e73",
      keyBorder:    "rgba(0,0,0,0.08)",
      keyHighlight: "rgba(255,255,255,0.92)",
      keyShadow:    "rgba(0,0,0,0.12)",
      dropShadow:   "rgba(0,0,0,0.09)",
      knob: "radial-gradient(circle at 38% 32%,#c0d4e8 0%,#81a4c8 55%,#4e7aa0 100%)",
    },
  },

  // ── Green ─────────────────────────────────────────────────────
  // Sage / mint green — muted, not bright. See Image 1.
  {
    id: "green",
    label: "Green",
    swatch: "#7dab8a",
    vars: {
      shellTop:    "#96bca2",
      shellBot:    "#68977a",
      keyTop:    "#ffffff", keyMid: "#ffffff", keyBot: "#f0f5f2",
      keyText:   "#1d1d1f", keyTextSub: "#6e6e73",
      keyBorder:    "rgba(0,0,0,0.08)",
      keyHighlight: "rgba(255,255,255,0.92)",
      keyShadow:    "rgba(0,0,0,0.12)",
      dropShadow:   "rgba(0,0,0,0.09)",
      knob: "radial-gradient(circle at 38% 32%,#bcd8c4 0%,#7dab8a 55%,#4e8060 100%)",
    },
  },

  // ── Yellow ───────────────────────────────────────────────────
  // Warm golden yellow — muted, anodized. See Image 4.
  {
    id: "yellow",
    label: "Yellow",
    swatch: "#c8a852",
    vars: {
      shellTop:    "#d4b860",
      shellBot:    "#b89840",
      keyTop:    "#ffffff", keyMid: "#ffffff", keyBot: "#fdf8ec",
      keyText:   "#1d1d1f", keyTextSub: "#6e6e73",
      keyBorder:    "rgba(0,0,0,0.08)",
      keyHighlight: "rgba(255,255,255,0.92)",
      keyShadow:    "rgba(0,0,0,0.12)",
      dropShadow:   "rgba(0,0,0,0.09)",
      knob: "radial-gradient(circle at 38% 32%,#e8d090 0%,#c8a852 55%,#9a7820 100%)",
    },
  },

  // ── Orange ───────────────────────────────────────────────────
  // Warm coral orange — the iMac Orange finish.
  {
    id: "orange",
    label: "Orange",
    swatch: "#c87048",
    vars: {
      shellTop:    "#d4845c",
      shellBot:    "#bc5e38",
      keyTop:    "#ffffff", keyMid: "#ffffff", keyBot: "#fdf3ee",
      keyText:   "#1d1d1f", keyTextSub: "#6e6e73",
      keyBorder:    "rgba(0,0,0,0.08)",
      keyHighlight: "rgba(255,255,255,0.92)",
      keyShadow:    "rgba(0,0,0,0.12)",
      dropShadow:   "rgba(0,0,0,0.09)",
      knob: "radial-gradient(circle at 38% 32%,#e8b090 0%,#c87048 55%,#984020 100%)",
    },
  },

  // ── Pink ─────────────────────────────────────────────────────
  // Soft rose pink — muted, Apple-style.
  {
    id: "pink",
    label: "Pink",
    swatch: "#c08090",
    vars: {
      shellTop:    "#cc98a8",
      shellBot:    "#b07080",
      keyTop:    "#ffffff", keyMid: "#ffffff", keyBot: "#fdf0f3",
      keyText:   "#1d1d1f", keyTextSub: "#6e6e73",
      keyBorder:    "rgba(0,0,0,0.08)",
      keyHighlight: "rgba(255,255,255,0.92)",
      keyShadow:    "rgba(0,0,0,0.12)",
      dropShadow:   "rgba(0,0,0,0.09)",
      knob: "radial-gradient(circle at 38% 32%,#e0b8c4 0%,#c08090 55%,#905068 100%)",
    },
  },

  // ── Purple ───────────────────────────────────────────────────
  // Muted lavender purple — the iMac Purple finish.
  {
    id: "purple",
    label: "Purple",
    swatch: "#9880b0",
    vars: {
      shellTop:    "#ac98c0",
      shellBot:    "#8870a4",
      keyTop:    "#ffffff", keyMid: "#ffffff", keyBot: "#f6f2fc",
      keyText:   "#1d1d1f", keyTextSub: "#6e6e73",
      keyBorder:    "rgba(0,0,0,0.08)",
      keyHighlight: "rgba(255,255,255,0.92)",
      keyShadow:    "rgba(0,0,0,0.12)",
      dropShadow:   "rgba(0,0,0,0.09)",
      knob: "radial-gradient(circle at 38% 32%,#ccc0e0 0%,#9880b0 55%,#684890 100%)",
    },
  },
];
