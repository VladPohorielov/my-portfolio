import { portfolioData } from "../../data/portfolio";
import s from "./Footer.module.css";

export function Footer() {
  const { footerYear } = portfolioData.siteConfig;

  return (
    <footer className={s.footer}>
      <p>
        © {footerYear} &nbsp;
        <span>Владислав Погорєлов</span>
      </p>
      <p>AI Content Creator · Всі права захищені</p>
    </footer>
  );
}
