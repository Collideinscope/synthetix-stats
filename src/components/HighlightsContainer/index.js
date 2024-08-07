import styles from './styles.module.css';

import React, { useState, useEffect } from 'react';

import ChartContainer from '../ChartContainer';
import ViewOptionsContainer from '../ViewOptionsContainer';

import { METRIC_METADATA } from '../../constants/metrics';
import HIGHLIGHTS_METRICS from '../../constants/highlights_metrics';

const HighlightsContainer = () => {

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

  const generateChart = (item) => {
    return (
      <ChartContainer
        key={item}
        metric={item} 
        network={'base'} 
        pool={1}
        collateral_type={'USDC'}
        showFilters={true}
      />
    )
  }

  const generateChartList = () => {
    const chartItems = HIGHLIGHTS_METRICS
      .map(metric => {
        return generateChart(metric);
      })

    return (
      <ul className={styles.chartList}>
        {chartItems}
      </ul>
    )
  }

  // highlight bar and accompanied charts
  const generateHightlightBox = () => {
    return (
      <div className={styles.highlightBox}>
        {generateChartList()}
      </div>
    )
  }
  
  return (
    <div className={styles['container']}>
      <ViewOptionsContainer 
        filters={filters}
        handleFilterChange={handleFilterChange} 
      />
      {generateHightlightBox()}
    </div>
  );
};

export default HighlightsContainer;
