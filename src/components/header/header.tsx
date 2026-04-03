import type { MouseEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, SunMedium } from 'lucide-react';
import avatarImage from '../../../assets/vineet-avatar.jpeg';
import type { NavLink, Theme } from '../../types/portfolio';

type HeaderProps = {
  navigationLinks: NavLink[];
  theme: Theme;
  onToggleTheme: (event: MouseEvent<HTMLButtonElement>) => void;
};

export function Header({
  navigationLinks,
  theme,
  onToggleTheme,
}: HeaderProps) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Back to top">
        <img
          className="brand-avatar"
          src={avatarImage}
          alt="Portrait of Vineet Dwivedi"
          loading="eager"
          decoding="async"
        />
        <span className="brand-copy">
          <span className="brand-name">Vineet</span>
          <span className="brand-role">Portfolio</span>
        </span>
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
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          <span className="theme-toggle-shell">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                className="theme-toggle-icon"
                initial={{ opacity: 0, rotate: -70, scale: 0.72, y: 7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1, y: 0 }}
                exit={{ opacity: 0, rotate: 70, scale: 0.72, y: -7 }}
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] as const }}
              >
                {theme === 'light' ? (
                  <Moon size={20} strokeWidth={1.8} />
                ) : (
                  <SunMedium size={20} strokeWidth={1.8} />
                )}
              </motion.span>
            </AnimatePresence>
          </span>
        </button>
      </div>
    </header>
  );
}
