import React, { useEffect, useRef, useState } from 'react';
import './ClairvoyAI.css';

const ClairvoyAI: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const [isNavVisible, setIsNavVisible] = useState(false);

  const frameCount = 240;
  // Note: For integration into EPIK_WEBSITE, place the 'exploded_eye' folder into the 'public' folder.
  const currentFrame = (index: number) =>
    `/exploded_eye/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;

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
    const context = canvas.getContext('2d');
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
      if (window.scrollY > 50) {
        setIsNavVisible(true);
      } else {
        setIsNavVisible(false);
      }

      // Calculate relative scroll based on the component's coordinates if it's placed within a larger App,
      // but assuming it's a full page route:
      const scrollTop = document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      if (maxScroll > 0) {
        const scrollFraction = scrollTop / maxScroll;
        const index = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount));
        targetFrame = index + 1;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Intersection Observer for fade text
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.clairvoy-fade-text');
    fadeElements.forEach((el) => observer.observe(el));

    return () => {
      fadeElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="clairvoy-page">
      <nav className={`clairvoy-nav ${isNavVisible ? 'clairvoy-visible-nav' : 'clairvoy-hidden-nav'}`}>
        <div className="clairvoy-nav-container">
          <div className="clairvoy-nav-logo">AI Atuariel</div>
          <div className="clairvoy-nav-links">
            <a href="#overview">Vision</a>
            <a href="#intelligence">Alchemy</a>
            <a href="#adaptability">Quantum Focus</a>
            <a href="#vision">Omniscience</a>
            <a href="#register">Initiate</a>
          </div>
          <div className="clairvoy-nav-cta">
            <button className="clairvoy-btn-gradient">Enter Hackathon</button>
          </div>
        </div>
      </nav>

      <div className="clairvoy-canvas-container">
        <canvas ref={canvasRef}></canvas>
      </div>

      <main className="clairvoy-scroll-wrapper" ref={scrollWrapperRef}>
        <section className="clairvoy-step" id="overview">
          <div className="clairvoy-content-center">
            <h1 className="clairvoy-headline clairvoy-fade-text">ClairvoyAI Hackathon</h1>
            <h2 className="clairvoy-subheadline clairvoy-fade-text">The Convergence of Omniscience and Computation.</h2>
            <p className="clairvoy-body-text clairvoy-fade-text">Behold the All-Seeing Eye—an entity possessing magical foresight and a complex computational brain.</p>
          </div>
        </section>

        <section className="clairvoy-step" id="intelligence">
          <div className="clairvoy-content-left">
            <h2 className="clairvoy-headline clairvoy-fade-text">Ancient Esoteric Form.</h2>
            <div className="clairvoy-info-block clairvoy-fade-text">
              <p className="clairvoy-body-text">A rune-like shell of forged metals—copper, bronze, and crimson-tinted steel.</p>
              <p className="clairvoy-body-text">Revealing itself through organic alchemy: billowing fire, elemental smoke, and intense lens flares.</p>
              <p className="clairvoy-body-text">Encased within a classical multi-pointed star compass rose representing truth and omniscient observation.</p>
            </div>
          </div>
        </section>

        <section className="clairvoy-step" id="adaptability">
          <div className="clairvoy-content-right">
            <h2 className="clairvoy-headline clairvoy-fade-text">Exploded Transformation.</h2>
            <ul className="clairvoy-info-block clairvoy-fade-text clairvoy-list-style">
              <li><span className="clairvoy-body-text">The ancient exterior breaks apart to uncover a glowing, crystalline core.</span></li>
              <li><span className="clairvoy-body-text">Ethereal cyan energy mapping out floating spheres and rotating quantum rings.</span></li>
              <li><span className="clairvoy-body-text">An ancient exterior hiding a hyper-advanced technological brain.</span></li>
            </ul>
          </div>
        </section>

        <section className="clairvoy-step" id="vision">
          <div className="clairvoy-content-left">
            <h2 className="clairvoy-headline clairvoy-fade-text">Clairvoyance meets Computing.</h2>
            <div className="clairvoy-info-block clairvoy-fade-text">
              <p className="clairvoy-body-text">Ethereal teal circuitry processing infinite actuarial data streams with pure logic.</p>
              <p className="clairvoy-body-text">Contrasting raw alchemical fire with cold, precise, floating geometry.</p>
            </div>
          </div>
        </section>

        <section className="clairvoy-step" id="register">
          <div className="clairvoy-content-center">
            <h2 className="clairvoy-headline clairvoy-fade-text">Transcend. Code. Evolve.</h2>
            <p className="clairvoy-subheadline clairvoy-fade-text">Join the ultimate Actuarial AI ecosystem.</p>
            <div className="clairvoy-cta-group clairvoy-fade-text">
              <button className="clairvoy-btn-gradient-lg">Register for ClairvoyAI</button>
              <a href="#" className="clairvoy-text-link">See the Ancient Grimoire (Rules)</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ClairvoyAI;
