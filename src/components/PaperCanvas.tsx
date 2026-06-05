// ─────────────────────────────────────────────────────────────
// src/components/PaperCanvas.tsx
//
// The large centre-stage paper panel that sits behind the
// keyboard. This is where typed text appears.
//
// The paper's visual style (background texture, font, colour)
// is driven entirely by the `activePaper` CSS class applied to
// the wrapper div — all visual rules live in globals.css under
// the "PAPER BACKGROUNDS" and "PAPER TYPOGRAPHY" sections.
//
// Props:
//   activePaper  — current paper type id (becomes a CSS class)
//   textareaRef  — forwarded ref so the parent can focus/read it
//   onPanelClick — closes the papers dropdown when scene is clicked
// ─────────────────────────────────────────────────────────────

"use client";

import React, { RefObject } from "react";
import { PaperType } from "@/types";

interface PaperCanvasProps {
  activePaper: PaperType;
  textareaRef: RefObject<HTMLTextAreaElement>;
  onPanelClick: () => void;
}

export function PaperCanvas({
  activePaper,
  textareaRef,
  onPanelClick,
}: PaperCanvasProps) {
  return (
    <div
      className={`paper-panel paper-panel--${activePaper}`}
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
        /* Prevent the textarea from stealing click events away from the panel */
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
