import styles from './styles.module.css';

import React, { useEffect, useReducer, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { globalReducer, globalInitialState } from '../../reducers/globalReducer';
import { GlobalContext } from '../../context/GlobalContext';

import Header from '../Header';
import Footer from '../Footer';
import HighlightsContainer from '../HighlightsContainer';
import AggregatedDataContainer from '../AggregatedDataContainer';
import IndividualMetricContainer from '../IndividualMetricContainer';

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
            allTVL,
            allPoolRewards,
            allCoreDelegations,
            allPerpStats,
            allPerpAccountStats,
            uniqueStakers,
            cumulativeUniqueTraders,
            cumulativePerpsVolume,
            cumulativeExchangeFees,
            cumulativeCollectedFees,
            openInterest,
            summaryDataAPY,
            summaryDataTVL,
            summaryDataPoolRewards,
            summaryDataCoreDelegations,
            summaryDataUniqueStakers,
            summaryDataUniqueTraders,
            summaryDataCumulativePerpsVolume,
            summaryDataCumulativeExchangeFees,
            summaryDataCumulativeCollectedFees,
            summaryDataOpenInterest,
            dailyUniqueStakers,
            summaryDataDailyUniqueStakers,
          ] = await Promise.all([
            API.fetchAllAPY(),
            API.fetchAllTVL(),
            API.fetchAllPoolRewards('base'),
            API.fetchAllCoreDelegations(),
            API.fetchAllPerpStats('base'),
            API.fetchAllPerpAccountStats('base'),
            API.fetchCumulativeUniqueStakers(),
            API.fetchCumulativeUniqueTraders('base'),
            API.fetchCumulativePerpsVolume('base'),
            API.fetchCumulativeExchangeFees('base'),
            API.fetchCumulativeCollectedFees('base'),
            API.fetchOpenInterest('base'),
            API.fetchSummaryDataAPY('base'),
            API.fetchSummaryDataTVL('base'),
            API.fetchSummaryDataPoolRewards('base'),
            API.fetchSummaryDataCoreDelegations('base'),
            API.fetchSummaryDataUniqueStakers('base'),
            API.fetchSummaryDataCumulativeUniqueTraders('base'),
            API.fetchSummaryDataCumulativePerpsVolume('base'),
            API.fetchSummaryDataCumulativeExchangeFees('base'),
            API.fetchSummaryDataCumulativeCollectedFees('base'),
            API.fetchSummaryDataOpenInterest('base'),
            API.fetchDailyUniqueStakers('base'),
            API.fetchSummaryDataDailyUniqueStakers('base'),
          ]);

          const newData = {
            allAPY,
            allTVL,
            allPoolRewards,
            allCoreDelegations,
            allPerpStats,
            allPerpAccountStats,
            uniqueStakers,
            cumulativeUniqueTraders,
            cumulativePerpsVolume,
            cumulativeExchangeFees,
            cumulativeCollectedFees,
            openInterest,
            summaryDataAPY,
            summaryDataTVL,
            summaryDataPoolRewards,
            summaryDataCoreDelegations,
            summaryDataUniqueStakers,
            summaryDataUniqueTraders,
            summaryDataCumulativePerpsVolume,
            summaryDataCumulativeExchangeFees,
            summaryDataCumulativeCollectedFees,
            summaryDataOpenInterest,
            dailyUniqueStakers,
            summaryDataDailyUniqueStakers,
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


  const generateMetricRoutes = () => {
    const routes = [];

    Object.entries(NAV_MENU).forEach(([category, items]) => {
      Object.entries(items).forEach(([itemName, itemData]) => {
        const {route, metricKey} = itemData;

        if (metricKey && route) {
          routes.push(
            <Route 
              exact
              key={route}
              path={route} 
              element={
                <IndividualMetricContainer 
                  filters={[]}
                  category={false}
                  metric={metricKey}
                />
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
                <Route exact path="/" element={<HighlightsContainer />} />
                <Route exact path="/core/overview" element={<AggregatedDataContainer category="core" />} />
                <Route exact path="/perps/overview" element={<AggregatedDataContainer category="perps" />} />
                {generateMetricRoutes()}
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
