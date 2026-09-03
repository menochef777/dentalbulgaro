import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Language, TRANSLATIONS } from '../translations';

interface HeroSectionProps {
  currentLang: Language;
  onCtaClick?: () => void;
}

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const HeroSection: React.FC<HeroSectionProps> = ({ currentLang, onCtaClick }) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.bg;
  const videoRef = useRef<HTMLVideoElement>(null);

  // Parallax subtle scroll decay as hero leaves viewport
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.15]);
  const heroY = useTransform(scrollY, [0, 600], [0, -80]);

  // Boomerang loop effect for smooth forward-and-backward seamless rotation
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isReversing = false;

    const handleEnded = () => {
      // Invert playback direction or restart smoothly
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <section
      id="hero-section"
      className="relative min-h-[100svh] md:min-h-screen w-full bg-[#050505] text-[#F3F0E9] flex flex-col justify-between px-4 sm:px-8 lg:px-12 pt-20 sm:pt-24 pb-5 sm:pb-8 overflow-hidden"
    >
      {/* 1. BACKGROUND 360 PROSTHESIS VIDEO LOOP */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center opacity-45 scale-105 filter brightness-90 contrast-110 transition-opacity duration-1000"
        >
          <source src="/videos/dental169.mp4" type="video/mp4" media="(min-width: 768px)" />
          <source src="/videos/dental916.mp4" type="video/mp4" />
        </video>

        {/* Soft, weak dark overlay (camada preta suave) to ensure editorial contrast */}
        <div className="absolute inset-0 bg-[#050505]/45 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-subtle-grain opacity-30" />
      </div>

      {/* 2. TOP EDITORIAL META */}
      <motion.div
        id="hero-top-meta"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.1, ease: EXPO_OUT }}
        className="relative z-10 w-full flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-[#92918C] uppercase pt-2"
      >
        <span id="hero-tag-service" className="flex items-center gap-2 text-[#F3F0E9]/80 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A6B09F] animate-pulse" />
          {t.hero.tagService}
        </span>
        <span id="hero-tag-location" className="font-mono text-[#92918C]">
          {t.hero.tagLocation}
        </span>
      </motion.div>

      {/* 3. MAIN HERO BODY */}
      <motion.div
        id="hero-typography-container"
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative z-10 w-full max-w-[1400px] mx-auto mt-auto mb-4 sm:mb-8 flex flex-col justify-end select-none"
      >
        <div className="w-full flex flex-col">
          {/* Line 1: Main Title */}
          <div className="overflow-hidden">
            <motion.h1
              id="hero-headline-line-1"
              initial={{ x: -260, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.1, ease: EXPO_OUT }}
              className="font-condensed font-extrabold uppercase text-[#F3F0E9] tracking-[-0.045em] leading-[0.84] text-[clamp(52px,14.8vw,80px)] md:text-[clamp(82px,9vw,145px)] whitespace-nowrap block drop-shadow-2xl"
            >
              {t.hero.headlineLine1}
            </motion.h1>
          </div>

          {/* Line 2: Secondary Asymmetric Title */}
          <div className="overflow-hidden mt-0 sm:mt-1">
            <motion.div
              id="hero-headline-line-2-wrapper"
              initial={{ x: 260, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.2, ease: EXPO_OUT }}
              className="pl-[6%] sm:pl-[12%] md:pl-[16%]"
            >
              <h1
                id="hero-headline-line-2"
                className="font-condensed font-extrabold uppercase text-[#F3F0E9] tracking-[-0.045em] leading-[0.84] text-[clamp(52px,14.8vw,80px)] md:text-[clamp(82px,9vw,145px)] whitespace-nowrap block drop-shadow-2xl"
              >
                {t.hero.headlineLine2}
              </h1>
            </motion.div>
          </div>

          {/* CTA: Immediately follows the headline */}
          <motion.div
            id="hero-cta-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.38, ease: EXPO_OUT }}
            className="mt-4 sm:mt-6 flex items-center justify-start"
          >
            <motion.button
              id="hero-primary-cta"
              onClick={onCtaClick}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="group relative inline-flex items-center justify-between gap-3 sm:gap-4 bg-[#F3F0E9] text-[#050505] rounded-full pl-5 sm:pl-7 pr-2 sm:pr-2.5 h-[46px] sm:h-[50px] min-w-[170px] max-w-[215px] shadow-2xl cursor-pointer focus:outline-none"
            >
              <span className="font-editorial text-[12px] sm:text-[13px] font-bold tracking-[0.06em] uppercase whitespace-nowrap">
                {t.hero.cta}
              </span>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#050505] text-[#F3F0E9] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 shrink-0">
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
              </span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* 4. HERO BOTTOM BAR */}
      <motion.div
        id="hero-bottom-bar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: EXPO_OUT }}
        className="relative z-10 w-full flex items-end justify-between border-t border-[#181818] pt-3.5"
      >
        <div id="hero-stage-index" className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-[#92918C]">
          <span className="text-[#F3F0E9] font-bold">01</span> / 02
        </div>

        {/* Scroll To Explore Subtle Indicator */}
        <div
          id="hero-scroll-indicator"
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
          onClick={() => {
            const nextSec = document.getElementById('process');
            if (nextSec) nextSec.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.22em] text-[#92918C] uppercase group-hover:text-[#F3F0E9] transition-colors">
            {t.hero.scroll}
          </span>
          <div className="w-[1px] h-5 sm:h-6 bg-[#252525] relative overflow-hidden">
            <motion.div
              animate={{ y: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="w-full h-1/2 bg-[#A6B09F]"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
