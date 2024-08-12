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

  const handleFilterChange = (filter, value) => {
    dispatch({
      type: 'UPDATE_PAGE_FILTERS',
      payload: { [filter]: value }
    });
  };

  return (
    <div className={styles.chartPageContainer}>
      <ViewOptionsContainer
        filters={state.pageFilters}
        handleFilterChange={handleFilterChange}
      />
      <MultiPanelContainer 
        chartMetrics={chartMetadata}
        pageFilters={state.pageFilters}
      />
    </div>
  );
};

export default ChartPageContainer;