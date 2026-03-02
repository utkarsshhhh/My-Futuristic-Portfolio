
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen sm:min-h-[100dvh] w-full flex items-center justify-center relative bg-transparent overflow-hidden">
      <div className="relative z-10 text-center text-slate-900 dark:text-white p-6 pointer-events-none select-none">
        <h1 
          className="text-4xl xs:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-widest animate-fade-in-up hero-text-shadow leading-tight"
        >
          Utkarsh Adlak
        </h1>
        <p 
          className="text-base md:text-xl lg:text-2xl mt-6 font-light uppercase tracking-[0.3em] animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          Clarity | Focus | Impact
        </p>
      </div>

      <style>{`
        .hero-text-shadow {
           text-shadow: 0 0 15px rgba(59, 130, 246, 0.3), 0 0 30px rgba(59, 130, 246, 0.2);
        }
        .dark .hero-text-shadow {
          text-shadow: 0 0 15px rgba(216, 236, 248, 0.4), 0 0 30px rgba(216, 236, 248, 0.2);
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default Hero;
