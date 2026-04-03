import { useEffect } from 'react';
import Lenis from 'lenis';

export function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    const lenis = new Lenis({
      anchors: true,
      duration: 1.35,
      lerp: 0.07,
      wheelMultiplier: 0.9,
    });

    let animationFrame = 0;

    function update(time: number) {
      lenis.raf(time);
      animationFrame = window.requestAnimationFrame(update);
    }

    animationFrame = window.requestAnimationFrame(update);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, []);
}
