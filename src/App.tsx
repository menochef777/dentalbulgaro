/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ProcessSection } from './components/ProcessSection';
import { PricingSection } from './components/PricingSection';
import { InteractiveExperienceSection } from './components/InteractiveExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { Language } from './translations';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('bg');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

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
        {/* SECTION 01 — HERO (100% UNCHANGED) */}
        <HeroSection
          currentLang={currentLang}
          onCtaClick={() => setIsContactModalOpen(true)}
        />

        {/* SECTION 02 — PROCESS PRESENTATION */}
        <ProcessSection
          currentLang={currentLang}
          onContactClick={() => setIsContactModalOpen(true)}
        />

        {/* SECTION 03 — PRICING (3 LIQUID-GLASS CARDS + OVERSIZED TYPOGRAPHY + 3D DENTAL ART) */}
        <PricingSection
          currentLang={currentLang}
          onSelectPlan={() => setIsContactModalOpen(true)}
        />

        {/* SECTION 04 — INTERACTIVE RADI EXPERIENCE */}
        <InteractiveExperienceSection
          currentLang={currentLang}
          onContactClick={() => setIsContactModalOpen(true)}
        />

        {/* SECTION 05 — CONTACT */}
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

      {/* Minimal Contact Modal Dialog */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        currentLang={currentLang}
      />
    </div>
  );
}
