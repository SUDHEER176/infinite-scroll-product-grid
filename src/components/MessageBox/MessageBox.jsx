import React from 'react';
import styles from './MessageBox.module.css';

function MessageBox({ children }) {
  return (
    <div className={styles.messageBox}>
      <p>{children}</p>
    </div>
  );
}

export default MessageBox;
