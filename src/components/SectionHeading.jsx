import ScrollReveal from './ScrollReveal';

// Reusable section heading with eyebrow label, serif title, and optional subtitle.
// Used across all landing page sections for consistent typography hierarchy.

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
}) {
  const alignment =
    align === 'left' ? 'text-left items-start' : 'text-center items-center';

  return (
    <ScrollReveal className={`flex flex-col gap-3 ${alignment} ${className}`}>
      {eyebrow && (
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#c8601a]">
          {eyebrow}
        </span>
      )}
      <h2 className="max-w-2xl font-serif text-4xl font-light leading-[1.15] tracking-tight text-[#1a2e22] sm:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-xl text-base font-light leading-relaxed text-[#1a2e22]/50">
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}
