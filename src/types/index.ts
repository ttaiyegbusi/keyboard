// src/types/index.ts

export type PaperType =
  | "cream" | "a4white" | "kraft" | "antique"
  | "carton" | "oilpaper" | "notebook" | "dots";

export interface PaperOption {
  id: PaperType;
  label: string;
  swatchColor: string;
  thumbClass: string;
}

// Exactly 7 Apple iMac aluminum finishes
export type KeyboardColor =
  | "silver" | "skyblue" | "green" | "yellow"
  | "orange" | "pink"    | "purple";

export interface KeyboardColorOption {
  id: KeyboardColor;
  label: string;
  swatch: string;
  vars: {
    shellTop:     string;
    shellBot:     string;
    keyTop:       string;
    keyMid:       string;
    keyBot:       string;
    keyText:      string;
    keyTextSub:   string;
    keyBorder:    string;
    keyHighlight: string;
    keyShadow:    string;
    dropShadow:   string;
    knob:         string;
  };
}

export type FontId =
  | "special-elite" | "inter" | "caveat"
  | "playfair"      | "jetbrains" | "lora" | "dancing";

export interface FontOption {
  id: FontId;
  label: string;
  family: string;
  description: string;
  style: "serif" | "sans" | "mono" | "script" | "typewriter";
}

export type VolumeState = "mute" | "low" | "high";
