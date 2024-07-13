import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

import ChartContainer from '../ChartContainer';

import { METRIC_METADATA } from '../../constants/metrics';

const HighlightsContainer = () => {

  const generateChart = (item) => {
    return (
      <ChartContainer
        key={item}
        metric={item} 
        chain={'base'} 
        pool={1}
        collateral_type={'USDC'}
        showFilters={true}
      />
    )
  }

  // list of charts for a highlight box
  const generateChartList = () => {

    const chartItems = Object.keys(METRIC_METADATA)
      .map(item => {
        return generateChart(item);
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
      {generateHightlightBox()}
    </div>
  );
};

export default HighlightsContainer;
