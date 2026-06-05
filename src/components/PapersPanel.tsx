// ─────────────────────────────────────────────────────────────
// src/components/PapersPanel.tsx
//
// Paper picker dropdown — now dark-themed to match the app.
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
      className={`dropdown-panel ${open ? "dropdown-panel--open" : ""}`}
      role="listbox"
      aria-label="Select paper type"
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
              role="option"
              aria-selected={isActive}
              aria-label={paper.label}
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
