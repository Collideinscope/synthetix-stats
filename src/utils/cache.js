export const getCachedData = () => {
  const cachedData = localStorage.getItem('appState');
  const cachedTimestamp = localStorage.getItem('appStateTimestamp');
  const currentTime = new Date().getTime();
  const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

  if (cachedData && cachedTimestamp && (currentTime - parseInt(cachedTimestamp) < oneHour)) {
    return JSON.parse(cachedData);
  }
  return null;
};

export const setCachedData = (data) => {
  localStorage.setItem('appState', JSON.stringify(data));
  localStorage.setItem('appStateTimestamp', new Date().getTime().toString());
};

export const getInitialState = () => {
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

  const cachedData = getCachedData();
  return cachedData ? { ...defaultState, ...cachedData } : defaultState;
};
