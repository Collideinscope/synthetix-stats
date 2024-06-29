import setInitialStateWithStorage from "../utils/cache";


// start initial state from cache if exiests
export const globalInitialState = setInitialStateWithStorage();

export const globalReducer = (state = globalInitialState, action) => {
  switch (action.type) {
   
    default:
      return state;
  }
};