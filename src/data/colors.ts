// ─────────────────────────────────────────────────────────────
// src/data/colors.ts
//
// Apple-inspired keyboard SHELL colours.
// ONLY the shell (aluminium frame) changes colour.
// Keys are ALWAYS white — that's how real Apple keyboards work.
//
// Each theme sets:
//   shellTop / shellBot  — the shell gradient (what shows between keys)
//   swatch               — dot colour shown in the toolbar
//
// Key face colours are hardcoded white in CSS and never change.
// ─────────────────────────────────────────────────────────────

import { KeyboardColorOption } from "@/types";

export const KEYBOARD_COLORS: KeyboardColorOption[] = [
  {
    id: "silver",
    label: "Silver",
    swatch: "#d4d4d8",
    vars: {
      shellTop: "#e4e4e7",  shellBot: "#d4d4d8",
      keyTop: "#ffffff",    keyMid: "#ffffff",    keyBot: "#f4f4f5",
      keyText: "#18181b",   keyTextSub: "#71717a",
      keyBorder: "rgba(0,0,0,0.08)",
      keyHighlight: "rgba(255,255,255,0.9)",
      keyShadow: "rgba(0,0,0,0.14)",
      dropShadow: "rgba(0,0,0,0.10)",
      knob: "radial-gradient(circle at 35% 30%,#e4e4e7 0%,#a1a1aa 50%,#71717a 100%)",
    },
  },
  {
    id: "spacegray",
    label: "Space Gray",
    swatch: "#52525b",
    vars: {
      shellTop: "#52525b",  shellBot: "#3f3f46",
      keyTop: "#ffffff",    keyMid: "#ffffff",    keyBot: "#f4f4f5",
      keyText: "#18181b",   keyTextSub: "#71717a",
      keyBorder: "rgba(0,0,0,0.08)",
      keyHighlight: "rgba(255,255,255,0.9)",
      keyShadow: "rgba(0,0,0,0.18)",
      dropShadow: "rgba(0,0,0,0.14)",
      knob: "radial-gradient(circle at 35% 30%,#71717a 0%,#3f3f46 50%,#27272a 100%)",
    },
  },
  {
    id: "midnight",
    label: "Midnight",
    swatch: "#1e293b",
    vars: {
      shellTop: "#1e293b",  shellBot: "#0f172a",
      keyTop: "#ffffff",    keyMid: "#ffffff",    keyBot: "#f4f4f5",
      keyText: "#18181b",   keyTextSub: "#71717a",
      keyBorder: "rgba(0,0,0,0.08)",
      keyHighlight: "rgba(255,255,255,0.9)",
      keyShadow: "rgba(0,0,0,0.20)",
      dropShadow: "rgba(0,0,0,0.16)",
      knob: "radial-gradient(circle at 35% 30%,#334155 0%,#1e293b 50%,#0f172a 100%)",
    },
  },
  {
    id: "starlight",
    label: "Starlight",
    swatch: "#e7e5e4",
    vars: {
      shellTop: "#f5f5f4",  shellBot: "#e7e5e4",
      keyTop: "#ffffff",    keyMid: "#ffffff",    keyBot: "#fafaf9",
      keyText: "#18181b",   keyTextSub: "#71717a",
      keyBorder: "rgba(0,0,0,0.07)",
      keyHighlight: "rgba(255,255,255,0.95)",
      keyShadow: "rgba(0,0,0,0.12)",
      dropShadow: "rgba(0,0,0,0.08)",
      knob: "radial-gradient(circle at 35% 30%,#f5f5f4 0%,#d6d3d1 50%,#a8a29e 100%)",
    },
  },
  {
    id: "pink",
    label: "Pink",
    swatch: "#f9a8d4",
    vars: {
      shellTop: "#f9a8d4",  shellBot: "#f472b6",
      keyTop: "#ffffff",    keyMid: "#ffffff",    keyBot: "#fdf2f8",
      keyText: "#18181b",   keyTextSub: "#71717a",
      keyBorder: "rgba(0,0,0,0.07)",
      keyHighlight: "rgba(255,255,255,0.9)",
      keyShadow: "rgba(0,0,0,0.12)",
      dropShadow: "rgba(0,0,0,0.10)",
      knob: "radial-gradient(circle at 35% 30%,#fce7f3 0%,#f9a8d4 50%,#ec4899 100%)",
    },
  },
  {
    id: "skyblue",
    label: "Sky Blue",
    swatch: "#7dd3fc",
    vars: {
      shellTop: "#7dd3fc",  shellBot: "#38bdf8",
      keyTop: "#ffffff",    keyMid: "#ffffff",    keyBot: "#f0f9ff",
      keyText: "#18181b",   keyTextSub: "#71717a",
      keyBorder: "rgba(0,0,0,0.07)",
      keyHighlight: "rgba(255,255,255,0.9)",
      keyShadow: "rgba(0,0,0,0.12)",
      dropShadow: "rgba(0,0,0,0.10)",
      knob: "radial-gradient(circle at 35% 30%,#e0f2fe 0%,#7dd3fc 50%,#0ea5e9 100%)",
    },
  },
  {
    id: "purple",
    label: "Purple",
    swatch: "#c084fc",
    vars: {
      shellTop: "#c084fc",  shellBot: "#a855f7",
      keyTop: "#ffffff",    keyMid: "#ffffff",    keyBot: "#faf5ff",
      keyText: "#18181b",   keyTextSub: "#71717a",
      keyBorder: "rgba(0,0,0,0.07)",
      keyHighlight: "rgba(255,255,255,0.9)",
      keyShadow: "rgba(0,0,0,0.12)",
      dropShadow: "rgba(0,0,0,0.10)",
      knob: "radial-gradient(circle at 35% 30%,#f3e8ff 0%,#c084fc 50%,#9333ea 100%)",
    },
  },
  {
    id: "yellow",
    label: "Yellow",
    swatch: "#fde047",
    vars: {
      shellTop: "#fde047",  shellBot: "#facc15",
      keyTop: "#ffffff",    keyMid: "#ffffff",    keyBot: "#fefce8",
      keyText: "#18181b",   keyTextSub: "#71717a",
      keyBorder: "rgba(0,0,0,0.07)",
      keyHighlight: "rgba(255,255,255,0.9)",
      keyShadow: "rgba(0,0,0,0.12)",
      dropShadow: "rgba(0,0,0,0.10)",
      knob: "radial-gradient(circle at 35% 30%,#fef9c3 0%,#fde047 50%,#eab308 100%)",
    },
  },
  {
    id: "green",
    label: "Green",
    swatch: "#86efac",
    vars: {
      shellTop: "#86efac",  shellBot: "#4ade80",
      keyTop: "#ffffff",    keyMid: "#ffffff",    keyBot: "#f0fdf4",
      keyText: "#18181b",   keyTextSub: "#71717a",
      keyBorder: "rgba(0,0,0,0.07)",
      keyHighlight: "rgba(255,255,255,0.9)",
      keyShadow: "rgba(0,0,0,0.12)",
      dropShadow: "rgba(0,0,0,0.10)",
      knob: "radial-gradient(circle at 35% 30%,#dcfce7 0%,#86efac 50%,#22c55e 100%)",
    },
  },
];
