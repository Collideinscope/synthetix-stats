const NAV_MENU = {
  Core: {
    'Overview': {
      route: '/core/overview',
    },
    'APY': {
      route: '/core/apy',
      metricKey: 'allAPY',
    },
    'TVL': {
      route: '/core/tvl',
      metricKey: 'allTVL'
    },
    'Core Delegations': {
      route: '/core/core-delegations',
      metricKey: 'allCoreDelegations',
    },
    'Pool Rewards': {
      route: '/core/pool-rewards',
      metricKey: 'allPoolRewards',
    },
    'Unique Stakers': {
      route: '/core/unique-stakers',
      metricKey: 'uniqueStakers',
    }
  },
  Perps: {
    'Overview': {
      route: '/perps/overview',
    },
    'Volume': {
      route: '/perps/volume',
      metricKey: 'cumulativePerpsVolume',
    },
    'Open Interest': {
      route: '/perps/open-interest',
      metricKey: 'openInterest',
    },
    'Unique Traders': {
      route: '/perps/unique-traders',
      metricKey: 'cumulativeUniqueTraders',
    },
    'Exchange Fees': {
      route: '/perps/exchange-fees',
      metricKey: 'cumulativeExchangeFees',
    },
    'Collected Fees': {
      route: '/perps/collected-fees',
      metricKey: 'cumulativeCollectedFees',
    },
  },
  Stakers: {
    stakersA: {
      route: '',
    },
    stakersB: {
      route: '',
    }
  },
  Traders: {
    tradersA: {
      route: '',
    },
    tradersB: {
      route: '',
    }
  },
}

export {
  NAV_MENU,
}