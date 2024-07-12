const FILTER_TYPES = {
  'chain': {
    type: 'chain',
    options: [
      { value: 'base', label: 'base' },
      { value: 'arbitrum', label: 'arbitrum' },
    ]
  },
  'pool': {
    type: 'pool',
    options: [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
    ]
  },
  'collateralType': {
    type: 'collateralType',
    options: [
      { value: 'USDC', label: 'USDC' },
      { value: 'ETH', label: 'ETH' },
    ]
  }
};

export default FILTER_TYPES;