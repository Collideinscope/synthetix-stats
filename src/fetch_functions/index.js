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
  fetchGeneralData: async (endpoint, network) => {
    try {
      const chainParam = network ? network : '';
      const URL = `${BASE_URL}/${endpoint}/${chainParam}`;

      return fetchData(URL);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  },

  /*
    APY
  */
  fetchLatestAPY: async (network) => API.fetchGeneralData('apy/latest', network),
  fetchAllAPY: async (network) => API.fetchGeneralData('apy/all', network),
  fetchSummaryDataAPY: async (network) => API.fetchGeneralData('apy/summary', network),

  /*
    TVL
  */
  fetchLatestTVL: async (network) => API.fetchGeneralData('tvl/latest', network),
  fetchAllTVL: async (network) => API.fetchGeneralData('tvl/all', network),
  fetchSummaryDataTVL: async (network) => API.fetchGeneralData('tvl/summary', network),

  /*
    Core Delegations
  */
  fetchLatestCoreDelegations: async (network) => API.fetchGeneralData('core-delegations/latest', network),
  fetchAllCoreDelegations: async (network) => API.fetchGeneralData('core-delegations/all', network),
  fetchSummaryDataCoreDelegations: async (network) => API.fetchGeneralData('core-delegations/summary', network),

  /*
    Pool Rewards
  */
  fetchLatestPoolRewards: async (network) => API.fetchGeneralData('pool-rewards/latest', network),
  fetchAllPoolRewards: async (network) => API.fetchGeneralData('pool-rewards/all', network),
  fetchSummaryDataPoolRewards: async (network) => API.fetchGeneralData('pool-rewards/summary', network),

  /*
    Core Account Delegations
  */
  fetchStakerCount: async (network) => API.fetchGeneralData('core-account-delegations/staker-count', network),
  fetchCumulativeUniqueStakers: async (network) => API.fetchGeneralData('core-account-delegations/cumulative-unique-stakers', network),
  fetchAllCoreAccountDelegations: async (network) => API.fetchGeneralData('core-account-delegations/all', network),
  fetchCoreAccountDelegationsByAccount: async (accountId) => API.fetchGeneralData(`core-account-delegations/account/${accountId}`),
  fetchCoreAccountDelegationsOrderedByAccount: async (network) => API.fetchGeneralData('core-account-delegations/ordered-by-account', network),
  fetchSummaryDataUniqueStakers: async (network) => API.fetchGeneralData('core-account-delegations/cumulative-unique-stakers/summary', network),
  fetchDailyUniqueStakers: async (network) => API.fetchGeneralData('core-account-delegations/daily-new-unique-stakers', network),
  fetchSummaryDataDailyUniqueStakers: async (network) => API.fetchGeneralData('core-account-delegations/daily-new-unique-stakers/summary', network),
  
  /* 
    Perp Stats 
  */
  fetchLatestPerpStats: async (network) => API.fetchGeneralData('perp-stats/latest', network),
  fetchAllPerpStats: async (network) => API.fetchGeneralData('perp-stats/all', network),
  fetchCumulativePerpsVolume: async (network) => API.fetchGeneralData('perp-stats/cumulative-volume', network),
  fetchSummaryDataCumulativePerpsVolume: async (network) => API.fetchGeneralData('perp-stats/cumulative-volume/summary', network),
  fetchCumulativeExchangeFees: async (network) => API.fetchGeneralData('perp-stats/cumulative-exchange-fees', network),
  fetchSummaryDataCumulativeExchangeFees: async (network) => API.fetchGeneralData('perp-stats/cumulative-exchange-fees/summary', network),
  fetchCumulativeCollectedFees: async (network) => API.fetchGeneralData('perp-stats/cumulative-collected-fees', network),
  fetchSummaryDataCumulativeCollectedFees: async (network) => API.fetchGeneralData('perp-stats/cumulative-collected-fees/summary', network),

  /* Perp Account Stats */
  fetchAllPerpAccountStats: async (network) => API.fetchGeneralData('perp-account-stats/all', network),
  fetchCumulativeUniqueTraders: async (network) => API.fetchGeneralData('perp-account-stats/cumulative-unique-traders', network),
  fetchSummaryDataCumulativeUniqueTraders: async (network) => API.fetchGeneralData('perp-account-stats/cumulative-unique-traders/summary', network),

  /* Perp Market History */
  fetchOpenInterest: async (network) => API.fetchGeneralData('perp-market-history/open-interest', network),
  fetchSummaryDataOpenInterest: async (network) => API.fetchGeneralData('perp-market-history/open-interest/summary', network),
};

export default API;
