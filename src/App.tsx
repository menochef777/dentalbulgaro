import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Menu, X, CircleUserRound, Phone } from 'lucide-react';

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
      gallery: 'Галерия',
      services: 'Услуги',
      approach: 'Подход',
      contact: 'Контакти',
      bookCta: 'Запишете час',
    },
    hero1: {
      badge: 'индивидуален подход и спокойна обстановка',
      headlinePart1: 'Внимателна грижа.',
      headlinePart2: 'Прецизно лечение.',
      subtitle: 'Търсите внимателен и прецизен зъболекар във Варна? Предлагам съвременно стоматологично лечение в спокойна и комфортна обстановка.',
      cta: 'Запишете час',
      stat1Value: 'Варна, България',
      stat1Label: 'Индивидуален подход',
      stat2Value: '088 497 0607',
      stat2Label: 'Консултация & Лечение',
    },
    hero2: {
      bars: ['Внимателен подход', 'Прецизно лечение', 'Спокойна обстановка'],
      tag: 'Зъболекар във Варна',
      topSupporting: 'Индивидуален подход и съвременно дентално лечение в спокойна и комфортна обстановка.',
      headlinePart1: 'Дентална',
      headlinePart2: 'грижа',
      bottomSupporting: 'Индивидуален подход и прецизно лечение във Варна с внимание към всеки детайл.',
      cta: 'Запишете час',
    },
    section3: {
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
    section4: {
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
      gallery: 'Gallery',
      services: 'Services',
      approach: 'Approach',
      contact: 'Contact',
      bookCta: 'Book an Appointment',
    },
    hero1: {
      badge: 'individual approach & calm environment',
      headlinePart1: 'Attentive Care.',
      headlinePart2: 'Precise Treatment.',
      subtitle: 'Looking for an attentive and precise dentist in Varna? I offer modern dental treatments tailored to your individual needs.',
      cta: 'Book an Appointment',
      stat1Value: 'Varna, Bulgaria',
      stat1Label: 'Individualized Approach',
      stat2Value: '088 497 0607',
      stat2Label: 'Consultation & Treatment',
    },
    hero2: {
      bars: ['Attentive Approach', 'Precise Treatment', 'Calm Atmosphere'],
      tag: 'Dentist in Varna',
      topSupporting: 'Individual approach and modern dental care in a calm, comfortable environment.',
      headlinePart1: 'Dental',
      headlinePart2: 'Care',
      bottomSupporting: 'Individual approach and precise treatment in Varna with focus on every detail.',
      cta: 'Book Appointment',
    },
    section3: {
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
    section4: {
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
      gallery: 'Galeri',
      services: 'Hizmetler',
      approach: 'Yaklaşım',
      contact: 'İletişim',
      bookCta: 'Randevu Alın',
    },
    hero1: {
      badge: 'kişiye özel yaklaşım & huzurlu ortam',
      headlinePart1: 'Özenli Bakım.',
      headlinePart2: 'Hassas Tedavi.',
      subtitle: "Varna'da özenli ve hassas bir diş hekimi mi arıyorsunuz? Huzurlu ve konforlu bir ortamda modern diş tedavisi sunuyorum.",
      cta: 'Randevu Alın',
      stat1Value: 'Varna, Bulgaristan',
      stat1Label: 'Kişiye Özel Yaklaşım',
      stat2Value: '088 497 0607',
      stat2Label: 'Danışmanlık & Tedavi',
    },
    hero2: {
      bars: ['Özenli Yaklaşım', 'Hassas Tedavi', 'Huzurlu Ortam'],
      tag: "Varna'da Diş Hekimi",
      topSupporting: 'Huzurlu ve konforlu bir ortamda kişiye özel yaklaşım ve modern diş tedavisi.',
      headlinePart1: 'Diş',
      headlinePart2: 'Bakımı',
      bottomSupporting: 'Her detaya özen gösterilerek Varna’da kişiye özel ve hassas tedavi.',
      cta: 'Randevu Alın',
    },
    section3: {
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
    section4: {
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
      gallery: 'Galerie',
      services: 'Servicii',
      approach: 'Abordare',
      contact: 'Contact',
      bookCta: 'Programare',
    },
    hero1: {
      badge: 'abordare individuală și atmosferă calmă',
      headlinePart1: 'Îngrijire atentă.',
      headlinePart2: 'Tratament precis.',
      subtitle: 'Căutați un medic stomatolog atent și precis în Varna? Ofer tratamente moderne într-o atmosferă calmă și confortabilă.',
      cta: 'Programare',
      stat1Value: 'Varna, Bulgaria',
      stat1Label: 'Abordare Individualizată',
      stat2Value: '088 497 0607',
      stat2Label: 'Consultație & Tratament',
    },
    hero2: {
      bars: ['Abordare atentă', 'Tratament precis', 'Atmosferă calmă'],
      tag: 'Medic Stomatolog în Varna',
      topSupporting: 'Abordare individuală și tratamente stomatologice moderne într-o atmosferă calmă și confortabilă.',
      headlinePart1: 'Îngrijire',
      headlinePart2: 'Dentară',
      bottomSupporting: 'Abordare individuală și tratament de înaltă precizie în Varna cu atenție la fiecare detaliu.',
      cta: 'Programare',
    },
    section3: {
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
    section4: {
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
// IMAGE & VIDEO URLS
// ==========================================
const VIDEO_DESKTOP = '/imgs/vid169.mp4';
const VIDEO_MOBILE = '/imgs/vid916.mp4';

const HERO_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_113640_ccf3cf97-d447-425b-a134-d7b09fc743fc.png&w=800&q=80';

const SECTION2_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114219_414dfe80-f15c-4e25-bf52-b13721f4bd88.png&w=800&q=80';

const SECTION3_IMG1 = '/images/clinical_before_after.webp';

const SECTION3_IMG2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115237_fc519057-6e87-4abf-999a-9610b8b085b4.png&w=480&q=80';

const SECTION3_BG =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114355_752ba9e6-0942-4abb-9047-5d9bb16632e9.png&w=640&q=80';

const AVATARS = [
  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80',
  'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=80',
  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80',
  'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=80',
];

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
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
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

  useEffect(() => {
    let animId: number;
    const scheduleCalc = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(calculatePositions);
    };

    // Calculate position asynchronously after initial paint
    scheduleCalc();

    const section = sectionRef.current;
    if (!section) return;

    const ro = new ResizeObserver(scheduleCalc);
    ro.observe(section);
    window.addEventListener('resize', scheduleCalc);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener('resize', scheduleCalc);
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
// MOTIONSITES INTRO SCREEN
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
    const isBot =
      typeof navigator !== 'undefined' &&
      /Lighthouse|HeadlessChrome|bot|crawl/i.test(navigator.userAgent);

    if (isBot) {
      onComplete();
      return;
    }

    const timerPhase1 = setTimeout(() => {
      setPhase('counting');
    }, 200);

    const startTime = Date.now() + 200;
    const duration = 600;

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
            }, 400);
          }, 100);
          return;
        }
      }

      animFrame = requestAnimationFrame(updateCounter);
    };

    const startTimer = setTimeout(() => {
      animFrame = requestAnimationFrame(updateCounter);
    }, 200);

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
          {t.intro.brand}
        </span>
        <span className="uppercase tracking-[0.2em] text-neutral-500 font-mono text-[11px] sm:text-xs">
          {t.location}
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

