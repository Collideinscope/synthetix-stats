import styles from './styles.module.css';

import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

import { METRIC_METADATA } from '../../constants/metrics';
import { abbreviateNumber } from "../../helpers";

const valueWithSymbol = (value, symbol, symbolLocation) => {
  if (symbolLocation === 'left') {
    return `${symbol}${value}`;
  }
  return `${value}${symbol}`;
};

const SummaryStatsPanel = ({ data, metric, chartType }) => {
  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  const { 
    summaryDataType,
    chartYValueSymbol,
    symbolLocation,
  } = METRIC_METADATA[metric];

  const renderDelta = (value, label) => {
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
    const abbreviatedValue = abbreviateNumber(value);
    return valueWithSymbol(abbreviatedValue, chartYValueSymbol, symbolLocation);
  };

  const renderDeltas = chartType !== 'radial'
    ? (
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
    ) : '';

  return (
    <div className={styles.container}>
          {renderDelta(data.delta_24h, '24h')}
          {renderDelta(data.delta_7d, '7d')}
          {renderDelta(data.delta_28d, '28d')}
          {renderDelta(data.delta_ytd, 'YTD')}
          <div className={styles.statItem}>
            <span className={styles.statLabel}>stdev</span>
            <span className={styles.statValue}>{
              summaryDataType === '%' 
                ? renderValueWithSymbol(data.standard_deviation * 100)
                : renderValueWithSymbol(data.standard_deviation)
            }</span>
          </div>
          {renderDeltas}
    </div>
  );
};

export default SummaryStatsPanel;
