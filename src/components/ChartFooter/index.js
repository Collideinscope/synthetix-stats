import styles from './styles.module.css';

import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faChartPie, faChartBar, faExpand } from '@fortawesome/free-solid-svg-icons';

const ChartFooter = ({ 
  onChartTypeChange, 
  activeChartType, 
  toggleFullScreen,
  isFullScreen 
}) => {
  const handleToggleFullScreen = () => {
    toggleFullScreen()
  };

  const expandIcon = activeChartType !== 'radial' && !isFullScreen
    ? (
      <div
        className={`${styles.chartIcon}`}
        onClick={handleToggleFullScreen}
      >
        <FontAwesomeIcon icon={faExpand} />
      </div>
    ) : '';
console.log(isFullScreen)
  return (
    <div className={styles.chartFooter}>
      <div className={styles.chartIconsLeft}>
        {expandIcon}
      </div>
      <div className={styles.chartIconsRight}>
        <div
          className={`${styles.chartIcon} ${activeChartType === 'area' ? styles.active : ''}`}
          onClick={() => onChartTypeChange('area', isFullScreen)}
        >
          <FontAwesomeIcon icon={faChartLine} />
        </div>
        <div
          className={`${styles.chartIcon} ${activeChartType === 'bar' ? styles.active : ''}`}
          onClick={() => onChartTypeChange('bar', isFullScreen)}
        >
          <FontAwesomeIcon icon={faChartBar} />
        </div>
        <div
          className={`${styles.chartIcon} ${activeChartType === 'radial' ? styles.active : ''}`}
          onClick={() => onChartTypeChange('radial')}
        >
          <FontAwesomeIcon icon={faChartPie} />
        </div>
      </div>
    </div>
  );
};

export default ChartFooter;