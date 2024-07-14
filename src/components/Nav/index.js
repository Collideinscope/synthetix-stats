import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.css';

import { NAV_MENU } from '../../constants';

const Nav = () => {
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
          >
            <p 
              className={`${styles.navItemTitle} ${styles[activeNavItemClass]}`}
              onClick={() => handleSetActiveMenu(menu)}
            >
              {menu}
            </p>
            {renderSubNavItem}
          </li>
        )
      })

    return (
      <ul className={styles.navList}>
        {navMenuItems}
      </ul>
    );
  };

  return (
    <nav className={styles.nav}>
      {generateNav()}
    </nav>
  )
}

export default Nav;