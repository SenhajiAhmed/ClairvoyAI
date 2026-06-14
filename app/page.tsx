"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import EyeCanvas from "@/components/canvas/EyeCanvas";
import EsotericPanel from "@/components/sections/EsotericPanel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ClairvoyAIPage(): JSX.Element {
  // Intersection Observer for fade text
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Toggle the settled state so modules re-animate each time they
        // scroll back into view — the CSS handles easing, blur & stagger.
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll(".reveal");
    fadeElements.forEach((el) => observer.observe(el));

    return () => {
      fadeElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Hero copy is anchored bottom-left, so it slides in from the left.
  const fadeBase = "reveal reveal-from-left reveal-blur";

  return (
    <div className="w-full min-h-screen bg-background relative hud-grid">
      {/* Background radial gradient to add depth behind the canvas */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-background to-background -z-10 pointer-events-none"></div>

      <Navbar />
      
      {/* Render the 3D Eye Animation Layer underneath the text sections */}
      <EyeCanvas />

      <main className="relative w-full z-10 selection:bg-cyan-500/30 selection:text-cyan-50">
        
        {/* Step 1 - Hero strictly anchored to bottom-left */}
        <section className="h-[200vh] w-full relative" id="overview" style={{ contain: 'layout paint' }}>
          <div className="sticky top-0 h-screen w-full flex flex-col justify-end items-start pointer-events-none px-6 md:px-12 xl:px-24 pb-20 md:pb-32">
            <div className={cn("pointer-events-auto relative z-10 text-left max-w-[640px]", fadeBase)}>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[2px] bg-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,1)]" />
                <span className="font-mono text-xs md:text-sm text-cyan-400 uppercase tracking-[0.4em] font-bold drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]">Datathon Actuariel National · INSEA Rabat</span>
              </div>

              <h2 className="font-sans text-lg md:text-2xl text-slate-300 font-light tracking-[0.1em] border-l-2 border-indigo-500 pl-4 ml-1">
                Vers une clairvoyance algorithmique — l’IA au service du risque actuariel.
              </h2>
            </div>
          </div>
        </section>

        {/* Step 2 - Right anchored */}
        <EsotericPanel
          id="contexte"
          title="Une Profession en Mutation."
          subtitle="// 01 · CONTEXTE"
          alignment="right"
        >
          <div className="flex flex-col gap-4 font-mono text-sm tracking-wide">
            <p className="text-cyan-300">
              <span className="text-indigo-400 font-bold pr-2">&gt;</span>
              La profession actuarielle se transforme sous l’effet du numérique, de Solvabilité II et d’IFRS 17.
            </p>
            <p>
              <span className="text-indigo-400 font-bold pr-2">&gt;</span>
              L’apprentissage automatique redéfinit la tarification, le provisionnement et la gestion des risques.
            </p>
            <p>
              <span className="text-indigo-400 font-bold pr-2">&gt;</span>
              Former des actuaires alliant rigueur mathématique, données massives et modélisation stochastique.
            </p>
          </div>
        </EsotericPanel>

        {/* Step 3 - Left anchored */}
        <EsotericPanel
          id="objectifs"
          title="Nos Objectifs."
          subtitle="// 02 · OBJECTIFS"
          alignment="left"
        >
          <ul className="list-none space-y-5 font-sans relative">
            {/* High-tech list styling */}
            <div className="absolute left-1.5 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-500/50 via-indigo-500/50 to-transparent"></div>
            <li className="relative pl-8">
              <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-cyan-400 bg-background shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
              <span className="text-white font-medium">Données assurantielles réelles</span>
              <p className="text-sm mt-1 text-slate-400">Confronter les participants à des jeux de données réels et représentatifs du marché.</p>
            </li>
            <li className="relative pl-8">
              <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-cyan-400 bg-background shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
              <span className="text-white font-medium">Modélisation appliquée</span>
              <p className="text-sm mt-1 text-slate-400">Développer des compétences concrètes de modélisation prédictive et stochastique.</p>
            </li>
            <li className="relative pl-8">
              <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-cyan-400 bg-background shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
              <span className="text-white font-medium">Collaboration interdisciplinaire</span>
              <p className="text-sm mt-1 text-slate-400">Favoriser le travail d’équipe et la mise en relation avec les acteurs du marché.</p>
            </li>
            <li className="relative pl-8">
              <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-cyan-400 bg-background shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
              <span className="text-white font-medium">Expertise quantitative de l’INSEA</span>
              <p className="text-sm mt-1 text-slate-400">Valoriser le savoir-faire de l’Institut et stimuler le leadership des participants.</p>
            </li>
          </ul>
        </EsotericPanel>

        {/* Step 3b - Right anchored */}
        <EsotericPanel
          id="format"
          title="Format & Déroulé."
          subtitle="// 03 · LE DATATHON"
          alignment="right"
        >
          <div className="flex flex-col gap-4 font-mono text-sm tracking-wide">
            <p className="text-cyan-300">
              <span className="text-indigo-400 font-bold pr-2">&gt;</span>
              2 jours, 16 heures effectives de compétition — INSEA, Rabat · Novembre 2026.
            </p>
            <p>
              <span className="text-indigo-400 font-bold pr-2">&gt;</span>
              Compétition par équipes de 3 à 4 membres, complétée par des tables rondes.
            </p>
            <p>
              <span className="text-indigo-400 font-bold pr-2">&gt;</span>
              100 à 150 participants : Jour 1 lancement et ateliers, Jour 2 présentations et remise des prix.
            </p>
          </div>
        </EsotericPanel>

        {/* Step 3c - Left anchored */}
        <EsotericPanel
          id="evaluation"
          title="Jury & Critères."
          subtitle="// 04 · ÉVALUATION"
          alignment="left"
        >
          <ul className="list-none space-y-5 font-sans relative">
            {/* High-tech list styling */}
            <div className="absolute left-1.5 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-500/50 via-indigo-500/50 to-transparent"></div>
            <li className="relative pl-8">
              <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-cyan-400 bg-background shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
              <span className="text-white font-medium">Rigueur méthodologique</span>
              <p className="text-sm mt-1 text-slate-400">Solidité de la démarche statistique et actuarielle mobilisée.</p>
            </li>
            <li className="relative pl-8">
              <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-cyan-400 bg-background shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
              <span className="text-white font-medium">Performance prédictive</span>
              <p className="text-sm mt-1 text-slate-400">Qualité et précision des modèles face aux données de test.</p>
            </li>
            <li className="relative pl-8">
              <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-cyan-400 bg-background shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
              <span className="text-white font-medium">Interprétation actuarielle</span>
              <p className="text-sm mt-1 text-slate-400">Lecture métier des résultats et pertinence des recommandations.</p>
            </li>
            <li className="relative pl-8">
              <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-cyan-400 bg-background shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
              <span className="text-white font-medium">Clarté de la présentation</span>
              <p className="text-sm mt-1 text-slate-400">Restitution orale évaluée par un jury mixte académique–professionnel.</p>
            </li>
          </ul>
        </EsotericPanel>

        {/* Step 3d - Right anchored */}
        <EsotericPanel
          id="intervenants"
          title="Un Jury d’Exception."
          subtitle="// 05 · INTERVENANTS"
          alignment="right"
        >
          <div className="flex flex-col gap-4 font-mono text-sm tracking-wide">
            <p className="text-cyan-300">
              <span className="text-indigo-400 font-bold pr-2">&gt;</span>
              Experts du secteur : actuaires conseils IFRS 17 / Solvabilité II, Chief Data Officers, directeurs des risques.
            </p>
            <p>
              <span className="text-indigo-400 font-bold pr-2">&gt;</span>
              Universitaires en mathématiques actuarielles, statistique bayésienne et IA (INSEA, UM6P, FS Rabat).
            </p>
            <p>
              <span className="text-indigo-400 font-bold pr-2">&gt;</span>
              Professionnels certifiés : lauréats INSEA, ENSIAS et UM6P, actuaires titulaires FSA ou CERA.
            </p>
          </div>
        </EsotericPanel>

        {/* Step 3e - Left anchored */}
        <EsotericPanel
          id="retombees"
          title="Impact Attendu."
          subtitle="// 06 · RETOMBÉES"
          alignment="left"
        >
          <ul className="list-none space-y-5 font-sans relative">
            {/* High-tech list styling */}
            <div className="absolute left-1.5 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-500/50 via-indigo-500/50 to-transparent"></div>
            <li className="relative pl-8">
              <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-cyan-400 bg-background shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
              <span className="text-white font-medium">Formation ↔ Marché</span>
              <p className="text-sm mt-1 text-slate-400">Rapprocher la formation universitaire en actuariat des besoins du marché marocain.</p>
            </li>
            <li className="relative pl-8">
              <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-cyan-400 bg-background shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
              <span className="text-white font-medium">Réseau pérenne</span>
              <p className="text-sm mt-1 text-slate-400">Créer un réseau durable entre acteurs académiques, institutionnels et professionnels.</p>
            </li>
            <li className="relative pl-8">
              <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-cyan-400 bg-background shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
              <span className="text-white font-medium">Visibilité nationale</span>
              <p className="text-sm mt-1 text-slate-400">Renforcer la visibilité de la profession actuarielle auprès des grandes écoles.</p>
            </li>
          </ul>
        </EsotericPanel>

        {/* Step 4 - Right anchored CTA */}
        <section className="h-[200vh] w-full relative" id="register" style={{ contain: 'layout paint' }}>
          <div className="sticky top-0 h-screen w-full flex flex-col justify-end items-end pointer-events-none px-6 md:px-12 xl:px-24 pb-20 md:pb-32">
            
            <div className={cn("pointer-events-auto glass-panel border-indigo-accent p-10 md:p-14 w-full max-w-[600px] relative z-20 text-right group reveal reveal-from-right")}>
              
              {/* Ethereal Ambient Orb inside card */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-600/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-indigo-500/20 transition-colors duration-1000 -z-10" />
              
              <div className="flex flex-col items-end relative z-10 w-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-sm text-cyan-400 uppercase tracking-[0.4em] font-bold">Inscriptions ouvertes</span>
                  <span className="w-8 h-[2px] bg-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,1)]" />
                </div>

                <h2 className="font-heading text-4xl md:text-6xl font-black tracking-widest mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-l from-cyan-300 to-indigo-100 drop-shadow-[0_0_20px_rgba(6,182,212,0.6)] neon-pulse pb-2">
                  REJOINS LE<br/>DATATHON.
                </h2>

                <p className="font-sans text-base md:text-lg text-slate-300 mb-10 max-w-md">
                  La première compétition actuarielle de ce type au Maroc, organisée par Epik Leaders INSEA en partenariat avec le Cluster Digital Africa.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-end gap-6 w-full">
                  <a href="https://www.inseaepikleaders.com" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-indigo-300 hover:text-cyan-300 transition-colors duration-300 uppercase tracking-[0.2em] relative before:absolute before:-bottom-1 before:left-0 before:w-full before:h-px before:bg-indigo-300/50 hover:before:bg-cyan-300 before:transition-colors">
                    inseaepikleaders.com
                  </a>

                  <Button
                    asChild
                    size="lg"
                    className="relative overflow-hidden group/btn bg-primary/20 backdrop-blur-md px-10 py-8 text-lg text-white font-heading font-black tracking-widest border border-cyan-500/50 transition-all duration-500 ease-out hover:border-cyan-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] shadow-[0_0_20px_rgba(124,58,237,0.4)] w-full sm:w-auto min-w-[240px]"
                  >
                    <a href="https://www.inseaepikleaders.com" target="_blank" rel="noopener noreferrer">
                      <span className="relative z-10 uppercase flex items-center justify-center gap-3">
                        S’inscrire
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right group-hover/btn:translate-x-2 transition-transform duration-300"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                      </span>
                      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent -translate-x-[150%] skew-x-[30deg] group-hover/btn:animate-[glimmer_2s_infinite_ease-in-out]" />
                    </a>
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
