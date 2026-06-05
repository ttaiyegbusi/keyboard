// ─────────────────────────────────────────────────────────────
// src/components/PapersPanel.tsx
//
// The floating white dropdown that appears when clicking the
// color chip. Shows all 8 paper options in a 3-column grid.
//
// Props:
//   open        — whether the panel is visible
//   activePaper — currently selected paper id
//   onSelect    — callback when a paper is clicked
// ─────────────────────────────────────────────────────────────

"use client";

import React from "react";
import { PaperType } from "@/types";
import { PAPERS } from "@/data/papers";

interface PapersPanelProps {
  open: boolean;
  activePaper: PaperType;
  onSelect: (paper: PaperType) => void;
}

export function PapersPanel({ open, activePaper, onSelect }: PapersPanelProps) {
  return (
    <div
      className={`papers-panel ${open ? "papers-panel--open" : ""}`}
      role="listbox"
      aria-label="Select paper type"
      /* Stop clicks inside the panel from bubbling to the outside-click handler */
      onClick={(e) => e.stopPropagation()}
    >
      <p className="papers-title">Papers</p>

      <div className="papers-grid">
        {PAPERS.map((paper) => {
          const isActive = paper.id === activePaper;
          return (
            <button
              key={paper.id}
              className={`paper-option ${isActive ? "paper-option--active" : ""}`}
              role="option"
              aria-selected={isActive}
              aria-label={paper.label}
              onClick={() => onSelect(paper.id)}
            >
              {/* Thumbnail */}
              <div className="paper-thumb-wrap">
                <div className="paper-thumb">
                  <div className={`paper-thumb-inner ${paper.thumbClass}`} />
                </div>

                {/* Blue checkmark badge — only visible when active */}
                <div className="check-badge" aria-hidden>
                  <svg viewBox="0 0 12 12" fill="none" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="2,6 5,9 10,3" stroke="white" />
                  </svg>
                </div>
              </div>

              {/* Label */}
              <span className="paper-name-label">{paper.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
