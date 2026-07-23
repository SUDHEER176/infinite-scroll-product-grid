import React, { useEffect, useRef } from "react";
import ProductCard from "../ProductCard/ProductCard";
import Spinner from "../Spinner/Spinner";
import MessageBox from "../MessageBox/MessageBox";
import { useInfiniteProducts } from "../../hooks/useInfiniteProducts";
import styles from "./ProductGrid.module.css";

function Products() {
  const { items, loading, hasMore, loadMore } = useInfiniteProducts();
  const observerRef = useRef(null);

  const isSupported = typeof window !== "undefined" && "IntersectionObserver" in window;

  useEffect(() => {
    if (!isSupported || loading || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (loading || !hasMore) return;
          loadMore();
        }
      },
      { rootMargin: "400px", threshold: 0.1 }
    );

    const el = observerRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
      observer.disconnect();
    };
  }, [loading, hasMore, loadMore, isSupported]);

  return (
    <div>
      <div className={styles.productGrid}>
        {items.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>

      {loading && <Spinner />}

      {!hasMore && items.length > 0 && (
        <MessageBox>Reached the end. No more products available.</MessageBox>
      )}

      {hasMore && !isSupported && !loading && (
        <button onClick={loadMore} className={styles.loadMoreBtn}>
          Load More
        </button>
      )}

      {hasMore && isSupported && (
        <div ref={observerRef} style={{ height: "20px" }}></div>
      )}
    </div>
  );
}

export default Products;
