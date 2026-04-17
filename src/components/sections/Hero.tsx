import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { BlurText } from "@/components/ui/BlurText";
import { Magnet } from "@/components/ui/Magnet";
import { CircularText } from "@/components/ui/CircularText";
import s from "./Hero.module.css";

const { heroMetrics, siteConfig } = portfolioData;

const tickerItems = [...siteConfig.tickerItems, ...siteConfig.tickerItems];

export function Hero() {
  return (
    <section id="hero" className={s.hero}>
      {/* ── Aurora mesh background ── */}
      <div className={s.aurora} aria-hidden="true">
        <div className={s.auroraOrb1} />
        <div className={s.auroraOrb2} />
        <div className={s.auroraOrb3} />
      </div>

      {/* ── Dot grid overlay ── */}
      <div className={s.dotGrid} aria-hidden="true" />

      <div className={s.content}>
        {/* ── Ліва колонка ── */}
        <div className={s.left}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={s.tag}
          >
            <span className={s.tagDot} aria-hidden="true" />
            AI Content Creator
          </motion.div>

          <h1 className={s.h1}>
            <BlurText
              text="ВЛАДИСЛАВ"
              as="span"
              className={s.h1Line}
              animateBy="letters"
              delay={55}
              direction="top"
              stepDuration={0.32}
            />
            <br />
            <motion.span
              className={s.h1Accent}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              ПОГОРЄЛОВ
            </motion.span>
          </h1>

          <motion.p
            className={s.sub}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            AI відео · Meta Ads · TikTok · YouTube Shorts
          </motion.p>

          <motion.p
            className={s.desc}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
          >
            Роблю <strong>AI short-form відео</strong> для paid social і
            органіки — hook у перші 3 секунди, batch-варіації, A/B-тест.{" "}
            <strong>CPA −25%, ROI +30%</strong> підкріплені скріншотами з
            платформ.
          </motion.p>

          <motion.div
            className={s.ctas}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Magnet padding={70} strength={0.28}>
              <motion.a
                href="#portfolio"
                className={s.ctaFill}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97, y: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Переглянути портфоліо
                <span className={s.ctaArrow} aria-hidden="true">↗</span>
              </motion.a>
            </Magnet>
            <Magnet padding={70} strength={0.28}>
              <motion.a
                href="#contact"
                className={s.ctaGhost}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Зв'язатися
              </motion.a>
            </Magnet>
          </motion.div>

          <motion.div
            className={s.metrics}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15 }}
          >
            {heroMetrics.map((m) => (
              <div key={m.label} className={s.metric}>
                <div className={s.metricVal}>
                  {m.value}
                  <em>{m.suffix}</em>
                </div>
                <div className={s.metricLbl}>{m.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Фото ── */}
        <motion.div
          className={s.photoWrap}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={s.circularBadge} aria-hidden="true">
            <CircularText
              text="AI Content Creator • Frontend Dev • "
              spinDuration={18}
              onHover="speedUp"
            />
          </div>

          <div className={s.photoFrame}>
            <img
              src="src/I.jpg"
              alt="Владислав Погорєлов"
              className={s.photo}
              width={300}
              height={400}
            />
            <div className={s.photoBadge}>
              <div className={s.photoBadgeName}>ВЛАДИСЛАВ П.</div>
              <div className={s.photoBadgeRole}>AI Video Creator</div>
            </div>
            <div className={s.photoCorner} aria-hidden="true" />
            <div className={s.photoGlow} aria-hidden="true" />
          </div>
        </motion.div>
      </div>

      {/* ── Безкінечний тікер ── */}
      <div className={s.ticker} aria-hidden="true">
        <div className={s.tickerTrack}>
          {tickerItems.map((item, i) => (
            <span key={i}>{item} · </span>
          ))}
        </div>
      </div>
    </section>
  );
}
