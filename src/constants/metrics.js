import { abbreviateNumber } from "../helpers";

// [state metric key]: { ...metadata }
const METRIC_METADATA = {
  'allAPY': {
    key: 'allAPY',
    category: 'core',
    chartTitle: 'APY',
    defaultChartType: 'area',
    chartType: 'area',
    chartYValueSymbol: '%',
    dataStartDate: '2024-05-01',
    chartYAxisDataKey: 'apy_28d',
    symbolLocation: 'right',
    summaryDataKey: 'summaryDataAPY',
    summaryDataType: '%',
    smoothData: true,
    dataChainFilter: (data, chain) => {
      return data.filter(item => item.chain === chain);
    },
    getYAxisDataPoint: (item) => {
      return item.apys['apy_28d'].year * 100;
    },
    yValueFormatter: (val) => {
      return parseFloat(val).toFixed(2);
    },
  },
  'tvl': {
    key: 'tvl',
    dailyKey: 'dailyTVL',
    hasDailyData: true,
    category: 'core',
    chartTitle: 'TVL',
    defaultChartType: 'bar',
    chartType: 'radial',
    chartYValueSymbol: '$',
    dataStartDate: '2024-01-15',
    chartYAxisDataKey: 'collateral_value',
    dailyChartYAxisDataKey: 'daily_tvl_change',
    symbolLocation: 'left',
    summaryDataKey: 'summaryDataTVL',
    summaryDataDailyKey: 'summaryDataDailyTVL',
    summaryDataType: 'num',
    smoothData: true,
    dataChainFilter: (data, chain) => {
      return data[chain]
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
  'allPoolRewards': {
    key: 'allPoolRewards',
    category: 'core',
    chartTitle: 'Pool Rewards',
    defaultChartType: 'area',
    chartType: 'area',
    chartYValueSymbol: '$',
    dataStartDate: null,
    chartYAxisDataKey: 'cumulative_rewards_usd',
    symbolLocation: 'left',
    summaryDataKey: 'summaryDataPoolRewards',
    smoothData: true,
    dataChainFilter: (data, chain) => {
      return data[chain]
        ? data[chain]
        : [];
    },
    getYAxisDataPoint: (item) => {
      return parseFloat(item.cumulative_rewards_usd);
    },
    yValueFormatter: (val) => {
      return abbreviateNumber(val);
    }
  },
  'allCoreDelegations': {
    key: 'allCoreDelegations',
    category: 'core',
    chartTitle: 'Core Delegations',
    defaultChartType: 'area',
    chartType: 'area',
    chartYValueSymbol: '$',
    dataStartDate: null,
    chartYAxisDataKey: 'amount_delegated',
    symbolLocation: 'left',
    summaryDataKey: 'summaryDataCoreDelegations',
    smoothData: true,
    dataChainFilter: (data, chain) => {
      return data[chain]
        ? data[chain]
        : [];
    },
    getYAxisDataPoint: (item) => {
      return parseFloat(item.amount_delegated);
    },
    yValueFormatter: (val) => {
      return abbreviateNumber(val);
    }
  },
  'uniqueStakers': {
    key: 'uniqueStakers',
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
      return data[chain]
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
      return parseFloat(val).toFixed(0);
    }
  },
  'perpsVolume': {
    key: 'perpsVolume',
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
    dailyChartYAxisDataKey: 'daily_volume',
    symbolLocation: 'left',
    summaryDataKey: 'summaryDataCumulativePerpsVolume',
    summaryDataDailyKey: 'summaryDataDailyPerpsVolume',
    smoothData: false,
    dataChainFilter: (data, chain) => {
      return data[chain]
        ? data[chain]
        : [];
    },
    getYAxisDataPoint: (item) => {
      return parseFloat(item.cumulative_volume);
    },
    getDailyChartYAxisDataPoint: (item) => {
      return parseFloat(item.daily_volume);
    },
    yValueFormatter: (val) => {
      return abbreviateNumber(val);
    }
  },
  'openInterest': {
    key: 'openInterest',
    dailyKey: 'dailyOpenInterest',
    hasDailyData: true,
    category: 'perps',
    chartTitle: 'Open Interest',
    defaultChartType: 'bar',
    chartType: 'area',
    chartYValueSymbol: '$',
    dataStartDate: null,
    chartYAxisDataKey: 'daily_oi',
    // include min, max already available
    dailyChartYAxisDataKey: 'avg_daily_oi',
    symbolLocation: 'left',
    summaryDataKey: 'summaryDataOpenInterest',
    summaryDataDailyKey: 'summaryDataOpenInterest',
    smoothData: false,
    dataChainFilter: (data, chain) => {
      return data[chain]
        ? data[chain]
        : [];
    },
    getYAxisDataPoint: (item) => {
      return parseFloat(item.daily_oi);
    },
    getDailyChartYAxisDataPoint: (item) => {
      return parseFloat(item.avg_daily_oi);
    },
    yValueFormatter: (val) => {
      return abbreviateNumber(val);
    }
  },
  'uniqueTraders': {
    key: 'uniqueTraders',
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
      return data[chain]
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
      return abbreviateNumber(val);
    }
  },
  'collectedFees': {
    key: 'collectedFees',
    dailyKey: 'dailyCollectedFees',
    hasDailyData: true,
    category: 'perps',
    chartTitle: 'Collected Fees',
    defaultChartType: 'bar',
    chartType: 'area',
    chartYValueSymbol: '$',
    dataStartDate: null,
    chartYAxisDataKey: 'cumulative_collected_fees',
    dailyChartYAxisDataKey: 'daily_collected_fees',
    symbolLocation: 'left',
    summaryDataKey: 'summaryDataCumulativeCollectedFees',
    summaryDataDailyKey: 'summaryDataDailyCollectedFees',
    smoothData: false,
    dataChainFilter: (data, chain) => {
      return data[chain]
        ? data[chain]
        : [];
    },
    getYAxisDataPoint: (item) => {
      return parseFloat(item.cumulative_collected_fees);
    },
    getDailyChartYAxisDataPoint: (item) => {
      return parseFloat(item.daily_collected_fees);
    },
    yValueFormatter: (val) => {
      return abbreviateNumber(val);
    },
  },
  'exchangeFees': {
    key: 'exchangeFees',
    dailyKey: 'dailyExchangeFees',
    hasDailyData: true,
    category: 'perps',
    chartTitle: 'Exchange Fees',
    defaultChartType: 'bar',
    chartType: 'area',
    chartYValueSymbol: '$',
    dataStartDate: null,
    chartYAxisDataKey: 'cumulative_exchange_fees',
    dailyChartYAxisDataKey: 'daily_exchange_fees',
    symbolLocation: 'left',
    summaryDataKey: 'summaryDataCumulativeExchangeFees',
    summaryDataDailyKey: 'summaryDataDailyExchangeFees',
    smoothData: false,
    dataChainFilter: (data, chain) => {
      return data[chain]
      ? data[chain]
      : [];
    },
    getYAxisDataPoint: (item) => {
      return parseFloat(item.cumulative_exchange_fees);
    },
    getDailyChartYAxisDataPoint: (item) => {
      return parseFloat(item.daily_exchange_fees);
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