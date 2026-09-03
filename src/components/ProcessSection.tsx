import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Layers, Rotate3d } from 'lucide-react';
import { Language, TRANSLATIONS } from '../translations';
import { useStaggeredReveal, EXPO_OUT } from '../hooks/useStaggeredReveal';

interface ProcessSectionProps {
  currentLang?: Language;
  onContactClick?: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({
  currentLang = 'bg',
  onContactClick,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.bg;
  const p = t.processSection;
  const isBg = currentLang === 'bg';

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const bgY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  const { ref: revealRef, isInView, getStaggerVariants } = useStaggeredReveal(0.1);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative w-full min-h-screen bg-[#050505] text-[#F3F0E9] px-4 sm:px-8 lg:px-12 py-24 sm:py-32 lg:py-40 overflow-hidden flex flex-col justify-center"
    >
      {/* 1. IMMERSIVE RICH 3D ART ENVIRONMENT (MINDLOOP DIRECTION) */}
      <motion.div
        style={{ scale: bgScale, y: bgY }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
      >
        <img
          src="/images/mindloop_process_bg.jpg"
          alt="Immersive 3D Process Scenery"
          className="w-full h-full object-cover object-center opacity-65 filter brightness-105 contrast-115"
        />
        {/* Soft atmospheric gradient transitions */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/45 to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.12)_0%,transparent_75%)]" />
        <div className="absolute inset-0 bg-subtle-grain opacity-20" />
      </motion.div>

      {/* 2. OVERSIZED BACKGROUND ART TYPOGRAPHY */}
      <div className="absolute -top-6 sm:top-2 right-0 left-0 flex justify-end pointer-events-none select-none z-0 overflow-hidden pr-4 sm:pr-12">
        <span className="font-condensed font-black uppercase text-[clamp(80px,18vw,250px)] tracking-[-0.05em] leading-none text-white/[0.06] whitespace-nowrap blur-[0.4px]">
          LABORATORY
        </span>
      </div>

      <div
        ref={revealRef}
        className="relative z-10 w-full max-w-[1340px] mx-auto flex flex-col"
      >
        {/* ========================================================================= */}
        {/* SECTION HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/[0.12] pb-8 mb-12 sm:mb-16 gap-6">
          <div>
            <motion.div
              {...getStaggerVariants(0)}
              className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.24em] text-[#A6B09F] uppercase mb-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 w-fit"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#A6B09F] animate-pulse" />
              <span className="font-semibold text-[#A6B09F]">RADI / 02</span>
              <span className="text-white/30">•</span>
              <span className="text-[#F3F0E9]/80">PROCESS & METHOD</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h2
                {...getStaggerVariants(1)}
                className="font-condensed font-extrabold uppercase text-[#F3F0E9] tracking-[-0.04em] leading-[0.88] text-[clamp(44px,7.5vw,84px)] drop-shadow-2xl"
              >
                {p.heading}
              </motion.h2>
            </div>
          </div>

          <motion.p
            {...getStaggerVariants(2)}
            className="font-editorial text-[14px] sm:text-[16px] text-[#A8A7A2] font-medium max-w-[320px] uppercase tracking-wide sm:text-right"
          >
            {p.subheading}
          </motion.p>
        </div>

        {/* ========================================================================= */}
        {/* MAIN PROCESS PRESENTATION: Rows + Integrated Process Stage                */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* LEFT/MAIN COLUMN: Editorial Numbered Process Rows (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-white/[0.12] border-t border-white/[0.12]">
            {p.steps.map((step, idx) => (
              <motion.div
                key={step.num}
                {...getStaggerVariants(idx + 3)}
                onMouseEnter={() => setActiveStep(idx)}
                onClick={() => setActiveStep(idx)}
                className={`group relative flex items-center justify-between py-6 sm:py-8 transition-all duration-300 cursor-pointer ${
                  activeStep === idx
                    ? 'bg-[#080a12]/80 border border-white/[0.18] px-4 -mx-4 rounded-2xl backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.6)]'
                    : 'hover:bg-white/[0.03] border border-transparent'
                }`}
              >
                <div className="flex items-start sm:items-center gap-6 sm:gap-10">
                  {/* Large Step Number */}
                  <span
                    className={`font-condensed font-extrabold text-[36px] sm:text-[48px] tracking-tight transition-all duration-300 leading-none ${
                      activeStep === idx
                        ? 'text-[#F3F0E9] translate-x-1 sm:translate-x-2'
                        : 'text-white/30 group-hover:text-white/60'
                    }`}
                  >
                    {step.num}
                  </span>

                  {/* Step Title + Description */}
                  <div className="flex flex-col">
                    <h3
                      className={`font-condensed font-extrabold uppercase text-[24px] sm:text-[32px] tracking-tight transition-transform duration-300 leading-tight ${
                        activeStep === idx
                          ? 'text-[#F3F0E9] translate-x-1 drop-shadow'
                          : 'text-[#F3F0E9]/80 group-hover:text-[#F3F0E9] group-hover:translate-x-1'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="font-editorial text-[13px] sm:text-[15px] text-[#A8A7A2] leading-relaxed mt-1">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Right Arrow Indicator */}
                <div className="shrink-0 pl-4">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeStep === idx
                        ? 'bg-[#F3F0E9] text-[#050505] translate-x-1 shadow-md'
                        : 'bg-white/[0.05] text-white/40 group-hover:bg-white/10 group-hover:text-white'
                    }`}
                  >
                    <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT COLUMN: Integrated Process Visual Frame with Video / Stage Feedback */}
          <div className="lg:col-span-5 w-full relative">
            <motion.div
              {...getStaggerVariants(7)}
              className="sticky top-28 relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] rounded-[24px] bg-[#080a12]/85 text-[#F3F0E9] p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.18)] border border-white/[0.18] backdrop-blur-3xl"
            >
              {/* Dynamic stage background: Laboratory imagery for steps 1-3, 360 video for step 4 */}
              {activeStep === 3 ? (
                <video
                  src="/videos/dental169.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-75 pointer-events-none"
                />
              ) : (
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={
                      activeStep === 0
                        ? '/images/pricing_technician_repair.jpg'
                        : activeStep === 1
                        ? '/images/dental_masterpiece_craft.jpg'
                        : '/images/pricing_full_denture.jpg'
                    }
                    alt="Laboratory craftsmanship stage"
                    className="w-full h-full object-cover object-center opacity-65 filter brightness-95 contrast-105 pointer-events-none transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080a12] via-[#080a12]/50 to-black/30" />
                </div>
              )}

              {/* Internal technical texture and subtle backlight */}
              <div className="absolute inset-0 bg-subtle-grain opacity-30 pointer-events-none z-10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.1)_0%,transparent_75%)] pointer-events-none z-10" />

              {/* Corner Registration Marks */}
              <div className="absolute top-3 left-3 text-[10px] font-mono text-[#666666] select-none z-20">┌</div>
              <div className="absolute top-3 right-3 text-[10px] font-mono text-[#666666] select-none z-20">┐</div>
              <div className="absolute bottom-3 left-3 text-[10px] font-mono text-[#666666] select-none z-20">└</div>
              <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#666666] select-none z-20">┘</div>

              {/* Frame Header */}
              <div className="relative z-20 flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-[#92918C] uppercase">
                <span className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#A6B09F]" />
                  <span>{p.mediaLabel}</span>
                </span>
                <span className="text-[#A6B09F] font-semibold flex items-center gap-1.5">
                  {activeStep === 3 && <Rotate3d className="w-3 h-3 text-[#A6B09F] animate-spin" />}
                  <span>STAGE 0{activeStep + 1} / 04</span>
                </span>
              </div>

              {/* Dynamic Center Visual Representation of Current Active Step */}
              <div className="relative z-20 my-auto flex flex-col items-center justify-center text-center py-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-white/[0.25] bg-black/75 backdrop-blur-md flex items-center justify-center relative mb-4 shadow-2xl">
                  <div className="absolute inset-2 rounded-full border border-dashed border-white/[0.25] animate-[spin_30s_linear_infinite]" />
                  <span className="font-condensed font-black text-[28px] sm:text-[34px] text-[#F3F0E9]">
                    0{activeStep + 1}
                  </span>
                </div>

                <div className="font-condensed font-extrabold uppercase text-[20px] sm:text-[24px] tracking-tight text-[#F3F0E9] mb-1 drop-shadow-lg">
                  {p.steps[activeStep].title}
                </div>
                <div className="font-editorial text-[13px] sm:text-[14px] text-[#D5D4CF] max-w-[280px] drop-shadow leading-relaxed">
                  {p.steps[activeStep].desc}
                </div>
              </div>

              {/* Frame Footer Spec */}
              <div className="relative z-20 flex items-center justify-between text-[9.5px] font-mono tracking-[0.18em] text-[#92918C] uppercase pt-3 border-t border-white/[0.12]">
                <span>{activeStep === 3 ? '360° VIRTUAL LOOP' : p.mediaStage}</span>
                <span className="text-[#A6B09F]">100% MANUAL FIT</span>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
