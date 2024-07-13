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
    getYAxisDataPoint: (item) => {
      return item.apys.apy_7d.year * 100;
    },
    yValueFormatter: (val) => {
      return val;
    }
  },
  'allTVL': {
    key: 'allTVL',
    chartTitle: 'TVL',
    chartYValueSymbol: '$',
    dataStartDate: null,
    chartYAxisDataKey: 'collateral_value',
    symbolLocation: 'left',
    summaryDataKey: 'summaryDataAPY',
    getYAxisDataPoint: (item) => {
      return parseFloat(item.collateral_value);
    },
    yValueFormatter: (val) => {
      return abbreviateNumber(val);
    }
  },
  'allPoolRewards': {
    key: 'allPoolRewards',
    chartTitle: 'Pool Rewards',
    chartYValueSymbol: '$',
    dataStartDate: null,
    chartYAxisDataKey: 'cumulative_rewards_usd',
    symbolLocation: 'left',
    summaryDataKey: 'summaryDataAPY',
    getYAxisDataPoint: (item) => {
      console.log(item)
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
    summaryDataKey: 'summaryDataAPY',
    getYAxisDataPoint: (item) => {
      console.log(item)
      return parseFloat(item.amount_delegated);
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