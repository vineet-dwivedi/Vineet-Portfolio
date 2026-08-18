import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';

type IntroScreenProps = {
  isVisible: boolean;
  name: string;
};

type MinimalParticle = {
  id: number;
  x: number; // %
  y: number; // %
  size: number;
  duration: number;
  delay: number;
};

const easeCustom = [0.16, 1, 0.3, 1] as const;

function generateMinimalParticles(count: number): MinimalParticle[] {
  const particles: MinimalParticle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      duration: 4 + Math.random() * 5,
      delay: Math.random() * 2,
    });
  }
  return particles;
}

export function IntroScreen({ isVisible, name }: IntroScreenProps) {
  const prefersReducedMotion = useReducedMotion();
  const particles = useMemo(() => generateMinimalParticles(28), []);

  const nameLetters = (name + ' DWIVEDI').split('');

  return (
    <AnimatePresence mode="wait">
      {isVisible ? (
        <motion.div
          className="intro-screen"
          initial={prefersReducedMotion ? false : { opacity: 1 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1 }}
          exit={{
            opacity: 0,
            filter: 'blur(16px)',
            scale: 1.025,
            transition: {
              duration: prefersReducedMotion ? 0.01 : 0.7,
              ease: easeCustom,
            },
          }}
        >
          {/* Subtle minimal background glow */}
          <div className="intro-ambient-glow" aria-hidden="true" />

          {/* Architectural minimal frame corners */}
          <div className="intro-frame-corners" aria-hidden="true">
            <span className="corner top-left">+</span>
            <span className="corner top-right">+</span>
            <span className="corner bottom-left">+</span>
            <span className="corner bottom-right">+</span>
          </div>

          {/* Floating dust particles */}
          <div className="intro-particles-container" aria-hidden="true">
            {particles.map((p) => (
              <motion.span
                key={p.id}
                className="intro-dust-dot"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                }}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 0 }}
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        opacity: [0, 0.45, 0],
                        y: [0, -40, -90],
                      }
                }
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Center Content */}
          <div className="intro-screen-content">

            <div className="intro-name-wrapper" aria-label={`${name} Dwivedi`}>
              {nameLetters.map((char, index) => (
                <motion.span
                  key={`${char}-${index}`}
                  className={`intro-name-char ${char === ' ' ? 'space' : ''}`}
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, y: '0.9em', filter: 'blur(10px)' }
                  }
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { opacity: 1, y: '0em', filter: 'blur(0px)' }
                  }
                  transition={{
                    delay: 0.28 + index * 0.045,
                    duration: 0.6,
                    ease: easeCustom,
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </div>

            <motion.div
              className="intro-footer-row"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6, ease: easeCustom }}
            >
              <span className="intro-role">Software Engineer</span>
              <span className="intro-divider" />
              <span className="intro-status">Full-Stack Developer</span>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
