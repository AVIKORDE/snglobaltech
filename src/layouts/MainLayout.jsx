import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ScrollToTop from './ScrollToTop';
import { EASE } from '../animations/variants';
import './MainLayout.css';

function PageFallback() {
  return (
    <div className="page-fallback" aria-busy="true" aria-live="polite">
      <span className="page-fallback__dot" />
    </div>
  );
}

/**
 * Page shell. Each route change remounts <main> (keyed by pathname) with a short
 * entrance animation. Exit animations are intentionally avoided: AnimatePresence
 * + lazy routes + Suspense can leave the page blank if an exit never completes.
 */
export default function MainLayout() {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollToTop />
      <Header />
      <Suspense fallback={<PageFallback />}>
        <motion.main
          id="main"
          key={pathname}
          className="site-main"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <Outlet />
        </motion.main>
      </Suspense>
      <Footer />
    </>
  );
}
