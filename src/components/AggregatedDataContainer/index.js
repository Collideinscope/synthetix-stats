import React, { useState, useEffect, useReducer } from 'react';

import styles from './styles.module.css';

import ViewOptionsContainer from '../ViewOptionsContainer';
import MultiPanelContainer from '../MultiPanelContainer';

const AggregatedDataContainer = ({
  dataType,
}) => {

  const [filters, setFilters] = useState({
    chain: 'base',
    pool: '1',
    collateralType: '0xc74ea762cf06c9151ce074e6a569a5945b6302e7',
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
      <MultiPanelContainer />
    </section>
  )
}

export default AggregatedDataContainer;