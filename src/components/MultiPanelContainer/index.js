import React from 'react';
import styles from './styles.module.css';
import Chart from '../Chart';
import { METRIC_METADATA } from '../../constants/metrics';

const MultiPanel = ({ filters }) => {

  const generateChart = (item) => {
    return (
      <Chart 
        key={item}
        metric={item} 
        chain={'base'} 
        pool={1}
        collateral_type={'USDC'}
        showFilters={false}
      />
    )
  }

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

  return (
    <div className={styles.multiPanel}>
      {generateChartList()}
    </div>
  );
};

export default MultiPanel;