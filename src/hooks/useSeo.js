import { useEffect } from 'react';
import { siteConfig } from '../data/siteConfig';

/**
 * Lightweight per-page SEO: sets document.title and the meta description.
 * Avoids pulling in react-helmet for a static site.
 */
export function useSeo({ title, description }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} | ${siteConfig.tagline}`;
    document.title = fullTitle;

    const desc = description || siteConfig.description;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', desc);
  }, [title, description]);
}
