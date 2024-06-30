import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

import ViewOptionsContainer from '../ViewOptionsContainer';
import TableContainer from '../TableContainer';

const PrimaryViewContainer = () => {
  
  return (
    <div className={styles['container']}>
      <ViewOptionsContainer />
      <TableContainer />
    </div>
  );
};

export default PrimaryViewContainer;
