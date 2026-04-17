import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Magnet } from "@/components/ui/Magnet";
import s from "./Contact.module.css";

const { siteConfig } = portfolioData;

// ── Іконки для рядка переваг ─────────────────────────────────────────

const IconLock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconMail = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconUsers = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────

export function Contact() {
  return (
    <section id="contact" className={s.section}>

      <SectionReveal className={s.inner}>
        <p className={`${s.eyebrow} ${s.eyebrowCenter}`}>Контакти</p>

        <h2 className={s.h}>
          Є проєкт —<br />
          напишіть.<br />
          <span className={s.hAccent}>Обговоримо.</span>
        </h2>

        <p className={s.lead}>
          Розкажіть про задачу і бюджет. Обговоримо формат, почнемо з
          тестового&#160;періоду, якщо потрібно. NDA підписую, email надаю
          офіційно.
        </p>

        <div className={s.avail}>
          <span className={s.availDot} aria-hidden="true" />
          <span>{siteConfig.availabilityText}</span>
        </div>

        <Magnet padding={80} strength={0.25}>
          <motion.a
            href={siteConfig.telegram}
            className={s.ctaMega}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 18 }}
          >
            {siteConfig.telegramCta}
            <span className={s.ctaArrow} aria-hidden="true">↗</span>
          </motion.a>
        </Magnet>

        <div className={s.businessRow}>
          <span className={s.cbrItem}>
            <IconLock />
            NDA за запитом
          </span>
          <span className={s.cbrDot} aria-hidden="true" />
          <span className={s.cbrItem}>
            <IconMail />
            Email офіційно
          </span>
          <span className={s.cbrDot} aria-hidden="true" />
          <span className={s.cbrItem}>
            <IconUsers />
            Повний цикл або партнер
          </span>
        </div>
      </SectionReveal>
    </section>
  );
}
