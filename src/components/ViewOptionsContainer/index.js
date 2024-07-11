import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';


const ViewOptionsContainer = ({
  filters,
  handleFilterChange,
}) => {

  const generateFilterPanel = () => {
    return (
      <div className={styles.filterPanel}>
        <div className={styles.filterItem}>
          <label htmlFor="chain-select"></label>
          <select
            id="chain-select"
            value={filters.chain}
            onChange={(e) => handleFilterChange('chain', e.target.value)}
          >
            <option value="base">base</option>
            <option value="base">base</option>
          </select>
        </div>
  
        <div className={styles.filterItem}>
          <label htmlFor="pool-select"></label>
          <select
            id="pool-select"
            value={filters.pool}
            onChange={(e) => handleFilterChange('pool', e.target.value)}
          >
            <option value="1">1</option>
            <option value="1">2</option>
          </select>
        </div>
  
        <div className={styles.filterItem}>
          <label htmlFor="collateral-type-select"></label>
          <select
            id="collateral-type-select"
            value={filters.collateralType}
            onChange={(e) => handleFilterChange('collateralType', e.target.value)}
          >
            <option value="0xc74ea762cf06c9151ce074e6a569a5945b6302e7">USDC</option>
            <option value="0xc74ea762cf06c9151ce074e6a569a5945b6302e7">USDC</option>
          </select>
        </div>
      </div>
    );
  }
  
  return (
    <div className={styles.container}>
      {generateFilterPanel()}
    </div>
  );
};

export default ViewOptionsContainer;
