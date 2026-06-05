// ─────────────────────────────────────────────────────────────
// src/components/Keyboard.tsx
//
// Renders the full keyboard. Now accepts activeColor which is
// used to inject CSS variable overrides onto the keyboard shell
// via inline styles — changing the colour theme in real-time.
// ─────────────────────────────────────────────────────────────

"use client";

import React from "react";
import { Key } from "./Key";
import { ROW_FN, ROW_NUMBER, ROW_QWERTY, ROW_HOME, ROW_SHIFT } from "@/data/keyboard";
import { KeyboardColor } from "@/types";
import { KEYBOARD_COLORS } from "@/data/colors";

interface KeyboardProps {
  pressedKeys:  Set<string>;
  shiftActive:  boolean;
  capsLock:     boolean;
  activeColor:  KeyboardColor;
  onKeyPress:   (code: string, char?: string, shiftChar?: string) => void;
}

export function Keyboard({ pressedKeys, shiftActive, capsLock, activeColor, onKeyPress }: KeyboardProps) {
  const isPressed = (code: string) => pressedKeys.has(code);

  // Build inline CSS vars from the active colour theme
  const colorTheme = KEYBOARD_COLORS.find((c) => c.id === activeColor);
  const shellStyle: React.CSSProperties = colorTheme ? {
    ["--kbd-top"  as string]: colorTheme.vars.shellTop,
    ["--kbd-bot"  as string]: colorTheme.vars.shellBot,
    ["--key-top"  as string]: colorTheme.vars.keyTop,
    ["--key-mid"  as string]: colorTheme.vars.keyMid,
    ["--key-bot"  as string]: colorTheme.vars.keyBot,
    ["--key-text" as string]: colorTheme.vars.keyText,
    ["--kbd-border" as string]: colorTheme.vars.keyBorder,
    ["--knob-bg"  as string]: colorTheme.vars.knob,
  } : {};

  return (
    <div className="keyboard-zone">
      <div className="keyboard-body" style={shellStyle}>
        <div className="keyboard-grid">

          {/* Row 1: Function */}
          <div className="key-row">
            {ROW_FN.map((k, i) => (
              <Key key={i} keyDef={k} pressed={k.code ? isPressed(k.code) : false}
                shiftActive={shiftActive} capsLock={capsLock} onPress={onKeyPress} />
            ))}
          </div>

          {/* Row 2: Numbers */}
          <div className="key-row">
            {ROW_NUMBER.map((k, i) => (
              <Key key={i} keyDef={k} pressed={k.code ? isPressed(k.code) : false}
                shiftActive={shiftActive} capsLock={capsLock} onPress={onKeyPress} />
            ))}
          </div>

          {/* Row 3: QWERTY */}
          <div className="key-row">
            {ROW_QWERTY.map((k, i) => (
              <Key key={i} keyDef={k} pressed={k.code ? isPressed(k.code) : false}
                shiftActive={shiftActive} capsLock={capsLock} onPress={onKeyPress} />
            ))}
          </div>

          {/* Row 4: Home */}
          <div className="key-row">
            {ROW_HOME.map((k, i) => (
              <Key key={i} keyDef={k} pressed={k.code ? isPressed(k.code) : false}
                shiftActive={shiftActive} capsLock={capsLock} onPress={onKeyPress} />
            ))}
          </div>

          {/* Row 5: Shift */}
          <div className="key-row">
            {ROW_SHIFT.map((k, i) => (
              <Key key={i} keyDef={k}
                pressed={
                  k.code === "ShiftLeft" || k.code === "ShiftRight"
                    ? shiftActive : k.code ? isPressed(k.code) : false
                }
                shiftActive={shiftActive} capsLock={capsLock} onPress={onKeyPress} />
            ))}
          </div>

          {/* Row 6: Bottom modifier row */}
          <div className="key-row key-row--bottom">

            {/* fn/globe */}
            <div className="key k-mod-sm" onMouseDown={(e) => e.preventDefault()}>
              <div className="fn-globe-wrap">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <span className="mod-fn-label">fn</span>
              </div>
            </div>

            {/* control */}
            <div className={`key k-mod ${isPressed("ControlLeft")||isPressed("ControlRight") ? "key--pressed":""}`}
              onMouseDown={(e) => e.preventDefault()}>
              <span className="mod-sym">^</span>
              <span className="lbl-ml mod-sub">control</span>
            </div>

            {/* option left */}
            <div className={`key k-mod ${isPressed("AltLeft") ? "key--pressed":""}`}
              onMouseDown={(e) => e.preventDefault()}>
              <span className="mod-sym">⌥</span>
              <span className="lbl-ml mod-sub">option</span>
            </div>

            {/* command left */}
            <div className={`key k-mod-sm ${isPressed("MetaLeft") ? "key--pressed":""}`}
              onMouseDown={(e) => e.preventDefault()}>
              <span className="mod-cmd">⌘</span>
            </div>

            {/* Space */}
            <div className={`key k-space ${isPressed("Space") ? "key--pressed":""}`}
              role="button" aria-label="Space"
              onMouseDown={(e) => { e.preventDefault(); onKeyPress("Space", " "); }}
              onTouchStart={(e) => { e.preventDefault(); onKeyPress("Space", " "); }} />

            {/* command right */}
            <div className={`key k-mod-sm ${isPressed("MetaRight") ? "key--pressed":""}`}
              onMouseDown={(e) => e.preventDefault()}>
              <span className="mod-cmd">⌘</span>
            </div>

            {/* option right */}
            <div className={`key k-mod ${isPressed("AltRight") ? "key--pressed":""}`}
              onMouseDown={(e) => e.preventDefault()}>
              <span className="mod-sym">⌥</span>
              <span className="lbl-ml mod-sub">option</span>
            </div>

            {/* Arrow left */}
            <div className={`key k-arrow ${isPressed("ArrowLeft") ? "key--pressed":""}`}
              role="button" aria-label="Arrow left" style={{ alignSelf: "flex-end" }}
              onMouseDown={(e) => { e.preventDefault(); onKeyPress("ArrowLeft"); }}>
              <span className="arr-l">◀</span>
            </div>

            {/* Up + Down */}
            <div className="k-arrow-ud">
              <div className={`key k-arrow ${isPressed("ArrowUp") ? "key--pressed":""}`}
                role="button" aria-label="Arrow up"
                onMouseDown={(e) => { e.preventDefault(); onKeyPress("ArrowUp"); }}>
                <span className="arr-l">▲</span>
              </div>
              <div className={`key k-arrow ${isPressed("ArrowDown") ? "key--pressed":""}`}
                role="button" aria-label="Arrow down"
                onMouseDown={(e) => { e.preventDefault(); onKeyPress("ArrowDown"); }}>
                <span className="arr-l">▼</span>
              </div>
            </div>

            {/* Arrow right */}
            <div className={`key k-arrow ${isPressed("ArrowRight") ? "key--pressed":""}`}
              role="button" aria-label="Arrow right" style={{ alignSelf: "flex-end" }}
              onMouseDown={(e) => { e.preventDefault(); onKeyPress("ArrowRight"); }}>
              <span className="arr-l">▶</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
