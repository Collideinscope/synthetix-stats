import { abbreviateNumber } from "../helpers";

// [state metric lineKey]: { ...metadata }
const METRIC_METADATA = {
  'apy': {
    lineKey: 'allAPY',
    dailyKey: 'dailyAPY',
    hasDailyData: true,
    category: 'core',
    chartTitle: 'APY',
    defaultChartType: 'area',
    chartType: 'area',
    chartYValueSymbol: '%',
    dataStartDate: '2024-05-01',
    chartYAxisDataKey: 'apy_28d',
    dailyChartYAxisDataKey: 'daily_apy_percentage_delta',
    symbolLocation: 'right',
    summaryDataKey: 'summaryDataAPY',
    summaryDataDailyKey: 'summaryDataAPY',
    summaryDataType: '%',
    smoothData: true,
    dataChainFilter: (data, chain) => {
      return data && data[chain]
        ? data[chain]
        : [];
    },
    getYAxisDataPoint: (item) => {
      return item.apys['apy_28d'].year * 100;
    },
    getDailyChartYAxisDataPoint: (item) => {
      return parseFloat(item.daily_apy_percentage_delta) * 100;
    },
    yValueFormatter: (val) => {
      return abbreviateNumber(parseFloat(val));
    },
  },
  'tvl': {
    lineKey: 'cumulativeTVL',
    dailyKey: 'dailyTVL',
    hasDailyData: true,
    category: 'core',
    chartTitle: 'TVL',
    defaultChartType: 'area',
    chartType: 'radial',
    chartYValueSymbol: '$',
    dataStartDate: '2024-03-26',
    chartYAxisDataKey: 'collateral_value',
    dailyChartYAxisDataKey: 'daily_tvl_change',
    symbolLocation: 'left',
    summaryDataKey: 'summaryDataTVL',
    summaryDataDailyKey: 'summaryDataDailyTVL',
    summaryDataType: 'num',
    smoothData: true,
    dataChainFilter: (data, chain) => {
      return data && data[chain]
        ? data[chain]
        : [];
    },
    getYAxisDataPoint: (item) => {
      return parseFloat(item.collateral_value);
    },
    getDailyChartYAxisDataPoint: (item) => {
      return parseFloat(item.daily_tvl_change);
    },
    yValueFormatter: (val) => {
      return abbreviateNumber(val);
    },
  },
  'poolRewards': {
    lineKey: 'cumulativePoolRewards',
    dailyKey: 'dailyPoolRewards',
    hasDailyData: true,
    category: 'core',
    chartTitle: 'Pool Rewards',
    defaultChartType: 'bar',
    chartType: 'area',
    chartYValueSymbol: '$',
    dataStartDate: null,
    chartYAxisDataKey: 'cumulative_rewards_usd',
    dailyChartYAxisDataKey: 'daily_rewards',
    symbolLocation: 'left',
    summaryDataKey: 'summaryDataPoolRewards',
    summaryDataDailyKey: 'summaryDataDailyPoolRewards',
    summaryDataType: 'num',
    smoothData: true,
    dataChainFilter: (data, chain) => {
      return data && data[chain]
        ? data[chain]
        : [];
    },
    getYAxisDataPoint: (item) => {
      return parseFloat(item.cumulative_rewards_usd);
    },
    getDailyChartYAxisDataPoint: (item) => {
      return parseFloat(item.daily_rewards);
    },
    yValueFormatter: (val) => {
      return abbreviateNumber(val);
    }
  },
  'coreDelegations': {
    lineKey: 'cumulativeCoreDelegations',
    dailyKey: 'dailyCoreDelegations',
    hasDailyData: true,
    category: 'core',
    chartTitle: 'Core Delegations',
    defaultChartType: 'bar',
    chartType: 'area',
    chartYValueSymbol: '$',
    dataStartDate: '2024-03-25',
    chartYAxisDataKey: 'amount_delegated',
    dailyChartYAxisDataKey: 'daily_delegations_change',
    symbolLocation: 'left',
    summaryDataKey: 'summaryDataCoreDelegations',
    summaryDataDailyKey: 'summaryDataDailyCoreDelegations',
    smoothData: true,
    dataChainFilter: (data, chain) => {
      return data && data[chain]
        ? data[chain]
        : [];
    },
    getYAxisDataPoint: (item) => {
      return parseFloat(item.amount_delegated);
    },
    getDailyChartYAxisDataPoint: (item) => {
      return parseFloat(item.daily_delegations_change);
    },
    yValueFormatter: (val) => {
      return abbreviateNumber(val);
    }
  },
  'uniqueStakers': {
    lineKey: 'cumulativeUniqueStakers',
    dailyKey: 'dailyUniqueStakers',
    hasDailyData: true,
    defaultChartType: 'bar',
    category: 'core',
    chartTitle: 'Unique Stakers',
    chartType: 'area',
    chartYValueSymbol: '',
    dataStartDate: null,
    chartYAxisDataKey: 'cumulative_staker_count',
    dailyChartYAxisDataKey: 'daily_new_unique_stakers',
    symbolLocation: 'left',
    summaryDataKey: 'summaryDataUniqueStakers',
    summaryDataDailyKey: 'summaryDataDailyUniqueStakers',
    smoothData: false,
    dataChainFilter: (data, chain) => {
      return data && data[chain]
        ? data[chain]
        : [];
    },
    getYAxisDataPoint: (item) => {
      return parseFloat(item.cumulative_staker_count);
    },
    getDailyChartYAxisDataPoint: (item) => {
      return parseFloat(item.daily_new_unique_stakers);
    },
    yValueFormatter: (val) => {
      return abbreviateNumber(val, 0);
    }
  },
  'perpsVolume': {
    lineKey: 'cumulativePerpsVolume',
    dailyKey: 'dailyPerpsVolume',
    // modify to timeFilter later
    hasDailyData: true,
    category: 'perps',
    chartTitle: 'Perps Volume',
    defaultChartType: 'bar',
    chartType: 'area',
    chartYValueSymbol: '$',
    dataStartDate: null,
    chartYAxisDataKey: 'cumulative_volume',
    dailyChartYAxisDataKey: 'daily_cumulative_volume',
    symbolLocation: 'left',
    summaryDataKey: 'summaryDataCumulativePerpsVolume',
    summaryDataDailyKey: 'summaryDataDailyPerpsVolume',
    smoothData: false,
    dataChainFilter: (data, chain) => {
      return data && data[chain]
        ? data[chain]
        : [];
    },
    getYAxisDataPoint: (item) => {
      return parseFloat(item.cumulative_volume);
    },
    getDailyChartYAxisDataPoint: (item) => {
      return parseFloat(item.daily_cumulative_volume);
    },
    yValueFormatter: (val) => {
      return abbreviateNumber(val);
    }
  },
  'openInterest': {
    lineKey: 'openInterest',
    dailyKey: 'dailyChangeOpenInterest',
    hasDailyData: true,
    category: 'perps',
    chartTitle: 'Open Interest',
    defaultChartType: 'area',
    chartType: 'area',
    chartYValueSymbol: '$',
    dataStartDate: '2024-02-03',
    chartYAxisDataKey: 'daily_oi',
    // include min, max already available
    dailyChartYAxisDataKey: 'daily_oi_change',
    symbolLocation: 'left',
    summaryDataKey: 'summaryDataOpenInterest',
    summaryDataDailyKey: 'summaryDataOpenInterest',
    smoothData: false,
    dataChainFilter: (data, chain) => {
      return data && data[chain]
        ? data[chain]
        : [];
    },
    getYAxisDataPoint: (item) => {
      return parseFloat(item.daily_oi);
    },
    getDailyChartYAxisDataPoint: (item) => {
      return parseFloat(item.daily_oi_change);
    },
    yValueFormatter: (val) => {
      return abbreviateNumber(val);
    }
  },
  'uniqueTraders': {
    lineKey: 'cumulativeUniqueTraders',
    dailyKey: 'dailyUniqueTraders',
    hasDailyData: true,
    category: 'perps',
    chartTitle: 'Unique Traders',
    defaultChartType: 'bar',
    chartType: 'area',
    chartYValueSymbol: '',
    dataStartDate: null,
    chartYAxisDataKey: 'cumulative_trader_count',
    dailyChartYAxisDataKey: 'daily_new_unique_traders',
    symbolLocation: 'left',
    summaryDataKey: 'summaryDataUniqueTraders',
    summaryDataDailyKey: 'summaryDataDailyUniqueTraders',
    smoothData: false,
    dataChainFilter: (data, chain) => {
      return data && data[chain]
        ? data[chain]
        : [];
    },
    getYAxisDataPoint: (item) => {
      return parseFloat(item.cumulative_trader_count);
    },
    getDailyChartYAxisDataPoint: (item) => {
      return parseFloat(item.daily_new_unique_traders);
    },
    yValueFormatter: (val) => {
      return abbreviateNumber(val, 0);
    }
  },
  'exchangeFees': {
    lineKey: 'cumulativeExchangeFees',
    dailyKey: 'dailyExchangeFees',
    hasDailyData: true,
    category: 'perps',
    chartTitle: 'Exchange Fees',
    defaultChartType: 'bar',
    chartType: 'area',
    chartYValueSymbol: '$',
    dataStartDate: null,
    chartYAxisDataKey: 'cumulative_exchange_fees',
    dailyChartYAxisDataKey: 'daily_cumulative_exchange_fees',
    symbolLocation: 'left',
    summaryDataKey: 'summaryDataCumulativeExchangeFees',
    summaryDataDailyKey: 'summaryDataDailyExchangeFees',
    smoothData: false,
    dataChainFilter: (data, chain) => {
      return data && data[chain]
      ? data[chain]
      : [];
    },
    getYAxisDataPoint: (item) => {
      return parseFloat(item.cumulative_exchange_fees);
    },
    getDailyChartYAxisDataPoint: (item) => {
      return parseFloat(item.daily_cumulative_exchange_fees);
    },
    yValueFormatter: (val) => {
      return abbreviateNumber(val);
    }
  },
}

const METRIC_OPTIONS_METADATA = {
  chains: {

  },
  pools: {

  },
  collateralTypes: {

  }
}

export {
  METRIC_METADATA,
  METRIC_OPTIONS_METADATA,
}