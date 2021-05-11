import React from 'react';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.error}>
      <h1 className="text-center">404 Page not found!</h1>
    </div>
  );
}
