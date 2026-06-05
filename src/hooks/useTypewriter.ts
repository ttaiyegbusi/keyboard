// ─────────────────────────────────────────────────────────────
// src/hooks/useTypewriter.ts
//
// Central state hook. Now manages:
//   - Paper selection + dropdown
//   - Keyboard colour selection + dropdown
//   - Font selection + dropdown
//   - Volume state (mute / low / high) cycling
//   - Shift / CapsLock toggle
//   - Textarea ref + text insertion
//   - Physical keyboard highlight sync
//
// One dropdown can be open at a time — opening one closes others.
// ─────────────────────────────────────────────────────────────

"use client";

import { useCallback, useEffect, useRef, useState, RefObject } from "react";
import { PaperType, KeyboardColor, FontId, VolumeState } from "@/types";

type DropdownId = "paper" | "color" | "font" | null;

export interface UseTypewriterReturn {
  // ── Paper ──────────────────────────────────────────────────
  activePaper: PaperType;
  setActivePaper: (p: PaperType) => void;

  // ── Keyboard color ─────────────────────────────────────────
  activeColor: KeyboardColor;
  setActiveColor: (c: KeyboardColor) => void;

  // ── Font ───────────────────────────────────────────────────
  activeFont: FontId;
  setActiveFont: (f: FontId) => void;

  // ── Volume ─────────────────────────────────────────────────
  volume: VolumeState;
  cycleVolume: () => void;

  // ── Dropdowns (only one open at a time) ────────────────────
  openDropdown: DropdownId;
  toggleDropdown: (id: DropdownId) => void;
  closeDropdowns: () => void;

  // ── Keyboard state ─────────────────────────────────────────
  shiftActive: boolean;
  capsLock: boolean;
  pressedKeys: Set<string>;

  // ── Textarea ───────────────────────────────────────────────
  textareaRef: RefObject<HTMLTextAreaElement>;
  focusPaper: () => void;
  handleVirtualKey: (code: string, char?: string, shiftChar?: string) => void;
}

