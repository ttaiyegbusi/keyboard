// ─────────────────────────────────────────────────────────────
// src/components/PaperCanvas.tsx
//
// The large writing surface. Now also accepts activeFont so
// the textarea font updates when the user picks a new font.
// ─────────────────────────────────────────────────────────────

"use client";

import React, { RefObject } from "react";
import { PaperType, FontId } from "@/types";
import { FONTS } from "@/data/fonts";

interface PaperCanvasProps {
  activePaper: PaperType;
  activeFont:  FontId;
  textareaRef: RefObject<HTMLTextAreaElement>;
  onPanelClick: () => void;
}

export function PaperCanvas({ activePaper, activeFont, textareaRef, onPanelClick }: PaperCanvasProps) {
  // Look up font-family string for the chosen font
  const fontFamily = FONTS.find((f) => f.id === activeFont)?.family ?? "inherit";

  return (
    <div
      className={`paper-panel paper-panel--${activePaper}`}
      onClick={(e) => { e.stopPropagation(); onPanelClick(); textareaRef.current?.focus(); }}
    >
      <textarea
        ref={textareaRef}
        className="paper-textarea"
        placeholder="Start typing…"
        spellCheck
        autoComplete="off"
        // Override font-family inline — overrides the per-paper CSS default
        style={{ fontFamily }}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
