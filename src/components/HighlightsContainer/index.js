import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import Chart from '../Chart';

const HighlightsContainer = () => {

  const generateChart = (item) => {
    return (
      <Chart 
        key={item}
        metric={item} 
        chain={'base'} 
        pool={1}
        collateral_type={'USDC'}
      />
    )
  }

  // list of charts for a highlight box
  const generateChartList = () => {

    const chartItems = ['allAPY', 'allTVL', 'allPoolRewards', 'allCoreDelegations']
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
  const generateHightlightBox = (meta) => {
    return (
      <div key={meta} className={styles.highlightBox}>
        {generateChartList()}
      </div>
    )
  }

  const generateHighlightBoxList = () => {
    // change to metrics list, remove highlight box list requirement later
    return [1].map(meta => {
      return generateHightlightBox(meta);
    })
  }
  
  return (
    <div className={styles['container']}>
      {generateHighlightBoxList()}
    </div>
  );
};

export default HighlightsContainer;
