import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.css';

import logoSymbol from '../../assets/blue-x.svg'; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import Nav from '../Nav';

const Header = () => {

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
      <Nav />
    </header>
  );
};

export default Header;
