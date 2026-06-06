// ─────────────────────────────────────────────────────────────
// src/components/FontsPanel.tsx
// Light mode font list — each row in its own font, blue active.
// ─────────────────────────────────────────────────────────────

"use client";

import React from "react";
import { FontId } from "@/types";
import { FONTS } from "@/data/fonts";

interface FontsPanelProps {
  open: boolean;
  activeFont: FontId;
  onSelect: (font: FontId) => void;
}

export function FontsPanel({ open, activeFont, onSelect }: FontsPanelProps) {
  return (
    <div
      className={`dropdown-panel dropdown-panel--fonts ${open ? "dropdown-panel--open" : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      {FONTS.map((f) => {
        const isActive = f.id === activeFont;
        return (
          <button
            key={f.id}
            className={`font-row ${isActive ? "font-row--active" : ""}`}
            onClick={() => onSelect(f.id)}
            aria-pressed={isActive}
          >
            <span className="font-row-name" style={{ fontFamily: f.family }}>
              {f.label}
            </span>
            {isActive && (
              <svg className="font-row-check" viewBox="0 0 14 14" fill="none"
                strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="2,7 6,11 12,3" stroke="white" />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
}
