import React, { createContext, useReducer, useContext } from 'react';

import { METRIC_METADATA } from '../constants/metrics';

const ChartPageContext = createContext();

const initialState = {
  // chart defaults here from metadata
  charts: {},
  pageFilters: {
    network: 'base',
    pool: '1',
    collateralType: 'USDC'
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_CHARTS':
      return { ...initialState };
    case 'INITIALIZE_CHART':
      return {
        ...state,
        charts: {
          ...state.charts,
          [action.payload.metric]: {
            chartType: action.payload.defaultChartType,
            timeFilter: action.payload.defaultChartType === 'bar' 
              ? 'daily' 
              : action.payload.metric === 'openInterest' || action.payload.metric === 'apy'
               ? 'daily'
               : 'cumulative'
          }
        }
      };
    case 'UPDATE_CHART_SETTINGS':
      return {
        ...state,
        charts: {
          ...state.charts,
          [action.payload.metric]: {
            ...state.charts[action.payload.metric],
            ...action.payload.settings
          }
        }
      };
      case 'UPDATE_PAGE_FILTERS':
        return {
          ...state,
          pageFilters: {
            ...state.pageFilters,
            ...action.payload
          }
        };
      default:
        return state;
  };
}

export const ChartPageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ChartPageContext.Provider value={{ state, dispatch }}>
      {children}
    </ChartPageContext.Provider>
  );
};

export const useChartPage = () => {
  const context = useContext(ChartPageContext);

  if (!context) {
    throw new Error('useChartPage must be used within a ChartPageProvider');
  }
  return context;
};