import { Moon, SunMedium } from 'lucide-react';
import type { NavLink, Theme } from '../../types/portfolio';

type HeaderProps = {
  navigationLinks: NavLink[];
  theme: Theme;
  onToggleTheme: () => void;
};

export function Header({
  navigationLinks,
  theme,
  onToggleTheme,
}: HeaderProps) {
  return (
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
          onClick={onToggleTheme}
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
  );
}
