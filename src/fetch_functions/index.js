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
  fetchGeneralData: async (endpoint, queryParams = null) => {
    try {
      const entries = Object.entries(queryParams || {});
      const queryParamsString = entries.length
        ? '?' + entries.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&')
        : '';

      const URL = `${BASE_URL}${endpoint}${queryParamsString}`;
      
      return fetchData(URL);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  },

  // APY
  fetchLatestAPY: async (network, collateralType) => API.fetchGeneralData('apy/latest', { chain: network, collateralType }),
  fetchAllAPY: async (network, collateralType) => API.fetchGeneralData('apy/all', { chain: network, collateralType }),
  fetchSummaryDataAPY: async (network, collateralType) => API.fetchGeneralData('apy/summary', { chain: network, collateralType }),
  fetchDailyAPY: async (network, collateralType) => API.fetchGeneralData('apy/daily', { chain: network, collateralType }),

  // TVL
  fetchLatestTVL: async (network, collateralType) => API.fetchGeneralData('tvl/latest', { chain: network, collateralType }),
  fetchCumulativeTVL: async (network, collateralType) => API.fetchGeneralData('tvl/cumulative', { chain: network, collateralType }),
  fetchSummaryDataTVL: async (network, collateralType) => API.fetchGeneralData('tvl/summary', { chain: network, collateralType }),
  fetchDailyTVL: async (network, collateralType) => API.fetchGeneralData('tvl/daily', { chain: network, collateralType }),

  // Core Delegations
  fetchLatestCoreDelegations: async (network, collateralType) => API.fetchGeneralData('core-delegations/latest', { chain: network, collateralType }),
  fetchAllCoreDelegations: async (network, collateralType) => API.fetchGeneralData('core-delegations/cumulative', { chain: network, collateralType }),
  fetchSummaryDataCoreDelegations: async (network, collateralType) => API.fetchGeneralData('core-delegations/summary', { chain: network, collateralType }),
  fetchDailyCoreDelegations: async (network, collateralType) => API.fetchGeneralData('core-delegations/daily', { chain: network, collateralType }),

  // Pool Rewards
  fetchLatestPoolRewards: async (network, collateralType) => API.fetchGeneralData('pool-rewards/latest', { chain: network, collateralType }),
  fetchCumulativePoolRewards: async (network, collateralType) => API.fetchGeneralData('pool-rewards/cumulative', { chain: network, collateralType }),
  fetchSummaryDataPoolRewards: async (network, collateralType) => API.fetchGeneralData('pool-rewards/summary', { chain: network, collateralType }),
  fetchDailyPoolRewards: async (network, collateralType) => API.fetchGeneralData('pool-rewards/daily', { chain: network, collateralType }),

  // Core Account Delegations (Unique Stakers)
  fetchCumulativeUniqueStakers: async (network, collateralType) => API.fetchGeneralData('core-account-delegations/stakers/cumulative', { chain: network, collateralType }),
  fetchSummaryDataUniqueStakers: async (network, collateralType) => API.fetchGeneralData('core-account-delegations/stakers/summary', { chain: network, collateralType }),
  fetchDailyUniqueStakers: async (network, collateralType) => API.fetchGeneralData('core-account-delegations/stakers/daily', { chain: network, collateralType }),

  // Perp Stats
  fetchLatestPerpStats: async (network) => API.fetchGeneralData('perp-stats/latest', { chain: network }),
  fetchCumulativePerpsVolume: async (network) => API.fetchGeneralData('perp-stats/volume/cumulative', { chain: network }),
  fetchSummaryDataCumulativePerpsVolume: async (network) => API.fetchGeneralData('perp-stats/volume/summary', { chain: network }),
  fetchDailyPerpsVolume: async (network) => API.fetchGeneralData('perp-stats/volume/daily', { chain: network }),
  fetchCumulativeExchangeFees: async (network) => API.fetchGeneralData('perp-stats/exchange-fees/cumulative', { chain: network }),
  fetchSummaryDataCumulativeExchangeFees: async (network) => API.fetchGeneralData('perp-stats/exchange-fees/summary', { chain: network }),
  fetchDailyExchangeFees: async (network) => API.fetchGeneralData('perp-stats/exchange-fees/daily', { chain: network }),

  // Perp Account Stats (Unique Traders)
  fetchCumulativeUniqueTraders: async (network) => API.fetchGeneralData('perp-account-stats/traders/cumulative', { chain: network }),
  fetchSummaryDataCumulativeUniqueTraders: async (network) => API.fetchGeneralData('perp-account-stats/traders/summary', { chain: network }),
  fetchDailyUniqueTraders: async (network) => API.fetchGeneralData('perp-account-stats/traders/daily', { chain: network }),

  // Perp Market History (Open Interest)
  fetchOpenInterest: async (network) => API.fetchGeneralData('perp-market-history/open-interest/daily', { chain: network }),
  fetchSummaryDataOpenInterest: async (network) => API.fetchGeneralData('perp-market-history/open-interest/daily/summary', { chain: network }),
  fetchDailyChangeOpenInterest: async (network) => API.fetchGeneralData('perp-market-history/open-interest/daily-change', { chain: network }),
};

export default API;