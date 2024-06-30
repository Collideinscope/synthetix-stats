import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';


const HighlightsContainer = () => {

  const generateChart = (item) => {
    return (
      <li className={styles.chartItem}>
        chart
      </li>
    )
  }

  const generateChartList = () => {

    const chartItems = ['1','2'].map(item => {
      return generateChart(item);
    })

    return (
      <ul className={styles.chartList}>
        {chartItems}
      </ul>
    )
  }
  
  return (
    <div className={styles['container']}>
      {generateChartList()}
    </div>
  );
};

export default HighlightsContainer;
