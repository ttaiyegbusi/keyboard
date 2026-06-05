// ─────────────────────────────────────────────────────────────
// src/hooks/useTypewriter.ts
//
// Central hook that manages:
//   - Paper selection state
//   - Papers dropdown open/closed state
//   - Shift / CapsLock toggle state
//   - Textarea ref (so any component can insert text)
//   - Physical keyboard → visual key highlight sync
//   - On-screen key press handler
//
// All keyboard logic lives here so components stay clean.
// ─────────────────────────────────────────────────────────────

"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  RefObject,
} from "react";
import { PaperType } from "@/types";

// ─── Types ────────────────────────────────────────────────────

export interface UseTypewriterReturn {
  /** Currently selected paper id */
  activePaper: PaperType;
  /** Change the active paper */
  setActivePaper: (paper: PaperType) => void;

  /** Whether the papers dropdown is visible */
  panelOpen: boolean;
  /** Toggle the dropdown */
  togglePanel: () => void;
  /** Close the dropdown */
  closePanel: () => void;

  /** Is Shift currently active */
  shiftActive: boolean;
  /** Is Caps Lock on */
  capsLock: boolean;

  /** Set of currently "pressed" key codes (for visual highlights) */
  pressedKeys: Set<string>;

  /** Ref to the <textarea> element inside the paper panel */
  textareaRef: RefObject<HTMLTextAreaElement>;

  /** Focus the textarea */
  focusPaper: () => void;

  /** Handle a virtual key press from the on-screen keyboard */
  handleVirtualKey: (code: string, char?: string, shiftChar?: string) => void;
}

// ─── Hook ─────────────────────────────────────────────────────

export function useTypewriter(): UseTypewriterReturn {
  const [activePaper, setActivePaperState] = useState<PaperType>("cream");
  const [panelOpen, setPanelOpen] = useState(false);
  const [shiftActive, setShiftActive] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ── Paper selection ──────────────────────────────────────────
  const setActivePaper = useCallback((paper: PaperType) => {
    setActivePaperState(paper);
    setPanelOpen(false);
    // Slight delay so the dropdown close animation finishes first
    setTimeout(() => textareaRef.current?.focus(), 150);
  }, []);

  // ── Dropdown ─────────────────────────────────────────────────
  const togglePanel = useCallback(() => setPanelOpen((p) => !p), []);
  const closePanel  = useCallback(() => setPanelOpen(false), []);

  // ── Focus helper ─────────────────────────────────────────────
  const focusPaper = useCallback(() => {
    textareaRef.current?.focus();
  }, []);

  // ── Text insertion helpers ────────────────────────────────────
  const insertChar = useCallback((ch: string) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart ?? 0;
    const end   = el.selectionEnd   ?? 0;
    const val   = el.value;
    el.value = val.slice(0, start) + ch + val.slice(end);
    el.selectionStart = el.selectionEnd = start + ch.length;
    // Dispatch input event so React controlled inputs stay in sync if needed
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }, []);

  const doBackspace = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart ?? 0;
    const end   = el.selectionEnd   ?? 0;
    if (start !== end) {
      el.value = el.value.slice(0, start) + el.value.slice(end);
      el.selectionStart = el.selectionEnd = start;
    } else if (start > 0) {
      el.value = el.value.slice(0, start - 1) + el.value.slice(start);
      el.selectionStart = el.selectionEnd = start - 1;
    }
  }, []);

  // ── Shift / Caps helpers ──────────────────────────────────────
  const setShift = useCallback((on: boolean) => setShiftActive(on), []);

  const toggleCaps = useCallback(() => setCapsLock((c) => !c), []);

  /** Returns true if letters should currently be uppercased */
  const isUppercase = useCallback(
    () => shiftActive !== capsLock,
    [shiftActive, capsLock]
  );

  // ── Virtual key handler (on-screen keyboard clicks) ───────────
  const handleVirtualKey = useCallback(
    (code: string, char?: string, shiftChar?: string) => {
      // Modifier keys
      if (code === "ShiftLeft" || code === "ShiftRight") {
        setShift(!shiftActive);
        return;
      }
      if (code === "CapsLock") {
        toggleCaps();
        return;
      }

      // Functional keys
      if (code === "Backspace") { doBackspace(); textareaRef.current?.focus(); return; }
      if (code === "Enter")     { insertChar("\n"); textareaRef.current?.focus(); return; }
      if (code === "Tab")       { insertChar("    "); textareaRef.current?.focus(); return; }
      if (code === "Escape")    { textareaRef.current?.focus(); return; }

      // Character keys
      if (char !== undefined) {
        const isLetter = /^[a-z]$/i.test(char);
        let out: string;

        if (isLetter) {
          out = isUppercase() ? char.toUpperCase() : char.toLowerCase();
        } else {
          out = shiftActive ? (shiftChar ?? char) : char;
        }

        insertChar(out);
        if (shiftActive) setShift(false); // auto-release shift after one char
        textareaRef.current?.focus();
      }
    },
    [shiftActive, isUppercase, doBackspace, insertChar, setShift, toggleCaps]
  );

  // ── Pressed-keys flash helper ─────────────────────────────────
  const pressKey = useCallback((code: string) => {
    setPressedKeys((prev) => new Set(prev).add(code));
    setTimeout(() => {
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.delete(code);
        return next;
      });
    }, 120);
  }, []);

  // ── Physical keyboard listeners ───────────────────────────────
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Highlight key visually
      pressKey(e.code);

      // Track shift / caps (just for visual state, browser handles actual input)
      if (e.code === "ShiftLeft" || e.code === "ShiftRight") setShiftActive(true);
      if (e.code === "CapsLock") toggleCaps();
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === "ShiftLeft" || e.code === "ShiftRight") setShiftActive(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup",   onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup",   onKeyUp);
    };
  }, [pressKey, toggleCaps]);

  // ── Close panel on outside click ─────────────────────────────
  useEffect(() => {
    const handler = () => closePanel();
    if (panelOpen) {
      // Use setTimeout so the chip-button click doesn't immediately close it
      const id = setTimeout(() => document.addEventListener("click", handler), 0);
      return () => {
        clearTimeout(id);
        document.removeEventListener("click", handler);
      };
    }
  }, [panelOpen, closePanel]);

  // ── Auto-focus on mount ───────────────────────────────────────
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return {
    activePaper,
    setActivePaper,
    panelOpen,
    togglePanel,
    closePanel,
    shiftActive,
    capsLock,
    pressedKeys,
    textareaRef,
    focusPaper,
    handleVirtualKey,
  };
}
