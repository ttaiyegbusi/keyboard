// ─────────────────────────────────────────────────────────────
// src/components/Topbar.tsx
//
// 1200px wide transparent header with:
//  - Paper color picker (HSB gradient + hex + swatches) — dark
//  - Keyboard color dot grid — dark
//  - Font list (each in its own font) — dark
//  - Volume toggle
//  - Retry icon (clears note)
//  - Download blue pill button → PNG / PDF — dark dropdown
// ─────────────────────────────────────────────────────────────

"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { ColorsPanel } from "./ColorsPanel";
import { FontsPanel }  from "./FontsPanel";
import { PapersPanel } from "./PapersPanel";
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
  // Custom paper color picked via color picker
  customPaperColor: string;
  onCustomPaperColor: (hex: string) => void;
}

// ── Recommended swatches shown in the color picker ──────────
const SWATCHES = [
  "#f5edd6","#f2f2f2","#9e5e28","#c9a55a","#ae7638",
  "#e6ddb8","#f7f8ff","#fff0f5","#1a1a2e","#2d4a3e",
];

// ── Dark color picker panel ──────────────────────────────────
function ColorPickerPanel({
  open, color, onChange, onClose,
}: { open: boolean; color: string; onChange: (hex: string) => void; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hue, setHue] = useState(45);
  const [hex, setHex] = useState(color.replace("#",""));
  const [pickerPos, setPickerPos] = useState({ x: 80, y: 180 });
  const dragging = useRef(false);

  // Draw the SB gradient canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;
    // White → hue gradient (left→right)
    const hueGrad = ctx.createLinearGradient(0, 0, w, 0);
    hueGrad.addColorStop(0, "white");
    hueGrad.addColorStop(1, `hsl(${hue},100%,50%)`);
    ctx.fillStyle = hueGrad;
    ctx.fillRect(0, 0, w, h);
    // Transparent → black gradient (top→bottom)
    const darkGrad = ctx.createLinearGradient(0, 0, 0, h);
    darkGrad.addColorStop(0, "rgba(0,0,0,0)");
    darkGrad.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = darkGrad;
    ctx.fillRect(0, 0, w, h);
  }, [hue]);

  const pickFromCanvas = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    setPickerPos({ x, y });
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const pixel = ctx.getImageData(x * scaleX, y * scaleY, 1, 1).data;
    const h = pixel[0].toString(16).padStart(2,"0")
            + pixel[1].toString(16).padStart(2,"0")
            + pixel[2].toString(16).padStart(2,"0");
    setHex(h);
    onChange("#" + h);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChange]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    dragging.current = true;
    pickFromCanvas(e);
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (dragging.current) pickFromCanvas(e);
  };
  const handleMouseUp = () => { dragging.current = false; };

  return (
    <div
      className={`dropdown-panel picker-panel ${open ? "dropdown-panel--open" : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      <p className="dropdown-title">Paper Color</p>

      {/* SB Canvas */}
      <canvas
        ref={canvasRef} width={220} height={180}
        className="picker-canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      {/* Crosshair */}
      <div className="picker-crosshair" style={{ left: pickerPos.x - 7, top: 38 + pickerPos.y - 7 }} />

      {/* Hue slider */}
      <div className="picker-row">
        <input
          type="range" min={0} max={360} value={hue}
          className="hue-slider"
          onChange={(e) => setHue(Number(e.target.value))}
        />
      </div>

      {/* Hex input */}
      <div className="picker-hex-row">
        <span className="picker-hex-label">Hex</span>
        <input
          className="picker-hex-input"
          value={hex}
          maxLength={6}
          onChange={(e) => {
            const v = e.target.value.replace(/[^0-9a-fA-F]/g,"");
            setHex(v);
            if (v.length === 6) onChange("#" + v);
          }}
        />
      </div>

      {/* Recommended swatches */}
      <p className="picker-swatch-label">Recommended</p>
      <div className="picker-swatches">
        {SWATCHES.map((s) => (
          <button
            key={s}
            className="picker-swatch"
            style={{ background: s }}
            onClick={() => { setHex(s.replace("#","")); onChange(s); }}
            aria-label={s}
          />
        ))}
      </div>
    </div>
  );
}

// ── Main Topbar ──────────────────────────────────────────────
export function Topbar({
  activePaper, activeColor, activeFont, volume, openDropdown,
  textareaRef,
  onPaperChipClick, onColorDotClick, onFontLabelClick,
  onDownloadClick, onVolumeClick,
  onSelectPaper, onSelectColor, onSelectFont,
  closeDropdowns,
  customPaperColor, onCustomPaperColor,
}: TopbarProps) {
  const colorSwatch = KEYBOARD_COLORS.find((c) => c.id === activeColor)?.swatch ?? "#3a3c42";
  const fontLabel   = FONTS.find((f) => f.id === activeFont)?.label ?? "Font";
  const paperSwatch = PAPERS.find((p) => p.id === activePaper)?.swatchColor ?? customPaperColor;

  // ── Retry: clear the note ────────────────────────────────
  const handleRetry = () => {
    if (textareaRef.current) {
      textareaRef.current.value = "";
      textareaRef.current.focus();
    }
    closeDropdowns();
  };

  // ── Download PNG ─────────────────────────────────────────
  const handleDownloadPNG = () => {
    closeDropdowns();
    const el = document.querySelector(".notepad") as HTMLElement;
    if (!el) return;
    if ((window as unknown as Record<string, unknown>).html2canvas) {
      // @ts-expect-error global
      window.html2canvas(el, { scale: 2, useCORS: true, backgroundColor: null }).then((canvas: HTMLCanvasElement) => {
        const link = document.createElement("a");
        link.download = `tta-note-${Date.now()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    } else {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
      document.head.appendChild(script);
      script.onload = () => {
        // @ts-expect-error global
        window.html2canvas(el, { scale: 2, useCORS: true, backgroundColor: null }).then((canvas: HTMLCanvasElement) => {
          const link = document.createElement("a");
          link.download = `tta-note-${Date.now()}.png`;
          link.href = canvas.toDataURL("image/png");
          link.click();
        });
      };
    }
  };

  // ── Download PDF ─────────────────────────────────────────
  const handleDownloadPDF = () => {
    closeDropdowns();
    const text = textareaRef.current?.value ?? "";
    if (!text.trim()) { alert("Write something first!"); return; }
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`<!DOCTYPE html><html><head><title>tta note</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:${customPaperColor};font-family:'Special Elite',serif;padding:60px;min-height:100vh;color:#2a1f0e;}
        pre{white-space:pre-wrap;word-wrap:break-word;font-family:inherit;font-size:16px;line-height:1.8;}
        @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact;}}
      </style></head><body>
      <pre>${(textareaRef.current?.value ?? "").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</pre>
      <script>window.onload=()=>window.print();<\/script>
      </body></html>`);
    win.document.close();
  };

  return (
    <header className="topbar" onClick={(e) => e.stopPropagation()}>
      {/* Brand */}
      <div className="brand">
        <span className="brand-dot" />
        <span>tta</span>
      </div>

      {/* Toolbar */}
      <div className="toolbar">

        {/* 1. Paper picker — opens the Papers grid (Image 2) */}
        <div className="tb-dd-wrap">
          <button
            className={`tb-btn chip-btn ${openDropdown === "paper" ? "tb-btn--active" : ""}`}
            aria-label="Paper style" onClick={onPaperChipClick}
          >
            <span className="chip-swatch" style={{ background: paperSwatch }} />
            <ChevronIcon />
          </button>
          <PapersPanel
            open={openDropdown === "paper"}
            activePaper={activePaper}
            onSelect={onSelectPaper}
          />
        </div>

        <div className="tb-divider" />

        {/* 2. Keyboard color dot */}
        <div className="tb-dd-wrap">
          <button
            className={`tb-btn chip-btn ${openDropdown === "color" ? "tb-btn--active" : ""}`}
            aria-label="Keyboard color" onClick={onColorDotClick}
          >
            <span className="color-dot" style={{ background: colorSwatch }} />
            <ChevronIcon />
          </button>
          <ColorsPanel open={openDropdown === "color"} activeColor={activeColor} onSelect={onSelectColor} />
        </div>

        <div className="tb-divider" />

        {/* 3. Font selector */}
        <div className="tb-dd-wrap">
          <button
            className={`tb-btn tb-label ${openDropdown === "font" ? "tb-btn--active" : ""}`}
            aria-label="Font" onClick={onFontLabelClick}
          >
            {fontLabel} <ChevronIcon />
          </button>
          <FontsPanel open={openDropdown === "font"} activeFont={activeFont} onSelect={onSelectFont} />
        </div>

        <div className="tb-divider" />

        {/* 4. Volume */}
        <button className="tb-btn tb-icon-btn" aria-label={`Volume: ${volume}`} onClick={onVolumeClick}>
          <VolumeIcon state={volume} />
        </button>

        {/* 5. Retry — clears the note */}
        <button className="tb-btn tb-icon-btn" aria-label="Clear note" title="Clear note" onClick={handleRetry}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10"/>
            <path d="M3.51 15a9 9 0 1 0 .49-4.5"/>
          </svg>
        </button>

        <div className="tb-divider" />

        {/* 6. Download — blue pill */}
        <div className="tb-dd-wrap">
          <button
            className={`dl-pill ${openDropdown === "download" ? "dl-pill--open" : ""}`}
            aria-label="Download" onClick={onDownloadClick}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download
            <ChevronIcon />
          </button>

          {/* Download dropdown — dark */}
          <div className={`dropdown-panel dl-panel ${openDropdown === "download" ? "dropdown-panel--open" : ""}`}
            onClick={(e) => e.stopPropagation()}>
            <p className="dropdown-title">Export As</p>

            <button className="dl-option" onClick={handleDownloadPNG}>
              <span className="dl-opt-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </span>
              <span className="dl-opt-text">Image</span>
              <span className="dl-opt-type">PNG</span>
            </button>

            <button className="dl-option" onClick={handleDownloadPDF}>
              <span className="dl-opt-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="9" y1="13" x2="15" y2="13"/>
                  <line x1="9" y1="17" x2="12" y2="17"/>
                </svg>
              </span>
              <span className="dl-opt-text">Document</span>
              <span className="dl-opt-type">PDF</span>
            </button>
          </div>
        </div>

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
