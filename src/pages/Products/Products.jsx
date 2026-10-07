import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import PageHero from '../../components/PageHero/PageHero';
import CategoryTabs from '../../components/CategoryTabs/CategoryTabs';
import ProductCard from '../../components/ProductCard/ProductCard';
import Button from '../../components/Button/Button';
import { categories, categoryMap } from '../../data/categories';
import { products } from '../../data/products';
import { useSeo } from '../../hooks/useSeo';
import './Products.css';

const ALL = 'all';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get('category');
  const active = param && categoryMap[param] ? param : ALL;
  const activeCategory = active === ALL ? null : categoryMap[active];

  useSeo({
    title: activeCategory ? `${activeCategory.label} | Products` : 'Our Products',
    description: activeCategory
      ? activeCategory.description
      : 'Browse the SN Global Tech catalogue: fresh fruits, pesticides and agricultural inputs, herbal extract powders, and cereals and grains.',
  });

  const tabs = useMemo(
    () => [
      { key: ALL, label: 'All Products', count: products.length },
      ...categories.map((c) => ({
        key: c.key,
        label: c.shortLabel,
        count: products.filter((p) => p.category === c.key).length,
      })),
    ],
    [],
  );

  const visible = useMemo(
    () => (active === ALL ? products : products.filter((p) => p.category === active)),
    [active],
  );

  const handleChange = useCallback(
    (key) => {
      if (key === ALL) setSearchParams({}, { replace: true });
      else setSearchParams({ category: key }, { replace: true });
    },
    [setSearchParams],
  );

  return (
    <>
      <PageHero
        eyebrow="Product catalogue"
        title="Our Products"
        lead="Export-ready fresh fruits, crop protection and plant nutrition inputs, herbal extract powders and cereals, all sourced from sustainably managed farms across India and packed to international standards."
        image={activeCategory?.cover || '/images/hero/hero-field.webp'}
        crumbs={activeCategory ? [{ label: 'Products', to: '/products' }, { label: activeCategory.label }] : [{ label: 'Products' }]}
      />

      <section className="section products">
        <div className="container">
          <div className="products__toolbar">
            <CategoryTabs options={tabs} value={active} onChange={handleChange} />
            <p className="products__count" aria-live="polite">
              Showing <strong>{visible.length}</strong> {visible.length === 1 ? 'product' : 'products'}
              {activeCategory ? ` in ${activeCategory.label}` : ''}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {activeCategory && (
              <motion.p
                key={activeCategory.key}
                className="products__category-desc"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                {activeCategory.description}
              </motion.p>
            )}
          </AnimatePresence>

          <LayoutGroup>
            <motion.div className="grid grid--4 products__grid" layout>
              <AnimatePresence mode="popLayout">
                {visible.map((p, i) => (
                  <ProductCard key={p.slug} product={p} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>

          <div className="products__footer">
            <p>Need a custom formulation, private label or specific packaging?</p>
            <Button to="/contact" variant="outline">
              Talk to Our Team
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
