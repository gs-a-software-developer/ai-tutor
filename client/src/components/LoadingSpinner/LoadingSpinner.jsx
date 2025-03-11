// LoadingSpinner.js
import React from 'react';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => (
  <div className={styles.spinnerContainer}>
    <div className={styles.spinner}></div>
    <span>Loading bomboclat ...</span>
  </div>
);

export default LoadingSpinner;