// caching in localStorage
const setInitialStateWithStorage = () => {
  // set default initial state values
  const defaultState = {

  };

  // try to get data from local storage first and set it
  const initialData = localStorage.getItem();

  if (initialData) {  
    const parsedData = JSON.parse(initialData);
      return { ...defaultState, ...parsedData };
  };

  return defaultState;
};

export default setInitialStateWithStorage;