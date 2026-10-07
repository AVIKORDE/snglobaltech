import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Button.css';

/**
 * Button / link with consistent styling.
 * - `to`   -> renders a react-router <Link>
 * - `href` -> renders an <a>
 * - else   -> <button>
 */
export default function Button({
  to,
  href,
  variant = 'primary', // primary | secondary | outline | ghost | light
  size = 'md', // sm | md | lg
  icon = true,
  className = '',
  children,
  ...rest
}) {
  const cls = `btn btn--${variant} btn--${size} ${className}`.trim();
  const content = (
    <>
      <span className="btn__label">{children}</span>
      {icon && <ArrowRight className="btn__icon" size={18} aria-hidden="true" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {content}
    </button>
  );
}
