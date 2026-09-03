import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone } from 'lucide-react';
import { Language, TRANSLATIONS, SITE_DATA } from '../translations';
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
    { label: t.nav.services, href: '#services' },
    { label: t.nav.approach, href: '#approach' },
    { label: t.nav.case, href: '#case' },
    { label: t.nav.contact, href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        id="main-navigation"
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-8 lg:px-12 py-3.5 sm:py-5 flex items-center justify-between pointer-events-none mix-blend-difference"
      >
        {/* Left Side: Brand Logo & Practice Descriptor */}
        <a
          href="#"
          id="nav-brand-logo"
          className="pointer-events-auto flex items-center gap-2.5 sm:gap-3 group focus:outline-none"
        >
          <span className="font-condensed font-extrabold text-[20px] sm:text-[24px] tracking-tight text-[#F3F0E9] uppercase leading-none">
            {SITE_DATA.doctorName}
          </span>
          <div className="flex flex-col text-[7.5px] sm:text-[8.5px] tracking-[0.16em] font-medium text-[#92918C] uppercase leading-[1.1] border-l border-[#92918C]/30 pl-2">
            <span>ЗЪБОЛЕКАР</span>
            <span>ВАРНА</span>
          </div>
        </a>

        {/* Right Side: Desktop Minimal Nav + Language Selector + Phone CTA */}
        <div className="hidden md:flex items-center gap-7 lg:gap-9 pointer-events-auto">
          <nav id="desktop-nav-links" className="flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                id={`nav-link-${item.label.toLowerCase()}`}
                onClick={() => handleNavClick(item.href)}
                className="text-[11px] lg:text-[12px] font-medium tracking-[0.2em] text-[#F3F0E9] hover:text-[#A6B09F] transition-colors duration-200 uppercase focus:outline-none cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <a
            href={`tel:${SITE_DATA.phoneRaw}`}
            className="inline-flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#050505] bg-[#F3F0E9] hover:bg-white px-3.5 py-1.5 rounded-full font-bold transition-all shadow-md cursor-pointer"
          >
            <Phone className="w-3 h-3 stroke-[2.2]" />
            <span>{SITE_DATA.phone}</span>
          </a>

          {/* Language Selector on Desktop */}
          <LanguageSelector currentLang={currentLang} onSelectLang={onSelectLang} />
        </div>

        {/* Mobile Right Controls */}
        <div className="flex md:hidden items-center gap-2 pointer-events-auto">
          <LanguageSelector currentLang={currentLang} onSelectLang={onSelectLang} />

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
                  {SITE_DATA.doctorName}
                </span>
                <span className="text-[8px] tracking-[0.14em] text-[#92918C] border-l border-[#92918C]/30 pl-2 uppercase">
                  ЗЪБОЛЕКАР ВАРНА
                </span>
              </div>
              <button
                id="close-mobile-menu"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Затворете меню"
                className="p-2 text-[#F3F0E9] hover:text-[#A6B09F] focus:outline-none cursor-pointer"
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
                  onClick={() => handleNavClick(item.href)}
                  className="text-left font-condensed font-extrabold text-3xl sm:text-4xl tracking-tight text-[#F3F0E9] hover:text-[#A6B09F] transition-colors uppercase cursor-pointer"
                >
                  {item.label}
                </motion.button>
              ))}

              <div className="pt-4">
                <a
                  href={`tel:${SITE_DATA.phoneRaw}`}
                  className="inline-flex items-center gap-3 bg-[#F3F0E9] text-[#050505] px-6 py-3 rounded-full font-mono text-sm font-bold tracking-wider uppercase"
                >
                  <Phone className="w-4 h-4 stroke-[2.2]" />
                  <span>{SITE_DATA.phone}</span>
                </a>
              </div>
            </div>

            {/* Mobile Footer Info */}
            <div className="border-t border-[#1a1a1a] pt-5 flex justify-between items-center text-[10px] font-mono tracking-[0.18em] text-[#92918C] uppercase">
              <span>{SITE_DATA.location}</span>
              <span className="text-[#A6B09F]">{SITE_DATA.phone}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
