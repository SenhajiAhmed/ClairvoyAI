"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#31353c]/40 backdrop-blur-lg opacity-100 pointer-events-auto transition-all duration-300 border-none shadow-none">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center py-5 px-6 md:px-12">
        
        {/* LOGO CONTAINER */}
        <div className="flex items-center group cursor-pointer relative">
          <div className="absolute -inset-4 bg-cyan-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <img 
            src="/logo1.png" 
            alt="ClairvoyAI Logo" 
            className="h-14 md:h-20 w-auto object-contain scale-[2.2] md:scale-[2.5] origin-left relative z-10 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] filter contrast-125" 
          />
        </div>

        {/* NAVIGATION LINKS */}
        <div className="hidden lg:flex gap-10 font-mono text-xs tracking-[0.2em] uppercase">
          <a href="#overview" className="text-muted-foreground hover:text-cyan-400 transition-colors duration-300 relative group">
            <span className="relative z-10">Telemetry</span>
            <span className="absolute -bottom-2 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#intelligence" className="text-muted-foreground hover:text-cyan-400 transition-colors duration-300 relative group">
            <span className="relative z-10">Neural Core</span>
            <span className="absolute -bottom-2 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#adaptability" className="text-muted-foreground hover:text-cyan-400 transition-colors duration-300 relative group">
            <span className="relative z-10">Actuarial Flow</span>
            <span className="absolute -bottom-2 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#vision" className="text-muted-foreground hover:text-cyan-400 transition-colors duration-300 relative group">
            <span className="relative z-10">Omniscience</span>
            <span className="absolute -bottom-2 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        {/* CTA BUTTON */}
        <div className="flex items-center">
          <Button
            className="group relative overflow-hidden bg-primary/20 backdrop-blur-md text-cyan-50 font-heading font-semibold tracking-wider border border-purple-500/50 hover:border-cyan-400 hover:-translate-y-px transition-all duration-500 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] px-8 py-5"
          >
            <span className="relative z-10 uppercase text-xs tracking-widest flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
              Access Terminal
            </span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-[150%] skew-x-[30deg] group-hover:animate-[glimmer_1.5s_ease-out_infinite]" />
          </Button>
        </div>
      </div>
      
      {/* Decorative Data Line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent data-scan"></div>
    </nav>
  );
}
