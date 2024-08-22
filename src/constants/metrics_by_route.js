import metrics_by_key from './metrics_by_key';
import HIGHLIGHT_METRICS from './highlights_metrics';

const metricsByRoute = {

  // index
  '/': Object.keys(HIGHLIGHT_METRICS),

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
};

const getMetricsForRoute = (route) => {
  const baseMetrics = metricsByRoute[route] || [];

  return baseMetrics.flatMap(metric => metrics_by_key[metric] || []);
};

export { metricsByRoute, getMetricsForRoute };