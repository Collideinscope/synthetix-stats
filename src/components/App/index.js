import styles from './styles.module.css';

import React, { useEffect, useReducer } from 'react';
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
            cumulativeUniqueStakers,
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
          ]);

          const newData = {
            allAPY,
            allTVL,
            allPoolRewards,
            allCoreDelegations,
            allPerpStats,
            allPerpAccountStats,
            cumulativeUniqueStakers,
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
            <Header />
            <main>
              <Routes>
                <Route exact path="/" element={<HighlightsContainer />} />
                <Route exact path="/core/overview" element={<AggregatedDataContainer category="core" />} />
                <Route exact path="/perps/overview" element={<AggregatedDataContainer category="perps" />} />
                {generateMetricRoutes()}
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </GlobalContext.Provider>
    </Router>
  );
};

export default App;
