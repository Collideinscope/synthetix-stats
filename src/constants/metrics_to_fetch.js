import API from '../fetch_functions/';

const metricToFetchFunction = {
  // Unique Stakers
  cumulativeUniqueStakers: () => API.fetchCumulativeUniqueStakers('base', '0xC74eA762cF06c9151cE074E6a569a5945b6302E7'),
  summaryDataUniqueStakers: () => API.fetchSummaryDataUniqueStakers('base', '0xC74eA762cF06c9151cE074E6a569a5945b6302E7'),
  dailyUniqueStakers: () => API.fetchDailyUniqueStakers('base', '0xC74eA762cF06c9151cE074E6a569a5945b6302E7'),

  // Unique Traders
  cumulativeUniqueTraders: () => API.fetchCumulativeUniqueTraders('base'),
  summaryDataUniqueTraders: () => API.fetchSummaryDataCumulativeUniqueTraders('base'),
  dailyUniqueTraders: () => API.fetchDailyUniqueTraders('base'),

  // Perps Volume
  cumulativePerpsVolume: () => API.fetchCumulativePerpsVolume('base'),
  summaryDataCumulativePerpsVolume: () => API.fetchSummaryDataCumulativePerpsVolume('base'),
  dailyPerpsVolume: () => API.fetchDailyPerpsVolume('base'),

  // Open Interest
  openInterest: () => API.fetchOpenInterest('base'),
  summaryDataOpenInterest: () => API.fetchSummaryDataOpenInterest('base'),
  dailyChangeOpenInterest: () => API.fetchDailyChangeOpenInterest('base'),

  // APY
  allAPY: () => API.fetchAllAPY('base', '0xc74ea762cf06c9151ce074e6a569a5945b6302e7'),
  summaryDataAPY: () => API.fetchSummaryDataAPY('base', '0xc74ea762cf06c9151ce074e6a569a5945b6302e7'),
  dailyAPY: () => API.fetchDailyAPY('base', '0xc74ea762cf06c9151ce074e6a569a5945b6302e7'),

  // TVL
  latestTVL: () => API.fetchLatestTVL('base'),
  cumulativeTVL: () => API.fetchCumulativeTVL('base'),
  summaryDataTVL: () => API.fetchSummaryDataTVL('base'),
  dailyTVL: () => API.fetchDailyTVL('base'),

  // Pool Rewards
  latestPoolRewards: () => API.fetchLatestPoolRewards('base'),
  cumulativePoolRewards: () => API.fetchCumulativePoolRewards('base'),
  summaryDataPoolRewards: () => API.fetchSummaryDataPoolRewards('base'),
  dailyPoolRewards: () => API.fetchDailyPoolRewards('base'),

  // Core Delegations
  latestCoreDelegations: () => API.fetchLatestCoreDelegations('base'),
  cumulativeCoreDelegations: () => API.fetchAllCoreDelegations('base'),
  summaryDataCoreDelegations: () => API.fetchSummaryDataCoreDelegations('base'),
  dailyCoreDelegations: () => API.fetchDailyCoreDelegations('base'),

  // Exchange Fees
  cumulativeExchangeFees: () => API.fetchCumulativeExchangeFees('base'),
  summaryDataCumulativeExchangeFees: () => API.fetchSummaryDataCumulativeExchangeFees('base'),
  dailyExchangeFees: () => API.fetchDailyExchangeFees('base'),
};

export default metricToFetchFunction;