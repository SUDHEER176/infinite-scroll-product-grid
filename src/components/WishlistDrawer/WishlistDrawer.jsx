import React, { useEffect } from 'react';
import styles from './WishlistDrawer.module.css';

export default function WishlistDrawer({ isOpen, onClose, wishlist, onRemove }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const totalValue = wishlist.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Wishlist"
      >
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <i className="fi fi-ss-heart" style={{ color: '#fc2779', fontSize: '1.15rem' }} />
            <h2>
              My Wishlist
              <span className={styles.count}>{wishlist.length}</span>
            </h2>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close wishlist">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className={styles.body}>
          {wishlist.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>💔</div>
              <p className={styles.emptyTitle}>Your wishlist is empty</p>
              <p className={styles.emptyHint}>Tap the ♡ heart icon on any product to save it here.</p>
            </div>
          ) : (
            <ul className={styles.list}>
              {wishlist.map(item => (
                <li key={item.id} className={styles.item}>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className={styles.itemImg}
                    loading="lazy"
                  />
                  <div className={styles.itemInfo}>
                    <p className={styles.itemBrand}>{item.brand || item.category || 'Brand'}</p>
                    <p className={styles.itemTitle} title={item.title}>{item.title}</p>
                    <p className={styles.itemPrice}>${Number(item.price || 0).toLocaleString('en-US')}</p>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => onRemove(item)}
                    aria-label={`Remove ${item.title} from wishlist`}
                    title="Remove item"
                  >
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {wishlist.length > 0 && (
          <div className={styles.footer}>
            <span className={styles.footerLabel}>Total Value</span>
            <span className={styles.footerTotal}>${totalValue.toLocaleString('en-US')}</span>
          </div>
        )}
      </aside>
    </>
  );
}
