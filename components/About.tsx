
import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const skills = [
  { name: 'Full Stack', icon: 'ph-stack-simple' },
  { name: 'ReactJs', icon: 'ph-atom' },
  { name: 'JavaScript', icon: 'ph-file-js' },
  { name: 'Tailwind CSS', icon: 'ph-wind' },
  { name: 'Animations', icon: 'ph-magic-wand' },
  { name: 'C Language', icon: 'ph-file-code' },
  { name: 'Java', icon: 'ph-coffee' },
  { name: 'And More...', icon: 'ph-dots-three-outline' },
];

const About: React.FC = () => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="about" ref={ref} className="py-24 sm:py-32 container mx-auto px-6 relative overflow-hidden">
      {/* Restored original glow effect */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-center relative z-10 max-w-6xl mx-auto">
        
        {/* Left Side: Capsule Portrait */}
        <div className={`w-full md:w-5/12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
          <div className="relative mx-auto w-full max-w-[340px]">
            <div className="absolute -inset-4 bg-blue-400/10 rounded-[180px] blur-3xl opacity-60"></div>
            
            <div className="relative aspect-[1/1.4] w-full rounded-[170px] overflow-hidden border border-white/10 shadow-2xl bg-slate-900 group">
              <img
                loading="lazy"
                src="https://res.cloudinary.com/dtppzubgz/image/upload/v1766304526/IMG_7083_pnhwwp.png"
                alt="Utkarsh Adlak"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className={`w-full md:w-7/12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-8 text-white">
            About Me
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-12 leading-relaxed font-light">
            “I believe technology is a tool to solve problems and create change. I'm <span className="font-bold text-white">Utkarsh Adlak</span>, a web developer dedicated to learning and contributing innovative solutions. My focus is on building scalable, modern applications while continuously improving my skills and pushing boundaries.”
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-8">
            <h3 className="text-2xl font-bold text-white shrink-0 mt-2">Skills:</h3>
            
            <div className="flex-1 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-y-10 gap-x-4">
              {skills.map((skill, index) => (
                <div 
                  key={skill.name} 
                  className={`flex flex-col items-center gap-3 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'}`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                    <i className={`ph-bold ${skill.icon} text-3xl text-white group-hover:scale-110 transition-transform`}></i>
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 text-center">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
