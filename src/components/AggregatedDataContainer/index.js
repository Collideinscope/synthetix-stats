import React, { useState, useEffect, useReducer } from 'react';

import styles from './styles.module.css';

import ViewOptionsContainer from '../ViewOptionsContainer';
import MultiPanelContainer from '../MultiPanelContainer';

const AggregatedDataContainer = ({
  category, // 'core', 'perps', etc - nav
}) => {

  const [filters, setFilters] = useState({
    network: 'base',
    pool: '1',
    collateralType: 'USDC',
  });

  const handleFilterChange = (filter, value) => {
    setFilters(prevFilters => { 
      return {
        ...prevFilters, 
        [filter]: value
      };
    })
  };

  return (
    <section className={styles.container}>
      <ViewOptionsContainer 
        filters={filters}
        handleFilterChange={handleFilterChange} 
      />
      <MultiPanelContainer filters={filters} category={category} metric={false} />
    </section>
  )
}

export default AggregatedDataContainer;