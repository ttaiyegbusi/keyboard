// ─────────────────────────────────────────────────────────────
// src/hooks/useSound.ts
//
// Soft mechanical keyboard click — Apple Magic Keyboard style.
// Quiet, deep thock with a gentle top-end click.
// Much more pleasant than the previous harsh snap.
//
// Sound design:
//   1. Sub-bass thump   — very short, pitches down fast (the body)
//   2. Mid noise burst  — bandpass filtered, heavy damping (the meat)
//   3. Soft tick        — low-amplitude sine at ~3kHz (the presence)
// All layers are very short and decay quickly → "quiet thock"
// ─────────────────────────────────────────────────────────────

"use client";

import { useRef, useCallback } from "react";
import { VolumeState } from "@/types";

const GAIN_MAP: Record<VolumeState, number> = {
  high: 0.40,
  low:  0.15,
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
    // Resume if suspended (browser autoplay policy)
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const playClick = useCallback(() => {
    const masterGain = GAIN_MAP[volume];
    if (masterGain === 0) return;

    const ctx = getCtx();
    const now = ctx.currentTime;

    // ── Master output gain ─────────────────────────────────────
    const master = ctx.createGain();
    master.gain.setValueAtTime(masterGain, now);
    master.connect(ctx.destination);

    // ── Layer 1: Sub-bass thump ────────────────────────────────
    // A sine that pitches steeply down — gives the "thock" weight.
    const sub = ctx.createOscillator();
    sub.type = "sine";
    sub.frequency.setValueAtTime(160, now);
    sub.frequency.exponentialRampToValueAtTime(55, now + 0.018);

    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(1.0, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.022);

    sub.connect(subGain);
    subGain.connect(master);
    sub.start(now);
    sub.stop(now + 0.025);

    // ── Layer 2: Mid noise burst ───────────────────────────────
    // White noise → bandpass at ~900Hz, heavy Q → soft thud body.
    const bufLen = Math.ceil(ctx.sampleRate * 0.05);
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) data[i] = Math.random() * 2 - 1;

    const noise = ctx.createBufferSource();
    noise.buffer = buf;

    const bpf = ctx.createBiquadFilter();
    bpf.type = "bandpass";
    bpf.frequency.setValueAtTime(900, now);
    bpf.Q.setValueAtTime(1.8, now);

    // Low-pass after BPF to soften it further
    const lpf = ctx.createBiquadFilter();
    lpf.type = "lowpass";
    lpf.frequency.setValueAtTime(2200, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.55, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.038);

    noise.connect(bpf);
    bpf.connect(lpf);
    lpf.connect(noiseGain);
    noiseGain.connect(master);
    noise.start(now);
    noise.stop(now + 0.05);

    // ── Layer 3: Presence tick ─────────────────────────────────
    // Very quiet sine at ~3kHz for just 6ms — adds a tiny "click"
    // without sounding harsh or snappy.
    const tick = ctx.createOscillator();
    tick.type = "sine";
    tick.frequency.setValueAtTime(3200, now);
    tick.frequency.exponentialRampToValueAtTime(1800, now + 0.005);

    const tickGain = ctx.createGain();
    tickGain.gain.setValueAtTime(0.08, now);
    tickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.007);

    tick.connect(tickGain);
    tickGain.connect(master);
    tick.start(now);
    tick.stop(now + 0.008);

  }, [volume, getCtx]);

  return { playClick };
}
