// ─────────────────────────────────────────────────────────────
// src/app/page.tsx
// ─────────────────────────────────────────────────────────────

"use client";

import React, { useState } from "react";
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

  // Custom paper color controlled by the color picker
  const [customPaperColor, setCustomPaperColor] = useState("#f5edd6");

  const paperLabel = PAPERS.find((p) => p.id === activePaper)?.label ?? "Paper";

  return (
    <div className="app" onClick={closeDropdowns}>
      <div className="content-col">

        <Topbar
          activePaper={activePaper}   activeColor={activeColor}
          activeFont={activeFont}     volume={volume}
          openDropdown={openDropdown} textareaRef={textareaRef}
          activePaperLabel={paperLabel}
          customPaperColor={customPaperColor}
          onCustomPaperColor={setCustomPaperColor}
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

        <PaperCanvas
          activePaper={activePaper}       activeFont={activeFont}
          textareaRef={textareaRef}       onPanelClick={closeDropdowns}
          customPaperColor={customPaperColor}
        />

        <div className="scene-gap" />

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
