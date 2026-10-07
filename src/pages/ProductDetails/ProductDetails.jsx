import { Link, useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Beaker, CheckCircle2, Crosshair, Package, SprayCan } from 'lucide-react';
import Button from '../../components/Button/Button';
import ProductImage from '../../components/ProductImage/ProductImage';
import ProductCard from '../../components/ProductCard/ProductCard';
import Badge from '../../components/Badge/Badge';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Reveal from '../../components/Reveal/Reveal';
import NotFound from '../NotFound/NotFound';
import { getProductBySlug, getRelatedProducts } from '../../data/products';
import { getCategory } from '../../data/categories';
import { useSeo } from '../../hooks/useSeo';
import { EASE, fadeUp, stagger } from '../../animations/variants';
import './ProductDetails.css';

function InfoList({ icon: Icon, title, items, chips = false }) {
  if (!items || items.length === 0) return null;
  return (
    <Reveal className="pd-info">
      <h3 className="pd-info__title">
        <Icon size={18} aria-hidden="true" />
        {title}
      </h3>
      <ul className={chips ? 'pd-info__chips' : 'pd-info__list'}>
        {items.map((item) => (
          <li key={item}>
            {!chips && <CheckCircle2 size={18} aria-hidden="true" />}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export default function ProductDetails() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const reduce = useReducedMotion();

  useSeo({
    title: product ? `${product.name} | ${product.type}` : 'Product Not Found',
    description: product?.shortDescription,
  });

  if (!product) {
    return (
      <NotFound
        title="Product Not Found"
        message="The product you are looking for does not exist or may have been moved. Browse the full catalogue instead."
        backTo="/products"
        backLabel="Back to Products"
      />
    );
  }

  const category = getCategory(product.category);
  const related = getRelatedProducts(product, 4);
  const targetsLabel = product.category === 'pesticides' && product.targets?.some((t) => /pest|mite|fly|aphid|thrip|mildew|rust|caterpillar|mealy|scale/i.test(t))
    ? 'Target pests'
    : 'Target use';
  const applicationsLabel = product.category === 'pesticides' ? 'Application methods' : 'Applications';

  return (
    <>
      <section className="pd-hero">
        <div className="container">
          <motion.nav
            className="pd-hero__crumbs"
            aria-label="Breadcrumb"
            initial={reduce ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <Link to="/products" className="pd-hero__back">
              <ArrowLeft size={16} aria-hidden="true" /> Back to Products
            </Link>
            <ol>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to={`/products?category=${category.key}`}>{category.shortLabel}</Link>
              </li>
              <li aria-current="page">{product.name}</li>
            </ol>
          </motion.nav>

          <div className="pd-hero__grid">
            <motion.div
              className="pd-hero__media"
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <ProductImage src={product.image} alt={product.imageAlt} name={product.name} ratio="1 / 1" priority />
            </motion.div>

            <motion.div
              className="pd-hero__content"
              variants={stagger(0.08, 0.1)}
              initial={reduce ? false : 'hidden'}
              animate="visible"
            >
              <motion.div className="pd-hero__badges" variants={fadeUp}>
                <Badge tone="green">{category.label}</Badge>
                <Badge tone="gold">{product.type}</Badge>
              </motion.div>
              <motion.h1 variants={fadeUp}>{product.name}</motion.h1>
              <motion.p className="lead" variants={fadeUp}>
                {product.shortDescription}
              </motion.p>
              {product.composition && (
                <motion.dl className="pd-hero__spec" variants={fadeUp}>
                  <dt>
                    <Beaker size={16} aria-hidden="true" /> Composition
                  </dt>
                  <dd>{product.composition}</dd>
                </motion.dl>
              )}
              <motion.div className="pd-hero__actions" variants={fadeUp}>
                <Button to={`/contact?product=${product.slug}`} size="lg">
                  Inquire About This Product
                </Button>
                <Button to="/products" variant="ghost" icon={false}>
                  <ArrowLeft size={16} aria-hidden="true" /> Back to Products
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section pd-body">
        <div className="container pd-body__grid">
          <div className="pd-body__main">
            <Reveal className="pd-description">
              <span className="eyebrow">Overview</span>
              <h2>About {product.name}</h2>
              <p>{product.description}</p>
            </Reveal>

            <InfoList
              icon={CheckCircle2}
              title={product.category === 'grains' ? 'Quality attributes' : 'Key benefits'}
              items={product.features}
            />
          </div>

          <aside className="pd-body__aside">
            <InfoList icon={Crosshair} title={targetsLabel} items={product.targets} chips />
            <InfoList icon={SprayCan} title={applicationsLabel} items={product.applications} chips />
            <InfoList icon={Package} title="Packaging & supply options" items={product.packaging} chips />

            <Reveal className="pd-aside-cta">
              <h3>Interested in {product.name}?</h3>
              <p>Share your quantity, destination market and packaging needs and our export team will get back to you.</p>
              <Button to={`/contact?product=${product.slug}`}>Send Inquiry</Button>
            </Reveal>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--surface pd-related">
          <div className="container">
            <SectionTitle
              eyebrow="Related products"
              title={`More from ${category.label}`}
              lead={category.tagline}
            />
            <div className="grid grid--4">
              {related.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
            <div className="pd-related__footer">
              <Link to={`/products?category=${category.key}`} className="link-underline">
                View all {category.label} <ArrowLeft size={18} aria-hidden="true" style={{ transform: 'rotate(180deg)' }} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
