import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

// ==========================================
// TYPES & LANGUAGES (BG, EN, TR, RO)
// ==========================================
type Language = 'bg' | 'en' | 'tr' | 'ro';

interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'bg', label: 'Български', flag: '🇧🇬' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'ro', label: 'Română', flag: '🇷🇴' },
];

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
      contact: 'Контакти',
      bookCta: 'Запишете час',
    },
    hero: {
      bars: ['Внимателен подход', 'Прецизно лечение', 'Спокойна обстановка'],
      tag: 'Зъболекар във Варна',
      topSupporting: 'Индивидуален подход и съвременно дентално лечение в спокойна и комфортна обстановка.',
      headlinePart1: 'Внимателна грижа.',
      headlinePart2: 'Прецизно лечение.',
      bottomSupporting: 'Търсите внимателен и прецизен зъболекар във Варна? Предлагам индивидуален подход и съвременно стоматологично лечение.',
      cta: 'Запишете час',
    },
    section2: {
      card0Title: 'Дентална грижа',
      card0Subtitle: 'Професионално лечение с индивидуален подход',
      card1Text: 'Работя с внимание към детайла и се стремя всеки пациент да получи ясно обяснение за състоянието си и възможните варианти за лечение.',
      card1Cta: 'Обадете се',
      card2Headline: 'Грижа за\nвашата\nусмивка',
      services: [
        { name: 'Профилактични\nпрегледи и\nконсултации', num: '01', active: true },
        { name: 'Лечение на\nкариес и\nусложнения', num: '02', active: false },
        { name: 'Естетични\nвъзстановявания', num: '03', active: false },
        { name: 'Детска дентална\nмедицина', num: '04', active: false },
      ],
      additionalServices: [
        'Лечение на частично и тотално обеззъбяване',
        'Почистване на зъбен камък',
        'Грижа за бъдещите мами',
      ],
    },
    section3: {
      approachTitle: 'Индивидуален\nподход',
      approachSubtitle: 'Прецизност и внимание към детайла',
      consultationTag: 'Консултация',
      consultationHeadline: 'Ясно обяснение.\nПрецизно лечение.',
      consultationCta: 'Запишете час',
      bannerText: 'Запишете час за консултация и се погрижете навреме за усмивката си.',
      overlay1: 'Вашето\nлечение',
      overlay2: 'Грижа за\nусмивката',
    },
    intro: {
      brand: 'Дариа • Стоматология',
      desc: 'Индивидуален подход и съвременно дентално лечение',
      status: 'Статус',
      loading: 'Зареждане',
      ready: 'Готово',
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
      contact: 'Contact',
      bookCta: 'Book an Appointment',
    },
    hero: {
      bars: ['Attentive Approach', 'Precise Treatment', 'Calm Atmosphere'],
      tag: 'Dentist in Varna',
      topSupporting: 'Individual approach and modern dental care in a calm, comfortable environment.',
      headlinePart1: 'Attentive Care.',
      headlinePart2: 'Precise Treatment.',
      bottomSupporting: 'Looking for an attentive and precise dentist in Varna? I offer an individual approach and modern dentistry.',
      cta: 'Book Appointment',
    },
    section2: {
      card0Title: 'Dental Care',
      card0Subtitle: 'Professional treatment with an individual approach',
      card1Text: 'I work with meticulous attention to detail and ensure every patient receives a clear explanation of their condition and treatment options.',
      card1Cta: 'Call Us',
      card2Headline: 'Care for\nYour\nSmile',
      services: [
        { name: 'Preventive\ncheckups &\nconsultations', num: '01', active: true },
        { name: 'Caries treatment\n& restoration', num: '02', active: false },
        { name: 'Aesthetic\nrestorations', num: '03', active: false },
        { name: 'Pediatric\ndentistry', num: '04', active: false },
      ],
      additionalServices: [
        'Partial and complete tooth loss treatment',
        'Dental calculus scaling & polishing',
        'Care for expectant mothers',
      ],
    },
    section3: {
      approachTitle: 'Individual\nApproach',
      approachSubtitle: 'Precision and attention to detail',
      consultationTag: 'Consultation',
      consultationHeadline: 'Clear explanation.\nPrecise treatment.',
      consultationCta: 'Book Appointment',
      bannerText: 'Book a consultation and take care of your smile in time.',
      overlay1: 'Your\nTreatment',
      overlay2: 'Smile\nCare',
    },
    intro: {
      brand: 'Daria • Dentistry',
      desc: 'Individual approach and modern dental care',
      status: 'Status',
      loading: 'Loading',
      ready: 'Ready',
    },
  },
  tr: {
    brandName: 'Daria',
    profession: 'Diş Hekimi',
    location: 'Varna, Bulgaristan',
    phoneDisplay: '088 497 0607',
    phoneRaw: '0884970607',
    nav: {
      home: 'Ana Sayfa',
      services: 'Hizmetler',
      approach: 'Yaklaşım',
      contact: 'İletişim',
      bookCta: 'Randevu Alın',
    },
    hero: {
      bars: ['Özenli Yaklaşım', 'Hassas Tedavi', 'Huzurlu Ortam'],
      tag: "Varna'da Diş Hekimi",
      topSupporting: 'Huzurlu ve konforlu bir ortamda kişiye özel yaklaşım ve modern diş tedavisi.',
      headlinePart1: 'Özenli Bakım.',
      headlinePart2: 'Hassas Tedavi.',
      bottomSupporting: "Varna'da özenli ve hassas bir diş hekimi mi arıyorsunuz? Kişiye özel yaklaşım ve modern tedavi sunuyorum.",
      cta: 'Randevu Alın',
    },
    section2: {
      card0Title: 'Diş Bakımı',
      card0Subtitle: 'Kişiye özel yaklaşımla profesyonel tedavi',
      card1Text: 'Detaylara özen göstererek çalışıyor ve her hastanın durumu ile olası tedavi seçenekleri hakkında net bilgi almasını sağlıyorum.',
      card1Cta: 'Bizi Arayın',
      card2Headline: 'Gülüşünüz\nİçin\nÖzen',
      services: [
        { name: 'Önleyici\nmuayene ve\ndanışmanlık', num: '01', active: true },
        { name: 'Çürük tedavisi\nve dolgu\nişlemleri', num: '02', active: false },
        { name: 'Estetik\ndiş restorasyonu', num: '03', active: false },
        { name: 'Çocuk diş\nhekimliği', num: '04', active: false },
      ],
      additionalServices: [
        'Kısmi ve tam dişsizlik tedavisi',
        'Diş taşı temizliği ve parlatma',
        'Anne adayları için özel bakım',
      ],
    },
    section3: {
      approachTitle: 'Kişiye Özel\nYaklaşım',
      approachSubtitle: 'Hassasiyet ve detaylara özen',
      consultationTag: 'Danışmanlık',
      consultationHeadline: 'Net açıklama.\nHassas tedavi.',
      consultationCta: 'Randevu Alın',
      bannerText: 'Danışmanlık randevunuzu alın ve gülüşünüze zamanında özen gösterin.',
      overlay1: 'Tedavi\nSüreci',
      overlay2: 'Gülüş\nBakımı',
    },
    intro: {
      brand: 'Daria • Diş Hekimliği',
      desc: 'Kişiye özel yaklaşım ve modern diş tedavisi',
      status: 'Durum',
      loading: 'Yükleniyor',
      ready: 'Hazır',
    },
  },
  ro: {
    brandName: 'Daria',
    profession: 'Medic Stomatolog',
    location: 'Varna, Bulgaria',
    phoneDisplay: '088 497 0607',
    phoneRaw: '0884970607',
    nav: {
      home: 'Acasă',
      services: 'Servicii',
      approach: 'Abordare',
      contact: 'Contact',
      bookCta: 'Programare',
    },
    hero: {
      bars: ['Abordare atentă', 'Tratament precis', 'Atmosferă calmă'],
      tag: 'Medic Stomatolog în Varna',
      topSupporting: 'Abordare individuală și tratamente stomatologice moderne într-o atmosferă calmă și confortabilă.',
      headlinePart1: 'Îngrijire atentă.',
      headlinePart2: 'Tratament precis.',
      bottomSupporting: 'Căutați un medic stomatolog atent și precis în Varna? Ofer abordare individualizată și tratamente moderne.',
      cta: 'Programare',
    },
    section2: {
      card0Title: 'Îngrijire Dentară',
      card0Subtitle: 'Tratament profesional cu abordare individuală',
      card1Text: 'Lucrez cu atenție meticuloasă la detalii și mă asigur că fiecare pacient primește o explicație clară a stării sale și a opțiunilor de tratament.',
      card1Cta: 'Sunați-ne',
      card2Headline: 'Grijă pentru\nzâmbetul\ndvs.',
      services: [
        { name: 'Consultații și\ncontroale\nprofilactice', num: '01', active: true },
        { name: 'Tratamentul\ncariilor și\ncomplicațiilor', num: '02', active: false },
        { name: 'Restaurări\nestetice', num: '03', active: false },
        { name: 'Stomatologie\npediatrică', num: '04', active: false },
      ],
      additionalServices: [
        'Tratamentul edentației parțiale și totale',
        'Detartraj și igienizare profesională',
        'Îngrijire pentru viitoarele mămici',
      ],
    },
    section3: {
      approachTitle: 'Abordare\nIndividuală',
      approachSubtitle: 'Precizie și atenție la detalii',
      consultationTag: 'Consultație',
      consultationHeadline: 'Explicație clară.\nTratament precis.',
      consultationCta: 'Programare',
      bannerText: 'Programați o consultație și aveți grijă din timp de zâmbetul dumneavoastră.',
      overlay1: 'Tratamentul\nDvs.',
      overlay2: 'Îngrijirea\nZâmbetului',
    },
    intro: {
      brand: 'Daria • Stomatologie',
      desc: 'Abordare individuală și tratamente stomatologice moderne',
      status: 'Status',
      loading: 'Se încarcă',
      ready: 'Gata',
    },
  },
};

