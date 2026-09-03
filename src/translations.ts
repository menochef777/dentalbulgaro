export type Language = 'bg' | 'en';

export interface LanguageOption {
  code: Language;
  label: string;
  name: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'bg', label: 'BG', name: 'Български', flag: '🇧🇬' },
  { code: 'en', label: 'EN', name: 'English', flag: '🇬🇧' },
];

export const SITE_DATA = {
  doctorName: 'Дариа',
  profession: 'Зъболекар / Дентална медицина',
  location: 'Варна, България',
  phone: '088 497 0607',
  phoneRaw: '0884970607',
  headlineLine1: 'ВНИМАТЕЛНА ГРИЖА',
  headlineLine2: 'ПРЕЦИЗНО ЛЕЧЕНИЕ',
  tagService: 'СТОМАТОЛОГИЧЕН КАБИНЕТ',
  tagLocation: 'ВАРНА, БЪЛГАРИЯ',
  cta: 'ЗАПИШЕТЕ ЧАС',
  description:
    'Търсите внимателен и прецизен зъболекар във Варна? Предлагам индивидуален подход и съвременно стоматологично лечение в спокойна и комфортна обстановка.',
  
  services: [
    {
      num: '01',
      title: 'Профилактични прегледи и консултации',
      desc: 'Прецизна цялостна диагностика, детайлна оценка на оралното здраве и изготвяне на индивидуален лечебен план.',
      category: 'ДИАГНОСТИКА',
    },
    {
      num: '02',
      title: 'Лечение на кариес и неговите усложнения',
      desc: 'Внимателно и безболезнено почистване, ендодонтско лечение и възстановяване на здравата зъбна структура.',
      category: 'ТЕРАПИЯ',
    },
    {
      num: '03',
      title: 'Лечение на частично и тотално обеззъбяване',
      desc: 'Съвременни протетични решения за пълно възстановяване на дъвкателната функция, естетиката и комфорта.',
      category: 'ПРОТЕЗИРАНЕ',
    },
    {
      num: '04',
      title: 'Естетични възстановявания',
      desc: 'Пресъздаване на естествения блясък, цвят и хармонична форма на зъбите с висок клас фотополимерни материали.',
      category: 'ЕСТЕТИКА',
    },
    {
      num: '05',
      title: 'Почистване на зъбен камък',
      desc: 'Професионално ултразвуково почистване на плака и зъбен камък за здрави венци и свеж дъх.',
      category: 'ПРОФИЛАКТИКА',
    },
    {
      num: '06',
      title: 'Детска дентална медицина',
      desc: 'Търпелив, дружелюбен и спокоен подход към децата за изграждане на положителни навици без страх.',
      category: 'ДЕТСКО ЛЕЧЕНИЕ',
    },
    {
      num: '07',
      title: 'Грижа за бъдещи мами',
      desc: 'Специализирано и щадящо дентално наблюдение и лечение, съобразено със спецификата на бременността.',
      category: 'СПЕЦИАЛНА ГРИЖА',
    },
  ],

  approach: [
    {
      num: '01',
      title: 'Индивидуален подход',
      desc: 'Всеки пациент е уникален. Лечението се съобразява изцяло с вашите лични нужди, ритъм и комфорт.',
    },
    {
      num: '02',
      title: 'Внимание към детайла',
      desc: 'Безкомпромисна прецизност при всяка манипулация за максимална дълготрайност и естетически баланс.',
    },
    {
      num: '03',
      title: 'Прецизност',
      desc: 'Използване на съвременни материали и доказани клинични протоколи за точно и сигурно лечение.',
    },
    {
      num: '04',
      title: 'Спокойна и комфортна обстановка',
      desc: 'Кабинетът осигурява релаксираща атмосфера без излишен стрес, бързане или напрежение.',
    },
    {
      num: '05',
      title: 'Ясно обяснение на състоянието',
      desc: 'Разговор на достъпен език. Винаги знаете точно какво е състоянието на вашите зъби.',
    },
    {
      num: '06',
      title: 'Ясно представяне на възможните варианти за лечение',
      desc: 'Пълна прозрачност за всички подходящи опции, предимства и препоръки преди започване на манипулацията.',
    },
  ],

  clinicalCase: {
    badge: 'КЛИНИЧЕН РЕЗУЛТАТ',
    title: 'ЕСТЕТИЧНО ВЪЗСТАНОВЯВАНЕ',
    subtitle: 'ПРЕДИ И СЛЕД ЛЕЧЕНИЕ',
    desc: 'Прецизно възстановяване на естествената анатомия и функция на зъба с висококачествен композит.',
    beforeLabel: 'ПРЕДИ',
    afterLabel: 'СЛЕД',
  },

  consultationCta: {
    badge: 'ЗАПАЗЕТЕ ЧАС',
    title: 'ЗАПИШЕТЕ ЧАС ЗА КОНСУЛТАЦИЯ',
    description:
      'Свържете се директно за преглед, консултация или планиране на индивидуално стоматологично лечение във Варна.',
    buttonText: 'ОБАДЕТЕ СЕ: 088 497 0607',
    phone: '088 497 0607',
  },
};

