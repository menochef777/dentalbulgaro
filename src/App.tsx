/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { ApproachSection } from './components/ApproachSection';
import { ClinicalCaseSection } from './components/ClinicalCaseSection';
import { ConsultationCtaSection } from './components/ConsultationCtaSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { Language, SITE_DATA } from './translations';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('bg');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Automatically scroll to absolute top (scrollY = 0) on page load/reload
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F3F0E9] flex flex-col selection:bg-[#A6B09F] selection:text-[#050505] font-editorial">
      {/* Top Floating Editorial Navigation */}
      <Navigation
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        onContactClick={() => setIsContactModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="w-full flex flex-col flex-1">
        {/* 01 — HERO */}
        <HeroSection
          currentLang={currentLang}
          onCtaClick={() => setIsContactModalOpen(true)}
        />

        {/* 02 — 7 EXACT DENTAL SERVICES */}
        <ServicesSection
          currentLang={currentLang}
          onContactClick={() => setIsContactModalOpen(true)}
        />

        {/* 03 — 6 CORE PILLARS OF APPROACH */}
        <ApproachSection
          currentLang={currentLang}
          onContactClick={() => setIsContactModalOpen(true)}
        />

        {/* 04 — CLINICAL CASE (ENHANCED BEFORE / AFTER) */}
        <ClinicalCaseSection
          currentLang={currentLang}
          onContactClick={() => setIsContactModalOpen(true)}
        />

        {/* 05 — CONSULTATION / APPOINTMENT CTA */}
        <ConsultationCtaSection
          currentLang={currentLang}
          onContactClick={() => setIsContactModalOpen(true)}
        />

        {/* 06 — LOCATION & CONTACT */}
        <ContactSection
          currentLang={currentLang}
          onContactClick={() => setIsContactModalOpen(true)}
        />
      </main>

      {/* FINAL MINIMAL FOOTER */}
      <Footer
        currentLang={currentLang}
        onContactClick={() => setIsContactModalOpen(true)}
      />

      {/* Contact & Booking Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        currentLang={currentLang}
      />

      {/* FLOATING CALL BUTTON (Fixed bottom right) */}
      <a
        id="floating-call-btn"
        href={`tel:${SITE_DATA.phoneRaw}`}
        aria-label={`Обади се: ${SITE_DATA.phone}`}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-[#0A0A0A]/95 hover:bg-[#141414] border border-white/[0.18] hover:border-[#A6B09F] text-[#F3F0E9] shadow-[0_12px_32px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 max-w-[175px] group cursor-pointer"
      >
        <div className="w-6 h-6 rounded-full bg-[#1A1A1A] group-hover:bg-[#A6B09F] group-hover:text-[#050505] flex items-center justify-center text-[#A6B09F] transition-colors shrink-0">
          <Phone className="w-3 h-3 stroke-[2.2]" />
        </div>
        <span className="font-mono text-[11.5px] sm:text-[12px] font-bold tracking-wider text-[#F3F0E9] whitespace-nowrap">
          {SITE_DATA.phone}
        </span>
      </a>
    </div>
  );
}
