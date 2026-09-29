import { test } from "node:test";
import assert from "node:assert/strict";
import { getCountdown } from "./countdown.ts";
const target = "2026-12-19T00:00:00-06:00";
test("respeta la zona horaria y descompone el tiempo restante", () => {
  assert.deepEqual(getCountdown(target, Date.parse("2026-12-18T04:57:56Z")), {
    days: 1, hours: 1, minutes: 2, seconds: 4, complete: false,
  });
});
test("se detiene en cero en la fecha y después", () => {
  for (const now of [Date.parse(target), Date.parse(target) + 86400000]) {
    assert.deepEqual(getCountdown(target, now), { days: 0, hours: 0, minutes: 0, seconds: 0, complete: true });
  }
});
