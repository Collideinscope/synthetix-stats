import { getInitialState } from "../utils/cache";

export const globalInitialState = getInitialState();

export const globalReducer = (state = globalInitialState, action) => {
  switch (action.type) {
    case 'SET_INITIAL_DATA':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};