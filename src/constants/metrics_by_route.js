const metricsByMetric = {
  'apy': [
    'apy',
    'dailyAPY',
    'summaryDataAPY',
    'summaryDataDailyAPY'
  ],
  
}

const metricsByRoute = {
  // Root route (Highlights)
  '/': [
    'apy',
    'summaryData'
  ]

  // Core routes
  '/core/overview': ['apy', 'tvl', 'coreDelegations', 'poolRewards', 'uniqueStakers'],
  '/core/apy': ['apy'],
  '/core/tvl': ['tvl'],
  '/core/core-delegations': ['coreDelegations'],
  '/core/pool-rewards': ['poolRewards'],
  '/core/unique-stakers': ['uniqueStakers'],

  // Perps routes
  '/perps/overview': ['perpsVolume', 'openInterest', 'uniqueTraders', 'exchangeFees'],
  '/perps/volume': ['perpsVolume'],
  '/perps/open-interest': ['openInterest'],
  '/perps/unique-traders': ['uniqueTraders'],
  '/perps/exchange-fees': ['exchangeFees'],

  // Stakers routes (placeholder)
  '/stakers/overview': ['uniqueStakers'],

  // Traders routes (placeholder)
  '/traders/overview': ['uniqueTraders'],

  // Add more routes as needed
};

// Additional metrics that might be needed globally or for multiple routes
const globalMetrics = [
  'summaryDataUniqueStakers',
  'dailyUniqueStakers',
  'summaryDataDailyUniqueStakers',
  'summaryDataUniqueTraders',
  'dailyUniqueTraders',
  'summaryDataDailyUniqueTraders',
  'summaryDataCumulativePerpsVolume',
  'dailyPerpsVolume',
  'summaryDataDailyPerpsVolume',
  'summaryDataOpenInterest',
  'dailyOpenInterest',
  'dailyAPY',
  'dailyTVL',
  'dailyPoolRewards',
  'dailyCoreDelegations',
  'allPerpStats',
  'allPerpAccountStats',
  'summaryDataAPY',
  'summaryDataDailyAPY',
  'summaryDataTVL',
  'summaryDataDailyTVL',
  'summaryDataPoolRewards',
  'summaryDataDailyPoolRewards',
  'summaryDataCoreDelegations',
  'summaryDataDailyCoreDelegations',
  'summaryDataCumulativeExchangeFees',
  'dailyExchangeFees',
  'summaryDataDailyExchangeFees',
];

// Function to get metrics for a route
const getMetricsForRoute = (route) => {
  const routeMetrics = metricsByRoute[route] || [];
  return [...new Set([...routeMetrics, ...globalMetrics])];
};

export { metricsByRoute, getMetricsForRoute };