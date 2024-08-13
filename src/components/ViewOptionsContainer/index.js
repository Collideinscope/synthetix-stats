import styles from './styles.module.css';
import React, { useState } from 'react';
import FILTER_TYPES from '../../constants/filters';

import { useChartPage } from '../../context/ChartPageContext';

const ViewOptionsContainer = () => {
  const { state, dispatch } = useChartPage();
  const [openFilterMenu, setOpenFilterMenu] = useState(null);

  const handleToggleFilterSelect = (filter) => {
    setOpenFilterMenu(openFilterMenu === filter ? null : filter);
  };

  const handleOptionSelect = (filter, val) => {
    dispatch({
      type: 'UPDATE_PAGE_FILTERS',
      payload: { [filter]: val }
    });
    setOpenFilterMenu(null);
  };

  const renderFilterMenu = (filter) => {
    const options = FILTER_TYPES[filter].options;

    return (
      <div className={styles.filterMenu}>
        {options.map((option) => {
          const activeFilterClass = option.value === state.pageFilters[filter] 
            ? styles.activeFilterOption 
            : '';

          return (
            <div
              key={option.value}
              className={`${styles.filterOption} ${activeFilterClass}`}
              onClick={() => handleOptionSelect(filter, option.value)}
            >
              <div className={styles.selectionBox}></div>
              {option.label}
            </div>
          )
        })}
      </div>
    );
  };

  const renderFilters = () => {
    return Object.keys(FILTER_TYPES).map((filter) => {
      const openFilterClass = openFilterMenu === filter 
        ? styles.openFilterMenu 
        : '';

      const matchingOption = FILTER_TYPES[filter]
        .options
        .find(option => option.value === state.pageFilters[filter]);

      const filterLabel = matchingOption
        ? matchingOption.label
        : '-';

      return (
        <div
          key={filter}
          className={styles.filterWrapper}
          onMouseEnter={() => handleToggleFilterSelect(filter)}
          onMouseLeave={() => setOpenFilterMenu(null)}
        >
          <p className={`${styles.filterSelect} ${openFilterClass}`}>
            {filterLabel}
          </p>
          {openFilterMenu === filter && renderFilterMenu(filter)}
        </div>
      );
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterPanel}>
        {renderFilters()}
      </div>
    </div>
  );
};

export default ViewOptionsContainer;