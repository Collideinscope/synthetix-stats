import styles from './styles.module.css';

import React from 'react';

import { format } from 'date-fns';

const ChartHeader = ({ 
  chartTitle, 
  timeFilter, 
  highlightValue, 
  latestDate, 
  valueAndSymbol, 
  CustomLegend 
}) => {
if (chartTitle === 'APY') { console.log(highlightValue)}
  const renderTimeFilter = chartTitle === 'APY'
    ? 'daily'
    : timeFilter;

  return (
    <div className={styles.chartHeader}>
      <div className={styles.titleContainer}>
        <h3 className={styles.chartTitle}>{chartTitle}</h3>
        {timeFilter && <p className={styles.timeFilter}>{renderTimeFilter}</p>}
        {CustomLegend && <CustomLegend />}
      </div>
      {highlightValue &&
        <div className={styles.latestValueContainer}>
          <p className={styles.latestValue}>
            {valueAndSymbol(highlightValue)}
          </p>
          <p className={styles.latestValueDate}>
            {latestDate && format(new Date(latestDate), 'MMM d, yyyy')}
          </p>
        </div>
      }
    </div>
  );
};

export default ChartHeader;