import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { LANGUAGES, Language } from '../translations';

interface LanguageSelectorProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLang,
  onSelectLang,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeOption = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative pointer-events-auto">
      {/* Trigger Button */}
      <button
        id="language-selector-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Избор на език / Select Language"
        aria-expanded={isOpen}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#121212]/80 hover:bg-[#1C1C1C] border border-[#262626] text-[#F3F0E9] hover:text-[#A6B09F] transition-all duration-200 focus:outline-none cursor-pointer"
      >
        <Globe className="w-3.5 h-3.5 text-[#A6B09F] stroke-[1.8]" />
        <span className="font-mono text-[11px] font-bold tracking-wider uppercase">
          {activeOption.label}
        </span>
        <span className="text-[12px] leading-none">{activeOption.flag}</span>
        <ChevronDown
          className={`w-3 h-3 text-[#92918C] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#F3F0E9]' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="language-dropdown-menu"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 mt-2 w-44 bg-[#0A0A0A] border border-[#262626] rounded-xl shadow-2xl p-1.5 z-50 overflow-hidden"
          >
            <div className="px-2.5 py-1 text-[9px] font-mono tracking-[0.16em] text-[#92918C] uppercase border-b border-[#1A1A1A] mb-1">
              LANGUAGE / ЕЗИК
            </div>

            <div className="flex flex-col gap-0.5">
              {LANGUAGES.map((lang) => {
                const isSelected = lang.code === currentLang;
                return (
                  <button
                    key={lang.code}
                    id={`lang-option-${lang.code}`}
                    onClick={() => {
                      onSelectLang(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors duration-150 text-[12px] font-editorial ${
                      isSelected
                        ? 'bg-[#1A1A1A] text-[#F3F0E9] font-medium'
                        : 'text-[#92918C] hover:bg-[#141414] hover:text-[#F3F0E9]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[14px]">{lang.flag}</span>
                      <span className="font-mono text-[11px] font-semibold text-[#F3F0E9]/90">
                        {lang.label}
                      </span>
                      <span className="text-[11px] text-[#888888]">{lang.name}</span>
                    </div>

                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-[#A6B09F] stroke-[2.5]" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
