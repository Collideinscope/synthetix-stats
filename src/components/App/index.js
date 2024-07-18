import styles from './styles.module.css';

import React, { useState, useEffect, useReducer } from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Routes,
  Navigate,
} from 'react-router-dom';

import { globalReducer, globalInitialState } from '../../reducers/globalReducer';
import { GlobalContext } from '../../context/GlobalContext';

import Header from '../Header';
import HighlightsContainer from '../HighlightsContainer';
import AggregatedDataContainer from '../AggregatedDataContainer';

import API from '../../fetch_functions';

const App = () => {

  const [state, appDispatch] = useReducer(globalReducer, globalInitialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          allAPY,
          allTVL,
          allPoolRewards,
          allCoreDelegations,
          allPerpStats,
          allPerpAccountStats,
          cumulativeUniqueStakers,
          cumulativeUniqueTraders,
          summaryDataAPY,
          summaryDataTVL,
          summaryDataPoolRewards,
          summaryDataCoreDelegations,
          summaryDataUniqueStakers,
          summaryDataPerpStats,
          summaryDataUniqueTraders,
          summaryDataCumulativeExchangeFees,
          summaryDataCumulativeCollectedFees,
        ] = await Promise.all([
          API.fetchAllAPY(),
          API.fetchAllTVL(),
          API.fetchAllPoolRewards('base'),
          API.fetchAllCoreDelegations(),
          API.fetchAllPerpStats('base'),
          API.fetchAllPerpAccountStats('base'),
          API.fetchSummaryDataUniqueStakers('base'),
          API.fetchSummaryDataUniqueTraders('base'),
          API.fetchSummaryDataAPY('base'),
          API.fetchSummaryDataTVL('base'),
          API.fetchSummaryDataPoolRewards('base'),
          API.fetchSummaryDataCoreDelegations('base'),
          API.fetchCumulativeUniqueStakers(),
          API.fetchSummaryDataPerpStats('base'),
          API.fetchSummaryDataUniqueTraders('base'),
          API.fetchSummaryDataCumulativeExchangeFees('base'),
          API.fetchSummaryDataCumulativeCollectedFees('base'),
        ]);

        appDispatch({
          type: 'SET_INITIAL_DATA',
          payload: {
            allAPY,
            allTVL,
            allPoolRewards,
            allCoreDelegations,
            allPerpStats,
            allPerpAccountStats,
            cumulativeUniqueStakers,
            cumulativeUniqueTraders,
            summaryDataAPY,
            summaryDataTVL,
            summaryDataPoolRewards,
            summaryDataCoreDelegations,
            summaryDataUniqueStakers,
            summaryDataPerpStats,
            summaryDataUniqueTraders,
            summaryDataCumulativeExchangeFees,
            summaryDataCumulativeCollectedFees,
          },
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <GlobalContext.Provider value={{ state, appDispatch }}>
        <div 
          className={styles['app-container']}
        >
          <Header />
          <main>
            <Routes>
              <Route exact path="/" element={<HighlightsContainer />} />
              <Route exact path="/core/overview" element={
                <AggregatedDataContainer 
                  category={'core'}
                />} 
              />
              <Route exact path="/perps/overview" element={
                <AggregatedDataContainer 
                  category={'perps'}
                />} 
              />
            </Routes>
          </main>
        </div>
      </GlobalContext.Provider>
    </Router>
  );
}

export default App;
