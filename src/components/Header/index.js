import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.css';

import logoSymbol from '../../assets/blue-x.svg'; 
import { NAV_MENU } from '../../constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMouseEnter = (menu) => {
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  const generateLogo = () => {
    return (
      <h1>
        <img 
          src={logoSymbol}
          alt="Synthetix Logo" 
          className={styles.logo} 
        />
      </h1>
    );
  };

  const generateNav = () => {

    const navMenuItems = Object
      .keys(NAV_MENU)
      .map((menu) => {

        const subNavItem = (
          <ul 
            className={styles.subNav}
          >
            {Object.keys(NAV_MENU[menu]).map((subMenu) => {
              return (
                <li className={styles.subNavItem}>
                  <Link 
                    key={subMenu} 
                    to={NAV_MENU[menu][subMenu].route} 
                    className={styles.subNavItem}
                  >
                    <span>{subMenu}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        )

        const renderSubNavItem = activeMenu === menu
          ? subNavItem 
          : '';

        const activeNavItemClass = activeMenu === menu 
          ? 'activeNav'
          : '';

        return (
          <li
            key={menu} 
            className={`${styles.navItem} ${activeNavItemClass}`}
            onMouseEnter={() => handleMouseEnter(menu)}
            onMouseLeave={handleMouseLeave}
          >
            <span>{menu}</span>
            {renderSubNavItem}
          </li>
        )
      })

    return (
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navMenuItems}
        </ul>
      </nav>
    );
  };

  const generateSearch = () => {
    return (
      <section className={styles.searchContainer}>
        <FontAwesomeIcon className={styles['fa-magnifying-glass']} icon={faMagnifyingGlass} />
      </section>
    );
  }

  return (
    <header className={styles.header}>
      {generateLogo()}
      {generateNav()}
      {generateSearch()}
    </header>
  );
};

export default Header;
