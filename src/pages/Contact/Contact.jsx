import { useSearchParams } from 'react-router-dom';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import PageHero from '../../components/PageHero/PageHero';
import ContactForm from '../../components/ContactForm/ContactForm';
import Reveal from '../../components/Reveal/Reveal';
import { siteConfig } from '../../data/siteConfig';
import { getProductBySlug } from '../../data/products';
import { useSeo } from '../../hooks/useSeo';
import './Contact.css';

const tel = (n) => `tel:${n.replace(/\s/g, '')}`;
const wa = (n) => `https://wa.me/${n.replace(/[^\d]/g, '')}`;

export default function Contact() {
  const [searchParams] = useSearchParams();
  const productSlug = searchParams.get('product') || '';
  const presetProduct = getProductBySlug(productSlug);
  const { contact } = siteConfig;

  useSeo({
    title: 'Contact Us',
    description:
      'Get in touch with SN Global Tech for export inquiries about fresh fruits, herbal extract powders, cereals and agricultural inputs.',
  });

  const cards = [
    {
      icon: Phone,
      title: 'Call or WhatsApp',
      lines: [
        { label: contact.phonePrimaryLabel, value: contact.phonePrimary, href: tel(contact.phonePrimary), extra: wa(contact.phonePrimary) },
        contact.phoneSecondary && {
          label: contact.phoneSecondaryLabel,
          value: contact.phoneSecondary,
          href: tel(contact.phoneSecondary),
          extra: wa(contact.phoneSecondary),
        },
      ].filter(Boolean),
    },
    {
      icon: Mail,
      title: 'Email',
      lines: [{ label: 'Export inquiries', value: contact.email, href: `mailto:${contact.email}` }],
    },
    {
      icon: MapPin,
      title: 'Address',
      lines: [{ label: contact.legalName, value: contact.addressLines.join(', ') }],
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Let's Talk"
        lead="Whether you are sourcing fresh fruit, herbal extracts, cereals or crop inputs, tell us what you need and our export specialists will respond with options, packing formats and next steps."
        image="/images/hero/hero-field.webp"
        crumbs={[{ label: 'Contact Us' }]}
      />

      <section className="section contact">
        <div className="container contact__grid">
          <div className="contact__info">
            <Reveal>
              <span className="eyebrow">Reach us directly</span>
              <h2 className="contact__heading">Reach us directly, any time.</h2>
              <p className="contact__intro">
                Call or WhatsApp us for fresh fruits, agri inputs, herbal extracts or cereals, or send the form and our
                export team will get back to you.
              </p>
            </Reveal>

            <ul className="contact__cards">
              {cards.map(({ icon: Icon, title, lines }, i) => (
                <Reveal as="li" key={title} className="contact-card" delay={i * 0.06}>
                  <span className="contact-card__icon">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <div className="contact-card__body">
                    <h3>{title}</h3>
                    {lines.map((l) => (
                      <div key={l.value} className="contact-card__line">
                        <span className="contact-card__label">{l.label}</span>
                        {l.href ? (
                          <a href={l.href} className="contact-card__value">
                            {l.value}
                          </a>
                        ) : (
                          <span className="contact-card__value">{l.value}</span>
                        )}
                        {l.extra && (
                          <a href={l.extra} className="contact-card__wa" target="_blank" rel="noreferrer">
                            <MessageCircle size={14} aria-hidden="true" /> WhatsApp
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </Reveal>
              ))}
              <Reveal as="li" className="contact-card contact-card--muted" delay={0.2}>
                <span className="contact-card__icon">
                  <Clock size={22} aria-hidden="true" />
                </span>
                <div className="contact-card__body">
                  <h3>Business hours</h3>
                  <span className="contact-card__value">{contact.hours}</span>
                </div>
              </Reveal>
            </ul>
          </div>

          <Reveal className="contact__form" delay={0.1}>
            <div className="contact__form-head">
              <h2>Send an inquiry</h2>
              {presetProduct ? (
                <p>
                  You are inquiring about <strong>{presetProduct.name}</strong>. Add your requirements below.
                </p>
              ) : (
                <p>Fill in the form and our team will get back to you.</p>
              )}
            </div>
            <ContactForm presetProduct={presetProduct?.slug || ''} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
