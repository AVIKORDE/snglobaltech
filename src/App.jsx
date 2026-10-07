import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import { ThemeProvider } from './hooks/useTheme';

// Route-level code splitting keeps the initial bundle small.
const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));
const Products = lazy(() => import('./pages/Products/Products'));
const ProductDetails = lazy(() => import('./pages/ProductDetails/ProductDetails'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:slug" element={<ProductDetails />} />
              <Route path="contact" element={<Contact />} />
              <Route path="home" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MotionConfig>
    </ThemeProvider>
  );
}
