import React, { useState, useEffect, useReducer } from 'react';

import styles from './styles.module.css';

import ViewOptionsContainer from '../ViewOptionsContainer';
import MultiPanelContainer from '../MultiPanelContainer';

const IndividualMetricContainer = ({
  metric,
}) => {
console.log(metric)
  const [filters, setFilters] = useState({
    chain: 'base',
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
      <MultiPanelContainer filters={filters} category={false} metric={metric} />
    </section>
  )
}

export default IndividualMetricContainer;