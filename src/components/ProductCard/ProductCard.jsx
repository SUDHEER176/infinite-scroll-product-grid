import React from 'react';
import styles from './ProductCard.module.css';

export default function ProductCard({ item, isWishlisted, onToggleWishlist, onAddToCart }) {
  const brandName = item.brand || item.category || 'Brand';
  const badges = item.badges || ['BESTSELLER'];
  const colorDots = item.colorDots || ['#6b7280', '#00a651'];
  const currentPrice = item.price || 0;
  const originalPrice = item.originalPrice || Math.round(currentPrice * 1.3);
  const discountPercent = item.discountPercentage
    ? Math.round(item.discountPercentage)
    : 20;

  const hasExtraOffer = item.id % 3 === 0;
  const wishlisted = isWishlisted ? isWishlisted(item.id) : false;

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (onToggleWishlist) onToggleWishlist(item);
  };

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    if (onAddToCart) onAddToCart(item);
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <img
          src={item.thumbnail}
          alt={item.title}
          className={styles.productImage}
          loading="lazy"
        />

        <div className={styles.actionButtonsCol}>
          <button
            className={`${styles.floatingBtn} ${wishlisted ? styles.wishlistedBtn : ''}`}
            onClick={handleWishlistClick}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <i className={wishlisted ? 'fi fi-ss-heart' : 'fi fi-rs-heart'} />
          </button>

          <button
            className={styles.floatingBtn}
            aria-label="Find Similar Products"
            title="Find Similar"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </button>
        </div>

        {hasExtraOffer && (
          <div className={styles.extraOfferBadge}>Extra 10% Off</div>
        )}

        <div className={styles.addToBagOverlay}>
          <button
            className={styles.addToBagBtn}
            onClick={handleAddToCartClick}
            aria-label={`Add ${item.title} to bag`}
          >
            <i className="fi fi-rr-shopping-cart" />
            Add to Bag
          </button>
        </div>
      </div>

      <div className={styles.cardDetails}>
        {badges.length > 0 && (
          <div className={styles.badgeRow}>
            {badges.map((badge, idx) => (
              <span key={idx} className={styles.badgeItem}>{badge}</span>
            ))}
          </div>
        )}

        <h4 className={styles.brandTitle}>{brandName}</h4>
        <p className={styles.productSubtitle} title={item.title}>
          {item.title}
        </p>

        <div className={styles.swatchRow}>
          {colorDots.map((color, idx) => (
            <span
              key={idx}
              className={styles.colorDot}
              style={{
                backgroundColor: color,
                border: color.toLowerCase() === '#ffffff' ? '1px solid #ccc' : 'none',
              }}
            />
          ))}
        </div>

        <div className={styles.priceRow}>
          <span className={styles.currentPrice}>${currentPrice.toLocaleString('en-US')}</span>
          {discountPercent > 0 && (
            <span className={styles.originalPrice}>${originalPrice.toLocaleString('en-US')}</span>
          )}
          {discountPercent > 0 && (
            <span className={styles.discountBadge}>{discountPercent}% off</span>
          )}
        </div>

        {item.rating && (
          <div className={styles.ratingRow}>
            <span className={styles.ratingStar}>★</span>
            <span className={styles.ratingValue}>{Number(item.rating).toFixed(1)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
