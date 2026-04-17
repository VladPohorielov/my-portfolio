/**
 * SpotlightCard — картка зі слідкуючим підсвіткою від миші.
 * Адаптовано з react-bits (reactbits.dev/components/spotlight-card).
 * Без зовнішніх залежностей.
 */
import { useRef, type ReactNode, type CSSProperties } from "react";
import s from "./SpotlightCard.module.css";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  style?: CSSProperties;
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(99, 102, 241, 0.18)",
  style,
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = divRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    divRef.current!.style.setProperty("--mouse-x", `${x}px`);
    divRef.current!.style.setProperty("--mouse-y", `${y}px`);
    divRef.current!.style.setProperty("--spotlight-color", spotlightColor);
  }

  function handleMouseLeave() {
    divRef.current!.style.setProperty("--mouse-x", "50%");
    divRef.current!.style.setProperty("--mouse-y", "50%");
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${s.card} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
