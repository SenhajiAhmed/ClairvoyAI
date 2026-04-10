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
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-[30px]");
        } else {
          entry.target.classList.add("opacity-0", "translate-y-[30px]");
          entry.target.classList.remove("opacity-100", "translate-y-0");
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll(".clairvoy-fade-text");
    fadeElements.forEach((el) => observer.observe(el));

    return () => {
      fadeElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const fadeBase = "clairvoy-fade-text opacity-0 translate-y-[30px] transition-all duration-700 ease-out";

  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <EyeCanvas />

      <main className="relative z-10">
        {/* Step 1 */}
        <section className="h-[150vh] w-full relative" id="overview">
          <div className="sticky top-0 h-screen flex flex-col justify-end w-full px-[5%] items-center text-center max-w-[800px] mx-auto pb-32">
            <h1 className={cn("font-crimson-pro text-5xl md:text-[4.5rem] font-bold tracking-tight mb-4 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-primary-foreground to-amber-500 drop-shadow-[0_4px_20px_rgba(185,28,28,0.5)]", fadeBase)}>
              ClairvoyAI Hackathon
            </h1>
            <h2 className={cn("font-sans text-xl md:text-2xl text-accent mb-8 uppercase tracking-wider drop-shadow-[0_2px_15px_rgba(6,182,212,0.4)]", fadeBase)}>
              The Convergence of Omniscience and Computation.
            </h2>
            <p className={cn("font-sans text-lg md:text-xl text-muted-foreground drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]", fadeBase)}>
              Behold the All-Seeing Eye—an entity possessing magical foresight and a complex computational brain.
            </p>
          </div>
        </section>

        {/* Step 2 */}
        <EsotericPanel id="intelligence" title="Ancient Esoteric Form." alignment="left">
          <p>A rune-like shell of forged metals—copper, bronze, and crimson-tinted steel.</p>
          <p>Revealing itself through organic alchemy: billowing fire, elemental smoke, and intense lens flares.</p>
          <p>Encased within a classical multi-pointed star compass rose representing truth and omniscient observation.</p>
        </EsotericPanel>

        {/* Step 3 */}
        <EsotericPanel id="adaptability" title="Exploded Transformation." alignment="right">
          <ul className="list-none space-y-3 font-sans">
            <li>The ancient exterior breaks apart to uncover a glowing, crystalline core.</li>
            <li>Ethereal cyan energy mapping out floating spheres and rotating quantum rings.</li>
            <li>An ancient exterior hiding a hyper-advanced technological brain.</li>
          </ul>
        </EsotericPanel>

        {/* Step 4 */}
        <EsotericPanel id="vision" title="Clairvoyance meets Computing." alignment="left">
          <p>Ethereal teal circuitry processing infinite actuarial data streams with pure logic.</p>
          <p>Contrasting raw alchemical fire with cold, precise, floating geometry.</p>
        </EsotericPanel>

        {/* Step 5 - CTA */}
        <section className="h-[150vh] w-full relative" id="register">
          <div className="sticky top-0 h-screen flex flex-col justify-end w-full px-[5%] items-center text-center max-w-[800px] mx-auto pb-24">
            <h2 className={cn("font-crimson-pro text-5xl md:text-[4.5rem] font-bold tracking-tight mb-4 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-primary-foreground to-amber-500 drop-shadow-[0_4px_20px_rgba(185,28,28,0.5)]", fadeBase)}>
              Transcend. Code. Evolve.
            </h2>
            <p className={cn("font-sans text-xl md:text-2xl text-accent mb-12 uppercase tracking-wider", fadeBase)}>
              Join the ultimate Actuarial AI ecosystem.
            </p>
            <div className={cn("flex flex-col items-center gap-6", fadeBase)}>
              <Button
                size="lg"
                className="bg-gradient-to-br from-primary to-secondary px-12 py-8 text-2xl text-white font-crimson-pro font-semibold border-border border transition-all duration-300 ease-out hover:border-amber-500 hover:-translate-y-[2px] hover:shadow-[0_0_40px_rgba(192,90,62,0.8),inset_0_0_20px_rgba(212,175,55,0.5)] shadow-[0_0_25px_rgba(178,26,39,0.5),inset_0_0_15px_rgba(192,90,62,0.4)]"
              >
                Register for ClairvoyAI
              </Button>
              <a href="#" className="font-sans text-muted-foreground hover:text-accent border-b border-transparent hover:border-accent transition-all duration-300 pb-1">
                See the Ancient Grimoire (Rules)
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
