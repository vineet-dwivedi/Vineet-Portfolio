import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type IntroScreenProps = {
  isVisible: boolean;
  name: string;
};

const introEase = [0.22, 1, 0.36, 1] as const;

export function IntroScreen({ isVisible, name }: IntroScreenProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      {isVisible ? (
        <motion.div
          className="intro-screen"
          initial={prefersReducedMotion ? false : { opacity: 1 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1 }}
          exit={{
            opacity: 0,
            filter: 'blur(10px)',
            scale: 1.015,
            transition: {
              duration: prefersReducedMotion ? 0.01 : 0.5,
              ease: introEase,
            },
          }}
        >
          <motion.div
            className="intro-screen-inner"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.62, ease: introEase }}
          >
            <motion.span
              className="intro-screen-line"
              initial={prefersReducedMotion ? false : { opacity: 0, scaleX: 0 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.12, duration: 0.58, ease: introEase }}
            />

            <div className="intro-screen-name" aria-label={name}>
              {name.split('').map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  className="intro-screen-letter"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: '0.88em' }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, y: '0em' }}
                  transition={{
                    delay: 0.26 + index * 0.11,
                    duration: 0.46,
                    ease: introEase,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <motion.p
              className="intro-screen-tag"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={prefersReducedMotion ? undefined : { opacity: 0.72, y: 0 }}
              transition={{ delay: 1.14, duration: 0.44, ease: introEase }}
            >
              portfolio
            </motion.p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
