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
          summaryDataAPY,
          allTVL,
          allPoolRewards,
          allCoreDelegations,
          cumulativeUniqueStakers,
        ] = await Promise.all([
          API.fetchAllAPY(),
          API.fetchSummaryDataAPY('base'),
          API.fetchAllTVL(),
          API.fetchAllPoolRewards(),
          API.fetchAllCoreDelegations(),
          API.fetchCumulativeUniqueStakers(),
        ]);

        appDispatch({
          type: 'SET_INITIAL_DATA',
          payload: {
            allAPY,
            summaryDataAPY,
            allTVL,
            allPoolRewards,
            allCoreDelegations,
            cumulativeUniqueStakers,
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
                  dataType={'core'}
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
