import setInitialStateWithStorage from "../utils/cache";

// start initial state from cache if exists
export const globalInitialState = setInitialStateWithStorage();

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
