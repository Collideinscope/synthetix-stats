import styles from './styles.module.css';

import React, { useEffect, useReducer, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { globalReducer, globalInitialState } from '../../reducers/globalReducer';
import { GlobalContext } from '../../context/GlobalContext';
import { ChartPageProvider } from '../../context/ChartPageContext';

import Header from '../Header';
import Footer from '../Footer';
import HighlightsContainer from '../HighlightsContainer';
import ChartPageContainer from '../ChartPageContainer';

import { getCachedData, setCachedData } from '../../utils/cache';

import API from '../../fetch_functions';
import { NAV_MENU } from '../../constants';

const App = () => {
  const [state, appDispatch] = useReducer(globalReducer, globalInitialState);
  const navRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = getCachedData();

        if (cachedData) {
          appDispatch({ type: 'SET_INITIAL_DATA', payload: cachedData });
        } else {
          const [
            allAPY,
            tvl,
            dailyTVL,
            poolRewards,
            dailyPoolRewards,
            coreDelegations,
            dailyCoreDelegations,
            allPerpStats,
            allPerpAccountStats,
            uniqueStakers,
            uniqueTraders,
            perpsVolume,
            exchangeFees,
            collectedFees,
            openInterest,
            dailyOpenInterest,
            summaryDataAPY,
            summaryDataTVL,
            summaryDataDailyTVL,
            summaryDataPoolRewards,
            summaryDataDailyPoolRewards,
            summaryDataCoreDelegations,
            summaryDataDailyCoreDelegations,
            summaryDataUniqueStakers,
            summaryDataUniqueTraders,
            summaryDataCumulativePerpsVolume,
            summaryDataCumulativeExchangeFees,
            summaryDataCumulativeCollectedFees,
            summaryDataOpenInterest,
            dailyUniqueStakers,
            summaryDataDailyUniqueStakers,
            dailyUniqueTraders,
            summaryDataDailyUniqueTraders,
            dailyPerpsVolume,
            dailyCollectedFees,
            dailyExchangeFees,
            summaryDataDailyPerpsVolume,
            summaryDataDailyCollectedFees,
            summaryDataDailyExchangeFees,
          ] = await Promise.all([
            API.fetchAllAPY(),
            API.fetchAllTVL(),
            API.fetchDailyTVL('base'),
            API.fetchAllPoolRewards('base'),
            API.fetchDailyPoolRewards('base'),
            API.fetchAllCoreDelegations(),
            API.fetchDailyCoreDelegations('base'),
            API.fetchAllPerpStats('base'),
            API.fetchAllPerpAccountStats('base'),
            API.fetchCumulativeUniqueStakers(),
            API.fetchCumulativeUniqueTraders('base'),
            API.fetchCumulativePerpsVolume('base'),
            API.fetchCumulativeExchangeFees('base'),
            API.fetchCumulativeCollectedFees('base'),
            API.fetchOpenInterest('base'),
            API.fetchDailyOpenInterest('base'),
            API.fetchSummaryDataAPY('base'),
            API.fetchSummaryDataTVL('base'),
            API.fetchSummaryDataDailyTVL('base'),
            API.fetchSummaryDataPoolRewards('base'),
            API.fetchSummaryDataDailyPoolRewards('base'),
            API.fetchSummaryDataCoreDelegations('base'),
            API.fetchSummaryDataDailyCoreDelegations('base'),
            API.fetchSummaryDataUniqueStakers('base'),
            API.fetchSummaryDataCumulativeUniqueTraders('base'),
            API.fetchSummaryDataCumulativePerpsVolume('base'),
            API.fetchSummaryDataCumulativeExchangeFees('base'),
            API.fetchSummaryDataCumulativeCollectedFees('base'),
            API.fetchSummaryDataOpenInterest('base'),
            API.fetchDailyUniqueStakers('base'),
            API.fetchSummaryDataDailyUniqueStakers('base'),
            API.fetchDailyUniqueTraders('base'),
            API.fetchSummaryDataDailyUniqueTraders('base'),
            API.fetchDailyPerpsVolume('base'),
            API.fetchDailyCollectedFees('base'),
            API.fetchDailyExchangeFees('base'),
            API.fetchSummaryDataDailyPerpsVolume('base'),
            API.fetchSummaryDataDailyExchangeFees('base'),
            API.fetchSummaryDataDailyCollectedFees('base'),
          ]);

          const newData = {
            allAPY,
            tvl,
            dailyTVL,
            poolRewards,
            dailyPoolRewards,
            coreDelegations,
            dailyCoreDelegations,
            allPerpStats,
            allPerpAccountStats,
            uniqueStakers,
            uniqueTraders,
            perpsVolume,
            exchangeFees,
            collectedFees,
            openInterest,
            dailyOpenInterest,
            summaryDataAPY,
            summaryDataTVL,
            summaryDataDailyTVL,
            summaryDataPoolRewards,
            summaryDataDailyPoolRewards,
            summaryDataCoreDelegations,
            summaryDataDailyCoreDelegations,
            summaryDataUniqueStakers,
            summaryDataUniqueTraders,
            summaryDataCumulativePerpsVolume,
            summaryDataCumulativeExchangeFees,
            summaryDataCumulativeCollectedFees,
            summaryDataOpenInterest,
            dailyUniqueStakers,
            summaryDataDailyUniqueStakers,
            dailyUniqueTraders,
            summaryDataDailyUniqueTraders,
            dailyPerpsVolume,
            dailyCollectedFees,
            dailyExchangeFees,
            summaryDataDailyPerpsVolume,
            summaryDataDailyCollectedFees,
            summaryDataDailyExchangeFees,
          };

          appDispatch({ type: 'SET_INITIAL_DATA', payload: newData });
          //setCachedData(newData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
    <Router>
      <GlobalContext.Provider value={{ state, appDispatch }}>
        <div className={styles['app-container']}>
          <div className={styles.contentWrapper}>
            <Header navRef={navRef} />
            <main>
              <Routes>
                {generateRoutes()}
              </Routes>
            </main>
          </div>
          <Footer footerRef={footerRef} />
        </div>
      </GlobalContext.Provider>
    </Router>
  );
};

export default App;
