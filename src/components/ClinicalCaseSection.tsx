import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, CheckCircle2, Phone, ArrowUpRight } from 'lucide-react';
import { Language, TRANSLATIONS, SITE_DATA } from '../translations';
import { useStaggeredReveal } from '../hooks/useStaggeredReveal';

interface ClinicalCaseSectionProps {
  currentLang: Language;
  onContactClick?: () => void;
}

export const ClinicalCaseSection: React.FC<ClinicalCaseSectionProps> = ({ currentLang, onContactClick }) => {
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
      id="case"
      className="relative w-full min-h-screen bg-[#050505] text-[#F3F0E9] px-4 sm:px-8 lg:px-12 py-24 sm:py-32 lg:py-40 overflow-hidden flex flex-col justify-center"
    >
      {/* Background Atmosphere */}
      <motion.div
        style={{ scale: bgScale, y: bgY }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
      >
        <picture>
          <source srcSet="/images/mindloop_pricing_bg-mobile.webp" media="(max-width: 768px)" type="image/webp" />
          <img
            src="/images/mindloop_pricing_bg.webp"
            alt="Dental Clinical Atmosphere"
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

      {/* Typography Backdrop */}
      <div className="absolute -top-6 sm:top-2 right-0 left-0 flex justify-end pointer-events-none select-none z-0 overflow-hidden pr-4 sm:pr-12">
        <span className="font-condensed font-black uppercase text-[clamp(80px,18vw,250px)] tracking-[-0.05em] leading-none text-white/[0.05] whitespace-nowrap blur-[0.4px]">
          RESULTS
        </span>
      </div>

      <div
        ref={revealRef}
        className="relative z-10 w-full max-w-[1340px] mx-auto flex flex-col"
      >
        {/* Section Header */}
        <div className="w-full flex flex-col items-start mb-12 sm:mb-16">
          <motion.div
            {...getStaggerVariants(0)}
            className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.24em] text-[#A6B09F] uppercase mb-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#A6B09F] animate-pulse" />
            <span className="font-semibold text-[#A6B09F]">{t.clinicalCase.badge}</span>
            <span className="text-white/30">•</span>
            <span className="text-[#F3F0E9]/80">РЕАЛЕН СЛУЧАЙ</span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              {...getStaggerVariants(1)}
              className="font-condensed font-extrabold uppercase text-[#F3F0E9] tracking-[-0.04em] leading-[0.88] text-[clamp(36px,7vw,80px)] drop-shadow-2xl"
            >
              {t.clinicalCase.title}
            </motion.h2>
          </div>

          <motion.p
            {...getStaggerVariants(2)}
            className="font-editorial text-[14px] sm:text-[16px] text-[#A8A7A2] max-w-[650px] mt-3 leading-relaxed"
          >
            {t.clinicalCase.subtitle} — {t.clinicalCase.desc}
          </motion.p>
        </div>

        {/* Featured Case Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Enhanced Before/After Image Frame */}
          <motion.div
            {...getStaggerVariants(3)}
            className="lg:col-span-7 w-full relative rounded-[28px] overflow-hidden border border-white/[0.2] bg-[#080a12] shadow-[0_35px_80px_rgba(0,0,0,0.9)] group"
          >
            <picture>
              <source srcSet="/images/clinical_before_after-mobile.webp" media="(max-width: 640px)" type="image/webp" />
              <img
                src="/images/clinical_before_after.webp"
                alt="Клиничен случай: Естетично възстановяване на зъб - Преди и След"
                width={800}
                height={900}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover object-center max-h-[580px] group-hover:scale-[1.02] transition-transform duration-700"
              />
            </picture>

            {/* Registration marks */}
            <div className="absolute top-3 left-3 text-[10px] font-mono text-[#666666] select-none">┌</div>
            <div className="absolute top-3 right-3 text-[10px] font-mono text-[#666666] select-none">┐</div>
            <div className="absolute bottom-3 left-3 text-[10px] font-mono text-[#666666] select-none">└</div>
            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#666666] select-none">┘</div>

            {/* Floating Case Metadata */}
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-black/75 backdrop-blur-md text-[#F3F0E9] px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider border border-white/20 uppercase">
                КЛИНИЧЕН РЕЗУЛТАТ
              </span>
            </div>
          </motion.div>

          {/* Case Description & Details */}
          <motion.div
            {...getStaggerVariants(4)}
            className="lg:col-span-5 flex flex-col justify-between h-full space-y-6"
          >
            <div className="rounded-[24px] p-6 sm:p-8 bg-[#080a12]/80 border border-white/[0.14] backdrop-blur-3xl shadow-xl">
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#A6B09F] uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ЕСТЕТИЧНА СТОМАТОЛОГИЯ</span>
              </div>

              <h3 className="font-condensed font-extrabold uppercase text-[24px] sm:text-[28px] tracking-tight text-[#F3F0E9] mb-3 leading-tight">
                ПРЕДИ И СЛЕД ЛЕЧЕНИЕ
              </h3>

              <p className="font-editorial text-[14px] text-[#A8A7A2] leading-relaxed mb-6">
                Прецизно почистване на засегнатите тъкани и директно композитно възстановяване на естествената анатомична форма, туберкули и фисури на зъба с високо ниво на естетика.
              </p>

              <div className="space-y-3 border-t border-white/[0.1] pt-4">
                <div className="flex items-center gap-3 text-[13px] text-[#F3F0E9]">
                  <CheckCircle2 className="w-4 h-4 text-[#A6B09F] shrink-0" />
                  <span>Пълно възстановяване на дъвкателната функция</span>
                </div>
                <div className="flex items-center gap-3 text-[13px] text-[#F3F0E9]">
                  <CheckCircle2 className="w-4 h-4 text-[#A6B09F] shrink-0" />
                  <span>Естествен цвят и оптична транслуцентност</span>
                </div>
                <div className="flex items-center gap-3 text-[13px] text-[#F3F0E9]">
                  <CheckCircle2 className="w-4 h-4 text-[#A6B09F] shrink-0" />
                  <span>Безболезнено лечение в комфортна обстановка</span>
                </div>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`tel:${SITE_DATA.phoneRaw}`}
                className="inline-flex items-center justify-between gap-4 bg-[#F3F0E9] hover:bg-white text-[#050505] rounded-full pl-6 pr-3 h-[52px] font-editorial text-[13px] font-bold tracking-[0.06em] uppercase shadow-2xl transition-all group cursor-pointer"
              >
                <span>ЗАПИШЕТЕ ЧАС ЗА КОНСУЛТАЦИЯ</span>
                <span className="w-8 h-8 rounded-full bg-[#050505] text-[#F3F0E9] flex items-center justify-center group-hover:rotate-45 transition-transform">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
