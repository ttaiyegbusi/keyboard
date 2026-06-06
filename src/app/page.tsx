// ─────────────────────────────────────────────────────────────
// src/app/page.tsx
// Full layout: transparent topbar close to content,
// 500×500 notepad, gap, keyboard.
// ─────────────────────────────────────────────────────────────

"use client";

import React from "react";
import { Topbar }        from "@/components/Topbar";
import { PaperCanvas }   from "@/components/PaperCanvas";
import { Keyboard }      from "@/components/Keyboard";
import { useTypewriter } from "@/hooks/useTypewriter";
import { PAPERS }        from "@/data/papers";

export default function Home() {
  const {
    activePaper, setActivePaper,
    activeColor, setActiveColor,
    activeFont,  setActiveFont,
    volume,      cycleVolume,
    openDropdown, toggleDropdown, closeDropdowns,
    shiftActive, capsLock, pressedKeys,
    textareaRef, handleVirtualKey, registerSoundCb,
  } = useTypewriter();

  const paperLabel = PAPERS.find((p) => p.id === activePaper)?.label ?? "Paper";

  return (
    /* Full page — single background, no separate topbar bg */
    <div className="app" onClick={closeDropdowns}>

      {/* Content column — topbar + notepad + keyboard all centred together */}
      <div className="content-col">

        {/* Topbar — transparent, sits right above the notepad */}
        <Topbar
          activePaper={activePaper}   activeColor={activeColor}
          activeFont={activeFont}     volume={volume}
          openDropdown={openDropdown} textareaRef={textareaRef}
          activePaperLabel={paperLabel}
          onPaperChipClick={(e) => { e.stopPropagation(); toggleDropdown("paper"); }}
          onColorDotClick={(e)  => { e.stopPropagation(); toggleDropdown("color"); }}
          onFontLabelClick={(e) => { e.stopPropagation(); toggleDropdown("font");  }}
          onDownloadClick={(e)  => { e.stopPropagation(); toggleDropdown("download"); }}
          onVolumeClick={cycleVolume}
          onSelectPaper={setActivePaper}
          onSelectColor={setActiveColor}
          onSelectFont={setActiveFont}
          closeDropdowns={closeDropdowns}
        />

        {/* Notepad — 500×500, standalone card */}
        <PaperCanvas
          activePaper={activePaper} activeFont={activeFont}
          textareaRef={textareaRef} onPanelClick={closeDropdowns}
        />

        {/* Gap between notepad and keyboard */}
        <div className="scene-gap" />

        {/* Keyboard — completely separate */}
        <Keyboard
          pressedKeys={pressedKeys} shiftActive={shiftActive}
          capsLock={capsLock}       activeColor={activeColor}
          volume={volume}           onKeyPress={handleVirtualKey}
          registerSoundCb={registerSoundCb}
        />

      </div>
    </div>
  );
}
