"use client";

import React, { useEffect, useRef, useState } from "react";

export default function EyeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameCount = 240;
  
  // Cache HTMLImageElements to draw synchronously
  const imagesCache = useRef<HTMLImageElement[]>([]);
  // Start with opacity 0 to prevent flashing before first frame loads
  const [isLoaded, setIsLoaded] = useState(false);

  const currentFrame = (index: number) =>
    `/exploded_eye/ezgif-frame-${index.toString().padStart(3, "0")}.jpg`;

  useEffect(() => {
    // Preload elements into memory once
    if (imagesCache.current.length === 0) {
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        // Decode off main thread to prevent UI stutter/jank while scrolling
        img.decoding = "async"; 
        img.src = currentFrame(i);
        imagesCache.current[i] = img; // 1-indexed based on frames
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Performance optimization: alpha: false allows GPU to ignore transparency layer
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    canvas.width = 1920;
    canvas.height = 1080;

    let targetFrame = 1;
    let currentRenderFrame = 1;
    let lastDrawnFrame = 0;
    let animationFrameId: number;

    const drawFrame = (index: number): boolean => {
      const img = imagesCache.current[index];
      // Draw synchronously if already loaded
      if (img && img.complete && img.naturalHeight !== 0) {
        context.drawImage(img, 0, 0);
        return true;
      }
      return false;
    };

    // Attempt to quickly draw initial frame once it loads to show the canvas
    const initInterval = setInterval(() => {
      if (drawFrame(1)) {
        setIsLoaded(true);
        lastDrawnFrame = 1;
        clearInterval(initInterval);
      }
    }, 50);

    const renderLoop = () => {
      // Lerp smoothing factor. 0.08 offers a buttery "easing" follow to the mouse wheel.
      currentRenderFrame += (targetFrame - currentRenderFrame) * 0.08;
      
      const nextFrame = Math.max(1, Math.min(frameCount, Math.round(currentRenderFrame)));

      // Huge performance boost: only re-paint when the frame actually changes
      if (nextFrame !== lastDrawnFrame) {
        const drawSuccess = drawFrame(nextFrame);
        // ONLY update lastDrawnFrame if the image was successfully decoded and painted
        // Otherwise, it will try again next tick.
        // This completely eliminates "flashing" or race conditions when scrolling fast over unloaded images.
        if (drawSuccess) {
          lastDrawnFrame = nextFrame;
        }
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    const handleScroll = () => {
      // Using window.scrollY is faster than documentElement.scrollTop
      const scrollTop = Math.max(0, window.scrollY);
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

      if (maxScroll > 0) {
        const scrollFraction = scrollTop / maxScroll;
        const index = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount));
        targetFrame = index + 1;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearInterval(initInterval);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      className={`fixed top-0 left-0 w-full h-screen z-0 flex justify-center items-center pointer-events-none transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <canvas ref={canvasRef} className="w-full h-full object-cover"></canvas>
    </div>
  );
}
