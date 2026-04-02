import type { StackGroup } from '../../types/portfolio';
import { BrandIcon } from '../brand-icon/brand-icon';
import { SectionHeader } from '../section-header/section-header';

type StackSectionProps = {
  stackGroups: StackGroup[];
};

export function StackSection({ stackGroups }: StackSectionProps) {
  return (
    <section className="stack-section" aria-labelledby="stack-title">
      <SectionHeader id="stack-title" title="Tech Stack" />

      <div className="stack-groups" aria-label="Tech stack categories">
        {stackGroups.map((group) => (
          <article className="stack-group" key={group.title}>
            <h3 className="stack-group-title">{group.title}</h3>
            <div className="stack-items">
              {group.items.map((item) => (
                <div className="stack-item" key={`${group.title}-${item.label}`}>
                  <div className="stack-logo" aria-hidden="true">
                    <BrandIcon icon={item.icon} />
                  </div>
                  <div className="stack-item-copy">
                    <span className="stack-item-label">{item.label}</span>
                    <span className="stack-item-subtitle">{item.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
