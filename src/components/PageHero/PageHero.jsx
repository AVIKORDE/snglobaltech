import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { fadeUp, stagger } from '../../animations/variants';
import './PageHero.css';

/**
 * Inner-page banner with breadcrumb, eyebrow, title and lead.
 * `image` is optional and renders as a darkened cover background.
 */
export default function PageHero({ eyebrow, title, lead, image, crumbs = [], children }) {
  const reduce = useReducedMotion();

  return (
    <section className={`page-hero ${image ? 'page-hero--image' : ''}`}>
      {image && (
        <div className="page-hero__bg" aria-hidden="true">
          <img src={image} alt="" loading="eager" decoding="async" />
        </div>
      )}
      <div className="page-hero__shapes" aria-hidden="true">
        <span className="blob page-hero__blob-a" />
        <span className="blob page-hero__blob-b" />
      </div>
      <motion.div
        className="container page-hero__inner"
        variants={stagger(0.08)}
        initial={reduce ? false : 'hidden'}
        animate="visible"
      >
        {crumbs.length > 0 && (
          <motion.nav className="page-hero__crumbs" aria-label="Breadcrumb" variants={fadeUp}>
            <ol>
              <li>
                <Link to="/">Home</Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.label}>
                  <ChevronRight size={14} aria-hidden="true" />
                  {c.to && i < crumbs.length - 1 ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                </li>
              ))}
            </ol>
          </motion.nav>
        )}
        {eyebrow && (
          <motion.span className="eyebrow" variants={fadeUp}>
            {eyebrow}
          </motion.span>
        )}
        <motion.h1 className="page-hero__title" variants={fadeUp}>
          {title}
        </motion.h1>
        {lead && (
          <motion.p className="page-hero__lead" variants={fadeUp}>
            {lead}
          </motion.p>
        )}
        {children && <motion.div variants={fadeUp}>{children}</motion.div>}
      </motion.div>
    </section>
  );
}
