import type { PropsWithChildren } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type RevealBlockProps = PropsWithChildren<{
  delay?: number;
  isActive: boolean;
}>;

const revealEase = [0.22, 1, 0.36, 1] as const;

export function RevealBlock({
  children,
  delay = 0,
  isActive,
}: RevealBlockProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className="reveal-block">{children}</div>;
  }

  return (
    <motion.div
      className="reveal-block"
      initial="hidden"
      animate={isActive ? 'visible' : 'hidden'}
      variants={{
        hidden: {
          opacity: 0,
          y: 20,
          scale: 0.992,
          filter: 'blur(8px)',
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
        },
      }}
      transition={{
        delay,
        duration: 0.92,
        ease: revealEase,
      }}
    >
      {children}
    </motion.div>
  );
}
