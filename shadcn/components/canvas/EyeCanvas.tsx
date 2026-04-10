"use client";

import React, { useEffect, useRef } from "react";

export default function EyeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameCount = 240;

  const currentFrame = (index: number) =>
    `/exploded_eye/ezgif-frame-${index.toString().padStart(3, "0")}.jpg`;

  useEffect(() => {
    const preloadImages = () => {
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
      }
    };
    preloadImages();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const img = new Image();
    img.src = currentFrame(1);
    canvas.width = 1920;
    canvas.height = 1080;

    img.onload = () => {
      context.drawImage(img, 0, 0);
    };

    let targetFrame = 1;
    let currentRenderFrame = 1;
    let animationFrameId: number;

    const updateImage = (index: number) => {
      const frameImg = new Image();
      frameImg.src = currentFrame(index);
      frameImg.onload = () => {
        context.drawImage(frameImg, 0, 0);
      };
    };

    const renderLoop = () => {
      currentRenderFrame += (targetFrame - currentRenderFrame) * 0.08;
      const nextFrame = Math.max(1, Math.min(frameCount, Math.round(currentRenderFrame)));

      updateImage(nextFrame);
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      if (maxScroll > 0) {
        const scrollFraction = scrollTop / maxScroll;
        const index = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount));
        targetFrame = index + 1;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-0 flex justify-center items-center pointer-events-none">
      <canvas ref={canvasRef} className="max-w-full max-h-full object-contain"></canvas>
    </div>
  );
}
