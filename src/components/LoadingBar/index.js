import styles from './styles.module.css';

import React from 'react';

const LoadingBar = ({ isLoading }) => {
  return (
    <div className={styles.loadingBarContainer}>
      {isLoading && <div className={styles.loadingBarAnimation} />}
    </div>
  );
};

export default LoadingBar;