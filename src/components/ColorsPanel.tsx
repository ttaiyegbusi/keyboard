// ─────────────────────────────────────────────────────────────
// src/components/ColorsPanel.tsx
//
// The 7 Apple iMac aluminum finish colours.
// Large round swatches, name below, active = white ring + blue glow.
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
              {/* Swatch — the anodized aluminum circle */}
              <div
                className="color-swatch-circle"
                style={{
                  /* Gradient mimics the 2-stop anodized look */
                  background: `linear-gradient(145deg, ${c.vars.shellTop} 0%, ${c.vars.shellBot} 100%)`,
                }}
              >
                {isActive && (
                  <svg
                    className="color-check"
                    viewBox="0 0 16 16"
                    fill="none"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3,8 7,12 13,4" stroke="white" />
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
