// ─────────────────────────────────────────────────────────────
// src/components/Keyboard.tsx
// Flat layout, no 3D. Notepad sits on top flush.
// ─────────────────────────────────────────────────────────────

"use client";

import React, { useEffect } from "react";
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

  const theme = KEYBOARD_COLORS.find((c) => c.id === activeColor);
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

  const hk = (code: string, char?: string, sc?: string) => { playClick(); onKeyPress(code, char, sc); };

  return (
    <div className="keyboard-zone">
      <div className="keyboard-body" style={shellStyle}>
        <div className="keyboard-grid">

          {/* Row 1 */}
          <div className="key-row">
            {ROW_FN.map((k, i) => (
              <Key key={i} keyDef={k} pressed={k.code ? ip(k.code) : false}
                shiftActive={shiftActive} capsLock={capsLock} onPress={hk} />
            ))}
          </div>

          {/* Row 2 */}
          <div className="key-row">
            {ROW_NUMBER.map((k, i) => (
              <Key key={i} keyDef={k} pressed={k.code ? ip(k.code) : false}
                shiftActive={shiftActive} capsLock={capsLock} onPress={hk} />
            ))}
          </div>

          {/* Row 3 */}
          <div className="key-row">
            {ROW_QWERTY.map((k, i) => (
              <Key key={i} keyDef={k} pressed={k.code ? ip(k.code) : false}
                shiftActive={shiftActive} capsLock={capsLock} onPress={hk} />
            ))}
          </div>

          {/* Row 4 */}
          <div className="key-row">
            {ROW_HOME.map((k, i) => (
              <Key key={i} keyDef={k} pressed={k.code ? ip(k.code) : false}
                shiftActive={shiftActive} capsLock={capsLock} onPress={hk} />
            ))}
          </div>

          {/* Row 5 */}
          <div className="key-row">
            {ROW_SHIFT.map((k, i) => (
              <Key key={i} keyDef={k}
                pressed={k.code === "ShiftLeft" || k.code === "ShiftRight"
                  ? shiftActive : k.code ? ip(k.code) : false}
                shiftActive={shiftActive} capsLock={capsLock} onPress={hk} />
            ))}
          </div>

          {/* Row 6: Bottom modifiers */}
          <div className="key-row key-row--bottom">

            <div className="key k-mod-sm" onMouseDown={(e) => { e.preventDefault(); playClick(); }}>
              <div className="fn-globe-wrap">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <span className="mod-fn-label">fn</span>
              </div>
            </div>

            <div className={`key k-mod ${ip("ControlLeft")||ip("ControlRight") ? "key--pressed":""}`}
              onMouseDown={(e) => { e.preventDefault(); playClick(); }}>
              <span className="mod-sym">^</span>
              <span className="lbl-ml mod-sub">control</span>
            </div>

            <div className={`key k-mod ${ip("AltLeft") ? "key--pressed":""}`}
              onMouseDown={(e) => { e.preventDefault(); playClick(); }}>
              <span className="mod-sym">⌥</span>
              <span className="lbl-ml mod-sub">option</span>
            </div>

            <div className={`key k-cmd ${ip("MetaLeft") ? "key--pressed":""}`}
              onMouseDown={(e) => { e.preventDefault(); playClick(); }}>
              <span className="mod-sym" style={{top:6}}>⌘</span>
              <span className="lbl-ml mod-sub">command</span>
            </div>

            <div className={`key k-space ${ip("Space") ? "key--pressed":""}`}
              role="button" aria-label="Space"
              onMouseDown={(e) => { e.preventDefault(); playClick(); onKeyPress("Space"," "); }}
              onTouchStart={(e) => { e.preventDefault(); playClick(); onKeyPress("Space"," "); }} />

            <div className={`key k-cmd ${ip("MetaRight") ? "key--pressed":""}`}
              onMouseDown={(e) => { e.preventDefault(); playClick(); }}>
              <span className="mod-sym" style={{top:6}}>⌘</span>
              <span className="lbl-ml mod-sub">command</span>
            </div>

            <div className={`key k-mod ${ip("AltRight") ? "key--pressed":""}`}
              onMouseDown={(e) => { e.preventDefault(); playClick(); }}>
              <span className="mod-sym">⌥</span>
              <span className="lbl-ml mod-sub">option</span>
            </div>

            {/* Arrow cluster */}
            <div className={`key k-arrow ${ip("ArrowLeft") ? "key--pressed":""}`}
              role="button" style={{ alignSelf:"flex-end" }}
              onMouseDown={(e) => { e.preventDefault(); playClick(); onKeyPress("ArrowLeft"); }}>
              <span className="arr-l">◀</span>
            </div>

            <div className="k-arrow-ud">
              <div className={`key k-arrow ${ip("ArrowUp") ? "key--pressed":""}`}
                role="button"
                onMouseDown={(e) => { e.preventDefault(); playClick(); onKeyPress("ArrowUp"); }}>
                <span className="arr-l">▲</span>
              </div>
              <div className={`key k-arrow ${ip("ArrowDown") ? "key--pressed":""}`}
                role="button"
                onMouseDown={(e) => { e.preventDefault(); playClick(); onKeyPress("ArrowDown"); }}>
                <span className="arr-l">▼</span>
              </div>
            </div>

            <div className={`key k-arrow ${ip("ArrowRight") ? "key--pressed":""}`}
              role="button" style={{ alignSelf:"flex-end" }}
              onMouseDown={(e) => { e.preventDefault(); playClick(); onKeyPress("ArrowRight"); }}>
              <span className="arr-l">▶</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
