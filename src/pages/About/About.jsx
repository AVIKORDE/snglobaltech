import { motion } from 'framer-motion';
import { Compass, Eye, Globe2, Handshake, Leaf, PackageCheck, ShieldCheck, Sprout, Target } from 'lucide-react';
import PageHero from '../../components/PageHero/PageHero';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Reveal from '../../components/Reveal/Reveal';
import Button from '../../components/Button/Button';
import { categories } from '../../data/categories';
import { useSeo } from '../../hooks/useSeo';
import { fadeUp, imageReveal, stagger, viewportOnce } from '../../animations/variants';
import './About.css';

const approach = [
  {
    icon: Sprout,
    title: 'Sustainable sourcing',
    text: 'Products are sourced from sustainably managed farms across India, with ethical sourcing as a standing commitment.',
  },
  {
    icon: ShieldCheck,
    title: 'Advanced processing',
    text: 'Processing and packing takes place in advanced facilities with hygienic handling to protect purity and consistency.',
  },
  {
    icon: PackageCheck,
    title: 'Custom packaging',
    text: 'Bulk drums, IBC tanks, jumbo bags, retail packs and private labelling, matched to each buyer and market.',
  },
  {
    icon: Globe2,
    title: 'Export-ready',
    text: 'Quality aligned with international quality and safety standards so shipments meet the demands of global markets.',
  },
];

const values = [
  { icon: Leaf, title: 'Purity', text: '100% natural and organic products, with no additives, preservatives or artificial colours in our extract powders.' },
  { icon: ShieldCheck, title: 'Quality', text: 'International quality and safety standards guide how we source, process and pack.' },
  { icon: Handshake, title: 'Partnership', text: 'We build long-term relationships with distributors and importers through customised, private-label solutions.' },
  { icon: Compass, title: 'Responsibility', text: 'Sustainable and ethical sourcing that respects farmers, soil and the environment.' },
];

export default function About() {
  useSeo({
    title: 'About Us',
    description:
      'Learn about SN Global Tech, an Indian supplier of export-ready fresh fruits, herbal extract powders, cereals and agricultural inputs sourced from sustainably managed farms.',
  });

  return (
    <>
      <PageHero
        eyebrow="About SN Global Tech"
        title="Rooted in Indian farms. Trusted in global markets."
        lead="We supply pure, organic, and export-ready products sourced from sustainably managed farms across India, processed and packed in advanced facilities to meet the demands of global markets."
        image="/images/hero/corn-seedlings.webp"
        crumbs={[{ label: 'About Us' }]}
      />

      {/* Who we are */}
      <section className="section about-intro">
        <div className="container about-intro__inner">
          <Reveal className="about-intro__media" variants={imageReveal}>
            <img src="/images/hero/spices-flatlay.webp" alt="Bowls of natural spice and herbal powders" loading="lazy" decoding="async" />
          </Reveal>
          <div className="about-intro__content">
            <SectionTitle
              eyebrow="Who we are"
              title="An export-focused supplier of agricultural products from India."
            />
            <Reveal className="about-intro__text">
              <p>
                SN Global Tech brings together two complementary portfolios under one standard of quality: agri commodities,
                covering fresh fruits, herbal extract powders and cereals, and agri inputs, covering botanical crop protection,
                plant nutrition, soil conditioners and growing media.
              </p>
              <p>
                Our products are processed and packed in advanced facilities, ensuring international quality, purity and
                consistency. Dedicated export-import specialists support buyers across both portfolios.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="section section--surface about-what">
        <div className="container">
          <SectionTitle
            eyebrow="What we do"
            title="Four product lines, one supply partner."
            lead="Everything we supply is drawn from our product catalogues and can be packed to bulk, retail or private-label requirements."
            align="center"
          />
          <motion.ul
            className="about-what__grid"
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {categories.map((c) => (
              <motion.li key={c.key} className="about-what__item" variants={fadeUp} style={{ '--cat-accent': c.accent }}>
                <div className="about-what__media">
                  <img src={c.image} alt="" loading="lazy" decoding="async" />
                </div>
                <h3>{c.label}</h3>
                <p>{c.tagline}</p>
                <Button to={`/products?category=${c.key}`} variant="ghost" size="sm">
                  View products
                </Button>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Our approach */}
      <section className="section about-approach">
        <div className="container about-approach__inner">
          <SectionTitle
            eyebrow="Our approach"
            title="From farm to port, with care at every step."
            lead="A straightforward process that keeps quality visible from sourcing to final packing."
          />
          <motion.ol
            className="about-approach__steps"
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {approach.map(({ icon: Icon, title, text }, i) => (
              <motion.li key={title} className="about-approach__step" variants={fadeUp}>
                <span className="about-approach__num">0{i + 1}</span>
                <span className="about-approach__icon">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="section section--primary about-mv">
        <div className="container about-mv__grid">
          <Reveal className="about-mv__card">
            <span className="about-mv__icon">
              <Target size={26} aria-hidden="true" />
            </span>
            <span className="eyebrow">Our mission</span>
            <h2>Deliver nature&rsquo;s purity to the world.</h2>
            <p>
              To supply pure, organic and export-ready agricultural products, processed and packed to international
              standards, so that buyers anywhere can rely on consistent quality from Indian farms.
            </p>
          </Reveal>
          <Reveal className="about-mv__card" delay={0.1}>
            <span className="about-mv__icon">
              <Eye size={26} aria-hidden="true" />
            </span>
            <span className="eyebrow">Our vision</span>
            <h2>A trusted bridge between Indian agriculture and global markets.</h2>
            <p>
              To be the partner of choice for importers and distributors seeking sustainable, ethically sourced produce,
              extracts and agricultural inputs.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="section about-values">
        <div className="container">
          <SectionTitle eyebrow="Our values" title="What guides every shipment." align="center" />
          <motion.ul
            className="about-values__grid"
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {values.map(({ icon: Icon, title, text }) => (
              <motion.li key={title} className="about-values__item" variants={fadeUp}>
                <Icon size={24} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.li>
            ))}
          </motion.ul>
          <Reveal className="about-values__cta">
            <Button to="/products">Explore Our Products</Button>
            <Button to="/contact" variant="outline" icon={false}>
              Contact Us
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
