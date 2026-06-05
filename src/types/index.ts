// ─────────────────────────────────────────────────────────────
// src/types/index.ts
// Shared TypeScript types used across the whole project.
// ─────────────────────────────────────────────────────────────

/** All available paper style identifiers */
export type PaperType =
  | "cream" | "a4white" | "kraft" | "antique"
  | "carton" | "oilpaper" | "notebook" | "dots";

/** Shape of a single paper option in the picker */
export interface PaperOption {
  id: PaperType;
  label: string;
  swatchColor: string;
  thumbClass: string;
}

// ── Keyboard colour ───────────────────────────────────────────
/** Apple-inspired keyboard colour themes */
export type KeyboardColor =
  | "midnight" | "starlight" | "silver" | "spacegray"
  | "skyblue"  | "pink"      | "purple" | "yellow" | "green";

export interface KeyboardColorOption {
  id: KeyboardColor;
  label: string;
  /** Dot swatch shown in the toolbar */
  swatch: string;
  /** CSS variables injected onto the keyboard when active */
  vars: {
    shellTop:  string;
    shellBot:  string;
    keyTop:    string;
    keyMid:    string;
    keyBot:    string;
    keyText:   string;
    keyBorder: string;
    knob:      string;
  };
}

// ── Font ─────────────────────────────────────────────────────
/** Available writing fonts */
export type FontId =
  | "special-elite" | "inter" | "caveat"
  | "playfair"      | "jetbrains" | "lora" | "dancing";

export interface FontOption {
  id: FontId;
  /** Label shown in the dropdown */
  label: string;
  /** CSS font-family value */
  family: string;
  /** Short description shown in the picker */
  description: string;
  /** Preview text style hint */
  style: "serif" | "sans" | "mono" | "script" | "typewriter";
}

// ── Volume ───────────────────────────────────────────────────
export type VolumeState = "mute" | "low" | "high";

/** Keyboard state managed by useTypewriter */
export interface KeyboardState {
  shiftActive: boolean;
  capsLock: boolean;
}
