// ─────────────────────────────────────────────────────────────
// src/components/Key.tsx
//
// Renders a single keyboard key. Handles:
//   - "char" keys  → stacked top/bottom symbol labels
//   - "fn" keys    → icon above + Fn number below
//   - "special"    → text label aligned left or right
//   - "knob"       → circular dial (decorative)
//
// The `pressed` prop adds a .key--pressed class which
// triggers the visual press animation via CSS.
//
// The `shiftActive` / `capsLock` props are passed down so
// letter keys can visually show uppercase when shift is on
// (optional enhancement — currently labels are always shown
// as uppercase letters per real keyboard convention).
// ─────────────────────────────────────────────────────────────

"use client";

import React from "react";
import { KeyDef } from "@/data/keyboard";

interface KeyProps {
  keyDef: KeyDef;
  pressed: boolean;
  shiftActive: boolean;
  capsLock: boolean;
  onPress: (code: string, char?: string, shiftChar?: string) => void;
}

export function Key({ keyDef, pressed, onPress }: KeyProps) {
  const { type, code, char, shift, label, labelAlign, sizeClass, fnLabel, fnIcon, homing, isShift, isCaps } = keyDef;

  // Build CSS class list for the key element
  const classes = [
    "key",
    sizeClass,
    pressed   ? "key--pressed"  : "",
    homing    ? "key--homing"   : "",
    isShift   ? "key--shift"    : "",
    isCaps    ? "key--caps"     : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleMouseDown = (e: React.MouseEvent) => {
    // Prevent losing focus on the textarea
    e.preventDefault();
    if (code) onPress(code, char, shift);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    if (code) onPress(code, char, shift);
  };

  // ── Knob (decorative dial) ───────────────────────────────────
  if (type === "knob") {
    return (
      <div className="k-knob-w" aria-hidden>
        <div className="knob" />
      </div>
    );
  }

  return (
    <div
      className={classes}
      role="button"
      aria-label={label ?? char ?? code}
      tabIndex={-1}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* ── Function key: icon + label ─────────────────────── */}
      {type === "fn" && (
        <div className="lbl-fn">
          {fnIcon && (
            <span className="fn-ic" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d={fnIcon} />
              </svg>
            </span>
          )}
          <span className="fn-n">{fnLabel}</span>
        </div>
      )}

      {/* ── Character key: stacked symbols ────────────────── */}
      {type === "char" && char && shift && (
        <div className="lbl-st">
          <span className="s-top">{shift}</span>
          <span className="s-bot">{char === " " ? "" : char}</span>
        </div>
      )}

      {/* ── Character key: single char (space) ────────────── */}
      {type === "char" && char === " " && null}

      {/* ── Special key: text label ───────────────────────── */}
      {type === "special" && label && (
        <>
          {labelAlign === "left"  && <span className="lbl-ml">{label}</span>}
          {labelAlign === "right" && <span className="lbl-mr">{label}</span>}
          {labelAlign === "center" && <span className="lbl-c">{label}</span>}

          {/* Caps lock indicator dot */}
          {isCaps && <span className="caps-dot" aria-hidden />}
        </>
      )}
    </div>
  );
}
