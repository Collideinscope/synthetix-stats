import styles from './styles.module.css';

import React, { useContext, useState, useEffect } from 'react';

import { GlobalContext } from '../../context/GlobalContext';

import { METRIC_METADATA } from '../../constants/metrics';

import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { abbreviateNumber } from "../../helpers";

const ChartHeader = ({ 
  network,
  metric,
  chartTitle, 
  timeFilter, 
  highlightValue, 
  latestDate, 
  valueAndSymbol, 
  CustomLegend 
}) => {

  const { state } = useContext(GlobalContext);
  const [summaryData, setSummaryData] = useState({
    delta_24h: '',
    delta_7d: '',
    delta_28d: '',
  });

  useEffect(() => {
    if (metric && network && state[METRIC_METADATA[metric]?.summaryDataKey]) {
      const summaryData = state[METRIC_METADATA[metric].summaryDataKey];
      if (summaryData && summaryData[network]) {
        setSummaryData({...summaryData[network]});
      }
    }
  }, [metric, state, network]);

  const renderDelta = (value, label) => {
    const isPositive = value >= 0;
    const icon = isPositive ? faCaretUp : faCaretDown;
    const colorClass = isPositive ? styles.positive : styles.negative;

    return (
      <div className={`${styles.statItem} ${colorClass}`}>
        <span className={styles.statLabel}>{label}:</span>
        <span className={styles.statValue}>
          <FontAwesomeIcon icon={icon} className={styles.icon} />
          <span className={styles.deltaValue}>
            {abbreviateNumber(Math.abs(value))}%
          </span>
        </span>
      </div>
    );
  };
  
  const renderDeltasContainer = () => {
    const {
      delta_24h,
      delta_7d,
      delta_28d
    } = summaryData;

    return (
      <div className={styles.deltasContainer}>
        {renderDelta(delta_24h, '24h')}
        {renderDelta(delta_7d, '7d')}
        {renderDelta(delta_28d, '28d')}
      </div>
    )
  }

  const generateDateRender = () => {
    if (!latestDate) { return ''; };

    const date = latestDate && new Date(latestDate);
    const isoDate = date.toISOString();

    return `${isoDate.substring(0, 10)} ${isoDate.substring(11, 16)}`;
  }

  return (
    <div className={styles.chartHeader}>
      <div className={styles.titleContainer}>
        <h3 className={styles.chartTitle}>{chartTitle}</h3>
        {timeFilter && <p className={styles.timeFilter}>{timeFilter}</p>}
        {CustomLegend && <CustomLegend />}
      </div>
      {highlightValue &&
        <div className={styles.latestValueContainer}>
          {renderDeltasContainer()}
          <div className={styles.latestValues}>
            <p className={styles.latestValue}>
              {valueAndSymbol(highlightValue)}
            </p>
            <p className={styles.latestValueDate}>
              {generateDateRender()}
            </p>
          </div>
        </div>
      }
    </div>
  );
};

export default ChartHeader;