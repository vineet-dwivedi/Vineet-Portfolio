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
