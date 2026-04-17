import { useCallback, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import s from "./Lightbox.module.css";

export interface LightboxItem {
  src: string;
  label: string;
}

interface LightboxProps {
  items: LightboxItem[];
  /** Індекс початкового фото. null → модал закритий */
  initialIndex: number | null;
  onClose: () => void;
}

/**
 * Lightbox на Radix Dialog.
 * — Focus trap, scroll lock + padding-right компенсація: з коробки Radix.
 * — Навігація: кнопки ← →, клавіші ArrowLeft/ArrowRight.
 * — Закриття: кнопка ✕, клік по оверлею, Escape.
 * — items — стабільний масив з portfolioData.gallery; getGalleryItems() не потрібен.
 */
export function Lightbox({ items, initialIndex, onClose }: LightboxProps) {
  const isOpen = initialIndex !== null;
  const [currentIndex, setCurrentIndex] = useState(initialIndex ?? 0);

  // Синхронізуємо внутрішній індекс коли пропс змінюється (новий відкритий елемент)
  useEffect(() => {
    if (initialIndex !== null) {
      setCurrentIndex(initialIndex);
    }
  }, [initialIndex]);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + items.length) % items.length);
  }, [items.length]);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % items.length);
  }, [items.length]);

  // Клавіатурна навігація — лише коли модал відкритий
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, prev, next]);

  const current = items[currentIndex];

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} onClick={onClose} />

        <Dialog.Content
          className={s.content}
          aria-describedby={undefined}
          onInteractOutside={onClose}
        >
          <VisuallyHidden asChild>
            <Dialog.Title>Перегляд зображення</Dialog.Title>
          </VisuallyHidden>

          {current && (
            <div className={s.imgWrap}>
              <img
                key={current.src}
                src={current.src}
                alt={current.label}
                className={s.img}
              />
              {current.label && (
                <p className={s.caption}>{current.label}</p>
              )}
            </div>
          )}

          {/* Кнопка закрити */}
          <Dialog.Close asChild>
            <button className={s.close} type="button" aria-label="Закрити">
              ✕
            </button>
          </Dialog.Close>

          {/* Навігація — показуємо лише якщо більше одного фото */}
          {items.length > 1 && (
            <>
              <button
                className={`${s.nav} ${s.navPrev}`}
                type="button"
                aria-label="Попереднє зображення"
                onClick={prev}
              >
                ‹
              </button>
              <button
                className={`${s.nav} ${s.navNext}`}
                type="button"
                aria-label="Наступне зображення"
                onClick={next}
              >
                ›
              </button>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
