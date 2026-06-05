// ─────────────────────────────────────────────────────────────
// src/data/colors.ts
//
// Apple-inspired keyboard colour themes.
// Each theme provides a full set of CSS variable overrides.
//
// Design rules per theme:
//   shellTop/Bot  — the outer keyboard body (darkest tone)
//   keyTop/Mid/Bot — the key face gradient (mid tones, lighter than shell)
//   keyText       — primary label colour (MUST pass 4.5:1 contrast on keyMid)
//   keyTextSub    — secondary / icon colour (dimmer version of keyText)
//   keyBorder     — edge definition (light for dark themes, dark for light themes)
//   keyHighlight  — top inset highlight (the "lit" edge of a physical key)
//   keyShadow     — bottom inset shadow (the "depth" edge)
//   dropShadow    — drop shadow below each key onto the shell
//   knob          — radial-gradient for the dial
// ─────────────────────────────────────────────────────────────

import { KeyboardColorOption } from "@/types";

export const KEYBOARD_COLORS: KeyboardColorOption[] = [
  // ── Midnight ─────────────────────────────────────────────────
  // Deep navy-black. Keys are distinctly lighter than shell.
  // White text for maximum contrast.
  {
    id: "midnight",
    label: "Midnight",
    swatch: "#1d2535",
    vars: {
      shellTop:    "#1a2030",
      shellBot:    "#10141e",
      keyTop:      "#2e3850",
      keyMid:      "#253045",
      keyBot:      "#1e283c",
      keyText:     "#dde4f0",     // near-white, high contrast
      keyTextSub:  "#7a8aaa",     // muted blue-grey
      keyBorder:   "rgba(255,255,255,0.08)",
      keyHighlight:"rgba(255,255,255,0.10)",
      keyShadow:   "rgba(0,0,0,0.55)",
      dropShadow:  "rgba(0,0,0,0.7)",
      knob:        "radial-gradient(circle at 35% 30%, #2e3850 0%, #151c2c 50%, #080d15 100%)",
    },
  },

  // ── Starlight ─────────────────────────────────────────────────
  // Warm cream-white. Keys lighter than the warm-beige shell.
  // Very dark brown text for contrast on light keys.
  {
    id: "starlight",
    label: "Starlight",
    swatch: "#e8e0d0",
    vars: {
      shellTop:    "#d8d0c0",
      shellBot:    "#c8c0b0",
      keyTop:      "#ede8dc",
      keyMid:      "#e5dfd3",
      keyBot:      "#dbd5c8",
      keyText:     "#1c1810",     // very dark brown — guaranteed contrast
      keyTextSub:  "#5a5248",     // medium warm brown
      keyBorder:   "rgba(0,0,0,0.18)",
      keyHighlight:"rgba(255,255,255,0.55)",
      keyShadow:   "rgba(0,0,0,0.22)",
      dropShadow:  "rgba(0,0,0,0.28)",
      knob:        "radial-gradient(circle at 35% 30%, #e0d8cc 0%, #b8b0a4 50%, #908880 100%)",
    },
  },

  // ── Silver ───────────────────────────────────────────────────
  // Cool neutral grey. Keys are lighter than the mid-grey shell.
  // Near-black text. Classic Mac keyboard feel.
  {
    id: "silver",
    label: "Silver",
    swatch: "#b8b8b8",
    vars: {
      shellTop:    "#a8a8a8",
      shellBot:    "#989898",
      keyTop:      "#d5d5d5",
      keyMid:      "#cbcbcb",
      keyBot:      "#bfbfbf",
      keyText:     "#111111",     // near-black
      keyTextSub:  "#484848",     // dark grey
      keyBorder:   "rgba(0,0,0,0.22)",
      keyHighlight:"rgba(255,255,255,0.6)",
      keyShadow:   "rgba(0,0,0,0.25)",
      dropShadow:  "rgba(0,0,0,0.35)",
      knob:        "radial-gradient(circle at 35% 30%, #d8d8d8 0%, #a0a0a0 50%, #787878 100%)",
    },
  },

  // ── Space Gray ───────────────────────────────────────────────
  // Dark charcoal. Keys are a clear step lighter.
  // Light grey text.
  {
    id: "spacegray",
    label: "Space Gray",
    swatch: "#3a3a3c",
    vars: {
      shellTop:    "#2c2c2e",
      shellBot:    "#1e1e20",
      keyTop:      "#4a4a4c",
      keyMid:      "#404042",
      keyBot:      "#363638",
      keyText:     "#e8e8ea",     // light grey
      keyTextSub:  "#888890",     // mid grey
      keyBorder:   "rgba(255,255,255,0.08)",
      keyHighlight:"rgba(255,255,255,0.09)",
      keyShadow:   "rgba(0,0,0,0.55)",
      dropShadow:  "rgba(0,0,0,0.7)",
      knob:        "radial-gradient(circle at 35% 30%, #585860 0%, #303034 50%, #141416 100%)",
    },
  },

  // ── Sky Blue ─────────────────────────────────────────────────
  // Bright airy blue. Keys are noticeably lighter than the shell.
  // Very dark navy text for contrast — never dark-on-dark.
  {
    id: "skyblue",
    label: "Sky Blue",
    swatch: "#5aaee0",
    vars: {
      shellTop:    "#4898d0",
      shellBot:    "#3880b8",
      keyTop:      "#7cc4f0",
      keyMid:      "#70b8e8",
      keyBot:      "#62acdc",
      keyText:     "#08203c",     // very dark navy — guaranteed contrast on light-blue keys
      keyTextSub:  "#1a4870",     // medium navy
      keyBorder:   "rgba(0,0,0,0.20)",
      keyHighlight:"rgba(255,255,255,0.40)",
      keyShadow:   "rgba(0,0,0,0.28)",
      dropShadow:  "rgba(0,0,30,0.45)",
      knob:        "radial-gradient(circle at 35% 30%, #90d0ff 0%, #4090c8 50%, #205898 100%)",
    },
  },

  // ── Pink ─────────────────────────────────────────────────────
  // Warm coral pink. Keys lighter + slightly more saturated than shell.
  // Very dark maroon text — not pink-on-pink.
  {
    id: "pink",
    label: "Pink",
    swatch: "#e8809a",
    vars: {
      shellTop:    "#d86880",
      shellBot:    "#c85070",
      keyTop:      "#f5a0b5",
      keyMid:      "#ee94aa",
      keyBot:      "#e5889e",
      keyText:     "#280818",     // very dark maroon
      keyTextSub:  "#6a2040",     // deep rose
      keyBorder:   "rgba(0,0,0,0.18)",
      keyHighlight:"rgba(255,255,255,0.38)",
      keyShadow:   "rgba(0,0,0,0.28)",
      dropShadow:  "rgba(80,0,30,0.45)",
      knob:        "radial-gradient(circle at 35% 30%, #ffc0d0 0%, #d86080 50%, #a83050 100%)",
    },
  },

  // ── Purple ───────────────────────────────────────────────────
  // Vibrant medium purple. Keys lighter/more lavender than the shell.
  // Near-white text — dark purple would be unreadable.
  {
    id: "purple",
    label: "Purple",
    swatch: "#8870c0",
    vars: {
      shellTop:    "#6a50a8",
      shellBot:    "#543e90",
      keyTop:      "#a890d8",
      keyMid:      "#9c82cc",
      keyBot:      "#9076c0",
      keyText:     "#f4f0ff",     // near-white lavender
      keyTextSub:  "#c8b8f0",     // soft lavender
      keyBorder:   "rgba(255,255,255,0.15)",
      keyHighlight:"rgba(255,255,255,0.18)",
      keyShadow:   "rgba(0,0,0,0.45)",
      dropShadow:  "rgba(20,0,60,0.55)",
      knob:        "radial-gradient(circle at 35% 30%, #c0a8f0 0%, #7858c0 50%, #402880 100%)",
    },
  },

  // ── Yellow ───────────────────────────────────────────────────
  // Warm golden yellow. Keys lighter than the amber-gold shell.
  // Very dark brown text — yellow-on-yellow is unreadable.
  {
    id: "yellow",
    label: "Yellow",
    swatch: "#e8b820",
    vars: {
      shellTop:    "#d0a010",
      shellBot:    "#b88800",
      keyTop:      "#f8d860",
      keyMid:      "#f0cc48",
      keyBot:      "#e8c038",
      keyText:     "#1e1000",     // very dark brown
      keyTextSub:  "#4a3000",     // dark amber
      keyBorder:   "rgba(0,0,0,0.18)",
      keyHighlight:"rgba(255,255,255,0.45)",
      keyShadow:   "rgba(0,0,0,0.28)",
      dropShadow:  "rgba(60,30,0,0.45)",
      knob:        "radial-gradient(circle at 35% 30%, #ffe888 0%, #d09800 50%, #906800 100%)",
    },
  },

  // ── Green ────────────────────────────────────────────────────
  // Fresh mint-sage green. Keys lighter and brighter than the deeper shell.
  // Very dark forest green text.
  {
    id: "green",
    label: "Green",
    swatch: "#48a868",
    vars: {
      shellTop:    "#388050",
      shellBot:    "#28683a",
      keyTop:      "#70c888",
      keyMid:      "#60bc7a",
      keyBot:      "#54b06e",
      keyText:     "#031808",     // very dark forest green
      keyTextSub:  "#0e4020",     // dark green
      keyBorder:   "rgba(0,0,0,0.18)",
      keyHighlight:"rgba(255,255,255,0.35)",
      keyShadow:   "rgba(0,0,0,0.28)",
      dropShadow:  "rgba(0,30,10,0.5)",
      knob:        "radial-gradient(circle at 35% 30%, #90e0a8 0%, #388050 50%, #185030 100%)",
    },
  },
];
