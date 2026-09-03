import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Language } from '../translations';
import { useStaggeredReveal, EXPO_OUT } from '../hooks/useStaggeredReveal';

interface InteractiveExperienceSectionProps {
  currentLang?: Language;
  onContactClick?: () => void;
}

interface ServiceItem {
  num: string;
  titleBg: string;
  titleEn: string;
  descBg: string;
  descEn: string;
}

const SERVICES: ServiceItem[] = [
  {
    num: '01',
    titleBg: 'ПЪЛНА ПРОТЕЗА',
    titleEn: 'FULL DENTURE',
    descBg: 'Индивидуално проектирана и прецизно изработена плакова протеза за цялостно възстановяване и максимален комфорт.',
    descEn: 'Individually designed and crafted full acrylic denture for complete restoration and optimal fit.',
  },
  {
    num: '02',
    titleBg: 'ЧАСТИЧНА ПРОТЕЗА',
    titleEn: 'PARTIAL DENTURE',
    descBg: 'Прецизно моделирана частична конструкция с внимание към анатомичната стабилност и естетика.',
    descEn: 'Precisely modeled partial construction with meticulous attention to anatomical stability and aesthetics.',
  },
  {
    num: '03',
    titleBg: 'ПОПРАВКА',
    titleEn: 'REPAIR',
    descBg: 'Надеждно и експресно лабораторен ремонт на счупени, пукнати или деформирани протези.',
    descEn: 'Reliable and prompt laboratory repair for fractured, cracked, or damaged dental dentures.',
  },
  {
    num: '04',
    titleBg: 'ЗЪБ',
    titleEn: 'TOOTH PLACEMENT',
    descBg: 'Прецизно лабораторно поставяне, подмяна и естетично съгласуване на отделни зъби в протезата.',
    descEn: 'Precise laboratory placement, replacement, and aesthetic alignment of individual denture teeth.',
  },
];

