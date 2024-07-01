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
import PrimaryViewContainer from '../PrimaryViewContainer';

const App = () => {

  const [state, appDispatch] = useReducer(globalReducer, globalInitialState);

  useEffect(() => {

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
            </Routes>
          </main>
        </div>
      </GlobalContext.Provider>
    </Router>
  );
}

export default App;
