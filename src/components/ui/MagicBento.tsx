/**
 * MagicBento — інтерактивна bento-сітка з spotlight + glow.
 * Адаптовано з react-bits (reactbits.dev/components/magic-bento).
 * Залежності: gsap
 */
import React, { useRef, useCallback, useEffect } from "react";
import gsap from "gsap";
import s from "./MagicBento.module.css";

export interface BentoCard {
  label: string;
  title: string;
  description?: string;
  color?: string;
  icon?: React.ReactNode;
}

interface MagicBentoProps {
  cards?: BentoCard[];
  glowColor?: string;
  spotlightOpacity?: number;
  magnetStrength?: number;
}

const DEFAULT_CARDS: BentoCard[] = [
  { label: "Відео", title: "Veo3", description: "Kling AI · Runway · Pika", color: "#060010" },
  { label: "Зображення", title: "Midjourney", description: "Flux · Ideogram · Firefly", color: "#060010" },
  { label: "Аватари", title: "HeyGen", description: "Synthesia · ElevenLabs · Murf", color: "#060010" },
  { label: "Сценарії", title: "Claude", description: "ChatGPT · Gemini · Copilot", color: "#060010" },
  { label: "Реклама", title: "Meta Ads", description: "Google UAC · TikTok Ads · YouTube", color: "#060010" },
  { label: "Автоматизація", title: "n8n", description: "Make · Zapier · Airtable", color: "#060010" },
];

const MagicBento: React.FC<MagicBentoProps> = ({
  cards = DEFAULT_CARDS,
  glowColor = "99,102,241",
  spotlightOpacity = 0.12,
  magnetStrength = 0.3,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!gridRef.current) return;
      const cards = gridRef.current.querySelectorAll<HTMLDivElement>(
        `.${s.card}`
      );
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mx", `${x}px`);
        card.style.setProperty("--my", `${y}px`);
        card.style.setProperty("--spotlight-opacity", String(spotlightOpacity));
      });
    },
    [spotlightOpacity]
  );

  // Magnet effect per card
  useEffect(() => {
    const cleanups: (() => void)[] = [];
    cardRefs.current.forEach((card) => {
      if (!card) return;
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * magnetStrength;
        const dy = (e.clientY - cy) * magnetStrength;
        gsap.to(card, { x: dx, y: dy, duration: 0.35, ease: "power2.out" });
      };
      const onLeave = () => {
        gsap.to(card, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, [magnetStrength]);

  return (
    <div
      ref={gridRef}
      className={s.grid}
      onMouseMove={handleMouseMove}
      style={{ "--glow": glowColor } as React.CSSProperties}
    >
      {cards.map((card, i) => (
        <div
          key={i}
          ref={(el) => { cardRefs.current[i] = el; }}
          className={s.card}
          style={{ background: card.color ?? "#060010" }}
        >
          <div className={s.spotlight} />
          <div className={s.border} />
          <div className={s.content}>
            <p className={s.label}>{card.label}</p>
            <h3 className={s.title}>{card.title}</h3>
            {card.description && (
              <p className={s.desc}>{card.description}</p>
            )}
            {card.icon && <div className={s.icon}>{card.icon}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MagicBento;
