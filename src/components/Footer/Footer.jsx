import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { categories } from '../../data/categories';
import './Footer.css';

const socialIcons = { linkedin: Linkedin, instagram: Instagram, facebook: Facebook };

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Products', to: '/products' },
  { label: 'Contact Us', to: '/contact' },
];

export default function Footer() {
  const { contact } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__top">
        <div className="site-footer__brand">
          <Link to="/" className="site-footer__logo">
            <span className="site-footer__logo-mark" aria-hidden="true">
              <svg viewBox="0 0 64 64" width="36" height="36">
                <path d="M18 44c0-14 10-24 28-26-2 16-10 26-26 28 1-6 4-11 9-15-7 3-10 8-11 13z" fill="currentColor" />
              </svg>
            </span>
            {siteConfig.name}
          </Link>
          <p className="site-footer__tagline">{siteConfig.tagline}</p>
          <p className="site-footer__desc">{siteConfig.description}</p>
          <ul className="site-footer__social" aria-label="Social media">
            {siteConfig.social.map((s) => {
              const Icon = socialIcons[s.icon];
              return (
                <li key={s.label}>
                  <a href={s.href} aria-label={s.label} target="_blank" rel="noreferrer">
                    {Icon && <Icon size={18} />}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <nav className="site-footer__col" aria-label="Quick links">
          <h3 className="site-footer__heading">Quick Links</h3>
          <ul>
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="site-footer__col" aria-label="Product categories">
          <h3 className="site-footer__heading">Products</h3>
          <ul>
            {categories.map((c) => (
              <li key={c.key}>
                <Link to={`/products?category=${c.key}`}>{c.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__col site-footer__contact">
          <h3 className="site-footer__heading">Contact</h3>
          <ul>
            <li>
              <Phone size={16} aria-hidden="true" />
              <a href={`tel:${contact.phonePrimary.replace(/\s/g, '')}`}>{contact.phonePrimary}</a>
            </li>
            <li>
              <Phone size={16} aria-hidden="true" />
              <a href={`tel:${contact.phoneSecondary.replace(/\s/g, '')}`}>{contact.phoneSecondary}</a>
            </li>
            <li>
              <Mail size={16} aria-hidden="true" />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li>
              <MapPin size={16} aria-hidden="true" />
              <span>
                {contact.address}, {contact.city}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container site-footer__bottom-inner">
          <p>
            &copy; {year} {siteConfig.name}. All Rights Reserved.
          </p>
          <p className="site-footer__legal">Nature&rsquo;s purity, delivered worldwide.</p>
        </div>
      </div>
    </footer>
  );
}
