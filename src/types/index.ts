// ─────────────────────────────────────────────────────────────
// src/types/index.ts
//
// Shared TypeScript types used across the whole project.
// ─────────────────────────────────────────────────────────────

/** All available paper style identifiers */
export type PaperType =
  | "cream"
  | "a4white"
  | "kraft"
  | "antique"
  | "carton"
  | "oilpaper"
  | "notebook"
  | "dots";

/** Shape of a single paper option in the picker */
export interface PaperOption {
  /** Unique key used as CSS class and identifier */
  id: PaperType;
  /** Display name shown below the thumbnail */
  label: string;
  /** Representative hex colour for the toolbar chip swatch */
  swatchColor: string;
  /** CSS class(es) to apply to the thumbnail preview */
  thumbClass: string;
}

/** State managed by the keyboard hook */
export interface KeyboardState {
  shiftActive: boolean;
  capsLock: boolean;
}
