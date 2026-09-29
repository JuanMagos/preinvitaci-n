"use client";
import { useEffect, useState } from "react";
import { event } from "@/lib/event";
import { getCountdown } from "@/lib/countdown";
export function Countdown() {
  const [remaining, setRemaining] = useState<ReturnType<typeof getCountdown> | null>(null);
  useEffect(() => {
    const update = () => setRemaining(getCountdown(event.date, Date.now()));
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);
  return <div className="countdown-wrap">
    <p className="eyebrow">{remaining?.complete ? "El día ha llegado" : "Cada segundo nos acerca"}</p>
    <dl className="countdown" aria-label={`Cuenta regresiva al ${event.dateLabel}`}>
      {([['days', 'Días'], ['hours', 'Horas'], ['minutes', 'Minutos'], ['seconds', 'Segundos']] as const).map(([key, label]) =>
        <div key={key}><dd>{remaining ? String(remaining[key]).padStart(2, "0") : "—"}</dd><dt>{label}</dt></div>)}
    </dl>
    <p className="sr-only" role="status">{remaining?.complete ? "Llegó el 19 de diciembre de 2026." : ""}</p>
  </div>;
}
