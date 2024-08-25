const metrics_by_key = {
  'uniqueStakers': [
    'cumulativeUniqueStakers',
    'summaryDataUniqueStakers',
    'dailyUniqueStakers'
  ],
  'uniqueTraders': [
    'cumulativeUniqueTraders',
    'summaryDataUniqueTraders',
    'dailyUniqueTraders'
  ],
  'perpsVolume': [
    'cumulativePerpsVolume',
    'summaryDataCumulativePerpsVolume',
    'dailyPerpsVolume'
  ],
  'openInterest': [
    'openInterest',
    'summaryDataOpenInterest',
    'dailyChangeOpenInterest'
  ],
  'apy': [
    'allAPY',
    'summaryDataAPY',
    'dailyAPY'
  ],
  'tvl': [
    'latestTVL',
    'cumulativeTVL',
    'summaryDataTVL',
    'dailyTVL'
  ],
  'poolRewards': [
    'latestPoolRewards',
    'cumulativePoolRewards',
    'summaryDataPoolRewards',
    'dailyPoolRewards'
  ],
  'coreDelegations': [
    'latestCoreDelegations',
    'cumulativeCoreDelegations',
    'summaryDataCoreDelegations',
    'dailyCoreDelegations'
  ],
  'exchangeFees': [
    'cumulativeExchangeFees',
    'summaryDataCumulativeExchangeFees',
    'dailyExchangeFees'
  ],
};

export default metrics_by_key;