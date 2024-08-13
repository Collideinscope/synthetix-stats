import styles from './styles.module.css';

import React, { useState, useEffect, useMemo } from 'react';

import ViewOptionsContainer from '../ViewOptionsContainer';
import MultiPanelContainer from '../MultiPanelContainer';

import { useChartPage } from '../../context/ChartPageContext';

import { METRIC_METADATA } from '../../constants/metrics';

const ChartPageContainer = ({ category, metric }) => {
  const { state, dispatch } = useChartPage();

  // Determine which charts to display
  const chartMetadata = useMemo(() => {
    return category
      ? Object.keys(METRIC_METADATA).filter(key => METRIC_METADATA[key].category === category)
      : [metric];

  }, [category, metric]);

  // Initialize charts
  useEffect(() => {
    // reset chart context (on navigation)
    dispatch({ type: 'RESET_CHARTS' });

    chartMetadata.forEach(metricKey => {
      dispatch({
        type: 'INITIALIZE_CHART',
        payload: {
          metric: metricKey,
          defaultChartType: METRIC_METADATA[metricKey].defaultChartType || 'area',
        }
      });
    });
  }, [chartMetadata, dispatch]);

  return (
    <div className={styles.chartPageContainer}>
      <ViewOptionsContainer />
      <MultiPanelContainer 
        chartMetrics={chartMetadata}
      />
    </div>
  );
};

export default ChartPageContainer;