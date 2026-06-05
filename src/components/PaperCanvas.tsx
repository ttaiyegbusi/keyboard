// ─────────────────────────────────────────────────────────────
// src/components/PaperCanvas.tsx
//
// The notepad sits flush on top of the keyboard — no gap.
// It has rounded top corners and its bottom edge merges into
// the keyboard top edge, making them look like one unified piece.
// ─────────────────────────────────────────────────────────────

"use client";

import React, { RefObject } from "react";
import { PaperType, FontId } from "@/types";
import { FONTS } from "@/data/fonts";

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

  return (
    <div
      className={`notepad paper-panel--${activePaper}`}
      onClick={(e) => {
        e.stopPropagation();
        onPanelClick();
        textareaRef.current?.focus();
      }}
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
