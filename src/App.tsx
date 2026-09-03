import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

// ==========================================
// TYPES & LOCALIZATION
// ==========================================
type Language = 'bg' | 'en';

const CONTENT = {
  bg: {
    brandName: 'Дариа',
    profession: 'Зъболекар',
    location: 'Варна, България',
    phoneDisplay: '088 497 0607',
    phoneRaw: '0884970607',
    nav: {
      home: 'Начало',
      services: 'Услуги',
      approach: 'Подход',
      care: 'Специална грижа',
      experience: 'Консултация',
      results: 'Резултати',
      contact: 'Контакти',
      bookCta: 'Запишете час',
    },
    hero: {
      bars: ['Внимателен подход', 'Прецизно лечение', 'Спокойна обстановка'],
      tag: 'Зъболекар във Варна',
      headlinePart1: 'Внимателна грижа.',
      headlinePart2: 'Прецизно лечение.',
      topSupporting: 'Индивидуален подход и съвременно дентално лечение в спокойна и комфортна обстановка.',
      bottomSupporting: 'Търсите внимателен и прецизен зъболекар във Варна? Предлагам индивидуален подход и съвременно стоматологично лечение.',
      cta: 'Запишете час',
    },
    services: {
      badge: 'УСЛУГИ',
      title: 'Дентални услуги във Варна',
      subtitle: 'Пълен спектър от съвременни стоматологични процедури за здравето на вашата усмивка.',
      list: [
        {
          num: '01',
          name: 'Профилактични прегледи и консултации',
          category: 'Диагностика',
          desc: 'Детайлен преглед на състоянието на зъбите и венците с ясно представяне на констатациите.',
        },
        {
          num: '02',
          name: 'Лечение на кариес и неговите усложнения',
          category: 'Терапия',
          desc: 'Прецизно почистване и възстановяване с висококачествени естетични материали.',
        },
        {
          num: '03',
          name: 'Лечение на частично и тотално обеззъбяване',
          category: 'Протезиране',
          desc: 'Индивидуални решения за възстановяване на дъвкателната функция и естетиката на усмивката.',
        },
        {
          num: '04',
          name: 'Естетични възстановявания',
          category: 'Естетика',
          desc: 'Художествено анатомично моделиране с фокус върху естествения цвят и форма на зъбите.',
        },
        {
          num: '05',
          name: 'Почистване на зъбен камък',
          category: 'Профилактика',
          desc: 'Професионална хигиена и полиране за здрави венци и дълготрайна свежест.',
        },
        {
          num: '06',
          name: 'Детска дентална медицина',
          category: 'Детска грижа',
          desc: 'Търпелив и нежен подход, създаващ спокойствие и доверие у най-малките пациенти.',
        },
        {
          num: '07',
          name: 'Грижа за бъдещите мами',
          category: 'Специална грижа',
          desc: 'Деликатна дентална грижа и профилактика по време на бременност и кърмене.',
        },
      ],
    },
    approach: {
      badge: 'НАШИЯТ ПОДХОД',
      title: 'Индивидуален подход към всеки пациент',
      quote: '„Работя с внимание към детайла и се стремя всеки пациент да получи ясно обяснение за състоянието си и възможните варианти за лечение.“',
      pillars: [
        {
          num: '01',
          title: 'Внимание към детайла',
          desc: 'Всяка манипулация се извършва с изключителна прецизност и стремеж към естествен дълготраен резултат.',
        },
        {
          num: '02',
          title: 'Прецизност',
          desc: 'Съвременни методи на работа и анатомична точност за всяко възстановяване.',
        },
        {
          num: '03',
          title: 'Ясна комуникация',
          desc: 'Подробно и достъпно обяснение на състоянието и всички възможни варианти за лечение.',
        },
        {
          num: '04',
          title: 'Спокойна обстановка',
          desc: 'Комфортна и приятелска атмосфера, която премахва притеснението от зъболекарския стол.',
        },
      ],
    },
    categories: {
      badge: 'НАПРАВЛЕНИЯ',
      title: 'Четири основни направления на грижа',
      items: [
        {
          tag: 'ПРОФИЛАКТИКА',
          title: 'Здрава основа',
          services: ['Профилактични прегледи и консултации', 'Почистване на зъбен камък'],
        },
        {
          tag: 'ТЕРАПИЯ',
          title: 'Възстановяване',
          services: ['Лечение на кариес и неговите усложнения', 'Лечение на частично и тотално обеззъбяване'],
        },
        {
          tag: 'ЕСТЕТИКА',
          title: 'Красива усмивка',
          services: ['Естетични възстановявания на формата и цвета'],
        },
        {
          tag: 'СПЕЦИАЛНА ГРИЖА',
          title: 'Семейно здраве',
          services: ['Детска дентална медицина', 'Грижа за бъдещите мами'],
        },
      ],
    },
    patientCare: {
      badge: 'СПЕЦИАЛНА ГРИЖА',
      title: 'Грижа за всеки етап от живота',
      cards: [
        {
          tag: 'ДЕТСКО ЗДРАВЕ',
          title: 'Детска дентална медицина',
          desc: 'Децата се нуждаят от специално внимание, спокойствие и търпение. Изграждаме позитивни навици и увереност без страх.',
          highlight: 'Спокоен & търпелив подход',
        },
        {
          tag: 'БРЕМЕННОСТ И МАЙЧИНСТВО',
          title: 'Грижа за бъдещите мами',
          desc: 'Хормоналните промени по време на бременност изискват прецизна профилактика на венците и зъбите. Поддържаме оптимално дентално здраве.',
          highlight: 'Деликатна и безопасна профилактика',
        },
      ],
    },
    experience: {
      badge: 'ЕТАПИ НА РАБОТА',
      title: 'Как протича вашата консултация',
      steps: [
        {
          step: '01',
          title: 'Консултация и преглед',
          desc: 'Внимателен първичен преглед и изслушване на вашите нужди и желания.',
        },
        {
          step: '02',
          title: 'Ясно обяснение',
          desc: 'Подробен коментар на състоянието на зъбите без сложна и неразбираема терминология.',
        },
        {
          step: '03',
          title: 'Възможни варианти',
          desc: 'Представяне на всички възможни решения за лечение, съобразени с вашите приоритети.',
        },
        {
          step: '04',
          title: 'Прецизно лечение',
          desc: 'Индивидуален подход и висококачествено изпълнение в комфортна обстановка.',
        },
      ],
    },
    caseResults: {
      badge: 'КЛИНИЧЕН СЛУЧАЙ',
      title: 'Естетично възстановяване',
      subtitle: 'Реален случай на детайлно възстановяване на естествената анатомия и цвят на зъба.',
      labelBeforeAfter: 'Преди / След естетично възстановяване',
    },
    finalCta: {
      badge: 'ЗАПАЗЕТЕ ЧАС',
      title: 'Погрижете се навреме за усмивката си.',
      subtitle: 'Запишете час за консултация в спокойна и комфортна обстановка във Варна.',
      phone: '088 497 0607',
      callNow: 'Обадете се сега',
    },
    footer: {
      doctor: 'Дариа — Зъболекар във Варна',
      tagline: 'Индивидуален подход и съвременно стоматологично лечение.',
      rights: 'Всички права запазени.',
    },
  },
  en: {
    brandName: 'Daria',
    profession: 'Dentist',
    location: 'Varna, Bulgaria',
    phoneDisplay: '088 497 0607',
    phoneRaw: '0884970607',
    nav: {
      home: 'Home',
      services: 'Services',
      approach: 'Approach',
      care: 'Special Care',
      experience: 'Consultation',
      results: 'Results',
      contact: 'Contact',
      bookCta: 'Book an Appointment',
    },
    hero: {
      bars: ['Attentive Approach', 'Precise Treatment', 'Calm Environment'],
      tag: 'Dentist in Varna',
      headlinePart1: 'Attentive Care.',
      headlinePart2: 'Precise Treatment.',
      topSupporting: 'Individual approach and modern dental treatment in a calm, comfortable environment.',
      bottomSupporting: 'Looking for an attentive and precise dentist in Varna? I provide an individualized approach and modern dental care.',
      cta: 'Book an Appointment',
    },
    services: {
      badge: 'SERVICES',
      title: 'Dental Services in Varna',
      subtitle: 'Comprehensive range of modern dental procedures for the health of your smile.',
      list: [
        {
          num: '01',
          name: 'Preventive checkups & consultations',
          category: 'Diagnostics',
          desc: 'Detailed examination of teeth and gums with clear presentation of findings.',
        },
        {
          num: '02',
          name: 'Treatment of dental caries & complications',
          category: 'Therapy',
          desc: 'Precise cleaning and restoration with premium aesthetic composite materials.',
        },
        {
          num: '03',
          name: 'Treatment of partial & complete edentulism',
          category: 'Prosthetics',
          desc: 'Individual solutions restoring masticatory function and smile aesthetics.',
        },
        {
          num: '04',
          name: 'Aesthetic restorations',
          category: 'Aesthetics',
          desc: 'Artistic anatomical modeling focusing on natural tooth shade and contour.',
        },
        {
          num: '05',
          name: 'Dental calculus cleaning & scaling',
          category: 'Prevention',
          desc: 'Professional scaling and polishing for healthy gums and lasting freshness.',
        },
        {
          num: '06',
          name: 'Pediatric dentistry',
          category: 'Child Care',
          desc: 'Gentle, patient approach creating trust and comfort for young patients.',
        },
        {
          num: '07',
          name: 'Care for expectant mothers',
          category: 'Special Care',
          desc: 'Delicate dental prophylaxis and preventive care during pregnancy.',
        },
      ],
    },
    approach: {
      badge: 'OUR PHILOSOPHY',
      title: 'Individual Approach to Every Patient',
      quote: '“I work with meticulous attention to detail and strive to provide every patient with a clear explanation of their condition and treatment options.”',
      pillars: [
        {
          num: '01',
          title: 'Attention to Detail',
          desc: 'Every procedure is performed with precision, aiming for natural and durable results.',
        },
        {
          num: '02',
          title: 'Precision',
          desc: 'Modern methodology and anatomical accuracy for every tooth restoration.',
        },
        {
          num: '03',
          title: 'Clear Communication',
          desc: 'Thorough and accessible explanation of oral health status and treatment pathways.',
        },
        {
          num: '04',
          title: 'Calm Environment',
          desc: 'Comfortable and friendly atmosphere that eliminates dental anxiety.',
        },
      ],
    },
    categories: {
      badge: 'TREATMENT PILLARS',
      title: 'Four Core Areas of Dental Care',
      items: [
        {
          tag: 'PREVENTION',
          title: 'Healthy Foundation',
          services: ['Preventive checkups & consultations', 'Calculus scaling & polishing'],
        },
        {
          tag: 'THERAPY',
          title: 'Restoration',
          services: ['Caries treatment & complications', 'Partial & total edentulism solutions'],
        },
        {
          tag: 'AESTHETICS',
          title: 'Natural Smile',
          services: ['Aesthetic anatomical restorations'],
        },
        {
          tag: 'SPECIAL CARE',
          title: 'Family Focus',
          services: ['Pediatric dentistry', 'Care for expectant mothers'],
        },
      ],
    },
    patientCare: {
      badge: 'SPECIALIZED FOCUS',
      title: 'Gentle Care for Every Stage of Life',
      cards: [
        {
          tag: 'CHILD HEALTH',
          title: 'Pediatric Dentistry',
          desc: 'Children require patience, empathy and gentle care. We build positive oral habits with zero fear.',
          highlight: 'Patient & Reassuring Approach',
        },
        {
          tag: 'MATERNITY CARE',
          title: 'Care for Expectant Mothers',
          desc: 'Hormonal shifts during pregnancy require special gum and tooth care. We ensure safe, delicate prophylaxis.',
          highlight: 'Delicate & Safe Prophylaxis',
        },
      ],
    },
    experience: {
      badge: 'PATIENT JOURNEY',
      title: 'How Your Consultation Unfolds',
      steps: [
        {
          step: '01',
          title: 'Consultation & Examination',
          desc: 'Thorough initial evaluation and attentive listening to your goals and needs.',
        },
        {
          step: '02',
          title: 'Clear Explanation',
          desc: 'Direct breakdown of findings without confusing medical jargon.',
        },
        {
          step: '03',
          title: 'Treatment Options',
          desc: 'Exploration of every viable treatment path tailored to your preferences.',
        },
        {
          step: '04',
          title: 'Precise Treatment',
          desc: 'Individualized approach and gentle execution in a relaxing environment.',
        },
      ],
    },
    caseResults: {
      badge: 'CLINICAL CASE',
      title: 'Aesthetic Restoration',
      subtitle: 'Real clinical case showing natural anatomical contour and color matching.',
      labelBeforeAfter: 'Before / After Aesthetic Restoration',
    },
    finalCta: {
      badge: 'APPOINTMENTS',
      title: 'Take Care of Your Smile in Time.',
      subtitle: 'Book your consultation in a calm and welcoming dental clinic in Varna.',
      phone: '088 497 0607',
      callNow: 'Call Now',
    },
    footer: {
      doctor: 'Daria — Dentist in Varna',
      tagline: 'Individual approach and modern dental care.',
      rights: 'All rights reserved.',
    },
  },
};