export function useTypewriter(): UseTypewriterReturn {
  const [activePaper, setActivePaperState] = useState<PaperType>("cream");
  const [activeColor, setActiveColorState] = useState<KeyboardColor>("midnight");
  const [activeFont,  setActiveFontState]  = useState<FontId>("special-elite");
  const [volume,      setVolume]           = useState<VolumeState>("high");
  const [openDropdown, setOpenDropdown]    = useState<DropdownId>(null);
  const [shiftActive,  setShiftActive]     = useState(false);
  const [capsLock,     setCapsLock]        = useState(false);
  const [pressedKeys,  setPressedKeys]     = useState<Set<string>>(new Set());

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ── Dropdown management ──────────────────────────────────────
  const toggleDropdown = useCallback((id: DropdownId) => {
    setOpenDropdown((cur) => (cur === id ? null : id));
  }, []);

  const closeDropdowns = useCallback(() => setOpenDropdown(null), []);

  // ── Paper ────────────────────────────────────────────────────
  const setActivePaper = useCallback((p: PaperType) => {
    setActivePaperState(p);
    closeDropdowns();
    setTimeout(() => textareaRef.current?.focus(), 150);
  }, [closeDropdowns]);

  // ── Color ────────────────────────────────────────────────────
  const setActiveColor = useCallback((c: KeyboardColor) => {
    setActiveColorState(c);
    closeDropdowns();
    setTimeout(() => textareaRef.current?.focus(), 150);
  }, [closeDropdowns]);

  // ── Font ─────────────────────────────────────────────────────
  const setActiveFont = useCallback((f: FontId) => {
    setActiveFontState(f);
    closeDropdowns();
    setTimeout(() => textareaRef.current?.focus(), 150);
  }, [closeDropdowns]);

  // ── Volume cycling: high → low → mute → high ─────────────────
  const cycleVolume = useCallback(() => {
    setVolume((v) => {
      if (v === "high") return "low";
      if (v === "low")  return "mute";
      return "high";
    });
  }, []);

  // ── Focus ────────────────────────────────────────────────────
  const focusPaper = useCallback(() => textareaRef.current?.focus(), []);

  // ── Text insertion ───────────────────────────────────────────
  const insertChar = useCallback((ch: string) => {
    const el = textareaRef.current;
    if (!el) return;
    const s = el.selectionStart ?? 0;
    const e = el.selectionEnd   ?? 0;
    el.value = el.value.slice(0, s) + ch + el.value.slice(e);
    el.selectionStart = el.selectionEnd = s + ch.length;
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }, []);

  const doBackspace = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    const s = el.selectionStart ?? 0;
    const e = el.selectionEnd   ?? 0;
    if (s !== e) {
      el.value = el.value.slice(0, s) + el.value.slice(e);
      el.selectionStart = el.selectionEnd = s;
    } else if (s > 0) {
      el.value = el.value.slice(0, s - 1) + el.value.slice(s);
      el.selectionStart = el.selectionEnd = s - 1;
    }
  }, []);

  const setShift = useCallback((on: boolean) => setShiftActive(on), []);
  const toggleCaps = useCallback(() => setCapsLock((c) => !c), []);
  const isUppercase = useCallback(() => shiftActive !== capsLock, [shiftActive, capsLock]);

  const handleVirtualKey = useCallback(
    (code: string, char?: string, shiftChar?: string) => {
      if (code === "ShiftLeft" || code === "ShiftRight") { setShift(!shiftActive); return; }
      if (code === "CapsLock") { toggleCaps(); return; }
      if (code === "Backspace") { doBackspace(); textareaRef.current?.focus(); return; }
      if (code === "Enter")     { insertChar("\n"); textareaRef.current?.focus(); return; }
      if (code === "Tab")       { insertChar("    "); textareaRef.current?.focus(); return; }
      if (code === "Escape")    { textareaRef.current?.focus(); return; }
      if (char !== undefined) {
        const isLetter = /^[a-z]$/i.test(char);
        const out = isLetter
          ? (isUppercase() ? char.toUpperCase() : char.toLowerCase())
          : (shiftActive ? (shiftChar ?? char) : char);
        insertChar(out);
        if (shiftActive) setShift(false);
        textareaRef.current?.focus();
      }
    },
    [shiftActive, isUppercase, doBackspace, insertChar, setShift, toggleCaps]
  );

  // ── Physical key highlight ────────────────────────────────────
  const pressKey = useCallback((code: string) => {
    setPressedKeys((prev) => new Set(prev).add(code));
    setTimeout(() => {
      setPressedKeys((prev) => { const n = new Set(prev); n.delete(code); return n; });
    }, 120);
  }, []);

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      pressKey(e.code);
      if (e.code === "ShiftLeft" || e.code === "ShiftRight") setShiftActive(true);
      if (e.code === "CapsLock") toggleCaps();
    };
    const onUp = (e: KeyboardEvent) => {
      if (e.code === "ShiftLeft" || e.code === "ShiftRight") setShiftActive(false);
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup",   onUp);
    return () => { window.removeEventListener("keydown", onDown); window.removeEventListener("keyup", onUp); };
  }, [pressKey, toggleCaps]);

  // ── Close dropdowns on outside click ─────────────────────────
  useEffect(() => {
    if (!openDropdown) return;
    const handler = () => closeDropdowns();
    const id = setTimeout(() => document.addEventListener("click", handler), 0);
    return () => { clearTimeout(id); document.removeEventListener("click", handler); };
  }, [openDropdown, closeDropdowns]);

  // ── Auto-focus ────────────────────────────────────────────────
  useEffect(() => { textareaRef.current?.focus(); }, []);

  return {
    activePaper, setActivePaper,
    activeColor, setActiveColor,
    activeFont,  setActiveFont,
    volume, cycleVolume,
    openDropdown, toggleDropdown, closeDropdowns,
    shiftActive, capsLock, pressedKeys,
    textareaRef, focusPaper, handleVirtualKey,
  };
}
