import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Mis XV · 19 de diciembre de 2026",
  description: "Hay momentos que quedan para siempre. Reserva la fecha. Esto apenas comienza…",
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
