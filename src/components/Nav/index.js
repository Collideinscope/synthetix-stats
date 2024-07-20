import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.css';

import { NAV_MENU } from '../../constants';

const Nav = () => {
  const initialMenuActive = Object.keys(NAV_MENU).reduce((acc, menu) => {
    acc[menu] = {
      active: false,
      activeSubNav: null,
    }

    return acc;
  }, {})

  const [activeMenu, setActiveMenu] = useState(initialMenuActive);

  const handleSetActiveMenu = (menu) => {
    setActiveMenu({
      ...activeMenu,
      [menu]: {
        ...activeMenu[menu],
        active: !activeMenu[menu].active,
      }
    });
  }

  const handleSetActiveSubMenu = (menu, subMenu) => {
    const newActiveSubNav = Object
      .entries(activeMenu)
      .reduce((acc, [key, obj]) => {
        acc[key] = {
          ...obj,
          activeSubNav: menu === key ? subMenu : null,
        };

        return acc;
      }, {});

    setActiveMenu(newActiveSubNav);
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
              const activeSubNav = 
                subMenu === activeMenu[menu].activeSubNav
                ? 'activeSubNav'
                : '';
              console.log(subMenu, activeSubNav)
              return (
                <li 
                  key={subMenu} 
                  className={`${styles.subNavItem} ${styles[activeSubNav]}`}
                  onClick={() => handleSetActiveSubMenu(menu, subMenu)}
                >
                  <Link 
                    className={styles.subNavItemLink}
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

        const renderSubNavItem = activeMenu[menu].active
          ? subNavItem 
          : '';

        const activeNavItemClass = activeMenu[menu].active 
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