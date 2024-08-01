import styles from './styles.module.css';

import React, { useState } from 'react';
import FILTER_TYPES from '../../constants/filters';

const ViewOptionsContainer = ({ filters, handleFilterChange }) => {
  const [openFilterMenu, setOpenFilterMenu] = useState(null);

  const handleToggleFilterSelect = (filter) => {
    setOpenFilterMenu(openFilterMenu === filter ? null : filter);
  };

  const handleOptionSelect = (filter, val) => {
    handleFilterChange(filter, val);
    setOpenFilterMenu(null);
  };

  const renderFilterMenu = (filter) => {
    const options = FILTER_TYPES[filter].options;
    return (
      <div className={styles.filterMenu}>
        {options.map((option) => (
          <div 
            key={option.value}
            className={`${styles.filterOption} ${option.value === filters[filter] ? styles.activeFilterOption : ''}`}
            onClick={() => handleOptionSelect(filter, option.value)}
          >
            {option.label}
          </div>
        ))}
      </div>
    );
  };

  const renderFilters = () => {
    return Object.keys(FILTER_TYPES).map((filter) => {
      const openFilterClass = openFilterMenu === filter ? styles.openFilterMenu : '';

      return (
        <div 
          key={filter}
          className={styles.filterWrapper}
          onMouseEnter={() => handleToggleFilterSelect(filter)}
          onMouseLeave={() => setOpenFilterMenu(null)}
        >
          <p className={`${styles.filterSelect} ${openFilterClass}`}>
            {filters[filter]}
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