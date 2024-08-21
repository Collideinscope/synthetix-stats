import localforage from 'localforage';

// Configure localforage
localforage.config({
    name: 'initialStats',
    storeName: 'appState'
})

export const getCachedData = async () => {
  const cachedData = localforage.getItem('appState');
  const cachedTimestamp = localforage.getItem('appStateTimestamp');
  const currentTime = new Date().getTime();
  const oneHour = 60 * 60 * 1000; 

  if (cachedData && cachedTimestamp && (currentTime - parseInt(cachedTimestamp) < oneHour)) {
    return JSON.parse(cachedData);
  }
  return null;
};

export const setCachedData = async (data) => {
  try {
    await localforage.setItem('appState', data);
    await localforage.setItem('appStateTimestamp', new Date().getTime());
  } catch (error) {
      console.error('Error caching data:', error);
  }
};

export const getInitialState = async () => {
  const defaultState = {
    uniqueStakers: {},
    summaryDataDailyUniqueStakers: {},
    dailyUniqueStakers: {},
    summaryDataUniqueStakers: {},
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
    uniqueTraders: {},
    dailyUniqueTraders: {},
    perpsVolume: {},
    dailyPerpsVolume: {},
    exchangeFees: {},
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
    summaryDataPerpsVolume: {},
    summaryDataUniqueTraders: {},
    summaryDataExchangeFees: {},
    summaryDataOpenInterest: {},
    summaryDataDailyUniqueTraders: {},
    summaryDataDailyPerpsVolume: {},
    summaryDataDailyExchangeFees: {},
  };

  try {
    const cachedData = await getCachedData();

    return cachedData ? { ...defaultState, ...cachedData } : defaultState;
  } catch (error) {
      console.error('Error getting initial state:', error);
      return defaultState;
  }
};
