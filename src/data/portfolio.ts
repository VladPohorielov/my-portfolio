// ============================================================
//  portfolio.ts — типізований аналог scripts/data.js
//  Замінює window.PORTFOLIO_DATA на ES-модуль з типами.
//  Редагуй тут → весь сайт оновиться автоматично.
// ============================================================

// ─── Інтерфейси ─────────────────────────────────────────────

export interface HeroMetric {
  value: string;
  suffix: string;
  label: string;
}

export interface CaseImage {
  src: string;
  alt: string;
  label: string;
}

export interface CaseStat {
  value: string;
  label: string;
}

export interface PortfolioCase {
  id: string;
  title: string;
  summary: string;
  client: string;
  platform: string;
  goal: string;
  context: string;
  approach: string;
  result: string;
  images: CaseImage[];
  stats: CaseStat[];
}

export interface VideoItem {
  title: string;
  tag: string;
  embed: string;
  thumbnail: string;
}

export type GalleryItemSize = "tall" | "wide";

export interface GalleryItem {
  src: string;
  label: string;
  overlay: string;
  size?: GalleryItemSize;
}

export interface Testimonial {
  text: string;
  name: string;
  role: string;
}

export interface SiteConfig {
  telegram: string;
  telegramHandle: string;
  telegramCta: string;
  availabilityText: string;
  /** Необов'язково: вкажи місяць — з'явиться у контактній секції */
  availabilityDate?: string;
  footerYear: string;
  tickerItems: string[];
}

export interface TrustBarItem {
  value: string;
  label: string;
}

export interface ExperienceItem {
  company: string;
  /** true → рендерить мітку NDA */
  nda: boolean;
  title: string;
  badge: string;
  period: string;
  /** Може містити <strong> — лише авторський контент, не user input */
  points: string[];
}

export interface WorkflowStep {
  num: string;
  title: string;
  desc: string;
  tool: string;
}

export type IconKey = "video" | "image" | "cpu" | "edit" | "volume" | "sliders" | "send";

export interface ToolChip {
  text: string;
  /** true → рендерить клас .chip.accent */
  accent?: boolean;
}

export interface ToolCategory {
  label: string;
  icon: IconKey;
  chips: ToolChip[];
}

// ─── Структура всього модуля ─────────────────────────────────

