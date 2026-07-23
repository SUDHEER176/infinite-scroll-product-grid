import React from 'react';
import styles from './FilterSortBar.module.css';

const CategoryIcons = {
  all: <i className="fi fi-rr-border-all" />,
  beauty: <i className="fi fi-rr-sparkles" />,
  smartphones: <i className="fi fi-rr-mobile-hand" />,
  laptops: <i className="fi fi-rs-laptop" />,
  fragrances: <i className="fi fi-rr-flower-tulip" />,
  'skin-care': <i className="fi fi-rr-cream" />,
  groceries: <i className="fi fi-ts-grocery-basket" />,
  'home-decoration': <i className="fi fi-rr-couch" />,
  tops: <i className="fi fi-rr-shirt-tank-top" />,
  'womens-shoes': <i className="fi fi-rs-hiking-boot" />,
  'mens-watches': <i className="fi fi-rr-watch-smart" />,
  'sports-accessories': <i className="fi fi-rr-volleyball" />,
};

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Beauty', value: 'beauty' },
  { label: 'Smartphones', value: 'smartphones' },
  { label: 'Laptops', value: 'laptops' },
  { label: 'Fragrances', value: 'fragrances' },
  { label: 'Skin Care', value: 'skin-care' },
  { label: 'Groceries', value: 'groceries' },
  { label: 'Home Decor', value: 'home-decoration' },
  { label: 'Tops', value: 'tops' },
  { label: 'Shoes', value: 'womens-shoes' },
  { label: 'Watches', value: 'mens-watches' },
  { label: 'Sports', value: 'sports-accessories' },
];

const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low → High', value: 'price_asc' },
  { label: 'Price: High → Low', value: 'price_desc' },
  { label: 'Highest Rated', value: 'rating_desc' },
  { label: 'Most Discounted', value: 'discount_desc' },
];

export default function FilterSortBar({
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  resultCount,
}) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.section}>
        <p className={styles.sectionLabel}>Categories</p>
        <ul className={styles.categoryList}>
          {CATEGORIES.map(category => {
            const isActive = activeCategory === category.value;
            return (
              <li key={category.value}>
                <button
                  id={`category-${category.value}`}
                  className={`${styles.categoryBtn} ${isActive ? styles.categoryBtnActive : ''}`}
                  onClick={() => onCategoryChange(category.value)}
                  aria-pressed={isActive}
                >
                  <span className={styles.catIcon}>{CategoryIcons[category.value]}</span>
                  <span className={styles.catLabel}>{category.label}</span>
                  {isActive && <span className={styles.activeDot} />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <p className={styles.sectionLabel}>Sort By</p>
        <ul className={styles.sortList}>
          {SORT_OPTIONS.map(option => {
            const isActive = sortBy === option.value;
            return (
              <li key={option.value}>
                <button
                  id={`sort-${option.value}`}
                  className={`${styles.sortBtn} ${isActive ? styles.sortBtnActive : ''}`}
                  onClick={() => onSortChange(option.value)}
                  aria-pressed={isActive}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.divider} />

      <div className={styles.resultPill}>
        <span className={styles.resultDot} />
        <span>{resultCount} products</span>
      </div>
    </aside>
  );
}
