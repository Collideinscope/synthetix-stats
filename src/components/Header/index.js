import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.css';

import logoSymbol from '../../assets/blue-x.svg'; 
import { NAV_MENU } from '../../constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const initialMenuActive = Object.keys(NAV_MENU).reduce((acc, menu) => {
    acc[menu] = false;

    return acc;
  }, {})

  const [activeMenu, setActiveMenu] = useState(initialMenuActive);

  const handleSetActiveMenu = (menu) => {
    setActiveMenu({
      ...activeMenu,
      [menu]: !activeMenu[menu]
    });
  }

  const generateLogo = () => {
    return (
      <div className={styles.logoSection}>
        <Link 
          to={'/'} 
        >
          <h1>
            <img 
              src={logoSymbol}
              alt="Synthetix Symbol" 
              className={styles.logo} 
            />
            <span>stats</span>
          </h1>
        </Link>
      </div>
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
                <li key={subMenu} className={styles.subNavItem}>
                  <Link 
                    key={subMenu} 
                    to={NAV_MENU[menu][subMenu].route} 
                  >
                    <p className={styles.subNavItemTitle}>{subMenu}</p>
                  </Link>
                </li>
              )
            })}
          </ul>
        )

        const renderSubNavItem = activeMenu[menu]
          ? subNavItem 
          : '';

        const activeNavItemClass = activeMenu[menu] 
          ? 'activeNav'
          : '';

        return (
          <li
            key={menu} 
            className={`${styles.navItem}`}
            onClick={() => handleSetActiveMenu(menu)}
          >
            <p className={`${styles.navItemTitle} ${styles[activeNavItemClass]}`}>{menu}</p>
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
    <header>
      {generateLogo()}
      {generateSearch()}
      {generateNav()}
    </header>
  );
};

export default Header;
