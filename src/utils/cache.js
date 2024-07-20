const setInitialStateWithStorage = () => {
  // set default initial state values
  const defaultState = {
      allAPY: [],
      allTVL: [],
      allCoreDelegations: [],
      allPoolRewards: [],
      allCoreAccountDelegations: [],
      allPerpStats: [],
      allPerpAccountStats: [],
      cumulativeUniqueStakers: {},
      cumulativePerpsVolume: {},
      cumulativeUniqueTraders: {},
      cumulativeExchangeFees: {},
      cumulativeCollectedFees: {},
      openInterest: [],
      summaryDataAPY: {},
      summaryDataTVL: {},
      summaryDataPoolRewards: {},
      summaryDataCoreDelegations: {},
      summaryDataUniqueStakers: {},
      summaryDataPerpsVolume: {},
      summaryDataUniqueTraders: {},
      summaryDataExchangeFees: {},
      summaryDataCollectedFees: {},
      summaryDataOpenInterest: {},
  };

  // try to get data from local storage first and set it
  const initialData = localStorage.getItem('appState');

  if (initialData) {  
    const parsedData = JSON.parse(initialData);
    return { ...defaultState, ...parsedData };
  };

  return defaultState;
};

export default setInitialStateWithStorage;