// ==========================================
// IMAGE URLS (High-end Dental Visuals)
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
// REACT BITS: MAGNETIC COMPONENT
// ==========================================
interface MagneticProps {
  children: React.ReactElement;
  strength?: number;
  className?: string;
}

const Magnetic: React.FC<MagneticProps> = ({
  children,
  strength = 0.35,
  className = '',
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const moveX = (clientX - centerX) * strength;
    const moveY = (clientY - centerY) * strength;
    setPosition({ x: moveX, y: moveY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
    >
      {children}
    </div>
  );
};

// ==========================================
// REACT BITS: SPOTLIGHT CARD COMPONENT
// ==========================================
interface SpotlightCardProps {
  children?: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  style?: React.CSSProperties;
  cardRef?: (el: HTMLElement | null) => void;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.18)',
  style = {},
  cardRef,
}) => {
  const localRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!localRef.current) return;
    const rect = localRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={(el) => {
        localRef.current = el;
        if (cardRef) cardRef(el);
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden group ${className}`}
      style={style}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};

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
// MASKED CARD WITH SPOTLIGHT EFFECT
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
  spotlightColor?: string;
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
  spotlightColor = 'rgba(255, 255, 255, 0.16)',
}) => {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!innerRef.current) return;
    const rect = innerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={(el) => {
        innerRef.current = el;
        if (cardRef) cardRef(el);
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group overflow-hidden ${className}`}
      style={{
        ...maskStyle,
        ...style,
      }}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};

