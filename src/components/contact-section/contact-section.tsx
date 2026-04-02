import { SectionHeader } from '../section-header/section-header';

export function ContactSection() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <SectionHeader id="contact-title" title="Contact" />

      <div className="contact-card">
        <p>
          Building thoughtful products, collaborations, or freelance work.
          Reach out and let&apos;s make something sharp and useful together.
        </p>
        <a className="contact-link" href="mailto:your.email@example.com">
          your.email@example.com
        </a>
      </div>
    </section>
  );
}
