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
import {
  GithubIcon,
  InstagramIcon,
  LinkedInIcon,
} from '../components/icons/social-icons';
import type {
  ExperienceItem,
  NavLink,
  SocialLink,
  StackGroup,
} from '../types/portfolio';

const lenisIcon: SimpleIcon = {
  title: 'Lenis',
  slug: 'lenis',
  svg: '',
  path: 'M6 4h3v11.1c0 1.37.8 2.15 2.16 2.15H18V20h-7.08C7.86 20 6 18.14 6 15.12V4Zm7 0h5v3h-5V4Z',
  source: 'https://lenis.darkroom.engineering/',
  hex: '000000',
};

export const experience: ExperienceItem[] = [
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

export const stackGroups: StackGroup[] = [
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

export function buildSocialLinks(githubProfileUrl: string): SocialLink[] {
  return [
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
  ];
}

export function buildNavigationLinks(githubProfileUrl: string): NavLink[] {
  return [
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
  ];
}
