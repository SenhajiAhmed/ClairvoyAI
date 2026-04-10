import type { Metadata } from "next";
import { Crimson_Pro, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

const crimsonPro = Crimson_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-crimson-pro"
});

export const metadata: Metadata = {
  title: "ClairvoyAI - The Convergence of Omniscience and Computation",
  description: "ClairvoyAI Hackathon: An esoteric AI event forged by Atuariel. Hack the future.",
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
          inter.variable,
          crimsonPro.variable,
          "font-sans"
        )}
      >
        {children}
      </body>
    </html>
  );
}
