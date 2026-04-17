import { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Lightbox } from "@/components/ui/Lightbox";
import s from "./Gallery.module.css";

export function Gallery() {
  const { gallery } = portfolioData;
  const [lbIndex, setLbIndex] = useState<number | null>(null);

  return (
    <section id="results" className={s.section}>
      <div className={s.wrapTop}>
        <SectionReveal>
          <p className={s.eyebrow}>Результати</p>
          <h2 className={s.h2}>Скріншоти зі статистикою</h2>
          <p className={s.lead}>
            Реальні цифри з кабінетів. Не обіцянки — докази.
          </p>
        </SectionReveal>
      </div>

      <SectionReveal className={s.masonry} delay={0.15}>
        {gallery.map((item, idx) => (
          <button
            key={item.src}
            type="button"
            className={`${s.item}${item.size === "tall" ? ` ${s.tall}` : ""}${item.size === "wide" ? ` ${s.wide}` : ""}`}
            onClick={() => setLbIndex(idx)}
            aria-label={`Відкрити: ${item.label}`}
          >
            <img
              src={item.src}
              alt={item.label}
              className={s.media}
              loading="lazy"
              decoding="async"
            />
            <div className={s.overlay}>
              <span>{item.overlay}</span>
            </div>
          </button>
        ))}
      </SectionReveal>

      <Lightbox
        items={gallery}
        initialIndex={lbIndex}
        onClose={() => setLbIndex(null)}
      />
    </section>
  );
}
