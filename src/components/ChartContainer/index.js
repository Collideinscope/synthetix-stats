import React, { useContext } from 'react';
import styles from './styles.module.css';

import { GlobalContext } from '../../context/GlobalContext';

import SummaryStatsPanel from '../SummaryStatsPanel';
import SummaryStatsPanelVertical from '../SummaryStatsPanelVertical';
import Chart from '../Chart';
import RadialChart from '../RadialChart';

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
  const chartType = METRIC_METADATA[metric].chartType;

  const renderChart = chartType === 'line'
    ? (
      <Chart 
        metric={metric}
        chain={chain}
        pool={pool}
        collateral_type={collateral_type}
        showFilters={showFilters}
      />
    ) : (
      <RadialChart
        metric={metric}
        chain={chain}
        pool={pool}
        collateral_type={collateral_type}
        showFilters={showFilters}
      />
    )

  const renderSummaryStatsPanel = chartType === 'line'
    ? (
      <SummaryStatsPanel 
        data={summaryData} 
        metric={metric} 
      />
    ) : (
      <SummaryStatsPanelVertical 
        data={summaryData} 
        metric={metric} 
      />
    );

  const verticalSummaryPanelClass = chartType === 'line'
    ? ''
    : 'verticalSummary';

  return (
    <div className={`${styles.container} ${styles[verticalSummaryPanelClass]}`}>
      {renderSummaryStatsPanel}
      {renderChart}
    </div>
  );
};

export default ChartContainer;