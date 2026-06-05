// ─────────────────────────────────────────────────────────────
// src/hooks/useSound.ts
//
// Synthesises a realistic Apple-style mechanical keyboard click
// using the Web Audio API — no external audio file needed.
//
// The sound is built from 3 layers:
//   1. Noise burst   — the initial impact transient (white noise)
//   2. Tone click    — a very short pitched thock body
//   3. High click    — a thin high-frequency tick overlay
//
// All layers are shaped with short ADSR envelopes and mixed
// to produce a crisp, satisfying key press sound.
// ─────────────────────────────────────────────────────────────

"use client";

import { useRef, useCallback } from "react";
import { VolumeState } from "@/types";

// Volume gain levels per state
const GAIN_MAP: Record<VolumeState, number> = {
  high: 0.55,
  low:  0.20,
  mute: 0.00,
};

export function useSound(volume: VolumeState) {
  // AudioContext is lazy-created on first keypress (browser policy)
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback((): AudioContext => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return ctxRef.current;
  }, []);

  const playClick = useCallback(() => {
    const gain = GAIN_MAP[volume];
    if (gain === 0) return;

    const ctx = getCtx();
    const now = ctx.currentTime;

    // ── Master gain ────────────────────────────────────────────
    const master = ctx.createGain();
    master.gain.setValueAtTime(gain, now);
    master.connect(ctx.destination);

    // ── Layer 1: Noise burst (impact transient) ────────────────
    const bufferSize = ctx.sampleRate * 0.04; // 40ms of noise
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1);
    }
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    // Band-pass filter to shape noise into a "thock"
    const noiseBpf = ctx.createBiquadFilter();
    noiseBpf.type = "bandpass";
    noiseBpf.frequency.setValueAtTime(1800, now);
    noiseBpf.Q.setValueAtTime(0.8, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.9, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    noiseSource.connect(noiseBpf);
    noiseBpf.connect(noiseGain);
    noiseGain.connect(master);
    noiseSource.start(now);
    noiseSource.stop(now + 0.04);

    // ── Layer 2: Tone body (the "thock" fundamental) ───────────
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.025);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.6, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(oscGain);
    oscGain.connect(master);
    osc.start(now);
    osc.stop(now + 0.04);

    // ── Layer 3: High tick (the crisp click top end) ───────────
    const tick = ctx.createOscillator();
    tick.type = "square";
    tick.frequency.setValueAtTime(4400, now);
    tick.frequency.exponentialRampToValueAtTime(2200, now + 0.006);

    const tickGain = ctx.createGain();
    tickGain.gain.setValueAtTime(0.12, now);
    tickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.008);

    // High-pass to keep only the click edge
    const tickHpf = ctx.createBiquadFilter();
    tickHpf.type = "highpass";
    tickHpf.frequency.setValueAtTime(3000, now);

    tick.connect(tickHpf);
    tickHpf.connect(tickGain);
    tickGain.connect(master);
    tick.start(now);
    tick.stop(now + 0.01);
  }, [volume, getCtx]);

  return { playClick };
}
