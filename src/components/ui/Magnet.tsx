/**
 * Magnet — магнітний ефект для кнопок/елементів (притягує до курсора).
 * Адаптовано з react-bits (reactbits.dev/components/magnet).
 * Без зовнішніх залежностей.
 */
import { useRef, useState, type ReactNode, type CSSProperties } from "react";

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  strength?: number;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function Magnet({
  children,
  padding = 80,
  strength = 0.35,
  disabled = false,
  className = "",
  style,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const inRange =
      Math.abs(distX) < rect.width / 2 + padding &&
      Math.abs(distY) < rect.height / 2 + padding;

    if (inRange) {
      setTranslate({ x: distX * strength, y: distY * strength });
      setIsActive(true);
    } else {
      setTranslate({ x: 0, y: 0 });
      setIsActive(false);
    }
  }

  function handleMouseLeave() {
    setTranslate({ x: 0, y: 0 });
    setIsActive(false);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        ...style,
        transform: `translate(${translate.x}px, ${translate.y}px)`,
        transition: isActive
          ? "transform 0.15s ease-out"
          : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        display: "inline-block",
      }}
    >
      {children}
    </div>
  );
}