export const TRANSLATIONS = {
  bg: {
    nav: {
      services: 'УСЛУГИ',
      approach: 'ПОДХОД',
      case: 'РЕЗУЛТАТИ',
      contact: 'КОНТАКТ',
      practice: 'СТОМАТОЛОГ ВАРНА',
      doctor: 'ДАРИА',
    },
    hero: {
      tagService: SITE_DATA.tagService,
      tagLocation: SITE_DATA.tagLocation,
      headlineLine1: SITE_DATA.headlineLine1,
      headlineLine2: SITE_DATA.headlineLine2,
      subheading: SITE_DATA.description,
      cta: SITE_DATA.cta,
      scroll: 'РАЗГЛЕДАЙТЕ',
    },
    services: {
      badge: 'ДАРИА / 01',
      heading: 'СТОМАТОЛОГИЧНИ УСЛУГИ',
      subheading: 'СЪВРЕМЕННО ЛЕЧЕНИЕ В СПОКОЙНА И КОМФОРТНА ОБСТАНОВКА.',
      items: SITE_DATA.services,
    },
    approach: {
      badge: 'ДАРИА / 02',
      heading: 'НАШИЯТ ПОДХОД',
      subheading: 'ВНИМАНИЕ КЪМ ДЕТАЙЛА И ИНДИВИДУАЛНА ГРИЖА ЗА ВСЕКИ ПАЦИЕНТ.',
      items: SITE_DATA.approach,
    },
    clinicalCase: SITE_DATA.clinicalCase,
    consultation: SITE_DATA.consultationCta,
    contact: {
      badge: 'ДАРИА / КОНТАКТИ',
      heading: 'ЗАПИШЕТЕ ЧАС',
      subheading: 'СВЪРЖЕТЕ СЕ С НАС ЗА КОНСУЛТАЦИЯ ВЪВ ВАРНА.',
      phone: SITE_DATA.phone,
      phoneRaw: SITE_DATA.phoneRaw,
      location: SITE_DATA.location,
      city: 'ВАРНА',
      cta: 'ЗАПИШЕТЕ ЧАС ЗА КОНСУЛТАЦИЯ',
    },
  },
  en: {
    nav: {
      services: 'SERVICES',
      approach: 'APPROACH',
      case: 'RESULTS',
      contact: 'CONTACT',
      practice: 'DENTAL PRACTICE VARNA',
      doctor: 'DARIA',
    },
    hero: {
      tagService: 'DENTAL PRACTICE',
      tagLocation: 'VARNA, BULGARIA',
      headlineLine1: 'GENTLE CARE',
      headlineLine2: 'PRECISE DENTISTRY',
      subheading:
        'Looking for a caring and precise dentist in Varna? Personalized approach and modern dental care in a calm, comfortable setting.',
      cta: 'BOOK APPOINTMENT',
      scroll: 'SCROLL TO EXPLORE',
    },
    services: {
      badge: 'DARIA / 01',
      heading: 'DENTAL SERVICES',
      subheading: 'MODERN DENTAL TREATMENT IN A CALM AND COMFORTABLE ENVIRONMENT.',
      items: SITE_DATA.services,
    },
    approach: {
      badge: 'DARIA / 02',
      heading: 'OUR APPROACH',
      subheading: 'ATTENTION TO DETAIL AND PERSONALIZED CARE FOR EVERY PATIENT.',
      items: SITE_DATA.approach,
    },
    clinicalCase: SITE_DATA.clinicalCase,
    consultation: SITE_DATA.consultationCta,
    contact: {
      badge: 'DARIA / CONTACT',
      heading: 'BOOK APPOINTMENT',
      subheading: 'GET IN TOUCH FOR A CONSULTATION IN VARNA.',
      phone: SITE_DATA.phone,
      phoneRaw: SITE_DATA.phoneRaw,
      location: SITE_DATA.location,
      city: 'VARNA',
      cta: 'BOOK A CONSULTATION',
    },
  },
};
