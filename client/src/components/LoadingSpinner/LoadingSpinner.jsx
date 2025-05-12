import React, { useEffect, useState } from 'react';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!showSpinner) return null;

  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingSpinner;