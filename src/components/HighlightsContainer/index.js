import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import Chart from '../Chart';

import { METRIC_METADATA } from '../../constants/metrics';


const HighlightsContainer = () => {

  const generateChart = (item) => {
    return (
      <Chart 
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
