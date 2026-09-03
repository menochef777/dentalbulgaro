import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

// ==========================================
// BUSINESS DATA CONSTANTS (Д-р Дариа — Варна)
// ==========================================
const DOCTOR_NAME = 'Дариа';
const PROFESSION = 'Зъболекар';
const LOCATION = 'Варна, България';
const PHONE_DISPLAY = '088 497 0607';
const PHONE_RAW = '0884970607';

// ==========================================
// IMAGE URLS (High-end Dental Practice Visuals)
// ==========================================
const HERO_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_113640_ccf3cf97-d447-425b-a134-d7b09fc743fc.png&w=1280&q=85';

const SECTION2_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114219_414dfe80-f15c-4e25-bf52-b13721f4bd88.png&w=1280&q=85';

const SECTION3_IMG1 = '/images/clinical_before_after.webp';

const SECTION3_IMG2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115237_fc519057-6e87-4abf-999a-9610b8b085b4.png&w=1280&q=85';

const SECTION3_BG =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114355_752ba9e6-0942-4abb-9047-5d9bb16632e9.png&w=1280&q=85';

// ==========================================
// CONTENT CONSTANTS (100% Verified Information)
// ==========================================
const featureBars = ['Внимателен подход', 'Прецизно лечение', 'Спокойна обстановка'];

const services = [
  { name: 'Профилактични\nпрегледи', num: '01', active: true },
  { name: 'Лечение на\nкариес', num: '02', active: false },
  { name: 'Естетични\nвъзстановявания', num: '03', active: false },
  { name: 'Детска дентална\nмедицина', num: '04', active: false },
];

const additionalServices = [
  'Лечение на частично и тотално обеззъбяване',
  'Почистване на зъбен камък',
  'Грижа за бъдещи мами',
];

// ==========================================
// CUSTOM HOOKS
// ==========================================

// 1. useIsMobile
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isMobile;
}

// 2. useImageWidth
function useImageWidth(bgImage: string, sectionHeight: number): number {
  const [imageWidth, setImageWidth] = useState<number>(0);

  useEffect(() => {
    if (!bgImage || sectionHeight <= 0) return;

    const img = new Image();
    img.src = bgImage;
    img.onload = () => {
      if (img.naturalHeight > 0) {
        const renderWidth = img.naturalWidth * (sectionHeight / img.naturalHeight);
        setImageWidth(renderWidth);
      }
    };
  }, [bgImage, sectionHeight]);

  return imageWidth;
}

// 3. useMaskPositions
interface CardPosition {
  x: number;
  y: number;
  sw: number;
  sh: number;
}

function useMaskPositions(
  sectionRef: React.RefObject<HTMLElement | null>,
  cardRefs: React.RefObject<(HTMLElement | null)[]>
): { positions: CardPosition[]; sectionHeight: number } {
  const [positions, setPositions] = useState<CardPosition[]>([]);
  const [sectionHeight, setSectionHeight] = useState<number>(0);

  const calculatePositions = () => {
    const section = sectionRef.current;
    if (!section) return;

    const secRect = section.getBoundingClientRect();
    const sw = secRect.width;
    const sh = secRect.height;
    setSectionHeight(sh);

    const cards = cardRefs.current || [];
    const newPositions: CardPosition[] = cards.map((card) => {
      if (!card) return { x: 0, y: 0, sw, sh };
      const cardRect = card.getBoundingClientRect();
      return {
        x: cardRect.left - secRect.left,
        y: cardRect.top - secRect.top,
        sw,
        sh,
      };
    });

    setPositions(newPositions);
  };

  useLayoutEffect(() => {
    calculatePositions();

    const section = sectionRef.current;
    if (!section) return;

    const ro = new ResizeObserver(() => {
      calculatePositions();
    });

    ro.observe(section);
    window.addEventListener('resize', calculatePositions);
    window.addEventListener('scroll', calculatePositions);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', calculatePositions);
      window.removeEventListener('scroll', calculatePositions);
    };
  }, [sectionRef, cardRefs]);

  return { positions, sectionHeight };
}

