import styles from './styles.module.css';

import React, { useState, useEffect, useReducer, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import { globalReducer, globalInitialState } from '../../reducers/globalReducer';
import { GlobalContext } from '../../context/GlobalContext';
import { ChartPageProvider } from '../../context/ChartPageContext';
import useInitialDataFetch from '../../hooks/useInitialDataFetch';

import Header from '../Header';
import Footer from '../Footer';
import HighlightsContainer from '../HighlightsContainer';
import ChartPageContainer from '../ChartPageContainer';
import LoadingBar from '../LoadingBar';

import { NAV_MENU } from '../../constants';

const App = () => {
  const [state, appDispatch] = useReducer(globalReducer, globalInitialState);
  const navRef = useRef(null);
  const footerRef = useRef(null);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  
  // fetch all iniital data
  useInitialDataFetch(appDispatch, setIsLoading, location.pathname);

  useEffect(() => {
    const handleIntersection = ([entry]) => {
      if (navRef.current) {
        if (entry.isIntersecting) {
          navRef.current.style.position = 'absolute';
          navRef.current.style.top = '64px';
        } else {
          navRef.current.style.position = 'fixed';
          navRef.current.style.top = '64px';
          navRef.current.style.bottom = 'initial';
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0,
    });

    const handleResize = () => {
      if (window.innerWidth > 991) {
        if (footerRef.current) {
          observer.observe(footerRef.current);
        }
      } else {
        observer.disconnect();
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  const generateRoutes = () => {
    const routes = [
      <Route 
        key="/" 
        exact 
        path="/" 
        element={
          <ChartPageProvider>
            <HighlightsContainer />
          </ChartPageProvider>
        } 
      />,
    ];

    Object.entries(NAV_MENU).forEach(([category, items]) => {
      Object.entries(items).forEach(([itemName, itemData]) => {
        const { route, metricKey } = itemData;

        if (route) {
          routes.push(
            <Route
              key={route}
              path={route}
              element={
                <ChartPageProvider>
                  <ChartPageContainer 
                    category={itemName === 'Overview' ? category.toLowerCase() : null}
                    metric={metricKey}
                  />
                </ChartPageProvider>
              }
            />
          );
        }
      });
    });

    return routes;
  };

  return (
      <GlobalContext.Provider value={{ state, appDispatch }}>
        <div className={styles['app-container']}>
          <div className={styles.contentWrapper}>
            <Header navRef={navRef} />
            <LoadingBar isLoading={isLoading} />
            <main>
              <Routes>
                {generateRoutes()}
              </Routes>
            </main>
          </div>
          <Footer footerRef={footerRef} />
        </div>
      </GlobalContext.Provider>
  );
};

export default App;
