// ─────────────────────────────────────────────────────────────
// src/components/Key.tsx
// Light mode. White keys, dark text.
// Touch ID = square key with circular sensor inset.
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
  const {
    type, code, char, shift, label, labelAlign,
    sizeClass, fnLabel, fnIcon, homing, isShift, isCaps, isLetter,
  } = keyDef;

  const classes = [
    "key", sizeClass,
    pressed  ? "key--pressed" : "",
    homing   ? "key--homing"  : "",
    isShift  ? "key--shift"   : "",
    isCaps   ? "key--caps"    : "",
  ].filter(Boolean).join(" ");

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (code) onPress(code, char, shift);
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    if (code) onPress(code, char, shift);
  };

  // ── Touch ID — square key with circular sensor ─────────────
  if (type === "touchid") {
    return (
      <div className="k-knob-w" aria-label="Touch ID" title="Touch ID">
        <div className="knob" />
      </div>
    );
  }

  // ── Old knob (fallback) ─────────────────────────────────────
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
      aria-label={label ?? (shift ?? char) ?? code}
      tabIndex={-1}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Fn key: icon + number */}
      {type === "fn" && (
        <div className="lbl-fn">
          {fnIcon && (
            <span className="fn-ic" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d={fnIcon} />
              </svg>
            </span>
          )}
          <span className="fn-n">{fnLabel}</span>
        </div>
      )}

      {/* Letter key — single centred uppercase */}
      {type === "char" && isLetter && shift && (
        <span className="lbl-c">{shift}</span>
      )}

      {/* Symbol key — stacked */}
      {type === "char" && !isLetter && char && shift && (
        <div className="lbl-st">
          <span className="s-top">{shift}</span>
          <span className="s-bot">{char}</span>
        </div>
      )}

      {/* Special key */}
      {type === "special" && label && (
        <>
          {labelAlign === "left"   && <span className="lbl-ml">{label}</span>}
          {labelAlign === "right"  && <span className="lbl-mr">{label}</span>}
          {labelAlign === "center" && <span className="lbl-c">{label}</span>}
          {isCaps && <span className="caps-dot" aria-hidden />}
        </>
      )}
    </div>
  );
}
