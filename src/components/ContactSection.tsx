import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { Language } from '../translations';
import { useStaggeredReveal, EXPO_OUT } from '../hooks/useStaggeredReveal';

interface ContactSectionProps {
  currentLang?: Language;
  onContactClick?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  currentLang = 'bg',
  onContactClick,
}) => {
  const isBg = currentLang === 'bg';

  const { ref: sectionRef, isInView, getStaggerVariants } = useStaggeredReveal(0.12);

  // Real Google Maps URL for Alen Mak, Blagoevgrad, Bulgaria
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=%D0%90%D0%BB%D0%B5%D0%BD+%D0%BC%D0%B0%D0%BA,+%D0%91%D0%BB%D0%B0%D0%B3%D0%BE%D0%B5%D0%B2%D0%B3%D1%80%D0%B0%D0%B4,+%D0%91%D1%8A%D0%BB%D0%B3%D0%B0%D1%80%D0%B8%D1%8F';
  const googleMapsEmbedUrl = 'https://maps.google.com/maps?q=%D0%90%D0%BB%D0%B5%D0%BD%20%D0%BC%D0%B0%D0%BA,%20%D0%91%D0%BB%D0%B0%D0%B3%D0%BE%D0%B5%D0%B2%D0%B3%D1%80%D0%B0%D0%B4,%20%D0%91%D1%8A%D0%BB%D0%B3%D0%B0%D1%80%D0%B8%D1%8F&t=&z=14&ie=UTF8&iwloc=&output=embed';

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
            <span className="font-semibold text-[#A6B09F]">RADI / 05</span>
            <span className="text-white/30">•</span>
            <span className="text-[#F3F0E9]/80">CONTACT & LOCATION</span>
          </motion.div>

          {/* Enormous Headline */}
          <div className="overflow-hidden mb-8 sm:mb-12">
            <motion.h2
              {...getStaggerVariants(1)}
              className="font-condensed font-extrabold uppercase text-[#F3F0E9] tracking-[-0.045em] leading-[0.85] text-[clamp(52px,10vw,120px)] select-none drop-shadow-2xl"
            >
              {isBg ? (
                <>
                  НЕКА
                  <br />
                  <span className="text-[#F3F0E9]/90">СЕ СВЪРЖЕМ.</span>
                </>
              ) : (
                <>
                  LET’S
                  <br />
                  <span className="text-[#F3F0E9]/90">CONNECT.</span>
                </>
              )}
            </motion.h2>
          </div>

          {/* Location text block */}
          <motion.div
            {...getStaggerVariants(2)}
            className="flex flex-col text-[14px] sm:text-[16px] font-mono tracking-[0.16em] text-[#A8A7A2] uppercase mb-8 sm:mb-10 leading-relaxed border-l-2 border-[#A6B09F] pl-4"
          >
            <span className="text-[#F3F0E9] font-bold">БЛАГОЕВГРАД</span>
            <span>АЛЕН МАК</span>
            <span>БЪЛГАРИЯ</span>
          </motion.div>

          {/* Large CTA Button */}
          <motion.div {...getStaggerVariants(3)} className="flex items-center">
            <button
              type="button"
              onClick={onContactClick}
              className="group relative inline-flex items-center justify-between gap-4 sm:gap-6 bg-[#F3F0E9] text-[#050505] rounded-full pl-6 sm:pl-8 pr-2.5 sm:pr-3 h-[54px] sm:h-[62px] min-w-[220px] sm:min-w-[260px] shadow-2xl hover:bg-white transition-all duration-300 cursor-pointer focus:outline-none hover:scale-[1.02]"
            >
              <span className="font-editorial text-[13px] sm:text-[15px] font-bold tracking-[0.06em] uppercase whitespace-nowrap">
                {isBg ? 'СВЪРЖЕТЕ СЕ С НАС' : 'GET IN TOUCH'}
              </span>
              <span className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#050505] text-[#F3F0E9] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 shrink-0 shadow-md">
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.4]" />
              </span>
            </button>
          </motion.div>

        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Real Google Maps Panel (Styled Monochrome / Dark)          */}
        {/* ========================================================================= */}
        <motion.div
          {...getStaggerVariants(4)}
          className="lg:col-span-5 w-full flex flex-col"
        >
          {/* Label Above Map */}
          <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-[#92918C] uppercase mb-3">
            <span className="flex items-center gap-1.5 text-[#A6B09F]">
              <MapPin className="w-3.5 h-3.5 text-[#A6B09F]" />
              <span>LOCATION</span>
            </span>
            <span>BLAGOEVGRAD / BG</span>
          </div>

          {/* Maps Framed Container */}
          <div className="relative w-full h-[290px] sm:h-[330px] lg:h-[400px] rounded-[24px] border border-white/[0.18] bg-[#080a12] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-xl">
            
            {/* Real Google Maps Embed with dark/grayscale filter */}
            <iframe
              title="Google Maps Location - Alen Mak, Blagoevgrad"
              src={googleMapsEmbedUrl}
              className="w-full h-full border-0 filter grayscale invert contrast-[0.9] opacity-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Corner Registration Marks */}
            <div className="absolute top-3 left-3 text-[10px] font-mono text-[#666666] select-none pointer-events-none">┌</div>
            <div className="absolute top-3 right-3 text-[10px] font-mono text-[#666666] select-none pointer-events-none">┐</div>
            <div className="absolute bottom-3 left-3 text-[10px] font-mono text-[#666666] select-none pointer-events-none">└</div>
            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#666666] select-none pointer-events-none">┘</div>

            {/* Floating Open in Google Maps Link */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 bg-[#050505]/90 hover:bg-black text-[#F3F0E9] hover:text-[#A6B09F] text-[10px] font-mono tracking-wider uppercase px-3.5 py-2 rounded-full border border-white/[0.2] backdrop-blur-md transition-all shadow-xl group"
            >
              <span>{isBg ? 'ОТВОРИ В GOOGLE MAPS' : 'OPEN IN GOOGLE MAPS'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 stroke-[2.2]" />
            </a>
          </div>

          {/* Sub-label below map */}
          <div className="flex items-center justify-between text-[9.5px] font-mono tracking-[0.18em] text-[#92918C] uppercase pt-3">
            <span>АЛЕН МАК, БЛАГОЕВГРАД</span>
            <span>BG / EU</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
