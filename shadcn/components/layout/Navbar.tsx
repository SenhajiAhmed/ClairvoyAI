"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isNavVisible, setIsNavVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavVisible(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 bg-background/85 backdrop-blur-md border-b border-white/5 transition-opacity duration-500",
        isNavVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="max-w-[1200px] mx-auto flex justify-between items-center py-4 px-8">
        <div className="font-crimson-pro font-bold text-2xl tracking-wide text-amber-500 drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]">
          AI Atuariel
        </div>
        <div className="hidden md:flex gap-8">
          <a href="#overview" className="text-secondary-foreground hover:text-white transition-colors duration-300">Vision</a>
          <a href="#intelligence" className="text-secondary-foreground hover:text-white transition-colors duration-300">Alchemy</a>
          <a href="#adaptability" className="text-secondary-foreground hover:text-white transition-colors duration-300">Quantum Focus</a>
          <a href="#vision" className="text-secondary-foreground hover:text-white transition-colors duration-300">Omniscience</a>
          <a href="#register" className="text-secondary-foreground hover:text-white transition-colors duration-300">Initiate</a>
        </div>
        <div>
          <Button
            className="bg-gradient-to-br from-primary to-secondary text-white font-crimson-pro font-semibold border-border border transition-all duration-300 ease-out hover:border-amber-500 hover:-translate-y-px hover:shadow-[0_0_25px_rgba(192,90,62,0.8),inset_0_0_15px_rgba(212,175,55,0.5)] shadow-[0_0_15px_rgba(178,26,39,0.5),inset_0_0_10px_rgba(192,90,62,0.4)]"
          >
            Enter Hackathon
          </Button>
        </div>
      </div>
    </nav>
  );
}
