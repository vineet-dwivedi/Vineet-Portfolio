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
    period: 'Feb 2026 - Present | 3 mos',
    role: 'Software Developer Intern',
    company: 'Flowaris Technologies | Internship',
    location: 'Madhya Pradesh, India | Remote',
    description:
      'As an SDE Intern at Flowaris Technologies, I contribute to designing and developing full-stack web applications with a focus on performance, scalability, and user experience.',
    highlights: [
      'Developing RESTful APIs using Node.js and Express.',
      'Implementing dynamic and responsive UIs with React.',
      'Managing databases and schema design using MongoDB.',
    ],
    skills: 'Express.js, React.js and +2 skills',
  },
  {
    period: 'Oct 2025 - Present | 7 mos',
    role: 'Trainee',
    company: 'Sheryians Coding School | Apprenticeship',
    location: 'Madhya Pradesh, India | Remote',
    skills: 'JavaScript, CSS3 and +8 skills',
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
      href: 'https://www.linkedin.com/in/vineet-dwivedi/',
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
