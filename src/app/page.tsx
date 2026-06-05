// ─────────────────────────────────────────────────────────────
// src/app/page.tsx
// Root page — wires all state and components together.
// ─────────────────────────────────────────────────────────────

"use client";

import React from "react";
import { Topbar }        from "@/components/Topbar";
import { PaperCanvas }   from "@/components/PaperCanvas";
import { Keyboard }      from "@/components/Keyboard";
import { useTypewriter } from "@/hooks/useTypewriter";

export default function Home() {
  const {
    activePaper, setActivePaper,
    activeColor, setActiveColor,
    activeFont,  setActiveFont,
    volume,      cycleVolume,
    openDropdown, toggleDropdown, closeDropdowns,
    shiftActive, capsLock, pressedKeys,
    textareaRef, handleVirtualKey,
  } = useTypewriter();

  return (
    <>
      <Topbar
        activePaper={activePaper}
        activeColor={activeColor}
        activeFont={activeFont}
        volume={volume}
        openDropdown={openDropdown}
        onPaperChipClick={(e) => { e.stopPropagation(); toggleDropdown("paper"); }}
        onColorDotClick={(e)  => { e.stopPropagation(); toggleDropdown("color"); }}
        onFontLabelClick={(e) => { e.stopPropagation(); toggleDropdown("font");  }}
        onVolumeClick={cycleVolume}
        onSelectPaper={setActivePaper}
        onSelectColor={setActiveColor}
        onSelectFont={setActiveFont}
      />

      <main className="scene" onClick={closeDropdowns}>
        <PaperCanvas
          activePaper={activePaper}
          activeFont={activeFont}
          textareaRef={textareaRef}
          onPanelClick={closeDropdowns}
        />
        <Keyboard
          pressedKeys={pressedKeys}
          shiftActive={shiftActive}
          capsLock={capsLock}
          activeColor={activeColor}
          onKeyPress={handleVirtualKey}
        />
      </main>
    </>
  );
}
