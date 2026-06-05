// ─────────────────────────────────────────────────────────────
// src/components/Keyboard.tsx
//
// Injects the full colour theme as CSS custom properties onto
// the keyboard shell. Every label class reads from these vars,
// so all text/icon colours update automatically per theme.
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

  const theme = KEYBOARD_COLORS.find((c) => c.id === activeColor);

  // Inject every design token as a CSS custom property on the shell.
  // Child elements use var(--key-text), var(--key-text-sub), etc.
  const shellStyle: React.CSSProperties = theme ? {
    ["--kbd-top"         as string]: theme.vars.shellTop,
    ["--kbd-bot"         as string]: theme.vars.shellBot,
    ["--key-top"         as string]: theme.vars.keyTop,
    ["--key-mid"         as string]: theme.vars.keyMid,
    ["--key-bot"         as string]: theme.vars.keyBot,
    ["--key-text"        as string]: theme.vars.keyText,
    ["--key-text-sub"    as string]: theme.vars.keyTextSub,
    ["--kbd-border"      as string]: theme.vars.keyBorder,
    ["--key-highlight"   as string]: theme.vars.keyHighlight,
    ["--key-shadow"      as string]: theme.vars.keyShadow,
    ["--key-drop-shadow" as string]: theme.vars.dropShadow,
    ["--knob-bg"         as string]: theme.vars.knob,
  } : {};

  return (
    <div className="keyboard-zone">
      <div className="keyboard-body" style={shellStyle}>
        <div className="keyboard-grid">

          <div className="key-row">
            {ROW_FN.map((k, i) => (
              <Key key={i} keyDef={k} pressed={k.code ? isPressed(k.code) : false}
                shiftActive={shiftActive} capsLock={capsLock} onPress={onKeyPress} />
            ))}
          </div>

          <div className="key-row">
            {ROW_NUMBER.map((k, i) => (
              <Key key={i} keyDef={k} pressed={k.code ? isPressed(k.code) : false}
                shiftActive={shiftActive} capsLock={capsLock} onPress={onKeyPress} />
            ))}
          </div>

          <div className="key-row">
            {ROW_QWERTY.map((k, i) => (
              <Key key={i} keyDef={k} pressed={k.code ? isPressed(k.code) : false}
                shiftActive={shiftActive} capsLock={capsLock} onPress={onKeyPress} />
            ))}
          </div>

          <div className="key-row">
            {ROW_HOME.map((k, i) => (
              <Key key={i} keyDef={k} pressed={k.code ? isPressed(k.code) : false}
                shiftActive={shiftActive} capsLock={capsLock} onPress={onKeyPress} />
            ))}
          </div>

          <div className="key-row">
            {ROW_SHIFT.map((k, i) => (
              <Key key={i} keyDef={k}
                pressed={k.code === "ShiftLeft" || k.code === "ShiftRight"
                  ? shiftActive : k.code ? isPressed(k.code) : false}
                shiftActive={shiftActive} capsLock={capsLock} onPress={onKeyPress} />
            ))}
          </div>

          {/* Row 6: Bottom modifiers */}
          <div className="key-row key-row--bottom">

            <div className="key k-mod-sm" onMouseDown={(e) => e.preventDefault()}>
              <div className="fn-globe-wrap">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <span className="mod-fn-label">fn</span>
              </div>
            </div>

            <div className={`key k-mod ${isPressed("ControlLeft")||isPressed("ControlRight") ? "key--pressed":""}`}
              onMouseDown={(e) => e.preventDefault()}>
              <span className="mod-sym">^</span>
              <span className="lbl-ml mod-sub">control</span>
            </div>

            <div className={`key k-mod ${isPressed("AltLeft") ? "key--pressed":""}`}
              onMouseDown={(e) => e.preventDefault()}>
              <span className="mod-sym">⌥</span>
              <span className="lbl-ml mod-sub">option</span>
            </div>

            <div className={`key k-mod-sm ${isPressed("MetaLeft") ? "key--pressed":""}`}
              onMouseDown={(e) => e.preventDefault()}>
              <span className="mod-cmd">⌘</span>
            </div>

            <div className={`key k-space ${isPressed("Space") ? "key--pressed":""}`}
              role="button" aria-label="Space"
              onMouseDown={(e) => { e.preventDefault(); onKeyPress("Space", " "); }}
              onTouchStart={(e) => { e.preventDefault(); onKeyPress("Space", " "); }} />

            <div className={`key k-mod-sm ${isPressed("MetaRight") ? "key--pressed":""}`}
              onMouseDown={(e) => e.preventDefault()}>
              <span className="mod-cmd">⌘</span>
            </div>

            <div className={`key k-mod ${isPressed("AltRight") ? "key--pressed":""}`}
              onMouseDown={(e) => e.preventDefault()}>
              <span className="mod-sym">⌥</span>
              <span className="lbl-ml mod-sub">option</span>
            </div>

            <div className={`key k-arrow ${isPressed("ArrowLeft") ? "key--pressed":""}`}
              role="button" aria-label="Arrow left" style={{ alignSelf: "flex-end" }}
              onMouseDown={(e) => { e.preventDefault(); onKeyPress("ArrowLeft"); }}>
              <span className="arr-l">◀</span>
            </div>

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
