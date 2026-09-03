import React from 'react';
import { Language, TRANSLATIONS } from '../translations';

interface FooterProps {
  currentLang?: Language;
  onContactClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang = 'bg', onContactClick }) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.bg;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#050505] text-[#F3F0E9] px-4 sm:px-8 lg:px-12 py-14 sm:py-20 border-t border-white/[0.1] select-none">
      <div className="w-full max-w-[1340px] mx-auto flex flex-col justify-between gap-12 sm:gap-16">
        
        {/* Top Row: Brand on Left, Navigation Links on Right */}
        <div className="w-full flex flex-col sm:flex-row sm:items-start justify-between gap-8 sm:gap-12">
          
          {/* Left Brand block */}
          <div className="flex flex-col">
            <h2 className="font-condensed font-extrabold text-[42px] sm:text-[54px] tracking-tight uppercase leading-none text-[#F3F0E9]">
              RADI
            </h2>
            <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-[#92918C] uppercase mt-2">
              DENTAL PROSTHETICS LABORATORY
            </p>
            <p className="text-[9.5px] font-mono tracking-[0.16em] text-[#666666] uppercase mt-1">
              BLAGOEVGRAD / BULGARIA
            </p>
          </div>

          {/* Right Navigation links */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-10">
            <button
              type="button"
              onClick={() => scrollToSection('process')}
              className="text-[11px] sm:text-[12px] font-mono tracking-[0.2em] text-[#92918C] hover:text-[#F3F0E9] uppercase transition-colors cursor-pointer"
            >
              {t.nav?.process || 'ПРОЦЕС'}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('pricing')}
              className="text-[11px] sm:text-[12px] font-mono tracking-[0.2em] text-[#92918C] hover:text-[#F3F0E9] uppercase transition-colors cursor-pointer"
            >
              {t.nav?.pricing || 'ЦЕНИ'}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('experience')}
              className="text-[11px] sm:text-[12px] font-mono tracking-[0.2em] text-[#92918C] hover:text-[#F3F0E9] uppercase transition-colors cursor-pointer"
            >
              {t.nav?.services || 'УСЛУГИ'}
            </button>
            <button
              type="button"
              onClick={() => {
                if (onContactClick) onContactClick();
                else scrollToSection('contact');
              }}
              className="text-[11px] sm:text-[12px] font-mono tracking-[0.2em] text-[#92918C] hover:text-[#F3F0E9] uppercase transition-colors cursor-pointer"
            >
              {t.nav?.contact || 'КОНТАКТ'}
            </button>
          </nav>
        </div>

        {/* Bottom Row: Copyright */}
        <div className="w-full flex items-center justify-between border-t border-white/[0.08] pt-6 text-[10px] font-mono tracking-[0.2em] text-[#666666] uppercase">
          <span>© 2026 RADI</span>
          <span>ALL RIGHTS RESERVED</span>
        </div>

      </div>
    </footer>
  );
};
