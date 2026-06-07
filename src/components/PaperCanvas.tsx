// ─────────────────────────────────────────────────────────────
// src/components/PaperCanvas.tsx
//
// The paper's background color comes from the selected paper's
// swatchColor — NOT from a separate custom color state.
// This ensures selecting "A4 White" actually shows white, etc.
// The CSS class handles the texture (lines, dots, grain).
// The inline style handles the background color.
// ─────────────────────────────────────────────────────────────

"use client";

import React, { RefObject } from "react";
import { PaperType, FontId } from "@/types";
import { FONTS }  from "@/data/fonts";
import { PAPERS } from "@/data/papers";

interface PaperCanvasProps {
  activePaper:  PaperType;
  activeFont:   FontId;
  textareaRef:  RefObject<HTMLTextAreaElement>;
  onPanelClick: () => void;
}

export function PaperCanvas({
  activePaper, activeFont, textareaRef, onPanelClick,
}: PaperCanvasProps) {
  const fontFamily = FONTS.find((f) => f.id === activeFont)?.family ?? "inherit";
  // Sync background color from the paper definition — not a separate picker
  const bgColor = PAPERS.find((p) => p.id === activePaper)?.swatchColor ?? "#f5edd6";

  return (
    <div
      className={`notepad paper-panel--${activePaper}`}
      style={{ backgroundColor: bgColor }}
      onClick={(e) => { e.stopPropagation(); onPanelClick(); textareaRef.current?.focus(); }}
    >
      <textarea
        ref={textareaRef}
        className="paper-textarea"
        placeholder="Start typing…"
        spellCheck
        autoComplete="off"
        style={{ fontFamily }}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
