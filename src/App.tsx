import { useEffect, useMemo, useState } from 'react';
import type { ComponentType, SVGProps } from 'react';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import { GitHubCalendar } from 'react-github-calendar';
import { ArrowUpRight, Download, Moon, SunMedium } from 'lucide-react';
import type { SimpleIcon } from 'simple-icons';
import {
  siCss,
  siExpress,
  siFigma,
  siFramer,
  siGreensock,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siReact,
  siSvg,
  siTypescript,
  siVite,
} from 'simple-icons';

type Theme = 'light' | 'dark';

type ExperienceItem = {
  period: string;
  role: string;
  company: string;
  description: string;
};

type SocialLink = {
  label: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

type StackItem = {
  label: string;
  subtitle: string;
  icon: SimpleIcon;
};

type StackGroup = {
  title: string;
  items: StackItem[];
};

type ContributionActivity = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type ContributionApiResponse = {
  contributions: ContributionActivity[];
  error?: string;
};

type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  owner: {
    login: string;
  };
};

const experience: ExperienceItem[] = [
  {
    period: '2022 - Present',
    role: 'Senior Frontend Engineer',
    company: 'TechCorp Inc.',
    description:
      'Led the frontend architecture for the core product dashboard. Mentored a team of 4 developers, migrated the legacy codebase to React, and improved performance across the UI.',
  },
  {
    period: '2019 - 2022',
    role: 'Web Developer',
    company: 'Creative Agency',
    description:
      'Developed responsive marketing sites and e-commerce platforms for high-profile clients with a strong focus on accessibility, semantic HTML, and polished user interactions.',
  },
  {
    period: '2017 - 2019',
    role: 'Junior Developer',
    company: 'StartupHub',
    description:
      'Collaborated with product managers to design and implement MVP interfaces, then translated early branding and product ideas into functional UI components.',
  },
];

const lenisIcon: SimpleIcon = {
  title: 'Lenis',
  slug: 'lenis',
  svg: '',
  path: 'M6 4h3v11.1c0 1.37.8 2.15 2.16 2.15H18V20h-7.08C7.86 20 6 18.14 6 15.12V4Zm7 0h5v3h-5V4Z',
  source: 'https://lenis.darkroom.engineering/',
  hex: '000000',
};

const stackGroups: StackGroup[] = [
  {
    title: 'Frontend',
    items: [
      { label: 'React', subtitle: 'UI architecture', icon: siReact },
      { label: 'Next.js', subtitle: 'App framework', icon: siNextdotjs },
      { label: 'TypeScript', subtitle: 'Typed interfaces', icon: siTypescript },
      { label: 'Vite', subtitle: 'Fast tooling', icon: siVite },
      { label: 'CSS', subtitle: 'Refined styling', icon: siCss },
    ],
  },
  {
    title: 'Backend',
    items: [
      { label: 'Node.js', subtitle: 'Runtime and APIs', icon: siNodedotjs },
      { label: 'Express', subtitle: 'Service layer', icon: siExpress },
      { label: 'MongoDB', subtitle: 'Document data', icon: siMongodb },
    ],
  },
  {
    title: 'Animation',
    items: [
      { label: 'Lenis', subtitle: 'Smooth scrolling', icon: lenisIcon },
      { label: 'Framer', subtitle: 'Interface motion', icon: siFramer },
      { label: 'GSAP', subtitle: 'Timeline control', icon: siGreensock },
      { label: 'CSS Motion', subtitle: 'Micro interactions', icon: siCss },
    ],
  },
  {
    title: 'Design',
    items: [
      { label: 'Figma', subtitle: 'Interface systems', icon: siFigma },
      { label: 'SVG', subtitle: 'Scalable icon work', icon: siSvg },
    ],
  },
];