export interface PortfolioData {
  heroMetrics: HeroMetric[];
  cases: PortfolioCase[];
  videos: VideoItem[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  siteConfig: SiteConfig;
  trustBar: TrustBarItem[];
  experience: ExperienceItem[];
  workflowSteps: WorkflowStep[];
  tools: ToolCategory[];
}

// ─── Дані ────────────────────────────────────────────────────

export const portfolioData: PortfolioData = {
  heroMetrics: [
    { value: "1.1", suffix: "M+", label: "Органічних переглядів" },
    { value: "−25", suffix: "%",  label: "CPA для клієнтів" },
    { value: "+30", suffix: "%",  label: "ROI кампаній" },
  ],

  cases: [
    {
      id: "01",
      title: "Viral Reel до 8 Березня",
      summary:
        "Seasonal reel під пік 8 Березня: 878K переглядів, 94.9% — нова аудиторія, без постановочного знімання.",
      client: "Мережа квіткових магазинів · Одеса",
      platform: "Instagram Reels · Organic",
      goal: "Швидко залучити нову аудиторію перед піком сезонного попиту до 8 Березня.",
      context:
        "Коротке вікно запуску — seasonal-креатив, що виходить швидко і працює на холодне охоплення.",
      approach:
        "Hook у перші 3 секунди на сезонний інфопривід — персонажний AI-візуал для cold audience без жодного постановочного знімання.",
      result:
        "878K переглядів, 31K взаємодій, 94.9% нова аудиторія — ролик не виглядав рекламою, і саме тому зайшов.",
      images: [
        { src: "src/Статистика/1.1.webp", alt: "Кейс 01 — скрін 1", label: "Кейс 01 · Статистика" },
        { src: "src/Статистика/1.2.webp", alt: "Кейс 01 — скрін 2", label: "Кейс 01 · Деталі" },
      ],
      stats: [
        { value: "878K",  label: "Переглядів" },
        { value: "31K",   label: "Взаємодій" },
        { value: "252",   label: "Дій у профілі" },
        { value: "94.9%", label: "Нова аудиторія" },
      ],
    },
    {
      id: "02",
      title: "Квіти з історією",
      summary:
        "1.1M переглядів, 679 дій у профілі, 942 поширення — рілс, що переводив перегляд у реальний намір купити.",
      client: "Квітковий e-commerce бренд",
      platform: "Instagram Reels · Profile Growth",
      goal: "Підняти інтерес до профілю та перетворити охоплення на дії після перегляду.",
      context:
        "Завдання — не просто охоплення, а consideration: перехід до профілю і знайомство з асортиментом.",
      approach:
        "Простий story-driven сценарій з емоційною подачею продукту — ролик однаково добре працює і на охоплення, і як consideration-креатив.",
      result:
        "1.1M переглядів, 679 дій у профілі — ролик переводив увагу в намір. 942 поширення: аудиторія сама розширила охоплення.",
      images: [
        { src: "src/Статистика/2.1.webp", alt: "Кейс 02 — скрін 1", label: "Кейс 02 · Статистика" },
        { src: "src/Статистика/2.2.webp", alt: "Кейс 02 — скрін 2", label: "Кейс 02 · Деталі" },
      ],
      stats: [
        { value: "1.1M", label: "Переглядів" },
        { value: "5.4K", label: "Взаємодій" },
        { value: "679",  label: "Дій у профілі" },
        { value: "942",  label: "Поширень" },
      ],
    },
  ],

  videos: [
    {
      title: "Ваші нові зелені друзі",
      tag: "TikTok · AI Video",
      embed: "https://www.youtube.com/embed/3X2ByEtHxW0?autoplay=1&rel=0",
      thumbnail: "https://img.youtube.com/vi/3X2ByEtHxW0/maxresdefault.jpg",
    },
    {
      title: "Цибулина амарилісу: шлях до розквіту",
      tag: "Meta Ads · Short-form",
      embed: "https://www.youtube.com/embed/-ZR9tv-N06A?autoplay=1&rel=0",
      thumbnail: "https://img.youtube.com/vi/-ZR9tv-N06A/maxresdefault.jpg",
    },
    {
      title: "Gurt — це завжди про емоції",
      tag: "YouTube Shorts",
      embed: "https://www.youtube.com/embed/lo_6RTDN3-c?autoplay=1&rel=0",
      thumbnail: "https://img.youtube.com/vi/lo_6RTDN3-c/maxresdefault.jpg",
    },
    {
      title: "Коли виконав план на всі 100%",
      tag: "Reels · Local Brand",
      embed: "https://www.youtube.com/embed/8cKz94IYmOE?autoplay=1&rel=0",
      thumbnail: "https://img.youtube.com/vi/8cKz94IYmOE/maxresdefault.jpg",
    },
    {
      title: "Амариліс у воску — символ дива",
      tag: "TikTok · Trend",
      embed: "https://www.youtube.com/embed/3zDUZn25JNs?autoplay=1&rel=0",
      thumbnail: "https://img.youtube.com/vi/3zDUZn25JNs/maxresdefault.jpg",
    },
    {
      title: "В'язана магія та затишок",
      tag: "Meta Ads · E-commerce",
      embed: "https://www.youtube.com/embed/B1jU6Es_GF8?autoplay=1&rel=0",
      thumbnail: "https://img.youtube.com/vi/B1jU6Es_GF8/maxresdefault.jpg",
    },
    {
      title: "Футбол та квіти: гармонія контрастів",
      tag: "Avatar · HeyGen",
      embed: "https://www.youtube.com/embed/XKOnmD9Z7Ss?autoplay=1&rel=0",
      thumbnail: "https://img.youtube.com/vi/XKOnmD9Z7Ss/maxresdefault.jpg",
    },
    {
      title: "Каннський кінофестиваль: квіткова прем'єра",
      tag: "YouTube · SaaS",
      embed: "https://www.youtube.com/embed/Vzv9-yPrOJs?autoplay=1&rel=0",
      thumbnail: "https://img.youtube.com/vi/Vzv9-yPrOJs/maxresdefault.jpg",
    },
    {
      title: "Спецоперація «Шпіоніро Голубіо»",
      tag: "Reels · Fashion",
      embed: "https://www.youtube.com/embed/kZYKfJijjNI?autoplay=1&rel=0",
      thumbnail: "https://img.youtube.com/vi/kZYKfJijjNI/maxresdefault.jpg",
    },
    {
      title: "Ранкові квіти · Product Short",
      tag: "YouTube Shorts",
      embed: "https://www.youtube.com/embed/Zfzti0mI8Ro?autoplay=1&rel=0",
      thumbnail: "https://img.youtube.com/vi/Zfzti0mI8Ro/maxresdefault.jpg",
    },
  ],

  gallery: [
    { src: "src/Analyze_the_bouquet_2k_202602111317.webp",              label: "Квіти · Продуктова зйомка",  overlay: "Квіти · Product Shot",          size: "tall" },
    { src: "src/Edit_this_photo_2k_202601161146.webp",                  label: "Косметика · E-commerce",     overlay: "Косметика · Реклама" },
    { src: "src/Gemini_Generated_Image_8f1o3k8f1o3k8f1o (1).webp",     label: "Ресторан · Атмосфера",       overlay: "Ресторан · Атмосфера" },
    { src: "src/Gemini_Generated_Image_fpiojlfpiojlfpio (1).webp",      label: "Fashion · Lifestyle",        overlay: "Fashion · Lifestyle",            size: "tall" },
    { src: "src/Gemini_Generated_Image_lh6mzylh6mzylh6m.webp",         label: "Brand Campaign · Banner",    overlay: "Brand Banner · Performance",     size: "wide" },
    { src: "src/Gemini_Generated_Image_lpchtdlpchtdlpch.webp",         label: "Tech Product · Visual",      overlay: "Tech · Visual" },
    { src: "src/Image_202601161105.webp",                               label: "Local Business · Outdoor",   overlay: "Local Brand · Outdoor" },
    { src: "src/Remove_the_black_2k_202601251453.webp",                 label: "Portrait · Avatar",          overlay: "Portrait · AI Avatar" },
    { src: "src/This_is_an_2k_202602111337.webp",                       label: "Product · Flat lay",         overlay: "Product · Flat lay",             size: "tall" },
    { src: "src/This_is_an_2k_202602111344.webp",                       label: "Seasonal · 8 Березня",       overlay: "Seasonal · 8 Березня" },
    { src: "src/Analyze_the_bouquet_2k_202602111321.webp",              label: "Квіти · Деталь",             overlay: "Квіти · Деталь" },
    { src: "src/11.webp",                                               label: "Instagram · Carousel",       overlay: "Carousel · Instagram" },
    { src: "src/12.webp",                                               label: "Meta Ads · Banner",          overlay: "Meta Ads · Banner",              size: "wide" },
    { src: "src/13.webp",                                               label: "Interior · Space",           overlay: "Interior · Design" },
    { src: "src/14.webp",                                               label: "Avatar · Character",         overlay: "AI Avatar · Character",          size: "tall" },
    { src: "src/2.webp",                                                label: "Minimal · Product Shot",     overlay: "Minimal · Product Shot" },
    { src: "src/3.webp",                                                label: "Neon · City",                overlay: "Neon City" },
    { src: "src/4.webp",                                                label: "Health · Wellness",          overlay: "Health · Wellness Brand" },
    { src: "src/5.webp",                                                label: "Packaging · Design",         overlay: "Packaging · Design" },
    { src: "src/6.webp",                                                label: "Campaign · Editorial",       overlay: "Campaign · Editorial",           size: "wide" },
    { src: "src/7.webp",                                                label: "Food Styling",               overlay: "Food Styling" },
    { src: "src/8.webp",                                                label: "Portrait · B&W",             overlay: "B&W · Portrait" },
    { src: "src/9.webp",                                                label: "Summer · Lifestyle",         overlay: "Summer · Lifestyle" },
    { src: "src/10.webp",                                               label: "Dark · Luxury Brand",        overlay: "Dark Luxury · Brand",            size: "tall" },
    { src: "src/Extreme_worms_eye_view_from_inside_flowersa_stylis_delpmaspu.webp", label: "Квіти · Драматичний кут", overlay: "Квіти · Драматичний кут", size: "tall" },
    { src: "src/_delpmaspu_19.webp",                                    label: "AI Portrait · Style",        overlay: "AI Portrait · Style",            size: "tall" },
    { src: "src/___________________________________________________delpmaspu (1).webp",  label: "Portrait · Concept",  overlay: "Portrait · Concept",  size: "tall" },
    { src: "src/___________________________________________________delpmaspu (22).webp", label: "Lifestyle · Editorial", overlay: "Lifestyle · Editorial", size: "tall" },
  ],

  // Активується автоматично, щойно додаєш реальні відгуки.
  testimonials: [],

  siteConfig: {
    telegram: "https://t.me/Vladislav_Pohorielov",
    telegramHandle: "@Vladislav_Pohorielov",
    telegramCta: "Обговорити задачу в Telegram ↗",
    availabilityText: "Відкритий до нових проєктів",
    // availabilityDate: "Квітень 2026",
    footerYear: "2026",
    tickerItems: [
      "1.1M+ переглядів",
      "CPA −25%",
      "ROI +30%",
      "Meta Ads",
      "TikTok",
      "YouTube Shorts",
      "Veo3",
      "Kling",
      "Midjourney",
      "HeyGen",
      "ElevenLabs",
      "hook у 3 сек",
      "CTR ×2.7",
      "12 варіацій за спринт",
    ],
  },

  // Синхронізація: trustBar[0].value ("1.1M+") = heroMetrics[0] ("1.1"+"M+")
  // Якщо змінюєш цифри переглядів — оновлюй обидва місця + tickerItems[0].
  trustBar: [
    { value: "1.1M+", label: "Органічних переглядів" },
    { value: "50+",   label: "AI-відео у продакшені" },
    { value: "2+",    label: "Роки у performance-контенті" },
    { value: "3+",    label: "Конфіденційних проєктів" },
  ],

  experience: [
    {
      company: "Freelance · E-commerce, Local Brands",
      nda: false,
      title: "AI Content Creator",
      badge: "Актуально",
      period: "2024–2026",
      points: [
        "Створив <strong>50+ AI-креативів</strong> — продажі клієнтів виросли на 20%, CPA знизився на 25%",
        "Short-form контент для TikTok, Reels і Meta Ads з середнім CTR <strong>1.5%</strong> — на 15–20% вище медіану в нішах",
        "Batch-варіації та A/B-тестування — ROI кампаній покращився на <strong>25–30%</strong>",
        "Сезонні кампанії для мережі квіткових магазинів (Одеса) — органіка 1.1M переглядів, 94.9% нова аудиторія",
      ],
    },
    {
      company: "Confidential Client · Media & Performance",
      nda: true,
      title: "Digital Growth Specialist",
      badge: "Завершено",
      period: "2025",
      points: [
        "Запуск AI-відео кампаній у paid social — зростання охоплення і engagement rate на ключових платформах",
        "A/B-тести форматів, адаптація під платформи, performance-звіти для масштабування бюджетів",
      ],
    },
    {
      company: "iDobrik · Retail",
      nda: false,
      title: "Sales Manager",
      badge: "Завершено",
      period: "2024–2025",
      points: [
        "Консультування клієнтів онлайн/офлайн — нові підходи підвищили обсяг продажів на <strong>15%</strong>",
        "Управління товарами та продажами у 1C, вирішення спірних ситуацій",
      ],
    },
  ],

  workflowSteps: [
    {
      num: "01",
      title: "Аналіз конкурентів",
      desc: "Дивлюсь топ-креативи в ніші — беру формули, що вже конвертують",
      tool: "Meta Ads Library · TikTok Creative Center",
    },
    {
      num: "02",
      title: "Hook-варіанти",
      desc: "Пишу 5–10 hook-варіантів під різні сегменти — тест починається до виробництва",
      tool: "ChatGPT · Claude",
    },
    {
      num: "03",
      title: "Batch-виробництво",
      desc: "До 12 відео за спринт — паралельно, без аутсорсу і черг",
      tool: "Veo3 · Kling · Midjourney",
    },
    {
      num: "04",
      title: "A/B тестування",
      desc: "CTR, CPA, VTR — залишаю тільки те, що доводить ефективність числами",
      tool: "Meta · Google · TikTok Ads",
    },
    {
      num: "05",
      title: "Оптимізація",
      desc: "Winning creative отримує бюджет — решта зупиняється",
      tool: "ROI · CPA · CTR",
    },
  ],

  tools: [
    {
      label: "Video Generation",
      icon: "video",
      chips: [
        { text: "Veo3",     accent: true },
        { text: "Kling AI" },
        { text: "Runway" },
        { text: "Pika" },
        { text: "Luma" },
      ],
    },
    {
      label: "Image & Creative",
      icon: "image",
      chips: [
        { text: "Midjourney", accent: true },
        { text: "Flux" },
        { text: "Leonardo AI" },
        { text: "SD" },
      ],
    },
    {
      label: "Avatars & Voice",
      icon: "cpu",
      chips: [
        { text: "HeyGen",      accent: true },
        { text: "ElevenLabs" },
        { text: "D-ID" },
      ],
    },
    {
      label: "Script & Hook",
      icon: "edit",
      chips: [
        { text: "ChatGPT",     accent: true },
        { text: "Claude" },
        { text: "Prompt Eng." },
        { text: "Hook Writing" },
      ],
    },
    {
      label: "Ads Platforms",
      icon: "volume",
      chips: [
        { text: "Meta Ads",   accent: true },
        { text: "Google Ads", accent: true },
        { text: "TikTok Ads" },
        { text: "YouTube Ads" },
      ],
    },
    {
      label: "Workflow",
      icon: "sliders",
      chips: [
        { text: "CapCut" },
        { text: "Premiere" },
        { text: "Figma" },
        { text: "Notion" },
      ],
    },
  ],
};
