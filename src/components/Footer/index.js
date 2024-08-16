import styles from './styles.module.css';

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import blue_x from '../../assets/blue-x.svg';

import FOOTER_MENU from '../../constants/footer';

const Footer = ({ footerRef }) => {
  const [openMenus, setOpenMenus] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderLink = (route, children) => {
    const isExternal = route.startsWith('http');
    
    return isExternal ? (
      <a href={route} target="_blank" rel="noopener noreferrer">{children}</a>
    ) : (
      <Link to={route}>{children}</Link>
    );
  };

  const toggleMenu = (category) => {
    if (isMobile) {
      setOpenMenus(prev => ({ ...prev, [category]: !prev[category] }));
    }
  };

  const generateFooterLinks = () => {
    return Object.entries(FOOTER_MENU).map(([category, items]) => {
      const isOpen = isMobile ? openMenus[category] : true;
      const openMenuClass = isOpen ? styles.mobileDropdownOpen : styles.mobileDropdownClosed;
      const openFooter = isOpen ? styles.openFooter : '';

      return (
        <div key={category} className={`${styles.footerColumn}`}>
          <h3
            onClick={() => toggleMenu(category)}
            className={`${styles.mobileDropdownToggle} ${openFooter}`}
          >
            {category}
            {isMobile && (
              <FontAwesomeIcon
                icon={isOpen ? faAngleUp : faAngleDown}
                className={styles.dropdownCaret}
              />
            )}
          </h3>
          <ul className={isMobile ? openMenuClass : ''}>
            {items.map(({ label, route }) => (
              <li key={label}>
                {renderLink(route, label)}
              </li>
            ))}
          </ul>
        </div>
      );
    });
  };

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLinks}>
          {generateFooterLinks()}
        </div>
        <div className={styles.footerSocial}>
          <div className={styles.footerLogo}>
            <img src={blue_x} alt="Synthetix Logo" />
          </div>
          <div className={styles.footerSocialLinks}>
            <a href="https://discord.com/invite/synthetix">
              <FontAwesomeIcon className={styles.socialIcon} icon={faDiscord} />
            </a>
            <a href="https://x.com/synthetix_io">
              <FontAwesomeIcon className={styles.socialIcon} icon={faTwitter} />
            </a>
            <a href="https://github.com/Synthetixio/">
              <FontAwesomeIcon className={styles.socialIcon} icon={faGithub} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;