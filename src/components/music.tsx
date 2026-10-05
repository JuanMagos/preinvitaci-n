"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { event } from "@/lib/event";

export function useMusic() {
  const audio = useRef<HTMLAudioElement>(null);
  const fade = useRef<number | null>(null);
  const request = useRef(0);
  const autoStartDone = useRef(false);
  const scrollAttempted = useRef(false);
  const pending = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState("");
  const cancelFade = useCallback(() => {
    if (fade.current !== null) cancelAnimationFrame(fade.current);
    fade.current = null;
  }, []);
  const pause = useCallback(() => {
    autoStartDone.current = true;
    pending.current = false;
    request.current += 1;
    cancelFade();
    audio.current?.pause();
    setPlaying(false);
  }, [cancelFade]);
  const play = useCallback(async (source: "manual" | "scroll" | "gesture" = "manual") => {
    if (source === "manual") autoStartDone.current = true;
    else if (autoStartDone.current || (source === "scroll" && scrollAttempted.current)) return;
    const player = audio.current;
    if (!player || !player.paused || pending.current) return;
    if (source === "scroll") scrollAttempted.current = true;
    pending.current = true;
    const id = ++request.current;
    cancelFade();
    player.volume = 0;
    setError("");
    try {
      await player.play();
      if (request.current !== id) return;
      autoStartDone.current = true;
      setPlaying(true);
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - start) / 2200, 1);
        player.volume = progress * 0.42;
        if (progress < 1) fade.current = requestAnimationFrame(step);
      };
      fade.current = requestAnimationFrame(step);
    } catch (cause) {
      if (request.current === id) {
        setPlaying(false);
        // A blocked automatic attempt is not a playback error for the guest.
        // Keep the existing controls available without showing a scroll popup.
        const autoplayBlocked = cause instanceof DOMException && cause.name === "NotAllowedError";
        setError(autoplayBlocked && source !== "manual"
          ? ""
          : "No se pudo iniciar la música. Toca reproducir para intentarlo de nuevo.");
      }
    } finally {
      if (request.current === id) pending.current = false;
    }
  }, [cancelFade]);
  useEffect(() => {
    const onVisibility = () => { if (document.hidden) pause(); };
    document.addEventListener("visibilitychange", onVisibility);
    return () => { document.removeEventListener("visibilitychange", onVisibility); cancelFade(); };
  }, [pause, cancelFade]);
  return {
    play,
    controls: <>
      <audio ref={audio} src={event.music} loop preload="none" muted={muted}
        onPause={() => setPlaying(false)} onError={() => { setPlaying(false); setError("La música no está disponible. Puedes seguir explorando."); }} />
      <div className="music-controls" aria-label="Controles de música" role="group">
        <button type="button" onClick={() => playing ? pause() : void play()}
          aria-label={playing ? "Pausar música" : "Reproducir música"} aria-pressed={playing}>
          <span className={`wave ${playing && !muted ? "is-playing" : ""}`} aria-hidden="true"><i /><i /><i /><i /></span>
          <span className="music-word">{playing ? "Pausa" : "Música"}</span>
        </button>
        <span className="control-divider" />
        <button type="button" aria-label={muted ? "Activar sonido" : "Silenciar música"} aria-pressed={muted} onClick={() => setMuted(!muted)}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <path d="M11 5 6 9H3v6h3l5 4V5Z" />
            {muted ? <path d="m16 9 5 6m0-6-5 6" /> : <><path d="M15 8a6 6 0 0 1 0 8" /><path d="M18 5a10 10 0 0 1 0 14" /></>}
          </svg>
        </button>
      </div>
      <p className={error ? "audio-error" : "sr-only"} role="status">{error}</p>
    </>,
  };
}
