import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Sparkles, ShieldCheck, Stethoscope, Phone, CheckCircle2 } from 'lucide-react';
import { Language, TRANSLATIONS, SITE_DATA } from '../translations';
import { useStaggeredReveal } from '../hooks/useStaggeredReveal';

interface ServicesSectionProps {
  currentLang: Language;
  onContactClick?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ currentLang, onContactClick }) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.bg;
  const [activeService, setActiveService] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.05]);
  const bgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const { ref: revealRef, getStaggerVariants } = useStaggeredReveal(0.08);

  const serviceCategories = [
    'ДИАГНОСТИКА',
    'ТЕРАПИЯ',
    'ПРОТЕЗИРАНЕ',
    'ЕСТЕТИКА',
    'ПРОФИЛАКТИКА',
    'ДЕТСКО ЛЕЧЕНИЕ',
    'СПЕЦИАЛНА ГРИЖА',
  ];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full min-h-screen bg-[#050505] text-[#F3F0E9] px-4 sm:px-8 lg:px-12 py-24 sm:py-32 lg:py-40 overflow-hidden flex flex-col justify-center"
    >
      {/* 1. IMMERSIVE RICH SCENERY */}
      <motion.div
        style={{ scale: bgScale, y: bgY }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
      >
        <picture>
          <source srcSet="/images/mindloop_process_bg-mobile.webp" media="(max-width: 768px)" type="image/webp" />
          <img
            src="/images/mindloop_process_bg.webp"
            alt="Dental Practice Scenery"
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
          SERVICES
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
            <span className="font-semibold text-[#A6B09F]">{t.services.badge}</span>
            <span className="text-white/30">•</span>
            <span className="text-[#F3F0E9]/80">{SITE_DATA.location}</span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              {...getStaggerVariants(1)}
              className="font-condensed font-extrabold uppercase text-[#F3F0E9] tracking-[-0.04em] leading-[0.88] text-[clamp(38px,7vw,84px)] drop-shadow-2xl"
            >
              {t.services.heading}
            </motion.h2>
          </div>

          <motion.p
            {...getStaggerVariants(2)}
            className="font-editorial text-[14px] sm:text-[16px] text-[#A8A7A2] max-w-[650px] mt-4 leading-relaxed"
          >
            {t.services.subheading}
          </motion.p>
        </div>

        {/* ========================================================================= */}
        {/* 7 SERVICES PRESENTATION: Interactive List + Live Focus Card               */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* LEFT COLUMN: Editorial Numbered Services List (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-white/[0.12] border-t border-white/[0.12]">
            {SITE_DATA.services.map((service, idx) => (
              <motion.div
                key={service.num}
                {...getStaggerVariants(idx + 3)}
                onMouseEnter={() => setActiveService(idx)}
                onClick={() => setActiveService(idx)}
                className={`group relative flex items-center justify-between py-5 sm:py-6 transition-all duration-300 cursor-pointer ${
                  activeService === idx
                    ? 'bg-[#080a12]/80 border border-white/[0.18] px-4 -mx-4 rounded-2xl backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.6)]'
                    : 'hover:bg-white/[0.03] border border-transparent'
                }`}
              >
                <div className="flex items-start sm:items-center gap-5 sm:gap-8">
                  {/* Step Number */}
                  <span
                    className={`font-condensed font-extrabold text-[30px] sm:text-[40px] tracking-tight transition-all duration-300 leading-none shrink-0 ${
                      activeService === idx
                        ? 'text-[#F3F0E9] translate-x-1'
                        : 'text-white/25 group-hover:text-white/50'
                    }`}
                  >
                    {service.num}
                  </span>

                  {/* Title & Description */}
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono tracking-widest text-[#A6B09F] uppercase mb-0.5">
                      {serviceCategories[idx] || 'СТОМАТОЛОГИЯ'}
                    </span>
                    <h3
                      className={`font-condensed font-extrabold uppercase text-[20px] sm:text-[25px] tracking-tight transition-transform duration-300 leading-tight ${
                        activeService === idx
                          ? 'text-[#F3F0E9] translate-x-1 drop-shadow'
                          : 'text-[#F3F0E9]/80 group-hover:text-[#F3F0E9] group-hover:translate-x-1'
                      }`}
                    >
                      {service.title}
                    </h3>
                    <p className="font-editorial text-[13px] sm:text-[14px] text-[#A8A7A2] leading-relaxed mt-1 hidden sm:block">
                      {service.desc}
                    </p>
                  </div>
                </div>

                {/* Right Arrow */}
                <div className="shrink-0 pl-3">
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeService === idx
                        ? 'bg-[#F3F0E9] text-[#050505] shadow-md'
                        : 'bg-white/[0.05] text-white/40 group-hover:bg-white/10 group-hover:text-white'
                    }`}
                  >
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT COLUMN: Active Service Detailed Focus Card */}
          <div className="lg:col-span-5 w-full relative">
            <motion.div
              {...getStaggerVariants(10)}
              className="sticky top-28 relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] rounded-[24px] bg-[#080a12]/90 text-[#F3F0E9] p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.18)] border border-white/[0.18] backdrop-blur-3xl"
            >
              {/* Internal technical texture and subtle backlight */}
              <div className="absolute inset-0 bg-subtle-grain opacity-30 pointer-events-none z-10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12)_0%,transparent_75%)] pointer-events-none z-10" />

              {/* Corner Registration Marks */}
              <div className="absolute top-3 left-3 text-[10px] font-mono text-[#666666] select-none z-20">┌</div>
              <div className="absolute top-3 right-3 text-[10px] font-mono text-[#666666] select-none z-20">┐</div>
              <div className="absolute bottom-3 left-3 text-[10px] font-mono text-[#666666] select-none z-20">└</div>
              <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#666666] select-none z-20">┘</div>

              {/* Card Header */}
              <div className="relative z-20 flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-[#92918C] uppercase">
                <span className="flex items-center gap-2">
                  <Stethoscope className="w-3.5 h-3.5 text-[#A6B09F]" />
                  <span>{serviceCategories[activeService]}</span>
                </span>
                <span className="text-[#A6B09F] font-semibold">
                  0{activeService + 1} / 07
                </span>
              </div>

              {/* Card Body */}
              <div className="relative z-20 my-auto flex flex-col items-center justify-center text-center py-4">
                <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full border border-white/[0.2] bg-black/70 backdrop-blur-md flex items-center justify-center relative mb-4 shadow-2xl">
                  <div className="absolute inset-1.5 rounded-full border border-dashed border-white/[0.25] animate-[spin_30s_linear_infinite]" />
                  <span className="font-condensed font-black text-[28px] sm:text-[32px] text-[#F3F0E9]">
                    0{activeService + 1}
                  </span>
                </div>

                <h4 className="font-condensed font-extrabold uppercase text-[22px] sm:text-[26px] tracking-tight text-[#F3F0E9] mb-2 leading-tight">
                  {SITE_DATA.services[activeService].title}
                </h4>

                <p className="font-editorial text-[13px] sm:text-[14px] text-[#C5C4BF] max-w-[320px] leading-relaxed">
                  {SITE_DATA.services[activeService].desc}
                </p>

                <div className="mt-5 flex items-center gap-2 text-[11px] font-mono text-[#A6B09F] bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/10">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>ИНДИВИДУАЛЕН ПОДХОД</span>
                </div>
              </div>

              {/* Card Footer with Direct Call Button */}
              <div className="relative z-20 flex items-center justify-between pt-3 border-t border-white/[0.12]">
                <span className="text-[9.5px] font-mono tracking-[0.18em] text-[#92918C] uppercase">
                  {SITE_DATA.location}
                </span>

                <a
                  href={`tel:${SITE_DATA.phoneRaw}`}
                  className="inline-flex items-center gap-2 bg-[#F3F0E9] hover:bg-white text-[#050505] text-[10px] font-mono font-bold tracking-wider uppercase px-3 py-1.5 rounded-full transition-all shadow-md"
                >
                  <Phone className="w-3 h-3 stroke-[2.2]" />
                  <span>ЗАПИШЕТЕ ЧАС</span>
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
