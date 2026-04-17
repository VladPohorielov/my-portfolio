import { portfolioData } from "@/data/portfolio";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import s from "./About.module.css";

const { experience } = portfolioData;

// ── 4 pills з оригінального HTML ─────────────────────────────────────

const pills = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="15" height="10" rx="2" ry="2" />
        <path d="m17 11 5-3v8l-5-3" />
      </svg>
    ),
    title: "AI-відео для реклами і органіки",
    desc: "Meta, TikTok, YouTube Shorts — формат під платформу, hook під аудиторію",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
    title: "CTR, CPA, ROI — рішення з даних",
    desc: "Не з відчуття. Кожна зміна підкріплена цифрами з платформи",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "12 варіацій за спринт",
    desc: "Більше тестів, нижча вартість winning creative — без аутсорсу",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: "Meta Ads Library і TikTok Creative Center",
    desc: "Беру те, що вже конвертує в ніші — не генерую з нуля",
  },
];

// ─────────────────────────────────────────────────────────────────────

export function About() {
  return (
    <section id="about" className={s.section}>
      <div className={s.wrap}>
        {/* ── Біо + pills ── */}
        <div className={s.grid}>
          <SectionReveal className={s.copy}>
            <p className={s.eyebrow}>Про мене</p>
            <h2 className={s.h2}>
              Відео, що
              <br />
              доводить цифрами
            </h2>
            <div className={s.body}>
              <p>
                Роблю <strong>AI short-form відео</strong> для Reels, TikTok і
                Meta Ads — від сценарію і hook до запуску. Кожне відео — це
                тест, а не випадковий пост.
              </p>
              <p>
                Працюю batch-циклами: до 12 варіацій за спринт — більше тестів,
                нижча вартість winning creative.{" "}
                <strong>CPA −25%, ROI +30%</strong> — цифри з реальних кампаній.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal stagger staggerDelay={0.1} className={s.pills}>
            {pills.map((pill) => (
              <RevealItem key={pill.title}>
                <SpotlightCard
                  className={s.pill}
                  spotlightColor="rgba(99, 102, 241, 0.2)"
                >
                  <div className={s.pillIcon}>{pill.icon}</div>
                  <div className={s.pillBody}>
                    <h4>{pill.title}</h4>
                    <p>{pill.desc}</p>
                  </div>
                </SpotlightCard>
              </RevealItem>
            ))}
          </SectionReveal>
        </div>

        {/* ── Досвід ── */}
        <SectionReveal className={s.expHeader}>
          <p className={s.eyebrow}>Досвід</p>
          <h2 className={s.h2}>Проєкти і позиції</h2>
        </SectionReveal>

        <SectionReveal stagger staggerDelay={0.08} className={s.expList}>
          {experience.map((item) => (
            <RevealItem key={item.company}>
              <div className={s.expCard}>
                <div className={s.expMain}>
                  <p className={s.expCompany}>{item.company}</p>
                  {item.nda && <span className={s.ndaBadge}>NDA</span>}
                  <h3 className={s.expTitle}>{item.title}</h3>
                  <ul className={s.expPoints}>
                    {item.points.map((pt, i) => (
                      <li
                        key={i}
                        // points містять лише авторський <strong> — безпечно
                        dangerouslySetInnerHTML={{ __html: pt }}
                      />
                    ))}
                  </ul>
                </div>
                <div className={s.expMeta}>
                  <span className={s.expBadge}>{item.badge}</span>
                  <span className={s.expPeriod}>{item.period}</span>
                </div>
              </div>
            </RevealItem>
          ))}
        </SectionReveal>
      </div>
    </section>
  );
}
