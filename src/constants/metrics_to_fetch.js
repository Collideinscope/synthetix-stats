import API from '../fetch_functions/';

const collateralType = '0xC74eA762cF06c9151cE074E6a569a5945b6302E7';
const chain = 'base'; // Default chain

const metricToFetchFunction = {
  // Unique Stakers
  cumulativeUniqueStakers: () => API.fetchCumulativeUniqueStakers(chain, collateralType),
  summaryDataUniqueStakers: () => API.fetchSummaryDataUniqueStakers(chain, collateralType),
  dailyUniqueStakers: () => API.fetchDailyUniqueStakers(chain, collateralType),

  // Unique Traders
  cumulativeUniqueTraders: () => API.fetchCumulativeUniqueTraders(chain),
  summaryDataUniqueTraders: () => API.fetchSummaryDataCumulativeUniqueTraders(chain),
  dailyUniqueTraders: () => API.fetchDailyUniqueTraders(chain),

  // Perps Volume
  cumulativePerpsVolume: () => API.fetchCumulativePerpsVolume(chain),
  summaryDataCumulativePerpsVolume: () => API.fetchSummaryDataCumulativePerpsVolume(chain),
  dailyPerpsVolume: () => API.fetchDailyPerpsVolume(chain),

  // Open Interest
  openInterest: () => API.fetchOpenInterest(chain),
  summaryDataOpenInterest: () => API.fetchSummaryDataOpenInterest(chain),
  dailyChangeOpenInterest: () => API.fetchDailyChangeOpenInterest(chain),

  // APY
  allAPY: () => API.fetchAllAPY(chain, collateralType),
  summaryDataAPY: () => API.fetchSummaryDataAPY(chain, collateralType),
  dailyAPY: () => API.fetchDailyAPY(chain, collateralType),

  // TVL
  latestTVL: () => API.fetchLatestTVL(chain, collateralType),
  cumulativeTVL: () => API.fetchCumulativeTVL(chain, collateralType),
  summaryDataTVL: () => API.fetchSummaryDataTVL(chain, collateralType),
  dailyTVL: () => API.fetchDailyTVL(chain, collateralType),

  // Pool Rewards
  latestPoolRewards: () => API.fetchLatestPoolRewards(chain, collateralType),
  cumulativePoolRewards: () => API.fetchCumulativePoolRewards(chain, collateralType),
  summaryDataPoolRewards: () => API.fetchSummaryDataPoolRewards(chain, collateralType),
  dailyPoolRewards: () => API.fetchDailyPoolRewards(chain, collateralType),

  // Core Delegations
  latestCoreDelegations: () => API.fetchLatestCoreDelegations(chain, collateralType),
  cumulativeCoreDelegations: () => API.fetchAllCoreDelegations(chain, collateralType),
  summaryDataCoreDelegations: () => API.fetchSummaryDataCoreDelegations(chain, collateralType),
  dailyCoreDelegations: () => API.fetchDailyCoreDelegations(chain, collateralType),

  // Exchange Fees
  cumulativeExchangeFees: () => API.fetchCumulativeExchangeFees(chain),
  summaryDataCumulativeExchangeFees: () => API.fetchSummaryDataCumulativeExchangeFees(chain),
  dailyExchangeFees: () => API.fetchDailyExchangeFees(chain),
};

export default metricToFetchFunction;