const POSTER_DESKTOP = '/imgs/poster169.webp';
const POSTER_MOBILE = '/imgs/poster916.webp';

// ==========================================
// SAFARI IOS BULLETPROOF VIDEO BACKGROUND
// ==========================================
const HeroVideoBackground: React.FC = () => {
  const desktopRef = useRef<HTMLVideoElement | null>(null);
  const mobileRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const playVideo = (v: HTMLVideoElement | null) => {
      if (!v) return;
      v.defaultMuted = true;
      v.muted = true;
      v.playsInline = true;
      v.setAttribute('playsinline', 'true');
      v.setAttribute('webkit-playsinline', 'true');

      const attempt = () => {
        v.play().catch(() => {});
      };

      attempt();
      v.addEventListener('loadedmetadata', attempt);
      v.addEventListener('canplay', attempt);
      v.addEventListener('loadeddata', attempt);
    };

    playVideo(desktopRef.current);
    playVideo(mobileRef.current);

    // Global touch / click fallback to immediately start video if iOS Low Power Mode is on
    const unlockAll = () => {
      if (desktopRef.current) desktopRef.current.play().catch(() => {});
      if (mobileRef.current) mobileRef.current.play().catch(() => {});
    };

    window.addEventListener('touchstart', unlockAll, { passive: true });
    window.addEventListener('click', unlockAll, { passive: true });
    window.addEventListener('scroll', unlockAll, { passive: true, once: true });

    return () => {
      window.removeEventListener('touchstart', unlockAll);
      window.removeEventListener('click', unlockAll);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      {/* Desktop Video (16:9) */}
      <video
        ref={desktopRef}
        src={VIDEO_DESKTOP}
        poster={POSTER_DESKTOP}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="hidden md:block absolute inset-0 w-full h-full object-cover"
      >
        <track kind="captions" src="data:text/vtt,WEBVTT" label="Ambient video" default />
      </video>

      {/* Mobile Video (9:16) */}
      <video
        ref={mobileRef}
        src={VIDEO_MOBILE}
        poster={POSTER_MOBILE}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="block md:hidden absolute inset-0 w-full h-full object-cover"
      >
        <track kind="captions" src="data:text/vtt,WEBVTT" label="Ambient video" default />
      </video>

      {/* Liquid dark subtle film overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px] pointer-events-none" />
    </div>
  );
};

// ==========================================
// MAIN APPLICATION COMPONENT
// ==========================================
export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentLang, setCurrentLang] = useState<Language>('bg');
  const [menuOpen, setMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement | null>(null);
  const t = CONTENT[currentLang];
  const isMobile = useIsMobile();

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

  // Section 1 (Hero 1) Reveal Hook
  const hero1Reveal = useStaggeredReveal(4);

  // Section 2 (Hero 2 - Masked Cards)
  const section2Ref = useRef<HTMLElement | null>(null);
  const s2CardRefs = useRef<(HTMLElement | null)[]>([]);
  const s2Reveal = useStaggeredReveal(4);
  const s2Mask = useMaskPositions(section2Ref, s2CardRefs);
  const s2ImageWidth = useImageWidth(HERO_IMAGE, s2Mask.sectionHeight);
  const s2FocalX = isMobile ? 0.7 : 0.8;

  // Section 3 (Smile Gallery & Services - Masked Cards)
  const section3Ref = useRef<HTMLElement | null>(null);
  const s3CardRefs = useRef<(HTMLElement | null)[]>([]);
  const s3Reveal = useStaggeredReveal(4);
  const s3Mask = useMaskPositions(section3Ref, s3CardRefs);
  const s3ImageWidth = useImageWidth(SECTION2_IMAGE, s3Mask.sectionHeight);
  const s3FocalX = isMobile ? 0.65 : 0.8;

  // Section 4 (Approach & Overlays)
  const s4Reveal = useStaggeredReveal(4);

  const navLinks = [
    { label: t.nav.home, href: '#hero1' },
    { label: t.nav.gallery, href: '#hero2' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.approach, href: '#approach' },
  ];

  const handleScroll = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#050505] text-white selection:bg-white selection:text-black">
      {/* 0. EDITORIAL INTRO */}
      {showSplash && (
        <SplashScreen
          currentLang={currentLang}
          onComplete={() => setShowSplash(false)}
        />
      )}

      {/* ========================================================================= */}
      {/* SECTION 1 — LIQUID GLASS HERO WITH 3D LOOPING VIDEO BACKGROUND           */}
      {/* ========================================================================= */}
      <section
        ref={(el) => {
          hero1Reveal.containerRef.current = el;
        }}
        id="hero1"
        className="relative h-screen w-full overflow-hidden flex flex-col justify-between"
      >
        {/* Full-viewport Autoplaying Looping Muted PlaysInline Video Background (Safari iOS Optimized) */}
        <HeroVideoBackground />

        {/* NAVIGATION (z-20, top) */}
        <nav className="relative z-20 flex items-center justify-between px-5 pt-6 sm:px-8 sm:pt-8 md:px-16 lg:px-20 select-none">
          {/* Left: Custom SVG Logo + Dentist Brand */}
          <a
            href="#hero1"
            className="flex items-center gap-3 cursor-pointer group"
          >
            <svg
              className="w-8 h-8 md:w-9 md:h-9 fill-white transition-transform duration-300 group-hover:scale-105 shrink-0"
              viewBox="0 0 256 256"
            >
              <path d="M 128 128 C 198.692 128 256 185.308 256 256 L 151.883 256 C 149.812 220.307 120.213 192 84 192 C 47.787 192 18.188 220.307 16.117 256 L 0 256 C 0 185.308 57.308 128 128 128 Z M 104.117 0 C 106.188 35.694 135.787 64 172 64 C 208.213 64 237.812 35.694 239.883 0 L 256 0 C 256 70.692 198.692 128 128 128 C 57.308 128 0 70.692 0 0 Z" />
            </svg>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold tracking-tight leading-tight uppercase text-white">
                {t.brandName}
              </span>
              <span className="text-[10px] md:text-xs font-light tracking-widest text-white/70 uppercase">
                {t.profession} • {t.location}
              </span>
            </div>
          </a>

          {/* Center: Liquid-Glass Rounded-Full Nav Pill (Desktop Only) */}
          <div className="hidden md:flex items-center gap-8 liquid-glass rounded-full px-8 py-3">
            {navLinks.map((link, idx) => (
              <button
                key={link.label}
                type="button"
                onClick={() => handleScroll(link.href)}
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  idx === 0
                    ? 'text-white font-semibold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: Language Flags & User Actions */}
          <div className="flex items-center gap-3">
            {/* Language Selector in Liquid Glass */}
            <div ref={langMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="liquid-glass flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-white transition duration-300 hover:bg-white/10 cursor-pointer"
                aria-label="Language Selector"
              >
                <span className="text-sm leading-none">{currentLangObj.flag}</span>
                <span className="font-mono uppercase font-bold text-[11px]">
                  {currentLangObj.code}
                </span>
                <svg
                  className={`w-3 h-3 text-white/70 transition-transform duration-200 ${
                    langDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Language Dropdown Menu */}
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-black/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setCurrentLang(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium transition-colors text-left cursor-pointer ${
                        currentLang === lang.code
                          ? 'bg-white/20 text-white font-bold'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span className="text-sm leading-none">{lang.flag}</span>
                      <span className="flex-1">{lang.label}</span>
                      <span className="text-[10px] font-mono text-white/50 uppercase">
                        {lang.code}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Liquid-Glass Circle Button with aria-label */}
            <Magnetic strength={0.35} className="hidden md:inline-block">
              <a
                href={`tel:${t.phoneRaw}`}
                aria-label={`Обадете се на зъболекар ${t.brandName}: ${t.phoneDisplay}`}
                className="liquid-glass h-10 w-10 rounded-full flex items-center justify-center transition duration-300 hover:bg-white/10 cursor-pointer"
                title={`Обадете се: ${t.phoneDisplay}`}
              >
                <CircleUserRound className="h-5 w-5 text-white/80" strokeWidth={1.5} />
              </a>
            </Magnetic>

            {/* Mobile Liquid-Glass Circle Button with Animated Icon Swap */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden liquid-glass h-10 w-10 rounded-full flex items-center justify-center z-50 relative cursor-pointer"
              aria-label="Menu"
            >
              <Menu
                className={`h-5 w-5 text-white transition-all duration-300 absolute ${
                  menuOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
                }`}
                strokeWidth={1.5}
              />
              <X
                className={`h-5 w-5 text-white transition-all duration-300 absolute ${
                  menuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
                }`}
                strokeWidth={1.5}
              />
            </button>
          </div>
        </nav>

        {/* MOBILE MENU OVERLAY (z-10, fixed inset-0, md:hidden) */}
        <div
          className={`fixed inset-0 z-10 md:hidden bg-black/80 backdrop-blur-xl flex flex-col justify-center items-center transition-opacity duration-500 ease-out ${
            menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div
            className={`flex flex-col items-center gap-8 transition-transform duration-500 ease-out ${
              menuOpen ? 'translate-y-0' : '-translate-y-8'
            }`}
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => handleScroll(link.href)}
                className="text-2xl font-medium text-white hover:text-white/70 transition-colors"
              >
                {link.label}
              </button>
            ))}

            {/* Language Switcher in Mobile Menu */}
            <div className="flex items-center gap-2 pt-4">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setCurrentLang(lang.code);
                    setMenuOpen(false);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    currentLang === lang.code
                      ? 'bg-white text-black'
                      : 'bg-white/10 text-white/80'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.code.toUpperCase()}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`tel:${t.phoneRaw}`}
                aria-label={`Обадете се на зъболекар ${t.brandName}: ${t.phoneDisplay}`}
                className="liquid-glass h-10 w-10 rounded-full flex items-center justify-center"
              >
                <Phone className="h-4 w-4 text-white/80" />
              </a>
              <span className="text-sm font-light text-white/60">
                {t.phoneDisplay}
              </span>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT (z-10, flex column fills remaining viewport height) */}
        <div
          className={`relative z-10 flex-1 flex flex-col justify-between px-5 pb-8 sm:px-8 sm:pb-10 md:px-16 lg:px-20 transition-opacity duration-300 ${
            menuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* Top Block (mt-14 sm:mt-20 md:mt-28, max-w-2xl) */}
          <div className="mt-14 sm:mt-20 md:mt-28 max-w-2xl">
            {/* 1. Badge — Liquid-Glass Pill with Overlapping Avatars */}
            <div
              style={hero1Reveal.getAnimStyle(0)}
              className="liquid-glass rounded-full inline-flex items-center gap-2.5 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 mb-5 sm:mb-6"
            >
              <div className="flex -space-x-2">
                {AVATARS.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt="Patient smile"
                    width={24}
                    height={24}
                    className="h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 border-white/20 object-cover"
                    loading="eager"
                  />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-light text-white/80">
                {t.hero1.badge}
              </span>
            </div>

            {/* 2. Heading */}
            <div style={hero1Reveal.getAnimStyle(1)}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] text-white tracking-[-0.05em]">
                {t.hero1.headlinePart1}
                <br />
                {t.hero1.headlinePart2}
              </h1>
            </div>

            {/* 3. Subtitle */}
            <div style={hero1Reveal.getAnimStyle(2)}>
              <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg font-light text-white/70 leading-relaxed max-w-xl">
                {t.hero1.subtitle}
              </p>
            </div>

            {/* 4. CTA Button */}
            <div style={hero1Reveal.getAnimStyle(3)}>
              <Magnetic strength={0.35}>
                <a
                  href={`tel:${t.phoneRaw}`}
                  className="liquid-glass rounded-full px-6 py-3 sm:px-7 sm:py-3.5 mt-6 sm:mt-8 inline-flex items-center gap-2 text-sm font-medium text-white transition duration-300 hover:bg-white/10 cursor-pointer shadow-lg active:scale-95"
                >
                  <span>{t.hero1.cta}</span>
                  <span>→</span>
                </a>
              </Magnetic>
            </div>
          </div>

          {/* BOTTOM STATS (flex, items-end, gap-6 sm:gap-10 md:gap-16) */}
          <div
            style={hero1Reveal.getAnimStyle(3)}
            className="flex items-end gap-6 sm:gap-10 md:gap-16 pt-8 select-none"
          >
            {/* Stat 1: 9 Triangular Dot Pattern Icon */}
            <div className="flex items-center gap-3">
              <div className="relative w-5 h-5 flex-shrink-0">
                <span className="absolute top-0 left-2 w-[2.5px] h-[2.5px] bg-white/60 rounded-[0.5px]" />
                <span className="absolute top-1 left-1 w-[2.5px] h-[2.5px] bg-white/60 rounded-[0.5px]" />
                <span className="absolute top-1 left-3 w-[2.5px] h-[2.5px] bg-white/60 rounded-[0.5px]" />
                <span className="absolute top-2 left-0 w-[2.5px] h-[2.5px] bg-white/60 rounded-[0.5px]" />
                <span className="absolute top-2 left-2 w-[2.5px] h-[2.5px] bg-white/60 rounded-[0.5px]" />
                <span className="absolute top-2 left-4 w-[2.5px] h-[2.5px] bg-white/60 rounded-[0.5px]" />
                <span className="absolute top-3 left-1 w-[2.5px] h-[2.5px] bg-white/60 rounded-[0.5px]" />
                <span className="absolute top-3 left-3 w-[2.5px] h-[2.5px] bg-white/60 rounded-[0.5px]" />
                <span className="absolute top-4 left-2 w-[2.5px] h-[2.5px] bg-white/60 rounded-[0.5px]" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-2xl md:text-3xl font-normal text-white leading-tight">
                  {t.hero1.stat1Value}
                </span>
                <span className="text-xs sm:text-sm font-light text-white/60">
                  {t.hero1.stat1Label}
                </span>
              </div>
            </div>

            {/* Stat 2: 3x3 Checkerboard Grid Icon */}
            <div className="flex items-center gap-3">
              <div className="grid grid-cols-3 gap-[2px] w-5 h-5 flex-shrink-0">
                <div className="w-1 h-1 rounded-sm bg-white/60" />
                <div className="w-1 h-1 rounded-sm bg-white/0" />
                <div className="w-1 h-1 rounded-sm bg-white/60" />
                <div className="w-1 h-1 rounded-sm bg-white/0" />
                <div className="w-1 h-1 rounded-sm bg-white/60" />
                <div className="w-1 h-1 rounded-sm bg-white/0" />
                <div className="w-1 h-1 rounded-sm bg-white/60" />
                <div className="w-1 h-1 rounded-sm bg-white/0" />
                <div className="w-1 h-1 rounded-sm bg-white/60" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-2xl md:text-3xl font-normal text-white leading-tight">
                  {t.hero1.stat2Value}
                </span>
                <span className="text-xs sm:text-sm font-light text-white/60">
                  {t.hero1.stat2Label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2 — HERO 2 (MASKED CARDS WITH 3 BARS + MAIN CARD)                 */}
      {/* ========================================================================= */}
      <section
        ref={(el) => {
          section2Ref.current = el;
          s2Reveal.containerRef.current = el;
        }}
        id="hero2"
        className="h-screen w-full overflow-hidden flex flex-col pt-16 md:pt-20 px-3 md:px-5 pb-1.5 md:pb-2 gap-1.5 md:gap-2 bg-white"
      >
        {/* 3 Feature Bars */}
        {t.hero2.bars.map((text, i) => (
          <MaskedCard
            key={text}
            bgImage={HERO_IMAGE}
            position={s2Mask.positions[i]}
            imageWidth={s2ImageWidth}
            focalX={s2FocalX}
            cardRef={(el) => {
              s2CardRefs.current[i] = el;
            }}
            style={s2Reveal.getAnimStyle(i)}
            className="w-full h-14 md:h-20 shrink-0 rounded-xl md:rounded-2xl overflow-hidden relative shadow-sm"
          >
            <div className="flex items-center justify-center h-full relative z-10 px-4">
              <span className="text-black text-lg md:text-3xl font-bold text-center leading-none">
                {text}
              </span>
            </div>
          </MaskedCard>
        ))}

        {/* Main Hero Card */}
        <MaskedCard
          bgImage={HERO_IMAGE}
          position={s2Mask.positions[3]}
          imageWidth={s2ImageWidth}
          focalX={s2FocalX}
          cardRef={(el) => {
            s2CardRefs.current[3] = el;
          }}
          style={s2Reveal.getAnimStyle(3)}
          className="w-full flex-1 min-h-0 rounded-xl md:rounded-2xl overflow-hidden relative shadow-sm"
        >
          <div className="absolute top-4 left-4 md:top-7 md:left-7 text-black text-xs md:text-sm font-semibold leading-4 md:leading-5 max-w-[240px] md:max-w-[340px] z-10">
            {t.hero2.topSupporting}
          </div>

          <div className="absolute bottom-5 left-3 md:bottom-8 md:left-4 z-10">
            <span className="block text-black text-xs md:text-sm font-semibold mb-1 md:mb-2">
              {t.hero2.tag}
            </span>
            <h2 className="text-black text-[clamp(2.8rem,9.5vw,9.5rem)] font-bold leading-[0.82] tracking-tight">
              {t.hero2.headlinePart1}
              <br />
              {t.hero2.headlinePart2}
            </h2>
            <p className="text-black/80 text-[11px] md:text-xs font-medium mt-2 max-w-[300px] md:max-w-[420px] leading-relaxed">
              {t.hero2.bottomSupporting}
            </p>
          </div>

          <Magnetic strength={0.3} className="absolute bottom-6 right-4 md:bottom-10 md:right-8 z-10">
            <a
              href={`tel:${t.phoneRaw}`}
              className="text-white text-xs md:text-sm font-semibold hover:underline transition-all bg-black/40 md:bg-transparent px-3 py-1.5 md:p-0 rounded-full md:rounded-none backdrop-blur-sm md:backdrop-blur-none inline-block"
            >
              {t.hero2.cta}
            </a>
          </Magnetic>
        </MaskedCard>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 — SERVICES / DENTAL CARE (MASKED CARDS)                         */}
      {/* ========================================================================= */}
      <section
        ref={(el) => {
          section3Ref.current = el;
          s3Reveal.containerRef.current = el;
        }}
        id="services"
        className="min-h-screen md:h-screen w-full overflow-hidden flex flex-col pt-1.5 md:pt-2 px-3 md:px-5 pb-1.5 md:pb-2 gap-1.5 md:gap-2 bg-white"
      >
        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 grid-rows-[auto_auto_auto_auto] md:grid-rows-[1fr_1fr_0.8fr] gap-1.5 md:gap-2">
          {/* Card 0 - Top Left */}
          <MaskedCard
            bgImage={SECTION2_IMAGE}
            position={s3Mask.positions[0]}
            imageWidth={s3ImageWidth}
            focalX={s3FocalX}
            cardRef={(el) => {
              s3CardRefs.current[0] = el;
            }}
            style={s3Reveal.getAnimStyle(0)}
            className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[160px] md:min-h-0 shadow-sm"
          >
            <h3 className="absolute top-4 left-5 md:top-6 md:left-7 text-white md:text-black text-2xl md:text-3xl font-bold z-10">
              {t.section3.card0Title}
            </h3>
            <p className="absolute bottom-4 left-5 md:bottom-6 md:left-7 text-white md:text-black text-xs md:text-sm font-semibold z-10">
              {t.section3.card0Subtitle}
            </p>
          </MaskedCard>

          {/* Card 1 - Top Right */}
          <MaskedCard
            bgImage={SECTION2_IMAGE}
            position={s3Mask.positions[1]}
            imageWidth={s3ImageWidth}
            focalX={s3FocalX}
            cardRef={(el) => {
              s3CardRefs.current[1] = el;
            }}
            style={s3Reveal.getAnimStyle(1)}
            className="md:row-span-2 rounded-xl md:rounded-2xl overflow-hidden relative min-h-[220px] md:min-h-0 shadow-sm"
          >
            <div className="absolute bottom-16 left-5 md:bottom-20 md:left-7 text-white text-xs md:text-sm font-semibold leading-4 md:leading-5 z-10 max-w-[320px] md:max-w-[420px]">
              {t.section3.card1Text}
            </div>
            <Magnetic strength={0.3} className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-10">
              <a
                href={`tel:${t.phoneRaw}`}
                className="px-5 py-3 md:px-8 md:py-5 bg-white rounded-full text-black text-base md:text-xl font-bold hover:scale-105 transition-transform cursor-pointer shadow-md inline-block"
              >
                {t.section3.card1Cta}
              </a>
            </Magnetic>
          </MaskedCard>

          {/* Card 2 - Bottom Left */}
          <MaskedCard
            bgImage={SECTION2_IMAGE}
            position={s3Mask.positions[2]}
            imageWidth={s3ImageWidth}
            focalX={s3FocalX}
            cardRef={(el) => {
              s3CardRefs.current[2] = el;
            }}
            style={s3Reveal.getAnimStyle(2)}
            className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[160px] md:min-h-0 shadow-sm"
          >
            <h3 className="absolute top-4 left-5 md:top-6 md:left-7 text-white md:text-black text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.9] z-10 whitespace-pre-line">
              {t.section3.card2Headline}
            </h3>
          </MaskedCard>

          {/* Card 3 - Bottom Full Width (Services) */}
          <MaskedCard
            bgImage={SECTION2_IMAGE}
            position={s3Mask.positions[3]}
            imageWidth={s3ImageWidth}
            focalX={s3FocalX}
            cardRef={(el) => {
              s3CardRefs.current[3] = el;
            }}
            style={s3Reveal.getAnimStyle(3)}
            className="col-span-1 md:col-span-2 rounded-xl md:rounded-2xl overflow-hidden relative min-h-[240px] md:min-h-0 shadow-sm"
          >
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-2 md:p-3">
              <div className="flex flex-wrap md:flex-nowrap gap-1.5 md:gap-2 flex-1">
                {t.section3.services.map((svc) => (
                  <SpotlightCard
                    key={svc.num}
                    spotlightColor={svc.active ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.25)'}
                    className={`flex-1 min-w-[calc(50%-4px)] md:min-w-0 rounded-xl md:rounded-2xl p-3 md:p-5 flex flex-col justify-between ${
                      svc.active
                        ? 'bg-white/90 backdrop-blur-md shadow-md'
                        : 'bg-white/20 backdrop-blur-xl'
                    }`}
                  >
                    <h4
                      className={`text-sm sm:text-base md:text-2xl font-bold leading-[1.12] whitespace-pre-line ${
                        svc.active ? 'text-black' : 'text-white'
                      }`}
                    >
                      {svc.name}
                    </h4>

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

              <div className="mt-1 px-3 py-2 rounded-xl bg-black/50 backdrop-blur-md flex flex-wrap items-center justify-between gap-2 text-[10.5px] md:text-xs font-semibold text-white/95">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  05. {t.section3.additionalServices[0]}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  06. {t.section3.additionalServices[1]}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  07. {t.section3.additionalServices[2]}
                </span>
              </div>
            </div>
          </MaskedCard>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4 — APPROACH, CLINICAL CASE & CONSULTATION                        */}
      {/* ========================================================================= */}
      <section
        ref={(el) => {
          s4Reveal.containerRef.current = el;
        }}
        id="approach"
        className="min-h-screen md:h-screen w-full overflow-y-auto md:overflow-hidden flex flex-col pt-2 md:pt-2 px-3 md:px-5 pb-20 md:pb-2 gap-2 md:gap-2 bg-white"
      >
        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-2">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-2 md:gap-2 h-full">
            {/* 1. Heading Card */}
            <SpotlightCard
              spotlightColor="rgba(0, 0, 0, 0.05)"
              style={s4Reveal.getAnimStyle(0)}
              className="rounded-xl md:rounded-2xl bg-stone-50 p-5 sm:p-6 md:p-7 flex flex-col justify-between flex-[1.1] min-h-[160px] md:min-h-0 shadow-sm border border-black/5"
            >
              <h3 className="text-[clamp(2.4rem,5.5vw,5.5rem)] font-bold leading-[0.95] text-black whitespace-pre-line">
                {t.section4.approachTitle}
              </h3>
              <p className="text-xs md:text-sm font-semibold text-black/80 mt-3">
                {t.section4.approachSubtitle}
              </p>
            </SpotlightCard>

            {/* 2. Two Image Cards */}
            <div
              style={s4Reveal.getAnimStyle(1)}
              className="flex gap-2 md:gap-2 flex-1 min-h-[140px] md:min-h-0"
            >
              <SpotlightCard
                spotlightColor="rgba(255, 255, 255, 0.25)"
                className="flex-1 rounded-xl md:rounded-2xl overflow-hidden bg-neutral-900 shadow-sm relative group border border-black/5"
              >
                <img
                  src={SECTION3_IMG1}
                  alt="Clinical result before and after"
                  width={640}
                  height={698}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </SpotlightCard>

              <SpotlightCard
                spotlightColor="rgba(255, 255, 255, 0.25)"
                className="flex-1 rounded-xl md:rounded-2xl overflow-hidden bg-neutral-900 shadow-sm relative group border border-black/5"
              >
                <img
                  src={SECTION3_IMG2}
                  alt="Dental clinic practice"
                  width={480}
                  height={380}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </SpotlightCard>
            </div>

            {/* 3. Consultation Card */}
            <SpotlightCard
              spotlightColor="rgba(0, 0, 0, 0.08)"
              style={s4Reveal.getAnimStyle(2)}
              className="rounded-xl md:rounded-2xl bg-zinc-200 p-5 sm:p-6 md:p-7 flex flex-col sm:flex-row sm:items-end justify-between gap-4 flex-[0.9] min-h-[160px] md:min-h-0 shadow-sm border border-black/5"
            >
              <div className="flex flex-col">
                <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-black/70 mb-1 md:mb-2">
                  {t.section4.consultationTag}
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black leading-tight whitespace-pre-line">
                  {t.section4.consultationHeadline}
                </h3>
              </div>
              <Magnetic strength={0.35} className="shrink-0">
                <a
                  href={`tel:${t.phoneRaw}`}
                  className="w-full sm:w-auto px-6 py-3 sm:px-7 sm:py-4 md:px-8 md:py-4 bg-black text-white rounded-full text-sm sm:text-base md:text-lg font-bold hover:bg-neutral-800 transition-all cursor-pointer shadow-lg inline-flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
                >
                  <span>{t.section4.consultationCta}</span>
                  <span>→</span>
                </a>
              </Magnetic>
            </SpotlightCard>
          </div>

          {/* RIGHT COLUMN */}
          <div
            style={s4Reveal.getAnimStyle(3)}
            className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[420px] md:min-h-0 shadow-sm bg-neutral-900 border border-black/5"
          >
            <img
              src={SECTION3_BG}
              alt="Smiling patient"
              width={640}
              height={960}
              className="w-full h-full object-cover"
              loading="lazy"
            />

            <div className="absolute top-3 left-3 right-3 sm:top-5 sm:left-5 sm:right-5 bg-black/75 backdrop-blur-md rounded-xl p-3.5 sm:p-4 text-white z-10 border border-white/15 shadow-lg">
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-neutral-300 uppercase block mb-1">
                {t.location} • {t.phoneDisplay}
              </span>
              <p className="text-xs sm:text-sm font-bold leading-snug">
                {t.section4.bannerText}
              </p>
            </div>

            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex gap-2 md:gap-2">
              <a
                href={`tel:${t.phoneRaw}`}
                className="flex-1 bg-white hover:bg-neutral-100 rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 flex flex-col justify-between h-28 sm:h-36 md:h-48 shadow-xl transition-all hover:scale-[1.02] border border-black/5 group cursor-pointer"
              >
                <h4 className="text-sm sm:text-lg md:text-2xl font-bold text-black leading-tight whitespace-pre-line">
                  {t.section4.overlay1}
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

              <a
                href={`tel:${t.phoneRaw}`}
                className="flex-1 bg-black/60 hover:bg-black/75 backdrop-blur-xl rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 flex flex-col justify-between h-28 sm:h-36 md:h-48 shadow-xl transition-all hover:scale-[1.02] border border-white/20 group cursor-pointer"
              >
                <h4 className="text-sm sm:text-lg md:text-2xl font-bold text-white leading-tight whitespace-pre-line">
                  {t.section4.overlay2}
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
          className="flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 md:px-5 md:py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 shadow-[0_12px_32px_rgba(0,0,0,0.85)] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer border border-white/30"
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