// ==========================================
// PREMIUM MOTIONSITES-STYLE INTRO
// ==========================================
interface SplashScreenProps {
  onComplete: () => void;
  currentLang: Language;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, currentLang }) => {
  const [phase, setPhase] = useState<'enter' | 'counting' | 'completed' | 'revealing'>('enter');
  const [count, setCount] = useState(0);
  const t = CONTENT[currentLang];

  useEffect(() => {
    const timerPhase1 = setTimeout(() => {
      setPhase('counting');
    }, 450);

    const startTime = Date.now() + 450;
    const duration = 1150;

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
            }, 750);
          }, 180);
          return;
        }
      }

      animFrame = requestAnimationFrame(updateCounter);
    };

    const startTimer = setTimeout(() => {
      animFrame = requestAnimationFrame(updateCounter);
    }, 450);

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
      {/* Top Bar */}
      <div
        className={`flex items-center justify-between text-xs sm:text-sm font-semibold tracking-wider transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          phase === 'enter' ? 'opacity-0 -translate-y-3' : 'opacity-100 translate-y-0'
        }`}
      >
        <span className="uppercase tracking-[0.2em] text-neutral-800">
          {t.intro.brand}
        </span>
        <span className="uppercase tracking-[0.2em] text-neutral-500 font-mono text-[11px] sm:text-xs">
          {t.location}
        </span>
      </div>

      {/* Center Main Typography */}
      <div className="my-auto flex flex-col items-center justify-center text-center">
        <div
          className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            phase === 'enter'
              ? 'opacity-0 translate-y-6 scale-95'
              : 'opacity-100 translate-y-0 scale-100'
          }`}
        >
          <div className="text-[clamp(2.5rem,8vw,7rem)] font-extrabold uppercase tracking-tight leading-[0.85] text-black">
            {t.brandName}
          </div>
          <div className="text-[clamp(1.8rem,5.5vw,5rem)] font-extrabold uppercase tracking-tight leading-[0.88] text-neutral-800 -mt-1 md:-mt-3">
            {t.profession}
          </div>
        </div>

        <p
          className={`text-xs sm:text-sm font-medium text-neutral-500 max-w-xs sm:max-w-md mt-4 transition-all duration-700 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            phase === 'enter' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          {t.intro.desc}
        </p>
      </div>

      {/* Bottom Bar Counter */}
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
            {t.intro.status}
          </span>
          <span className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider mt-0.5">
            {count < 100 ? t.intro.loading : t.intro.ready}
          </span>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// NAVBAR WITH FLAGS & LANGUAGE SELECTOR
