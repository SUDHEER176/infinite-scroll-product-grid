import { useState, useEffect, useRef, useCallback } from "react";

const LIMIT = 20;

function useInfiniteProducts() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchingRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (fetchingRef.current || !hasMore) {
      return;
    }

    fetchingRef.current = true;
    setLoading(true);

    try {
      const skip = page * LIMIT;
      const response = await fetch(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}&select=title,price,category,rating,thumbnail`
      );
      const data = await response.json();

      setItems((oldItems) => {
        const newItems = data.products.filter(
          (p) => !oldItems.some((x) => x.id === p.id)
        );
        return [...oldItems, ...newItems];
      });

      setPage((prev) => prev + 1);

      if (skip + data.products.length >= data.total) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  }, [page, hasMore]);

  useEffect(() => {
    if (page === 0 && items.length === 0) {
      loadMore();
    }
  }, [loadMore, page, items.length]);

  return {
    items,
    loading,
    hasMore,
    loadMore,
  };
}

export { useInfiniteProducts };