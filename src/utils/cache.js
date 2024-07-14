// caching in localStorage
const setInitialStateWithStorage = () => {
  // set default initial state values
  const defaultState = {
      latestAPY: [],
      allAPY: [],
      summaryDataAPY: {},
      latestTVL: [],
      allTVL: [],
      latestCoreDelegations: [],
      allCoreDelegations: [],
      latestPoolRewards: [],
      allPoolRewards: [],
      cumulativeUniqueStakers: {},
      allCoreAccountDelegations: [],
      coreAccountDelegationsByAccount: [],
      coreAccountDelegationsOrderedByAccount: [],
  };

  // try to get data from local storage first and set it
  const initialData = localStorage.getItem('');

  if (initialData) {  
    const parsedData = JSON.parse(initialData);
      return { ...defaultState, ...parsedData };
  };

  return defaultState;
};

export default setInitialStateWithStorage;