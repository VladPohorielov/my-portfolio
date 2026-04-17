/**
 * ShinyText — текст з блискучим ефектом світлового відблиску.
 * Адаптовано з react-bits (reactbits.dev/text-animations/shiny-text).
 * Без зовнішніх залежностей.
 */
import type { ReactNode, CSSProperties } from "react";
import s from "./ShinyText.module.css";

interface ShinyTextProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  disabled?: boolean;
  style?: CSSProperties;
}

export function ShinyText({
  children,
  className = "",
  speed = 3,
  disabled = false,
  style,
}: ShinyTextProps) {
  return (
    <span
      className={`${s.shiny} ${disabled ? s.disabled : ""} ${className}`}
      style={{ "--speed": `${speed}s`, ...style } as CSSProperties}
    >
      {children}
    </span>
  );
}
