import React, { useEffect } from 'react';
import styles from './CartDrawer.module.css';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onRemove,
  onUpdateQty,
  totalPrice,
}) {
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
        aria-label="Shopping Cart"
      >
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <i className="fi fi-rr-shopping-cart" style={{ fontSize: '1.15rem' }} />
            <h2>
              Shopping Bag
              <span className={styles.count}>{cart.length}</span>
            </h2>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close cart">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className={styles.body}>
          {cart.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🛒</div>
              <p className={styles.emptyTitle}>Your bag is empty</p>
              <p className={styles.emptyHint}>Browse products and tap "Add to Bag" to save items here.</p>
            </div>
          ) : (
            <ul className={styles.list}>
              {cart.map(item => (
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
                    <p className={styles.itemPrice}>
                      ${Number(item.price || 0).toLocaleString('en-US')} × {item.qty}
                    </p>

                    <div className={styles.qtyRow}>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => onUpdateQty(item.id, -1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className={styles.qtyVal}>{item.qty}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => onUpdateQty(item.id, 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className={styles.removeBtn}
                    onClick={() => onRemove(item.id)}
                    aria-label={`Remove ${item.title} from cart`}
                    title="Remove item"
                  >
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.footerRow}>
              <span className={styles.footerLabel}>Subtotal</span>
              <span className={styles.footerTotal}>
                ${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <button className={styles.checkoutBtn} onClick={() => alert('Proceeding to checkout!')}>
              Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
