const NAV_MENU = {
  Core: {
    'Overview': {
      route: '/core/overview',
      metricKey: null,
    },
    'APY': {
      route: '/core/apy',
      metricKey: 'apy',
    },
    'TVL': {
      route: '/core/tvl',
      metricKey: 'tvl'
    },
    'Core Delegations': {
      route: '/core/core-delegations',
      metricKey: 'coreDelegations',
    },
    'Pool Rewards': {
      route: '/core/pool-rewards',
      metricKey: 'poolRewards',
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
      metricKey: 'perpsVolume',
    },
    'Open Interest': {
      route: '/perps/open-interest',
      metricKey: 'openInterest',
    },
    'Unique Traders': {
      route: '/perps/unique-traders',
      metricKey: 'uniqueTraders',
    },
    'Exchange Fees': {
      route: '/perps/exchange-fees',
      metricKey: 'exchangeFees',
    },
  },
}

export {
  NAV_MENU,
}