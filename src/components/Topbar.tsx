// ─────────────────────────────────────────────────────────────
// src/components/Topbar.tsx
//
// Header bar — now wires up all 4 toolbar dropdowns:
//   1. Paper chip   → PapersPanel
//   2. Color dot    → ColorsPanel
//   3. Font label   → FontsPanel
//   4. Volume icon  → cycles mute/low/high (no dropdown)
// ─────────────────────────────────────────────────────────────

"use client";

import React from "react";
import { PapersPanel }  from "./PapersPanel";
import { ColorsPanel }  from "./ColorsPanel";
import { FontsPanel }   from "./FontsPanel";
import { PaperType, KeyboardColor, FontId, VolumeState } from "@/types";
import { PAPERS }   from "@/data/papers";
import { KEYBOARD_COLORS } from "@/data/colors";
import { FONTS }    from "@/data/fonts";

interface TopbarProps {
  // State
  activePaper:  PaperType;
  activeColor:  KeyboardColor;
  activeFont:   FontId;
  volume:       VolumeState;
  openDropdown: "paper" | "color" | "font" | null;
  // Handlers
  onPaperChipClick:  (e: React.MouseEvent) => void;
  onColorDotClick:   (e: React.MouseEvent) => void;
  onFontLabelClick:  (e: React.MouseEvent) => void;
  onVolumeClick:     () => void;
  onSelectPaper:     (p: PaperType) => void;
  onSelectColor:     (c: KeyboardColor) => void;
  onSelectFont:      (f: FontId) => void;
}

export function Topbar({
  activePaper, activeColor, activeFont, volume, openDropdown,
  onPaperChipClick, onColorDotClick, onFontLabelClick, onVolumeClick,
  onSelectPaper, onSelectColor, onSelectFont,
}: TopbarProps) {
  const paperSwatch = PAPERS.find((p) => p.id === activePaper)?.swatchColor ?? "#f5edd6";
  const colorSwatch = KEYBOARD_COLORS.find((c) => c.id === activeColor)?.swatch ?? "#3a3c42";
  const fontLabel   = FONTS.find((f) => f.id === activeFont)?.label ?? "Font";

  return (
    <header className="topbar">
      {/* ── Brand ─────────────────────────────────────────── */}
      <div className="brand">
        <span className="brand-dot" />
        <span>tta</span>
      </div>

      {/* ── Toolbar ───────────────────────────────────────── */}
      <div className="toolbar" onClick={(e) => e.stopPropagation()}>

        {/* 1. Paper picker chip */}
        <button
          className={`tb-btn chip-btn ${openDropdown === "paper" ? "tb-btn--active" : ""}`}
          aria-label="Paper style"
          aria-expanded={openDropdown === "paper"}
          onClick={onPaperChipClick}
        >
          <span className="chip-swatch" style={{ background: paperSwatch }} />
          <ChevronIcon />
        </button>

        <div className="tb-divider" />

        {/* 2. Keyboard colour dot */}
        <button
          className={`tb-btn chip-btn ${openDropdown === "color" ? "tb-btn--active" : ""}`}
          aria-label="Keyboard color"
          aria-expanded={openDropdown === "color"}
          onClick={onColorDotClick}
        >
          <span className="color-dot" style={{ background: colorSwatch }} />
          <ChevronIcon />
        </button>

        <div className="tb-divider" />

        {/* 3. Font selector */}
        <button
          className={`tb-btn tb-label ${openDropdown === "font" ? "tb-btn--active" : ""}`}
          aria-label="Writing font"
          aria-expanded={openDropdown === "font"}
          onClick={onFontLabelClick}
        >
          {fontLabel} <ChevronIcon />
        </button>

        <div className="tb-divider" />

        {/* 4. Volume icon — cycles on click */}
        <button
          className="tb-btn tb-icon-btn"
          aria-label={`Volume: ${volume}`}
          onClick={onVolumeClick}
          title={`Volume: ${volume} (click to change)`}
        >
          <VolumeIcon state={volume} />
        </button>

        {/* Settings (decorative) */}
        <button className="tb-btn tb-icon-btn" aria-label="Settings">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>

        <div className="tb-divider" />

        {/* Download (decorative) */}
        <button className="tb-btn tb-label">
          Download <ChevronIcon />
        </button>

        {/* ── Dropdown panels — positioned relative to toolbar ── */}
        <PapersPanel open={openDropdown === "paper"} activePaper={activePaper} onSelect={onSelectPaper} />
        <ColorsPanel open={openDropdown === "color"} activeColor={activeColor} onSelect={onSelectColor} />
        <FontsPanel  open={openDropdown === "font"}  activeFont={activeFont}   onSelect={onSelectFont}  />
      </div>
    </header>
  );
}

// ── Sub-components ─────────────────────────────────────────────

function ChevronIcon() {
  return (
    <svg className="chevron-icon" viewBox="0 0 10 6" fill="none" aria-hidden>
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/** Volume icon — changes shape based on current volume state */
function VolumeIcon({ state }: { state: VolumeState }) {
  if (state === "mute") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <line x1="23" y1="9" x2="17" y2="15"/>
        <line x1="17" y1="9" x2="23" y2="15"/>
      </svg>
    );
  }
  if (state === "low") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      </svg>
    );
  }
  // high
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    </svg>
  );
}
