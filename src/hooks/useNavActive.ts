import { useEffect, useState } from "react";

/**
 * Відслідковує активну секцію через IntersectionObserver.
 * Повертає id секції, що зараз найбільше видна у вьюпорті
 * (той самий алгоритм, що й у ванільному main.js).
 *
 * @param sectionIds  — масив id секцій, що спостерігаються (порядок важливий)
 */
export function useNavActive(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!sectionIds.length) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        threshold: 0.35,
        rootMargin: "-64px 0px -40% 0px",
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
