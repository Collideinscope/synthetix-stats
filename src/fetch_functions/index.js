const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const handleFetchResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
  }
  return response.json();
};

const fetchData = async (URL) => {
  const res = await fetch(URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  return handleFetchResponse(res);
};

const API = {
  /*
    Generalized Fetcher
  */
  fetchGeneralData: async (endpoint, network, collateralType) => {
    try {
      const networkParam = network ? network : '';
      const collateralTypeParam = collateralType ? '/'+collateralType : '';
      const URL = `${BASE_URL}/${endpoint}/${networkParam}${collateralTypeParam}`;

      return fetchData(URL);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  },

  /*
    APY
  */
  fetchLatestAPY: async (network, collateralType) => API.fetchGeneralData('apy/latest', network, collateralType),
  fetchAllAPY: async (network, collateralType) => API.fetchGeneralData('apy/all', network, collateralType),
  fetchSummaryDataAPY: async (network, collateralType) => API.fetchGeneralData('apy/summary', network, collateralType),
  fetchDailyAPY: async (network, collateralType) => API.fetchGeneralData('apy/daily', network, collateralType),
  fetchSummaryDataDailyAPY: async (network, collateralType) => API.fetchGeneralData('apy/daily/summary', network, collateralType),

  /*
    TVL
  */
  fetchLatestTVL: async (network) => API.fetchGeneralData('tvl/latest', network),
  fetchAllTVL: async (network) => API.fetchGeneralData('tvl/all', network),
  fetchSummaryDataTVL: async (network) => API.fetchGeneralData('tvl/summary', network),
  fetchDailyTVL: async (network) => API.fetchGeneralData('tvl/daily', network),
  fetchSummaryDataDailyTVL: async (network) => API.fetchGeneralData('tvl/daily/summary', network),

  /*
    Core Delegations
  */
  fetchLatestCoreDelegations: async (network) => API.fetchGeneralData('core-delegations/latest', network),
  fetchAllCoreDelegations: async (network) => API.fetchGeneralData('core-delegations/all', network),
  fetchSummaryDataCoreDelegations: async (network) => API.fetchGeneralData('core-delegations/summary', network),
  fetchDailyCoreDelegations: async (network) => API.fetchGeneralData('core-delegations/daily', network),
  fetchSummaryDataDailyCoreDelegations: async (network) => API.fetchGeneralData('core-delegations/daily/summary', network),

  /*
    Pool Rewards
  */
  fetchLatestPoolRewards: async (network) => API.fetchGeneralData('pool-rewards/latest', network),
  fetchAllPoolRewards: async (network) => API.fetchGeneralData('pool-rewards/all', network),
  fetchSummaryDataPoolRewards: async (network) => API.fetchGeneralData('pool-rewards/summary', network),
  fetchDailyPoolRewards: async (network) => API.fetchGeneralData('pool-rewards/daily', network),
  fetchSummaryDataDailyPoolRewards: async (network) => API.fetchGeneralData('pool-rewards/daily/summary', network),

  /*
    Core Account Delegations
  */
  fetchStakerCount: async (network, collateralType) => API.fetchGeneralData('core-account-delegations/staker-count', network, collateralType),
  fetchCumulativeUniqueStakers: async (network, collateralType) => API.fetchGeneralData('core-account-delegations/cumulative-unique-stakers', network, collateralType),
  fetchAllCoreAccountDelegations: async (network, collateralType) => API.fetchGeneralData('core-account-delegations/all', network, collateralType),
  fetchCoreAccountDelegationsByAccount: async (accountId) => API.fetchGeneralData(`core-account-delegations/account/${accountId}`),
  fetchCoreAccountDelegationsOrderedByAccount: async (network, collateralType) => API.fetchGeneralData('core-account-delegations/ordered-by-account', network, collateralType),
  fetchSummaryDataUniqueStakers: async (network, collateralType) => API.fetchGeneralData('core-account-delegations/cumulative-unique-stakers/summary', network, collateralType),
  fetchDailyUniqueStakers: async (network, collateralType) => API.fetchGeneralData('core-account-delegations/daily-new-unique-stakers', network, collateralType),
  fetchSummaryDataDailyUniqueStakers: async (network, collateralType) => API.fetchGeneralData('core-account-delegations/daily-new-unique-stakers/summary', network, collateralType),
  
  /* 
    Perp Stats 
  */
  fetchLatestPerpStats: async (network) => API.fetchGeneralData('perp-stats/latest', network),
  fetchAllPerpStats: async (network) => API.fetchGeneralData('perp-stats/all', network),
  fetchCumulativePerpsVolume: async (network) => API.fetchGeneralData('perp-stats/cumulative-volume', network),
  fetchSummaryDataCumulativePerpsVolume: async (network) => API.fetchGeneralData('perp-stats/cumulative-volume/summary', network),
  fetchCumulativeExchangeFees: async (network) => API.fetchGeneralData('perp-stats/cumulative-exchange-fees', network),
  fetchSummaryDataCumulativeExchangeFees: async (network) => API.fetchGeneralData('perp-stats/cumulative-exchange-fees/summary', network),
  fetchDailyPerpsVolume: async (network) => API.fetchGeneralData('perp-stats/daily-volume', network),
  fetchDailyExchangeFees: async (network) => API.fetchGeneralData('perp-stats/daily-exchange-fees', network),
  fetchSummaryDataDailyPerpsVolume: async (network) => API.fetchGeneralData('perp-stats/daily-volume/summary', network),
  fetchSummaryDataDailyExchangeFees: async (network) => API.fetchGeneralData('perp-stats/daily-exchange-fees/summary', network),

  /* Perp Account Stats */
  fetchAllPerpAccountStats: async (network) => API.fetchGeneralData('perp-account-stats/all', network),
  fetchCumulativeUniqueTraders: async (network) => API.fetchGeneralData('perp-account-stats/cumulative-unique-traders', network),
  fetchSummaryDataCumulativeUniqueTraders: async (network) => API.fetchGeneralData('perp-account-stats/cumulative-unique-traders/summary', network),
  fetchDailyUniqueTraders: async (network) => API.fetchGeneralData('perp-account-stats/daily-new-unique-traders', network),
  fetchSummaryDataDailyUniqueTraders: async (network) => API.fetchGeneralData('perp-account-stats/daily-new-unique-traders/summary', network),
  
  /* Perp Market History */
  fetchOpenInterest: async (network) => API.fetchGeneralData('perp-market-history/open-interest/daily-avg', network),
  fetchSummaryDataOpenInterest: async (network) => API.fetchGeneralData('perp-market-history/open-interest/daily-avg/summary', network),
  fetchDailyOpenInterest: async (network) => API.fetchGeneralData('perp-market-history/open-interest/daily-stats', network),
};

export default API;
