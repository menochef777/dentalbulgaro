import React from 'react';
import { X, Phone, MapPin } from 'lucide-react';
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
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.bg;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* Fast Dark Backdrop */}
      <div
        id="modal-backdrop"
        onClick={onClose}
        className="absolute inset-0 bg-black/80 transition-opacity"
      />

      {/* Modal Container */}
      <div
        id="contact-dialog"
        className="relative z-10 w-full max-w-lg bg-[#0A0A0A] border border-[#262626] rounded-[20px] p-6 sm:p-8 text-[#F3F0E9] shadow-2xl overflow-hidden transform transition-all duration-200"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#1C1C1C] pb-4">
          <div>
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#A6B09F] uppercase">
              {t.contactModal.badge}
            </span>
            <h3 className="font-condensed font-extrabold text-2xl sm:text-3xl tracking-tight text-[#F3F0E9] uppercase mt-1">
              {t.contactModal.title}
            </h3>
          </div>
          <button
            id="close-contact-modal"
            onClick={onClose}
            aria-label="Затвори"
            className="p-2 text-[#92918C] hover:text-[#F3F0E9] hover:bg-white/10 transition-colors rounded-full focus:outline-none cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-6 space-y-4">
          <p className="font-editorial text-[14px] text-[#A8A7A2] leading-relaxed">
            {t.contactModal.desc}
          </p>

          <div className="space-y-3 pt-2">
            {/* Direct Clickable Phone Button */}
            <a
              href="tel:0879108332"
              className="flex items-center justify-between p-4 rounded-xl bg-[#141414] hover:bg-[#1C1C1C] border border-white/[0.12] hover:border-[#A6B09F] transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#1F1F1F] group-hover:bg-[#A6B09F] group-hover:text-[#050505] flex items-center justify-center text-[#A6B09F] transition-colors shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono tracking-wider text-[#92918C] uppercase">
                    {t.contactModal.contactLabel || 'ТЕЛЕФОН ЗА ВРЪЗКА'}
                  </div>
                  <div className="text-[17px] font-condensed font-bold text-[#F3F0E9] tracking-wider">
                    087 910 8332
                  </div>
                </div>
              </div>

              <span className="text-[11px] font-mono tracking-widest text-[#A6B09F] uppercase bg-white/[0.05] group-hover:bg-[#A6B09F] group-hover:text-[#050505] px-3 py-1.5 rounded-full transition-all">
                ОБАДИ СЕ
              </span>
            </a>

            {/* Location block */}
            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#141414] border border-white/[0.08]">
              <div className="w-10 h-10 rounded-full bg-[#1F1F1F] flex items-center justify-center text-[#A6B09F] shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-mono tracking-wider text-[#92918C] uppercase">
                  {t.contactModal.locationLabel || 'ЛОКАЦИЯ'}
                </div>
                <div className="text-[13.5px] font-medium text-[#F3F0E9]">
                  Благоевград, кв. Ален Мак, България
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#1C1C1C] pt-4 flex items-center justify-between text-[10px] font-mono tracking-widest text-[#92918C] uppercase">
          <span>087 910 8332</span>
          <span>BLAGOEVGRAD / BG</span>
        </div>
      </div>
    </div>
  );
};
