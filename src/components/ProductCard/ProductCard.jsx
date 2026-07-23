import React from "react";
import styles from "./ProductCard.module.css";

function ProductCard({ item }) {
  return (
    <div className={styles.productCard}>
      <div className={styles.productImageContainer}>
        <img
          src={item.thumbnail}
          alt={item.title}
          className={styles.productImage}
          loading="lazy"
          decoding="async"
          width="200"
          height="200"
        />
      </div>

      <div className={styles.productInfo}>
        <p className={styles.productCategory}>{item.category}</p>

        <h3 className={styles.productTitle}>{item.title}</h3>

        <div className={styles.productMeta}>
          <span className={styles.productPrice}>${item.price}</span>

          <span className={styles.productRating}>⭐ {item.rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
