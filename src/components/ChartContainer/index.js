import React, { useState, useContext, useEffect, useRef } from 'react';
import styles from './styles.module.css';

import { GlobalContext } from '../../context/GlobalContext';

import SummaryStatsPanel from '../SummaryStatsPanel';
import SummaryStatsPanelVertical from '../SummaryStatsPanelVertical';
import AreaChartCustom from '../AreaChartCustom';
import RadialChart from '../RadialChart';
import BarChartCustom from '../BarChartCustom'; 

import { METRIC_METADATA } from '../../constants/metrics';

const ChartContainer = ({
  metric,
  chain,
  pool,
  collateral_type,
  showFilters,
}) => {
  const { state } = useContext(GlobalContext);
  const summaryDataKey = METRIC_METADATA[metric].summaryDataKey;
  const summaryData = state[summaryDataKey];
  const [chartType, setChartType] = useState('line');
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
  };

  const handleFilterChange = (type, option) => {
    console.log('filter changed', type, option);
  }

  const renderChart = chartType === 'bar' 
    ? (
      <BarChartCustom
        metric={metric}
        chain={chain}
        pool={pool}
        collateral_type={collateral_type}
        showFilters={showFilters}
        onChartTypeChange={handleChartTypeChange}
        containerWidth={containerWidth}
      />
    ) : chartType === 'radial' 
      ? (
        <RadialChart
          metric={metric}
          chain={chain}
          pool={pool}
          collateral_type={collateral_type}
          showFilters={showFilters}
          onChartTypeChange={handleChartTypeChange}
          containerWidth={containerWidth}
        />
      ) : (
        <AreaChartCustom 
          metric={metric}
          chain={chain}
          pool={pool}
          collateral_type={collateral_type}
          showFilters={showFilters}
          onChartTypeChange={handleChartTypeChange}
          onFilterChange={handleFilterChange}
          containerWidth={containerWidth}
        />
      )

  const renderSummaryStatsPanel = (
    <SummaryStatsPanel 
        data={summaryData} 
        metric={metric} 
        chartType={chartType}
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
      {renderChart}
    </div>
  );
};

export default ChartContainer;
