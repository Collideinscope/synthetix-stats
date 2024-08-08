const FILTER_TYPES = {
  'network': {
    type: 'network',
    options: [
      { value: 'base', label: 'Base' },
    ]
  },
  'pool': {
    type: 'pool',
    options: [
      { value: '1', label: 'Spartan Council Pool' },
    ]
  },
  'collateralType': {
    type: 'collateralType',
    options: [
      { value: 'USDC', label: 'USDC' },
    ]
  }
};

export default FILTER_TYPES;