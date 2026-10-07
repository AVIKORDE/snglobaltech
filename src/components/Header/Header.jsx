import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Menu, Moon, Sun, X } from 'lucide-react';
import Button from '../Button/Button';
import { navLinks, siteConfig } from '../../data/siteConfig';
import { useScrolled } from '../../hooks/useScrolled';
import { useTheme } from '../../hooks/useTheme';
import { EASE } from '../../animations/variants';
import './Header.css';

function Brand({ onClick }) {
  return (
    <Link to="/" className="brand" onClick={onClick} aria-label={`${siteConfig.name} home`}>
      <span className="brand__mark" aria-hidden="true">
        <svg viewBox="0 0 64 64" width="40" height="40">
          <rect width="64" height="64" rx="16" fill="currentColor" opacity="0.12" />
          <path
            d="M18 44c0-14 10-24 28-26-2 16-10 26-26 28 1-6 4-11 9-15-7 3-10 8-11 13z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="brand__text">
        <span className="brand__name">SN Global Tech</span>
        <span className="brand__tag">{siteConfig.tagline}</span>
      </span>
    </Link>
  );
}

export default function Header() {
  const scrolled = useScrolled(20);
  const [open, setOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState(false);
  const location = useLocation();
  const reduce = useReducedMotion();
  const { isDark, toggleTheme } = useTheme();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
    setMobileSub(false);
  }, [location.pathname, location.search]);

  // Lock body scroll while the overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Pages with a dark hero can use the transparent header; everything else needs the solid style.
  const hasDarkHero = ['/', '/about', '/products', '/contact'].includes(location.pathname);
  const headerClass = `site-header ${scrolled || open || !hasDarkHero ? 'is-solid' : ''}`;

  return (
    <motion.header
      className={headerClass}
      initial={reduce ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="container container--wide site-header__inner">
        <Brand />

        <nav className="site-nav" aria-label="Primary">
          <ul className="site-nav__list">
            {navLinks.map((link) => (
              <li key={link.to} className={`site-nav__item ${link.children ? 'has-dropdown' : ''}`}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => `site-nav__link ${isActive ? 'is-active' : ''}`}
                  aria-haspopup={link.children ? 'true' : undefined}
                >
                  {link.label}
                  {link.children && <ChevronDown size={16} aria-hidden="true" />}
                </NavLink>
                {link.children && (
                  <ul className="site-nav__dropdown">
                    {link.children.map((child) => (
                      <li key={child.to}>
                        <Link to={child.to} className="site-nav__dropdown-link">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <Button to="/contact" size="sm" className="site-header__cta">
            Get in Touch
          </Button>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? 'sun' : 'moon'}
                className="theme-toggle__icon"
                initial={reduce ? false : { rotate: -90, scale: 0.5, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={reduce ? undefined : { rotate: 90, scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
          <button
            type="button"
            className="site-header__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Portal: a fixed panel inside the header would be clipped by the header's backdrop-filter. */}
      {createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <motion.ul
              className="mobile-menu__list"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } }}
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.to}
                  variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
                >
                  <div className="mobile-menu__row">
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) => `mobile-menu__link ${isActive ? 'is-active' : ''}`}
                    >
                      {link.label}
                    </NavLink>
                    {link.children && (
                      <button
                        type="button"
                        className={`mobile-menu__expand ${mobileSub ? 'is-open' : ''}`}
                        aria-expanded={mobileSub}
                        aria-label="Toggle product categories"
                        onClick={() => setMobileSub((v) => !v)}
                      >
                        <ChevronDown size={20} />
                      </button>
                    )}
                  </div>
                  {link.children && (
                    <AnimatePresence initial={false}>
                      {mobileSub && (
                        <motion.ul
                          className="mobile-menu__sub"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: EASE }}
                        >
                          {link.children.map((child) => (
                            <li key={child.to}>
                              <Link to={child.to} className="mobile-menu__sublink">
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  )}
                </motion.li>
              ))}
              <motion.li
                className="mobile-menu__cta"
                variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
              >
                <Button to="/contact" size="lg">
                  Get in Touch
                </Button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
      )}
    </motion.header>
  );
}
