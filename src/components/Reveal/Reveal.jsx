import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, viewportOnce } from '../../animations/variants';

/**
 * Scroll-reveal wrapper. Renders a motion element that animates in once
 * when it enters the viewport. Respects prefers-reduced-motion.
 */
export default function Reveal({
  as = 'div',
  variants = fadeUp,
  delay = 0,
  className,
  children,
  ...rest
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;

  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  // Variant-level transitions win over the `transition` prop, so merge the delay into the variant.
  const resolved = delay
    ? {
        ...variants,
        visible: {
          ...variants.visible,
          transition: { ...(variants.visible?.transition || {}), delay },
        },
      }
    : variants;

  return (
    <Tag
      className={className}
      variants={resolved}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      {...rest}
    >
      {children}
    </Tag>
  );
}
