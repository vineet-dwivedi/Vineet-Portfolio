import type { SimpleIcon } from 'simple-icons';
import {
  siCss,
  siDocker,
  siExpress,
  siFastapi,
  siFigma,
  siFramer,
  siGreensock,
  siKubernetes,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPython,
  siReact,
  siVite,
  siJavascript
} from 'simple-icons';
import {
  GithubIcon,
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

const awsIcon: SimpleIcon = {
  title: 'AWS',
  slug: 'amazonaws',
  svg: '',
  path: 'M6.763 10.035c0 .324.043.547.129.67.086.121.234.183.444.183.149 0 .319-.033.511-.098a7.352 7.352 0 0 0 .548-.223l.169.366c-.248.241-.53.421-.849.541a2.68 2.68 0 0 1-.926.18c-.461 0-.814-.129-1.059-.387-.246-.258-.369-.64-.369-1.146 0-.324.053-.666.159-1.026l.666-2.181H5.16l.169-.479h1.168l.45-1.469h1.196l-.45 1.469h1.834l-.169.479H7.526l-.763 2.511zm3.899 1.545l.939-3.053h1.196l-.417 1.348h2.001l.417-1.348h1.196l-.939 3.053h-1.196l.432-1.398h-2.001l-.432 1.398h-1.228zm8.012.087a3.023 3.023 0 0 1-1.378-.292 2.128 2.128 0 0 1-.933-.87 2.617 2.617 0 0 1-.342-1.365c0-.604.133-1.109.399-1.515a2.533 2.533 0 0 1 1.092-.933c.461-.225.986-.337 1.575-.337.525 0 .954.09 1.287.27.333.18.574.433.723.759l-.915.423c-.105-.205-.246-.356-.423-.454a1.272 1.272 0 0 0-.672-.147c-.375 0-.701.085-.978.255a1.59 1.59 0 0 0-.615.696c-.144.3-.216.657-.216 1.071 0 .399.072.731.216.996.144.264.354.457.63.579.276.12.594.18.954.18.423 0 .783-.075 1.08-.225.297-.15.522-.36.675-.63l.9.438a2.766 2.766 0 0 1-.996.954 3.055 3.055 0 0 1-1.503.351z',
  source: 'https://aws.amazon.com/',
  hex: 'FF9900',
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
    skills: 'Express.js, React.js, Node.js, MongoDB',
  },
];

export const stackGroups: StackGroup[] = [
  {
    title: 'Frontend',
    items: [
      { label: 'React', subtitle: 'UI architecture', icon: siReact },
      { label: 'Next.js', subtitle: 'App framework', icon: siNextdotjs },
      { label: 'Vite', subtitle: 'Fast tooling', icon: siVite },
      { label: 'CSS', subtitle: 'Refined styling', icon: siCss },
    ],
  },
  {
    title: 'Backend',
    items: [
      {label: 'Javascript', subtitle: 'Core language', icon: siJavascript},
      { label: 'Python', subtitle: 'Language', icon: siPython },
      { label: 'FastAPI', subtitle: 'Async REST APIs', icon: siFastapi },
      { label: 'Node.js', subtitle: 'Runtime & APIs', icon: siNodedotjs },
      { label: 'Express', subtitle: 'Service layer', icon: siExpress },
      { label: 'MongoDB', subtitle: 'Document data', icon: siMongodb },
    ],
  },
  {
    title: 'DevOps & Cloud',
    items: [
      { label: 'Docker', subtitle: 'Containerization', icon: siDocker },
      { label: 'Kubernetes', subtitle: 'Orchestration', icon: siKubernetes },
      { label: 'AWS', subtitle: 'Cloud infrastructure', icon: awsIcon },
    ],
  },
  {
    title: 'Design & Motion',
    items: [
      { label: 'Framer', subtitle: 'Interface motion', icon: siFramer },
      { label: 'GSAP', subtitle: 'Timeline control', icon: siGreensock },
      { label: 'Lenis', subtitle: 'Smooth scroll', icon: lenisIcon },
      { label: 'Figma', subtitle: 'Interface design', icon: siFigma },
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
