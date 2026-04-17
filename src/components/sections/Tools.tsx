import { portfolioData } from "@/data/portfolio";
import { SectionReveal } from "@/components/ui/SectionReveal";
import MagicBento, { type BentoCard } from "@/components/ui/MagicBento";
import s from "./Tools.module.css";

export function Tools() {
  const { tools } = portfolioData;

  const bentoCards: BentoCard[] = tools.map((category) => ({
    label: category.label,
    title:
      category.chips.find((c) => c.accent)?.text ??
      category.chips[0]?.text ??
      category.label,
    description: category.chips
      .filter((c) => !c.accent)
      .map((c) => c.text)
      .join(" · "),
    color: "#060010",
  }));

  return (
    <section id="tools" className={s.section}>
      <div className={s.wrap}>
        <SectionReveal>
          <p className={s.eyebrow}>Інструментарій</p>
          <h2 className={s.h2}>Стек, яким я роблю результат</h2>
          <p className={s.lead}>
            Від ідеї до публікації — повний цикл без аутсорсу.
          </p>
        </SectionReveal>

        <SectionReveal>
          <MagicBento cards={bentoCards} glowColor="99,102,241" spotlightOpacity={0.14} />
        </SectionReveal>
      </div>
    </section>
  );
}
