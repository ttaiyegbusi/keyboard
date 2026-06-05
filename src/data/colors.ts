// ─────────────────────────────────────────────────────────────
// src/data/colors.ts
//
// Apple-inspired keyboard colour themes.
// Each theme defines CSS variable values that are injected as
// inline styles onto the keyboard shell — no extra CSS classes
// needed. Just add a new entry here to add a new colour.
//
// Inspired by: MacBook Air M2 colours, iPhone 15 palette,
// iMac 24" colour lineup.
// ─────────────────────────────────────────────────────────────

import { KeyboardColorOption } from "@/types";

export const KEYBOARD_COLORS: KeyboardColorOption[] = [
  {
    id: "midnight",
    label: "Midnight",
    swatch: "#1d2535",
    vars: {
      shellTop:  "#1d2535",
      shellBot:  "#141925",
      keyTop:    "#262e40",
      keyMid:    "#1e2638",
      keyBot:    "#181f30",
      keyText:   "#c8d0e0",
      keyBorder: "rgba(255,255,255,0.055)",
      knob:      "radial-gradient(circle at 35% 30%, #2a3448 0%, #151c2c 45%, #0a1018 100%)",
    },
  },
  {
    id: "starlight",
    label: "Starlight",
    swatch: "#e8e0d4",
    vars: {
      shellTop:  "#e8e0d4",
      shellBot:  "#d8d0c4",
      keyTop:    "#ddd5c8",
      keyMid:    "#d4ccc0",
      keyBot:    "#cac2b5",
      keyText:   "#3a3530",
      keyBorder: "rgba(0,0,0,0.12)",
      knob:      "radial-gradient(circle at 35% 30%, #d0c8bb 0%, #b8b0a3 45%, #a09890 100%)",
    },
  },
  {
    id: "silver",
    label: "Silver",
    swatch: "#c8c8c8",
    vars: {
      shellTop:  "#d0d0d0",
      shellBot:  "#b8b8b8",
      keyTop:    "#c5c5c5",
      keyMid:    "#bababa",
      keyBot:    "#aeaeae",
      keyText:   "#2a2a2a",
      keyBorder: "rgba(0,0,0,0.1)",
      knob:      "radial-gradient(circle at 35% 30%, #d0d0d0 0%, #a0a0a0 45%, #808080 100%)",
    },
  },
  {
    id: "spacegray",
    label: "Space Gray",
    swatch: "#3a3a3c",
    vars: {
      shellTop:  "#3a3a3c",
      shellBot:  "#2c2c2e",
      keyTop:    "#464648",
      keyMid:    "#3c3c3e",
      keyBot:    "#323234",
      keyText:   "#e0e0e2",
      keyBorder: "rgba(255,255,255,0.07)",
      knob:      "radial-gradient(circle at 35% 30%, #505052 0%, #2c2c2e 45%, #181818 100%)",
    },
  },
  {
    id: "skyblue",
    label: "Sky Blue",
    swatch: "#6ab4e8",
    vars: {
      shellTop:  "#6ab4e8",
      shellBot:  "#4a9ad4",
      keyTop:    "#78beed",
      keyMid:    "#6ab4e8",
      keyBot:    "#5aa8e0",
      keyText:   "#0a2a45",
      keyBorder: "rgba(255,255,255,0.2)",
      knob:      "radial-gradient(circle at 35% 30%, #8ccaf5 0%, #4a9ad4 45%, #2a7ab8 100%)",
    },
  },
  {
    id: "pink",
    label: "Pink",
    swatch: "#f4a0b0",
    vars: {
      shellTop:  "#f4a0b0",
      shellBot:  "#e8849a",
      keyTop:    "#f5aab8",
      keyMid:    "#f0a0b0",
      keyBot:    "#e894a6",
      keyText:   "#4a0a18",
      keyBorder: "rgba(255,255,255,0.2)",
      knob:      "radial-gradient(circle at 35% 30%, #fcc0cc 0%, #e8849a 45%, #d06080 100%)",
    },
  },
  {
    id: "purple",
    label: "Purple",
    swatch: "#9b80c8",
    vars: {
      shellTop:  "#9b80c8",
      shellBot:  "#8268b4",
      keyTop:    "#a68ed0",
      keyMid:    "#9b80c8",
      keyBot:    "#8e72bc",
      keyText:   "#f0ecff",
      keyBorder: "rgba(255,255,255,0.15)",
      knob:      "radial-gradient(circle at 35% 30%, #b89ee0 0%, #8268b4 45%, #604c90 100%)",
    },
  },
  {
    id: "yellow",
    label: "Yellow",
    swatch: "#f5c842",
    vars: {
      shellTop:  "#f5c842",
      shellBot:  "#e8b420",
      keyTop:    "#f8d055",
      keyMid:    "#f5c842",
      keyBot:    "#f0be30",
      keyText:   "#2a1a00",
      keyBorder: "rgba(0,0,0,0.12)",
      knob:      "radial-gradient(circle at 35% 30%, #fce080 0%, #e8b420 45%, #c89000 100%)",
    },
  },
  {
    id: "green",
    label: "Green",
    swatch: "#5ab878",
    vars: {
      shellTop:  "#5ab878",
      shellBot:  "#3ea060",
      keyTop:    "#68c485",
      keyMid:    "#5ab878",
      keyBot:    "#4eac6c",
      keyText:   "#032010",
      keyBorder: "rgba(255,255,255,0.18)",
      knob:      "radial-gradient(circle at 35% 30%, #80d098 0%, #3ea060 45%, #206840 100%)",
    },
  },
];
