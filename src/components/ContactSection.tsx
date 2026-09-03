import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, MapPin, Phone } from 'lucide-react';
import { Language, SITE_DATA } from '../translations';
import { useStaggeredReveal } from '../hooks/useStaggeredReveal';

interface ContactSectionProps {
  currentLang?: Language;
  onContactClick?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  currentLang = 'bg',
  onContactClick,
}) => {
  const isBg = currentLang === 'bg';
  const { ref: sectionRef, getStaggerVariants } = useStaggeredReveal(0.12);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-screen bg-[#050505] text-[#F3F0E9] px-4 sm:px-8 lg:px-12 py-24 sm:py-32 lg:py-40 overflow-hidden flex flex-col justify-center"
    >
      {/* 1. ATMOSPHERIC BACKDROP & SUBTLE GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-1/4 w-[600px] sm:w-[950px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.1)_0%,rgba(99,102,241,0.05)_40%,transparent_75%)] blur-[150px]" />
        <div className="absolute inset-0 bg-subtle-grain opacity-25" />
      </div>

      <div className="relative z-10 w-full max-w-[1340px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-16 items-center">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Headings, Location & Large CTA Button                        */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          
          {/* Top Meta */}
          <motion.div
            {...getStaggerVariants(0)}
            className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.24em] text-[#A6B09F] uppercase mb-4 sm:mb-6 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 w-fit"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#A6B09F] animate-pulse" />
            <span className="font-semibold text-[#A6B09F]">ДАРИА / КОНТАКТИ</span>
            <span className="text-white/30">•</span>
            <span className="text-[#F3F0E9]/80">ВАРНА, БЪЛГАРИЯ</span>
          </motion.div>

          {/* Enormous Headline */}
          <div className="overflow-hidden mb-8 sm:mb-12">
            <motion.h2
              {...getStaggerVariants(1)}
              className="font-condensed font-extrabold uppercase text-[#F3F0E9] tracking-[-0.045em] leading-[0.85] text-[clamp(46px,9vw,110px)] select-none drop-shadow-2xl"
            >
              {isBg ? (
                <>
                  ЗАПИШЕТЕ
                  <br />
                  <span className="text-[#F3F0E9]/90">СВОЯ ЧАС.</span>
                </>
              ) : (
                <>
                  BOOK YOUR
                  <br />
                  <span className="text-[#F3F0E9]/90">APPOINTMENT.</span>
                </>
              )}
            </motion.h2>
          </div>

          {/* Location & Phone text block */}
          <motion.div
            {...getStaggerVariants(2)}
            className="flex flex-col sm:flex-row sm:items-center gap-6 text-[14px] sm:text-[16px] font-mono tracking-[0.16em] uppercase mb-8 sm:mb-10 leading-relaxed border-l-2 border-[#A6B09F] pl-4"
          >
            <div className="flex flex-col text-[#A8A7A2]">
              <span className="text-[#F3F0E9] font-bold">ВАРНА</span>
              <span>БЪЛГАРИЯ</span>
            </div>

            <a
              href={`tel:${SITE_DATA.phoneRaw}`}
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-white/[0.06] hover:bg-[#A6B09F] hover:text-[#050505] border border-white/[0.14] text-[#F3F0E9] text-[14px] font-mono font-bold tracking-wider transition-all w-fit cursor-pointer shadow-lg"
            >
              <Phone className="w-4 h-4 text-[#A6B09F] hover:text-[#050505]" />
              <span>{SITE_DATA.phone}</span>
            </a>
          </motion.div>

          {/* Large CTA Button */}
          <motion.div {...getStaggerVariants(3)} className="flex items-center">
            <button
              type="button"
              onClick={onContactClick}
              className="group relative inline-flex items-center justify-between gap-4 sm:gap-6 bg-[#F3F0E9] text-[#050505] rounded-full pl-6 sm:pl-8 pr-2.5 sm:pr-3 h-[54px] sm:h-[62px] min-w-[220px] sm:min-w-[280px] shadow-2xl hover:bg-white transition-all duration-300 cursor-pointer focus:outline-none hover:scale-[1.02]"
            >
              <span className="font-editorial text-[13px] sm:text-[15px] font-bold tracking-[0.06em] uppercase whitespace-nowrap">
                {isBg ? 'ЗАПИШЕТЕ ЧАС ЗА КОНСУЛТАЦИЯ' : 'BOOK A CONSULTATION'}
              </span>
              <span className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#050505] text-[#F3F0E9] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 shrink-0 shadow-md">
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.4]" />
              </span>
            </button>
          </motion.div>

        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Ultra-fast Zero-Freeze Dark Editorial Map Card              */}
        {/* ========================================================================= */}
        <motion.div
          {...getStaggerVariants(4)}
          className="lg:col-span-5 w-full flex flex-col"
        >
          {/* Label Above Map */}
          <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-[#92918C] uppercase mb-3">
            <span className="flex items-center gap-1.5 text-[#A6B09F]">
              <MapPin className="w-3.5 h-3.5 text-[#A6B09F]" />
              <span>ЛОКАЦИЯ</span>
            </span>
            <span>ВАРНА / BG</span>
          </div>

          {/* Maps Framed Container — 100% Freeze-Free Native Card */}
          <a
            href="https://maps.google.com/?q=Varna,+Bulgaria"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Отвори локацията в Google Maps"
            className="group relative w-full h-[290px] sm:h-[330px] lg:h-[400px] rounded-[24px] border border-white/[0.18] bg-[#080a12] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.15)] flex flex-col justify-between p-6 sm:p-8 cursor-pointer transition-all duration-300 hover:border-white/[0.35]"
          >
            {/* Styled Architectural Grid / Dark Map Visual */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12)_0%,transparent_75%)] pointer-events-none" />
            
            {/* Ambient vector route lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <path d="M-50 150 Q 150 80 350 200 T 700 120" fill="none" stroke="#A6B09F" strokeWidth="1.5" strokeDasharray="4 6" />
              <path d="M100 -20 Q 200 180 250 400" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.4" />
              <path d="M-20 300 L 500 80" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.2" />
            </svg>

            {/* Corner Registration Marks */}
            <div className="absolute top-3 left-3 text-[10px] font-mono text-[#666666] select-none pointer-events-none">┌</div>
            <div className="absolute top-3 right-3 text-[10px] font-mono text-[#666666] select-none pointer-events-none">┐</div>
            <div className="absolute bottom-3 left-3 text-[10px] font-mono text-[#666666] select-none pointer-events-none">└</div>
            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#666666] select-none pointer-events-none">┘</div>

            {/* Top Card Info */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#A6B09F] animate-ping" />
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#F3F0E9] uppercase">
                  43.2141° N, 27.9147° E
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-[#92918C] uppercase">
                ВАРНА
              </span>
            </div>

            {/* Center Beacon & Pin */}
            <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
              <div className="relative w-16 h-16 rounded-full bg-[#A6B09F]/10 border border-[#A6B09F]/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 rounded-full bg-[#A6B09F]/20 animate-ping" />
                <MapPin className="w-7 h-7 text-[#A6B09F] relative z-10 drop-shadow-[0_0_12px_rgba(166,176,159,0.8)]" />
              </div>
              <span className="font-condensed font-extrabold uppercase text-[20px] sm:text-[22px] tracking-tight text-[#F3F0E9]">
                СТОМАТОЛОГ ДАРИА
              </span>
              <span className="font-mono text-[11px] text-[#A6B09F] tracking-wider uppercase mt-0.5">
                ВАРНА, БЪЛГАРИЯ
              </span>
            </div>

            {/* Bottom Card Action Link */}
            <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/[0.1]">
              <span className="text-[10px] font-mono tracking-wider text-[#92918C] uppercase">
                {isBg ? 'НАВИГАЦИЯ & КАРТА' : 'MAP & DIRECTIONS'}
              </span>

              <div className="inline-flex items-center gap-2 bg-[#F3F0E9] group-hover:bg-white text-[#050505] text-[10.5px] font-mono font-bold tracking-wider uppercase px-4 py-2 rounded-full transition-all shadow-xl group-hover:scale-105">
                <span>{isBg ? 'ОТВОРИ В GOOGLE MAPS' : 'OPEN IN GOOGLE MAPS'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 stroke-[2.4]" />
              </div>
            </div>
          </a>

          {/* Sub-label below map */}
          <div className="flex items-center justify-between text-[9.5px] font-mono tracking-[0.18em] text-[#92918C] uppercase pt-3">
            <span>ВАРНА, БЪЛГАРИЯ</span>
            <span>BG / EU</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
