// ─────────────────────────────────────────────────────────────
// src/components/Topbar.tsx
//
// Transparent header — no background, blends with the page.
// Positioned close to the content, not fixed at the very top.
// Download button now triggers real PDF / PNG export.
// ─────────────────────────────────────────────────────────────

"use client";

import React, { useRef, useState } from "react";
import { PapersPanel }  from "./PapersPanel";
import { ColorsPanel }  from "./ColorsPanel";
import { FontsPanel }   from "./FontsPanel";
import { PaperType, KeyboardColor, FontId, VolumeState } from "@/types";
import { PAPERS }          from "@/data/papers";
import { KEYBOARD_COLORS } from "@/data/colors";
import { FONTS }           from "@/data/fonts";

interface TopbarProps {
  activePaper:      PaperType;
  activeColor:      KeyboardColor;
  activeFont:       FontId;
  volume:           VolumeState;
  openDropdown:     "paper" | "color" | "font" | "download" | null;
  textareaRef:      React.RefObject<HTMLTextAreaElement>;
  activePaperLabel: string;
  onPaperChipClick: (e: React.MouseEvent) => void;
  onColorDotClick:  (e: React.MouseEvent) => void;
  onFontLabelClick: (e: React.MouseEvent) => void;
  onDownloadClick:  (e: React.MouseEvent) => void;
  onVolumeClick:    () => void;
  onSelectPaper:    (p: PaperType) => void;
  onSelectColor:    (c: KeyboardColor) => void;
  onSelectFont:     (f: FontId) => void;
  closeDropdowns:   () => void;
}

export function Topbar({
  activePaper, activeColor, activeFont, volume, openDropdown,
  textareaRef,
  onPaperChipClick, onColorDotClick, onFontLabelClick,
  onDownloadClick, onVolumeClick,
  onSelectPaper, onSelectColor, onSelectFont,
  closeDropdowns,
}: TopbarProps) {
  const paperSwatch = PAPERS.find((p) => p.id === activePaper)?.swatchColor ?? "#f5edd6";
  const colorSwatch = KEYBOARD_COLORS.find((c) => c.id === activeColor)?.swatch ?? "#3a3c42";
  const fontLabel   = FONTS.find((f) => f.id === activeFont)?.label ?? "Font";
  const paperLabel  = PAPERS.find((p) => p.id === activePaper)?.label ?? "Paper";

  // ── Download handlers ──────────────────────────────────────
  const handleDownloadPNG = async () => {
    closeDropdowns();
    const el = document.querySelector(".notepad") as HTMLElement;
    if (!el) return;
    // Use html2canvas via dynamic import-style fetch from CDN
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    document.head.appendChild(script);
    script.onload = async () => {
      // @ts-expect-error html2canvas global
      const canvas = await window.html2canvas(el, { scale: 2, useCORS: true, backgroundColor: null });
      const link = document.createElement("a");
      link.download = `tta-note-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
  };

  const handleDownloadPDF = async () => {
    closeDropdowns();
    const text = textareaRef.current?.value ?? "";
    if (!text.trim()) { alert("Nothing to download — write something first!"); return; }

    // Build a simple PDF using the browser print dialog with a clean layout
    const win = window.open("", "_blank");
    if (!win) return;
    const paper = PAPERS.find((p) => p.id === activePaper);
    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>tta note</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Special+Elite&family=Caveat&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            background: ${paper?.swatchColor ?? "#f5edd6"};
            font-family: 'Special Elite', serif;
            padding: 60px;
            min-height: 100vh;
            color: #2a1f0e;
          }
          pre {
            white-space: pre-wrap;
            word-wrap: break-word;
            font-family: inherit;
            font-size: 16px;
            line-height: 1.8;
          }
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        </style>
      </head>
      <body>
        <pre>${text.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</pre>
        <script>window.onload = () => { window.print(); }<\/script>
      </body>
      </html>
    `);
    win.document.close();
  };

  return (
    <header className="topbar" onClick={(e) => e.stopPropagation()}>
      {/* ── Brand ─────────────────────────────────────────── */}
      <div className="brand">
        <span className="brand-dot" />
        <span>tta</span>
      </div>

      {/* ── Toolbar ───────────────────────────────────────── */}
      <div className="toolbar">

        {/* 1. Paper picker */}
        <button
          className={`tb-btn chip-btn ${openDropdown === "paper" ? "tb-btn--active" : ""}`}
          aria-label="Paper style" aria-expanded={openDropdown === "paper"}
          onClick={onPaperChipClick}
        >
          <span className="chip-swatch" style={{ background: paperSwatch }} />
          <ChevronIcon />
        </button>

        <div className="tb-divider" />

        {/* 2. Keyboard colour */}
        <button
          className={`tb-btn chip-btn ${openDropdown === "color" ? "tb-btn--active" : ""}`}
          aria-label="Keyboard color" aria-expanded={openDropdown === "color"}
          onClick={onColorDotClick}
        >
          <span className="color-dot" style={{ background: colorSwatch }} />
          <ChevronIcon />
        </button>

        <div className="tb-divider" />

        {/* 3. Font selector */}
        <button
          className={`tb-btn tb-label ${openDropdown === "font" ? "tb-btn--active" : ""}`}
          aria-label="Writing font" aria-expanded={openDropdown === "font"}
          onClick={onFontLabelClick}
        >
          {fontLabel} <ChevronIcon />
        </button>

        <div className="tb-divider" />

        {/* 4. Volume */}
        <button className="tb-btn tb-icon-btn" aria-label={`Volume: ${volume}`} onClick={onVolumeClick}>
          <VolumeIcon state={volume} />
        </button>

        {/* 5. Settings (decorative) */}
        <button className="tb-btn tb-icon-btn" aria-label="Settings">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>

        <div className="tb-divider" />

        {/* 6. Download — with real dropdown */}
        <div className="dl-wrap">
          <button
            className={`tb-btn tb-label ${openDropdown === "download" ? "tb-btn--active" : ""}`}
            aria-label="Download" aria-expanded={openDropdown === "download"}
            onClick={onDownloadClick}
          >
            Download <ChevronIcon />
          </button>

          {/* Download options dropdown */}
          <div className={`dl-panel dropdown-panel ${openDropdown === "download" ? "dropdown-panel--open" : ""}`}
            onClick={(e) => e.stopPropagation()}>
            <p className="dropdown-title">Export As</p>
            <button className="dl-option" onClick={handleDownloadPDF}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              <div>
                <span className="dl-opt-label">PDF Document</span>
                <span className="dl-opt-sub">Print-ready via browser</span>
              </div>
            </button>
            <button className="dl-option" onClick={handleDownloadPNG}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <div>
                <span className="dl-opt-label">PNG Image</span>
                <span className="dl-opt-sub">Snapshot of the note card</span>
              </div>
            </button>
          </div>
        </div>

        {/* ── Dropdowns ── */}
        <PapersPanel open={openDropdown === "paper"} activePaper={activePaper} onSelect={onSelectPaper} />
        <ColorsPanel open={openDropdown === "color"} activeColor={activeColor} onSelect={onSelectColor} />
        <FontsPanel  open={openDropdown === "font"}  activeFont={activeFont}   onSelect={onSelectFont}  />
      </div>
    </header>
  );
}

function ChevronIcon() {
  return (
    <svg className="chevron-icon" viewBox="0 0 10 6" fill="none" aria-hidden>
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function VolumeIcon({ state }: { state: VolumeState }) {
  if (state === "mute") return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
    </svg>
  );
  if (state === "low") return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    </svg>
  );
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    </svg>
  );
}
