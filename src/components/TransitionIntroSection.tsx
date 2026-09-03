import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Language, TRANSLATIONS } from '../translations';
import { useMaskPositions } from '../hooks/useMaskPositions';
import { useStaggeredReveal, EXPO_OUT } from '../hooks/useStaggeredReveal';
import { MaskedCard } from './MaskedCard';

interface TransitionIntroSectionProps {
  currentLang?: Language;
  onLearnMoreClick?: () => void;
}

export const TransitionIntroSection: React.FC<TransitionIntroSectionProps> = ({
  currentLang = 'bg',
  onLearnMoreClick,
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.bg;
  const isBg = currentLang === 'bg';

  // Section & Card Refs for continuous shared-background masking
  const containerRef = useRef<HTMLDivElement>(null);
  const card0Ref = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  const maskOffsets = useMaskPositions(containerRef, [
    card0Ref,
    card1Ref,
    card2Ref,
    card3Ref,
  ]);

  const { ref: sectionRevealRef, isInView, getStaggerVariants } = useStaggeredReveal(0.12);

  // Service categories configuration
  const services = [
    {
      num: '01',
      title: isBg ? 'ПЪЛНА ПРОТЕЗА' : (t as any).section02?.block1Title || 'FULL PROSTHESIS',
      active: true,
    },
    {
      num: '02',
      title: isBg ? 'ЧАСТИЧНА ПРОТЕЗА' : (t as any).section02?.block2Title || 'PARTIAL PROSTHESIS',
      active: false,
    },
    {
      num: '03',
      title: isBg ? 'ПОПРАВКА' : 'REPAIR',
      active: false,
    },
    {
      num: '04',
      title: isBg ? 'ЗЪБ' : 'TOOTH',
      active: false,
    },
  ];

  return (
    <section
      ref={sectionRevealRef}
      id="services"
      className="relative w-full bg-[#050505] text-[#F3F0E9] px-4 sm:px-8 lg:px-12 py-16 sm:py-24 lg:py-28 overflow-hidden bg-subtle-grain"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] sm:w-[900px] h-[350px] bg-white/[0.015] rounded-full blur-[140px] pointer-events-none"
      />

      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-[1340px] mx-auto flex flex-col gap-4 sm:gap-6"
      >
        {/* ========================================================================= */}
        {/* TOP ASYMMETRIC GRID: Left Column (Card 0 + Card 2/1) & Right Large Visual  */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          
          {/* ----------------------------------------------------------------------- */}
          {/* LEFT SIDE: 2 Stacked Cards (Card 0 Small Top + Card 2 Large Bottom)    */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6">
            
            {/* CARD 0: Top-Left Small Editorial Card */}
            <motion.div {...getStaggerVariants(0)}>
              <MaskedCard
                ref={card0Ref}
                offset={maskOffsets[0]}
                className="p-6 sm:p-8 min-h-[140px] sm:min-h-[160px] flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-[0.22em] text-[#A6B09F] uppercase">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A6B09F]" />
                    <span>RADI / 02</span>
                  </span>
                  <span>BLAGOEVGRAD / BG</span>
                </div>

                <div className="mt-4 flex flex-col">
                  <h3 className="font-condensed font-extrabold uppercase text-[24px] sm:text-[32px] tracking-tight leading-tight text-[#F3F0E9]">
                    {isBg ? 'ПРЕЦИЗНОСТ' : 'PRECISION'}
                  </h3>
                  <p className="font-editorial text-[13px] sm:text-[14px] text-[#92918C] mt-1">
                    {isBg ? 'Изработка на зъбни протези' : 'Dental prosthetics fabrication'}
                  </p>
                </div>
              </MaskedCard>
            </motion.div>

            {/* CARD 2: Large Bottom Typography + Supporting Copy & CTA */}
            <motion.div {...getStaggerVariants(1)} className="flex-1 flex flex-col">
              <MaskedCard
                ref={card1Ref}
                offset={maskOffsets[1]}
                className="p-6 sm:p-10 flex-1 flex flex-col justify-between gap-6"
              >
                <div>
                  <h2 className="font-condensed font-extrabold uppercase text-[#F3F0E9] tracking-[-0.04em] leading-[0.88] text-[clamp(40px,6vw,76px)]">
                    {isBg ? (
                      <>
                        ЗЪБНИ
                        <br />
                        <span className="text-[#F3F0E9]/90">ПРОТЕЗИ</span>
                      </>
                    ) : (
                      <>
                        DENTAL
                        <br />
                        <span className="text-[#F3F0E9]/90">PROSTHETICS</span>
                      </>
                    )}
                  </h2>

                  <p className="font-editorial text-[14px] sm:text-[16px] text-[#92918C] leading-[1.65] max-w-[460px] mt-4 sm:mt-6">
                    {isBg
                      ? '„Прецизната изработка започва с внимание към всеки детайл.“'
                      : '"Precise fabrication begins with meticulous attention to every single detail."'}
                  </p>
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onLearnMoreClick}
                    className="group relative inline-flex items-center justify-between gap-3 sm:gap-4 bg-[#F3F0E9] text-[#050505] rounded-full pl-5 sm:pl-6 pr-2 sm:pr-2.5 h-[44px] sm:h-[48px] min-w-[170px] shadow-xl hover:bg-white transition-all duration-200 cursor-pointer focus:outline-none"
                  >
                    <span className="font-editorial text-[12px] sm:text-[13px] font-bold tracking-[0.06em] uppercase whitespace-nowrap">
                      {isBg ? 'СВЪРЖЕТЕ СЕ С НАС' : 'GET IN TOUCH'}
                    </span>
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#050505] text-[#F3F0E9] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 shrink-0">
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
                    </span>
                  </button>
                </div>
              </MaskedCard>
            </motion.div>

          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* RIGHT SIDE: Large Dominant Vertical Visual Card (Spanning Two Rows)     */}
          {/* ----------------------------------------------------------------------- */}
          <motion.div {...getStaggerVariants(2)} className="lg:col-span-5 flex flex-col">
            <MaskedCard
              ref={card2Ref}
              offset={maskOffsets[2]}
              className="min-h-[320px] sm:min-h-[420px] lg:min-h-full p-6 sm:p-8 flex flex-col justify-between"
            >
              {/* Internal subtle technical overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Corner marks */}
              <div className="absolute top-3 left-3 text-[10px] font-mono text-white/20 select-none pointer-events-none">┌</div>
              <div className="absolute top-3 right-3 text-[10px] font-mono text-white/20 select-none pointer-events-none">┐</div>
              <div className="absolute bottom-3 left-3 text-[10px] font-mono text-white/20 select-none pointer-events-none">└</div>
              <div className="absolute bottom-3 right-3 text-[10px] font-mono text-white/20 select-none pointer-events-none">┘</div>

              {/* Top Header */}
              <div className="relative z-10 flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-[#92918C] uppercase">
                <span>RADI LABORATORY</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#A6B09F] animate-pulse" />
              </div>

              {/* Center Abstract Reticle Graphic */}
              <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-8">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-white/[0.14] bg-white/[0.02] backdrop-blur-sm flex items-center justify-center relative mb-4">
                  <div className="absolute inset-2 rounded-full border border-dashed border-white/[0.18] animate-[spin_40s_linear_infinite]" />
                  <div className="w-10 h-10 rounded-full border border-[#A6B09F]/40 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#A6B09F]" />
                  </div>
                </div>
                <span className="font-condensed font-extrabold text-[22px] sm:text-[26px] tracking-tight uppercase text-[#F3F0E9]">
                  {isBg ? 'ПРЕЦИЗНА ИЗРАБОТКА' : 'PRECISION CRAFT'}
                </span>
                <span className="text-[10px] font-mono tracking-[0.18em] text-[#92918C] uppercase mt-1">
                  BLAGOEVGRAD • SCALE 1:1
                </span>
              </div>

              {/* Bottom Spec */}
              <div className="relative z-10 flex items-center justify-between text-[9px] sm:text-[10px] font-mono tracking-[0.18em] text-[#92918C] uppercase pt-3 border-t border-white/[0.08]">
                <span>100% MANUAL FIT</span>
                <span className="text-[#A6B09F]">SCALE 1:1</span>
              </div>
            </MaskedCard>
          </motion.div>

        </div>

        {/* ========================================================================= */}
        {/* CARD 3: BOTTOM FULL WIDTH HORIZONTAL SERVICES / CATEGORIES PANEL          */}
        {/* ========================================================================= */}
        <motion.div {...getStaggerVariants(3)} className="w-full">
          <div
            ref={card3Ref}
            className="w-full rounded-[14px] sm:rounded-[18px] border border-white/[0.12] bg-[#0c0d10]/80 p-3 sm:p-4 backdrop-blur-md shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
          >
            {/* Responsive 4-column desktop / 2-column mobile wrapping grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
              {services.map((srv, idx) => (
                <div
                  key={srv.num}
                  onClick={onLearnMoreClick}
                  className={`group relative rounded-[10px] sm:rounded-[14px] p-4 sm:p-5 flex flex-col justify-between min-h-[95px] sm:min-h-[110px] transition-all duration-200 cursor-pointer ${
                    srv.active
                      ? 'bg-[#F3F0E9] text-[#050505] shadow-lg scale-[1.01]'
                      : 'bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-[#F3F0E9]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[11px] sm:text-[12px] font-mono font-bold tracking-widest ${
                        srv.active ? 'text-[#050505]' : 'text-[#92918C]'
                      }`}
                    >
                      {srv.num}
                    </span>
                    <ArrowUpRight
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                        srv.active ? 'text-[#050505] stroke-[2.5]' : 'text-[#92918C] stroke-[2]'
                      }`}
                    />
                  </div>

                  <span
                    className={`font-condensed font-extrabold uppercase text-[15px] sm:text-[18px] lg:text-[19px] tracking-tight leading-tight mt-2 ${
                      srv.active ? 'text-[#050505]' : 'text-[#F3F0E9]'
                    }`}
                  >
                    {srv.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
