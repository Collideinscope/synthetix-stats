import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

import FILTER_TYPES from '../../constants/filters';

const ViewOptionsContainer = ({
  filters,
  handleFilterChange,
}) => {

  const [filterToggles, setFilterToggles] = useState(
    Object.keys(filters).reduce((acc, key) => {
      acc[key] = false;

      return acc;
    }, {})
  );

  const handleToggleFilterSelect = (val) => {
    setFilterToggles(prevToggles => {
      return {
        ...prevToggles,
        [val]: !prevToggles[val]
      }
    })
  }

  const handleOptionSelect = (filter, val) => {
    setFilterToggles(prevToggles => {
      return {
        ...prevToggles,
        [filter]: !prevToggles[filter]
      }
    })

    handleFilterChange(filter, val);
  }

  const generateDropdownOptionsList = (filter) => {
    const dropDownItems = FILTER_TYPES[filter]
      .options
      .map(option => {
        return (
          <li 
            key={option.value}
            className={styles.option} 
            onClick={(e) => handleOptionSelect(filter, option.value)}
          >
            {option.label}
          </li>
        );
      })

    return (
      <ul className={styles.options}>
        {dropDownItems}
      </ul>
    )
  }

  const generateDropdowns = () => {
    const generateDropdownsList = Object 
      .keys(FILTER_TYPES)
      .map(key => {
        const activeSelectClass = filterToggles[key]
        ? 'activeSelect'
        : '';

        const dropdownOptionsList = filterToggles[key]
          ? generateDropdownOptionsList(key)
          : '';

        return (
          <div key={key} className={styles.filterItem}>
            <div 
              className={`${styles.filterSelect} ${styles[activeSelectClass]}`}
              onClick={(e) => handleToggleFilterSelect(key)}
            >
              {filters[key]}
            </div>
            {dropdownOptionsList}
          </div>
        )
      })

    return (
      <div className={styles.filters}>
        {generateDropdownsList}
      </div>
    )
  }

  const generateFilterPanel = () => {
    return (
      <div className={styles.filterPanel}>
        {generateDropdowns()}
      </div>
    );
  }
  
  return (
    <div className={styles.container}>
      {generateFilterPanel()}
    </div>
  );
};

export default ViewOptionsContainer;
