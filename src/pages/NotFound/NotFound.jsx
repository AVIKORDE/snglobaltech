import { motion, useReducedMotion } from 'framer-motion';
import { Compass } from 'lucide-react';
import Button from '../../components/Button/Button';
import { useSeo } from '../../hooks/useSeo';
import { EASE } from '../../animations/variants';
import './NotFound.css';

/**
 * Generic "not found" screen. Reused by ProductDetails for unknown slugs.
 */
export default function NotFound({
  title = 'Page Not Found',
  message = 'The page you are looking for does not exist. It may have been moved or the link is incorrect.',
  backTo = '/',
  backLabel = 'Back to Home',
}) {
  const reduce = useReducedMotion();
  useSeo({ title, description: message });

  return (
    <section className="not-found">
      <span className="blob not-found__blob" aria-hidden="true" />
      <motion.div
        className="container not-found__inner"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="not-found__icon">
          <Compass size={34} aria-hidden="true" />
        </span>
        <span className="eyebrow">Error 404</span>
        <h1>{title}</h1>
        <p>{message}</p>
        <div className="not-found__actions">
          <Button to={backTo}>{backLabel}</Button>
          {backTo !== '/' && (
            <Button to="/" variant="outline" icon={false}>
              Go to Home
            </Button>
          )}
        </div>
      </motion.div>
    </section>
  );
}
