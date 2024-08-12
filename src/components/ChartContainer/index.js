import styles from './styles.module.css';

import React, { useState, useContext, useEffect, useRef } from 'react';

import { GlobalContext } from '../../context/GlobalContext';

import SummaryStatsPanel from '../SummaryStatsPanel';
import SummaryStatsPanelVertical from '../SummaryStatsPanelVertical';
import AreaChartCustom from '../AreaChartCustom';
import RadialChart from '../RadialChart';
import BarChartCustom from '../BarChartCustom'; 

import { METRIC_METADATA } from '../../constants/metrics';

const ChartContainer = ({
  metric,
  network,
  pool,
  collateral_type,
  showFilters,
}) => {
  const { state } = useContext(GlobalContext);

  const metricMetadata = METRIC_METADATA[metric];
  const timeFilter = metricMetadata.defaultChartType === 'bar'
    ? 'daily'
    : 'cumulative';
    
  const [chartType, setChartType] = useState(metricMetadata.defaultChartType || 'area');
  const [dataType, setDataType] = useState('cumulative');
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

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
    setChartType(newType);

    // reset data type if chart type is area
    if (newType === 'area') {
      setDataType('cumulative');
    }
  };

  const handleDataTypeChange = (newDataType) => {
    setDataType(newDataType);
  };

  const handleFilterChange = (type, option) => {
    console.log('filter changed', type, option);
  }

  const renderChart = () => {
    const commonProps = {
      metric,
      network,
      pool,
      collateral_type,
      showFilters,
      onChartTypeChange: handleChartTypeChange,
      onDataTypeChange: handleDataTypeChange,
      timeFilter,
      dataType,
    };

    switch (chartType) {
      case 'bar':
        return <BarChartCustom {...commonProps} />;
      case 'radial':
        return <RadialChart {...commonProps} />;
      default:
        return <AreaChartCustom {...commonProps} />;
    }
  };

  const renderSummaryStatsPanel = (
    <SummaryStatsPanel 
        timeFilter={timeFilter}
        metric={metric} 
        chartType={chartType}
        chain={'base'}
      />
    );

  const containerClass = chartType === 'radial'
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
