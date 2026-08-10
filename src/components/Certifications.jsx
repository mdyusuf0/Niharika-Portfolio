import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certificates } from '../data/portfolioData';

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  // Close on Escape Key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!certificates.featured || certificates.featured.length === 0) return null;

  return (
    <section id="certifications" className="bg-[#0a0a0a] pt-24 pb-28 px-6 md:px-12 w-full relative overflow-hidden font-sans border-t border-white/5">
      {/* Background Visual Spotlights */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-red-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div data-aos="fade-up" className="mb-16 text-center">
          <div className="inline-block border border-white/20 rounded-full px-5 py-1.5 text-sm text-white/60 font-bold mb-6 shadow-sm bg-white/5 backdrop-blur-sm">
            📜 PROFESSIONAL ACCREDITATION
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 uppercase">
            Verified Certifications
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Industry-recognized credentials certifying technical expertise in Video Editing, Motion Graphics, and Visual Storytelling.
          </p>
        </div>

        {/* Certificate Cards Grid */}
        <div className="flex justify-center">
          {certificates.featured.map((cert) => (
            <div
              key={cert.id}
              data-aos="fade-up"
              className="w-full max-w-3xl bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 hover:border-red-500/40 hover:shadow-[0_25px_60px_rgba(255,42,42,0.15)] transition-all duration-500 group flex flex-col md:flex-row gap-8 items-center"
            >
              {/* Image Preview Container */}
              <div 
                onClick={() => setSelectedCert(cert)}
                className="w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 relative border border-white/10 cursor-pointer group/img shrink-0"
              >
                <img 
                  src={cert.imageUrl} 
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-4 py-2 rounded-full bg-red-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Credential
                  </span>
                </div>
              </div>

              {/* Certificate Information */}
              <div className="flex flex-col justify-between flex-1 text-left">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="text-xs font-mono font-bold text-red-500 px-3 py-1 bg-red-500/10 rounded-full border border-red-500/20">
                      ID: {cert.certId}
                    </span>
                    <span className="text-xs font-mono text-white/40">
                      {cert.date}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2 group-hover:text-red-500 transition-colors duration-300">
                    {cert.title}
                  </h3>

                  <p className="text-red-400 text-sm font-bold mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                    Issued by {cert.issuer}
                  </p>

                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    {cert.description}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedCert(cert)}
                  className="self-start px-6 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider hover:bg-red-600 hover:border-red-500 transition-all duration-300 flex items-center gap-2"
                >
                  Inspect Full Certificate
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-full z-50 bg-black/95 flex items-center justify-center p-4 md:p-10 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <div 
              className="relative max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden bg-zinc-950 border border-white/20 shadow-[0_30px_90px_rgba(255,42,42,0.3)] p-2 md:p-4 flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-red-600 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Full Image */}
              <img 
                src={selectedCert.imageUrl} 
                alt={selectedCert.title} 
                className="max-w-full max-h-[80vh] object-contain rounded-xl"
              />

              {/* Caption */}
              <div className="mt-4 text-center">
                <h4 className="text-white font-bold text-lg">{selectedCert.title}</h4>
                <p className="text-white/50 text-xs font-mono mt-1">
                  {selectedCert.issuer} • Certificate ID: {selectedCert.certId} • Completed: {selectedCert.date}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
