import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.css';

import synthetix_stats from '../../assets/synthetix_stats.svg'; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';

import Nav from '../Nav';

const Header = () => {

  const [navOpen, setNavOpen] = useState(false);

  const handleNavOpen = () => {
    setNavOpen(!navOpen);
  }

  const generateLogo = () => {
    return (
      <div className={styles.logoSection}>
        <Link 
          to={'/'} 
        >
          <h1>
            <img 
              src={synthetix_stats}
              alt="Synthetix Symbol" 
              className={styles.logo} 
            />
          </h1>
        </Link>
      </div>
    );
  };

  const generateSearch = () => {
    return (
      <section className={styles.searchContainer}>
        <FontAwesomeIcon className={styles['fa-magnifying-glass']} icon={faMagnifyingGlass} />
      </section>
    );
  }

  const generateNavIcon = () => {
    const navIcon = navOpen 
      ? 'X' 
      : <FontAwesomeIcon 
          className={styles['fa-bars']} 
          icon={faBars} 
        />;
    
    return (
      <section className={styles.navIconSection}>
        <span 
          className={styles.navIcon}
          onClick={handleNavOpen}
        >
          {navIcon}
        </span>
      </section>
    )
  }

  return (
    <header>
      {generateLogo()}
      {generateSearch()}
      <Nav navOpen={navOpen} />
      {generateNavIcon()}
    </header>
  );
};

export default Header;
