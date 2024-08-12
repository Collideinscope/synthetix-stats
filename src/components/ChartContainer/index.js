import styles from './styles.module.css';

import React, { useState, useContext, useEffect, useRef } from 'react';

import { GlobalContext } from '../../context/GlobalContext';
import { useChartPage } from '../../context/ChartPageContext';

import SummaryStatsPanel from '../SummaryStatsPanel';
import AreaChartCustom from '../AreaChartCustom';
import RadialChart from '../RadialChart';
import BarChartCustom from '../BarChartCustom'; 

import { METRIC_METADATA } from '../../constants/metrics';

const ChartContainer = ({
  metric,
  network,
  pool,
  collateral_type,
}) => {
  const { state: globalState } = useContext(GlobalContext);
  const { state: pageState, dispatch } = useChartPage();

  const metricMetadata = METRIC_METADATA[metric];
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  const chartSettings = pageState.charts[metric] || {
    chartType: metricMetadata.defaultChartType || 'area',
    timeFilter: metricMetadata.defaultChartType === 'bar' ? 'daily' : 'cumulative'
  };

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth(); 
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleChartTypeChange = (newType) => {
    dispatch({
      type: 'UPDATE_CHART_SETTINGS',
      payload: {
        metric,
        settings: {
          chartType: newType,
          timeFilter: newType === 'bar' ? 'daily' : 'cumulative'
        }
      }
    });
  };

  const handleTimeFilterChange = (newTimeFilter) => {
    dispatch({
      type: 'UPDATE_CHART_SETTINGS',
      payload: {
        metric,
        settings: { timeFilter: newTimeFilter }
      }
    });
  };

  const renderChart = () => {
    const commonProps = {
      metric,
      network,
      pool,
      collateral_type,
      onChartTypeChange: handleChartTypeChange,
      onTimeFilterChange: handleTimeFilterChange,
      timeFilter: chartSettings.timeFilter,
    };

    switch (chartSettings.chartType) {
      case 'bar':
        return <BarChartCustom {...commonProps} />;
      case 'radial':
        return <RadialChart {...commonProps} />;
      default:
        return <AreaChartCustom {...commonProps} />;
    }
  };

  const renderSummaryStatsPanel = (
    <SummaryStatsPanel metric={metric} />
  );
  
  const containerClass = chartSettings.chartType === 'radial'
    ? 'radialContainer'
    : 'genericContainer';

  return (
    <div 
      ref={containerRef}
      className={`${styles.container} ${styles[containerClass]}`}
    >
      {renderSummaryStatsPanel}
      {renderChart()}
    </div>
  );
};

export default ChartContainer;
