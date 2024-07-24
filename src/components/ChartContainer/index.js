import React, { useState, useContext } from 'react';
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

  const handleChartTypeChange = (newType) => {
    setChartType(newType);
  };

  const renderChart = chartType === 'bar' 
    ? (
      <BarChartCustom
        metric={metric}
        chain={chain}
        pool={pool}
        collateral_type={collateral_type}
        showFilters={showFilters}
        onChartTypeChange={handleChartTypeChange}
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
        />
      ) : (
        <AreaChartCustom 
          metric={metric}
          chain={chain}
          pool={pool}
          collateral_type={collateral_type}
          showFilters={showFilters}
          onChartTypeChange={handleChartTypeChange}
        />
      )

  const renderSummaryStatsPanel = chartType === 'radial'
    ? (
      <SummaryStatsPanelVertical 
        data={summaryData} 
        metric={metric} 
      />
    ) : (
      <SummaryStatsPanel 
        data={summaryData} 
        metric={metric} 
      />
    );

  const verticalSummaryPanelClass = chartType === 'radial'
    ? 'verticalSummary'
    : '';

  return (
    <div className={`${styles.container} ${styles[verticalSummaryPanelClass]}`}>
      {renderSummaryStatsPanel}
      {renderChart}
    </div>
  );
};

export default ChartContainer;