export const InteractiveExperienceSection: React.FC<InteractiveExperienceSectionProps> = ({
  currentLang = 'bg',
  onContactClick,
}) => {
  const isBg = currentLang === 'bg';
  const [activeRow, setActiveRow] = useState<number | null>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.07]);
  const bgY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  const { ref: revealRef, isInView, getStaggerVariants } = useStaggeredReveal(0.1);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full min-h-screen bg-[#050505] text-[#F3F0E9] px-4 sm:px-8 lg:px-12 py-24 sm:py-32 lg:py-40 overflow-hidden flex flex-col justify-center"
    >
      {/* 1. IMMERSIVE RICH 3D SCENERY (MINDLOOP DIRECTION) */}
      <motion.div
        style={{ scale: bgScale, y: bgY }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
      >
        <img
          src="/images/mindloop_experience_bg.jpg"
          alt="Immersive Ceramic Scenery"
          className="w-full h-full object-cover object-center opacity-65 filter brightness-105 contrast-115"
        />
        {/* Soft atmospheric gradient transitions */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/45 to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.12)_0%,transparent_75%)]" />
        <div className="absolute inset-0 bg-subtle-grain opacity-20" />
      </motion.div>

      <div
        ref={revealRef}
        className="relative z-10 w-full max-w-[1340px] mx-auto flex flex-col"
      >
        {/* Top Meta Tag */}
        <motion.div
          {...getStaggerVariants(0)}
          className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.24em] text-[#A6B09F] uppercase mb-4 sm:mb-6 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 w-fit"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#A6B09F] animate-pulse" />
          <span className="font-semibold text-[#A6B09F]">RADI / 04</span>
          <span className="text-white/30">•</span>
          <span className="text-[#F3F0E9]/80">EXPERIENCE & PRECISION</span>
        </motion.div>

        {/* Large Oversized Heading */}
        <div className="overflow-hidden mb-12 sm:mb-16 lg:mb-20">
          <motion.h2
            {...getStaggerVariants(1)}
            className="font-condensed font-extrabold uppercase text-[#F3F0E9] tracking-[-0.045em] leading-[0.85] text-[clamp(46px,9vw,110px)] select-none drop-shadow-2xl"
          >
            {isBg ? (
              <>
                ПРЕЦИЗНОСТ
                <br />
                ВЪВ ВСЕКИ
                <br />
                ДЕТАЙЛ.
              </>
            ) : (
              <>
                PRECISION
                <br />
                IN EVERY
                <br />
                DETAIL.
              </>
            )}
          </motion.h2>
        </div>

        {/* Interactive Horizontal System: 4 Large Rows in Dark Liquid-Glass styling */}
        <div className="w-full flex flex-col border-t border-white/[0.14] divide-y divide-white/[0.14]">
          {SERVICES.map((item, idx) => {
            const isSelected = activeRow === idx;

            return (
              <motion.div
                key={item.num}
                {...getStaggerVariants(idx + 2)}
                onMouseEnter={() => setActiveRow(idx)}
                onClick={() => {
                  setActiveRow(isSelected ? null : idx);
                  if (onContactClick && isSelected) {
                    onContactClick();
                  }
                }}
                className={`group relative w-full transition-all duration-300 cursor-pointer overflow-hidden py-6 sm:py-8 lg:py-10 px-4 sm:px-8 rounded-2xl backdrop-blur-2xl ${
                  isSelected
                    ? 'bg-[#080a12]/80 border border-white/[0.22] shadow-[0_25px_50px_rgba(0,0,0,0.7)]'
                    : 'hover:bg-white/[0.04] border border-transparent'
                }`}
              >
                <div className="w-full flex items-center justify-between gap-4">
                  {/* Left: Number + Title */}
                  <div className="flex items-center gap-6 sm:gap-12 lg:gap-16">
                    <span
                      className={`font-mono text-[14px] sm:text-[18px] tracking-[0.2em] transition-colors duration-300 font-bold ${
                        isSelected ? 'text-[#A6B09F]' : 'text-white/30 group-hover:text-white/60'
                      }`}
                    >
                      {item.num}
                    </span>

                    <h3
                      className={`font-condensed font-extrabold uppercase tracking-tight transition-all duration-300 leading-none text-[clamp(28px,4.5vw,56px)] ${
                        isSelected
                          ? 'text-[#F3F0E9] translate-x-1 sm:translate-x-3 drop-shadow-md'
                          : 'text-[#F3F0E9]/75 group-hover:text-[#F3F0E9] group-hover:translate-x-1'
                      }`}
                    >
                      {isBg ? item.titleBg : item.titleEn}
                    </h3>
                  </div>

                  {/* Right: Circle Arrow Trigger */}
                  <div className="shrink-0">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? 'bg-[#F3F0E9] text-[#050505] rotate-45 shadow-md scale-105'
                          : 'bg-white/[0.08] text-white/40 group-hover:bg-white/15 group-hover:text-white'
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                    </div>
                  </div>
                </div>

                {/* Expanded State: Smooth description reveal */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EXPO_OUT }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 sm:pt-6 pl-[38px] sm:pl-[68px] lg:pl-[84px] max-w-[650px]">
                        <p className="font-editorial text-[14px] sm:text-[16px] text-[#A8A7A2] leading-relaxed">
                          {isBg ? item.descBg : item.descEn}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Editorial Statement */}
        <motion.div
          {...getStaggerVariants(6)}
          className="w-full flex flex-col sm:flex-row sm:items-end justify-between pt-16 sm:pt-24 mt-8 border-t border-white/[0.12] gap-4"
        >
          <div className="flex flex-col">
            <span className="font-condensed font-extrabold text-[22px] tracking-tight uppercase text-[#F3F0E9]">
              RADI
            </span>
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#92918C] uppercase">
              DENTAL PROSTHETICS LABORATORY
            </span>
          </div>

          <div className="text-[10px] font-mono tracking-[0.22em] text-[#92918C] uppercase">
            BLAGOEVGRAD / BG
          </div>
        </motion.div>

      </div>
    </section>
  );
};
