import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const HIGHLIGHTS_CONTAINER_META = {
  'Core Highlights': {
    title: 'Core Highlights',
    settings: [],
  },
  'Perps Highlights': {
    title: 'Perps Highlights',
    settings: [],
  }
}

const HighlightsContainer = () => {

  const generateChart = (item) => {
    return (
      <li key={item} className={styles.chartItem}>
        chart
      </li>
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
    return (
      <div key={meta.title} className={styles.highlightBox}>
        <section className={styles.highlightBoxHeader}>
          <p className={styles.highlightTitle}>
            > {meta.title}
          </p>
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
