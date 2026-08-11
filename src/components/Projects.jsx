import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/portfolioData';

// Reusable Video Card Component with Intersection Observer and Hover Playback
const VideoCard = ({ project, onClick }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(true); // Show video frame by default
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (!entry.isIntersecting && videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => {
    if (videoRef.current && isVisible) {
      videoRef.current.play().catch((err) => console.log("Play interrupted", err));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative rounded-3xl overflow-hidden group cursor-pointer border border-white/10 hover:border-red-500/30 hover:shadow-[0_20px_50px_rgba(255,42,42,0.15)] transition-all duration-500 bg-[#111] ${
        project.isFlagship ? 'col-span-1 md:col-span-2 lg:col-span-3 min-h-[380px] md:min-h-[480px]' : 'col-span-1 min-h-[320px]'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(project)}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        webkit-playsinline="true"
        preload="auto"
        onLoadedData={() => setIsLoaded(true)}
        onLoadedMetadata={() => setIsLoaded(true)}
        onCanPlay={() => setIsLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-500"
      >
        <source src={project.videoUrl} type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-85 group-hover:opacity-75 transition-opacity duration-500" />

      {/* Flagship Badge */}
      {project.badge && (
        <span className="absolute top-6 left-6 text-[10px] md:text-xs font-bold tracking-widest uppercase text-white bg-red-600 px-3.5 py-1.5 rounded-full border border-red-400/20 shadow-lg">
          {project.badge}
        </span>
      )}

      {/* Details Container */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col justify-end z-20">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-mono text-red-500 font-bold">{project.category}</span>
          <span className="text-white/30 text-xs font-mono">• {project.duration}</span>
        </div>
        
        <h3 className="text-white text-2xl md:text-3xl font-black mb-3 tracking-tight group-hover:text-red-500 transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-white/60 text-sm md:text-base leading-relaxed mb-4 max-w-xl opacity-0 group-hover:opacity-100 h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5 opacity-80 group-hover:opacity-100 transition-opacity">
          {project.techTags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 text-[10px] font-bold text-white/70 bg-white/5 rounded-full border border-white/10">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Fullscreen Custom Modal Player
const VideoModal = ({ project, onClose }) => {
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Close on Escape Key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Attempt smooth autoplay with fallback for browser autoplay policies
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setIsLoading(false);
      }).catch(() => {
        // If unmuted autoplay is blocked by browser, mute and retry
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          }).catch((err) => {
            console.log('Autoplay blocked:', err);
            setIsLoading(false);
          });
        }
      });
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoading(false);
    }
  };

  const handleProgressClick = (e) => {
    if (videoRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newPercentage = clickX / width;
      videoRef.current.currentTime = newPercentage * duration;
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 w-full h-full z-50 bg-black/95 flex items-center justify-center p-4 md:p-10 backdrop-blur-md"
    >
      <div className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden bg-zinc-950 border border-white/10 shadow-[0_30px_80px_rgba(255,42,42,0.3)] flex flex-col justify-end">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#ff2a2a] transition-all duration-300 hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video Player */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          webkit-playsinline="true"
          preload="auto"
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onLoadedData={() => setIsLoading(false)}
          onCanPlay={() => setIsLoading(false)}
          onWaiting={() => setIsLoading(true)}
          onPlaying={() => {
            setIsLoading(false);
            setIsPlaying(true);
          }}
          className="w-full h-full object-contain bg-black"
          onClick={togglePlay}
        >
          <source src={project.videoUrl} type="video/mp4" />
        </video>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Player Controls Bar */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/85 to-transparent p-6 flex flex-col gap-4">
          
          {/* Progress Slider */}
          <div 
            ref={progressRef}
            onClick={handleProgressClick}
            className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer relative overflow-hidden group/progress"
          >
            <div 
              className="h-full bg-red-600 rounded-full transition-all"
              style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            {/* Play/Pause & Mute Buttons */}
            <div className="flex items-center gap-4">
              <button onClick={togglePlay} className="text-white hover:text-red-500 transition-colors">
                {isPlaying ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              <button onClick={toggleMute} className="text-white hover:text-red-500 transition-colors">
                {isMuted ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
              </button>

              <span className="text-xs font-mono text-white/50">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Title */}
            <span className="hidden md:inline-block text-sm font-bold text-white uppercase tracking-wider">
              {project.title} — {project.client}
            </span>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="bg-[#0a0a0a] pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans">
      {/* Background Visual Spotlights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div data-aos="fade-up" className="mb-16 md:mb-20 text-center">
          <div className="inline-block border border-white/20 rounded-full px-5 py-1.5 text-sm text-white/60 font-bold mb-6 shadow-sm bg-white/5 backdrop-blur-sm">
            ⭐ FEATURED WORK
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight uppercase">
            Creative Case Studies
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Immersive storytelling and visual craft. Hover to preview client films, documentaries, and motion graphics.
          </p>
        </div>

        {/* Bento Grid Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <VideoCard
              key={project.id}
              project={project}
              onClick={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </div>

      {/* Modal Player */}
      <AnimatePresence>
        {selectedProject && (
          <VideoModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
