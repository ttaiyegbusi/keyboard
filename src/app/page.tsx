// ─────────────────────────────────────────────────────────────
// src/app/page.tsx
//
// Root page — composes all components into the full layout:
//
//   <Topbar>          ← fixed header (brand + toolbar + panel)
//   <main.scene>
//     <PaperCanvas>   ← large centre paper (behind keyboard)
//     <Keyboard>      ← interactive keyboard at bottom
//   </main>
//
// All state is managed by the useTypewriter hook and passed
// down as props — no prop drilling more than one level.
// ─────────────────────────────────────────────────────────────

"use client";

import React from "react";
import { Topbar }      from "@/components/Topbar";
import { PaperCanvas } from "@/components/PaperCanvas";
import { Keyboard }    from "@/components/Keyboard";
import { useTypewriter } from "@/hooks/useTypewriter";

export default function Home() {
  const {
    activePaper,
    setActivePaper,
    panelOpen,
    togglePanel,
    closePanel,
    shiftActive,
    capsLock,
    pressedKeys,
    textareaRef,
    handleVirtualKey,
  } = useTypewriter();

  return (
    <>
      {/* ── Top navigation bar ───────────────────────────── */}
      <Topbar
        activePaper={activePaper}
        panelOpen={panelOpen}
        onChipClick={(e) => {
          e.stopPropagation();
          togglePanel();
        }}
        onSelectPaper={setActivePaper}
      />

      {/* ── Main scene ───────────────────────────────────── */}
      {/*
        Clicking the bare scene background closes the panel.
        Individual children call e.stopPropagation() so only
        true outside-clicks dismiss the dropdown.
      */}
      <main className="scene" onClick={closePanel}>

        {/* The paper the user types on */}
        <PaperCanvas
          activePaper={activePaper}
          textareaRef={textareaRef}
          onPanelClick={closePanel}
        />

        {/* The keyboard at the bottom */}
        <Keyboard
          pressedKeys={pressedKeys}
          shiftActive={shiftActive}
          capsLock={capsLock}
          onKeyPress={handleVirtualKey}
        />

      </main>
    </>
  );
}
