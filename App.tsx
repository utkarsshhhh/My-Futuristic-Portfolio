
import React, { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import MiniGallery from './components/MiniGallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [theme] = useState<Theme>('dark');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let scrollY = window.scrollY;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      baseX: number;
      baseY: number;
      density: number;

      constructor() {
        if (!canvas) {
            this.baseX = 0;
            this.baseY = 0;
        } else {
            this.baseX = Math.random() * canvas.width;
            this.baseY = Math.random() * canvas.height;
        }
        this.x = this.baseX;
        this.y = this.baseY;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = theme === 'dark' 
            ? `rgba(216, 236, 248, ${Math.random() * 0.3 + 0.2})` 
            : `rgba(45, 55, 72, ${Math.random() * 0.3 + 0.2})`;
        this.density = (Math.random() * 20) + 10;
      }

      update(dx: number, dy: number, sY: number) {
        if (!canvas) return;
        this.baseX += this.speedX;
        this.baseY += this.speedY;

        // Mouse parallax + Scroll parallax
        this.x = this.baseX - dx / this.density;
        this.y = this.baseY - (dy / this.density) - (sY * 0.1 / (this.density * 0.1));

        // Reset particles if they go off screen
        if (this.baseX > canvas.width + 20) this.baseX = -20;
        else if (this.baseX < -20) this.baseX = canvas.width + 20;
        if (this.baseY > canvas.height + 20) this.baseY = -20;
        else if (this.baseY < -20) this.baseY = canvas.height + 20;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const area = canvas.width * canvas.height;
      const densityMultiplier = window.innerWidth < 768 ? 15000 : 8000;
      const numberOfParticles = Math.min(Math.floor(area / densityMultiplier), 250);
      
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    let resizeTimer: any;
    const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeCanvas, 250);
    };

    resizeCanvas();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
      }
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const dx = mouse.x - canvas.width / 2;
      const dy = mouse.y - canvas.height / 2;

      const connectColor = theme === 'dark' ? '216, 236, 248' : '45, 55, 72';
      const maxDistSq = window.innerWidth < 768 ? 90 * 90 : 150 * 150;

      for (let a = 0; a < particles.length; a++) {
        particles[a].update(dx, dy, scrollY);
        particles[a].draw();
        
        for (let b = a + 1; b < particles.length; b++) {
          const dx_conn = particles[a].x - particles[b].x;
          const dy_conn = particles[a].y - particles[b].y;
          const distSq = dx_conn * dx_conn + dy_conn * dy_conn;
          
          if (distSq < maxDistSq) {
            const opacity = (1 - (distSq / maxDistSq)) * 0.25;
            ctx.strokeStyle = `rgba(${connectColor}, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [theme]);

  return (
    <div className="text-slate-800 dark:text-[#D8ECF8] font-sans relative bg-[#05060f] selection:bg-blue-500/30">
      <canvas ref={canvasRef} className="fixed inset-0 z-0 w-full h-full bg-transparent pointer-events-none" />
      
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <MiniGallery />
        <Contact />
        <Footer />
      </main>
    </div>
  );
};

export default App;
