import React, { useState } from 'react';
import styles from './Navbar.module.css';

export default function Navbar({
  searchQuery,
  onSearchChange,
  cartCount,
  wishlistCount,
  onOpenWishlist,
  onOpenCart,
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <header className={styles.navbar}>
      <div className={styles.navInner}>
        <div className={styles.logo}>
          <i className="fi fi-sr-store-buyer" style={{ fontSize: '1.35rem', display: 'inline-flex', alignItems: 'center' }} />
          <span>ShopGrid</span>
        </div>

        <div className={`${styles.searchWrapper} ${isFocused ? styles.searchFocused : ''}`}>
          <i className={`fi fi-rs-search ${styles.searchIcon}`} />
          <input
            id="product-search"
            type="text"
            placeholder="Search products, brands..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={styles.searchInput}
            autoComplete="off"
          />
          {searchQuery && (
            <button
              className={styles.clearBtn}
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
            >
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>

        <div className={styles.actions}>
          <button
            id="open-wishlist"
            className={styles.iconBtn}
            onClick={onOpenWishlist}
            aria-label={`Wishlist with ${wishlistCount} items`}
            title="Wishlist"
          >
            <i className="fi fi-rs-heart" />
            {wishlistCount > 0 && (
              <span className={styles.badge}>{wishlistCount > 99 ? '99+' : wishlistCount}</span>
            )}
          </button>

          <button
            id="cart-btn"
            className={styles.iconBtn}
            onClick={onOpenCart}
            aria-label={`Cart with ${cartCount} items`}
            title="Shopping Cart"
          >
            <i className="fi fi-rr-shopping-cart" />
            {cartCount > 0 && (
              <span className={styles.badge}>{cartCount > 99 ? '99+' : cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
