import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './styles.module.css';

import { NAV_MENU } from '../../constants';

const parseActiveMenuFromPath = (path) => {
  for (const [menu, subNav] of Object.entries(NAV_MENU)) {
    for (const subMenu of Object.keys(subNav)) {
      if (NAV_MENU[menu][subMenu].route === path) {
        return { menu, subMenu };
      }
    }
  }
  return null;
};

const Nav = () => {
  const location = useLocation();
  
  const initialMenuActive = Object.keys(NAV_MENU).reduce((acc, menu) => {
    acc[menu] = {
      active: false,
      activeSubNav: null,
    }
    return acc;
  }, {})

  const [activeMenu, setActiveMenu] = useState(initialMenuActive);

  useEffect(() => {
    const active = parseActiveMenuFromPath(location.pathname);
    if (active) {
      setActiveMenu((prevState) => ({
        ...prevState,
        [active.menu]: {
          ...prevState[active.menu],
          active: true,
          activeSubNav: active.subMenu,
        }
      }));
    }
  }, [location.pathname]);

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