// 4. useStaggeredReveal
function useStaggeredReveal(count: number, threshold = 0.15) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const getAnimStyle = (index: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms`,
  });

  return { containerRef, getAnimStyle };
}

// ==========================================
// MASKED CARD COMPONENT
// ==========================================
interface MaskedCardProps {
  bgImage: string;
  position?: CardPosition;
  imageWidth: number;
  focalX: number;
  className?: string;
  children?: React.ReactNode;
  cardRef?: (el: HTMLElement | null) => void;
  style?: React.CSSProperties;
}

const MaskedCard: React.FC<MaskedCardProps> = ({
  bgImage,
  position,
  imageWidth,
  focalX,
  className = '',
  children,
  cardRef,
  style = {},
}) => {
  let maskStyle: React.CSSProperties = {};

  if (position && position.sh > 0) {
    const overflow = imageWidth > position.sw ? imageWidth - position.sw : 0;
    const focalOffset = overflow * focalX;

    maskStyle = {
      backgroundImage: `url("${bgImage}")`,
      backgroundSize: `auto ${position.sh}px`,
      backgroundPosition: `-${position.x + focalOffset}px -${position.y}px`,
      backgroundRepeat: 'no-repeat',
    };
  }

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        ...maskStyle,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ==========================================
// SPLASH SCREEN COMPONENT
// ==========================================
interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const totalDuration = 2000;
    const stepTime = 20;
    const totalSteps = totalDuration / stepTime;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setCount(Math.min(100, Math.floor((currentStep / totalSteps) * 100)));

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => {
            onComplete();
          }, 700);
        }, 200);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-white flex items-end justify-start transition-opacity duration-700 pointer-events-none ${
        exiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-7xl md:text-9xl font-bold tabular-nums p-6 md:p-10 leading-none text-black select-none">
        {count}
      </div>
    </div>
  );
};

// ==========================================
// NAVBAR COMPONENT
// ==========================================
const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navLinks = [
    { label: 'Начало', href: '#hero' },
    { label: 'Услуги', href: '#services' },
    { label: 'Подход', href: '#treatment' },
    { label: 'Контакти', href: '#treatment' },
  ];

  const handleScroll = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 py-2 md:py-3 bg-white/80 backdrop-blur-md">
        {/* Logo Left */}
        <div className="flex flex-col select-none">
          <div className="text-xl md:text-2xl font-extrabold uppercase tracking-tight leading-none text-black">
            {DOCTOR_NAME}
          </div>
          <div className="text-xl md:text-2xl font-extrabold uppercase tracking-tight leading-none text-black -mt-1.5 md:-mt-2">
            {PROFESSION}
          </div>
          <span className="text-[8px] md:text-[9px] font-medium leading-none mt-1.5 md:mt-2 text-neutral-600 uppercase tracking-wider">
            {LOCATION}
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href={`tel:${PHONE_RAW}`}
            className="text-sm font-semibold text-black hover:text-neutral-600 transition-colors"
          >
            Запишете час
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="px-6 py-3 bg-white rounded-full border border-black text-sm font-semibold text-black hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
          >
            Menu
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            className="w-10 h-10 flex items-center justify-center relative cursor-pointer"
          >
            <span
              className={`absolute h-0.5 w-6 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                menuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
              }`}
            />
            <span
              className={`absolute h-0.5 w-6 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                menuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
              }`}
            />
            <span
              className={`absolute h-0.5 w-6 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                menuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Slide-out Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col justify-center h-full px-8 gap-1">
            {navLinks.map((item, i) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleScroll(item.href)}
                className={`text-left text-3xl font-bold text-black hover:text-neutral-500 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] cursor-pointer ${
                  menuOpen
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-8'
                }`}
                style={{
                  transitionDelay: menuOpen ? `${100 + i * 60}ms` : '0ms',
                }}
              >
                {item.label}
              </button>
            ))}

            <div
              className={`mt-8 pt-8 border-t border-neutral-200 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                menuOpen
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-8'
              }`}
              style={{
                transitionDelay: menuOpen ? '450ms' : '0ms',
              }}
            >
              <div className="text-sm font-semibold text-black mb-4">
                {LOCATION} • {PHONE_DISPLAY}
              </div>
              <a
                href={`tel:${PHONE_RAW}`}
                onClick={() => setMenuOpen(false)}
                className="block w-full px-6 py-4 bg-black rounded-full text-white text-sm font-semibold hover:bg-neutral-800 transition-colors duration-200 text-center"
              >
                Запишете час
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ==========================================
// MAIN APPLICATION COMPONENT
// ==========================================
export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const isMobile = useIsMobile();

  // Section 1 Refs & Hooks
  const section1Ref = useRef<HTMLElement | null>(null);
  const s1CardRefs = useRef<(HTMLElement | null)[]>([]);
  const s1Reveal = useStaggeredReveal(4);
  const s1Mask = useMaskPositions(section1Ref, s1CardRefs);
  const s1ImageWidth = useImageWidth(HERO_IMAGE, s1Mask.sectionHeight);
  const s1FocalX = isMobile ? 0.7 : 0.8;

  // Section 2 Refs & Hooks
  const section2Ref = useRef<HTMLElement | null>(null);
  const s2CardRefs = useRef<(HTMLElement | null)[]>([]);
  const s2Reveal = useStaggeredReveal(4);
  const s2Mask = useMaskPositions(section2Ref, s2CardRefs);
  const s2ImageWidth = useImageWidth(SECTION2_IMAGE, s2Mask.sectionHeight);
  const s2FocalX = isMobile ? 0.65 : 0.8;

  // Section 3 Reveal Hook
  const s3Reveal = useStaggeredReveal(4);

  return (
    <div className="bg-white selection:bg-black selection:text-white">
      {/* 1. SPLASH SCREEN */}
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      {/* 2. FIXED NAVBAR */}
      <Navbar />

      {/* ========================================================================= */}
      {/* SECTION 1 - HERO                                                          */}
      {/* ========================================================================= */}
      <section
        ref={(el) => {
          section1Ref.current = el;
          s1Reveal.containerRef.current = el;
        }}
        id="hero"
        className="h-screen w-full overflow-hidden flex flex-col pt-24 md:pt-24 px-3 md:px-5 pb-1.5 md:pb-2 gap-1.5 md:gap-2"
      >
        {/* 3 Feature Bars */}
        {featureBars.map((text, i) => (
          <MaskedCard
            key={text}
            bgImage={HERO_IMAGE}
            position={s1Mask.positions[i]}
            imageWidth={s1ImageWidth}
            focalX={s1FocalX}
            cardRef={(el) => {
              s1CardRefs.current[i] = el;
            }}
            style={s1Reveal.getAnimStyle(i)}
            className="w-full h-14 md:h-20 shrink-0 rounded-xl md:rounded-2xl overflow-hidden relative shadow-sm"
          >
            <div className="flex items-center justify-center h-full relative z-10 px-4">
              <span className="text-black text-lg md:text-3xl font-bold text-center leading-none">
                {text}
              </span>
            </div>
          </MaskedCard>
        ))}

        {/* Main Hero Card (Card 4) */}
        <MaskedCard
          bgImage={HERO_IMAGE}
          position={s1Mask.positions[3]}
          imageWidth={s1ImageWidth}
          focalX={s1FocalX}
          cardRef={(el) => {
            s1CardRefs.current[3] = el;
          }}
          style={s1Reveal.getAnimStyle(3)}
          className="w-full flex-1 min-h-0 rounded-xl md:rounded-2xl overflow-hidden relative shadow-sm"
        >
          {/* Top-left text */}
          <div className="absolute top-4 left-4 md:top-7 md:left-7 text-black text-xs md:text-sm font-semibold leading-4 md:leading-5 max-w-[220px] md:max-w-[320px] z-10">
            Съвременна дентална грижа
            <br />
            с внимание към всеки пациент.
          </div>

          {/* Bottom-left block */}
          <div className="absolute bottom-5 left-3 md:bottom-8 md:left-4 z-10">
            <span className="block text-black text-xs md:text-sm font-semibold mb-1 md:mb-2">
              Зъболекар във Варна
            </span>
            <h1 className="text-black text-[clamp(3rem,11vw,11rem)] font-bold leading-[0.79] tracking-tight">
              Дентална
              <br />
              грижа
            </h1>
            <p className="text-black/80 text-[11px] md:text-xs font-medium mt-2 max-w-[280px] md:max-w-[380px]">
              Индивидуален подход и прецизно лечение във Варна.
            </p>
          </div>

          {/* Bottom-right CTA */}
          <a
            href={`tel:${PHONE_RAW}`}
            className="absolute bottom-6 right-4 md:bottom-10 md:right-8 text-white text-xs md:text-sm font-semibold z-10 hover:underline hover:scale-105 transition-transform"
          >
            Запишете час
          </a>
        </MaskedCard>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2 - SERVICES / DENTAL CARE                                        */}
      {/* ========================================================================= */}
      <section
        ref={(el) => {
          section2Ref.current = el;
          s2Reveal.containerRef.current = el;
        }}
        id="services"
        className="min-h-screen md:h-screen w-full overflow-hidden flex flex-col pt-1.5 md:pt-2 px-3 md:px-5 pb-1.5 md:pb-2 gap-1.5 md:gap-2"
      >
        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 grid-rows-[auto_auto_auto_auto] md:grid-rows-[1fr_1fr_0.8fr] gap-1.5 md:gap-2">
          {/* Card 0 - Top Left ("Дентална грижа") */}
          <MaskedCard
            bgImage={SECTION2_IMAGE}
            position={s2Mask.positions[0]}
            imageWidth={s2ImageWidth}
            focalX={s2FocalX}
            cardRef={(el) => {
              s2CardRefs.current[0] = el;
            }}
            style={s2Reveal.getAnimStyle(0)}
            className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[160px] md:min-h-0 shadow-sm"
          >
            <h2 className="absolute top-4 left-5 md:top-6 md:left-7 text-white md:text-black text-2xl md:text-3xl font-bold z-10">
              Дентална грижа
            </h2>
            <p className="absolute bottom-4 left-5 md:bottom-6 md:left-7 text-white md:text-black text-xs md:text-sm font-semibold z-10">
              Професионално лечение с индивидуален подход
            </p>
          </MaskedCard>

          {/* Card 1 - Top Right (spans 2 rows on desktop) */}
          <MaskedCard
            bgImage={SECTION2_IMAGE}
            position={s2Mask.positions[1]}
            imageWidth={s2ImageWidth}
            focalX={s2FocalX}
            cardRef={(el) => {
              s2CardRefs.current[1] = el;
            }}
            style={s2Reveal.getAnimStyle(1)}
            className="md:row-span-2 rounded-xl md:rounded-2xl overflow-hidden relative min-h-[220px] md:min-h-0 shadow-sm"
          >
            <div className="absolute bottom-16 left-5 md:bottom-20 md:left-7 text-white text-xs md:text-sm font-semibold leading-4 md:leading-5 z-10 max-w-[320px] md:max-w-[420px]">
              Работя с внимание към детайла и се стремя всеки пациент да получи ясно обяснение за състоянието си и възможните варианти за лечение.
            </div>
            <a
              href={`tel:${PHONE_RAW}`}
              className="absolute bottom-4 right-4 md:bottom-6 md:right-6 px-5 py-3 md:px-8 md:py-5 bg-white rounded-full text-black text-base md:text-xl font-bold z-10 hover:scale-105 transition-transform cursor-pointer shadow-md inline-block"
            >
              Обадете се
            </a>
          </MaskedCard>

          {/* Card 2 - Bottom Left ("Грижа за вашата усмивка") */}
          <MaskedCard
            bgImage={SECTION2_IMAGE}
            position={s2Mask.positions[2]}
            imageWidth={s2ImageWidth}
            focalX={s2FocalX}
            cardRef={(el) => {
              s2CardRefs.current[2] = el;
            }}
            style={s2Reveal.getAnimStyle(2)}
            className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[160px] md:min-h-0 shadow-sm"
          >
            <h2 className="absolute top-4 left-5 md:top-6 md:left-7 text-white md:text-black text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.9] z-10">
              Грижа за
              <br />
              вашата
              <br />
              усмивка
            </h2>
          </MaskedCard>

          {/* Card 3 - Bottom Full Width (Services) */}
          <MaskedCard
            bgImage={SECTION2_IMAGE}
            position={s2Mask.positions[3]}
            imageWidth={s2ImageWidth}
            focalX={s2FocalX}
            cardRef={(el) => {
              s2CardRefs.current[3] = el;
            }}
            style={s2Reveal.getAnimStyle(3)}
            className="col-span-1 md:col-span-2 rounded-xl md:rounded-2xl overflow-hidden relative min-h-[220px] md:min-h-0 shadow-sm"
          >
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-2 md:p-3">
              {/* 4 Primary Service Cards */}
              <div className="flex flex-wrap md:flex-nowrap gap-1.5 md:gap-2 flex-1">
                {services.map((svc) => (
                  <div
                    key={svc.name}
                    className={`flex-1 min-w-[calc(50%-4px)] md:min-w-0 rounded-xl md:rounded-2xl p-3 md:p-5 flex flex-col justify-between ${
                      svc.active
                        ? 'bg-white/90 backdrop-blur-md shadow-md'
                        : 'bg-white/20 backdrop-blur-xl'
                    }`}
                  >
                    <h3
                      className={`text-base sm:text-lg md:text-3xl font-bold leading-[1.08] whitespace-pre-line ${
                        svc.active ? 'text-black' : 'text-white'
                      }`}
                    >
                      {svc.name}
                    </h3>

                    {svc.num && (
                      <div
                        className={`self-end w-7 h-7 md:w-11 md:h-11 rounded-full border flex items-center justify-center text-xs md:text-sm font-semibold mt-2 ${
                          svc.active
                            ? 'border-black text-black'
                            : 'border-white text-white'
                        }`}
                      >
                        {svc.num}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Supporting Verified Services Badge Strip */}
              <div className="mt-1 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md flex flex-wrap items-center justify-between gap-2 text-[10px] md:text-xs font-semibold text-white/90">
                <span>• {additionalServices[0]}</span>
                <span>• {additionalServices[1]}</span>
                <span>• {additionalServices[2]}</span>
              </div>
            </div>
          </MaskedCard>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 - DENTAL TREATMENT & CONSULTATION                               */}
      {/* ========================================================================= */}
      <section
        ref={(el) => {
          s3Reveal.containerRef.current = el;
        }}
        id="treatment"
        className="min-h-screen md:h-screen w-full overflow-hidden flex flex-col pt-1.5 md:pt-2 px-3 md:px-5 pb-1.5 md:pb-2 gap-1.5 md:gap-2"
      >
        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-2">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-1.5 md:gap-2 h-full">
            {/* 1. Heading Card */}
            <div
              style={s3Reveal.getAnimStyle(0)}
              className="rounded-xl md:rounded-2xl bg-stone-50 p-5 md:p-7 flex flex-col justify-between flex-[1.2] min-h-[180px] md:min-h-0 shadow-sm"
            >
              <h2 className="text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[0.95] text-black">
                Дентално
                <br />
                лечение
              </h2>
              <p className="text-xs md:text-sm font-semibold text-black mt-4">
                Индивидуален подход към всеки пациент
              </p>
            </div>

            {/* 2. Two Image Cards (Side by Side) */}
            <div
              style={s3Reveal.getAnimStyle(1)}
              className="flex gap-1.5 md:gap-2 flex-1 min-h-[140px] md:min-h-0"
            >
              {/* Left Image: Real Clinical Before/After Case */}
              <div className="flex-1 rounded-xl md:rounded-2xl overflow-hidden bg-neutral-100 shadow-sm relative group">
                <img
                  src={SECTION3_IMG1}
                  alt="Клиничен резултат преди и след"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Right Image: Dental Environment */}
              <div className="flex-1 rounded-xl md:rounded-2xl overflow-hidden bg-neutral-100 shadow-sm relative group">
                <img
                  src={SECTION3_IMG2}
                  alt="Стоматологичен кабинет"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>

            {/* 3. Consultation Card */}
            <div
              style={s3Reveal.getAnimStyle(2)}
              className="rounded-xl md:rounded-2xl bg-zinc-200 p-5 md:p-7 flex items-end justify-between flex-[0.8] min-h-[160px] md:min-h-0 shadow-sm"
            >
              <div className="flex flex-col">
                <p className="text-xs md:text-sm font-semibold text-black mb-2 md:mb-3">
                  Консултация
                </p>
                <h3 className="text-xl md:text-3xl font-bold text-black leading-6 md:leading-8">
                  Ясно
                  <br />
                  обяснение.
                  <br />
                  Прецизно
                  <br />
                  лечение.
                </h3>
              </div>
              <a
                href={`tel:${PHONE_RAW}`}
                className="px-5 py-3 md:px-8 md:py-5 bg-white rounded-full text-black text-base md:text-xl font-bold hover:scale-105 transition-transform cursor-pointer shadow-md shrink-0 inline-block text-center"
              >
                Запишете час
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Single tall image card */}
          <div
            style={s3Reveal.getAnimStyle(3)}
            className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[350px] md:min-h-0 shadow-sm bg-neutral-100"
          >
            <img
              src={SECTION3_BG}
              alt="Усмихнат пациент в спокойна обстановка"
              className="w-full h-full object-cover"
              loading="lazy"
            />

            {/* Overlay Container */}
            <div className="absolute bottom-3 left-3 right-3 md:bottom-5 md:left-5 md:right-5 flex gap-1.5 md:gap-2">
              {/* Overlay Card 1 (White, Left) */}
              <div className="flex-1 bg-white rounded-xl md:rounded-2xl p-3 md:p-5 flex flex-col justify-between h-36 md:h-52 shadow-md">
                <h4 className="text-lg md:text-2xl font-bold text-black leading-5 md:leading-7">
                  Вашето
                  <br />
                  лечение
                </h4>
                <div className="self-end w-9 h-9 md:w-12 md:h-12 rounded-full border border-black flex items-center justify-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="rotate-[-45deg]"
                  >
                    <path
                      d="M1 7h12m0 0L8 2m5 5L8 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Overlay Card 2 (Glass, Right) */}
              <div className="flex-1 bg-white/20 backdrop-blur-xl rounded-xl md:rounded-2xl p-3 md:p-5 flex flex-col justify-between h-36 md:h-52 shadow-md">
                <h4 className="text-lg md:text-2xl font-bold text-white leading-5 md:leading-7">
                  Грижа за
                  <br />
                  усмивката
                </h4>
                <div className="self-end w-9 h-9 md:w-12 md:h-12 rounded-full border border-white flex items-center justify-center text-white">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="rotate-[-45deg]"
                  >
                    <path
                      d="M1 7h12m0 0L8 2m5 5L8 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING CALL BUTTON (Fixed bottom right) */}
      <a
        id="floating-call-btn"
        href={`tel:${PHONE_RAW}`}
        aria-label={`Обадете се: ${PHONE_DISPLAY}`}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 flex items-center gap-2.5 px-4 py-2.5 md:px-5 md:py-3 rounded-full bg-black text-white hover:bg-neutral-800 shadow-[0_12px_32px_rgba(0,0,0,0.35)] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        <span className="text-xs md:text-sm font-bold tracking-wider whitespace-nowrap">
          {PHONE_DISPLAY}
        </span>
      </a>
    </div>
  );
}
