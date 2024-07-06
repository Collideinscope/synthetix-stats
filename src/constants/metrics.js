// [state metric key]: { ...metadata }
const METRIC_METADATA = {
  'allAPY': {
    key: 'allAPY',
    chartTitle: 'APY',
    chartYValueSymbol: '%',
    dataStartDate: '2024-05-01',
    chartYAxisDataKey: 'apy_7d',
    getYAxisDataPoint: (item) => {
      return item.apys.apy_7d.year;
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