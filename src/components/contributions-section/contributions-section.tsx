import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { GitHubCalendar } from 'react-github-calendar';
import { githubContributionTheme } from '../../lib/github';
import type { Theme } from '../../types/portfolio';
import { SectionHeader } from '../section-header/section-header';

type ContributionsSectionProps = {
  calendarRefreshToken: number;
  contributionError: string;
  contributionStatus: string;
  formattedContributionCount: string;
  githubProfileUrl: string;
  githubUsername: string;
  hasGithubUsername: boolean;
  theme: Theme;
};

export function ContributionsSection({
  calendarRefreshToken,
  contributionError,
  contributionStatus,
  formattedContributionCount,
  githubProfileUrl,
  githubUsername,
  hasGithubUsername,
  theme,
}: ContributionsSectionProps) {
  const [viewportWidth, setViewportWidth] = useState(() => {
    if (typeof window === 'undefined') {
      return 1280;
    }

    return window.innerWidth;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    function handleResize() {
      setViewportWidth(window.innerWidth);
    }

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isPhoneViewport = viewportWidth <= 560;
  const isTabletViewport = viewportWidth <= 820;
  const calendarBlockSize = isPhoneViewport ? 5 : isTabletViewport ? 8 : 11;
  const calendarBlockMargin = isPhoneViewport ? 1 : isTabletViewport ? 2 : 4;
  const calendarFontSize = isPhoneViewport ? 9 : isTabletViewport ? 10 : 11;
  const weekdayLabels = isPhoneViewport
    ? false
    : (['mon', 'wed', 'fri'] as Array<'mon' | 'wed' | 'fri'>);

  return (
    <section
      className="contributions-section"
      aria-labelledby="contributions-title"
    >
      <SectionHeader id="contributions-title" title="GitHub Activity" />

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
              blockSize={calendarBlockSize}
              blockMargin={calendarBlockMargin}
              blockRadius={2}
              colorScheme={theme}
              errorMessage="Unable to load the GitHub graph right now."
              fontSize={calendarFontSize}
              showColorLegend={false}
              showMonthLabels={!isPhoneViewport}
              showTotalCount={false}
              showWeekdayLabels={weekdayLabels}
              theme={githubContributionTheme}
              year="last"
              className="github-calendar"
            />
          </div>

          <p className="calendar-note">
            {contributionError ||
              'Updates automatically from your public GitHub contribution calendar.'}
          </p>
        </div>
      ) : (
        <div className="calendar-empty">
          Add <code>VITE_GITHUB_USERNAME</code> to <code>.env.local</code> to
          show your GitHub activity.
        </div>
      )}
    </section>
  );
}
