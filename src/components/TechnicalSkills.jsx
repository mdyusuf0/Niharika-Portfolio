import React from 'react';
import { technicalSkills } from '../data/portfolioData';

// Helper to render official software icon
const SoftwareIcon = ({ name }) => {
  switch (name) {
    case "Adobe Premiere Pro":
      return (
        <div className="w-7 h-7 bg-[#00005c] border border-[#1473e6] rounded-md flex items-center justify-center font-sans font-black text-[10px] text-[#1473e6] select-none shrink-0">
          Pr
        </div>
      );
    case "Adobe After Effects":
      return (
        <div className="w-7 h-7 bg-[#1d003a] border border-[#d124fc] rounded-md flex items-center justify-center font-sans font-black text-[10px] text-[#d124fc] select-none shrink-0">
          Ae
        </div>
      );
    case "Adobe Photoshop":
      return (
        <div className="w-7 h-7 bg-[#001c2b] border border-[#00c8ff] rounded-md flex items-center justify-center font-sans font-black text-[10px] text-[#00c8ff] select-none shrink-0">
          Ps
        </div>
      );
    case "Adobe Illustrator":
      return (
        <div className="w-7 h-7 bg-[#251300] border border-[#ff9a00] rounded-md flex items-center justify-center font-sans font-black text-[10px] text-[#ff9a00] select-none shrink-0">
          Ai
        </div>
      );
    case "Adobe Audition":
      return (
        <div className="w-7 h-7 bg-[#01221d] border border-[#00e5c5] rounded-md flex items-center justify-center font-sans font-black text-[10px] text-[#00e5c5] select-none shrink-0">
          Au
        </div>
      );
    case "Adobe Media Encoder":
      return (
        <div className="w-7 h-7 bg-[#0b2800] border border-[#00ff1a] rounded-md flex items-center justify-center font-sans font-black text-[10px] text-[#00ff1a] select-none shrink-0">
          Me
        </div>
      );
    case "DaVinci Resolve":
      return (
        <div className="w-7 h-7 bg-zinc-900 border border-zinc-700 rounded-md flex items-center justify-center select-none shrink-0">
          <svg className="w-5 h-5" viewBox="0 0 100 100">
            <circle cx="50" cy="38" r="18" fill="#ff2a2a" opacity="0.9" />
            <circle cx="38" cy="58" r="18" fill="#39ff14" opacity="0.9" />
            <circle cx="62" cy="58" r="18" fill="#00c8ff" opacity="0.9" />
          </svg>
        </div>
      );
    default:
      return (
        <div className="w-7 h-7 bg-zinc-800 rounded-md flex items-center justify-center font-sans font-bold text-[10px] text-white shrink-0">
          🎬
        </div>
      );
  }
};

const SkillProgress = ({ name, level }) => (
  <div className="mb-5 flex flex-col">
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-2.5">
        <SoftwareIcon name={name} />
        <span className="text-white text-sm font-semibold tracking-wide">{name}</span>
      </div>
      <span className="text-red-500 text-xs font-bold font-mono">{level}%</span>
    </div>
    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
      <div 
        className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${level}%` }}
      />
    </div>
  </div>
);

const SkillCard = ({ category, index }) => (
  <div 
    data-aos="fade-up"
    data-aos-delay={index * 100}
    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-[1.02] hover:border-red-500/30 hover:shadow-[0_20px_50px_rgba(255,42,42,0.15)] transition-all duration-500"
  >
    <h3 className="text-white text-lg font-black tracking-tight mb-6 pb-2 border-b border-white/10 uppercase">
      {category.title}
    </h3>
    <div>
      {category.skills.map((skill) => (
        <SkillProgress key={skill.name} name={skill.name} level={skill.level} />
      ))}
    </div>
  </div>
);

const TechnicalSkills = () => {
  return (
    <section id="skills" className="bg-[#0a0a0a] pt-24 pb-28 px-6 md:px-12 w-full relative overflow-hidden font-sans">
      {/* Background visual elements */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div data-aos="fade-up" className="mb-16 text-center">
          <div className="inline-block border border-white/20 rounded-full px-5 py-1.5 text-sm text-white/60 font-bold mb-6 shadow-sm bg-white/5 backdrop-blur-sm">
            ⚙️ SOFTWARE SUITE
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 uppercase">
            Creative Applications
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Professional workflow software and post-production utility stacks verified in my editing experience.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {technicalSkills.categories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TechnicalSkills;
