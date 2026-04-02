import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import { ContactSection } from './components/contact-section/contact-section';
import { ContributionsSection } from './components/contributions-section/contributions-section';
import { ExperienceSection } from './components/experience-section/experience-section';
import { Header } from './components/header/header';
import { HeroSection } from './components/hero-section/hero-section';
import { ProjectsSection } from './components/projects-section/projects-section';
import { StackSection } from './components/stack-section/stack-section';
import {
  buildNavigationLinks,
  buildSocialLinks,
  experience,
  stackGroups,
} from './data/portfolio-content';
import { useGithubPortfolio } from './hooks/use-github-portfolio';
import { useTheme } from './hooks/use-theme';
import { githubUsername } from './lib/github';

function App() {
  const { theme, toggleTheme } = useTheme();
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

  const navigationLinks = buildNavigationLinks(githubProfileUrl);
  const socialLinks = buildSocialLinks(githubProfileUrl);

  return (
    <div className="page-shell">
      <Header
        navigationLinks={navigationLinks}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="content" id="top">
        <HeroSection socialLinks={socialLinks} />
        <StackSection stackGroups={stackGroups} />
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
        <ProjectsSection
          areProjectsLoading={areProjectsLoading}
          githubStarsUrl={githubStarsUrl}
          hasGithubUsername={hasGithubUsername}
          projectsError={projectsError}
          starredRepos={starredRepos}
        />
        <ExperienceSection experience={experience} />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
