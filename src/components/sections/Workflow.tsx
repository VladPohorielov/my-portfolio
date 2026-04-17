import { portfolioData } from "@/data/portfolio";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import s from "./Workflow.module.css";

export function Workflow() {
  const { workflowSteps } = portfolioData;

  return (
    <section id="workflow" className={s.section}>
      <div className={s.wrap}>
        <SectionReveal>
          <p className={s.eyebrow}>Процес</p>
          <h2 className={s.h2}>Як я працюю</h2>
          <p className={s.lead}>
            Прозорий процес від брифу до публікації — знаєш, що відбувається на кожному кроці.
          </p>
        </SectionReveal>

        <SectionReveal stagger staggerDelay={0.1} className={s.row}>
          {workflowSteps.map((step) => (
            <RevealItem key={step.num}>
              <div className={s.step}>
                <div className={s.num}>{step.num}</div>
                <div className={s.title}>{step.title}</div>
                <p className={s.desc}>{step.desc}</p>
                <span className={s.tool}>{step.tool}</span>
              </div>
            </RevealItem>
          ))}
        </SectionReveal>
      </div>
    </section>
  );
}
