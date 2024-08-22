import { getInitialState } from "../utils/cache";

export const globalInitialState = getInitialState();

export const globalReducer = (state = globalInitialState, action) => {
  switch (action.type) {
    case 'SET_INITIAL_DATA':
      console.log('initial', action.payload)
      
      return {
        ...state,
        ...action.payload,
      };
    case 'SET_PAGE_DATA':
      console.log('page', action.payload)

      return {
        ...state,
        ...action.payload,
      };
    case 'SET_ALL_REMAINING_DATA':
      console.log('remaining', action.payload)

      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};