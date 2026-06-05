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

export type KeyboardColor =
  | "midnight" | "starlight" | "silver" | "spacegray"
  | "skyblue"  | "pink"      | "purple" | "yellow" | "green";

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
    keyText:      string;    // primary label — must contrast against keyMid
    keyTextSub:   string;    // secondary/icon colour — dimmer
    keyBorder:    string;
    keyHighlight: string;    // top inset glow
    keyShadow:    string;    // bottom inset depth
    dropShadow:   string;    // drop shadow below key
    knob:         string;    // radial-gradient for the dial
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

export interface KeyboardState {
  shiftActive: boolean;
  capsLock: boolean;
}
