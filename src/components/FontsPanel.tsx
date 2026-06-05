// ─────────────────────────────────────────────────────────────
// src/components/FontsPanel.tsx
//
// Dropdown for choosing the writing font on the paper.
// Each option shows the font name rendered in itself + a
// short description tag.
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

// Style tag colours per font style category
const styleTagColor: Record<string, string> = {
  typewriter: "#a0783a",
  sans:       "#3a6898",
  mono:       "#3a8058",
  serif:      "#703a98",
  script:     "#983a5a",
};

export function FontsPanel({ open, activeFont, onSelect }: FontsPanelProps) {
  return (
    <div
      className={`dropdown-panel dropdown-panel--fonts ${open ? "dropdown-panel--open" : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      <p className="dropdown-title">Writing Font</p>

      <div className="fonts-list">
        {FONTS.map((f) => {
          const isActive = f.id === activeFont;
          return (
            <button
              key={f.id}
              className={`font-option ${isActive ? "font-option--active" : ""}`}
              aria-label={f.label}
              aria-pressed={isActive}
              onClick={() => onSelect(f.id)}
            >
              {/* Left: font name rendered in itself */}
              <div className="font-preview" style={{ fontFamily: f.family }}>
                {f.label}
              </div>

              {/* Right: description + style tag */}
              <div className="font-meta">
                <span className="font-desc">{f.description}</span>
                <span
                  className="font-tag"
                  style={{ background: styleTagColor[f.style] + "22", color: styleTagColor[f.style] }}
                >
                  {f.style}
                </span>
              </div>

              {/* Active check */}
              {isActive && (
                <svg className="font-check" viewBox="0 0 12 12" fill="none" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="2,6 5,9 10,3" stroke="#3b82f6" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