// ==========================================
interface NavbarProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentLang, onSelectLang }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement | null>(null);
  const t = CONTENT[currentLang];

  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    { label: t.nav.contact, href: '#approach' },
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
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 py-2.5 md:py-3.5 bg-white/85 backdrop-blur-md border-b border-neutral-100 transition-all">
        {/* Logo Left */}
        <Magnetic strength={0.25}>
          <a href="#hero" className="flex flex-col select-none group cursor-pointer">
            <div className="text-xl md:text-2xl font-extrabold uppercase tracking-tight leading-none text-black group-hover:text-neutral-700 transition-colors">
              {t.brandName}
            </div>
            <div className="text-xl md:text-2xl font-extrabold uppercase tracking-tight leading-none text-black -mt-1.5 md:-mt-2 group-hover:text-neutral-700 transition-colors">
              {t.profession}
            </div>
            <span className="text-[8px] md:text-[9px] font-medium leading-none mt-1.5 md:mt-2 text-neutral-600 uppercase tracking-wider">
              {t.location}
            </span>
          </a>
        </Magnetic>

        {/* Right Section: Language Selector with Flags + Actions */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
          {/* Flag & Language Selector (BG, EN, TR, RO) */}
          <div ref={langMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-xs font-bold text-black transition-all cursor-pointer border border-neutral-200/80 shadow-sm"
              aria-label="Смени езика / Change language"
            >
              <span className="text-base leading-none">{currentLangObj.flag}</span>
              <span className="font-mono uppercase text-[11px] font-extrabold">
                {currentLangObj.code}
              </span>
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${
                  langDropdownOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Language Dropdown Menu */}
            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-38 bg-white rounded-2xl shadow-2xl border border-neutral-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      onSelectLang(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold transition-colors text-left cursor-pointer ${
                      currentLang === lang.code
                        ? 'bg-neutral-100 text-black font-bold'
                        : 'text-neutral-700 hover:bg-neutral-50 hover:text-black'
                    }`}
                  >
                    <span className="text-base leading-none">{lang.flag}</span>
                    <span className="flex-1">{lang.label}</span>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">
                      {lang.code}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Nav CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Magnetic strength={0.3}>
              <a
                href={`tel:${t.phoneRaw}`}
                className="text-xs md:text-sm font-semibold text-black hover:text-neutral-600 transition-colors px-3 py-1.5 rounded-full hover:bg-neutral-100"
              >
                {t.nav.bookCta}
              </a>
            </Magnetic>

            <Magnetic strength={0.4}>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="px-5 py-2.5 bg-white rounded-full border border-black text-xs md:text-sm font-semibold text-black hover:bg-black hover:text-white transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
              >
                Menu
              </button>
            </Magnetic>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Отвори меню"
              className="w-9 h-9 flex items-center justify-center relative cursor-pointer"
            >
              <span
                className={`absolute h-0.5 w-5 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  menuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
                }`}
              />
              <span
                className={`absolute h-0.5 w-5 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  menuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                }`}
              />
              <span
                className={`absolute h-0.5 w-5 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  menuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col justify-between h-full px-7 py-12 pt-20">
            <div className="flex flex-col gap-2">
              {navLinks.map((item, i) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleScroll(item.href)}
                  className={`text-left text-3xl font-bold text-black hover:text-neutral-500 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] cursor-pointer py-1 ${
                    menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                  style={{
                    transitionDelay: menuOpen ? `${100 + i * 60}ms` : '0ms',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Language Switcher Strip */}
            <div className="flex flex-col gap-4 pt-6 border-t border-neutral-200">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Език / Language
              </span>
              <div className="grid grid-cols-2 gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => onSelectLang(lang.code)}
                    className={`flex items-center gap-2 p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      currentLang === lang.code
                        ? 'bg-black text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <div className="text-xs font-semibold text-neutral-500 mb-1">
                  {t.location} • {t.phoneDisplay}
                </div>
                <a
                  href={`tel:${t.phoneRaw}`}
                  onClick={() => setMenuOpen(false)}
                  className="block w-full py-3.5 bg-black rounded-full text-white text-xs font-bold uppercase tracking-wider text-center hover:bg-neutral-800 transition-colors shadow-md"
                >
                  {t.nav.bookCta}
                </a>
              </div>
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
  const [currentLang, setCurrentLang] = useState<Language>('bg');
  const t = CONTENT[currentLang];
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
      {showSplash && (
        <SplashScreen
          currentLang={currentLang}
          onComplete={() => setShowSplash(false)}
        />
      )}

      {/* 2. FIXED NAVBAR WITH FLAGS */}
      <Navbar currentLang={currentLang} onSelectLang={setCurrentLang} />

      {/* ========================================================================= */}
      {/* SECTION 1 — HERO                                                          */}
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
        {t.hero.bars.map((text, i) => (
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
          {/* Top-left supporting text */}
          <div className="absolute top-4 left-4 md:top-7 md:left-7 text-black text-xs md:text-sm font-semibold leading-4 md:leading-5 max-w-[240px] md:max-w-[340px] z-10">
            {t.hero.topSupporting}
          </div>

          {/* Bottom-left block */}
          <div className="absolute bottom-5 left-3 md:bottom-8 md:left-4 z-10">
            <span className="block text-black text-xs md:text-sm font-semibold mb-1 md:mb-2">
              {t.hero.tag}
            </span>
            <h1 className="text-black text-[clamp(2.8rem,9.5vw,9.5rem)] font-bold leading-[0.82] tracking-tight">
              {t.hero.headlinePart1}
              <br />
              {t.hero.headlinePart2}
            </h1>
            <p className="text-black/80 text-[11px] md:text-xs font-medium mt-2 max-w-[300px] md:max-w-[420px] leading-relaxed">
              {t.hero.bottomSupporting}
            </p>
          </div>

          {/* Bottom-right CTA */}
          <Magnetic strength={0.3} className="absolute bottom-6 right-4 md:bottom-10 md:right-8 z-10">
            <a
              href={`tel:${t.phoneRaw}`}
              className="text-white text-xs md:text-sm font-semibold hover:underline transition-all bg-black/40 md:bg-transparent px-3 py-1.5 md:p-0 rounded-full md:rounded-none backdrop-blur-sm md:backdrop-blur-none inline-block"
            >
              {t.hero.cta}
            </a>
          </Magnetic>
        </MaskedCard>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2 — SERVICES / DENTAL CARE                                        */}
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
          {/* Card 0 - Top Left */}
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
              {t.section2.card0Title}
            </h2>
            <p className="absolute bottom-4 left-5 md:bottom-6 md:left-7 text-white md:text-black text-xs md:text-sm font-semibold z-10">
              {t.section2.card0Subtitle}
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
              {t.section2.card1Text}
            </div>
            <Magnetic strength={0.3} className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-10">
              <a
                href={`tel:${t.phoneRaw}`}
                className="px-5 py-3 md:px-8 md:py-5 bg-white rounded-full text-black text-base md:text-xl font-bold hover:scale-105 transition-transform cursor-pointer shadow-md inline-block"
              >
                {t.section2.card1Cta}
              </a>
            </Magnetic>
          </MaskedCard>

          {/* Card 2 - Bottom Left */}
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
            <h2 className="absolute top-4 left-5 md:top-6 md:left-7 text-white md:text-black text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.9] z-10 whitespace-pre-line">
              {t.section2.card2Headline}
            </h2>
          </MaskedCard>

          {/* Card 3 - Bottom Full Width (7 Services Total) */}
          <MaskedCard
            bgImage={SECTION2_IMAGE}
            position={s2Mask.positions[3]}
            imageWidth={s2ImageWidth}
            focalX={s2FocalX}
            cardRef={(el) => {
              s2CardRefs.current[3] = el;
            }}
            style={s2Reveal.getAnimStyle(3)}
            className="col-span-1 md:col-span-2 rounded-xl md:rounded-2xl overflow-hidden relative min-h-[240px] md:min-h-0 shadow-sm"
          >
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-2 md:p-3">
              {/* 4 Primary Service Sub-Cards with Spotlight */}
              <div className="flex flex-wrap md:flex-nowrap gap-1.5 md:gap-2 flex-1">
                {t.section2.services.map((svc) => (
                  <SpotlightCard
                    key={svc.num}
                    spotlightColor={svc.active ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.25)'}
                    className={`flex-1 min-w-[calc(50%-4px)] md:min-w-0 rounded-xl md:rounded-2xl p-3 md:p-5 flex flex-col justify-between ${
                      svc.active
                        ? 'bg-white/90 backdrop-blur-md shadow-md'
                        : 'bg-white/20 backdrop-blur-xl'
                    }`}
                  >
                    <h3
                      className={`text-sm sm:text-base md:text-2xl font-bold leading-[1.12] whitespace-pre-line ${
                        svc.active ? 'text-black' : 'text-white'
                      }`}
                    >
                      {svc.name}
                    </h3>

                    {svc.num && (
                      <div
                        className={`self-end w-7 h-7 md:w-10 md:h-10 rounded-full border flex items-center justify-center text-xs md:text-sm font-semibold mt-2 ${
                          svc.active
                            ? 'border-black text-black'
                            : 'border-white text-white'
                        }`}
                      >
                        {svc.num}
                      </div>
                    )}
                  </SpotlightCard>
                ))}
              </div>

              {/* 3 Additional Verified Services Strip */}
              <div className="mt-1 px-3 py-2 rounded-xl bg-black/50 backdrop-blur-md flex flex-wrap items-center justify-between gap-2 text-[10.5px] md:text-xs font-semibold text-white/95">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  05. {t.section2.additionalServices[0]}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  06. {t.section2.additionalServices[1]}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  07. {t.section2.additionalServices[2]}
                </span>
              </div>
            </div>
          </MaskedCard>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 — APPROACH & CONSULTATION                                       */}
      {/* ========================================================================= */}
      <section
        ref={(el) => {
          s3Reveal.containerRef.current = el;
        }}
        id="approach"
        className="min-h-screen md:h-screen w-full overflow-y-auto md:overflow-hidden flex flex-col pt-2 md:pt-2 px-3 md:px-5 pb-20 md:pb-2 gap-2 md:gap-2"
      >
        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-2">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-2 md:gap-2 h-full">
            {/* 1. Heading Card with Spotlight */}
            <SpotlightCard
              spotlightColor="rgba(0, 0, 0, 0.05)"
              style={s3Reveal.getAnimStyle(0)}
              className="rounded-xl md:rounded-2xl bg-stone-50 p-5 sm:p-6 md:p-7 flex flex-col justify-between flex-[1.1] min-h-[160px] md:min-h-0 shadow-sm border border-black/5"
            >
              <h2 className="text-[clamp(2.4rem,5.5vw,5.5rem)] font-bold leading-[0.95] text-black whitespace-pre-line">
                {t.section3.approachTitle}
              </h2>
              <p className="text-xs md:text-sm font-semibold text-black/80 mt-3">
                {t.section3.approachSubtitle}
              </p>
            </SpotlightCard>

            {/* 2. Two Image Cards (Side by Side) */}
            <div
              style={s3Reveal.getAnimStyle(1)}
              className="flex gap-2 md:gap-2 flex-1 min-h-[140px] md:min-h-0"
            >
              {/* Left Image: Real Clinical Before/After Case */}
              <SpotlightCard
                spotlightColor="rgba(255, 255, 255, 0.25)"
                className="flex-1 rounded-xl md:rounded-2xl overflow-hidden bg-neutral-900 shadow-sm relative group border border-black/5"
              >
                <img
                  src={SECTION3_IMG1}
                  alt="Clinical result before and after"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </SpotlightCard>

              {/* Right Image: Dental Environment */}
              <SpotlightCard
                spotlightColor="rgba(255, 255, 255, 0.25)"
                className="flex-1 rounded-xl md:rounded-2xl overflow-hidden bg-neutral-900 shadow-sm relative group border border-black/5"
              >
                <img
                  src={SECTION3_IMG2}
                  alt="Dental clinic practice"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </SpotlightCard>
            </div>

            {/* 3. Consultation Card with Highly Visible Button */}
            <SpotlightCard
              spotlightColor="rgba(0, 0, 0, 0.08)"
              style={s3Reveal.getAnimStyle(2)}
              className="rounded-xl md:rounded-2xl bg-zinc-200 p-5 sm:p-6 md:p-7 flex flex-col sm:flex-row sm:items-end justify-between gap-4 flex-[0.9] min-h-[160px] md:min-h-0 shadow-sm border border-black/5"
            >
              <div className="flex flex-col">
                <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-black/70 mb-1 md:mb-2">
                  {t.section3.consultationTag}
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black leading-tight whitespace-pre-line">
                  {t.section3.consultationHeadline}
                </h3>
              </div>
              <Magnetic strength={0.35} className="shrink-0">
                <a
                  href={`tel:${t.phoneRaw}`}
                  className="w-full sm:w-auto px-6 py-3 sm:px-7 sm:py-4 md:px-8 md:py-4 bg-black text-white rounded-full text-sm sm:text-base md:text-lg font-bold hover:bg-neutral-800 transition-all cursor-pointer shadow-lg inline-flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
                >
                  <span>{t.section3.consultationCta}</span>
                  <span>→</span>
                </a>
              </Magnetic>
            </SpotlightCard>
          </div>

          {/* RIGHT COLUMN: Single tall image card with clear overlays */}
          <div
            style={s3Reveal.getAnimStyle(3)}
            className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[420px] md:min-h-0 shadow-sm bg-neutral-900 border border-black/5"
          >
            <img
              src={SECTION3_BG}
              alt="Smiling patient"
              className="w-full h-full object-cover"
              loading="lazy"
            />

            {/* Top Info Banner */}
            <div className="absolute top-3 left-3 right-3 sm:top-5 sm:left-5 sm:right-5 bg-black/75 backdrop-blur-md rounded-xl p-3.5 sm:p-4 text-white z-10 border border-white/15 shadow-lg">
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-neutral-300 uppercase block mb-1">
                {t.location} • {t.phoneDisplay}
              </span>
              <p className="text-xs sm:text-sm font-bold leading-snug">
                {t.section3.bannerText}
              </p>
            </div>

            {/* Overlay Cards Bottom */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex gap-2 md:gap-2">
              {/* Overlay Card 1 (White, Left) */}
              <a
                href={`tel:${t.phoneRaw}`}
                className="flex-1 bg-white hover:bg-neutral-100 rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 flex flex-col justify-between h-28 sm:h-36 md:h-48 shadow-xl transition-all hover:scale-[1.02] border border-black/5 group cursor-pointer"
              >
                <h4 className="text-sm sm:text-lg md:text-2xl font-bold text-black leading-tight whitespace-pre-line">
                  {t.section3.overlay1}
                </h4>
                <div className="self-end w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="rotate-[-45deg] sm:w-3.5 sm:h-3.5"
                  >
                    <path
                      d="M1 7h12m0 0L8 2m5 5L8 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </a>

              {/* Overlay Card 2 (Glass, Right) */}
              <a
                href={`tel:${t.phoneRaw}`}
                className="flex-1 bg-black/60 hover:bg-black/75 backdrop-blur-xl rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 flex flex-col justify-between h-28 sm:h-36 md:h-48 shadow-xl transition-all hover:scale-[1.02] border border-white/20 group cursor-pointer"
              >
                <h4 className="text-sm sm:text-lg md:text-2xl font-bold text-white leading-tight whitespace-pre-line">
                  {t.section3.overlay2}
                </h4>
                <div className="self-end w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="rotate-[-45deg] sm:w-3.5 sm:h-3.5"
                  >
                    <path
                      d="M1 7h12m0 0L8 2m5 5L8 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING CALL BUTTON WITH MAGNETIC REACTION */}
      <Magnetic strength={0.4} className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        <a
          id="floating-call-btn"
          href={`tel:${t.phoneRaw}`}
          aria-label={`Обадете се: ${t.phoneDisplay}`}
          className="flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 md:px-5 md:py-3.5 rounded-full bg-black text-white hover:bg-neutral-800 shadow-[0_12px_32px_rgba(0,0,0,0.5)] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer border border-white/25"
        >
          <svg
            className="w-4 h-4 shrink-0"
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
          <span className="text-xs sm:text-sm font-bold tracking-wider whitespace-nowrap">
            {t.phoneDisplay}
          </span>
        </a>
      </Magnetic>
    </div>
  );
}
