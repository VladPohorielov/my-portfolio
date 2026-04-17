import { useEffect, useState } from "react";

/**
 * Повертає true, якщо сторінка прокручена більше ніж на threshold пікселів.
 * Використовується у Nav для додавання класу .scrolled.
 */
export function useScrolled(threshold = 40): boolean {
  const [scrolled, setScrolled] = useState(() => window.scrollY > threshold);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);

  return scrolled;
}
