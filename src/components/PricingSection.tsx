import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Check } from 'lucide-react';
import { Language, TRANSLATIONS } from '../translations';
import { useStaggeredReveal, EXPO_OUT } from '../hooks/useStaggeredReveal';

interface PricingSectionProps {
  currentLang: Language;
  onSelectPlan?: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  currentLang,
  onSelectPlan,
}) => {
  const isBg = currentLang === 'bg';
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.bg;
  const p = t.pricingSection;

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax for the environment backdrop & typography
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const bgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const textY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const { ref: revealRef, isInView, getStaggerVariants } = useStaggeredReveal(0.1);

  const pricingCards = [
    {
      category: isBg ? 'ПЪЛНА' : p.card1.category || 'FULL',
      title: isBg ? 'ПЪЛНА ПРОТЕЗА' : p.card1.title || 'FULL DENTURE',
      price: '€350',
      period: isBg ? '/ протеза' : '/ denture',
      image: '/images/smile_senior_full_denture.jpg',
      imageAlt: 'Natural Confident Smile — Full Denture',
      desc: isBg
        ? 'Пълна плакова протеза, изработена в частна лаборатория с индивидуален анатомичен профил.'
        : 'Full acrylic denture crafted with custom anatomical profile.',
      features: isBg
        ? ['Индивидуална изработка', 'Пълно възстановяване', '100% ръчно пасване']
        : ['Custom fabrication', 'Complete restoration', '100% manual fit'],
      isFeatured: false,
    },
    {
      category: isBg ? 'ЧАСТИЧНА' : p.card2.category || 'PARTIAL',
      title: isBg ? 'ЧАСТИЧНА ПРОТЕЗА' : p.card2.title || 'PARTIAL DENTURE',
      price: '€300',
      period: isBg ? '/ протеза' : '/ denture',
      image: '/images/smile_woman_partial_denture.jpg',
      imageAlt: 'Radiant Confident Smile — Partial Denture',
      desc: isBg
        ? 'Частична протеза за прецизно възстановяване на дъвкателната функция и естетика.'
        : 'Partial denture for precise restoration of function and aesthetics.',
      features: isBg
        ? ['Прецизна стабилност', 'Акрилна конструкция', 'Естетично напасване']
        : ['Precise stability', 'Acrylic construction', 'Aesthetic matching'],
      isFeatured: true,
    },
    {
      category: isBg ? 'УСЛУГИ' : p.card3.category || 'SERVICES',
      title: isBg ? 'ПОПРАВКА / ЗЪБ' : p.card3.title || 'REPAIR / TOOTH',
      price: '€60',
      priceSubtitle: isBg ? 'Поправка: €60  •  Зъб: €50' : 'Repair: €60  •  Tooth: €50',
      period: isBg ? 'от' : 'from',
      image: '/images/dental_masterpiece_craft.jpg',
      imageAlt: 'Exquisite Dental Craftsmanship & Restoration',
      desc: isBg
        ? 'Експресна поправка на счупена протеза или прецизно поставяне на нов зъб.'
        : 'Express repair of damaged dentures or precise tooth addition.',
      features: isBg
        ? ['Поправка на протеза — €60', 'Поставяне на зъб — €50', 'Бърза лабораторна реакция']
        : ['Denture repair — €60', 'Tooth placement — €50', 'Fast turnaround'],
      isFeatured: false,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative w-full min-h-screen bg-[#050505] text-[#F3F0E9] px-4 sm:px-8 lg:px-12 py-24 sm:py-32 lg:py-40 overflow-hidden flex flex-col justify-center"
    >
      {/* 1. IMMERSIVE RICH 3D ART ENVIRONMENT (MINDLOOP DIRECTION) */}
      <motion.div
        style={{ scale: bgScale, y: bgY }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
      >
        <img
          src="/images/mindloop_pricing_bg.jpg"
          alt="Immersive 3D Dental Environment"
          className="w-full h-full object-cover object-center opacity-70 filter brightness-105 contrast-115"
        />
        {/* Soft atmospheric gradient transitions */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.15)_0%,rgba(99,102,241,0.08)_40%,transparent_75%)]" />
        <div className="absolute inset-0 bg-subtle-grain opacity-20" />
      </motion.div>

      {/* 2. HUGE OVERSIZED TYPOGRAPHIC BACKDROP ("PRECISION" / "ПРЕЦИЗНОСТ") */}
      <motion.div
        style={{ y: textY }}
        className="absolute inset-x-0 top-16 sm:top-20 lg:top-24 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
      >
        <span className="font-condensed font-black uppercase text-[clamp(90px,22vw,290px)] tracking-[-0.05em] leading-none text-white/[0.09] whitespace-nowrap blur-[0.4px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
          {isBg ? 'ПРЕЦИЗНОСТ' : 'PRECISION'}
        </span>
      </motion.div>

      {/* 3. MAIN CONTENT WRAPPER */}
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
            <span className="font-semibold text-[#A6B09F]">RADI / 03</span>
            <span className="text-white/30">•</span>
            <span className="text-[#F3F0E9]/80">PRICING & SERVICES</span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              {...getStaggerVariants(1)}
              className="font-condensed font-extrabold uppercase text-[#F3F0E9] tracking-[-0.04em] leading-[0.88] text-[clamp(42px,7.5vw,90px)] drop-shadow-2xl"
            >
              {isBg ? 'ЦЕНИ НА УСЛУГИТЕ' : 'LABORATORY PRICING'}
            </motion.h2>
          </div>
        </div>

        {/* 4. THREE LARGE LIQUID-GLASS PRICING CARDS EMBEDDED IN SCENERY */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {pricingCards.map((card, idx) => (
            <motion.div
              key={card.title}
              {...getStaggerVariants(idx + 2)}
              className="flex flex-col"
            >
              <div
                onClick={onSelectPlan}
                className={`group relative h-full flex flex-col justify-between rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-3xl ${
                  card.isFeatured
                    ? 'bg-[#080a12]/75 border border-white/[0.25] shadow-[0_35px_80px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:border-white/[0.45] hover:bg-[#0c0f18]/85'
                    : 'bg-[#06080e]/65 border border-white/[0.14] shadow-[0_30px_70px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] hover:border-white/[0.28] hover:bg-[#0a0c14]/75'
                }`}
              >
                {/* Subtle Inner Glass Highlight */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent pointer-events-none" />

                {/* Card Image Banner */}
                <div className="relative w-full h-[190px] sm:h-[220px] rounded-[18px] overflow-hidden mb-6 border border-white/[0.14] bg-[#050505] shadow-inner">
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-95 contrast-105"
                  />
                  {/* Subtle vignette gradient over image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06080e] via-transparent to-black/20" />
                  
                  {/* Floating Category Tag on Image */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-black/70 backdrop-blur-md text-[#F3F0E9] px-2.5 py-1 rounded-full text-[9px] font-mono tracking-widest border border-white/20 uppercase">
                      {card.category}
                    </span>
                  </div>

                  {card.isFeatured && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="bg-[#A6B09F] text-[#050505] px-2.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-widest uppercase shadow-md">
                        FEATURED
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Main: Title & Prominent Big Price */}
                <div className="relative z-10 flex flex-col mb-6">
                  <h3 className="font-condensed font-extrabold uppercase text-[22px] sm:text-[26px] tracking-tight text-[#F3F0E9] leading-tight mb-3">
                    {card.title}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-condensed font-black text-[42px] sm:text-[50px] text-[#F3F0E9] tracking-tight leading-none drop-shadow-md">
                      {card.price}
                    </span>
                    <span className="text-[12px] font-mono text-[#92918C] tracking-wider uppercase">
                      {card.period}
                    </span>
                  </div>

                  {card.priceSubtitle && (
                    <span className="text-[11px] font-mono text-[#A6B09F] font-semibold tracking-wider mt-1">
                      {card.priceSubtitle}
                    </span>
                  )}

                  <p className="font-editorial text-[13px] sm:text-[14px] text-[#A8A7A2] leading-[1.6] mt-3">
                    {card.desc}
                  </p>
                </div>

                {/* Features List */}
                <div className="relative z-10 flex flex-col gap-2.5 py-5 border-t border-white/[0.1] mb-6">
                  {card.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-3 text-[12px] sm:text-[13px] text-[#D5D4CF]">
                      <div className="w-4 h-4 rounded-full bg-white/[0.08] border border-white/20 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#A6B09F] stroke-[2.5]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button at Bottom */}
                <div className="relative z-10 pt-2 mt-auto">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectPlan) onSelectPlan();
                    }}
                    className={`w-full py-3.5 px-6 rounded-full font-editorial text-[12px] sm:text-[13px] font-bold tracking-[0.08em] uppercase transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer ${
                      card.isFeatured
                        ? 'bg-[#F3F0E9] text-[#050505] hover:bg-white shadow-2xl hover:scale-[1.02]'
                        : 'bg-white/[0.1] text-[#F3F0E9] hover:bg-white hover:text-[#050505] border border-white/[0.15]'
                    }`}
                  >
                    <span>{p.selectBtn || (isBg ? 'ИЗБЕРЕТЕ' : 'CHOOSE PLAN')}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.2]" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Bottom Spec */}
        <motion.div
          {...getStaggerVariants(6)}
          className="w-full flex items-center justify-between pt-12 sm:pt-16 mt-8 border-t border-white/[0.1] text-[10px] font-mono tracking-[0.2em] text-[#92918C] uppercase"
        >
          <span>DIRECT LABORATORY PRICES</span>
          <span>100% MANUAL FIT</span>
          <span>BLAGOEVGRAD / BG</span>
        </motion.div>
      </div>
    </section>
  );
};
