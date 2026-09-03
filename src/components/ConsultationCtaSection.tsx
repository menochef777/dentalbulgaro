import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Phone, ArrowUpRight, Calendar, Sparkles, MapPin } from 'lucide-react';
import { Language, TRANSLATIONS, SITE_DATA } from '../translations';
import { useStaggeredReveal } from '../hooks/useStaggeredReveal';

interface ConsultationCtaSectionProps {
  currentLang: Language;
  onContactClick?: () => void;
}

export const ConsultationCtaSection: React.FC<ConsultationCtaSectionProps> = ({ currentLang, onContactClick }) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.bg;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.04]);
  const bgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const { ref: revealRef, getStaggerVariants } = useStaggeredReveal(0.1);

  return (
    <section
      ref={sectionRef}
      id="consultation"
      className="relative w-full min-h-[70vh] bg-[#050505] text-[#F3F0E9] px-4 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-32 overflow-hidden flex flex-col justify-center"
    >
      {/* Background Ambience */}
      <motion.div
        style={{ scale: bgScale, y: bgY }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
      >
        <picture>
          <source srcSet="/images/mindloop_pricing_bg-mobile.webp" media="(max-width: 768px)" type="image/webp" />
          <img
            src="/images/mindloop_pricing_bg.webp"
            alt="Consultation Atmosphere"
            width={1920}
            height={1080}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center opacity-40 filter brightness-105 contrast-115"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.12)_0%,transparent_75%)]" />
        <div className="absolute inset-0 bg-subtle-grain opacity-20" />
      </motion.div>

      <div
        ref={revealRef}
        className="relative z-10 w-full max-w-[1100px] mx-auto flex flex-col items-center text-center"
      >
        {/* Badge */}
        <motion.div
          {...getStaggerVariants(0)}
          className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.24em] text-[#A6B09F] uppercase mb-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#A6B09F] animate-pulse" />
          <span>{SITE_DATA.doctorName} • {SITE_DATA.location}</span>
        </motion.div>

        {/* Big Heading */}
        <motion.h2
          {...getStaggerVariants(1)}
          className="font-condensed font-extrabold uppercase text-[#F3F0E9] tracking-[-0.04em] leading-[0.92] text-[clamp(36px,6.5vw,76px)] max-w-[900px] drop-shadow-2xl mb-4"
        >
          {SITE_DATA.consultationCta.title}
        </motion.h2>

        {/* Description */}
        <motion.p
          {...getStaggerVariants(2)}
          className="font-editorial text-[15px] sm:text-[18px] text-[#C5C4BF] max-w-[620px] leading-relaxed mb-8"
        >
          {SITE_DATA.consultationCta.description}
        </motion.p>

        {/* Main Phone CTA Action */}
        <motion.div
          {...getStaggerVariants(3)}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          <a
            href={`tel:${SITE_DATA.phoneRaw}`}
            className="group relative inline-flex items-center justify-between gap-4 bg-[#F3F0E9] hover:bg-white text-[#050505] rounded-full pl-7 sm:pl-9 pr-3 sm:pr-4 h-[56px] sm:h-[64px] min-w-[240px] sm:min-w-[280px] shadow-[0_20px_50px_rgba(255,255,255,0.12)] cursor-pointer focus:outline-none transition-all duration-300 hover:scale-[1.02]"
          >
            <span className="font-editorial text-[14px] sm:text-[16px] font-bold tracking-[0.06em] uppercase whitespace-nowrap">
              {SITE_DATA.phone}
            </span>
            <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#050505] text-[#F3F0E9] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 shrink-0 shadow-md">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
            </span>
          </a>

          <button
            onClick={onContactClick}
            className="inline-flex items-center gap-2.5 text-[12px] sm:text-[13px] font-mono tracking-wider text-[#F3F0E9] hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.15] px-6 h-[56px] sm:h-[64px] rounded-full backdrop-blur-md transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#A6B09F]" />
            <span>ФОРМА ЗА КОНТАКТ</span>
          </button>
        </motion.div>

        {/* Sub-note */}
        <motion.div
          {...getStaggerVariants(4)}
          className="mt-8 flex items-center gap-3 text-[11px] font-mono text-[#92918C] uppercase tracking-wider"
        >
          <MapPin className="w-3.5 h-3.5 text-[#A6B09F]" />
          <span>ВАРНА, БЪЛГАРИЯ • СПОКОЙНА И КОМФОРТНА ОБСТАНОВКА</span>
        </motion.div>
      </div>
    </section>
  );
};
