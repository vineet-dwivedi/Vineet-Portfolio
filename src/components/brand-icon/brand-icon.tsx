import type { SimpleIcon } from 'simple-icons';

type BrandIconProps = {
  icon: SimpleIcon;
};

export function BrandIcon({ icon }: BrandIconProps) {
  const fill =
    icon.hex.toLowerCase() === '000000' || icon.hex.toLowerCase() === 'ffffff'
      ? 'currentColor'
      : `#${icon.hex}`;

  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={icon.title}>
      <path d={icon.path} fill={fill} />
    </svg>
  );
}
