import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, MapPin, Euro } from 'lucide-react';
import { Language, TRANSLATIONS } from '../translations';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang?: Language;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  currentLang = 'bg',
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            id="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#050505]/85 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            id="contact-dialog"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-lg bg-[#0A0A0A] border border-[#222222] rounded-[14px] p-6 sm:p-8 text-[#F3F0E9] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#1C1C1C] pb-4">
              <div>
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#A6B09F] uppercase">
                  {t.contactModal.badge}
                </span>
                <h3 className="font-condensed font-bold text-2xl sm:text-3xl tracking-tight text-[#F3F0E9] uppercase mt-1">
                  {t.contactModal.title}
                </h3>
              </div>
              <button
                id="close-contact-modal"
                onClick={onClose}
                aria-label="Затвори"
                className="p-1.5 text-[#92918C] hover:text-[#F3F0E9] transition-colors rounded-full focus:outline-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content info according to real laboratory details */}
            <div className="py-6 space-y-5">
              <p className="font-editorial text-[14px] text-[#92918C] leading-relaxed">
                {t.contactModal.desc}
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3.5 p-3.5 rounded-lg bg-[#141414] border border-[#222222]">
                  <div className="w-9 h-9 rounded-full bg-[#1C1C1C] flex items-center justify-center text-[#A6B09F] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono tracking-wider text-[#92918C] uppercase">
                      {t.contactModal.locationLabel}
                    </div>
                    <div className="text-[13.5px] font-medium text-[#F3F0E9]">
                      {t.contactModal.locationValue}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 rounded-lg bg-[#141414] border border-[#222222]">
                  <div className="w-9 h-9 rounded-full bg-[#1C1C1C] flex items-center justify-center text-[#A6B09F] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono tracking-wider text-[#92918C] uppercase">
                      {t.contactModal.contactLabel}
                    </div>
                    <div className="text-[13.5px] font-mono font-medium text-[#F3F0E9]">
                      {t.contactModal.contactValue}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-[#1C1C1C] pt-4 flex items-center justify-between text-[10px] font-mono tracking-widest text-[#92918C] uppercase">
              <span>{t.hero.tagService}</span>
              <span>BLAGOEVGRAD / BG</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
