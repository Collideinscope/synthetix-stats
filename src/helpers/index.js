function abbreviateNumber(number, decimals = 2) {
  const num = Number(number);
  if (isNaN(num)) {
    return 'Invalid';
  }
  const abbreviations = [
    { value: 1e9, symbol: 'B' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' },
  ];
  const abbreviation = abbreviations.find(abbr => Math.abs(num) >= abbr.value);
  let result;
  if (abbreviation) {
    if (abbreviation.symbol === 'K') {
      // For thousands, round to the nearest integer
      result = Math.round(num / abbreviation.value).toString();
    } else {
      // For millions and billions, keep up to 2 decimal places
      result = (num / abbreviation.value).toFixed(decimals).replace(/\.00$/, '');
    }
    result += abbreviation.symbol;
  } else {
    result = num.toFixed(decimals);
  }
  
  return result;
}

export {
  abbreviateNumber
};