import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import { ContactSection } from './components/contact-section/contact-section';
import { ContributionsSection } from './components/contributions-section/contributions-section';
import { ExperienceSection } from './components/experience-section/experience-section';
import { Header } from './components/header/header';
import { HeroSection } from './components/hero-section/hero-section';
import { IntroScreen } from './components/intro-screen/intro-screen';
import { ProjectsSection } from './components/projects-section/projects-section';
import { RevealBlock } from './components/reveal-block/reveal-block';
import { StackSection } from './components/stack-section/stack-section';
import {
  buildNavigationLinks,
  buildSocialLinks,
  experience,
  stackGroups,
} from './data/portfolio-content';
import { useGithubPortfolio } from './hooks/use-github-portfolio';
import { useSmoothScroll } from './hooks/use-smooth-scroll';
import { useTheme } from './hooks/use-theme';
import { githubUsername } from './lib/github';

function App() {
  const prefersReducedMotion = useReducedMotion();
  const [isIntroVisible, setIsIntroVisible] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const { theme, toggleTheme, transitionGlowRef, transitionOrbRef } = useTheme();
  const {
    areProjectsLoading,
    calendarRefreshToken,
    contributionError,
    contributionStatus,
    formattedContributionCount,
    githubProfileUrl,
    githubStarsUrl,
    hasGithubUsername,
    projectsError,
    starredRepos,
  } = useGithubPortfolio(githubUsername);

  useSmoothScroll();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsIntroVisible(false);
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setIsIntroVisible(false);
    }, 2300);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    document.documentElement.classList.toggle('intro-active', isIntroVisible);

    return () => {
      document.documentElement.classList.remove('intro-active');
    };
  }, [isIntroVisible]);

  const navigationLinks = buildNavigationLinks(githubProfileUrl);
  const socialLinks = buildSocialLinks(githubProfileUrl);
  const isPortfolioVisible = !isIntroVisible;

  return (
    <>
      <IntroScreen isVisible={isIntroVisible} name="Vineet" />
      <span aria-hidden="true" className="theme-transition-glow" ref={transitionGlowRef} />
      <span aria-hidden="true" className="theme-transition-orb" ref={transitionOrbRef} />

      <motion.div
        className="page-shell"
        initial={false}
        style={{ pointerEvents: isPortfolioVisible ? 'auto' : 'none' }}
        animate={
          isPortfolioVisible
            ? {
                opacity: 1,
                y: 0,
              }
            : {
                opacity: 0,
                y: 24,
              }
        }
        transition={{
          duration: prefersReducedMotion ? 0.01 : 0.88,
          ease: [0.22, 1, 0.36, 1] as const,
        }}
      >
        <RevealBlock delay={0.08} isActive={isPortfolioVisible}>
          <Header
            navigationLinks={navigationLinks}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        </RevealBlock>

        <main className="content" id="top">
          <RevealBlock delay={0.14} isActive={isPortfolioVisible}>
            <HeroSection socialLinks={socialLinks} />
          </RevealBlock>
          <RevealBlock delay={0.22} isActive={isPortfolioVisible}>
            <StackSection stackGroups={stackGroups} />
          </RevealBlock>
          <RevealBlock delay={0.3} isActive={isPortfolioVisible}>
            <ContributionsSection
              calendarRefreshToken={calendarRefreshToken}
              contributionError={contributionError}
              contributionStatus={contributionStatus}
              formattedContributionCount={formattedContributionCount}
              githubProfileUrl={githubProfileUrl}
              githubUsername={githubUsername}
              hasGithubUsername={hasGithubUsername}
              theme={theme}
            />
          </RevealBlock>
          <RevealBlock delay={0.38} isActive={isPortfolioVisible}>
            <ProjectsSection
              areProjectsLoading={areProjectsLoading}
              githubStarsUrl={githubStarsUrl}
              hasGithubUsername={hasGithubUsername}
              projectsError={projectsError}
              starredRepos={starredRepos}
            />
          </RevealBlock>
          <RevealBlock delay={0.46} isActive={isPortfolioVisible}>
            <ExperienceSection experience={experience} />
          </RevealBlock>
          <RevealBlock delay={0.54} isActive={isPortfolioVisible}>
            <ContactSection />
          </RevealBlock>
        </main>
      </motion.div>
    </>
  );
}

export default App;
