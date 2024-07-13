import React from 'react';
import styles from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const SummaryStatsPanel = ({ data, metric }) => {
  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  const formatPercentage = (value) => `${value.toFixed(2)}%`;

  const renderDelta = (value, label) => {
    const isPositive = value > 0;
    const icon = isPositive ? faArrowUp : faArrowDown;
    const colorClass = isPositive ? styles.positive : styles.negative;

    const renderLabel = label 
      ? <span className={styles.statLabel}>{label}</span>
      : '';

    return (
      <div className={`${styles.statItem} ${colorClass}`}>
        {renderLabel}
        <span className={styles.statValue}>
          <FontAwesomeIcon icon={icon} />
          {' ' + formatPercentage(Math.abs(value))}
        </span>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.statsGroup}>
          {renderDelta(data.delta_24h, '24h')}
          {renderDelta(data.delta_7d, '7d')}
          {renderDelta(data.delta_28d, '28d')}
          {renderDelta(data.delta_ytd, 'YTD')}
      </div>
      <div className={styles.statsGroup}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>stdev</span>
          <span className={styles.statValue}>{formatPercentage(data.standard_deviation * 100)}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>ATH</span>
          <span className={styles.statValue}>{formatPercentage(data.ath * 100)}</span>
          <span className={styles.statDelta}>{renderDelta(data.ath_percentage)}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>ATL</span>
          <span className={styles.statValue}>{formatPercentage(data.atl * 100)}</span>
          <span className={styles.statDelta}>{renderDelta(data.atl_percentage)}</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryStatsPanel;