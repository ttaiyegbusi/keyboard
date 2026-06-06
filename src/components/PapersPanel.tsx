// ─────────────────────────────────────────────────────────────
// src/components/PapersPanel.tsx
// Dark grid dropdown — "PAPERS" title, 3-col, tall thumbnails.
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
      className={`dropdown-panel papers-panel-dark ${open ? "dropdown-panel--open" : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      <p className="dropdown-title">Papers</p>
      <div className="papers-grid">
        {PAPERS.map((paper) => {
          const isActive = paper.id === activePaper;
          return (
            <button
              key={paper.id}
              className={`paper-option ${isActive ? "paper-option--active" : ""}`}
              aria-label={paper.label}
              aria-pressed={isActive}
              onClick={() => onSelect(paper.id)}
            >
              <div className="paper-thumb-wrap">
                <div className="paper-thumb">
                  <div className={`paper-thumb-inner ${paper.thumbClass}`} />
                </div>
                <div className="check-badge" aria-hidden>
                  <svg viewBox="0 0 12 12" fill="none" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="2,6 5,9 10,3" stroke="white" />
                  </svg>
                </div>
              </div>
              <span className="paper-name-label">{paper.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
