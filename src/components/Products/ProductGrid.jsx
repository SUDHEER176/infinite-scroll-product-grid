import React, { useEffect, useRef, useMemo } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Spinner from '../Spinner/Spinner';
import MessageBox from '../MessageBox/MessageBox';
import { useInfiniteProducts } from '../../hooks/useInfiniteProducts';
import styles from './ProductGrid.module.css';

function filterAndSortProducts(products, query, category, sort) {
  let list = [...products];

  if (query.trim()) {
    const q = query.toLowerCase();
    list = list.filter(
      item =>
        item.title?.toLowerCase().includes(q) ||
        item.brand?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q)
    );
  }

  if (category && category !== 'all') {
    list = list.filter(
      item => item.category?.toLowerCase() === category.toLowerCase()
    );
  }

  switch (sort) {
    case 'price_asc':
      list.sort((a, b) => (a.price || 0) - (b.price || 0));
      break;
    case 'price_desc':
      list.sort((a, b) => (b.price || 0) - (a.price || 0));
      break;
    case 'rating_desc':
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case 'discount_desc':
      list.sort(
        (a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0)
      );
      break;
    default:
      break;
  }

  return list;
}

export default function ProductGrid({
  searchQuery = '',
  activeCategory = 'all',
  sortBy = 'featured',
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onResultCountChange,
}) {
  const { items, loading, hasMore, loadMore } = useInfiniteProducts();
  const sentinelRef = useRef(null);

  const isObserverSupported =
    typeof window !== 'undefined' && 'IntersectionObserver' in window;

  const filteredProducts = useMemo(
    () => filterAndSortProducts(items, searchQuery, activeCategory, sortBy),
    [items, searchQuery, activeCategory, sortBy]
  );

  useEffect(() => {
    if (onResultCountChange) {
      onResultCountChange(filteredProducts.length);
    }
  }, [filteredProducts.length, onResultCountChange]);

  useEffect(() => {
    if (!isObserverSupported || loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadMore();
        }
      },
      { rootMargin: '300px', threshold: 0.1 }
    );

    const element = sentinelRef.current;
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
      observer.disconnect();
    };
  }, [loading, hasMore, loadMore, isObserverSupported]);

  const hasActiveFilters =
    searchQuery.trim() !== '' || activeCategory !== 'all' || sortBy !== 'featured';
  const showEmptyState = !loading && filteredProducts.length === 0;

  return (
    <section>
      {showEmptyState && hasActiveFilters ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🔍</div>
          <h3>No products found</h3>
          <p>Try adjusting your search query or selected filters.</p>
        </div>
      ) : (
        <div className={styles.productGrid}>
          {filteredProducts.map(item => (
            <ProductCard
              key={item.id}
              item={item}
              isWishlisted={isWishlisted}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}

      {loading && <Spinner />}

      {!hasMore && items.length > 0 && !hasActiveFilters && (
        <MessageBox>🎉 You've reached the end! Showing all {items.length} products.</MessageBox>
      )}

      {hasMore && !isObserverSupported && !loading && (
        <button onClick={loadMore} className={styles.loadMoreBtn}>
          Load More
        </button>
      )}

      {hasMore && isObserverSupported && (
        <div ref={sentinelRef} style={{ height: '20px' }} />
      )}
    </section>
  );
}
