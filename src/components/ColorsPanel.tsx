// ─────────────────────────────────────────────────────────────
// src/components/ColorsPanel.tsx
//
// Dropdown for keyboard colour themes.
// Shows a grid of Apple-inspired colour swatches.
// Selecting one injects CSS variable overrides onto the keyboard
// shell via inline styles (handled in Keyboard.tsx).
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
      <p className="dropdown-title">Keyboard Color</p>

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
              {/* Color circle swatch */}
              <div
                className="color-swatch-circle"
                style={{ background: c.swatch }}
              >
                {/* Checkmark when active */}
                {isActive && (
                  <svg className="color-check" viewBox="0 0 12 12" fill="none" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="2,6 5,9 10,3" stroke="white" />
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
