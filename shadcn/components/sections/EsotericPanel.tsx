"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface EsotericPanelProps {
  id: string;
  title: string;
  alignment: 'left' | 'right';
  children: React.ReactNode;
}

export default function EsotericPanel({ id, title, alignment, children }: EsotericPanelProps) {
  const fadeBase = "clairvoy-fade-text opacity-0 translate-y-[30px] transition-all duration-700 ease-out";
  
  const isLeft = alignment === 'left';

  const containerClasses = cn(
    "sticky top-0 h-screen flex flex-col justify-center w-full px-[5%] mx-auto max-w-[400px]",
    isLeft ? "items-start text-left md:ml-[5%] text-center md:text-left" : "items-end text-right md:mr-[5%] md:ml-auto text-center md:text-right"
  );

  const cardBorderClasses = isLeft 
    ? "border-l-[3px] border-l-accent border-y-0 border-r-0 md:rounded-r-md md:rounded-l-none shadow-[inset_2px_0_10px_rgba(6,182,212,0.1)]"
    : "border-r-[3px] border-r-accent border-y-0 border-l-0 md:rounded-l-md md:rounded-r-none shadow-[inset_-2px_0_10px_rgba(6,182,212,0.1)]";

  return (
    <section className="h-[150vh] w-full relative" id={id}>
      <div className={containerClasses}>
        <h2 className={cn("font-crimson-pro text-4xl md:text-[4.5rem] font-bold tracking-tight mb-4 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-primary-foreground to-amber-500 drop-shadow-[0_4px_20px_rgba(185,28,28,0.5)]", fadeBase)}>
          {title}
        </h2>
        <Card className={cn("bg-card/80 backdrop-blur-xl border-t border-t-accent/10 mt-8 rounded-lg", cardBorderClasses, fadeBase)}>
          <CardContent className="p-6 flex flex-col gap-3 font-sans text-lg text-muted-foreground drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {children}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
