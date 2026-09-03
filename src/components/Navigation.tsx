import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Language, TRANSLATIONS } from '../translations';
import { LanguageSelector } from './LanguageSelector';

interface NavigationProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  onContactClick?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentLang,
  onSelectLang,
  onContactClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];

  const navItems = [
    { label: t.nav.process, href: '#process' },
    { label: t.nav.pricing, href: '#pricing' },
    { label: t.nav.services, href: '#experience' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <>
      <motion.header
        id="main-navigation"
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-8 lg:px-12 py-3.5 sm:py-6 flex items-center justify-between pointer-events-none mix-blend-difference"
      >
        {/* Left Side: Brand Logo & Laboratory Descriptor */}
        <a
          href="#"
          id="nav-brand-logo"
          className="pointer-events-auto flex items-center gap-2 sm:gap-2.5 group focus:outline-none"
        >
          <span className="font-condensed font-extrabold text-[20px] sm:text-[24px] tracking-tight text-[#F3F0E9] uppercase leading-none">
            RADI
          </span>
          <div className="flex flex-col text-[7.5px] sm:text-[9px] tracking-[0.14em] font-medium text-[#92918C] uppercase leading-[1.05] border-l border-[#92918C]/30 pl-2">
            <span>{t.nav.dentalLab}</span>
            <span>{t.nav.lab}</span>
          </div>
        </a>

        {/* Right Side: Desktop Minimal Nav + Language Selector */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10 pointer-events-auto">
          <nav id="desktop-nav-links" className="flex items-center gap-7 lg:gap-9">
            {navItems.map((item) => (
              <button
                key={item.label}
                id={`nav-link-${item.label.toLowerCase()}`}
                onClick={onContactClick}
                className="text-[11px] lg:text-[12px] font-medium tracking-[0.2em] text-[#F3F0E9] hover:text-[#A6B09F] transition-colors duration-200 uppercase focus:outline-none"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Language Selector on Desktop */}
          <LanguageSelector currentLang={currentLang} onSelectLang={onSelectLang} />
        </div>

        {/* Mobile Right Controls: Globe Language Selector + 2-line/dot minimalist menu trigger */}
        <div className="flex md:hidden items-center gap-2 pointer-events-auto">
          {/* Globe & Current Language Selector */}
          <LanguageSelector currentLang={currentLang} onSelectLang={onSelectLang} />

          {/* Minimalist 2-line/dot trigger */}
          <button
            id="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Отворете меню"
            className="p-2 text-[#F3F0E9] hover:text-[#A6B09F] transition-colors focus:outline-none flex flex-col justify-center items-end gap-1.5 w-8 h-8 cursor-pointer"
          >
            <span className="w-5 h-[1.5px] bg-[#F3F0E9] transition-all rounded-full" />
            <span className="w-3.5 h-[1.5px] bg-[#F3F0E9] transition-all rounded-full" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#050505] flex flex-col justify-between p-6 sm:p-8"
          >
            {/* Overlay Header */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2.5">
                <span className="font-condensed font-extrabold text-[22px] tracking-tight text-[#F3F0E9]">
                  RADI
                </span>
                <span className="text-[8px] tracking-[0.14em] text-[#92918C] border-l border-[#92918C]/30 pl-2">
                  {t.nav.dentalLab} {t.nav.lab}
                </span>
              </div>
              <button
                id="close-mobile-menu"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Затворете меню"
                className="p-2 text-[#F3F0E9] hover:text-[#A6B09F] focus:outline-none"
              >
                <X className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>

            {/* Mobile Nav List */}
            <div className="flex flex-col gap-5 my-auto">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * idx, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onContactClick) onContactClick();
                  }}
                  className="text-left font-condensed font-extrabold text-4xl sm:text-5xl tracking-tight text-[#F3F0E9] hover:text-[#A6B09F] transition-colors uppercase"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Mobile Footer Info */}
            <div className="border-t border-[#1a1a1a] pt-5 flex justify-between items-center text-[10px] font-mono tracking-[0.18em] text-[#92918C] uppercase">
              <span>BLAGOEVGRAD / BG</span>
              <span>01 / 02</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
