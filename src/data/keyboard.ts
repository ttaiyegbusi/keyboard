// ─────────────────────────────────────────────────────────────
// src/data/keyboard.ts
//
// Key rendering rules:
//   isLetter: true  → single large centred uppercase label
//   isLetter: false (default) → stacked top/bottom symbols
//   type "special"  → small text label, bottom-left or right
//   type "fn"       → icon + Fn number
//   type "knob"     → dial, no label
// ─────────────────────────────────────────────────────────────

export type KeyType = "char" | "special" | "fn" | "knob";

export interface KeyDef {
  type: KeyType;
  code?: string;
  char?: string;       // unshifted character
  shift?: string;      // shifted character
  isLetter?: boolean;  // true → render as single centred letter
  label?: string;
  labelAlign?: "left" | "right" | "center";
  sizeClass: string;
  fnLabel?: string;
  fnIcon?: string;
  homing?: boolean;
  isShift?: boolean;
  isCaps?: boolean;
}

const ICONS = {
  brightDown:  'M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  brightUp:    'M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z',
  missionCtrl: 'M2 3h8a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM14 3h8a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM2 13h8a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1zM14 13h8a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1z',
  search:      'M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM21 21l-4.35-4.35',
  mic:         'M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8',
  moon:        'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z',
  rewind:      'M19 20L9 12l10-8v16zM5 19V5',
  pause:       'M6 4h4v16H6zM14 4h4v16h-4z',
  fastFwd:     'M5 4l10 8-10 8V4zM19 5v14',
  mute:        'M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6',
  volDown:     'M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07',
  volUp:       'M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07',
};

export const ROW_FN: KeyDef[] = [
  { type: "special", code: "Escape",  label: "esc",  labelAlign: "left", sizeClass: "k-esc" },
  { type: "fn", code: "F1",  fnLabel: "F1",  fnIcon: ICONS.brightDown,  sizeClass: "k-fn" },
  { type: "fn", code: "F2",  fnLabel: "F2",  fnIcon: ICONS.brightUp,    sizeClass: "k-fn" },
  { type: "fn", code: "F3",  fnLabel: "F3",  fnIcon: ICONS.missionCtrl, sizeClass: "k-fn" },
  { type: "fn", code: "F4",  fnLabel: "F4",  fnIcon: ICONS.search,      sizeClass: "k-fn" },
  { type: "fn", code: "F5",  fnLabel: "F5",  fnIcon: ICONS.mic,         sizeClass: "k-fn" },
  { type: "fn", code: "F6",  fnLabel: "F6",  fnIcon: ICONS.moon,        sizeClass: "k-fn" },
  { type: "fn", code: "F7",  fnLabel: "F7",  fnIcon: ICONS.rewind,      sizeClass: "k-fn" },
  { type: "fn", code: "F8",  fnLabel: "F8",  fnIcon: ICONS.pause,       sizeClass: "k-fn" },
  { type: "fn", code: "F9",  fnLabel: "F9",  fnIcon: ICONS.fastFwd,     sizeClass: "k-fn" },
  { type: "fn", code: "F10", fnLabel: "F10", fnIcon: ICONS.mute,        sizeClass: "k-fn" },
  { type: "fn", code: "F11", fnLabel: "F11", fnIcon: ICONS.volDown,     sizeClass: "k-fn" },
  { type: "fn", code: "F12", fnLabel: "F12", fnIcon: ICONS.volUp,       sizeClass: "k-fn" },
  { type: "knob", sizeClass: "k-knob-w" },
];

export const ROW_NUMBER: KeyDef[] = [
  { type: "char", code: "Backquote",    char: "`",  shift: "~",  sizeClass: "k-std" },
  { type: "char", code: "Digit1",       char: "1",  shift: "!",  sizeClass: "k-std" },
  { type: "char", code: "Digit2",       char: "2",  shift: "@",  sizeClass: "k-std" },
  { type: "char", code: "Digit3",       char: "3",  shift: "#",  sizeClass: "k-std" },
  { type: "char", code: "Digit4",       char: "4",  shift: "$",  sizeClass: "k-std" },
  { type: "char", code: "Digit5",       char: "5",  shift: "%",  sizeClass: "k-std" },
  { type: "char", code: "Digit6",       char: "6",  shift: "^",  sizeClass: "k-std" },
  { type: "char", code: "Digit7",       char: "7",  shift: "&",  sizeClass: "k-std" },
  { type: "char", code: "Digit8",       char: "8",  shift: "*",  sizeClass: "k-std" },
  { type: "char", code: "Digit9",       char: "9",  shift: "(",  sizeClass: "k-std" },
  { type: "char", code: "Digit0",       char: "0",  shift: ")",  sizeClass: "k-std" },
  { type: "char", code: "Minus",        char: "-",  shift: "_",  sizeClass: "k-std" },
  { type: "char", code: "Equal",        char: "=",  shift: "+",  sizeClass: "k-std" },
  { type: "special", code: "Backspace", label: "delete", labelAlign: "right", sizeClass: "k-delete" },
];

