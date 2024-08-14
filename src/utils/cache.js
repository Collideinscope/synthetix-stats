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
    apy: [],
    dailyAPY: {},
    tvl: [],
    dailyTVL: {},
    coreDelegations: [],
    dailyCoreDelegations: {},
    poolRewards: [],
    dailyPoolRewards: {},
    allCoreAccountDelegations: [],
    allPerpStats: [],
    allPerpAccountStats: [],
    uniqueStakers: {},
    dailyUniqueStakers: {},
    uniqueTraders: {},
    dailyUniqueTraders: {},
    perpsVolume: {},
    dailyPerpsVolume: {},
    exchangeFees: {},
    collectedFees: {},
    dailyCollectedFees: {},
    dailyExchangeFees: {},
    openInterest: {},
    dailyOpenInterest: {},
    summaryDataAPY: {},
    summaryDataDailyAPY: {},
    summaryDataTVL: {},
    summaryDataDailyTVL: {},
    summaryDataPoolRewards: {},
    summaryDataDailyPoolRewards: {},
    summaryDataCoreDelegations: {},
    summaryDataDailyCoreDelegations: {},
    summaryDataUniqueStakers: {},
    summaryDataPerpsVolume: {},
    summaryDataUniqueTraders: {},
    summaryDataExchangeFees: {},
    summaryDataCollectedFees: {},
    summaryDataOpenInterest: {},
    summaryDataDailyUniqueStakers: {},
    summaryDataDailyUniqueTraders: {},
    summaryDataDailyPerpsVolume: {},
    summaryDataDailyCollectedFees: {},
    summaryDataDailyExchangeFees: {},
  };

  const cachedData = getCachedData();
  return cachedData ? { ...defaultState, ...cachedData } : defaultState;
};
