// ─────────────────────────────────────────────────────────────
// src/components/PaperCanvas.tsx
// Paper color is now driven by customPaperColor from the picker.
// The paper-panel--{type} class still handles ruled lines etc.
// ─────────────────────────────────────────────────────────────

"use client";

import React, { RefObject } from "react";
import { PaperType, FontId } from "@/types";
import { FONTS } from "@/data/fonts";

interface PaperCanvasProps {
  activePaper:      PaperType;
  activeFont:       FontId;
  textareaRef:      RefObject<HTMLTextAreaElement>;
  onPanelClick:     () => void;
  customPaperColor: string;
}

export function PaperCanvas({
  activePaper, activeFont, textareaRef, onPanelClick, customPaperColor,
}: PaperCanvasProps) {
  const fontFamily = FONTS.find((f) => f.id === activeFont)?.family ?? "inherit";

  return (
    <div
      className={`notepad paper-panel--${activePaper}`}
      style={{ backgroundColor: customPaperColor }}
      onClick={(e) => { e.stopPropagation(); onPanelClick(); textareaRef.current?.focus(); }}
    >
      <textarea
        ref={textareaRef}
        className="paper-textarea"
        placeholder="Start typing…"
        spellCheck autoComplete="off"
        style={{ fontFamily }}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
