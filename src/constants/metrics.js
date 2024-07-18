import { abbreviateNumber } from "../helpers";

// [state metric key]: { ...metadata }
const METRIC_METADATA = {
  'allAPY': {
    key: 'allAPY',
    chartTitle: 'APY',
    chartYValueSymbol: '%',
    dataStartDate: '2024-05-01',
    chartYAxisDataKey: 'apy_7d',
    symbolLocation: 'right',
    summaryDataKey: 'summaryDataAPY',
    summaryDataType: '%',
    smoothData: true,
    dataChainFilter: (data, chain) => {
      return data.filter(item => item.chain === chain);
    },
    getYAxisDataPoint: (item) => {
      return item.apys.apy_7d.year * 100;
    },
    yValueFormatter: (val) => {
      return val;
    },
  },
  'allTVL': {
    key: 'allTVL',
    chartTitle: 'TVL',
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
    chartTitle: 'Pool Rewards',
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
    chartTitle: 'Core Delegations',
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
  'cumulativeUniqueStakers': {
    key: 'cumulativeUniqueStakers',
    chartTitle: 'Unique Stakers',
    chartYValueSymbol: '',
    dataStartDate: null,
    chartYAxisDataKey: 'cumulative_staker_count',
    symbolLocation: 'left',
    summaryDataKey: 'summaryDataUniqueStakers',
    smoothData: false,
    dataChainFilter: (data, chain) => {
      return data[chain]
        ? data[chain]
        : [];
    },
    getYAxisDataPoint: (item) => {
      return parseFloat(item.cumulative_staker_count);
    },
    yValueFormatter: (val) => {
      return parseFloat(val).toFixed(0);
    }
  },
  'allPerpStats': {
    key: 'allPerpStats',
    chartTitle: 'Perps Volume',
    chartYValueSymbol: '',
    dataStartDate: null,
    chartYAxisDataKey: 'cumulative_volume',
    symbolLocation: 'left',
    summaryDataKey: 'summaryDataPerpStats',
    smoothData: false,
    dataChainFilter: (data, chain) => {
      return data.filter(item => item.chain === chain);
    },
    getYAxisDataPoint: (item) => {
      return parseFloat(item.cumulative_volume);
    },
    yValueFormatter: (val) => {
      return abbreviateNumber(val);
    }
  }
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