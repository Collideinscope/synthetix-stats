import styles from './styles.module.css';

import React, { useState, useEffect, useRef, useReducer } from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Routes,
  Navigate,
} from 'react-router-dom';

import { globalReducer, globalInitialState } from '../reducers/globalReducer';
import { GlobalContext } from '../context/GlobalContext';

import Header from './Header';

const App = () => {

  const [state, appDispatch] = useReducer(globalReducer, globalInitialState);

  const topRef = useRef(null);

  useEffect(() => {

  }, []);

  return (
    <Router>
      <GlobalContext.Provider value={{ state, appDispatch }}>
        <div 
          className={styles['app-container']}
        >
          <Header ref={topRef} />
          <main>
            <Routes>
              <Route exact path="/" element={< />} />
            </Routes>
          </main>
        </div>
      </GlobalContext.Provider>
    </Router>
  );
}

export default App;
