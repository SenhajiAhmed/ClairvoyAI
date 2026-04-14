"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import EyeCanvas from "@/components/canvas/EyeCanvas";
import EsotericPanel from "@/components/sections/EsotericPanel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ClairvoyAIPage() {
  // Intersection Observer for fade text
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0", "scale-100");
          entry.target.classList.remove("opacity-0", "translate-y-[40px]", "scale-95");
        } else {
          entry.target.classList.add("opacity-0", "translate-y-[40px]", "scale-95");
          entry.target.classList.remove("opacity-100", "translate-y-0", "scale-100");
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll(".clairvoy-fade-text");
    fadeElements.forEach((el) => observer.observe(el));

    return () => {
      fadeElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const fadeBase = "clairvoy-fade-text opacity-0 translate-y-[40px] scale-95 transition-all duration-[1200ms] ease-out";

  return (
    <div className="w-full min-h-screen bg-background relative hud-grid">
      {/* Background radial gradient to add depth behind the canvas */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-background to-background -z-10 pointer-events-none"></div>

      <Navbar />
      
      {/* Render the 3D Eye Animation Layer underneath the text sections */}
      <EyeCanvas />

      <main className="relative w-full z-10 selection:bg-cyan-500/30 selection:text-cyan-50">
        
        {/* Step 1 - Hero strictly anchored to bottom-left */}
        <section className="h-[200vh] w-full relative" id="overview">
          <div className="sticky top-0 h-screen w-full flex flex-col justify-end items-start pointer-events-none px-6 md:px-12 xl:px-24 pb-20 md:pb-32">
            <div className={cn("pointer-events-auto relative z-10 text-left max-w-[600px]", fadeBase)}>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[2px] bg-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,1)]" />
                <span className="font-mono text-xs md:text-sm text-cyan-400 uppercase tracking-[0.4em] font-bold drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]">System Online</span>
              </div>

              <h2 className="font-sans text-lg md:text-2xl text-slate-300 font-light tracking-[0.1em] border-l-2 border-indigo-500 pl-4 ml-1">
                Omniscience & Computation Core
              </h2>
            </div>
          </div>
        </section>

        {/* Step 2 - Right anchored */}
        <EsotericPanel 
          id="intelligence" 
          title="Neural Telemetry." 
          subtitle="// MODULE 01: OBSERVATION"
          alignment="right"
        >
          <div className="flex flex-col gap-4 font-mono text-sm tracking-wide">
            <p className="text-cyan-300">
              <span className="text-indigo-400 font-bold pr-2">&gt;</span>
              High-bandwidth data-filtration nodes actively scanning global streams.
            </p>
            <p>
              <span className="text-indigo-400 font-bold pr-2">&gt;</span>
              Precision-engineered quantum pathways forging deep-learning structures.
            </p>
            <p>
              <span className="text-indigo-400 font-bold pr-2">&gt;</span>
              Optimized for perpetual computation endurance & architectural scale.
            </p>
          </div>
        </EsotericPanel>

        {/* Step 3 - Left anchored */}
        <EsotericPanel 
          id="adaptability" 
          title="Actuarial Matrix." 
          subtitle="// MODULE 02: ANALYSIS"
          alignment="left"
        >
          <ul className="list-none space-y-5 font-sans relative">
            {/* High-tech list styling */}
            <div className="absolute left-1.5 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-500/50 via-indigo-500/50 to-transparent"></div>
            <li className="relative pl-8">
              <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-cyan-400 bg-background shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
              <span className="text-white font-medium">Distributed Multi-Node Processing</span>
              <p className="text-sm mt-1 text-slate-400">Synchronized logic gates executing millions of parallel probabilities.</p>
            </li>
            <li className="relative pl-8">
              <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-cyan-400 bg-background shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
              <span className="text-white font-medium">Ethereal Data Mapping</span>
              <p className="text-sm mt-1 text-slate-400">Translating chaotic variables into crystalline geometric forecasts.</p>
            </li>
          </ul>
        </EsotericPanel>

        {/* Step 4 - Right anchored CTA */}
        <section className="h-[200vh] w-full relative" id="register">
          <div className="sticky top-0 h-screen w-full flex flex-col justify-end items-end pointer-events-none px-6 md:px-12 xl:px-24 pb-20 md:pb-32">
            
            <div className={cn("pointer-events-auto glass-panel border-indigo-accent p-10 md:p-14 w-full max-w-[600px] relative z-20 text-right group", fadeBase)}>
              
              {/* Ethereal Ambient Orb inside card */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-600/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-indigo-500/20 transition-colors duration-1000 -z-10" />
              
              <div className="flex flex-col items-end relative z-10 w-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-sm text-cyan-400 uppercase tracking-[0.4em] font-bold">Terminal Access Grants</span>
                  <span className="w-8 h-[2px] bg-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,1)]" />
                </div>
                
                <h2 className="font-heading text-4xl md:text-6xl font-black tracking-widest mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-l from-cyan-300 to-indigo-100 drop-shadow-[0_0_20px_rgba(6,182,212,0.6)] neon-pulse pb-2">
                  TRANSCEND<br/>CODE.
                </h2>
                
                <p className="font-sans text-base md:text-lg text-slate-300 mb-10 max-w-md">
                  Join the actuarial ecosystem. Synthesize foresight with absolute computation.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-end gap-6 w-full">
                  <a href="#" className="font-mono text-xs text-indigo-300 hover:text-cyan-300 transition-colors duration-300 uppercase tracking-[0.2em] relative before:absolute before:-bottom-1 before:left-0 before:w-full before:h-px before:bg-indigo-300/50 hover:before:bg-cyan-300 before:transition-colors">
                    Consult Grimoire.SYS
                  </a>
                  
                  <Button
                    size="lg"
                    className="relative overflow-hidden group/btn bg-primary/20 backdrop-blur-md px-10 py-8 text-lg text-white font-heading font-black tracking-widest border border-cyan-500/50 transition-all duration-500 ease-out hover:border-cyan-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] shadow-[0_0_20px_rgba(124,58,237,0.4)] w-full sm:w-auto min-w-[240px]"
                  >
                    <span className="relative z-10 uppercase flex items-center justify-center gap-3">
                      Initiate Link
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right group-hover/btn:translate-x-2 transition-transform duration-300"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </span>
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent -translate-x-[150%] skew-x-[30deg] group-hover/btn:animate-[glimmer_2s_infinite_ease-in-out]" />
                  </Button>
                </div>
              </div>
              
              {/* Corner decor */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/50 m-4"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-indigo-500/50 m-4"></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
