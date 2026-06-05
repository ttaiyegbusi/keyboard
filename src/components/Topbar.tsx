// ─────────────────────────────────────────────────────────────
// src/components/Topbar.tsx
//
// The fixed header bar. Contains:
//   - Brand mark (dot + "tta")
//   - Toolbar (color chip → opens PapersPanel, font selector,
//     audio icon, settings icon, download button)
//   - PapersPanel dropdown (rendered inside the toolbar so it
//     positions relative to the chip button)
// ─────────────────────────────────────────────────────────────

"use client";

import React from "react";
import { PapersPanel } from "./PapersPanel";
import { PaperType } from "@/types";
import { PAPERS } from "@/data/papers";

interface TopbarProps {
  activePaper: PaperType;
  panelOpen: boolean;
  onChipClick: (e: React.MouseEvent) => void;
  onSelectPaper: (paper: PaperType) => void;
}

export function Topbar({
  activePaper,
  panelOpen,
  onChipClick,
  onSelectPaper,
}: TopbarProps) {
  // Look up swatch colour for active paper
  const swatch = PAPERS.find((p) => p.id === activePaper)?.swatchColor ?? "#f4f6f8";

  return (
    <header className="topbar">
      {/* ── Brand ─────────────────────────────────────── */}
      <div className="brand">
        <span className="brand-dot" />
        <span>tta</span>
      </div>

      {/* ── Toolbar ───────────────────────────────────── */}
      <div className="toolbar" onClick={(e) => e.stopPropagation()}>

        {/* Color chip — click to open paper picker */}
        <button
          className="chip-btn"
          aria-label="Open paper picker"
          aria-expanded={panelOpen}
          onClick={onChipClick}
        >
          <span
            className="chip-swatch"
            style={{ background: swatch }}
          />
          <ChevronIcon />
        </button>

        <div className="tb-divider" />

        {/* Muted dot */}
        <div className="tb-item">
          <span className="muted-dot" />
          <ChevronIcon />
        </div>

        <div className="tb-divider" />

        {/* Font selector */}
        <div className="tb-item tb-label">
          Inter <ChevronIcon />
        </div>

        <div className="tb-divider" />

        {/* Speaker */}
        <span className="tb-icon" aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
        </span>

        {/* Settings */}
        <span className="tb-icon" aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </span>

        <div className="tb-divider" />

        {/* Download */}
        <div className="tb-item tb-label">
          Download <ChevronIcon />
        </div>

        {/* ── Papers dropdown (portals inside toolbar for positioning) ── */}
        <PapersPanel
          open={panelOpen}
          activePaper={activePaper}
          onSelect={onSelectPaper}
        />
      </div>
    </header>
  );
}

/** Tiny reusable chevron SVG */
function ChevronIcon() {
  return (
    <svg
      className="chevron-icon"
      viewBox="0 0 10 6"
      fill="none"
      aria-hidden
    >
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
