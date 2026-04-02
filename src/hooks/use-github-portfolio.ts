import { useEffect, useMemo, useState } from 'react';
import {
  contributionRefreshIntervalMs,
  getGithubProfileUrl,
  getGithubStarsUrl,
  githubContributionApiUrl,
  githubRepoApiUrl,
} from '../lib/github';
import type { ContributionApiResponse, GitHubRepo } from '../types/portfolio';

export function useGithubPortfolio(username: string) {
  const [calendarRefreshToken, setCalendarRefreshToken] = useState(0);
  const [contributionCount, setContributionCount] = useState<number | null>(null);
  const [contributionError, setContributionError] = useState('');
  const [isContributionLoading, setIsContributionLoading] = useState(false);
  const [starredRepos, setStarredRepos] = useState<GitHubRepo[]>([]);
  const [projectsError, setProjectsError] = useState('');
  const [areProjectsLoading, setAreProjectsLoading] = useState(false);

  const hasGithubUsername = username.length > 0;
  const githubProfileUrl = getGithubProfileUrl(username);
  const githubStarsUrl = getGithubStarsUrl(username);
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
        const response = await fetch(`${githubContributionApiUrl}${username}?y=last`);
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
  }, [calendarRefreshToken, hasGithubUsername, username]);

  useEffect(() => {
    if (!hasGithubUsername) {
      return;
    }

    let isCancelled = false;

    async function loadStarredRepos() {
      setAreProjectsLoading(true);

      try {
        const response = await fetch(
          `${githubRepoApiUrl}/users/${username}/starred?sort=created&direction=desc&per_page=6`,
          {
            headers: {
              Accept: 'application/vnd.github+json',
            },
          },
        );
        const data = (await response.json()) as GitHubRepo[] | { message?: string };

        if (!response.ok || !Array.isArray(data)) {
          throw new Error(
            Array.isArray(data)
              ? 'Unable to load starred repositories.'
              : (data.message ?? 'Unable to load starred repositories.'),
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
  }, [calendarRefreshToken, hasGithubUsername, username]);

  return {
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
  };
}
