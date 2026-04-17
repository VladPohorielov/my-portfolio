import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import s from "./VideoModal.module.css";

interface VideoModalProps {
  /** embed URL або null — модал відкритий коли src !== null */
  src: string | null;
  onClose: () => void;
}

/**
 * Відеомодал на Radix Dialog.
 * — Focus trap, scroll lock та повернення фокусу: з коробки Radix.
 * — При закритті iframe src очищується → відео зупиняється.
 * — Закриття: кнопка ✕, клік по оверлею, Escape.
 */
export function VideoModal({ src, onClose }: VideoModalProps) {
  return (
    <Dialog.Root open={src !== null} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />

        <Dialog.Content
          className={s.content}
          aria-describedby={undefined}
          onInteractOutside={onClose}
        >
          <VisuallyHidden asChild>
            <Dialog.Title>Відео</Dialog.Title>
          </VisuallyHidden>

          <div className={s.inner}>
            {/* src очищується автоматично — коли src=null компонент не відкритий,
                але для надійності перевіряємо і не рендеримо iframe без src */}
            {src && (
              <iframe
                src={src}
                allow="autoplay; fullscreen"
                allowFullScreen
                title="Відео"
              />
            )}
          </div>

          <Dialog.Close asChild>
            <button className={s.close} type="button" aria-label="Закрити відео">
              ✕
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
