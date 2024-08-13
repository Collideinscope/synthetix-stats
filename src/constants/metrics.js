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
  'allTVL': {
    key: 'allTVL',
    category: 'core',
    chartTitle: 'TVL',
    defaultChartType: 'area',
    chartType: 'radial',
    chartYValueSymbol: '$',
    dataStartDate: null,
    chartYAxisDataKey: 'collateral_value',
    symbolLocation: 'left',
    summaryDataKey: 'summaryDataTVL',
    summaryDataType: 'num',
    smoothData: true,
    dataChainFilter: (data, chain) => {
      return data.filter(item => item.chain === chain);
    },
    getYAxisDataPoint: (item) => {
      return parseFloat(item.collateral_value);
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
      return data
        .filter(item => item.chain === chain)
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
      return data.filter(item => item.chain === chain);
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
    category: 'perps',
    chartTitle: 'Open Interest',
    defaultChartType: 'area',
    chartType: 'area',
    chartYValueSymbol: '$',
    dataStartDate: null,
    chartYAxisDataKey: 'daily_oi',
    symbolLocation: 'left',
    summaryDataKey: 'summaryDataOpenInterest',
    smoothData: false,
    dataChainFilter: (data, chain) => {
      return data.filter(item => item.chain === chain);
    },
    getYAxisDataPoint: (item) => {
      return parseFloat(item.daily_oi);
    },
    yValueFormatter: (val) => {
      return abbreviateNumber(val);
    }
  },
  'cumulativeUniqueTraders': {
    key: 'cumulativeUniqueTraders',
    category: 'perps',
    chartTitle: 'Unique Traders',
    defaultChartType: 'area',
    chartType: 'area',
    chartYValueSymbol: '',
    dataStartDate: null,
    chartYAxisDataKey: 'cumulative_trader_count',
    symbolLocation: 'left',
    summaryDataKey: 'summaryDataUniqueTraders',
    smoothData: false,
    dataChainFilter: (data, chain) => {
      return data[chain]
        ? data[chain]
        : [];
    },
    getYAxisDataPoint: (item) => {
      return parseFloat(item.cumulative_trader_count);
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