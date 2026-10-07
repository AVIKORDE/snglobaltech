import Reveal from '../Reveal/Reveal';
import './SectionTitle.css';

/**
 * Eyebrow + heading + optional lead paragraph.
 * `align` = left | center. `as` controls heading level (h2 default).
 */
export default function SectionTitle({
  eyebrow,
  title,
  lead,
  align = 'left',
  as: Heading = 'h2',
  className = '',
  children,
}) {
  return (
    <Reveal className={`section-title section-title--${align} ${className}`.trim()}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Heading className="section-title__heading">{title}</Heading>
      {lead && <p className="lead section-title__lead">{lead}</p>}
      {children}
    </Reveal>
  );
}
