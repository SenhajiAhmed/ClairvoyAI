import type { Metadata } from "next";
import { Orbitron, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "ClairvoyAI — Omniscience & Computation",
  description: "ClairvoyAI by AI Atuariel: Where actuarial intelligence meets computational vision. Hack the future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-full flex flex-col antialiased dark bg-background text-foreground",
          orbitron.variable,
          spaceGrotesk.variable,
          spaceMono.variable,
          "font-[family-name:var(--font-space-grotesk)]"
        )}
      >
        {children}
      </body>
    </html>
  );
}
