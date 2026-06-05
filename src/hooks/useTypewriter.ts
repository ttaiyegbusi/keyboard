// ─────────────────────────────────────────────────────────────
// src/hooks/useTypewriter.ts
// Central state hook. Physical keyboard presses also trigger
// the click sound via a ref callback (avoids stale closure).
// ─────────────────────────────────────────────────────────────

"use client";

import { useCallback, useEffect, useRef, useState, RefObject } from "react";
import { PaperType, KeyboardColor, FontId, VolumeState } from "@/types";

type DropdownId = "paper" | "color" | "font" | null;

export interface UseTypewriterReturn {
  activePaper: PaperType;    setActivePaper: (p: PaperType) => void;
  activeColor: KeyboardColor; setActiveColor: (c: KeyboardColor) => void;
  activeFont:  FontId;        setActiveFont:  (f: FontId) => void;
  volume:      VolumeState;   cycleVolume:    () => void;
  openDropdown: DropdownId;
  toggleDropdown: (id: DropdownId) => void;
  closeDropdowns: () => void;
  shiftActive: boolean;
  capsLock:    boolean;
  pressedKeys: Set<string>;
  textareaRef: RefObject<HTMLTextAreaElement>;
  focusPaper:  () => void;
  handleVirtualKey: (code: string, char?: string, shiftChar?: string) => void;
  // Expose a ref so Keyboard can register its playClick callback
  // and useTypewriter can call it for physical keypresses
  registerSoundCb: (cb: () => void) => void;
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
  // Holds the playClick function from Keyboard component
  const soundCbRef  = useRef<(() => void) | null>(null);

  const registerSoundCb = useCallback((cb: () => void) => {
    soundCbRef.current = cb;
  }, []);

  // ── Dropdowns ─────────────────────────────────────────────────
  const toggleDropdown = useCallback((id: DropdownId) => {
    setOpenDropdown((cur) => (cur === id ? null : id));
  }, []);
  const closeDropdowns = useCallback(() => setOpenDropdown(null), []);

  // ── Paper / Color / Font setters ──────────────────────────────
  const setActivePaper = useCallback((p: PaperType) => {
    setActivePaperState(p); closeDropdowns();
    setTimeout(() => textareaRef.current?.focus(), 150);
  }, [closeDropdowns]);

  const setActiveColor = useCallback((c: KeyboardColor) => {
    setActiveColorState(c); closeDropdowns();
    setTimeout(() => textareaRef.current?.focus(), 150);
  }, [closeDropdowns]);

  const setActiveFont = useCallback((f: FontId) => {
    setActiveFontState(f); closeDropdowns();
    setTimeout(() => textareaRef.current?.focus(), 150);
  }, [closeDropdowns]);

  // ── Volume ────────────────────────────────────────────────────
  const cycleVolume = useCallback(() => {
    setVolume((v) => v === "high" ? "low" : v === "low" ? "mute" : "high");
  }, []);

  // ── Focus ─────────────────────────────────────────────────────
  const focusPaper = useCallback(() => textareaRef.current?.focus(), []);

  // ── Text helpers ──────────────────────────────────────────────
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

  const setShift    = useCallback((on: boolean) => setShiftActive(on), []);
  const toggleCaps  = useCallback(() => setCapsLock((c) => !c), []);
  const isUppercase = useCallback(() => shiftActive !== capsLock, [shiftActive, capsLock]);

  const handleVirtualKey = useCallback(
    (code: string, char?: string, shiftChar?: string) => {
      if (code === "ShiftLeft" || code === "ShiftRight") { setShift(!shiftActive); return; }
      if (code === "CapsLock")  { toggleCaps(); return; }
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

  // ── Physical key highlight + sound ───────────────────────────
  const pressKey = useCallback((code: string) => {
    setPressedKeys((prev) => new Set(prev).add(code));
    setTimeout(() => {
      setPressedKeys((prev) => { const n = new Set(prev); n.delete(code); return n; });
    }, 120);
  }, []);

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      pressKey(e.code);
      // Fire the click sound for physical keypresses too
      soundCbRef.current?.();
      if (e.code === "ShiftLeft" || e.code === "ShiftRight") setShiftActive(true);
      if (e.code === "CapsLock") toggleCaps();
    };
    const onUp = (e: KeyboardEvent) => {
      if (e.code === "ShiftLeft" || e.code === "ShiftRight") setShiftActive(false);
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup",   onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup",   onUp);
    };
  }, [pressKey, toggleCaps]);

  // ── Outside click closes dropdowns ───────────────────────────
  useEffect(() => {
    if (!openDropdown) return;
    const handler = () => closeDropdowns();
    const id = setTimeout(() => document.addEventListener("click", handler), 0);
    return () => { clearTimeout(id); document.removeEventListener("click", handler); };
  }, [openDropdown, closeDropdowns]);

  useEffect(() => { textareaRef.current?.focus(); }, []);

  return {
    activePaper, setActivePaper,
    activeColor, setActiveColor,
    activeFont,  setActiveFont,
    volume, cycleVolume,
    openDropdown, toggleDropdown, closeDropdowns,
    shiftActive, capsLock, pressedKeys,
    textareaRef, focusPaper, handleVirtualKey,
    registerSoundCb,
  };
}
