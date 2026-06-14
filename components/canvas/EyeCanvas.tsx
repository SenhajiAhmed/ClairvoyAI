"use client";

import React, { useEffect, useRef, useState } from "react";

export default function EyeCanvas(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameCount = 240;

  // Cache HTMLImageElements to draw synchronously
  const imagesCache = useRef<(HTMLImageElement | null)[]>([]);
  // Track loading state and errors
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  // Track retry attempts for each image
  const retryCounts = useRef<Record<number, number>>({});

  const currentFrame = (index: number): string =>
    `/exploded_eye/ezgif-frame-${index.toString().padStart(3, "0")}.webp`;

  useEffect(() => {
    // Preload frames once, but with limited concurrency instead of firing all
    // 240 requests at once. This lets frame 1 (and the reveal) arrive fast and
    // keeps nearby frames ready as you scroll, without saturating the network.
    if (imagesCache.current.length > 0) return;
    imagesCache.current = new Array(frameCount + 1); // 1-indexed

    // Track retry attempts for each image
    retryCounts.current = {};

    const CONCURRENCY = 8;
    let nextToLoad = 1;
    const MAX_RETRIES = 3;

    const loadNext = () => {
      if (nextToLoad > frameCount) return;
      const i = nextToLoad++;
      const img = new Image();
      // Decode off main thread to prevent UI stutter/jank while scrolling
      img.decoding = "async";

      img.onload = (): void => {
        // Successfully loaded
        imagesCache.current[i] = img;
        setLoadedCount(prev => prev + 1);
        loadNext(); // Load next image
      };

      img.onerror = (): void => {
        // Failed to load
        const currentRetry = (retryCounts.current[i] || 0) + 1;
        retryCounts.current[i] = currentRetry;

        if (currentRetry <= MAX_RETRIES) {
          // Retry loading this image
          img.src = currentFrame(i);
        } else {
          // Max retries exceeded, mark as failed
          imagesCache.current[i] = null;
          setFailedCount(prev => prev + 1);

          // If too many images fail, show error state
          if (failedCount + 1 > frameCount * 0.5) { // More than 50% failed
            setLoadError(`Failed to load too many images (${failedCount + 1}/${frameCount}). Please check your connection and try again.`);
          }

          loadNext(); // Continue with next image
        }
      };

      img.src = currentFrame(i);
    };

    // Kick off CONCURRENCY parallel loaders that walk the frames in order
    for (let k = 0; k < CONCURRENCY; k++) loadNext();
  }, [frameCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Performance optimization: alpha: false allows GPU to ignore transparency layer
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    // Size will be set from actual image dimensions once the first frame loads

    let targetFrame = 1;
    let currentRenderFrame = 1;
    let lastDrawnFrame = 0;
    let animationFrameId: number;

    const drawFrame = (index: number): boolean => {
      const img = imagesCache.current[index];
      // Draw synchronously if already loaded and not null
      if (img && img !== null && img.complete && img.naturalHeight !== 0) {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        return true;
      }
      return false;
    };

    // Attempt to quickly draw initial frame once it loads to show the canvas
    const initInterval = setInterval(() => {
      const img = imagesCache.current[1];
      if (img && img !== null && img.complete && img.naturalHeight !== 0) {
        // Match canvas internal resolution to the actual image so no quality is lost
        canvas.width = img.naturalWidth || 2560;
        canvas.height = img.naturalHeight || 1440;
        // Resizing the canvas resets context state, so (re)apply high-quality
        // resampling here — keeps edges clean when the browser scales the
        // canvas to the viewport.
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        if (drawFrame(1)) {
          setIsLoaded(true);
          lastDrawnFrame = 1;
          clearInterval(initInterval);
        }
      } else if (loadError) {
        // If we have a load error, stop trying to load
        clearInterval(initInterval);
      }
    }, 50);

    const renderLoop = () => {
      // If we have a load error, don't render anything
      if (loadError) {
        return;
      }

      // Adaptive lerp smoothing: more responsive when far from target, smoother when close
      const frameDiff = Math.abs(targetFrame - currentRenderFrame);
      const normalizedDiff = Math.min(frameDiff / frameCount, 1); // 0 to 1
      const lerpFactor = 0.1 + normalizedDiff * 0.7; // Range from 0.1 to 0.8
      currentRenderFrame += (targetFrame - currentRenderFrame) * lerpFactor;

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
        const scrollFraction = Math.min(1, scrollTop / maxScroll);
        // Map 0–100% scroll evenly across all frames 1–240 (no off-by-one clipping)
        targetFrame = Math.round(scrollFraction * (frameCount - 1)) + 1;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearInterval(initInterval);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [frameCount, loadError]);

  // If we have an error, show it instead of the canvas
  if (loadError) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm z-50 p-6 text-center">
        <div className="bg-card/80 backdrop-blur rounded-2xl p-8 max-w-lg w-full border border-border/50">
          <h2 className="font-heading text-2xl mb-4 text-destructive">Image Loading Error</h2>
          <p className="text-muted-foreground mb-6">{loadError}</p>
          <button
            onClick={() => {
              setLoadError(null);
              setIsLoaded(false);
              setLoadedCount(0);
              setFailedCount(0);
              // Reset cache to trigger reload
              imagesCache.current = [];
            }}
            className="btn-primary w-full"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed top-[96px] md:top-[120px] left-0 w-full h-[calc(100vh-96px)] md:h-[calc(100vh-120px)] z-0 flex justify-center items-center pointer-events-none transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Loading progress indicator */}
      {!isLoaded && loadedCount > 0 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-muted-foreground text-sm">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
          <span>Loading frames: {loadedCount}/{frameCount}</span>
          {failedCount > 0 && (
            <span className="text-destructive ml-2">(Failed: {failedCount})</span>
          )}
        </div>
      )}

      <canvas ref={canvasRef} className="w-full h-full object-cover"></canvas>
    </div>
  );
}
