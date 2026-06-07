// ─────────────────────────────────────────────────────────────
// src/components/Keyboard.tsx
//
// Color-change animation:
// When activeColor changes, the keyboard briefly scales down
// (0.985) then back to 1.0 — a subtle "click-in" pulse that
// makes the color switch feel physical and premium.
// The shell color crossfades with a 400ms ease.
// ─────────────────────────────────────────────────────────────

"use client";

import React, { useEffect, useRef, useState } from "react";
import { Key } from "./Key";
import { ROW_FN, ROW_NUMBER, ROW_QWERTY, ROW_HOME, ROW_SHIFT } from "@/data/keyboard";
import { KeyboardColor, VolumeState } from "@/types";
import { KEYBOARD_COLORS } from "@/data/colors";
import { useSound } from "@/hooks/useSound";

interface KeyboardProps {
  pressedKeys:     Set<string>;
  shiftActive:     boolean;
  capsLock:        boolean;
  activeColor:     KeyboardColor;
  volume:          VolumeState;
  onKeyPress:      (code: string, char?: string, shiftChar?: string) => void;
  registerSoundCb: (cb: () => void) => void;
}

export function Keyboard({
  pressedKeys, shiftActive, capsLock,
  activeColor, volume, onKeyPress, registerSoundCb,
}: KeyboardProps) {
  const ip = (code: string) => pressedKeys.has(code);
  const { playClick } = useSound(volume);
  useEffect(() => { registerSoundCb(playClick); }, [playClick, registerSoundCb]);

  // ── Color-change animation ─────────────────────────────────
  // Tracks whether a color-switch pulse is active
  const [pulsing, setPulsing] = useState(false);
  const prevColor = useRef(activeColor);

  useEffect(() => {
    if (prevColor.current !== activeColor) {
      prevColor.current = activeColor;
      // Trigger pulse: scale down then back up
      setPulsing(true);
      const t = setTimeout(() => setPulsing(false), 900);
      return () => clearTimeout(t);
    }
  }, [activeColor]);

  const theme = KEYBOARD_COLORS.find((c) => c.id === activeColor);

  const shellStyle: React.CSSProperties = theme ? {
    ["--kbd-shell"     as string]: theme.vars.shellTop,
    ["--kbd-shell-bot" as string]: theme.vars.shellBot,
  } : {};

  const hk = (code: string, char?: string, sc?: string) => {
    playClick();
    onKeyPress(code, char, sc);
  };

  return (
    <div className="keyboard-zone">
      <div
        className={`keyboard-body ${pulsing ? "kbd-pulse" : ""}`}
        style={shellStyle}
      >
        <div className="keyboard-grid">

          <div className="key-row key-row--fn">
            {ROW_FN.map((k, i) => (
              <Key key={i} keyDef={k} pressed={k.code ? ip(k.code) : false}
                shiftActive={shiftActive} capsLock={capsLock} onPress={hk} />
            ))}
          </div>

          <div className="key-row">
            {ROW_NUMBER.map((k, i) => (
              <Key key={i} keyDef={k} pressed={k.code ? ip(k.code) : false}
                shiftActive={shiftActive} capsLock={capsLock} onPress={hk} />
            ))}
          </div>

          <div className="key-row">
            {ROW_QWERTY.map((k, i) => (
              <Key key={i} keyDef={k} pressed={k.code ? ip(k.code) : false}
                shiftActive={shiftActive} capsLock={capsLock} onPress={hk} />
            ))}
          </div>

          <div className="key-row">
            {ROW_HOME.map((k, i) => (
              <Key key={i} keyDef={k} pressed={k.code ? ip(k.code) : false}
                shiftActive={shiftActive} capsLock={capsLock} onPress={hk} />
            ))}
          </div>

          <div className="key-row">
            {ROW_SHIFT.map((k, i) => (
              <Key key={i} keyDef={k}
                pressed={k.code === "ShiftLeft" || k.code === "ShiftRight"
                  ? shiftActive : k.code ? ip(k.code) : false}
                shiftActive={shiftActive} capsLock={capsLock} onPress={hk} />
            ))}
          </div>

          {/* Row 6: Bottom modifiers — exact Apple layout */}
          <div className="key-row key-row--bottom">

            {/* fn/globe - k-mod-sm = 44px */}
            <div className="key k-mod-sm" onMouseDown={(e) => { e.preventDefault(); playClick(); }}>
              <div className="fn-globe-wrap">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <span className="mod-fn-label">fn</span>
              </div>
            </div>

            {/* control - k-mod = 56px */}
            <div className={`key k-mod ${ip("ControlLeft")||ip("ControlRight") ? "key--pressed":""}`}
              onMouseDown={(e) => { e.preventDefault(); playClick(); }}>
              <span className="mod-sym" style={{fontSize:"10px",top:"5px"}}>^</span>
              <span className="lbl-ml mod-sub">control</span>
            </div>

            {/* option left - k-mod = 56px */}
            <div className={`key k-mod ${ip("AltLeft") ? "key--pressed":""}`}
              onMouseDown={(e) => { e.preventDefault(); playClick(); }}>
              <span className="mod-sym" style={{fontSize:"10px",top:"5px"}}>⌥</span>
              <span className="lbl-ml mod-sub">option</span>
            </div>

            {/* command left - k-cmd = 72px */}
            <div className={`key k-cmd ${ip("MetaLeft") ? "key--pressed":""}`}
              onMouseDown={(e) => { e.preventDefault(); playClick(); }}>
              <span className="mod-sym" style={{fontSize:"12px",top:"5px"}}>⌘</span>
              <span className="lbl-ml mod-sub">command</span>
            </div>

            {/* Spacebar - k-space = 436px */}
            <div className={`key k-space ${ip("Space") ? "key--pressed":""}`}
              role="button" aria-label="Space"
              onMouseDown={(e) => { e.preventDefault(); playClick(); onKeyPress("Space"," "); }}
              onTouchStart={(e) => { e.preventDefault(); playClick(); onKeyPress("Space"," "); }} />

            {/* command right - k-cmd = 72px */}
            <div className={`key k-cmd ${ip("MetaRight") ? "key--pressed":""}`}
              onMouseDown={(e) => { e.preventDefault(); playClick(); }}>
              <span className="mod-sym" style={{fontSize:"12px",top:"5px"}}>⌘</span>
              <span className="lbl-ml mod-sub">command</span>
            </div>

            {/* option right - k-mod = 56px */}
            <div className={`key k-mod ${ip("AltRight") ? "key--pressed":""}`}
              onMouseDown={(e) => { e.preventDefault(); playClick(); }}>
              <span className="mod-sym" style={{fontSize:"10px",top:"5px"}}>⌥</span>
              <span className="lbl-ml mod-sub">option</span>
            </div>

            {/* Arrow cluster — left(44) + [up+down stacked(44)] + right(44) = 132 + 2×4gap */}
            <div className={`key k-arrow ${ip("ArrowLeft") ? "key--pressed":""}`}
              role="button" aria-label="◀" style={{ alignSelf:"flex-end" }}
              onMouseDown={(e) => { e.preventDefault(); playClick(); onKeyPress("ArrowLeft"); }}>
              <span className="arr-l">◀</span>
            </div>

            <div className="k-arrow-ud">
              <div className={`key k-arrow ${ip("ArrowUp") ? "key--pressed":""}`}
                role="button" aria-label="▲"
                onMouseDown={(e) => { e.preventDefault(); playClick(); onKeyPress("ArrowUp"); }}>
                <span className="arr-l">▲</span>
              </div>
              <div className={`key k-arrow ${ip("ArrowDown") ? "key--pressed":""}`}
                role="button" aria-label="▼"
                onMouseDown={(e) => { e.preventDefault(); playClick(); onKeyPress("ArrowDown"); }}>
                <span className="arr-l">▼</span>
              </div>
            </div>

            <div className={`key k-arrow ${ip("ArrowRight") ? "key--pressed":""}`}
              role="button" aria-label="▶" style={{ alignSelf:"flex-end" }}
              onMouseDown={(e) => { e.preventDefault(); playClick(); onKeyPress("ArrowRight"); }}>
              <span className="arr-l">▶</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
