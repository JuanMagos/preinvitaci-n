export function getCountdown(target: string, now: number) {
  const timestamp = Date.parse(target);
  if (!Number.isFinite(timestamp)) throw new Error("La fecha del evento no es válida");
  const seconds = Math.max(0, Math.floor((timestamp - now) / 1000));
  return { days: Math.floor(seconds / 86400), hours: Math.floor(seconds / 3600) % 24,
    minutes: Math.floor(seconds / 60) % 60, seconds: seconds % 60, complete: seconds === 0 };
}
