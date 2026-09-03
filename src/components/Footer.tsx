import React from 'react';
import { Phone, MapPin } from 'lucide-react';
import { Language, TRANSLATIONS, SITE_DATA } from '../translations';

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
            <h2 className="font-condensed font-extrabold text-[38px] sm:text-[48px] tracking-tight uppercase leading-none text-[#F3F0E9]">
              {SITE_DATA.doctorName}
            </h2>
            <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-[#A6B09F] uppercase mt-2">
              СТОМАТОЛОГИЧЕН КАБИНЕТ
            </p>
            <p className="text-[9.5px] font-mono tracking-[0.16em] text-[#92918C] uppercase mt-1">
              ВАРНА, БЪЛГАРИЯ
            </p>

            <a
              href={`tel:${SITE_DATA.phoneRaw}`}
              className="inline-flex items-center gap-2 mt-4 text-[12px] font-mono text-[#F3F0E9] hover:text-[#A6B09F] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#A6B09F]" />
              <span>{SITE_DATA.phone}</span>
            </a>
          </div>

          {/* Right Navigation links */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-10">
            <button
              type="button"
              onClick={() => scrollToSection('services')}
              className="text-[11px] sm:text-[12px] font-mono tracking-[0.2em] text-[#92918C] hover:text-[#F3F0E9] uppercase transition-colors cursor-pointer"
            >
              УСЛУГИ
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('approach')}
              className="text-[11px] sm:text-[12px] font-mono tracking-[0.2em] text-[#92918C] hover:text-[#F3F0E9] uppercase transition-colors cursor-pointer"
            >
              ПОДХОД
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('case')}
              className="text-[11px] sm:text-[12px] font-mono tracking-[0.2em] text-[#92918C] hover:text-[#F3F0E9] uppercase transition-colors cursor-pointer"
            >
              РЕЗУЛТАТИ
            </button>
            <button
              type="button"
              onClick={() => {
                if (onContactClick) onContactClick();
                else scrollToSection('contact');
              }}
              className="text-[11px] sm:text-[12px] font-mono tracking-[0.2em] text-[#92918C] hover:text-[#F3F0E9] uppercase transition-colors cursor-pointer"
            >
              КОНТАКТИ
            </button>
          </nav>
        </div>

        {/* Bottom Row: Copyright */}
        <div className="w-full flex items-center justify-between border-t border-white/[0.08] pt-6 text-[10px] font-mono tracking-[0.2em] text-[#666666] uppercase">
          <span>© 2026 {SITE_DATA.doctorName} • ВАРНА</span>
          <span>ВСИЧКИ ПРАВА ЗАПАЗЕНИ</span>
        </div>

      </div>
    </footer>
  );
};
