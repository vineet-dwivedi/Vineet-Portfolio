import type { ComponentType, SVGProps } from 'react';
import type { SimpleIcon } from 'simple-icons';

export type Theme = 'light' | 'dark';

export type ExperienceItem = {
  period: string;
  role: string;
  company: string;
  description?: string;
  location?: string;
  highlights?: string[];
  skills?: string;
};

export type SocialLink = {
  label: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type StackItem = {
  label: string;
  subtitle: string;
  icon: SimpleIcon;
};

export type StackGroup = {
  title: string;
  items: StackItem[];
};

export type ContributionActivity = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionApiResponse = {
  contributions: ContributionActivity[];
  error?: string;
};

export type GitHubRepo = {
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
