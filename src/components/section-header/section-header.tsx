import type { ReactNode } from 'react';

type SectionHeaderProps = {
  id: string;
  title: string;
  action?: ReactNode;
};

export function SectionHeader({ id, title, action }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <h2 id={id}>{title}</h2>
      {action ?? null}
    </div>
  );
}
