import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData, type PortfolioCase } from "@/data/portfolio";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Lightbox } from "@/components/ui/Lightbox";
import s from "./Portfolio.module.css";

function CaseCard({ item, index }: { item: PortfolioCase; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const rows = [
    { label: "Задача",    text: item.goal },
    { label: "Контекст",  text: item.context },
    { label: "Підхід",    text: item.approach },
    { label: "Результат", text: item.result, accent: true },
  ].filter((r) => r.text);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }
  function handleMouseLeave() {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--spot-x", "50%");
    el.style.setProperty("--spot-y", "50%");
  }

  return (
    <motion.article
      ref={cardRef}
      className={s.card}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.52,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className={s.cardInner}>
        {/* ── Spotlight ── */}
        <div className={s.spotlight} aria-hidden="true" />

        {/* ── Meta strip ── */}
        <header className={s.meta}>
          <span className={s.num}>КЕЙС {String(index + 1).padStart(2, "0")}</span>
          <span className={s.chip}>{item.client}</span>
          <span className={s.chip}>{item.platform}</span>
        </header>

        {/* ── Body: 2-col grid ── */}
        <div className={s.body}>
          {/* Left: title + summary */}
          <div className={s.bodyLeft}>
            <h3 className={s.title}>{item.title}</h3>
            <p className={s.summary}>{item.summary}</p>
          </div>

          {/* Right: stats + thumbnails — always visible */}
          <div className={s.bodyRight}>
            <div className={s.stats}>
              {item.stats.map((st) => (
                <div key={st.label} className={s.statItem}>
                  <span className={s.statVal}>{st.value}</span>
                  <span className={s.statLbl}>{st.label}</span>
                </div>
              ))}
            </div>

            {item.images.length > 0 && (
              <div className={s.thumbs}>
                {item.images.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    className={s.thumb}
                    onClick={() => setLbIndex(i)}
                    aria-label={`Відкрити: ${img.label}`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Expand toggle ── */}
        <button
          type="button"
          className={s.toggle}
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
        >
          <motion.svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            aria-hidden
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ flexShrink: 0 }}
          >
            <path
              d="M2 4.5L6.5 9L11 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
          {isOpen ? "Згорнути" : "Деталі проекту"}
        </button>

        {/* ── Expandable narrative — AnimatePresence height:auto ── */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="narrative"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div className={s.narrativeBody}>
                {rows.map((row) => (
                  <div
                    key={row.label}
                    className={`${s.narrativeRow}${
                      row.accent ? ` ${s.narrativeRowAccent}` : ""
                    }`}
                  >
                    <span className={s.narrativeLabel}>{row.label}</span>
                    <p className={s.narrativeText}>{row.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Lightbox
        items={item.images}
        initialIndex={lbIndex}
        onClose={() => setLbIndex(null)}
      />
    </motion.article>
  );
}

export function Portfolio() {
  const { cases } = portfolioData;

  return (
    <section id="portfolio" className={s.section}>
      <div className={s.wrap}>
        <SectionReveal>
          <div className={s.head}>
            <div>
              <p className={s.eyebrow}>Кейси</p>
              <h2 className={s.h2}>Портфоліо</h2>
              <p className={s.lead}>
                Реальні проєкти з вимірюваними результатами.
              </p>
            </div>
          </div>
        </SectionReveal>

        <div className={s.list}>
          {cases.map((item, idx) => (
            <CaseCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