// ==========================================
// HIGH-DEFINITION IMAGES
// ==========================================
const HERO_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_113640_ccf3cf97-d447-425b-a134-d7b09fc743fc.png&w=1280&q=85';

const SECTION2_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114219_414dfe80-f15c-4e25-bf52-b13721f4bd88.png&w=1280&q=85';

const CLINICAL_BEFORE_AFTER = '/images/clinical_before_after.webp';

const DENTAL_CLINIC_INTERIOR =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115237_fc519057-6e87-4abf-999a-9610b8b085b4.png&w=1280&q=85';

const SMILING_PATIENT_BG =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114355_752ba9e6-0942-4abb-9047-5d9bb16632e9.png&w=1280&q=85';

// ==========================================
// CUSTOM HOOKS
// ==========================================
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

function useStaggeredReveal(count: number, threshold = 0.12) {
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
    transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 100}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 100}ms`,
  });

  return { containerRef, getAnimStyle, visible };
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
// MOTIONSITES CINEMATIC INTRO
// ==========================================
interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'enter' | 'counting' | 'completed' | 'revealing'>('enter');
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timerPhase1 = setTimeout(() => {
      setPhase('counting');
    }, 400);

    const startTime = Date.now() + 400;
    const duration = 1100;

    let animFrame: number;

    const updateCounter = () => {
      const now = Date.now();
      const elapsed = now - startTime;

      if (elapsed > 0) {
        const progress = Math.min(1, elapsed / duration);
        const easeVal = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentCount = Math.floor(easeVal * 100);
        setCount(currentCount);

        if (progress >= 1) {
          setCount(100);
          setPhase('completed');
          setTimeout(() => {
            setPhase('revealing');
            setTimeout(() => {
              onComplete();
            }, 700);
          }, 160);
          return;
        }
      }

      animFrame = requestAnimationFrame(updateCounter);
    };

    const startTimer = setTimeout(() => {
      animFrame = requestAnimationFrame(updateCounter);
    }, 400);

    return () => {
      clearTimeout(timerPhase1);
      clearTimeout(startTimer);
      cancelAnimationFrame(animFrame);
    };
  }, [onComplete]);

  const formattedCount = count < 10 ? `0${count}` : `${count}`;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-white text-black flex flex-col justify-between p-6 md:p-12 select-none overflow-hidden will-change-transform ${
        phase === 'revealing'
          ? '-translate-y-full transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] pointer-events-none'
          : 'translate-y-0 pointer-events-auto'
      }`}
    >
      <div
        className={`flex items-center justify-between text-xs sm:text-sm font-semibold tracking-wider transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          phase === 'enter' ? 'opacity-0 -translate-y-3' : 'opacity-100 translate-y-0'
        }`}
      >
        <span className="uppercase tracking-[0.2em] text-neutral-800">
          Дариа • Стоматология
        </span>
        <span className="uppercase tracking-[0.2em] text-neutral-500 font-mono text-[11px] sm:text-xs">
          Варна, България
        </span>
      </div>

      <div className="my-auto flex flex-col items-center justify-center text-center">
        <div
          className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            phase === 'enter'
              ? 'opacity-0 translate-y-6 scale-95'
              : 'opacity-100 translate-y-0 scale-100'
          }`}
        >
          <div className="text-[clamp(2.5rem,8vw,7rem)] font-extrabold uppercase tracking-tight leading-[0.85] text-black">
            Дариа
          </div>
          <div className="text-[clamp(1.8rem,5.5vw,5rem)] font-extrabold uppercase tracking-tight leading-[0.88] text-neutral-800 -mt-1 md:-mt-3">
            Зъболекар
          </div>
        </div>

        <p
          className={`text-xs sm:text-sm font-medium text-neutral-500 max-w-xs sm:max-w-md mt-4 transition-all duration-700 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            phase === 'enter' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          Индивидуален подход и съвременно дентално лечение
        </p>
      </div>

      <div className="flex items-end justify-between w-full pt-4">
        <div
          className={`flex items-baseline gap-1 font-bold tabular-nums tracking-tighter leading-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            phase === 'enter' ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'
          }`}
        >
          <span className="text-6xl sm:text-8xl md:text-9xl text-black font-extrabold">
            {formattedCount}
          </span>
          <span className="text-base sm:text-xl font-bold text-neutral-400 font-mono">
            / 100
          </span>
        </div>

        <div
          className={`flex flex-col items-end text-right transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            phase === 'enter' ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
          }`}
        >
          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-neutral-400 uppercase">
            Статус
          </span>
          <span className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider mt-0.5">
            {count < 100 ? 'Зареждане' : 'Готово'}
          </span>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// NAVIGATION COMPONENT WITH LANGUAGE TOGGLE
