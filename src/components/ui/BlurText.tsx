/**
 * BlurText — анімований текст з ефектом розмиття.
 * Адаптовано з react-bits (reactbits.dev/text-animations/blur-text).
 * Залежність: framer-motion (вже встановлено).
 */
import { useEffect, useRef, useState, useMemo } from "react";
import { motion, type TargetAndTransition } from "framer-motion";

type AnimFrame = Record<string, string | number | null | undefined>;

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: AnimFrame;
  animationTo?: AnimFrame[];
  onAnimationComplete?: () => void;
  stepDuration?: number;
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
}

function buildKeyframes(from: AnimFrame, steps: AnimFrame[]) {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);
  const keyframes: Record<string, (string | number | null | undefined)[]> = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes as TargetAndTransition;
}

export function BlurText({
  text = "",
  delay = 150,
  className = "",
  animateBy = "words",
  direction = "bottom",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  onAnimationComplete,
  stepDuration = 0.38,
  as: Tag = "p",
}: BlurTextProps) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo<AnimFrame>(
    () =>
      direction === "top"
        ? { filter: "blur(12px)", opacity: 0, y: -40 }
        : { filter: "blur(12px)", opacity: 0, y: 40 },
    [direction]
  );

  const defaultTo = useMemo<AnimFrame[]>(
    () => [
      { filter: "blur(6px)", opacity: 0.5, y: direction === "top" ? 5 : -5 },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.p;

  return (
    <MotionTag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={className}
      style={{ display: "flex", flexWrap: "wrap", gap: "0 0.06em" }}
    >
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);
        const spanTransition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
        };

        return (
          <motion.span
            key={index}
            style={{ display: "inline-block", willChange: "transform, filter, opacity" }}
            initial={fromSnapshot as TargetAndTransition}
            animate={inView ? animateKeyframes : (fromSnapshot as TargetAndTransition)}
            transition={spanTransition}
            onAnimationComplete={
              index === elements.length - 1 ? onAnimationComplete : undefined
            }
          >
            {segment === " " ? "\u00A0" : segment}
          </motion.span>
        );
      })}
    </MotionTag>
  );
}
