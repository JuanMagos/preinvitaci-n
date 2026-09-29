// Polling evita límites de watchers en carpetas sincronizadas o entornos restringidos.
process.env.WATCHPACK_POLLING ??= "1000";
process.argv = [process.argv[0], "next", "dev", "--webpack", ...process.argv.slice(2)];
await import("next/dist/bin/next");
