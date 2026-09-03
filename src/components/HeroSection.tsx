import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Phone } from 'lucide-react';
import { Language, TRANSLATIONS, SITE_DATA } from '../translations';

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

  // Guaranteed continuous 360 rotation loop with multi-event recovery
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    };

    const handleEnded = () => {
      video.currentTime = 0;
      playVideo();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        playVideo();
      }
    };

    // Event listeners
    video.addEventListener('ended', handleEnded);
    video.addEventListener('pause', playVideo);
    video.addEventListener('stalled', playVideo);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', playVideo);

    playVideo();

    const interval = setInterval(() => {
      if (video && video.paused) {
        playVideo();
      }
    }, 1500);

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('pause', playVideo);
      video.removeEventListener('stalled', playVideo);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', playVideo);
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      id="hero-section"
      className="relative min-h-[100svh] md:min-h-screen w-full bg-[#050505] text-[#F3F0E9] flex flex-col justify-between px-4 sm:px-8 lg:px-12 pt-20 sm:pt-24 pb-5 sm:pb-8 overflow-hidden"
    >
      {/* 1. BACKGROUND 360 DENTAL ART VIDEO LOOP */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/dental_poster_169.webp"
          preload="metadata"
          className="w-full h-full object-cover object-center opacity-80 scale-105 filter brightness-105 contrast-105 transition-opacity duration-700"
        >
          <source src="/videos/dental169.mp4" type="video/mp4" media="(min-width: 768px)" />
          <source src="/videos/dental916.mp4" type="video/mp4" />
        </video>

        {/* Clear & illuminated layer */}
        <div className="absolute inset-0 bg-[#050505]/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-transparent to-[#050505]/90" />
        <div className="absolute inset-0 bg-subtle-grain opacity-20" />
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
              className="font-condensed font-extrabold uppercase text-[#F3F0E9] tracking-[-0.04em] leading-[0.86] text-[clamp(36px,10.5vw,66px)] sm:text-[clamp(54px,12vw,82px)] md:text-[clamp(80px,9vw,140px)] whitespace-nowrap block drop-shadow-2xl"
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
              className="pl-[3%] sm:pl-[8%] md:pl-[14%]"
            >
              <h1
                id="hero-headline-line-2"
                className="font-condensed font-extrabold uppercase text-[#F3F0E9] tracking-[-0.04em] leading-[0.86] text-[clamp(36px,10.5vw,66px)] sm:text-[clamp(54px,12vw,82px)] md:text-[clamp(80px,9vw,140px)] whitespace-nowrap block drop-shadow-2xl"
              >
                {t.hero.headlineLine2}
              </h1>
            </motion.div>
          </div>

          {/* Practice Subheading Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.32, ease: EXPO_OUT }}
            className="font-editorial text-[14px] sm:text-[16px] lg:text-[18px] text-[#C5C4BF] max-w-[620px] mt-4 sm:mt-5 leading-relaxed drop-shadow"
          >
            {t.hero.subheading}
          </motion.p>

          {/* CTA Row */}
          <motion.div
            id="hero-cta-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.42, ease: EXPO_OUT }}
            className="mt-5 sm:mt-7 flex flex-wrap items-center gap-4"
          >
            <motion.button
              id="hero-primary-cta"
              onClick={onCtaClick}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="group relative inline-flex items-center justify-between gap-3 sm:gap-4 bg-[#F3F0E9] text-[#050505] rounded-full pl-5 sm:pl-7 pr-2 sm:pr-2.5 h-[48px] sm:h-[52px] min-w-[190px] max-w-[240px] shadow-2xl cursor-pointer focus:outline-none"
            >
              <span className="font-editorial text-[12px] sm:text-[13px] font-bold tracking-[0.06em] uppercase whitespace-nowrap">
                {t.hero.cta}
              </span>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#050505] text-[#F3F0E9] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 shrink-0">
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
              </span>
            </motion.button>

            <a
              href={`tel:${SITE_DATA.phoneRaw}`}
              className="inline-flex items-center gap-2.5 text-[12px] sm:text-[13px] font-mono tracking-wider text-[#F3F0E9]/90 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.15] px-4 sm:px-5 h-[48px] sm:h-[52px] rounded-full backdrop-blur-md transition-all shadow-lg"
            >
              <Phone className="w-3.5 h-3.5 text-[#A6B09F] stroke-[2.2]" />
              <span>{SITE_DATA.phone}</span>
            </a>
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
        <div className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-[#92918C] uppercase">
          {SITE_DATA.location}
        </div>

        {/* Scroll To Explore Subtle Indicator */}
        <div
          id="hero-scroll-indicator"
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
          onClick={() => {
            const nextSec = document.getElementById('services');
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
