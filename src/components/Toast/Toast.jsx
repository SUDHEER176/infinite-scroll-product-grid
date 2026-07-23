import React, { useEffect } from 'react';
import styles from './Toast.module.css';

export default function Toast({ message, isVisible, onHide }) {
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(onHide, 3000);
    return () => clearTimeout(timer);
  }, [isVisible, message, onHide]);

  return (
    <div
      className={`${styles.toast} ${isVisible ? styles.toastVisible : ''}`}
      role="status"
      aria-live="polite"
    >
      <div className={styles.toastIconWrap}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <span className={styles.toastMessage}>{message}</span>
      <button className={styles.dismissBtn} onClick={onHide} aria-label="Dismiss notification">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
