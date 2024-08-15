import styles from './styles.module.css';

import React, { useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

import { GlobalContext } from '../../context/GlobalContext';
import { useChartPage } from '../../context/ChartPageContext';

import { METRIC_METADATA } from '../../constants/metrics';
import { abbreviateNumber } from "../../helpers";

const valueWithSymbol = (value, symbol, symbolLocation) => {
  if (symbolLocation === 'left') {
    return `${symbol}${value}`;
  }
  return `${value}${symbol}`;
};

const SummaryStatsPanel = ({ metric }) => {
  const { state } = useContext(GlobalContext);
  const { state: pageState } = useChartPage();

  const timeFilterToSummaryKey = {
    'daily': metric === 'openInterest' ? 'summaryDataKey' : 'summaryDataDailyKey',
    'month': 'summaryDataMonthlyKey',
    'cumulative': 'summaryDataKey',
  }

  const { 
    summaryDataType,
    chartYValueSymbol,
    symbolLocation,
    defaultChartType,
  } = METRIC_METADATA[metric];

  const getDefaultTimeFilter = (chartType) => {
    return chartType === 'bar' 
            ? 'daily' 
            : metric === 'apy'
              ? 'daily' 
              : 'cumulative';
  };

  const chartSettings = pageState.charts && pageState.charts[metric];
  const timeFilter = chartSettings ? chartSettings.timeFilter : getDefaultTimeFilter(defaultChartType);

  const summaryDataKey = timeFilterToSummaryKey[timeFilter];
  const data = state[METRIC_METADATA[metric][summaryDataKey]] 
    ? state[METRIC_METADATA[metric][summaryDataKey]]
    : [];

    const renderDelta = (value, label) => {
    if (!value) { return ''; }

    const isPositive = value >= 0;
    const icon = isPositive ? faCaretUp : faCaretDown;
    const colorClass = isPositive ? styles.positive : styles.negative;

    const renderLabel = label 
      ? <span className={styles.statLabel}>{label}</span>
      : '';

    return (
      <div className={`${styles.statItem} ${colorClass}`}>
        {renderLabel}
        <span className={styles.statValue}>
          <FontAwesomeIcon icon={icon} className={styles.icon} />
          {abbreviateNumber(Math.abs(value))}%
        </span>
      </div>
    );
  };

  const renderValueWithSymbol = (value) => {
    if (!value) { return ''; }

    const abbreviatedValue = abbreviateNumber(value);

    return valueWithSymbol(abbreviatedValue, chartYValueSymbol, symbolLocation);
  };

  const renderDeltas = () => {
    if (!chartSettings || chartSettings.chartType === 'radial'
        || !data.atl || !data.ath || !data.ath_percentage
    ) {
      return '';
    }

    return (
      <>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>ATL</span>
          <span className={styles.statValue}>{
            summaryDataType === '%' 
              ? renderValueWithSymbol(data.atl * 100)
              : renderValueWithSymbol(data.atl)
          }</span>
          <span className={styles.statDelta}>{renderDelta(data.atl_percentage)}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>ATH</span>
          <span className={styles.statValue}>{
            summaryDataType === '%' 
              ? renderValueWithSymbol(data.ath * 100)
              : renderValueWithSymbol(data.ath)
          }</span>
          <span className={styles.statDelta}>{renderDelta(data.ath_percentage)}</span>
        </div>
      </>
    );
  }

  const renderStdDev = () => {
    if (!data.standard_deviation) { return ''; }

    return (
      <div className={styles.statItem}>
        <span className={styles.statLabel}>stdev</span>
        <span className={styles.statValue}>{
          summaryDataType === '%' 
            ? renderValueWithSymbol(data.standard_deviation * 100)
            : renderValueWithSymbol(data.standard_deviation)
        }</span>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.summaryTitleContainer}>
        <p className={styles.summaryTitle}>
          summary stats <span className={styles.point}>&#x2022;</span>
        </p>
        <p className={styles.summaryTime}>{timeFilter}</p>
      </div>
      <div className={styles.summaryData}>
        {renderDelta(data.delta_24h, '24h')}
        {renderDelta(data.delta_7d, '7d')}
        {renderDelta(data.delta_28d, '28d')}
        {renderDelta(data.delta_ytd, 'YTD')}
        {renderStdDev()}
        {renderDeltas()}
      </div>
    </div>
  );
};

export default SummaryStatsPanel;
