import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

import logoSymbol from '../../assets/blue-x.svg'; 

const Header = () => {
  
  const generateLogo = () => {
    return (
      <h1>
        <img 
          src={logoSymbol}
          alt="Synthetix Logo" 
          className={styles.logo} 
        />
      </h1>
    )
  }

  const generateNav = () => {
    return (
      <nav>
        nav
      </nav>
    )
  }

  const generateSearch = () => {
    return (
      <section className={styles['search-container']}>
        search
      </section>
    )
  }

  return (
    <header>
      {generateLogo()}
      {generateNav()}
      {generateSearch()}
    </header>
  );
};

export default Header;
