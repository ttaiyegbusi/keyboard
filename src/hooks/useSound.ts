// ─────────────────────────────────────────────────────────────
// src/hooks/useSound.ts
//
// Deep mechanical keyboard thock.
// Sounds like a quality low-profile mechanical switch —
// not a mouse click, not a snap. Warm, deep, satisfying.
//
// Architecture:
//   1. Bass thump  — fast-decaying sine 180→60Hz (the weight)
//   2. Body noise  — narrow bandpass at 600Hz, heavy damping
//   3. No high freq click — removed entirely (was causing the mouse sound)
// ─────────────────────────────────────────────────────────────

"use client";

import { useRef, useCallback } from "react";
import { VolumeState } from "@/types";

const GAIN_MAP: Record<VolumeState, number> = {
  high: 0.45,
  low:  0.18,
  mute: 0.00,
};

export function useSound(volume: VolumeState) {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback((): AudioContext => {
    if (!ctxRef.current) {
      ctxRef.current = new (
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      )();
    }
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const playClick = useCallback(() => {
    const masterGain = GAIN_MAP[volume];
    if (masterGain === 0) return;

    const ctx = getCtx();
    const now = ctx.currentTime;

    const master = ctx.createGain();
    master.gain.setValueAtTime(masterGain, now);
    master.connect(ctx.destination);

    // ── Layer 1: Deep bass thump ───────────────────────────────
    // This is the MAIN sound — a sine that drops fast.
    // 180Hz → 55Hz in 20ms gives a deep, warm thock feel.
    const bass = ctx.createOscillator();
    bass.type = "sine";
    bass.frequency.setValueAtTime(180, now);
    bass.frequency.exponentialRampToValueAtTime(55, now + 0.02);

    const bassGain = ctx.createGain();
    bassGain.gain.setValueAtTime(1.0, now);
    bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    bass.connect(bassGain);
    bassGain.connect(master);
    bass.start(now);
    bass.stop(now + 0.05);

    // ── Layer 2: Warm body noise ───────────────────────────────
    // Very narrow bandpass at 600Hz — adds the "fullness"
    // without any high-frequency harshness.
    const bufLen = Math.ceil(ctx.sampleRate * 0.04);
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) data[i] = Math.random() * 2 - 1;

    const noise = ctx.createBufferSource();
    noise.buffer = buf;

    // Narrow bandpass at low-mid frequency
    const bpf = ctx.createBiquadFilter();
    bpf.type = "bandpass";
    bpf.frequency.setValueAtTime(600, now);
    bpf.Q.setValueAtTime(3.0, now);  // narrow = muffled, warm

    // Cut everything above 1kHz
    const lpf = ctx.createBiquadFilter();
    lpf.type = "lowpass";
    lpf.frequency.setValueAtTime(1000, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.4, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    noise.connect(bpf);
    bpf.connect(lpf);
    lpf.connect(noiseGain);
    noiseGain.connect(master);
    noise.start(now);
    noise.stop(now + 0.04);

  }, [volume, getCtx]);

  return { playClick };
}
