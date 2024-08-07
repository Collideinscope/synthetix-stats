import styles from './styles.module.css';

import React from 'react';

import ChartContainer from '../ChartContainer';
import { METRIC_METADATA } from '../../constants/metrics';

const MultiPanel = ({ filters, category, metric }) => {

  // all metrics by category if category multipanel, otherwise indiv metric
  const chartMetadata = category 
    ? Object
      .keys(METRIC_METADATA)
      .filter(key => {
        return METRIC_METADATA[key].category === category;
      })
    : [metric];
console.log()
  const generateChart = (item) => {
    return (
      <ChartContainer
        key={item}
        metric={item} 
        network={'base'} 
        pool={1}
        collateral_type={'USDC'}
        showFilters={false}
      />
    )
  }

  const generateChartList = () => {
    const chartItems = chartMetadata
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