import styles from './styles.module.css';
import React from 'react';
import ChartContainer from '../ChartContainer';
import { useChartPage } from '../../context/ChartPageContext';

const MultiPanel = ({ chartMetrics, pageFilters }) => {
  const { state } = useChartPage();

  const generateChart = (metricKey) => (
    <ChartContainer
      key={metricKey}
      metric={metricKey}
      {...pageFilters}
      chartSettings={state.charts[metricKey]}
    />
  );

  const generateChartList = () => (
    <ul className={styles.chartList}>
      {chartMetrics.map(generateChart)}
    </ul>
  );

  return (
    <div className={styles.multiPanel}>
      {generateChartList()}
    </div>
  );
};

export default MultiPanel;