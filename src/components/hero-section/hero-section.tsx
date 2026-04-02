import type { SocialLink } from '../../types/portfolio';

type HeroSectionProps = {
  socialLinks: SocialLink[];
};

export function HeroSection({ socialLinks }: HeroSectionProps) {
  return (
    <section className="hero-section" aria-labelledby="intro-title">
      <div className="hero-copy-wrap">
        <h1 id="intro-title">
          Software engineer crafting minimal and accessible digital experiences.
        </h1>
        <p className="hero-copy">
          Currently building intuitive user interfaces and scalable web
          applications. Passionate about clean code, performance, and
          typography. Based in India.
        </p>
      </div>

      <div className="social-links" aria-label="Social links">
        {socialLinks.map(({ label, href, Icon }) => (
          <a
            key={label}
            className="social-link"
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
          >
            <Icon />
          </a>
        ))}
      </div>
    </section>
  );
}
