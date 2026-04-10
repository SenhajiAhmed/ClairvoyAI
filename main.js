const canvas = document.getElementById('hero-lightpass');
const context = canvas.getContext('2d');

const frameCount = 240;
const currentFrame = index => (
  `exploded_eye/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
);

const preloadImages = () => {
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image();
img.src = currentFrame(1);
canvas.width = 1920;
canvas.height = 1080;
img.onload = function() {
  context.drawImage(img, 0, 0);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
}

let targetFrame = 1;
let currentRenderFrame = 1;

const renderLoop = () => {
  // Lerp formulation for buttery smooth interpolation
  currentRenderFrame += (targetFrame - currentRenderFrame) * 0.08;
  
  // Decide the absolute nearest integer frame
  const nextFrame = Math.max(1, Math.min(frameCount, Math.round(currentRenderFrame)));
  
  // Avoid re-drawing the same frame unnecessarily, but otherwise keep drawing
  requestAnimationFrame(() => {
    updateImage(nextFrame);
    renderLoop();
  });
};

// Start continuous loop
renderLoop();

window.addEventListener('scroll', () => {  
  const scrollTop = document.documentElement.scrollTop;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScroll;
  
  // Calculate which frame is the target
  const index = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );
  
  targetFrame = index + 1;
});

preloadImages();

// --- Navbar Fade In/Out ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.remove('hidden-nav');
        navbar.classList.add('visible-nav');
    } else {
        navbar.classList.remove('visible-nav');
        navbar.classList.add('hidden-nav');
    }
});

// --- Text Fade In Observer ---
const fadeElements = document.querySelectorAll('.fade-text');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            // Optional: Remove if we want them to fade out when scrolling past
            entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

fadeElements.forEach(el => {
    observer.observe(el);
});
