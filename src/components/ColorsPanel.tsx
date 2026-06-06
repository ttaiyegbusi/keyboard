// ─────────────────────────────────────────────────────────────
// src/components/ColorsPanel.tsx
// Light mode colour grid — shadcn popover style.
// Shows shell colours only — label says "Keyboard Frame".
// ─────────────────────────────────────────────────────────────

"use client";

import React from "react";
import { KeyboardColor } from "@/types";
import { KEYBOARD_COLORS } from "@/data/colors";

interface ColorsPanelProps {
  open: boolean;
  activeColor: KeyboardColor;
  onSelect: (color: KeyboardColor) => void;
}

export function ColorsPanel({ open, activeColor, onSelect }: ColorsPanelProps) {
  return (
    <div
      className={`dropdown-panel ${open ? "dropdown-panel--open" : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      <p className="dropdown-title">Keyboard Frame</p>
      <div className="colors-grid">
        {KEYBOARD_COLORS.map((c) => {
          const isActive = c.id === activeColor;
          return (
            <button
              key={c.id}
              className={`color-option ${isActive ? "color-option--active" : ""}`}
              aria-label={c.label}
              aria-pressed={isActive}
              onClick={() => onSelect(c.id)}
            >
              <div className="color-swatch-circle" style={{ background: c.swatch }}>
                {isActive && (
                  <svg className="color-check" viewBox="0 0 14 14" fill="none"
                    strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="2,7 6,11 12,3" stroke="white" />
                  </svg>
                )}
              </div>
              <span className="color-label">{c.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
