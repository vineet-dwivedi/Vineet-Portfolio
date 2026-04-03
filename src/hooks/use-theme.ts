import type { MouseEvent } from 'react';
import { startTransition, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import type { Theme } from '../types/portfolio';

const themeStorageKey = 'portfolio-theme';
const lightThemeTransitionFill = '#f4f4ef';
const lightThemeTransitionGlow = 'rgba(255, 255, 255, 0.92)';
const darkThemeTransitionFill = '#050608';
const darkThemeTransitionGlow = 'rgba(255, 255, 255, 0.24)';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }

    const savedTheme = window.localStorage.getItem(themeStorageKey);

    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    return 'light';
  });
  const transitionOrbRef = useRef<HTMLSpanElement | null>(null);
  const transitionGlowRef = useRef<HTMLSpanElement | null>(null);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(themeStorageKey, theme);
  }, [theme]);

  function toggleTheme(event?: MouseEvent<HTMLButtonElement>) {
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    if (typeof window === 'undefined') {
      setTheme(nextTheme);
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const transitionOrb = transitionOrbRef.current;
    const transitionGlow = transitionGlowRef.current;

    if (
      prefersReducedMotion ||
      !transitionOrb ||
      !transitionGlow ||
      isAnimatingRef.current
    ) {
      setTheme(nextTheme);
      return;
    }

    isAnimatingRef.current = true;

    const buttonRect = event?.currentTarget.getBoundingClientRect();
    const originX = buttonRect
      ? buttonRect.left + buttonRect.width / 2
      : window.innerWidth - 48;
    const originY = buttonRect
      ? buttonRect.top + buttonRect.height / 2
      : 52;
    const maxRadius = Math.hypot(
      Math.max(originX, window.innerWidth - originX),
      Math.max(originY, window.innerHeight - originY),
    );
    const fill =
      nextTheme === 'dark'
        ? darkThemeTransitionFill
        : lightThemeTransitionFill;
    const glow =
      nextTheme === 'dark'
        ? darkThemeTransitionGlow
        : lightThemeTransitionGlow;

    gsap.killTweensOf([transitionOrb, transitionGlow, event?.currentTarget]);

    gsap.set(transitionOrb, {
      x: originX,
      y: originY,
      xPercent: -50,
      yPercent: -50,
      width: maxRadius * 2,
      height: maxRadius * 2,
      scale: 0,
      opacity: 1,
      background: fill,
    });

    gsap.set(transitionGlow, {
      x: originX,
      y: originY,
      xPercent: -50,
      yPercent: -50,
      width: maxRadius * 0.9,
      height: maxRadius * 0.9,
      scale: 0,
      opacity: 0,
      background: glow,
    });

    const timeline = gsap.timeline({
      defaults: {
        ease: 'power3.inOut',
      },
      onComplete: () => {
        isAnimatingRef.current = false;
        gsap.set([transitionOrb, transitionGlow], {
          clearProps: 'all',
          opacity: 0,
        });
      },
    });

    if (event?.currentTarget) {
      timeline
        .to(
          event.currentTarget,
          {
            rotate: '+=180',
            scale: 1.06,
            duration: 0.54,
            ease: 'power3.out',
          },
          0,
        )
        .to(
          event.currentTarget,
          {
            scale: 1,
            duration: 0.32,
            ease: 'power2.out',
          },
          0.54,
        );
    }

    timeline
      .to(
        transitionGlow,
        {
          scale: 1.7,
          opacity: 0.4,
          duration: 0.62,
        },
        0,
      )
      .to(
        transitionOrb,
        {
          scale: 1,
          duration: 0.88,
        },
        0,
      )
      .add(() => {
        startTransition(() => {
          setTheme(nextTheme);
        });
      }, 0.34)
      .to(
        transitionGlow,
        {
          scale: 2.05,
          opacity: 0,
          duration: 0.46,
        },
        0.52,
      )
      .to(
        transitionOrb,
        {
          opacity: 0,
          duration: 0.34,
          ease: 'power2.out',
        },
        0.78,
      );
  }

  return {
    theme,
    transitionGlowRef,
    transitionOrbRef,
    toggleTheme,
  };
}
