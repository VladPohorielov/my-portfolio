import { useScrolled } from "../../hooks/useScrolled";
import s from "./StickyCta.module.css";

/**
 * Плаваюча пілюля «Відкритий до проєктів» + кнопка «Написати».
 * З'являється після першого скролу (threshold = 300px).
 */
export function StickyCta() {
  const visible = useScrolled(300);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const target = document.querySelector("#contact");
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className={`${s.pill} ${visible ? s.visible : ""}`}>
      <span className={s.dot} aria-hidden="true" />
      <span className={s.text}>Відкритий до проєктів</span>
      <a href="#contact" className={s.btn} onClick={handleClick}>
        Написати →
      </a>
    </div>
  );
}
