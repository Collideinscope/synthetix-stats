import styles from './styles.module.css';

import React, { useState, useContext, useEffect, useRef } from 'react';

import { GlobalContext } from '../../context/GlobalContext';
import { useChartPage } from '../../context/ChartPageContext';

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
  const [isFullScreen, setIsFullScreen] = useState(false);
  const containerRef = useRef(null);

  const chartSettings = pageState.charts[metric] || {
    chartType: metricMetadata.defaultChartType || 'area',
    timeFilter: metricMetadata['timeFilters'][metricMetadata.defaultChartType],
  };
console.log()
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

  const handleChartTypeChange = (newType, isFullScreen) => {
    dispatch({
      type: 'UPDATE_CHART_SETTINGS',
      payload: {
        metric,
        settings: {
          chartType: newType,
          timeFilter: metricMetadata['timeFilters'][newType],
        }
      }
    });

    setIsFullScreen(isFullScreen)
  };

  const handleTimeFilterChange = (newTimeFilter) => {
    dispatch({
      type: 'UPDATE_CHART_SETTINGS',
      payload: {
        metric,
        settings: { timeFilter: metricMetadata['timeFilters'][chartSettings.chartType] }
      }
    });
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
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
      isFullScreen: isFullScreen,
      toggleFullScreen: toggleFullScreen,
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

  const containerClass = chartSettings.chartType === 'radial'
    ? 'radialContainer'
    : 'genericContainer';

  const fullScreenClass = isFullScreen 
    ? 'fullScreen'
    : '';

  return (
    <div 
      ref={containerRef}
      className={`${styles.container} ${styles[containerClass]} ${styles[fullScreenClass]}`}
    >
      {renderChart()}
    </div>
  );
};

export default ChartContainer;
