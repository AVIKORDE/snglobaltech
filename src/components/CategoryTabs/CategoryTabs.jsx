import { motion, useReducedMotion } from 'framer-motion';
import './CategoryTabs.css';

/**
 * Accessible tab list for filtering products.
 * `options` = [{ key, label, count }]
 */
export default function CategoryTabs({ options, value, onChange }) {
  const reduce = useReducedMotion();

  return (
    <div className="category-tabs" role="tablist" aria-label="Filter products by category">
      {options.map((opt) => {
        const active = opt.key === value;
        return (
          <button
            key={opt.key}
            type="button"
            role="tab"
            aria-selected={active}
            className={`category-tabs__tab ${active ? 'is-active' : ''}`}
            onClick={() => onChange(opt.key)}
          >
            {active && (
              <motion.span
                className="category-tabs__pill"
                layoutId={reduce ? undefined : 'category-pill'}
                transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                aria-hidden="true"
              />
            )}
            <span className="category-tabs__label">
              {opt.label}
              {typeof opt.count === 'number' && <span className="category-tabs__count">{opt.count}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}
