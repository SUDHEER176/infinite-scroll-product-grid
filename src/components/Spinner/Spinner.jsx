import React from 'react';
import styles from './Spinner.module.css';

function Spinner() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
      <p>Loading products...</p>
    </div>
  );
}

export default Spinner;
