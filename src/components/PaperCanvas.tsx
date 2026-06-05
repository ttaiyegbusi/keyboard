// ─────────────────────────────────────────────────────────────
// src/components/PaperCanvas.tsx
//
// Small floating notepad card — positioned above the keyboard.
// Has a 3D CSS perspective tilt so you see its top face and
// a subtle bottom edge (like a card lying on a desk).
//
// The card is compact — like a physical notepad, not a full panel.
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
  activePaper,
  activeFont,
  textareaRef,
  onPanelClick,
}: PaperCanvasProps) {
  const fontFamily = FONTS.find((f) => f.id === activeFont)?.family ?? "inherit";

  return (
    /* 3D scene wrapper — establishes perspective */
    <div className="notepad-scene">
      <div
        className={`notepad paper-panel--${activePaper}`}
        onClick={(e) => {
          e.stopPropagation();
          onPanelClick();
          textareaRef.current?.focus();
        }}
      >
        {/* Subtle top spiral binding decoration */}
        <div className="notepad-binding" aria-hidden>
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="binding-ring" />
          ))}
        </div>

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
    </div>
  );
}
