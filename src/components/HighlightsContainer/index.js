import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import Chart from '../Chart';

const HIGHLIGHTS_CONTAINER_META = {
  'CORE HIGHLIGHTS': {
    title: 'CORE HIGHLIGHTS',
    settings: [],
  },
  'PERPS HIGHLIGHTS': {
    title: 'PERPS HIGHLIGHTS',
    settings: [],
  }
}

const HighlightsContainer = () => {

  const generateChart = (item) => {
    return (
      <Chart 
        metric={'allAPY'} 
        chain={'base'} 
        pool={1}
        collateral_type={'USDC'}
      />
    )
  }

  // list of charts for a highlight box
  const generateChartList = () => {

    const chartItems = ['1','2'].map(item => {
      return generateChart(item);
    })

    return (
      <ul className={styles.chartList}>
        {chartItems}
      </ul>
    )
  }

  // highlight bar and accompanied charts
  const generateHightlightBox = (meta) => {
    const titleParts = meta.title.split(' ');

    return (
      <div key={meta.title} className={styles.highlightBox}>
        <section className={styles.highlightBoxHeader}>
          <div className={styles.highlightTitle}>
            <Link
              to={'/'}
            >
              <p className={styles.titleLink}>{titleParts[0]}</p>
            </Link>
            <p className={styles.titleSecondary}>{titleParts[1]}</p>
          </div>
          <div className={styles.settings}>
            <FontAwesomeIcon className={styles['fa-cog']} icon={faCog} />
          </div>
        </section>
        {generateChartList()}
      </div>
    )
  }

  const generateHighlightBoxList = () => {
    return Object.values(HIGHLIGHTS_CONTAINER_META).map(meta => {
      return generateHightlightBox(meta);
    })
  }
  
  return (
    <div className={styles['container']}>
      {generateHighlightBoxList()}
    </div>
  );
};

export default HighlightsContainer;
