import { useState, useEffect, useRef, useCallback } from 'react';

const PAGE_SIZE = 20;

export function useInfiniteProducts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const pageRef = useRef(0);
  const isFetchingRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (isFetchingRef.current || !hasMore) return;

    isFetchingRef.current = true;
    setLoading(true);

    try {
      const skip = pageRef.current * PAGE_SIZE;
      const res = await fetch(`https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`);
      const data = await res.json();

      setItems(prevItems => {
        const uniqueProducts = data.products.filter(
          item => !prevItems.some(existing => existing.id === item.id)
        );
        return [...prevItems, ...uniqueProducts];
      });

      pageRef.current += 1;

      if (skip + data.products.length >= data.total) {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [hasMore]);

  useEffect(() => {
    if (pageRef.current === 0 && items.length === 0) {
      loadMore();
    }
  }, [loadMore, items.length]);

  return { items, loading, hasMore, loadMore };
}