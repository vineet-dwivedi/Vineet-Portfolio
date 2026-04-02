import { Download } from 'lucide-react';
import type { ExperienceItem } from '../../types/portfolio';
import { SectionHeader } from '../section-header/section-header';

type ExperienceSectionProps = {
  experience: ExperienceItem[];
};

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  const resumeAction = (
    <a className="resume-link" href="/resume-placeholder.txt" download>
      <Download size={16} strokeWidth={1.9} />
      <span>Resume</span>
    </a>
  );

  return (
    <section className="experience-section" aria-labelledby="experience-title">
      <SectionHeader id="experience-title" title="Experience" action={resumeAction} />

      <div className="experience-list">
        {experience.map((item) => (
          <article className="experience-item" key={`${item.period}-${item.role}`}>
            <p className="experience-period">{item.period}</p>
            <div className="experience-details">
              <h3>{item.role}</h3>
              <p className="experience-company">{item.company}</p>
              <p className="experience-description">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
