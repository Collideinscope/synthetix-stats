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
  fetchGeneralData: async (endpoint, chain) => {
    try {
      const chainParam = chain ? chain : '';
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
  fetchLatestAPY: async (chain) => API.fetchGeneralData('apy/latest', chain),
  fetchAllAPY: async (chain) => API.fetchGeneralData('apy/all', chain),
  fetchSummaryDataAPY: async (chain) => API.fetchGeneralData('apy/summary', chain),

  /*
    TVL
  */
  fetchLatestTVL: async (chain) => API.fetchGeneralData('tvl/latest', chain),
  fetchAllTVL: async (chain) => API.fetchGeneralData('tvl/all', chain),
  fetchSummaryDataTVL: async (chain) => API.fetchGeneralData('tvl/summary', chain),

  /*
    Core Delegations
  */
  fetchLatestCoreDelegations: async (chain) => API.fetchGeneralData('core-delegations/latest', chain),
  fetchAllCoreDelegations: async (chain) => API.fetchGeneralData('core-delegations/all', chain),
  fetchSummaryDataCoreDelegations: async (chain) => API.fetchGeneralData('core-delegations/summary', chain),

  /*
    Pool Rewards
  */
  fetchLatestPoolRewards: async (chain) => API.fetchGeneralData('pool-rewards/latest', chain),
  fetchAllPoolRewards: async (chain) => API.fetchGeneralData('pool-rewards/all', chain),
  fetchSummaryDataPoolRewards: async (chain) => API.fetchGeneralData('pool-rewards/summary', chain),

  /*
    Core Account Delegations
  */
  fetchStakerCount: async (chain) => API.fetchGeneralData('core-account-delegations/staker-count', chain),
  fetchCumulativeUniqueStakers: async (chain) => API.fetchGeneralData('core-account-delegations/cumulative-unique-stakers', chain),
  fetchAllCoreAccountDelegations: async (chain) => API.fetchGeneralData('core-account-delegations/all', chain),
  fetchCoreAccountDelegationsByAccount: async (accountId) => API.fetchGeneralData(`core-account-delegations/account/${accountId}`),
  fetchCoreAccountDelegationsOrderedByAccount: async (chain) => API.fetchGeneralData('core-account-delegations/ordered-by-account', chain),
  fetchSummaryDataUniqueStakers: async (chain) => API.fetchGeneralData('core-account-delegations/cumulative-unique-stakers/summary', chain),

  /* 
    Perp Stats 
  */
  fetchLatestPerpStats: async (chain) => API.fetchGeneralData('perp-stats/latest', chain),
  fetchAllPerpStats: async (chain) => API.fetchGeneralData('perp-stats/all', chain),
  fetchCumulativeVolume: async (chain) => API.fetchGeneralData('perp-stats/cumulative-volume', chain),
  fetchSummaryDataCumulativeVolume: async (chain) => API.fetchGeneralData('perp-stats/cumulative-volume/summary', chain),
  fetchCumulativeExchangeFees: async (chain) => API.fetchGeneralData('perp-stats/cumulative-exchange-fees', chain),
  fetchSummaryDataCumulativeExchangeFees: async (chain) => API.fetchGeneralData('perp-stats/cumulative-exchange-fees/summary', chain),
  fetchCumulativeCollectedFees: async (chain) => API.fetchGeneralData('perp-stats/cumulative-collected-fees', chain),
  fetchSummaryDataCumulativeCollectedFees: async (chain) => API.fetchGeneralData('perp-stats/cumulative-collected-fees/summary', chain),

  /* Perp Account Stats */
  fetchAllPerpAccountStats: async (chain) => API.fetchGeneralData('perp-account-stats/all', chain),
  fetchCumulativeUniqueTraders: async (chain) => API.fetchGeneralData('perp-account-stats/cumulative-unique-traders', chain),
  fetchSummaryDataCumulativeUniqueTraders: async (chain) => API.fetchGeneralData('perp-account-stats/cumulative-unique-traders/summary', chain),
};

export default API;
