/**
 * Shared Framer Motion variants.
 * Keep motion restrained: short durations, soft easing, small travel distances.
 */
export const EASE = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0.05) => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

export const imageReveal = {
  hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0.6 },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    opacity: 1,
    transition: { duration: 0.9, ease: EASE },
  },
};

export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: EASE } },
};

export const viewportOnce = { once: true, margin: '0px 0px -80px 0px' };
