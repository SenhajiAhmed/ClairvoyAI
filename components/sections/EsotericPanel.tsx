"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface EsotericPanelProps {
  id: string;
  title: string;
  subtitle?: string;
  alignment: 'left' | 'right';
  children: React.ReactNode;
}

export default function EsotericPanel({ id, title, subtitle, alignment, children }: EsotericPanelProps) {
  const fadeBase = "clairvoy-fade-text opacity-0 translate-y-[40px] transition-all duration-1000 ease-out";
  
  const isLeft = alignment === 'left';

  // Strongly anchor to the extreme edges to prevent obscuring the central canvas
  const containerClasses = cn(
    "sticky top-0 h-screen w-full flex flex-col justify-center pointer-events-none px-6 md:px-12 xl:px-24",
    isLeft ? "items-start text-left" : "items-end text-right"
  );

  const cardBorderClasses = isLeft 
    ? "border-cyan-accent md:rounded-r-xl"
    : "border-indigo-accent md:rounded-l-xl";

  return (
    <section className="h-[200vh] w-full relative" id={id}>
      <div className={containerClasses}>
        
        {/* Maximum constraints on width so it stays strictly in the corners */}
        <div className="pointer-events-auto max-w-[450px] w-full flex flex-col gap-6 relative">
          
          {/* Ambient background glow behind the text */}
          <div className={cn(
            "absolute top-1/2 -translate-y-1/2 w-[150%] h-[150%] rounded-full blur-[100px] -z-10 opacity-30 pointer-events-none",
            isLeft ? "-left-1/2 bg-cyan-600/40" : "-right-1/2 bg-indigo-600/40"
          )} />

          <div className={fadeBase}>
            {subtitle && (
              <p className="font-mono text-xs md:text-sm text-cyan-400 uppercase tracking-[0.3em] mb-2 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                {subtitle}
              </p>
            )}
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-wider leading-[1.15] text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-indigo-300 drop-shadow-[0_0_15px_rgba(124,58,237,0.4)] neon-pulse">
              {title}
            </h2>
          </div>

          <div className={cn("glass-panel glimmer-effect mt-2 overflow-hidden", cardBorderClasses, fadeBase)}>
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-500/0 via-cyan-400/50 to-cyan-500/0"></div>
            <CardContent className="relative z-10 p-8 flex flex-col gap-4 font-sans text-base md:text-lg text-slate-300 drop-shadow-md leading-relaxed">
              {children}
            </CardContent>
          </div>
          
        </div>
      </div>
    </section>
  );
}
