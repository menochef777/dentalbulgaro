import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, ShieldCheck, Heart, Eye, MessageSquare, Compass, Phone } from 'lucide-react';
import { Language, TRANSLATIONS, SITE_DATA } from '../translations';
import { useStaggeredReveal } from '../hooks/useStaggeredReveal';

interface ApproachSectionProps {
  currentLang: Language;
  onContactClick?: () => void;
}

export const ApproachSection: React.FC<ApproachSectionProps> = ({ currentLang, onContactClick }) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.bg;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.05]);
  const bgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const { ref: revealRef, getStaggerVariants } = useStaggeredReveal(0.08);

  const approachIcons = [
    Heart,
    Eye,
    ShieldCheck,
    Sparkles,
    MessageSquare,
    Compass,
  ];

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="relative w-full min-h-screen bg-[#050505] text-[#F3F0E9] px-4 sm:px-8 lg:px-12 py-24 sm:py-32 lg:py-40 overflow-hidden flex flex-col justify-center"
    >
      {/* 1. IMMERSIVE RICH 3D SCENERY */}
      <motion.div
        style={{ scale: bgScale, y: bgY }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
      >
        <picture>
          <source srcSet="/images/mindloop_experience_bg-mobile.webp" media="(max-width: 768px)" type="image/webp" />
          <img
            src="/images/mindloop_experience_bg.webp"
            alt="Dental Practice Atmosphere"
            width={1920}
            height={1080}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center opacity-60 filter brightness-105 contrast-115"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/45 to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.12)_0%,transparent_75%)]" />
        <div className="absolute inset-0 bg-subtle-grain opacity-20" />
      </motion.div>

      {/* 2. OVERSIZED BACKGROUND ART TYPOGRAPHY */}
      <div className="absolute -top-6 sm:top-2 right-0 left-0 flex justify-end pointer-events-none select-none z-0 overflow-hidden pr-4 sm:pr-12">
        <span className="font-condensed font-black uppercase text-[clamp(80px,18vw,250px)] tracking-[-0.05em] leading-none text-white/[0.05] whitespace-nowrap blur-[0.4px]">
          APPROACH
        </span>
      </div>

      <div
        ref={revealRef}
        className="relative z-10 w-full max-w-[1340px] mx-auto flex flex-col"
      >
        {/* Section Header */}
        <div className="w-full flex flex-col items-start mb-12 sm:mb-16 lg:mb-20">
          <motion.div
            {...getStaggerVariants(0)}
            className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.24em] text-[#A6B09F] uppercase mb-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#A6B09F] animate-pulse" />
            <span className="font-semibold text-[#A6B09F]">{t.approach.badge}</span>
            <span className="text-white/30">•</span>
            <span className="text-[#F3F0E9]/80">ФИЛОСОФИЯ НА ЛЕЧЕНИЕ</span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              {...getStaggerVariants(1)}
              className="font-condensed font-extrabold uppercase text-[#F3F0E9] tracking-[-0.04em] leading-[0.88] text-[clamp(38px,7vw,84px)] drop-shadow-2xl"
            >
              {t.approach.heading}
            </motion.h2>
          </div>

          <motion.p
            {...getStaggerVariants(2)}
            className="font-editorial text-[14px] sm:text-[16px] text-[#A8A7A2] max-w-[650px] mt-4 leading-relaxed"
          >
            {t.approach.subheading}
          </motion.p>
        </div>

        {/* 6 Core Pillars Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SITE_DATA.approach.map((item, idx) => {
            const Icon = approachIcons[idx] || ShieldCheck;
            return (
              <motion.div
                key={item.title}
                {...getStaggerVariants(idx + 3)}
                className="group relative flex flex-col justify-between rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 bg-[#080a12]/75 border border-white/[0.14] hover:border-white/[0.28] hover:bg-[#0c0f18]/85 transition-all duration-300 backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
              >
                {/* Subtle top inner gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] via-transparent to-transparent pointer-events-none rounded-[28px]" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#A6B09F] group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <span className="text-[12px] font-mono tracking-widest text-[#92918C]">
                      {item.num}
                    </span>
                  </div>

                  <h3 className="font-condensed font-extrabold uppercase text-[22px] sm:text-[25px] tracking-tight text-[#F3F0E9] mb-2 leading-tight">
                    {item.title}
                  </h3>

                  <p className="font-editorial text-[13px] sm:text-[14px] text-[#A8A7A2] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-[#92918C] tracking-wider uppercase">
                  <span>Д-Р ДАРИА</span>
                  <span className="text-[#A6B09F]">ВАРНА</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
