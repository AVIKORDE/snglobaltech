import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, BadgeCheck, Handshake, Leaf, PackageCheck, ShieldCheck, Sprout, Truck, Users } from 'lucide-react';
import Button from '../../components/Button/Button';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ProductCard from '../../components/ProductCard/ProductCard';
import Reveal from '../../components/Reveal/Reveal';
import { categories } from '../../data/categories';
import { getFeaturedProducts } from '../../data/products';
import { siteConfig } from '../../data/siteConfig';
import { useSeo } from '../../hooks/useSeo';
import { EASE, fadeUp, imageReveal, stagger } from '../../animations/variants';
import './Home.css';

/* Strengths listed on the back page of the company catalogue. */
const strengths = [
  { icon: Leaf, label: '100% Natural & Organic Products' },
  { icon: ShieldCheck, label: 'International Quality & Safety Standards' },
  { icon: BadgeCheck, label: 'Advanced Processing & Hygienic Handling' },
  { icon: PackageCheck, label: 'Custom Packaging Solutions' },
  { icon: Sprout, label: 'Sustainable & Ethical Sourcing' },
];

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Quality Focus',
    text: 'Products processed and packed in advanced facilities to deliver international quality, purity and consistency.',
  },
  {
    icon: Truck,
    title: 'Reliable Supply',
    text: 'Export-ready produce and inputs with bulk, retail and custom packing options to suit your market.',
  },
  {
    icon: Handshake,
    title: 'Customer Commitment',
    text: 'Private labelling and customised formulations developed around your crop, soil and regulatory needs.',
  },
  {
    icon: Users,
    title: 'Professional Service',
    text: 'Dedicated export-import specialists for agri commodities and agri inputs, reachable by call, WhatsApp or email.',
  },
];

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true">
        <img src="/images/hero/hero-field.webp" alt="" loading="eager" decoding="async" />
      </div>
      <span className="blob hero__blob-a" aria-hidden="true" />
      <span className="blob hero__blob-b" aria-hidden="true" />

      <div className="container container--wide hero__inner">
        <motion.div
          className="hero__content"
          variants={stagger(0.1, 0.15)}
          initial={reduce ? false : 'hidden'}
          animate="visible"
        >
          <motion.span className="hero__tag" variants={fadeUp}>
            Quality <i aria-hidden="true">•</i> Reliability <i aria-hidden="true">•</i> Global Standards
          </motion.span>
          <motion.h1 className="hero__title" variants={fadeUp}>
            Growing Quality.
            <br />
            <span className="hero__title-accent">Delivering Trust.</span>
          </motion.h1>
          <motion.p className="hero__lead" variants={fadeUp}>
            SN Global Tech supplies pure, organic and export-ready fresh fruits, herbal extract powders, cereals and
            crop-protection inputs sourced from sustainably managed farms across India, processed and packed to
            international standards.
          </motion.p>
          <motion.div className="hero__actions" variants={fadeUp}>
            <Button to="/products" size="lg">
              Explore Products
            </Button>
            <Button to="/contact" variant="outline-light" size="lg" icon={false}>
              Contact Us
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__visual"
          initial={reduce ? false : { opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
          aria-hidden="true"
        >
          <div className="hero__card">
            <img src="/images/site/fruit-assortment.webp" alt="" loading="eager" decoding="async" />
            <span className="hero__card-chip">{siteConfig.tagline}</span>
          </div>
          <div className="hero__card hero__card--small">
            <img src="/images/site/herbal-bowls.webp" alt="" loading="lazy" decoding="async" />
            <span className="hero__card-label">Herbal Extract Powders</span>
          </div>
        </motion.div>
      </div>

      <div className="hero__strip">
        <div className="container container--wide">
          <ul className="hero__strengths">
            {strengths.map(({ icon: Icon, label }) => (
              <li key={label}>
                <Icon size={18} aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function AboutPreview() {
  return (
    <section className="section about-preview">
      <div className="container about-preview__inner">
        <Reveal className="about-preview__media" variants={imageReveal}>
          <img src="/images/hero/corn-seedlings.webp" alt="Young maize seedlings growing in rich soil" loading="lazy" decoding="async" />
          <div className="about-preview__media-card">
            <Leaf size={22} aria-hidden="true" />
            <p>Sourced from sustainably managed farms across India</p>
          </div>
        </Reveal>
        <div className="about-preview__content">
          <SectionTitle
            eyebrow="About SN Global Tech"
            title="Nature's purity, delivered worldwide."
            lead="We supply pure, organic, and export-ready herbal extract powders, fresh fruits, cereals and agricultural inputs sourced from sustainably managed farms across India. Our products are processed and packed in advanced facilities, ensuring international quality, purity, and consistency to meet the demands of global markets."
          />
          <Reveal>
            <Button to="/about" variant="outline">
              Know More About Us
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ category, size = 'large', index }) {
  return (
    <Reveal
      as="article"
      className={`category-card category-card--${size}`}
      delay={index * 0.08}
      style={{ '--cat-accent': category.accent }}
    >
      <Link to={`/products?category=${category.key}`} className="category-card__link">
        <div className="category-card__media">
          <img src={category.cover} alt="" loading="lazy" decoding="async" />
        </div>
        {size === 'large' && (
          <div className="category-card__figure" aria-hidden="true">
            <img src={category.image} alt="" loading="lazy" decoding="async" />
          </div>
        )}
        <div className="category-card__body">
          <span className="category-card__tagline">{category.tagline}</span>
          <h3 className="category-card__title">{category.label}</h3>
          <p className="category-card__desc">{category.description}</p>
          <span className="category-card__cta">
            Explore Products <ArrowRight size={18} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

function Categories() {
  const [fruits, pesticides, herbal, grains] = categories;
  return (
    <section className="section section--surface categories">
      <div className="container">
        <SectionTitle
          eyebrow="What we supply"
          title="Two core categories, one standard of quality."
          lead="From orchard-fresh fruit to crop protection and plant nutrition, every product is sourced, processed and packed for international markets."
          align="center"
        />
        <div className="categories__grid">
          <CategoryCard category={fruits} index={0} />
          <CategoryCard category={pesticides} index={1} />
          <CategoryCard category={herbal} size="small" index={2} />
          <CategoryCard category={grains} size="small" index={3} />
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const featured = getFeaturedProducts(8);
  return (
    <section className="section featured">
      <div className="container">
        <div className="featured__head">
          <SectionTitle
            eyebrow="Featured products"
            title="A selection from our portfolio"
            lead="Export-ready produce, extract powders and agricultural inputs taken directly from our product catalogues."
            className="featured__title"
          />
          <Reveal>
            <Link to="/products" className="link-underline">
              View all products <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        <div className="grid grid--4">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="section section--alt why">
      <div className="container">
        <SectionTitle
          eyebrow="Why SN Global Tech"
          title="Built on quality, reliability and commitment."
          align="center"
        />
        <motion.ul
          className="why__grid"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        >
          {reasons.map(({ icon: Icon, title, text }) => (
            <motion.li key={title} className="why__item" variants={fadeUp}>
              <span className="why__icon">
                <Icon size={24} aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function QualitySection() {
  return (
    <section className="section section--primary quality">
      <div className="container quality__inner">
        <div className="quality__content">
          <SectionTitle
            eyebrow="Our standard"
            title="Processed and packed for global markets."
            lead="Every product passes through advanced facilities with hygienic handling, ensuring international quality, purity and consistency, whether it ships as fresh fruit, extract powder, cereal or crop input."
          />
          <Reveal as="ul" className="quality__list">
            {strengths.map(({ icon: Icon, label }) => (
              <li key={label}>
                <Icon size={20} aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </Reveal>
        </div>
        <Reveal className="quality__media" variants={imageReveal}>
          <img src="/images/site/wheat-field.webp" alt="Harvested wheat and cereal grains" loading="lazy" decoding="async" />
          <img className="quality__media-float" src="/images/site/grape-vine.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" />
        </Reveal>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="section cta-band">
      <div className="container">
        <Reveal className="cta-band__card">
          <span className="blob cta-band__blob" aria-hidden="true" />
          <div className="cta-band__content">
            <span className="eyebrow">Let&rsquo;s work together</span>
            <h2>Looking for the right agricultural products?</h2>
            <p>
              Tell us about your crop, market and packaging needs. Our export team will recommend the right products and
              formats.
            </p>
          </div>
          <Button to="/contact" variant="secondary" size="lg">
            Talk to Our Team
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  useSeo({
    title: 'Fresh Fruits, Herbal Extracts & Agricultural Inputs from India',
    description: siteConfig.description,
  });

  return (
    <>
      <Hero />
      <AboutPreview />
      <Categories />
      <FeaturedProducts />
      <WhyChoose />
      <QualitySection />
      <CtaBand />
    </>
  );
}
