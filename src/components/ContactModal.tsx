import React from 'react';
import { X, Phone, MapPin } from 'lucide-react';
import { Language, SITE_DATA } from '../translations';

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
        className="relative z-10 w-full max-w-lg bg-[#0A0A0A] border border-[#262626] rounded-[24px] p-6 sm:p-8 text-[#F3F0E9] shadow-2xl overflow-hidden transform transition-all duration-200"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#1C1C1C] pb-4">
          <div>
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#A6B09F] uppercase">
              Д-Р ДАРИА • ВАРНА
            </span>
            <h3 className="font-condensed font-extrabold text-2xl sm:text-3xl tracking-tight text-[#F3F0E9] uppercase mt-1">
              ЗАПИШЕТЕ ЧАС
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
            {SITE_DATA.description}
          </p>

          <div className="space-y-3 pt-2">
            {/* Direct Clickable Phone Button */}
            <a
              href={`tel:${SITE_DATA.phoneRaw}`}
              className="flex items-center justify-between p-4 rounded-xl bg-[#141414] hover:bg-[#1C1C1C] border border-white/[0.12] hover:border-[#A6B09F] transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#1F1F1F] group-hover:bg-[#A6B09F] group-hover:text-[#050505] flex items-center justify-center text-[#A6B09F] transition-colors shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono tracking-wider text-[#92918C] uppercase">
                    ТЕЛЕФОН ЗА ВРЪЗКА
                  </div>
                  <div className="text-[18px] font-condensed font-bold text-[#F3F0E9] tracking-wider">
                    {SITE_DATA.phone}
                  </div>
                </div>
              </div>

              <span className="text-[11px] font-mono font-bold tracking-widest text-[#050505] bg-[#F3F0E9] group-hover:bg-white px-3.5 py-1.5 rounded-full transition-all shadow-md">
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
                  ЛОКАЦИЯ
                </div>
                <div className="text-[14px] font-medium text-[#F3F0E9]">
                  {SITE_DATA.location}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#1C1C1C] pt-4 flex items-center justify-between text-[10px] font-mono tracking-widest text-[#92918C] uppercase">
          <span>{SITE_DATA.phone}</span>
          <span>ВАРНА / БЪЛГАРИЯ</span>
        </div>
      </div>
    </div>
  );
};
