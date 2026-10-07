import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ProductImage from '../ProductImage/ProductImage';
import Badge from '../Badge/Badge';
import { getCategory } from '../../data/categories';
import { fadeUp } from '../../animations/variants';
import './ProductCard.css';

/** forwardRef is required so AnimatePresence (popLayout) can measure the card. */
const ProductCard = forwardRef(function ProductCard({ product, index = 0 }, ref) {
  const reduce = useReducedMotion();
  const category = getCategory(product.category);

  return (
    <motion.article
      ref={ref}
      className="product-card"
      variants={fadeUp}
      layout={!reduce}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
      transition={{ delay: reduce ? 0 : Math.min(index * 0.05, 0.4) }}
    >
      <Link to={`/products/${product.slug}`} className="product-card__link" aria-label={`View details for ${product.name}`}>
        <div className="product-card__media">
          <ProductImage src={product.image} alt={product.imageAlt} name={product.name} ratio="4 / 3.4" />
          <Badge tone="light" className="product-card__badge">
            {category?.shortLabel || product.category}
          </Badge>
        </div>
        <div className="product-card__body">
          <p className="product-card__type">{product.type}</p>
          <h3 className="product-card__title">{product.name}</h3>
          <p className="product-card__desc">{product.shortDescription}</p>
          <span className="product-card__cta">
            View details
            <ArrowUpRight size={18} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
});

export default ProductCard;
