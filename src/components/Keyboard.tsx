// ─────────────────────────────────────────────────────────────
// src/components/Keyboard.tsx
//
// Renders the full keyboard — all 6 rows.
// The bottom modifier row is built inline here because its
// layout (globe icon, stacked arrow keys, etc.) is unique
// and doesn't fit the generic KeyDef pattern cleanly.
//
// Each row imports its definition from src/data/keyboard.ts.
//
// Props:
//   pressedKeys  — Set of key codes currently "pressed" (for glow)
//   shiftActive  — is shift currently held
//   capsLock     — is caps lock on
//   onKeyPress   — handler called on virtual key click
// ─────────────────────────────────────────────────────────────

"use client";

import React from "react";
import { Key } from "./Key";
import {
  ROW_FN,
  ROW_NUMBER,
  ROW_QWERTY,
  ROW_HOME,
  ROW_SHIFT,
} from "@/data/keyboard";

interface KeyboardProps {
  pressedKeys: Set<string>;
  shiftActive: boolean;
  capsLock: boolean;
  onKeyPress: (code: string, char?: string, shiftChar?: string) => void;
}

export function Keyboard({
  pressedKeys,
  shiftActive,
  capsLock,
  onKeyPress,
}: KeyboardProps) {
  /** Helper — is the given code currently pressed */
  const isPressed = (code: string) => pressedKeys.has(code);

  return (
    <div className="keyboard-zone">
      <div className="keyboard-body">
        <div className="keyboard-grid">

          {/* ── Row 1: Function keys ─────────────────────── */}
          <div className="key-row">
            {ROW_FN.map((k, i) => (
              <Key
                key={i}
                keyDef={k}
                pressed={k.code ? isPressed(k.code) : false}
                shiftActive={shiftActive}
                capsLock={capsLock}
                onPress={onKeyPress}
              />
            ))}
          </div>

          {/* ── Row 2: Number row ────────────────────────── */}
          <div className="key-row">
            {ROW_NUMBER.map((k, i) => (
              <Key
                key={i}
                keyDef={k}
                pressed={k.code ? isPressed(k.code) : false}
                shiftActive={shiftActive}
                capsLock={capsLock}
                onPress={onKeyPress}
              />
            ))}
          </div>

          {/* ── Row 3: QWERTY ────────────────────────────── */}
          <div className="key-row">
            {ROW_QWERTY.map((k, i) => (
              <Key
                key={i}
                keyDef={k}
                pressed={k.code ? isPressed(k.code) : false}
                shiftActive={shiftActive}
                capsLock={capsLock}
                onPress={onKeyPress}
              />
            ))}
          </div>

          {/* ── Row 4: Home row ──────────────────────────── */}
          <div className="key-row">
            {ROW_HOME.map((k, i) => (
              <Key
                key={i}
                keyDef={k}
                pressed={k.code ? isPressed(k.code) : false}
                shiftActive={shiftActive}
                capsLock={capsLock}
                onPress={onKeyPress}
              />
            ))}
          </div>

          {/* ── Row 5: Shift row ─────────────────────────── */}
          <div className="key-row">
            {ROW_SHIFT.map((k, i) => (
              <Key
                key={i}
                keyDef={k}
                pressed={
                  k.code === "ShiftLeft" || k.code === "ShiftRight"
                    ? shiftActive
                    : k.code
                    ? isPressed(k.code)
                    : false
                }
                shiftActive={shiftActive}
                capsLock={capsLock}
                onPress={onKeyPress}
              />
            ))}
          </div>

          {/* ── Row 6: Bottom modifier row (inline) ──────── */}
          <div className="key-row key-row--bottom">

            {/* fn / globe */}
            <div
              className={`key k-mod-sm ${isPressed("Fn") ? "key--pressed" : ""}`}
              role="button"
              tabIndex={-1}
              onMouseDown={(e) => e.preventDefault()}
            >
              <div className="fn-globe-wrap">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6e7078" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <span className="mod-fn-label">fn</span>
              </div>
            </div>

            {/* control */}
            <div
              className={`key k-mod ${isPressed("ControlLeft") || isPressed("ControlRight") ? "key--pressed" : ""}`}
              role="button"
              tabIndex={-1}
              onMouseDown={(e) => e.preventDefault()}
            >
              <span className="mod-sym">^</span>
              <span className="lbl-ml mod-sub">control</span>
            </div>

            {/* option left */}
            <div
              className={`key k-mod ${isPressed("AltLeft") ? "key--pressed" : ""}`}
              role="button"
              tabIndex={-1}
              onMouseDown={(e) => e.preventDefault()}
            >
              <span className="mod-sym">⌥</span>
              <span className="lbl-ml mod-sub">option</span>
            </div>

            {/* command left */}
            <div
              className={`key k-mod-sm ${isPressed("MetaLeft") ? "key--pressed" : ""}`}
              role="button"
              tabIndex={-1}
              onMouseDown={(e) => e.preventDefault()}
            >
              <span className="mod-cmd">⌘</span>
            </div>

            {/* Spacebar */}
            <div
              className={`key k-space ${isPressed("Space") ? "key--pressed" : ""}`}
              role="button"
              aria-label="Space"
              tabIndex={-1}
              onMouseDown={(e) => {
                e.preventDefault();
                onKeyPress("Space", " ");
              }}
              onTouchStart={(e) => {
                e.preventDefault();
                onKeyPress("Space", " ");
              }}
            />

            {/* command right */}
            <div
              className={`key k-mod-sm ${isPressed("MetaRight") ? "key--pressed" : ""}`}
              role="button"
              tabIndex={-1}
              onMouseDown={(e) => e.preventDefault()}
            >
              <span className="mod-cmd">⌘</span>
            </div>

            {/* option right */}
            <div
              className={`key k-mod ${isPressed("AltRight") ? "key--pressed" : ""}`}
              role="button"
              tabIndex={-1}
              onMouseDown={(e) => e.preventDefault()}
            >
              <span className="mod-sym">⌥</span>
              <span className="lbl-ml mod-sub">option</span>
            </div>

            {/* ── Arrow cluster ───────────────────────────── */}
            {/* Left arrow */}
            <div
              className={`key k-arrow ${isPressed("ArrowLeft") ? "key--pressed" : ""}`}
              role="button"
              aria-label="Arrow left"
              tabIndex={-1}
              style={{ alignSelf: "flex-end" }}
              onMouseDown={(e) => {
                e.preventDefault();
                onKeyPress("ArrowLeft");
              }}
            >
              <span className="arr-l">◀</span>
            </div>

            {/* Up + Down stacked */}
            <div className="k-arrow-ud">
              <div
                className={`key k-arrow ${isPressed("ArrowUp") ? "key--pressed" : ""}`}
                role="button"
                aria-label="Arrow up"
                tabIndex={-1}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onKeyPress("ArrowUp");
                }}
              >
                <span className="arr-l">▲</span>
              </div>
              <div
                className={`key k-arrow ${isPressed("ArrowDown") ? "key--pressed" : ""}`}
                role="button"
                aria-label="Arrow down"
                tabIndex={-1}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onKeyPress("ArrowDown");
                }}
              >
                <span className="arr-l">▼</span>
              </div>
            </div>

            {/* Right arrow */}
            <div
              className={`key k-arrow ${isPressed("ArrowRight") ? "key--pressed" : ""}`}
              role="button"
              aria-label="Arrow right"
              tabIndex={-1}
              style={{ alignSelf: "flex-end" }}
              onMouseDown={(e) => {
                e.preventDefault();
                onKeyPress("ArrowRight");
              }}
            >
              <span className="arr-l">▶</span>
            </div>

          </div>{/* /Row 6 */}

        </div>{/* /keyboard-grid */}
      </div>{/* /keyboard-body */}
    </div>
  );
}
