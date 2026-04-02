import type { GitHubRepo } from '../types/portfolio';

export const githubUsername = import.meta.env.VITE_GITHUB_USERNAME?.trim() ?? '';
export const githubContributionApiUrl = 'https://github-contributions-api.jogruber.de/v4/';
export const githubRepoApiUrl = 'https://api.github.com';
export const contributionRefreshIntervalMs = 1000 * 60 * 15;
export const githubContributionTheme = {
  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
};

export function getGithubProfileUrl(username: string) {
  return username ? `https://github.com/${username}` : 'https://github.com/';
}

export function getGithubStarsUrl(username: string) {
  return username ? `https://github.com/${username}?tab=stars` : 'https://github.com/';
}

export function buildProjectMeta(repo: GitHubRepo) {
  return [
    repo.language,
    `${new Intl.NumberFormat('en-US').format(repo.stargazers_count)} stars`,
    `${new Intl.NumberFormat('en-US').format(repo.forks_count)} forks`,
    `Updated ${formatProjectDate(repo.updated_at)}`,
  ]
    .filter(Boolean)
    .join(' · ');
}

export function getProjectLiveUrl(homepage: string | null) {
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
