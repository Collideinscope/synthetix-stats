import { abbreviateNumber } from "../helpers";

// [state metric lineKey]: { ...metadata }
const METRIC_METADATA = {
  'apy': {
    lineKey: 'allAPY',
    dailyKey: 'dailyAPY',
    radialType: 'cumulative',
    radialKey: 'allAPY',
    hasDailyData: true,
    category: 'core',
    chartTitle: 'APY',
    defaultChartType: 'area',
    chartType: 'area',
    chartYValueSymbol: '%',
    dataStartDate: '2024-05-03',
    chartYAxisDataKey: 'apy_28d',
    dailyChartYAxisDataKey: 'daily_apy_percentage_delta',
    symbolLocation: 'right',
    summaryDataKey: 'summaryDataAPY',
    summaryDataDailyKey: 'summaryDataAPY',
    summaryDataType: '%',
    smoothData: true,
    timeFilters: {
      area: 'all',
      bar: 'daily',
      radial: 'all'
    },
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
    radialType: 'cumulative',
    radialKey: 'cumulativeTVL',
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
    timeFilters: {
      area: 'cumulative',
      bar: 'daily',
      radial: 'cumulative'
    },
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
    radialType: 'cumulative',
    radialKey: 'cumulativePoolRewards',
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
    timeFilters: {
      area: 'cumulative',
      bar: 'daily',
      radial: 'cumulative'
    },
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
    radialType: 'cumulative',
    radialKey: 'cumulativeCoreDelegations',
    hasDailyData: true,
    category: 'core',
    chartTitle: 'Net Pool Flows',
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
    timeFilters: {
      area: 'cumulative',
      bar: 'daily',
      radial: 'cumulative'
    },
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
    radialType: 'daily',
    radialKey: 'dailyUniqueStakers',
    hasDailyData: true,
    defaultChartType: 'bar',
    category: 'core',
    chartTitle: 'Unique Stakers',
    chartType: 'area',
    chartYValueSymbol: '',
    dataStartDate: '2024-03-25',
    chartYAxisDataKey: 'cumulative_staker_count',
    dailyChartYAxisDataKey: 'daily_unique_stakers',
    symbolLocation: 'left',
    summaryDataKey: 'summaryDataUniqueStakers',
    summaryDataDailyKey: 'summaryDataDailyUniqueStakers',
    smoothData: false,
    timeFilters: {
      area: 'cumulative',
      bar: 'daily',
      radial: 'daily'
    },
    dataChainFilter: (data, chain) => {
      return data && data[chain]
        ? data[chain]
        : [];
    },
    getYAxisDataPoint: (item) => {
      return parseFloat(item.cumulative_staker_count);
    },
    getDailyChartYAxisDataPoint: (item) => {
      return parseFloat(item.daily_unique_stakers);
    },
    yValueFormatter: (val) => {
      return abbreviateNumber(val, 0);
    }
  },
  'perpsVolume': {
    lineKey: 'cumulativePerpsVolume',
    dailyKey: 'dailyPerpsVolume',
    radialType: 'daily',
    radialKey: 'dailyPerpsVolume',
    hasDailyData: true,
    category: 'perps',
    chartTitle: 'Perps Volume',
    defaultChartType: 'bar',
    chartType: 'area',
    chartYValueSymbol: '$',
    dataStartDate: '2024-02-20',
    chartYAxisDataKey: 'cumulative_volume',
    dailyChartYAxisDataKey: 'daily_volume',
    symbolLocation: 'left',
    summaryDataKey: 'summaryDataCumulativePerpsVolume',
    summaryDataDailyKey: 'summaryDataDailyPerpsVolume',
    smoothData: false,
    timeFilters: {
      area: 'cumulative',
      bar: 'daily',
      radial: 'daily'
    },
    dataChainFilter: (data, chain) => {
      return data && data[chain]
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
    lineKey: 'openInterest',
    dailyKey: 'dailyChangeOpenInterest',
    radialType: 'cumulative',
    radialKey: 'openInterest',
    hasDailyData: true,
    category: 'perps',
    chartTitle: 'Open Interest',
    defaultChartType: 'area',
    chartType: 'area',
    chartYValueSymbol: '$',
    dataStartDate: '2024-02-03',
    chartYAxisDataKey: 'daily_oi',
    dailyChartYAxisDataKey: 'daily_oi_change',
    symbolLocation: 'left',
    summaryDataKey: 'summaryDataOpenInterest',
    summaryDataDailyKey: 'summaryDataOpenInterest',
    smoothData: false,
    timeFilters: {
      area: 'cumulative',
      bar: 'daily',
      radial: 'cumulative'
    },
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
    radialType: 'daily',
    radialKey: 'dailyUniqueTraders',
    hasDailyData: true,
    category: 'perps',
    chartTitle: 'Unique Traders',
    defaultChartType: 'bar',
    chartType: 'area',
    chartYValueSymbol: '',
    dataStartDate: null,
    chartYAxisDataKey: 'cumulative_trader_count',
    dailyChartYAxisDataKey: 'daily_unique_traders',
    symbolLocation: 'left',
    summaryDataKey: 'summaryDataUniqueTraders',
    summaryDataDailyKey: 'summaryDataDailyUniqueTraders',
    smoothData: false,
    timeFilters: {
      area: 'cumulative',
      bar: 'daily',
      radial: 'daily'
    },
    dataChainFilter: (data, chain) => {
      return data && data[chain]
        ? data[chain]
        : [];
    },
    getYAxisDataPoint: (item) => {
      return parseFloat(item.cumulative_trader_count);
    },
    getDailyChartYAxisDataPoint: (item) => {
      return parseFloat(item.daily_unique_traders);
    },
    yValueFormatter: (val) => {
      return abbreviateNumber(val, 0);
    }
  },
  'exchangeFees': {
    lineKey: 'cumulativeExchangeFees',
    dailyKey: 'dailyExchangeFees',
    radialType: 'daily',
    radialKey: 'dailyExchangeFees',
    hasDailyData: true,
    category: 'perps',
    chartTitle: 'Exchange Fees',
    defaultChartType: 'bar',
    chartType: 'area',
    chartYValueSymbol: '$',
    dataStartDate: '2024-02-20',
    chartYAxisDataKey: 'cumulative_exchange_fees',
    dailyChartYAxisDataKey: 'daily_exchange_fees',
    symbolLocation: 'left',
    summaryDataKey: 'summaryDataCumulativeExchangeFees',
    summaryDataDailyKey: 'summaryDataDailyExchangeFees',
    smoothData: false,
    timeFilters: {
      area: 'cumulative',
      bar: 'daily',
      radial: 'daily'
    },
    dataChainFilter: (data, chain) => {
      return data && data[chain]
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