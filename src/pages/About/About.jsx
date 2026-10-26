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
    title: 'Trust and transparency',
    text: 'Open communication, clear commercial expectations and professional conduct are central to lasting trade partnerships.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality and compliance',
    text: 'We value suitable product specifications, responsible supplier coordination and applicable regulatory requirements.',
  },
  {
    icon: PackageCheck,
    title: 'Responsible agricultural trade',
    text: 'We recognize the importance of sustainable farming, efficient resource use and responsible sourcing.',
  },
  {
    icon: Globe2,
    title: 'Long-term partnerships',
    text: 'We build enduring business relationships around shared objectives, dependable coordination and mutual growth.',
  },
];

const values = [
  { icon: Handshake, title: 'Trust', text: 'Open communication, clear expectations and professional conduct guide our business relationships.' },
  { icon: ShieldCheck, title: 'Compliance', text: 'We recognize the importance of documentation, applicable regulations and destination-market requirements.' },
  { icon: Leaf, title: 'Responsible trade', text: 'We support responsible farming practices and sustainable use of natural resources.' },
  { icon: Compass, title: 'Shared growth', text: 'We aim to create lasting value through dependable coordination and long-term partnerships.' },
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
        title="Connecting agricultural products with global markets."
        lead="SN GlobalTech is an international export-import company working across agricultural inputs, fresh fruits, herbal extracts, nutritional products, cereals and grains."
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
                Established in 2019, SN GlobalTech began with a shared vision among four individuals with experience in
                agricultural inputs, fresh fruits, cereals and grains, and herbal extract powders and nutritional products.
              </p>
              <p>
                We bring these areas of experience together to connect agricultural products with international markets
                and build lasting relationships with customers and suppliers.
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
            lead="We support international sourcing and supply across four areas of agricultural trade."
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
            title="A professional approach to international trade."
            lead="Clear communication, commercial understanding and careful coordination support every business relationship."
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
              To connect global markets with quality agricultural products through responsible sourcing, professional
              trade practices and dependable business partnerships.
            </p>
          </Reveal>
          <Reveal className="about-mv__card" delay={0.1}>
            <span className="about-mv__icon">
              <Eye size={26} aria-hidden="true" />
            </span>
            <span className="eyebrow">Our vision</span>
            <h2>A trusted bridge between Indian agriculture and global markets.</h2>
            <p>
              To build a respected international trade company that connects agricultural products with markets around
              the world and contributes to a more sustainable future.
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