const githubUsername = import.meta.env.VITE_GITHUB_USERNAME?.trim() ?? '';
const githubContributionApiUrl = 'https://github-contributions-api.jogruber.de/v4/';
const githubRepoApiUrl = 'https://api.github.com';
const contributionRefreshIntervalMs = 1000 * 60 * 15;
const githubContributionTheme = {
  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
};

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }

    const savedTheme = window.localStorage.getItem('portfolio-theme');

    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    return 'light';
  });
  const [calendarRefreshToken, setCalendarRefreshToken] = useState(0);
  const [contributionCount, setContributionCount] = useState<number | null>(null);
  const [contributionError, setContributionError] = useState('');
  const [isContributionLoading, setIsContributionLoading] = useState(false);
  const [starredRepos, setStarredRepos] = useState<GitHubRepo[]>([]);
  const [projectsError, setProjectsError] = useState('');
  const [areProjectsLoading, setAreProjectsLoading] = useState(false);

  const hasGithubUsername = githubUsername.length > 0;
  const githubProfileUrl = hasGithubUsername
    ? `https://github.com/${githubUsername}`
    : 'https://github.com/';
  const githubStarsUrl = hasGithubUsername
    ? `https://github.com/${githubUsername}?tab=stars`
    : 'https://github.com/';
  const formattedContributionCount = useMemo(
    () =>
      contributionCount === null
        ? '--'
        : new Intl.NumberFormat('en-US').format(contributionCount),
    [contributionCount],
  );
  const contributionStatus = isContributionLoading
    ? 'Syncing from GitHub...'
    : contributionCount === 1
      ? 'public contribution'
      : 'public contributions';

  const socialLinks: SocialLink[] = useMemo(
    () => [
      {
        label: 'GitHub',
        href: githubProfileUrl,
        Icon: GithubIcon,
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/',
        Icon: LinkedInIcon,
      },
      {
        label: 'Instagram',
        href: 'https://www.instagram.com/',
        Icon: InstagramIcon,
      },
    ],
    [githubProfileUrl],
  );

  const navigationLinks: NavLink[] = useMemo(
    () => [
      {
        label: 'Projects',
        href: '#projects',
      },
      {
        label: 'Contact',
        href: '#contact',
      },
      {
        label: 'GitHub',
        href: githubProfileUrl,
        external: true,
      },
    ],
    [githubProfileUrl],
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!hasGithubUsername || typeof window === 'undefined') {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setCalendarRefreshToken((currentToken) => currentToken + 1);
    }, contributionRefreshIntervalMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [hasGithubUsername]);

  useEffect(() => {
    if (!hasGithubUsername) {
      return;
    }

    let isCancelled = false;

    async function loadContributionSummary() {
      setIsContributionLoading(true);

      try {
        const response = await fetch(`${githubContributionApiUrl}${githubUsername}?y=last`);
        const data = (await response.json()) as ContributionApiResponse;

        if (!response.ok) {
          throw new Error(data.error ?? 'Unable to load contributions.');
        }

        const totalCount = data.contributions.reduce(
          (sum, contribution) => sum + contribution.count,
          0,
        );

        if (!isCancelled) {
          setContributionCount(totalCount);
          setContributionError('');
        }
      } catch {
        if (!isCancelled) {
          setContributionError('Unable to refresh GitHub activity right now.');
        }
      } finally {
        if (!isCancelled) {
          setIsContributionLoading(false);
        }
      }
    }

    void loadContributionSummary();

    return () => {
      isCancelled = true;
    };
  }, [calendarRefreshToken, hasGithubUsername]);

  useEffect(() => {
    if (!hasGithubUsername) {
      return;
    }

    let isCancelled = false;

    async function loadStarredRepos() {
      setAreProjectsLoading(true);

      try {
        const response = await fetch(
          `${githubRepoApiUrl}/users/${githubUsername}/starred?sort=created&direction=desc&per_page=6`,
          {
            headers: {
              Accept: 'application/vnd.github+json',
            },
          },
        );
        const data = (await response.json()) as GitHubRepo[] | { message?: string };

        if (!response.ok || !Array.isArray(data)) {
          throw new Error(
            Array.isArray(data) ? 'Unable to load starred repositories.' : (data.message ?? 'Unable to load starred repositories.'),
          );
        }

        if (!isCancelled) {
          setStarredRepos(data);
          setProjectsError('');
        }
      } catch {
        if (!isCancelled) {
          setProjectsError('Unable to load starred repositories right now.');
        }
      } finally {
        if (!isCancelled) {
          setAreProjectsLoading(false);
        }
      }
    }

    void loadStarredRepos();

    return () => {
      isCancelled = true;
    };
  }, [calendarRefreshToken, hasGithubUsername]);

  return (
    <div className="page-shell">
      <header className="site-header">
        <a className="brand" href="#top">
          Vinee Developer
        </a>

        <div className="header-actions">
          <nav className="site-nav" aria-label="Primary">
            {navigationLinks.map(({ label, href, external }) => (
              <a
                key={label}
                className="nav-link"
                href={href}
                {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                {label}
              </a>
            ))}
          </nav>

          <button
            className="theme-toggle"
            type="button"
            onClick={() =>
              setTheme((currentTheme) =>
                currentTheme === 'light' ? 'dark' : 'light',
              )
            }
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <Moon size={20} strokeWidth={1.8} />
            ) : (
              <SunMedium size={20} strokeWidth={1.8} />
            )}
          </button>
        </div>
      </header>

      <main className="content" id="top">
        <section className="hero-section" aria-labelledby="intro-title">
          <div className="hero-copy-wrap">
            <h1 id="intro-title">
              Software engineer crafting minimal and accessible digital
              experiences.
            </h1>
            <p className="hero-copy">
              Currently building intuitive user interfaces and scalable web
              applications. Passionate about clean code, performance, and
              typography. Based in India.
            </p>
          </div>

          <div className="social-links" aria-label="Social links">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                className="social-link"
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </section>

        <section className="stack-section" aria-labelledby="stack-title">
          <div className="section-header">
            <h2 id="stack-title">Tech Stack</h2>
          </div>

          <div className="stack-groups" aria-label="Tech stack categories">
            {stackGroups.map((group) => (
              <article className="stack-group" key={group.title}>
                <h3 className="stack-group-title">{group.title}</h3>
                <div className="stack-items">
                  {group.items.map((item) => (
                    <div className="stack-item" key={`${group.title}-${item.label}`}>
                      <div className="stack-logo" aria-hidden="true">
                        <BrandIcon icon={item.icon} />
                      </div>
                      <div className="stack-item-copy">
                        <span className="stack-item-label">{item.label}</span>
                        <span className="stack-item-subtitle">{item.subtitle}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contributions-section" aria-labelledby="contributions-title">
          <div className="section-header">
            <h2 id="contributions-title">GitHub Activity</h2>
          </div>

          {hasGithubUsername ? (
            <div className="calendar-card">
              <div className="calendar-top">
                <div className="calendar-stat">
                  <p className="calendar-eyebrow">Last 12 months</p>
                  <p className="calendar-total">{formattedContributionCount}</p>
                  <p className="calendar-caption">{contributionStatus}</p>
                </div>

                <a
                  className="calendar-profile"
                  href={githubProfileUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>@{githubUsername}</span>
                  <ArrowUpRight size={16} strokeWidth={1.9} />
                </a>
              </div>

              <div className="calendar-shell">
                <GitHubCalendar
                  key={`${githubUsername}-${calendarRefreshToken}`}
                  username={githubUsername}
                  blockSize={11}
                  blockMargin={4}
                  blockRadius={2}
                  colorScheme={theme}
                  errorMessage="Unable to load the GitHub graph right now."
                  fontSize={11}
                  showColorLegend={false}
                  showTotalCount={false}
                  showWeekdayLabels={['mon', 'wed', 'fri']}
                  theme={githubContributionTheme}
                  year="last"
                  className="github-calendar"
                />
              </div>

              <p className="calendar-note">
                {contributionError || 'Updates automatically from your public GitHub contribution calendar.'}
              </p>
            </div>
          ) : (
            <div className="calendar-empty">
              Add <code>VITE_GITHUB_USERNAME</code> to <code>.env.local</code> to show your GitHub activity.
            </div>
          )}
        </section>

        <section className="projects-section" id="projects" aria-labelledby="projects-title">
          <div className="section-header">
            <h2 id="projects-title">Projects</h2>
            {hasGithubUsername ? (
              <a
                className="section-link"
                href={githubStarsUrl}
                target="_blank"
                rel="noreferrer"
              >
                <span>Starred repos</span>
                <ArrowUpRight size={16} strokeWidth={1.9} />
              </a>
            ) : null}
          </div>

          {hasGithubUsername ? (
            starredRepos.length > 0 ? (
              <div className="project-list">
                {starredRepos.map((repo) => {
                  const liveUrl = getProjectLiveUrl(repo.homepage);

                  return (
                    <article className="project-card" key={repo.id}>
                      <div className="project-copy">
                        <h3>{repo.name}</h3>
                        <p className="project-description">
                          {repo.description ?? `Starred repository from ${repo.owner.login}.`}
                        </p>
                        <p className="project-meta">
                          {buildProjectMeta(repo)}
                        </p>
                      </div>

                      <div className="project-actions">
                        {liveUrl ? (
                          <a
                            className="project-live-link"
                            href={liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Open live project for ${repo.full_name}`}
                          >
                            <span>Live</span>
                          </a>
                        ) : null}

                        <a
                          className="project-link"
                          href={repo.html_url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Open code for ${repo.full_name}`}
                        >
                          <span>Code</span>
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="project-empty">
                {areProjectsLoading
                  ? 'Syncing your starred repositories...'
                  : (projectsError || 'No starred repositories found for this profile.')}
              </div>
            )
          ) : (
            <div className="project-empty">
              Add <code>VITE_GITHUB_USERNAME</code> to <code>.env.local</code> to sync starred repositories here.
            </div>
          )}
        </section>

        <section className="experience-section" aria-labelledby="experience-title">
          <div className="section-header">
            <h2 id="experience-title">Experience</h2>
            <a className="resume-link" href="/resume-placeholder.txt" download>
              <Download size={16} strokeWidth={1.9} />
              <span>Resume</span>
            </a>
          </div>

          <div className="experience-list">
            {experience.map((item) => (
              <article className="experience-item" key={`${item.period}-${item.role}`}>
                <p className="experience-period">{item.period}</p>
                <div className="experience-details">
                  <h3>{item.role}</h3>
                  <p className="experience-company">{item.company}</p>
                  <p className="experience-description">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="section-header">
            <h2 id="contact-title">Contact</h2>
          </div>

          <div className="contact-card">
            <p>
              Building thoughtful products, collaborations, or freelance work.
              Reach out and let&apos;s make something sharp and useful together.
            </p>
            <a className="contact-link" href="mailto:your.email@example.com">
              your.email@example.com
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

function buildProjectMeta(repo: GitHubRepo) {
  return [
    repo.language,
    `${new Intl.NumberFormat('en-US').format(repo.stargazers_count)} stars`,
    `${new Intl.NumberFormat('en-US').format(repo.forks_count)} forks`,
    `Updated ${formatProjectDate(repo.updated_at)}`,
  ]
    .filter(Boolean)
    .join(' Â· ');
}

function getProjectLiveUrl(homepage: string | null) {
  if (!homepage) {
    return '';
  }

  const trimmedHomepage = homepage.trim();

  if (!trimmedHomepage) {
    return '';
  }

  return /^https?:\/\//i.test(trimmedHomepage)
    ? trimmedHomepage
    : `https://${trimmedHomepage}`;
}

function formatProjectDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

function BrandIcon({ icon }: { icon: SimpleIcon }) {
  const fill =
    icon.hex.toLowerCase() === '000000' || icon.hex.toLowerCase() === 'ffffff'
      ? 'currentColor'
      : `#${icon.hex}`;

  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={icon.title}>
      <path d={icon.path} fill={fill} />
    </svg>
  );
}

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.19-.02-2.15-3.2.7-3.88-1.35-3.88-1.35-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.14 1.18A10.9 10.9 0 0 1 12 6.02c.97 0 1.95.13 2.86.38 2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.28 5.67.41.35.78 1.03.78 2.08 0 1.5-.01 2.72-.01 3.08 0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M4.98 3.5a1.98 1.98 0 1 0 0 3.96 1.98 1.98 0 0 0 0-3.96ZM3.27 8.98H6.7V20.5H3.27V8.98Zm5.43 0h3.29v1.57h.05c.46-.87 1.58-1.79 3.26-1.79 3.49 0 4.13 2.17 4.13 5v6.74h-3.43v-5.97c0-1.43-.03-3.26-2.08-3.26-2.08 0-2.4 1.54-2.4 3.15v6.08H8.7V8.98Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M7.25 2.5h9.5a4.75 4.75 0 0 1 4.75 4.75v9.5A4.75 4.75 0 0 1 16.75 21.5h-9.5A4.75 4.75 0 0 1 2.5 16.75v-9.5A4.75 4.75 0 0 1 7.25 2.5Zm0 1.75a3 3 0 0 0-3 3v9.5a3 3 0 0 0 3 3h9.5a3 3 0 0 0 3-3v-9.5a3 3 0 0 0-3-3h-9.5Zm10.12 1.31a1.12 1.12 0 1 1 0 2.24 1.12 1.12 0 0 1 0-2.24ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.75a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default App;