export const ROW_QWERTY: KeyDef[] = [
  { type: "special", code: "Tab", label: "tab", labelAlign: "left", sizeClass: "k-tab" },
  // isLetter: true → renders as single centred uppercase label
  { type: "char", code: "KeyQ", char: "q", shift: "Q", isLetter: true, sizeClass: "k-std" },
  { type: "char", code: "KeyW", char: "w", shift: "W", isLetter: true, sizeClass: "k-std" },
  { type: "char", code: "KeyE", char: "e", shift: "E", isLetter: true, sizeClass: "k-std" },
  { type: "char", code: "KeyR", char: "r", shift: "R", isLetter: true, sizeClass: "k-std" },
  { type: "char", code: "KeyT", char: "t", shift: "T", isLetter: true, sizeClass: "k-std" },
  { type: "char", code: "KeyY", char: "y", shift: "Y", isLetter: true, sizeClass: "k-std" },
  { type: "char", code: "KeyU", char: "u", shift: "U", isLetter: true, sizeClass: "k-std" },
  { type: "char", code: "KeyI", char: "i", shift: "I", isLetter: true, sizeClass: "k-std" },
  { type: "char", code: "KeyO", char: "o", shift: "O", isLetter: true, sizeClass: "k-std" },
  { type: "char", code: "KeyP", char: "p", shift: "P", isLetter: true, sizeClass: "k-std" },
  // Brackets are symbols → stacked layout
  { type: "char", code: "BracketLeft",  char: "[", shift: "{", sizeClass: "k-std" },
  { type: "char", code: "BracketRight", char: "]", shift: "}", sizeClass: "k-std" },
  { type: "char", code: "Backslash",    char: "\\", shift: "|", sizeClass: "k-pipe" },
];

export const ROW_HOME: KeyDef[] = [
  { type: "special", code: "CapsLock", label: "caps lock", labelAlign: "left", sizeClass: "k-caps", isCaps: true },
  { type: "char", code: "KeyA", char: "a", shift: "A", isLetter: true, sizeClass: "k-std" },
  { type: "char", code: "KeyS", char: "s", shift: "S", isLetter: true, sizeClass: "k-std" },
  { type: "char", code: "KeyD", char: "d", shift: "D", isLetter: true, sizeClass: "k-std" },
  { type: "char", code: "KeyF", char: "f", shift: "F", isLetter: true, sizeClass: "k-std", homing: true },
  { type: "char", code: "KeyG", char: "g", shift: "G", isLetter: true, sizeClass: "k-std" },
  { type: "char", code: "KeyH", char: "h", shift: "H", isLetter: true, sizeClass: "k-std" },
  { type: "char", code: "KeyJ", char: "j", shift: "J", isLetter: true, sizeClass: "k-std", homing: true },
  { type: "char", code: "KeyK", char: "k", shift: "K", isLetter: true, sizeClass: "k-std" },
  { type: "char", code: "KeyL", char: "l", shift: "L", isLetter: true, sizeClass: "k-std" },
  // Punctuation → stacked
  { type: "char", code: "Semicolon", char: ";", shift: ":", sizeClass: "k-std" },
  { type: "char", code: "Quote",     char: "'", shift: '"', sizeClass: "k-std" },
  { type: "special", code: "Enter", label: "return", labelAlign: "right", sizeClass: "k-return" },
];

export const ROW_SHIFT: KeyDef[] = [
  { type: "special", code: "ShiftLeft",  label: "shift", labelAlign: "left",  sizeClass: "k-shift-l", isShift: true },
  { type: "char", code: "KeyZ", char: "z", shift: "Z", isLetter: true, sizeClass: "k-std" },
  { type: "char", code: "KeyX", char: "x", shift: "X", isLetter: true, sizeClass: "k-std" },
  { type: "char", code: "KeyC", char: "c", shift: "C", isLetter: true, sizeClass: "k-std" },
  { type: "char", code: "KeyV", char: "v", shift: "V", isLetter: true, sizeClass: "k-std" },
  { type: "char", code: "KeyB", char: "b", shift: "B", isLetter: true, sizeClass: "k-std" },
  { type: "char", code: "KeyN", char: "n", shift: "N", isLetter: true, sizeClass: "k-std" },
  { type: "char", code: "KeyM", char: "m", shift: "M", isLetter: true, sizeClass: "k-std" },
  // Punctuation → stacked
  { type: "char", code: "Comma",  char: ",", shift: "<", sizeClass: "k-std" },
  { type: "char", code: "Period", char: ".", shift: ">", sizeClass: "k-std" },
  { type: "char", code: "Slash",  char: "/", shift: "?", sizeClass: "k-std" },
  { type: "special", code: "ShiftRight", label: "shift", labelAlign: "right", sizeClass: "k-shift-r", isShift: true },
];
