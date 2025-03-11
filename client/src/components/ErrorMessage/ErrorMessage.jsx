// ErrorMessage
import React from 'react';
import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ message }) => (
  <div className={styles.errorContainer}>
    <span className={styles.errorText}>Error: {message}</span>
  </div>
);

export default ErrorMessage;