// ==========================================
interface NavbarProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentLang, onSelectLang }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = CONTENT[currentLang];

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
    { label: t.nav.home, href: '#hero' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.approach, href: '#approach' },
    { label: t.nav.care, href: '#patient-care' },
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.results, href: '#results' },
    { label: t.nav.contact, href: '#contact' },
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
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-7 py-2.5 md:py-3.5 bg-white/85 backdrop-blur-md border-b border-neutral-100 transition-all">
        {/* Logo Left */}
        <a href="#hero" className="flex flex-col select-none group cursor-pointer">
          <div className="text-xl md:text-2xl font-extrabold uppercase tracking-tight leading-none text-black">
            {t.brandName}
          </div>
          <div className="text-xl md:text-2xl font-extrabold uppercase tracking-tight leading-none text-black -mt-1.5 md:-mt-2">
            {t.profession}
          </div>
          <span className="text-[8px] md:text-[9px] font-medium leading-none mt-1.5 md:mt-2 text-neutral-500 uppercase tracking-wider">
            {t.location}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.slice(1, 6).map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleScroll(link.href)}
              className="text-xs font-bold tracking-wide uppercase text-neutral-700 hover:text-black transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Actions Right: Language Switcher + Call CTA + Menu */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Language Switcher Pill */}
          <div className="flex items-center bg-neutral-100 p-1 rounded-full text-[11px] font-bold">
            <button
              type="button"
              onClick={() => onSelectLang('bg')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                currentLang === 'bg'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              BG
            </button>
            <button
              type="button"
              onClick={() => onSelectLang('en')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                currentLang === 'en'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              EN
            </button>
          </div>

          {/* Desktop Phone / Booking CTA */}
          <a
            href={`tel:${t.phoneRaw}`}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-xs font-bold tracking-wide uppercase rounded-full hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            {t.nav.bookCta}
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            className="w-10 h-10 flex items-center justify-center relative cursor-pointer lg:hidden"
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

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-500 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div
          className={`absolute top-0 right-0 h-full w-[88%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] flex flex-col justify-between p-7 pt-24 overflow-y-auto ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((item, i) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleScroll(item.href)}
                className={`text-left text-2xl font-bold text-black hover:text-neutral-500 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] cursor-pointer py-1.5 ${
                  menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
                style={{
                  transitionDelay: menuOpen ? `${80 + i * 45}ms` : '0ms',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div
            className={`mt-6 pt-6 border-t border-neutral-200 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{
              transitionDelay: menuOpen ? '380ms' : '0ms',
            }}
          >
            <div className="text-xs font-semibold text-neutral-500 mb-1">
              {t.location}
            </div>
            <div className="text-lg font-bold text-black mb-4 font-mono">
              {t.phoneDisplay}
            </div>
            <a
              href={`tel:${t.phoneRaw}`}
              onClick={() => setMenuOpen(false)}
              className="block w-full py-4 bg-black rounded-full text-white text-sm font-bold uppercase tracking-wider text-center hover:bg-neutral-800 transition-colors shadow-md"
            >
              {t.nav.bookCta}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

// ==========================================
// MAIN COMPREHENSIVE APPLICATION
// ==========================================
export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentLang, setCurrentLang] = useState<Language>('bg');
  const t = CONTENT[currentLang];
  const isMobile = useIsMobile();

  // Hero Section Refs & Masking
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroCardRefs = useRef<(HTMLElement | null)[]>([]);
  const heroReveal = useStaggeredReveal(4);
  const heroMask = useMaskPositions(heroSectionRef, heroCardRefs);
  const heroImageWidth = useImageWidth(HERO_IMAGE, heroMask.sectionHeight);
  const heroFocalX = isMobile ? 0.7 : 0.8;

  // Staggered reveals for subsequent sections
  const servicesReveal = useStaggeredReveal(8);
  const approachReveal = useStaggeredReveal(5);
  const categoriesReveal = useStaggeredReveal(5);
  const patientCareReveal = useStaggeredReveal(3);
  const experienceReveal = useStaggeredReveal(5);
  const resultsReveal = useStaggeredReveal(3);
  const ctaReveal = useStaggeredReveal(3);

  return (
    <div className="bg-white text-black selection:bg-black selection:text-white font-sans antialiased overflow-x-hidden">
      {/* 0. EDITORIAL INTRO */}
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      {/* 1. FIXED NAVBAR */}
      <Navbar currentLang={currentLang} onSelectLang={setCurrentLang} />

      {/* ========================================================================= */}
      {/* SECTION 1 — HERO (Masked Cards Composition)                              */}
      {/* ========================================================================= */}
      <section
        ref={(el) => {
          heroSectionRef.current = el;
          heroReveal.containerRef.current = el;
        }}
        id="hero"
        className="h-screen w-full overflow-hidden flex flex-col pt-20 md:pt-24 px-3 md:px-6 pb-2 gap-1.5 md:gap-2"
      >
        {/* 3 Top Feature Bars */}
        {t.hero.bars.map((text, i) => (
          <MaskedCard
            key={text}
            bgImage={HERO_IMAGE}
            position={heroMask.positions[i]}
            imageWidth={heroImageWidth}
            focalX={heroFocalX}
            cardRef={(el) => {
              heroCardRefs.current[i] = el;
            }}
            style={heroReveal.getAnimStyle(i)}
            className="w-full h-12 sm:h-14 md:h-20 shrink-0 rounded-xl md:rounded-2xl overflow-hidden relative shadow-sm"
          >
            <div className="flex items-center justify-center h-full relative z-10 px-4">
              <span className="text-black text-base sm:text-xl md:text-3xl font-extrabold text-center leading-none tracking-tight">
                {text}
              </span>
            </div>
          </MaskedCard>
        ))}

        {/* Main Hero Card (Card 4) */}
        <MaskedCard
          bgImage={HERO_IMAGE}
          position={heroMask.positions[3]}
          imageWidth={heroImageWidth}
          focalX={heroFocalX}
          cardRef={(el) => {
            heroCardRefs.current[3] = el;
          }}
          style={heroReveal.getAnimStyle(3)}
          className="w-full flex-1 min-h-0 rounded-xl md:rounded-2xl overflow-hidden relative shadow-sm"
        >
          {/* Top-left supporting text */}
          <div className="absolute top-4 left-4 md:top-7 md:left-7 text-black text-xs md:text-sm font-semibold leading-4 md:leading-5 max-w-[240px] md:max-w-[360px] z-10 bg-white/40 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-2 md:p-0 rounded-lg md:rounded-none">
            {t.hero.topSupporting}
          </div>

          {/* Bottom-left headline block */}
          <div className="absolute bottom-5 left-3 md:bottom-8 md:left-6 z-10 max-w-[85%]">
            <span className="inline-block text-black text-xs md:text-sm font-bold uppercase tracking-wider mb-1 md:mb-2 bg-white/70 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
              {t.hero.tag}
            </span>
            <h1 className="text-black text-[clamp(2.6rem,8.5vw,8.5rem)] font-extrabold leading-[0.84] tracking-tight">
              {t.hero.headlinePart1}
              <br />
              {t.hero.headlinePart2}
            </h1>
            <p className="text-black/85 text-[11px] sm:text-xs md:text-sm font-medium mt-2 md:mt-3 max-w-[320px] md:max-w-[440px] leading-relaxed hidden sm:block">
              {t.hero.bottomSupporting}
            </p>
          </div>

          {/* Bottom-right Call CTA */}
          <a
            href={`tel:${t.phoneRaw}`}
            className="absolute bottom-5 right-4 md:bottom-8 md:right-8 z-10 inline-flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3.5 bg-black text-white text-xs md:text-sm font-bold tracking-wider uppercase rounded-full hover:bg-neutral-800 transition-all hover:scale-105 shadow-md"
          >
            {t.hero.cta}
          </a>
        </MaskedCard>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2 — ALL 7 SERVICES (Editorial Mosaic Grid)                       */}
      {/* ========================================================================= */}
      <section
        ref={(el) => {
          servicesReveal.containerRef.current = el;
        }}
        id="services"
        className="w-full py-16 md:py-24 px-4 md:px-7 bg-neutral-900 text-white"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div style={servicesReveal.getAnimStyle(0)} className="mb-12 md:mb-16">
            <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase block mb-3">
              {t.services.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-[0.95] max-w-3xl">
              {t.services.title}
            </h2>
            <p className="text-neutral-400 text-sm md:text-lg mt-4 max-w-2xl leading-relaxed">
              {t.services.subtitle}
            </p>
          </div>

          {/* 7 Services Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {t.services.list.map((svc, i) => (
              <div
                key={svc.num}
                style={servicesReveal.getAnimStyle(i + 1)}
                className={`rounded-2xl p-6 md:p-8 flex flex-col justify-between border transition-all duration-300 group hover:-translate-y-1 ${
                  i === 0
                    ? 'bg-white text-black border-white lg:col-span-2'
                    : 'bg-neutral-800/80 hover:bg-neutral-800 border-neutral-700/60 text-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                        i === 0 ? 'bg-neutral-100 text-black' : 'bg-neutral-700 text-neutral-300'
                      }`}
                    >
                      {svc.category}
                    </span>
                    <span
                      className={`text-sm font-mono font-bold ${
                        i === 0 ? 'text-neutral-400' : 'text-neutral-500'
                      }`}
                    >
                      {svc.num}
                    </span>
                  </div>
                  <h3
                    className={`text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-3 leading-snug ${
                      i === 0 ? 'text-black' : 'text-white'
                    }`}
                  >
                    {svc.name}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      i === 0 ? 'text-neutral-600' : 'text-neutral-400'
                    }`}
                  >
                    {svc.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-200/20 flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                    Дариа • Варна
                  </span>
                  <a
                    href={`tel:${t.phoneRaw}`}
                    className={`text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 group-hover:underline ${
                      i === 0 ? 'text-black' : 'text-white'
                    }`}
                  >
                    {t.nav.bookCta} →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 — APPROACH & PHILOSOPHY                                         */}
      {/* ========================================================================= */}
      <section
        ref={(el) => {
          approachReveal.containerRef.current = el;
        }}
        id="approach"
        className="w-full py-16 md:py-24 px-4 md:px-7 bg-stone-100 text-black"
      >
        <div className="max-w-7xl mx-auto">
          {/* Main Statement Card */}
          <div
            style={approachReveal.getAnimStyle(0)}
            className="rounded-3xl bg-white p-8 md:p-14 border border-neutral-200/80 shadow-sm mb-12"
          >
            <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase block mb-3">
              {t.approach.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[0.98] mb-6">
              {t.approach.title}
            </h2>
            <blockquote className="text-lg sm:text-2xl md:text-3xl font-medium text-neutral-800 leading-relaxed italic border-l-4 border-black pl-4 md:pl-6 my-6">
              {t.approach.quote}
            </blockquote>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {t.approach.pillars.map((item, i) => (
              <div
                key={item.num}
                style={approachReveal.getAnimStyle(i + 1)}
                className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <span className="text-2xl font-mono font-extrabold text-neutral-300 block mb-4">
                    {item.num}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-black leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4 — TREATMENT CATEGORIES (Visual Quadrants)                       */}
      {/* ========================================================================= */}
      <section
        ref={(el) => {
          categoriesReveal.containerRef.current = el;
        }}
        id="categories"
        className="w-full py-16 md:py-24 px-4 md:px-7 bg-white text-black"
      >
        <div className="max-w-7xl mx-auto">
          <div style={categoriesReveal.getAnimStyle(0)} className="mb-12">
            <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase block mb-2">
              {t.categories.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[0.95]">
              {t.categories.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {t.categories.items.map((cat, i) => (
              <div
                key={cat.tag}
                style={categoriesReveal.getAnimStyle(i + 1)}
                className="rounded-2xl md:rounded-3xl p-7 md:p-10 bg-neutral-50 border border-neutral-200/70 flex flex-col justify-between hover:border-black transition-colors"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2">
                    {cat.tag}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold mb-6 tracking-tight">
                    {cat.title}
                  </h3>
                  <ul className="space-y-3">
                    {cat.services.map((s) => (
                      <li key={s} className="flex items-start gap-3 text-sm md:text-base font-semibold text-neutral-800">
                        <span className="w-2 h-2 rounded-full bg-black mt-2 shrink-0" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-200 flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-500 uppercase">
                    Варна • Д-р Дариа
                  </span>
                  <a
                    href={`tel:${t.phoneRaw}`}
                    className="text-xs font-bold uppercase tracking-wider text-black hover:underline"
                  >
                    {t.nav.bookCta} →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5 — SPECIAL PATIENT CARE (Children & Expectant Mothers)            */}
      {/* ========================================================================= */}
      <section
        ref={(el) => {
          patientCareReveal.containerRef.current = el;
        }}
        id="patient-care"
        className="w-full py-16 md:py-24 px-4 md:px-7 bg-neutral-950 text-white"
      >
        <div className="max-w-7xl mx-auto">
          <div style={patientCareReveal.getAnimStyle(0)} className="mb-12 md:mb-16">
            <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase block mb-3">
              {t.patientCare.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[0.95]">
              {t.patientCare.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {t.patientCare.cards.map((card, i) => (
              <div
                key={card.tag}
                style={patientCareReveal.getAnimStyle(i + 1)}
                className="rounded-3xl p-8 md:p-12 bg-neutral-900 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-all shadow-xl"
              >
                <div>
                  <div className="inline-block px-3.5 py-1 rounded-full bg-neutral-800 text-[11px] font-bold tracking-wider uppercase text-neutral-300 mb-6">
                    {card.tag}
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 tracking-tight leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-sm md:text-base text-neutral-400 leading-relaxed mb-6">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-300">
                    ✓ {card.highlight}
                  </span>
                  <a
                    href={`tel:${t.phoneRaw}`}
                    className="px-4 py-2 bg-white text-black text-xs font-bold uppercase rounded-full hover:bg-neutral-200 transition-colors"
                  >
                    {t.nav.bookCta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6 — CONSULTATION JOURNEY                                          */}
      {/* ========================================================================= */}
      <section
        ref={(el) => {
          experienceReveal.containerRef.current = el;
        }}
        id="experience"
        className="w-full py-16 md:py-24 px-4 md:px-7 bg-stone-50 text-black"
      >
        <div className="max-w-7xl mx-auto">
          <div style={experienceReveal.getAnimStyle(0)} className="mb-12 md:mb-16">
            <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase block mb-3">
              {t.experience.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[0.95]">
              {t.experience.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {t.experience.steps.map((step, i) => (
              <div
                key={step.step}
                style={experienceReveal.getAnimStyle(i + 1)}
                className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200/80 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-black text-white font-mono font-bold text-sm flex items-center justify-center mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7 — CLINICAL CASE (Real Restoration Case)                         */}
      {/* ========================================================================= */}
      <section
        ref={(el) => {
          resultsReveal.containerRef.current = el;
        }}
        id="results"
        className="w-full py-16 md:py-24 px-4 md:px-7 bg-neutral-900 text-white"
      >
        <div className="max-w-7xl mx-auto">
          <div style={resultsReveal.getAnimStyle(0)} className="mb-12">
            <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase block mb-2">
              {t.caseResults.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[0.95]">
              {t.caseResults.title}
            </h2>
            <p className="text-neutral-400 text-sm md:text-base mt-3 max-w-xl">
              {t.caseResults.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
            {/* Real Case Image Container */}
            <div
              style={resultsReveal.getAnimStyle(1)}
              className="rounded-3xl overflow-hidden bg-black border border-neutral-800 shadow-2xl relative group"
            >
              <img
                src={CLINICAL_BEFORE_AFTER}
                alt={t.caseResults.labelBeforeAfter}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md px-4 py-2.5 rounded-xl text-xs font-bold text-white border border-white/10 flex items-center justify-between">
                <span>{t.caseResults.labelBeforeAfter}</span>
                <span className="font-mono text-neutral-400">Варна</span>
              </div>
            </div>

            {/* Atmosphere Practice Card */}
            <div
              style={resultsReveal.getAnimStyle(2)}
              className="rounded-3xl overflow-hidden bg-neutral-800 border border-neutral-700 relative min-h-[320px] md:min-h-[420px] flex flex-col justify-between p-8 md:p-12"
            >
              <img
                src={DENTAL_CLINIC_INTERIOR}
                alt="Стоматологичен кабинет Варна"
                className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
                loading="lazy"
              />
              <div className="relative z-10">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-300 block mb-2">
                  {t.location}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold leading-snug">
                  Съвременно стоматологично лечение в спокойна обстановка.
                </h3>
              </div>

              <div className="relative z-10 pt-6">
                <a
                  href={`tel:${t.phoneRaw}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-black font-bold uppercase tracking-wider text-xs rounded-full hover:bg-neutral-200 transition-colors shadow-lg"
                >
                  {t.nav.bookCta} ({t.phoneDisplay})
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8 — FINAL MONUMENTAL CTA & CONTACT                                */}
      {/* ========================================================================= */}
      <section
        ref={(el) => {
          ctaReveal.containerRef.current = el;
        }}
        id="contact"
        className="w-full py-20 md:py-32 px-4 md:px-7 bg-white text-black"
      >
        <div className="max-w-5xl mx-auto text-center">
          <div style={ctaReveal.getAnimStyle(0)} className="inline-block px-4 py-1.5 rounded-full bg-neutral-100 text-xs font-bold tracking-widest uppercase mb-6">
            {t.finalCta.badge}
          </div>

          <h2
            style={ctaReveal.getAnimStyle(1)}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[0.92] mb-6 max-w-4xl mx-auto"
          >
            {t.finalCta.title}
          </h2>

          <p
            style={ctaReveal.getAnimStyle(2)}
            className="text-base sm:text-xl text-neutral-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t.finalCta.subtitle}
          </p>

          <div style={ctaReveal.getAnimStyle(3)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${t.phoneRaw}`}
              className="w-full sm:w-auto px-8 py-5 bg-black text-white text-base md:text-lg font-extrabold uppercase tracking-wider rounded-full hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95 shadow-xl inline-flex items-center justify-center gap-3"
            >
              <svg
                className="w-5 h-5"
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
              <span>{t.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FINAL MINIMAL FOOTER                                                     */}
      {/* ========================================================================= */}
      <footer className="w-full py-12 px-4 md:px-7 bg-neutral-950 text-neutral-400 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="text-xl font-extrabold text-white tracking-tight uppercase">
              {t.brandName} • {t.profession}
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              {t.location} • {t.phoneDisplay}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-neutral-300 uppercase tracking-wider">
            <a href="#hero" className="hover:text-white transition-colors">
              {t.nav.home}
            </a>
            <a href="#services" className="hover:text-white transition-colors">
              {t.nav.services}
            </a>
            <a href="#approach" className="hover:text-white transition-colors">
              {t.nav.approach}
            </a>
            <a href="#patient-care" className="hover:text-white transition-colors">
              {t.nav.care}
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              {t.nav.contact}
            </a>
          </div>

          <div className="text-xs text-neutral-600 font-mono">
            © {new Date().getFullYear()} {t.brandName}. {t.footer.rights}
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* FIXED FLOATING CALL BUTTON (Direct tap to tel:0884970607)                */}
      {/* ========================================================================= */}
      <a
        id="floating-call-btn"
        href={`tel:${t.phoneRaw}`}
        aria-label={`Обадете се: ${t.phoneDisplay}`}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 flex items-center gap-2.5 px-4 py-2.5 md:px-5 md:py-3 rounded-full bg-black text-white hover:bg-neutral-800 shadow-[0_12px_32px_rgba(0,0,0,0.35)] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
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
          {t.phoneDisplay}
        </span>
      </a>
    </div>
  );
}
