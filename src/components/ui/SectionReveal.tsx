import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

interface SectionRevealProps {
  children: React.ReactNode;
  /** Extra delay before the element animates in (seconds) */
  delay?: number;
  /** When true, direct children animate in a staggered sequence */
  stagger?: boolean;
  /** Gap between staggered children (seconds, default 0.08) */
  staggerDelay?: number;
  className?: string;
}

const baseVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: (staggerDelay: number) => ({
    transition: { staggerChildren: staggerDelay },
  }),
};

/**
 * Wraps its children in a Framer Motion `motion.div` that fades + slides up
 * the first time the element enters the viewport.
 *
 * Use `stagger={true}` to cascade each direct child sequentially — in this
 * mode the wrapper itself becomes a stagger container and each child should
 * also be wrapped in `<SectionReveal>` (or use the exported `RevealItem`).
 */
export function SectionReveal({
  children,
  delay = 0,
  stagger = false,
  staggerDelay = 0.08,
  className,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  if (stagger) {
    return (
      <motion.div
        ref={ref}
        className={className}
        variants={staggerContainer}
        custom={staggerDelay}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={baseVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Motion child used inside a `stagger` SectionReveal container.
 */
export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={baseVariants}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
