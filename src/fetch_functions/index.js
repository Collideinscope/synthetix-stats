const BASE_URL = process.env.REACT_APP_API_BASE_URL;
console.log(BASE_URL)
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
    APY
  */
  fetchLatestAPY: async (chain) => {
    try {
      const chainParam = chain ? chain : '';
      const URL = `${BASE_URL}/apy/latest/${chainParam}`;
      return fetchData(URL);
    } catch (error) {
      console.error('Error fetching latest APY:', error);
      throw error;
    }
  },

  fetchAllAPY: async (chain) => {
    try {
      const chainParam = chain ? chain : '';
      const URL = `${BASE_URL}/apy/all/${chainParam}`;
      return fetchData(URL);
    } catch (error) {
      console.error('Error fetching all APY:', error);
      throw error;
    }
  },

  fetchSummaryDataAPY: async (chain) => {
    try {
      const chainParam = chain ? chain : '';
      const URL = `${BASE_URL}/apy/summary/${chainParam}`;
      console.log(URL)
      return fetchData(URL);
    } catch (error) {
      console.error('Error fetching summary APY:', error);
      throw error;
    }
  },

  /*
    TVL
  */
  fetchLatestTVL: async (chain) => {
    try {
      const chainParam = chain ? chain : '';
      const URL = `${BASE_URL}/tvl/latest/${chainParam}`;
      return fetchData(URL);
    } catch (error) {
      console.error('Error fetching latest TVL:', error);
      throw error;
    }
  },

  fetchAllTVL: async (chain) => {
    try {
      const chainParam = chain ? chain : '';
      const URL = `${BASE_URL}/tvl/all/${chainParam}`;
      return fetchData(URL);
    } catch (error) {
      console.error('Error fetching all TVL:', error);
      throw error;
    }
  },

  fetchSummaryDataTVL: async (chain) => {
    try {
      const chainParam = chain ? chain : '';
      const URL = `${BASE_URL}/tvl/summary/${chainParam}`;
      return fetchData(URL);
    } catch (error) {
      console.error('Error fetching summary TVL:', error);
      throw error;
    }
  },

  /*
    Core Delegations
  */
  fetchLatestCoreDelegations: async (chain) => {
    try {
      const chainParam = chain ? chain : '';
      const URL = `${BASE_URL}/core-delegations/latest/${chainParam}`;
      return fetchData(URL);
    } catch (error) {
      console.error('Error fetching latest core delegations:', error);
      throw error;
    }
  },

  fetchAllCoreDelegations: async (chain) => {
    try {
      const chainParam = chain ? chain : '';
      const URL = `${BASE_URL}/core-delegations/all/${chainParam}`;
      return fetchData(URL);
    } catch (error) {
      console.error('Error fetching all core delegations:', error);
      throw error;
    }
  },

  /*
    Pool Rewards
  */
  fetchLatestPoolRewards: async (chain) => {
    try {
      const chainParam = chain ? chain : '';
      const URL = `${BASE_URL}/pool-rewards/latest/${chainParam}`;
      return fetchData(URL);
    } catch (error) {
      console.error('Error fetching latest pool rewards:', error);
      throw error;
    }
  },

  fetchAllPoolRewards: async (chain) => {
    try {
      const chainParam = chain ? chain : '';
      const URL = `${BASE_URL}/pool-rewards/all/${chainParam}`;
      return fetchData(URL);
    } catch (error) {
      console.error('Error fetching all pool rewards:', error);
      throw error;
    }
  },

  /*
    Core Account Delegations
  */
  fetchStakerCount: async (chain) => {
    try {
      const chainParam = chain ? chain : '';
      const URL = `${BASE_URL}/core-account-delegations/staker-count/${chainParam}`;
      return fetchData(URL);
    } catch (error) {
      console.error('Error fetching staker count:', error);
      throw error;
    }
  },

  fetchCumulativeUniqueStakers: async (chain) => {
    try {
      const chainParam = chain ? chain : '';
      const URL = `${BASE_URL}/core-account-delegations/cumulative-unique-stakers/${chainParam}`;

      return fetchData(URL);
    } catch (error) {
      console.error('Error fetching cumulative unique stakers:', error);
      throw error;
    }
  },

  fetchAllCoreAccountDelegations: async (chain) => {
    try {
      const chainParam = chain ? chain : '';
      const URL = `${BASE_URL}/core-account-delegations/all/${chainParam}`;
      return fetchData(URL);
    } catch (error) {
      console.error('Error fetching all core account delegations:', error);
      throw error;
    }
  },

  fetchCoreAccountDelegationsByAccount: async (accountId) => {
    try {
      const URL = `${BASE_URL}/core-account-delegations/account/${accountId}`;
      return fetchData(URL);
    } catch (error) {
      console.error('Error fetching core account delegations by account:', error);
      throw error;
    }
  },

  fetchCoreAccountDelegationsOrderedByAccount: async (chain) => {
    try {
      const chainParam = chain ? chain : '';
      const URL = `${BASE_URL}/core-account-delegations/ordered-by-account/${chainParam}`;
      return fetchData(URL);
    } catch (error) {
      console.error('Error fetching core account delegations ordered by account:', error);
      throw error;
    }
  },
};

export default API;
